// Vercel Serverless Function: trả index.html kèm thẻ Open Graph riêng cho từng thiệp.
// Bot của Zalo/Messenger đọc og:image + og:title ở đây; trình duyệt thật vẫn chạy script.js như bình thường.
const fs = require('fs');
const path = require('path');
const LZString = require('../lib/lz-string.js');

const CLOUD = 'dq4xqmsrh'; // phải trùng CLOUDINARY_CLOUD_NAME trong script.js
const CLD = `https://res.cloudinary.com/${CLOUD}/`;
const URL_PREFIXES = [
  CLD + 'image/upload/f_auto,q_auto,w_1200/',
  CLD + 'video/upload/f_auto,q_auto,w_1200/',
  CLD + 'raw/upload/f_auto,q_auto,w_1200/',
  CLD + 'image/upload/',
  CLD + 'video/upload/'
];
const KEY_MAP_REV = {
  a: 'pageTitle', b: 'badgeText', c: 'footerText', d: 'fallEffect',
  e: 'titleFixed', f: 'keywords', g: 'wishLines', h: 'cardTitle',
  i: 'cardIntro', j: 'sender', k: 'letter', l: 'bgUrl',
  m: 'bgOpacity', n: 'photos', o: 'musicUrl', p: 'musicLabel'
};
// Ảnh dự phòng khi thiệp không có ảnh nào (tuỳ chọn, đặt trong Vercel > Settings > Environment Variables)
const GENERIC_TITLE = 'Có một tấm thiệp gửi tới bạn 💌';
const GENERIC_DESC = 'Chạm để mở hộp quà 🎁';
const FALLBACK_IMAGE = process.env.DEFAULT_OG_IMAGE || '';

function expandUrl(u) {
  if (typeof u !== 'string') return '';
  const m = u.match(/^~(\d+)\|(.*)$/);
  return m && URL_PREFIXES[+m[1]] ? URL_PREFIXES[+m[1]] + m[2] : u;
}
function decodeToken(token) {
  const bytes = new Uint8Array(Buffer.from(token.replace(/-/g, '+').replace(/_/g, '/'), 'base64'));
  const compact = JSON.parse(LZString.decompressFromUint8Array(bytes));
  const cfg = {};
  for (const k in compact) if (KEY_MAP_REV[k]) cfg[KEY_MAP_REV[k]] = compact[k];
  return cfg;
}
// Ảnh xem trước: JPG (Zalo/FB không ưa avif/webp), tỉ lệ 1.91:1, cắt theo chủ thể
function toOgImage(u) {
  u = expandUrl(u);
  if (!u) return '';
  return u.replace('/upload/f_auto,q_auto,w_1200/', '/upload/f_jpg,q_auto,w_1200,h_630,c_fill,g_auto/');
}
const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const clip = (s, n) => (s.length > n ? s.slice(0, n - 1).trimEnd() + '…' : s);

let htmlCache = null;
function getHtml() {
  if (!htmlCache) htmlCache = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  return htmlCache;
}

module.exports = (req, res) => {
  let html = getHtml();
  try {
    const u = new URL(req.url, 'http://localhost');
    const token = String((req.query && req.query.c) || u.searchParams.get('c') || '');
    const host = req.headers['x-forwarded-host'] || req.headers.host || '';
    // Ảnh mặc định: biến môi trường DEFAULT_OG_IMAGE > file og-default.jpg trong repo
    const defaultImage = FALLBACK_IMAGE || (host ? `https://${host}/og-default.jpg` : '');

    let title = '', desc = '', image = '', pageUrl = host ? `https://${host}/` : '';
    let hasCard = false, imageIsCrop = false;

    if (token && token.length < 30000) {
      try {
        const cfg = decodeToken(token);   // chỉ chứa các trường người dùng ĐÃ SỬA (giống mặc định thì không có)
        hasCard = true;
        const str = (v) => (typeof v === 'string' ? v.trim() : '');

        // TIÊU ĐỀ: tên tab > tiêu đề thiệp > tiêu đề lớn trên trang > chữ chung
        const bigTitle = (cfg.titleFixed || (cfg.keywords && cfg.keywords[0]))
          ? `${str(cfg.titleFixed) || "You're My"} ${(cfg.keywords && str(cfg.keywords[0])) || 'Queen'}`.trim() : '';
        title = clip(str(cfg.pageTitle) || str(cfg.cardTitle) || bigTitle || GENERIC_TITLE, 90);

        // MÔ TẢ: "Từ <người gửi>" + câu mở đầu thiệp (nếu có sửa) > chữ chung
        const sender = str(cfg.sender), intro = str(cfg.cardIntro);
        desc = clip(
          sender ? `💌 Từ ${sender}${intro ? ' · ' + intro : ''}` : (intro || GENERIC_DESC),
          200
        );

        const first = Array.isArray(cfg.photos) && cfg.photos[0] ? cfg.photos[0][0] : '';
        image = toOgImage(first) || toOgImage(cfg.bgUrl);
        if (image) imageIsCrop = true;
        pageUrl = host ? `https://${host}/t?c=${token}` : '';
      } catch (e) {
        console.error('card decode error:', e); // token hỏng -> coi như link trần
      }
    }
    image = image || defaultImage;

    if (hasCard) {
      // bỏ thẻ mặc định rồi chèn thẻ riêng của thiệp này
      html = html
        .replace(/<meta\s+(?:property|name)="(?:og:|twitter:|description)[^"]*"[^>]*>\s*/gi, '')
        .replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(title)}</title>`);
    }
    // dọn thẻ ảnh/url/twitter có sẵn trong index.html để không bị trùng
    html = html.replace(/<meta\s+(?:property|name)="(?:og:image|og:url|twitter:)[^"]*"[^>]*>\s*/gi, '');
    const tags = [
      hasCard && `<meta name="description" content="${esc(desc)}">`,
      hasCard && `<meta property="og:type" content="website">`,
      hasCard && `<meta property="og:title" content="${esc(title)}">`,
      hasCard && `<meta property="og:description" content="${esc(desc)}">`,
      pageUrl && `<meta property="og:url" content="${esc(pageUrl)}">`,
      image && `<meta property="og:image" content="${esc(image)}">`,
      imageIsCrop && `<meta property="og:image:width" content="1200">`,
      imageIsCrop && `<meta property="og:image:height" content="630">`,
      `<meta name="twitter:card" content="${image ? 'summary_large_image' : 'summary'}">`
    ].filter(Boolean).join('\n  ');
    html = html.replace('</head>', `  ${tags}\n</head>`);
  } catch (e) {
    console.error('card error:', e); // lỗi gì cũng vẫn trả trang bình thường
  }
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.status(200).send(html);
};
