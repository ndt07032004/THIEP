/* lz-string 1.5.0 (c) pieroxy - MIT License */
var LZString=function(){var r=String.fromCharCode,o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",e={};function t(r,o){if(!e[r]){e[r]={};for(var n=0;n<r.length;n++)e[r][r.charAt(n)]=n}return e[r][o]}var i={compressToBase64:function(r){if(null==r)return"";var n=i._compress(r,6,function(r){return o.charAt(r)});switch(n.length%4){default:case 0:return n;case 1:return n+"===";case 2:return n+"==";case 3:return n+"="}},decompressFromBase64:function(r){return null==r?"":""==r?null:i._decompress(r.length,32,function(n){return t(o,r.charAt(n))})},compressToUTF16:function(o){return null==o?"":i._compress(o,15,function(o){return r(o+32)})+" "},decompressFromUTF16:function(r){return null==r?"":""==r?null:i._decompress(r.length,16384,function(o){return r.charCodeAt(o)-32})},compressToUint8Array:function(r){for(var o=i.compress(r),n=new Uint8Array(2*o.length),e=0,t=o.length;e<t;e++){var s=o.charCodeAt(e);n[2*e]=s>>>8,n[2*e+1]=s%256}return n},decompressFromUint8Array:function(o){if(null==o)return i.decompress(o);for(var n=new Array(o.length/2),e=0,t=n.length;e<t;e++)n[e]=256*o[2*e]+o[2*e+1];var s=[];return n.forEach(function(o){s.push(r(o))}),i.decompress(s.join(""))},compressToEncodedURIComponent:function(r){return null==r?"":i._compress(r,6,function(r){return n.charAt(r)})},decompressFromEncodedURIComponent:function(r){return null==r?"":""==r?null:(r=r.replace(/ /g,"+"),i._decompress(r.length,32,function(o){return t(n,r.charAt(o))}))},compress:function(o){return i._compress(o,16,function(o){return r(o)})},_compress:function(r,o,n){if(null==r)return"";var e,t,i,s={},u={},a="",p="",c="",l=2,f=3,h=2,d=[],m=0,v=0;for(i=0;i<r.length;i+=1)if(a=r.charAt(i),Object.prototype.hasOwnProperty.call(s,a)||(s[a]=f++,u[a]=!0),p=c+a,Object.prototype.hasOwnProperty.call(s,p))c=p;else{if(Object.prototype.hasOwnProperty.call(u,c)){if(c.charCodeAt(0)<256){for(e=0;e<h;e++)m<<=1,v==o-1?(v=0,d.push(n(m)),m=0):v++;for(t=c.charCodeAt(0),e=0;e<8;e++)m=m<<1|1&t,v==o-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}else{for(t=1,e=0;e<h;e++)m=m<<1|t,v==o-1?(v=0,d.push(n(m)),m=0):v++,t=0;for(t=c.charCodeAt(0),e=0;e<16;e++)m=m<<1|1&t,v==o-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}0==--l&&(l=Math.pow(2,h),h++),delete u[c]}else for(t=s[c],e=0;e<h;e++)m=m<<1|1&t,v==o-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;0==--l&&(l=Math.pow(2,h),h++),s[p]=f++,c=String(a)}if(""!==c){if(Object.prototype.hasOwnProperty.call(u,c)){if(c.charCodeAt(0)<256){for(e=0;e<h;e++)m<<=1,v==o-1?(v=0,d.push(n(m)),m=0):v++;for(t=c.charCodeAt(0),e=0;e<8;e++)m=m<<1|1&t,v==o-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}else{for(t=1,e=0;e<h;e++)m=m<<1|t,v==o-1?(v=0,d.push(n(m)),m=0):v++,t=0;for(t=c.charCodeAt(0),e=0;e<16;e++)m=m<<1|1&t,v==o-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}0==--l&&(l=Math.pow(2,h),h++),delete u[c]}else for(t=s[c],e=0;e<h;e++)m=m<<1|1&t,v==o-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;0==--l&&(l=Math.pow(2,h),h++)}for(t=2,e=0;e<h;e++)m=m<<1|1&t,v==o-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;for(;;){if(m<<=1,v==o-1){d.push(n(m));break}v++}return d.join("")},decompress:function(r){return null==r?"":""==r?null:i._decompress(r.length,32768,function(o){return r.charCodeAt(o)})},_decompress:function(o,n,e){var t,i,s,u,a,p,c,l=[],f=4,h=4,d=3,m="",v=[],g={val:e(0),position:n,index:1};for(t=0;t<3;t+=1)l[t]=t;for(s=0,a=Math.pow(2,2),p=1;p!=a;)u=g.val&g.position,g.position>>=1,0==g.position&&(g.position=n,g.val=e(g.index++)),s|=(u>0?1:0)*p,p<<=1;switch(s){case 0:for(s=0,a=Math.pow(2,8),p=1;p!=a;)u=g.val&g.position,g.position>>=1,0==g.position&&(g.position=n,g.val=e(g.index++)),s|=(u>0?1:0)*p,p<<=1;c=r(s);break;case 1:for(s=0,a=Math.pow(2,16),p=1;p!=a;)u=g.val&g.position,g.position>>=1,0==g.position&&(g.position=n,g.val=e(g.index++)),s|=(u>0?1:0)*p,p<<=1;c=r(s);break;case 2:return""}for(l[3]=c,i=c,v.push(c);;){if(g.index>o)return"";for(s=0,a=Math.pow(2,d),p=1;p!=a;)u=g.val&g.position,g.position>>=1,0==g.position&&(g.position=n,g.val=e(g.index++)),s|=(u>0?1:0)*p,p<<=1;switch(c=s){case 0:for(s=0,a=Math.pow(2,8),p=1;p!=a;)u=g.val&g.position,g.position>>=1,0==g.position&&(g.position=n,g.val=e(g.index++)),s|=(u>0?1:0)*p,p<<=1;l[h++]=r(s),c=h-1,f--;break;case 1:for(s=0,a=Math.pow(2,16),p=1;p!=a;)u=g.val&g.position,g.position>>=1,0==g.position&&(g.position=n,g.val=e(g.index++)),s|=(u>0?1:0)*p,p<<=1;l[h++]=r(s),c=h-1,f--;break;case 2:return v.join("")}if(0==f&&(f=Math.pow(2,d),d++),l[c])m=l[c];else{if(c!==h)return null;m=i+i.charAt(0)}v.push(m),l[h++]=i+m.charAt(0),i=m,0==--f&&(f=Math.pow(2,d),d++)}}};return i}();"function"==typeof define&&define.amd?define(function(){return LZString}):"undefined"!=typeof module&&null!=module?module.exports=LZString:"undefined"!=typeof angular&&null!=angular&&angular.module("LZString",[]).factory("LZString",function(){return LZString});

/* ==========================================================
 * CHÚC MỪNG 20/10 - YOU'RE MY QUEEN (SCRIPT.JS)
 * Đã tích hợp Cloudinary (dq4xqmsrh) & Khóa chống lỗi link tặng
 * ========================================================== */

const CLOUDINARY_CLOUD_NAME = "dq4xqmsrh";
const CLOUDINARY_UPLOAD_PRESET = "thiep2010";

let isUploadingImage = false; // Cờ kiểm tra trạng thái upload ảnh lên mây

/**
 * Tải ảnh trực tiếp lên Cloudinary (Unsigned Upload)
 */
async function uploadImageToCloudinary(file) {
  isUploadingImage = true;
  const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData
    });
    if (!response.ok) {
      throw new Error(`Upload Cloudinary thất bại: ${response.statusText}`);
    }
    const data = await response.json();
    let optimizedUrl = data.secure_url;
    if (optimizedUrl.includes("/upload/")) {
      optimizedUrl = optimizedUrl.replace("/upload/", "/upload/f_auto,q_auto,w_1200/");
    }
    isUploadingImage = false;
    return optimizedUrl;
  } catch (error) {
    isUploadingImage = false;
    console.error("Lỗi upload Cloudinary:", error);
    throw error;
  }
}

const DEFAULT_CONFIG = {
  pageTitle: "Chúc Mừng 20/10 - You're My Queen",
  badgeText: "20.10 Vietnamese Women's Day",
  footerText: "Gửi trọn yêu thương ngày 20/10 • Ngày Phụ Nữ Việt Nam",
  fallEffect: "petals",
  titleFixed: "You're My",
  keywords: ["Queen", "Love", "Sunshine"],
  wishLines: [
    "20.10.2023 Ngày Phụ Nữ Việt Nam",
    "Chúc cho bà, mẹ, chị em phụ nữ",
    "Luôn xinh đẹp, mạnh khoẻ và hạnh phúc",
    "Chúc cho những người con gái",
    "Luôn được yêu thương, che chở",
    "Tìm được người mình yêu và cũng yêu thương mình <3"
  ],
  cardTitle: "Thân gửi người phụ nữ tuyệt vời nhất!",
  cardIntro: "Nhân ngày Phụ Nữ Việt Nam 20/10, xin gửi tới bạn muôn vàn lời chúc an lành, rực rỡ và hạnh phúc nhất.",
  sender: "You're always my Sunshine, my Love & my Queen!",
  letter: "Mong bạn mỗi ngày đều nở nụ cười rạng rỡ như đóa hồng ban mai, luôn luôn tự tin, kiêu hãnh và được yêu thương chở che đúng như cách một Nữ Hoàng xứng đáng!",
  bgUrl: "",
  bgOpacity: 78,
  photos: [],
  musicUrl: ""
};

// Bản gốc bất biến để so sánh khi nén link (tránh bị "nhiễm" khi thêm ảnh vào mảng)
const PRISTINE_DEFAULTS = JSON.parse(JSON.stringify(DEFAULT_CONFIG));
const cloneDefaults = () => JSON.parse(JSON.stringify(PRISTINE_DEFAULTS));

let appConfig = cloneDefaults();
let isRecipientMode = false;

/* ----------------------------------------------------------
 * NÉN LINK TẶNG: rút gọn tên trường + bỏ giá trị mặc định
 * + rút gọn link Cloudinary + nén LZ + base64url.
 * Link cũ dạng #card=... vẫn đọc được bình thường.
 * ---------------------------------------------------------- */
const CLD = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/`;
const URL_PREFIXES = [
  CLD + "image/upload/f_auto,q_auto,w_1200/",
  CLD + "video/upload/f_auto,q_auto,w_1200/",
  CLD + "raw/upload/f_auto,q_auto,w_1200/",
  CLD + "image/upload/",
  CLD + "video/upload/"
];

function shortenUrl(u) {
  if (typeof u !== 'string') return u;
  for (let i = 0; i < URL_PREFIXES.length; i++) {
    if (u.startsWith(URL_PREFIXES[i])) return `~${i}|${u.slice(URL_PREFIXES[i].length)}`;
  }
  return u;
}
function expandUrl(u) {
  if (typeof u !== 'string') return u;
  const m = u.match(/^~(\d+)\|(.*)$/);
  return (m && URL_PREFIXES[+m[1]]) ? URL_PREFIXES[+m[1]] + m[2] : u;
}

// tên đầy đủ -> tên ngắn
const KEY_MAP = {
  pageTitle: 'a', badgeText: 'b', footerText: 'c', fallEffect: 'd',
  titleFixed: 'e', keywords: 'f', wishLines: 'g', cardTitle: 'h',
  cardIntro: 'i', sender: 'j', letter: 'k', bgUrl: 'l',
  bgOpacity: 'm', photos: 'n', musicUrl: 'o', musicLabel: 'p'
};
const KEY_MAP_REV = Object.fromEntries(Object.entries(KEY_MAP).map(([k, v]) => [v, k]));

function toBase64Url(bytes) {
  let bin = '';
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function fromBase64Url(str) {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) str += '=';
  const bin = atob(str);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

function encodeConfigToHash(cfg) {
  try {
    const compact = {};
    for (const key in KEY_MAP) {
      let val = cfg[key];
      if (val === undefined || val === null || val === '') continue;
      if (Array.isArray(val) && val.length === 0) continue;
      // Bỏ qua nếu giống mặc định
      if (JSON.stringify(val) === JSON.stringify(PRISTINE_DEFAULTS[key])) continue;

      if (key === 'photos') {
        val = val.map(p => p.caption ? [shortenUrl(p.url), p.caption] : [shortenUrl(p.url)]);
      } else if (key === 'bgUrl' || key === 'musicUrl') {
        val = shortenUrl(val);
      }
      compact[KEY_MAP[key]] = val;
    }
    const bytes = LZString.compressToUint8Array(JSON.stringify(compact));
    return toBase64Url(bytes);
  } catch (e) {
    console.error("Lỗi encode Hash:", e);
    return "";
  }
}

function decodeHashToConfig(hashStr) {
  try {
    // Link cũ (#card=...) -> giữ tương thích ngược
    if (hashStr.startsWith('#card=')) {
      const base64Str = hashStr.replace("#card=", "");
      const jsonStr = decodeURIComponent(atob(base64Str).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
      return Object.assign(cloneDefaults(), JSON.parse(jsonStr));
    }
    // Link mới (#c=...)
    const bytes = fromBase64Url(hashStr.replace(/^#?c=/, ""));
    const compact = JSON.parse(LZString.decompressFromUint8Array(bytes));
    const cfg = {};
    for (const k in compact) {
      const key = KEY_MAP_REV[k];
      if (!key) continue;
      let val = compact[k];
      if (key === 'photos') {
        val = val.map(p => ({ url: expandUrl(p[0]), caption: p[1] || '' }));
      } else if (key === 'bgUrl' || key === 'musicUrl') {
        val = expandUrl(val);
      }
      cfg[key] = val;
    }
    return Object.assign(cloneDefaults(), cfg);
  } catch (e) {
    console.error("Lỗi decode Hash:", e);
    return null;
  }
}

function checkURLMode() {
  let raw = new URLSearchParams(window.location.search).get('c');
  if (!raw) {
    const hash = window.location.hash;
    if (hash && (hash.startsWith('#c=') || hash.startsWith('#card='))) raw = hash;
  }
  if (!raw) return;
  const parsed = decodeHashToConfig(raw);
  if (parsed) {
    appConfig = parsed;
    if (parsed.secretImg && (!appConfig.photos || appConfig.photos.length === 0)) {
      appConfig.photos = [{ url: parsed.secretImg, caption: "Khoảnh khắc tuyệt đẹp ✨" }];
    }
    isRecipientMode = true;
  }
}
checkURLMode();

/* ==========================================================
 * 2. BẬT / TẮT GIAO DIỆN THEO CHẾ ĐỘ
 * ========================================================== */
const creatorToolbar   = document.getElementById('creatorToolbar');
const recipientToolbar = document.getElementById('recipientToolbar');

if (isRecipientMode) {
  creatorToolbar.classList.add('hidden');
  recipientToolbar.classList.remove('hidden');
  recipientToolbar.classList.add('flex');
} else {
  creatorToolbar.classList.remove('hidden');
  creatorToolbar.classList.add('flex');
  recipientToolbar.classList.add('hidden');
}

/* ==========================================================
 * 3. DOM VÀ TIỆN ÍCH TRÌNH BIÊN TẬP
 * ========================================================== */
const toastMsg           = document.getElementById('toastMsg');
const toastText          = document.getElementById('toastText');
const photoCountBadge    = document.getElementById('photoCountBadge');
const photosThumbnailList = document.getElementById('photosThumbnailList');

function showToast(text) {
  if (!toastText || !toastMsg) return;
  toastText.innerText = text;
  toastMsg.classList.add('show');
  setTimeout(() => toastMsg.classList.remove('show'), 3800);
}

function renderEditorThumbnailList() {
  if (!photoCountBadge || !photosThumbnailList) return;
  const photos = appConfig.photos || [];
  photoCountBadge.textContent = photos.length;
  photosThumbnailList.innerHTML = '';

  if (photos.length === 0) {
    photosThumbnailList.innerHTML = '<span class="text-pink-400 text-[11px] italic col-span-full text-center py-3">Chưa có ảnh nào được thêm...</span>';
    return;
  }

  photos.forEach((photo, idx) => {
    const itemCard = document.createElement('div');
    itemCard.className = "flex items-center gap-2 bg-white p-1.5 rounded-xl border border-pink-200 shadow-xs";

    const imgWrap = document.createElement('div');
    imgWrap.className = "relative w-12 h-14 rounded-lg overflow-hidden border border-pink-100 flex-shrink-0 bg-pink-50";
    const imgEl = document.createElement('img');
    imgEl.src = photo.url;
    imgEl.className = "w-full h-full object-cover";
    const badgeIndex = document.createElement('span');
    badgeIndex.className = "absolute top-0.5 left-0.5 bg-pink-900/70 text-white text-[9px] px-1 rounded";
    badgeIndex.textContent = `#${idx + 1}`;
    imgWrap.appendChild(imgEl);
    imgWrap.appendChild(badgeIndex);

    const rightCol = document.createElement('div');
    rightCol.className = "flex-1 min-w-0 flex flex-col gap-1";

    const topRow = document.createElement('div');
    topRow.className = "flex items-center justify-between";
    const labelEl = document.createElement('span');
    labelEl.className = "text-[10px] font-semibold text-pink-800";
    labelEl.textContent = `Thông điệp ảnh #${idx + 1}:`;

    const delBtn = document.createElement('button');
    delBtn.type = "button";
    delBtn.className = "text-[10px] text-rose-500 hover:text-rose-700 font-semibold px-1.5 py-0.5 rounded hover:bg-rose-50 transition-colors";
    delBtn.textContent = "Xóa ✕";
    delBtn.addEventListener('click', () => {
      appConfig.photos.splice(idx, 1);
      renderEditorThumbnailList();
      showToast(`Đã xóa ảnh #${idx + 1}`);
    });

    topRow.appendChild(labelEl);
    topRow.appendChild(delBtn);

    const captionInput = document.createElement('input');
    captionInput.type = "text";
    captionInput.value = photo.caption || "";
    captionInput.placeholder = "Nhập lời nhắn cho ảnh này...";
    captionInput.className = "w-full px-2 py-1 text-[11px] rounded-lg bg-pink-50/60 border border-pink-200 text-pink-950 focus:outline-none focus:ring-1 focus:ring-pink-400";
    captionInput.addEventListener('input', (e) => {
      appConfig.photos[idx].caption = e.target.value;
    });

    rightCol.appendChild(topRow);
    rightCol.appendChild(captionInput);

    itemCard.appendChild(imgWrap);
    itemCard.appendChild(rightCol);
    photosThumbnailList.appendChild(itemCard);
  });
}

/* ==========================================================
 * 4. ALBUM ĐA ẢNH CUỘN FILM TỰ ĐỘNG & LIGHTBOX
 * ========================================================== */
const albumGallerySection = document.getElementById('albumGallerySection');
const filmstripTrack      = document.getElementById('filmstripTrack');
const lightboxOverlay     = document.getElementById('lightboxOverlay');
const lightboxImg         = document.getElementById('lightboxImg');
const lightboxCaption     = document.getElementById('lightboxCaption');
const closeLightboxBtn    = document.getElementById('closeLightboxBtn');

function openLightbox(url, caption) {
  lightboxImg.src = url;
  lightboxCaption.textContent = caption || "Khoảnh khắc tuyệt đẹp ✨";
  lightboxOverlay.classList.add('active');
}

closeLightboxBtn.addEventListener('click', () => lightboxOverlay.classList.remove('active'));
lightboxOverlay.addEventListener('click', (e) => {
  if (e.target === lightboxOverlay) lightboxOverlay.classList.remove('active');
});

function renderAutoFilmstrip() {
  if (!filmstripTrack) return;
  filmstripTrack.innerHTML = '';
  const photos = appConfig.photos || [];
  if (photos.length === 0) return;

  if (photos.length === 1) {
    filmstripTrack.style.animation = 'none';
    filmstripTrack.style.margin = '0 auto';
    filmstripTrack.appendChild(createFilmCard(photos[0], 0));
    return;
  }

  filmstripTrack.style.margin = '0';
  filmstripTrack.style.animation = '';
  const duration = Math.max(12, photos.length * 4.5);
  filmstripTrack.style.setProperty('--scroll-duration', `${duration}s`);

  const loopList = [...photos, ...photos];
  loopList.forEach((photo, idx) => {
    const realIdx = idx % photos.length;
    filmstripTrack.appendChild(createFilmCard(photo, realIdx));
  });
}

function createFilmCard(photo, idx) {
  const item = document.createElement('div');
  item.className = 'film-card-item';
  const captionText = (photo.caption && photo.caption.trim() !== '') ? photo.caption : `Kỷ niệm #${idx + 1}`;

  const imgContainer = document.createElement('div');
  imgContainer.className = 'aspect-[4/5] overflow-hidden rounded-lg bg-pink-100 shadow-inner';
  const imgEl = document.createElement('img');
  imgEl.src = photo.url;
  imgEl.alt = 'Photo';
  imgEl.loading = 'lazy';
  imgEl.className = 'w-full h-full object-cover';
  imgContainer.appendChild(imgEl);

  const captionEl = document.createElement('div');
  captionEl.className = 'handwriting-font text-center text-rose-800 text-xs sm:text-sm mt-1.5 line-clamp-2 min-h-[2.2rem] flex items-center justify-center font-medium px-1 leading-tight';
  captionEl.textContent = captionText;

  item.appendChild(imgContainer);
  item.appendChild(captionEl);

  item.addEventListener('click', (e) => {
    e.stopPropagation();
    openLightbox(photo.url, captionText);
  });
  return item;
}

/* ==========================================================
 * 5. CANVAS HIỆU ỨNG RƠI ĐA DẠNG
 * ========================================================== */
const fallingCanvas = document.getElementById('falling-canvas');
const fCtx          = fallingCanvas.getContext('2d');
let fallingParticles = [];
const NUM_PARTICLES  = 34;

function resizeFallingCanvas() {
  fallingCanvas.width  = window.innerWidth;
  fallingCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeFallingCanvas);
resizeFallingCanvas();

class FallingItem {
  constructor(type, init = false) {
    this.type = type;
    this.reset(init);
  }

  reset(init = false) {
    this.x        = Math.random() * fallingCanvas.width;
    this.y        = init ? Math.random() * fallingCanvas.height : -35;
    this.speedY   = 0.8 + Math.random() * 1.4;
    this.speedX   = (Math.random() - 0.5) * 0.9;
    this.oscSpeed = 0.02 + Math.random() * 0.03;
    this.oscAngle = Math.random() * Math.PI * 2;
    this.rot      = Math.random() * Math.PI * 2;
    this.rotSpeed = (Math.random() - 0.5) * 0.03;
    this.flip     = Math.random() * Math.PI;
    this.flipSpeed = 0.015 + Math.random() * 0.025;
    this.alpha    = 0.6 + Math.random() * 0.35;

    if (this.type === 'petals') {
      this.size = 12 + Math.random() * 14;
      const shades = [
        { main: '#f472b6', shadow: '#db2777' },
        { main: '#fb7185', shadow: '#e11d48' },
        { main: '#fda4af', shadow: '#f43f5e' }
      ];
      this.shade = shades[Math.floor(Math.random() * shades.length)];
    } else if (this.type === 'hearts') {
      this.size  = 10 + Math.random() * 13;
      const heartColors = ['#f43f5e', '#ec4899', '#db2777', '#fb7185', '#fda4af'];
      this.color = heartColors[Math.floor(Math.random() * heartColors.length)];
    } else if (this.type === 'letters') {
      this.size             = 14 + Math.random() * 8;
    } else if (this.type === 'stars') {
      this.size   = 6 + Math.random() * 9;
      this.color  = '#fbbf24';
      this.speedY = 0.5 + Math.random() * 1.0;
    }
  }

  update() {
    this.oscAngle += this.oscSpeed;
    this.x += this.speedX + Math.sin(this.oscAngle) * 0.75;
    this.y += this.speedY;
    this.rot  += this.rotSpeed;
    this.flip += this.flipSpeed;

    if (this.y > fallingCanvas.height + 40 || this.x > fallingCanvas.width + 40 || this.x < -40) {
      this.reset(false);
    }
  }

  draw() {
    fCtx.save();
    fCtx.translate(this.x, this.y);
    fCtx.rotate(this.rot);
    fCtx.scale(Math.cos(this.flip), 1);
    fCtx.globalAlpha = this.alpha;

    if (this.type === 'petals') {
      fCtx.beginPath();
      fCtx.moveTo(0, 0);
      fCtx.bezierCurveTo(-this.size / 2, -this.size / 2, -this.size, this.size / 2, 0, this.size);
      fCtx.bezierCurveTo(this.size, this.size / 2, this.size / 2, -this.size / 2, 0, 0);
      const grad = fCtx.createLinearGradient(0, 0, 0, this.size);
      grad.addColorStop(0, this.shade.main);
      grad.addColorStop(1, this.shade.shadow);
      fCtx.fillStyle = grad;
      fCtx.fill();
    } else if (this.type === 'hearts') {
      fCtx.fillStyle = this.color;
      fCtx.beginPath();
      const d = this.size;
      fCtx.moveTo(0, d / 4);
      fCtx.quadraticCurveTo(0, 0, d / 4, 0);
      fCtx.quadraticCurveTo(d / 2, 0, d / 2, d / 4);
      fCtx.quadraticCurveTo(d / 2, 0, (3 * d) / 4, 0);
      fCtx.quadraticCurveTo(d, 0, d, d / 4);
      fCtx.quadraticCurveTo(d, d / 2, (3 * d) / 4, (3 * d) / 4);
      fCtx.lineTo(d / 2, d);
      fCtx.lineTo(d / 4, (3 * d) / 4);
      fCtx.quadraticCurveTo(0, d / 2, 0, d / 4);
      fCtx.closePath();
      fCtx.fill();
    } else if (this.type === 'letters') {
      const w = this.size * 1.4;
      const h = this.size;
      fCtx.fillStyle   = '#ffffff';
      fCtx.strokeStyle = '#f472b6';
      fCtx.lineWidth   = 1;
      fCtx.beginPath();
      fCtx.roundRect(-w/2, -h/2, w, h, 2);
      fCtx.fill();
      fCtx.stroke();
    } else if (this.type === 'stars') {
      fCtx.fillStyle   = this.color;
      fCtx.shadowColor = '#fef08a';
      fCtx.shadowBlur  = 6;
      fCtx.beginPath();
      const s = this.size;
      fCtx.moveTo(0, -s);
      fCtx.quadraticCurveTo(0, 0, s, 0);
      fCtx.quadraticCurveTo(0, 0, 0, s);
      fCtx.quadraticCurveTo(0, 0, -s, 0);
      fCtx.quadraticCurveTo(0, 0, 0, -s);
      fCtx.fill();
    }

    fCtx.restore();
  }
}

function initFallingParticles() {
  fallingParticles = [];
  const effect = appConfig.fallEffect || 'petals';
  const types  = ['petals', 'hearts', 'letters', 'stars'];

  for (let i = 0; i < NUM_PARTICLES; i++) {
    let pType = effect;
    if (effect === 'mix') pType = types[i % types.length];
    fallingParticles.push(new FallingItem(pType, true));
  }
}

function renderFalling() {
  fCtx.clearRect(0, 0, fallingCanvas.width, fallingCanvas.height);
  for (const item of fallingParticles) {
    item.update();
    item.draw();
  }
  requestAnimationFrame(renderFalling);
}
renderFalling();

/* ==========================================================
 * 6. ÁP DỤNG CẤU HÌNH VÀO TOÀN BỘ DOM
 * ========================================================== */
const customBgLayer   = document.getElementById('customBgLayer');
const customBgOverlay = document.getElementById('customBgOverlay');

function applyConfigToDom() {
  document.title = appConfig.pageTitle || "Chúc Mừng 20/10 - You're My Queen";
  document.getElementById('badgeText').textContent  = appConfig.badgeText  || "20.10 Vietnamese Women's Day";
  document.getElementById('footerText').textContent = appConfig.footerText || "Gửi trọn yêu thương ngày 20/10 • Ngày Phụ Nữ Việt Nam";

  if (appConfig.bgUrl && appConfig.bgUrl.trim() !== '') {
    customBgLayer.style.backgroundImage = `url('${appConfig.bgUrl}')`;
    customBgLayer.style.opacity = '1';
    const opVal = (appConfig.bgOpacity || 78) / 100;
    customBgOverlay.style.background = `rgba(255, 241, 242, ${opVal})`;
  } else {
    customBgLayer.style.backgroundImage = 'none';
    customBgLayer.style.opacity = '0';
    customBgOverlay.style.background = 'linear-gradient(135deg, rgba(255, 241, 242, 0.82) 0%, rgba(254, 205, 211, 0.78) 100%)';
  }

  if (appConfig.photos && appConfig.photos.length > 0) {
    albumGallerySection.classList.remove('hidden');
    renderAutoFilmstrip();
  } else {
    albumGallerySection.classList.add('hidden');
  }

  document.getElementById('displayTitleFixed').textContent    = appConfig.titleFixed || "You're My";
  document.getElementById('cardRecipientHeader').textContent  = appConfig.cardTitle  || "Thân gửi người phụ nữ tuyệt vời nhất!";
  document.getElementById('cardIntroContent').textContent     = appConfig.cardIntro  || "Nhân ngày Phụ Nữ Việt Nam 20/10, xin gửi tới bạn muôn vàn lời chúc an lành, rực rỡ và hạnh phúc nhất.";
  document.getElementById('cardLetterContent').textContent    = `"${appConfig.letter}"`;
  document.getElementById('cardSenderFooter').textContent     = `💖 ${appConfig.sender} 💖`;

  if (isRecipientMode) {
    if (appConfig.musicUrl && appConfig.musicUrl.trim() !== '') {
      recipientToolbar.classList.remove('hidden');
      recipientToolbar.classList.add('flex');
    } else {
      recipientToolbar.classList.add('hidden');
      recipientToolbar.classList.remove('flex');
    }
  }

  initFallingParticles();

  if (!isRecipientMode) {
    document.getElementById('inputPageTitle').value  = appConfig.pageTitle  || "Chúc Mừng 20/10 - You're My Queen";
    document.getElementById('inputBadgeText').value  = appConfig.badgeText  || "20.10 Vietnamese Women's Day";
    document.getElementById('inputFooterText').value = appConfig.footerText || "Gửi trọn yêu thương ngày 20/10 • Ngày Phụ Nữ Việt Nam";
    document.getElementById('inputTitleFixed').value = appConfig.titleFixed;
    document.getElementById('inputKeywords').value   = appConfig.keywords.join(', ');
    document.getElementById('inputWishLines').value  = appConfig.wishLines.join('\n');
    document.getElementById('inputCardTitle').value  = appConfig.cardTitle  || "Thân gửi người phụ nữ tuyệt vời nhất!";
    document.getElementById('inputCardIntro').value  = appConfig.cardIntro  || "Nhân ngày Phụ Nữ Việt Nam 20/10, xin gửi tới bạn muôn vàn lời chúc an lành, rực rỡ và hạnh phúc nhất.";
    document.getElementById('inputSenderName').value = appConfig.sender;
    document.getElementById('inputCardLetter').value = appConfig.letter;

    const isDataAudio = appConfig.musicUrl && appConfig.musicUrl.startsWith('data:audio');
    document.getElementById('inputMusicShareUrl').value = isDataAudio ? '' : (appConfig.musicUrl || '');

    const customAudioPreviewBox = document.getElementById('customAudioPreviewBox');
    const editorAudioPreview    = document.getElementById('editorAudioPreview');
    const customAudioName       = document.getElementById('customAudioName');
    if (customAudioPreviewBox && editorAudioPreview) {
      if (isDataAudio) {
        customAudioPreviewBox.classList.remove('hidden');
        customAudioPreviewBox.classList.add('flex');
        editorAudioPreview.src      = appConfig.musicUrl;
        customAudioName.textContent = appConfig.musicLabel || "File âm thanh / Ghi âm đã lưu";
      } else {
        customAudioPreviewBox.classList.add('hidden');
        customAudioPreviewBox.classList.remove('flex');
        editorAudioPreview.src = '';
      }
    }

    document.getElementById('inputBgUrl').value       = (appConfig.bgUrl && !appConfig.bgUrl.startsWith('data:')) ? appConfig.bgUrl : '';
    document.getElementById('bgOverlayRange').value   = appConfig.bgOpacity || 78;
    document.getElementById('bgOverlayVal').textContent = `${appConfig.bgOpacity || 78}%`;

    const effectRadios = document.getElementsByName('fallEffect');
    effectRadios.forEach(r => { if (r.value === (appConfig.fallEffect || 'petals')) r.checked = true; });

    renderEditorThumbnailList();
  }
}
applyConfigToDom();

/* ==========================================================
 * 6. HỆ THỐNG ÂM THANH
 * ========================================================== */
let isMusicPlaying   = false;
let ytPlayer         = null;
let isYtReady        = false;
let currentYtVideoId = null;
let pendingPlayMusic  = false;

const bgAudio = document.getElementById('bgAudio');
bgAudio.volume = 0.8;

function extractYouTubeId(url) {
  if (!url) return null;
  const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

function loadYouTubeAPI() {
  if (window.YT && window.YT.Player) { initYouTubePlayer(); return; }
  if (!document.getElementById('yt-iframe-api')) {
    const tag = document.createElement('script');
    tag.id  = 'yt-iframe-api';
    tag.src = "https://www.youtube.com/iframe_api";
    document.getElementsByTagName('script')[0].parentNode.insertBefore(tag, document.getElementsByTagName('script')[0]);
  }
}

window.onYouTubeIframeAPIReady = function() { initYouTubePlayer(); };

function initYouTubePlayer() {
  const vidId = extractYouTubeId(appConfig.musicUrl);
  if (!vidId) return;
  currentYtVideoId = vidId;

  if (ytPlayer && typeof ytPlayer.loadVideoById === 'function') {
    ytPlayer.loadVideoById({ videoId: vidId, startSeconds: 0 });
    return;
  }

  ytPlayer = new YT.Player('ytPlayer', {
    height: '10', width: '10',
    videoId: vidId,
    playerVars: { autoplay: 1, controls: 0, loop: 1, playlist: vidId, playsinline: 1, rel: 0 },
    events: {
      onReady: (event) => {
        isYtReady = true;
        event.target.setVolume(85);
        if (pendingPlayMusic || (appConfig.musicUrl && appConfig.musicUrl.trim() !== '')) {
          event.target.playVideo();
        }
      },
      onStateChange: (event) => {
        if (event.data === YT.PlayerState.PLAYING) {
          isMusicPlaying = true; pendingPlayMusic = false; updateMusicUI();
        } else if (event.data === YT.PlayerState.PAUSED) {
          isMusicPlaying = false; updateMusicUI();
        } else if (event.data === YT.PlayerState.ENDED) {
          event.target.playVideo();
        }
      }
    }
  });
}

function playMusic() {
  const url = (appConfig.musicUrl || '').trim();
  if (!url) {
    isMusicPlaying = false;
    bgAudio.pause();
    if (ytPlayer && isYtReady && typeof ytPlayer.pauseVideo === 'function') ytPlayer.pauseVideo();
    updateMusicUI();
    return;
  }

  const ytId = extractYouTubeId(url);
  if (ytId) {
    bgAudio.pause();
    pendingPlayMusic = true;
    if (!window.YT || !window.YT.Player || !ytPlayer) {
      loadYouTubeAPI();
    } else if (isYtReady) {
      if (currentYtVideoId !== ytId) {
        currentYtVideoId = ytId;
        ytPlayer.loadVideoById({ videoId: ytId, startSeconds: 0 });
      } else {
        ytPlayer.playVideo();
      }
    }
  } else {
    if (ytPlayer && isYtReady && typeof ytPlayer.pauseVideo === 'function') ytPlayer.pauseVideo();
    if (bgAudio.src !== url) bgAudio.src = url;
    bgAudio.play().then(() => {
      isMusicPlaying  = true;
      pendingPlayMusic = false;
      updateMusicUI();
    }).catch(() => {
      isMusicPlaying  = false;
      pendingPlayMusic = true;
      updateMusicUI();
    });
  }
}

function pauseMusic() {
  isMusicPlaying  = false;
  pendingPlayMusic = false;
  bgAudio.pause();
  if (ytPlayer && isYtReady && typeof ytPlayer.pauseVideo === 'function') ytPlayer.pauseVideo();
  updateMusicUI();
}

function toggleMusic() {
  if (isMusicPlaying) pauseMusic();
  else playMusic();
}

const miniDisc         = document.getElementById('miniDisc');
const soundWave        = document.getElementById('soundWave');
const playStatusLabel  = document.getElementById('playStatusLabel');
const togglePlayMusicBtn = document.getElementById('togglePlayMusicBtn');

function updateMusicUI() {
  if (isMusicPlaying) {
    miniDisc.classList.remove('disc-paused');
    soundWave.classList.remove('wave-paused');
    if (playStatusLabel) playStatusLabel.innerText = "Đang phát 🎵";
  } else {
    miniDisc.classList.add('disc-paused');
    soundWave.classList.add('wave-paused');
    if (playStatusLabel) playStatusLabel.innerText = "Bật nhạc 🎵";
  }
}
togglePlayMusicBtn.addEventListener('click', (e) => { e.stopPropagation(); toggleMusic(); });

function unlockAutoPlayOnInteraction() {
  if (appConfig.musicUrl && appConfig.musicUrl.trim() !== '' && !isMusicPlaying) playMusic();
}
document.addEventListener('click',      unlockAutoPlayOnInteraction, { once: true });
document.addEventListener('touchstart', unlockAutoPlayOnInteraction, { once: true });

/* ==========================================================
 * 7. TIÊU ĐỀ LUÂN PHIÊN TỪ KHÓA
 * ========================================================== */
const keywordElement = document.getElementById('keywordText');
let kwIndex    = 0;
let charIndex  = 0;
let isDeleting = false;
let keywordTimer = null;

function loopKeywords() {
  clearTimeout(keywordTimer);
  const list           = (appConfig.keywords && appConfig.keywords.length > 0) ? appConfig.keywords : ["Queen"];
  const currentKeyword = list[kwIndex % list.length];

  if (isDeleting) {
    keywordElement.textContent = currentKeyword.substring(0, charIndex - 1);
    charIndex--;
  } else {
    keywordElement.textContent = currentKeyword.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 70 : 130;
  if (!isDeleting && charIndex === currentKeyword.length) {
    speed = 2400; isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    kwIndex = (kwIndex + 1) % list.length;
    speed = 400;
  }
  keywordTimer = setTimeout(loopKeywords, speed);
}
charIndex = (appConfig.keywords[0] || "Queen").length;
keywordElement.textContent = appConfig.keywords[0] || "Queen";
isDeleting = true;
setTimeout(loopKeywords, 2200);

/* ==========================================================
 * 8. LỜI CHÚC GÕ PHÍM TYPEWRITER
 * ========================================================== */
const wishContainer = document.getElementById('wishContainer');
let lineIdx     = 0;
let wishCharIdx = 0;
let wishTimer   = null;

function renderWishStructure() {
  wishContainer.innerHTML = '';
  appConfig.wishLines.forEach((_, idx) => {
    const div = document.createElement('div');
    div.id = `wish-line-${idx}`;
    if (idx === 0)                                    div.className = "font-bold text-pink-900 text-base sm:text-xl not-italic tracking-wide";
    else if (idx === 2)                               div.className = "font-semibold text-pink-900";
    else if (idx === appConfig.wishLines.length - 1)  div.className = "font-semibold text-rose-800";
    wishContainer.appendChild(div);
  });
}

function typeWish() {
  if (lineIdx >= appConfig.wishLines.length) return;
  const lineEl   = document.getElementById(`wish-line-${lineIdx}`);
  const fullText = appConfig.wishLines[lineIdx];
  if (!lineEl) return;

  if (wishCharIdx < fullText.length) {
    lineEl.innerHTML = escapeHtml(fullText.substring(0, wishCharIdx + 1)) + '<span class="typing-sub-cursor"></span>';
    wishCharIdx++;
    wishTimer = setTimeout(typeWish, 38 + Math.random() * 28);
  } else {
    lineEl.innerHTML = escapeHtml(fullText);
    lineIdx++;
    wishCharIdx = 0;
    wishTimer = setTimeout(typeWish, 320);
  }
}

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function restartWishTyping() {
  clearTimeout(wishTimer);
  renderWishStructure();
  lineIdx = 0; wishCharIdx = 0;
  typeWish();
}

document.getElementById('restartBtn').addEventListener('click', () => {
  restartWishTyping();
});

/* ==========================================================
 * 9. HỘP QUÀ TƯƠNG TÁC
 * ========================================================== */
const giftBoxBtn        = document.getElementById('giftBoxBtn');
const giftSvg           = document.getElementById('giftSvg');
const cardOverlay       = document.getElementById('cardOverlay');
const closeCardBtn      = document.getElementById('closeCardBtn');
const celebrateAgainBtn = document.getElementById('celebrateAgainBtn');

function openGiftBox() {
  if (appConfig.musicUrl && appConfig.musicUrl.trim() !== '' && !isMusicPlaying) playMusic();
  giftSvg.classList.add('gift-open');
  const rect    = giftBoxBtn.getBoundingClientRect();
  const originX = rect.left + rect.width / 2;
  const originY = rect.top  + rect.height / 3;
  launchCelebration(originX, originY);

  setTimeout(() => {
    cardOverlay.classList.add('active');
    if (appConfig.photos && appConfig.photos.length > 0) renderAutoFilmstrip();
  }, 550);
}
giftBoxBtn.addEventListener('click', openGiftBox);

closeCardBtn.addEventListener('click', () => {
  cardOverlay.classList.remove('active');
  setTimeout(() => giftSvg.classList.remove('gift-open'), 300);
});

celebrateAgainBtn.addEventListener('click', () => {
  launchCelebration(window.innerWidth / 2, window.innerHeight / 2);
});

cardOverlay.addEventListener('click', (e) => {
  if (e.target === cardOverlay) {
    cardOverlay.classList.remove('active');
    setTimeout(() => giftSvg.classList.remove('gift-open'), 300);
  }
});

/* ==========================================================
 * 10. MODAL EDITOR VÀ LƯU TRỮ (BẢO VỆ DỮ LIỆU LINK TẶNG)
 * ========================================================== */
const openEditorModalBtn  = document.getElementById('openEditorModalBtn');
const closeEditorModalBtn = document.getElementById('closeEditorModalBtn');
const editorModalOverlay  = document.getElementById('editorModalOverlay');
const applyPreviewBtn     = document.getElementById('applyPreviewBtn');
const generateShareLinkBtn = document.getElementById('generateShareLinkBtn');

if (openEditorModalBtn) {
  openEditorModalBtn.addEventListener('click', () => {
    renderEditorThumbnailList();
    editorModalOverlay.classList.add('active');
  });
  closeEditorModalBtn.addEventListener('click', () => editorModalOverlay.classList.remove('active'));
  editorModalOverlay.addEventListener('click', (e) => {
    if (e.target === editorModalOverlay) editorModalOverlay.classList.remove('active');
  });

  // Tải nhiều ảnh lên Cloudinary tự động
  document.getElementById('multiPhotosFileInput').addEventListener('change', async function(e) {
    const files = Array.from(this.files || []);
    if (files.length === 0) return;
    
    showToast(`Đang tải ${files.length} ảnh lên... ☁️`);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const secureUrl = await uploadImageToCloudinary(file);
        if (!appConfig.photos) appConfig.photos = [];
        appConfig.photos.push({ url: secureUrl, caption: file.name.replace(/\.[^/.]+$/, "") });
      } catch (err) {
        showToast("Lỗi tải ảnh !");
      }
    }
    this.value = '';
    renderEditorThumbnailList();
    showToast("✓ Đã tải ảnh thành công! ✨");
  });

  document.getElementById('inputPhotosUrls').addEventListener('change', function() {
    const lines = this.value.split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length > 0) {
      if (!appConfig.photos) appConfig.photos = [];
      lines.forEach((url) => {
        const parts    = url.split('|');
        const cleanUrl = parts[0].trim();
        const customCap = parts[1] ? parts[1].trim() : `Khoảnh khắc #${appConfig.photos.length + 1} ✨`;
        if (cleanUrl) appConfig.photos.push({ url: cleanUrl, caption: customCap });
      });
      renderEditorThumbnailList();
      showToast(`✓ Đã thêm ${lines.length} ảnh!`);
      this.value = '';
    }
  });

  document.getElementById('clearAllPhotosBtn').addEventListener('click', () => {
    appConfig.photos = [];
    renderEditorThumbnailList();
    showToast("Đã xóa toàn bộ ảnh trong thiệp.");
  });

  document.getElementById('bgFileInput').addEventListener('change', async function() {
    const file = this.files && this.files[0];
    if (!file) return;
    showToast("Đang tải ảnh nền lên Cloudinary... ☁️");
    try {
      const secureUrl = await uploadImageToCloudinary(file);
      appConfig.bgUrl = secureUrl;
      document.getElementById('inputBgUrl').value = secureUrl;
      showToast("✓ Đã tải ảnh nền thành công!");
    } catch (err) {
      showToast("Lỗi tải ảnh nền!");
    }
  });

  document.getElementById('clearBgBtn').addEventListener('click', () => {
    appConfig.bgUrl = '';
    document.getElementById('inputBgUrl').value   = '';
    document.getElementById('bgFileInput').value  = '';
    showToast("Đã chuyển về nền pastel mặc định.");
  });

  const bgOverlayRange = document.getElementById('bgOverlayRange');
  const bgOverlayVal   = document.getElementById('bgOverlayVal');
  bgOverlayRange.addEventListener('input', function() {
    bgOverlayVal.textContent = `${this.value}%`;
    appConfig.bgOpacity = parseInt(this.value);
    if (appConfig.bgUrl) {
      customBgOverlay.style.background = `rgba(255, 241, 242, ${appConfig.bgOpacity / 100})`;
    }
  });

  // Xử lý tải file nhạc MP3 lên Cloudinary
  const musicFileInput        = document.getElementById('musicFileInput');
  const customAudioPreviewBox = document.getElementById('customAudioPreviewBox');
  const editorAudioPreview    = document.getElementById('editorAudioPreview');
  const customAudioName       = document.getElementById('customAudioName');
  const clearMusicBtn         = document.getElementById('clearMusicBtn');

  musicFileInput.addEventListener('change', async function() {
    const file = this.files && this.files[0];
    if (!file) return;
    showToast("Đang tải file nhạc lên mây... 🎵");
    try {
      const secureUrl = await uploadImageToCloudinary(file);
      appConfig.musicUrl = secureUrl;
      appConfig.musicLabel = `File: ${file.name}`;
      document.getElementById('inputMusicShareUrl').value = secureUrl;
      customAudioPreviewBox.classList.remove('hidden');
      customAudioPreviewBox.classList.add('flex');
      editorAudioPreview.src      = secureUrl;
      customAudioName.textContent = appConfig.musicLabel;
      showToast(`✓ Đã tải nhạc lên mây thành công!`);
    } catch (err) {
      showToast("Lỗi tải file nhạc!");
    }
    this.value = '';
  });

  // Ghi âm trực tiếp
  let mediaRecorder  = null;
  let audioChunks    = [];
  let recordInterval = null;
  let recordSeconds  = 0;

  const startRecordBtn   = document.getElementById('startRecordBtn');
  const stopRecordBtn    = document.getElementById('stopRecordBtn');
  const recordTimer      = document.getElementById('recordTimer');
  const recordStatusText = document.getElementById('recordStatusText');

  function formatRecordTime(sec) {
    const m = String(Math.floor(sec / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    return `${m}:${s}`;
  }

  startRecordBtn.addEventListener('click', async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      showToast("⚠️ Trình duyệt không hỗ trợ ghi âm.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunks = [];
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = (e) => { if (e.data && e.data.size > 0) audioChunks.push(e.data); };
      mediaRecorder.onstop = async () => {
        stream.getTracks().forEach(track => track.stop());
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        const audioFile = new File([audioBlob], "recording.webm", { type: 'audio/webm' });
        showToast("Đang tải bản ghi âm lên Cloudinary... 🎙️");
        try {
          const secureUrl = await uploadImageToCloudinary(audioFile);
          appConfig.musicUrl = secureUrl;
          appConfig.musicLabel = `Bản ghi âm`;
          document.getElementById('inputMusicShareUrl').value = secureUrl;
          customAudioPreviewBox.classList.remove('hidden');
          customAudioPreviewBox.classList.add('flex');
          editorAudioPreview.src = secureUrl;
          customAudioName.textContent = appConfig.musicLabel;
          recordStatusText.textContent = "Đã lưu bản ghi âm trên mây thành công!";
          showToast("🎙️ Lưu bản ghi âm thành công!");
        } catch (err) {
          showToast("Lỗi tải bản ghi âm lên mây!");
        }
      };

      mediaRecorder.start();
      recordSeconds = 0;
      recordTimer.textContent = "00:00";
      startRecordBtn.classList.add('hidden');
      stopRecordBtn.classList.remove('hidden');
      stopRecordBtn.classList.add('flex');
      recordStatusText.textContent = "Đang thu âm...";
      recordInterval = setInterval(() => { recordSeconds++; recordTimer.textContent = formatRecordTime(recordSeconds); }, 1000);
    } catch (err) {
      showToast("⚠️ Cần cấp quyền Micro để ghi âm!");
    }
  });

  stopRecordBtn.addEventListener('click', () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') mediaRecorder.stop();
    clearInterval(recordInterval);
    stopRecordBtn.classList.add('hidden');
    stopRecordBtn.classList.remove('flex');
    startRecordBtn.classList.remove('hidden');
  });

  clearMusicBtn.addEventListener('click', () => {
    appConfig.musicUrl   = '';
    appConfig.musicLabel = '';
    document.getElementById('inputMusicShareUrl').value = '';
    customAudioPreviewBox.classList.add('hidden');
    customAudioPreviewBox.classList.remove('flex');
    editorAudioPreview.pause();
    editorAudioPreview.src = '';
    pauseMusic();
    showToast("Đã xóa nhạc nền.");
  });

  function collectCurrentSettings() {
    appConfig.pageTitle  = document.getElementById('inputPageTitle').value.trim()  || "Chúc Mừng 20/10 - You're My Queen";
    appConfig.badgeText  = document.getElementById('inputBadgeText').value.trim()  || "20.10 Vietnamese Women's Day";
    appConfig.footerText = document.getElementById('inputFooterText').value.trim() || "Gửi trọn yêu thương ngày 20/10 • Ngày Phụ Nữ Việt Nam";

    const titleFixed = document.getElementById('inputTitleFixed').value.trim() || "You're My";
    const kwStr      = document.getElementById('inputKeywords').value;
    const keywords   = kwStr.split(',').map(s => s.trim()).filter(Boolean);
    const wishText   = document.getElementById('inputWishLines').value;
    const wishLines  = wishText.split('\n').map(s => s.trim()).filter(Boolean);
    const cardTitle  = document.getElementById('inputCardTitle').value.trim()  || "Thân gửi người phụ nữ tuyệt vời nhất!";
    const cardIntro  = document.getElementById('inputCardIntro').value.trim()  || "Nhân ngày Phụ Nữ Việt Nam 20/10, xin gửi tới bạn muôn vàn lời chúc an lành, rực rỡ và hạnh phúc nhất.";
    const sender     = document.getElementById('inputSenderName').value.trim() || "You're always my Sunshine, my Love & my Queen!";
    const letter     = document.getElementById('inputCardLetter').value.trim();
    const typedMusicUrl = document.getElementById('inputMusicShareUrl').value.trim();
    const typedBgUrl    = document.getElementById('inputBgUrl').value.trim();

    if (typedBgUrl) appConfig.bgUrl = typedBgUrl;

    const selectedEffect = document.querySelector('input[name="fallEffect"]:checked');
    appConfig.fallEffect = selectedEffect ? selectedEffect.value : "petals";
    appConfig.titleFixed = titleFixed;
    appConfig.keywords   = keywords.length ? keywords : ["Queen"];
    appConfig.wishLines  = wishLines.length ? wishLines : ["Chúc mừng 20/10!"];
    appConfig.cardTitle  = cardTitle;
    appConfig.cardIntro  = cardIntro;
    appConfig.sender     = sender;
    appConfig.letter     = letter;
    if (typedMusicUrl) { appConfig.musicUrl = typedMusicUrl; appConfig.musicLabel = ''; }
    appConfig.bgOpacity = parseInt(bgOverlayRange.value) || 78;

    return appConfig;
  }

  applyPreviewBtn.addEventListener('click', () => {
    collectCurrentSettings();
    applyConfigToDom();
    if (appConfig.musicUrl && appConfig.musicUrl.trim() !== '') playMusic();
    else pauseMusic();
    restartWishTyping();
    kwIndex = 0;
    charIndex = (appConfig.keywords[0] || "Queen").length;
    keywordElement.textContent = appConfig.keywords[0] || "Queen";
    isDeleting = true;
    editorModalOverlay.classList.remove('active');
    showToast("Đã cập nhật xem trước thành công!");
  });

  generateShareLinkBtn.addEventListener('click', () => {
    if (isUploadingImage) {
      showToast("⏳ Ảnh đang được tải lên mây, vui lòng đợi 2 giây rồi bấm lại nhé!");
      return;
    }
    collectCurrentSettings();
    applyConfigToDom();
    const token = encodeConfigToHash(appConfig);
    const base  = window.location.origin.startsWith('http')
      ? window.location.origin + '/'
      : window.location.href.split(/[?#]/)[0];
    const fullShareUrl = base + '?c=' + token;

    navigator.clipboard.writeText(fullShareUrl).then(() => {
      editorModalOverlay.classList.remove('active');
      showToast("✨ Đã sao chép link tặng siêu gọn vào bộ nhớ tạm!");
    }).catch(() => {
      prompt("Sao chép đường link này:", fullShareUrl);
    });
  });
}

/* ==========================================================
 * 11. CANVAS PHÁO HOA KHI MỞ HỘP QUÀ
 * ========================================================== */
const confettiCanvas = document.getElementById('confetti-canvas');
const cCtx           = confettiCanvas.getContext('2d');
let confettiParticles = [];

function resizeConfetti() {
  confettiCanvas.width  = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeConfetti);
resizeConfetti();

class Confetti {
  constructor(x, y) {
    this.x       = x;
    this.y       = y;
    this.isHeart = Math.random() > 0.45;
    this.size    = this.isHeart ? (12 + Math.random() * 12) : (6 + Math.random() * 7);
    const angle  = Math.random() * Math.PI * 2;
    const speed  = 4 + Math.random() * 9.5;
    this.vx       = Math.cos(angle) * speed;
    this.vy       = Math.sin(angle) * speed - 3.5;
    this.gravity  = 0.22;
    this.friction = 0.96;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotSpeed = (Math.random() - 0.5) * 0.2;
    this.alpha    = 1;
    this.decay    = 0.009 + Math.random() * 0.012;
    const colors  = ['#f43f5e', '#ec4899', '#db2777', '#f472b6', '#fb7185', '#fda4af', '#ffffff'];
    this.color    = colors[Math.floor(Math.random() * colors.length)];
  }

  update() {
    this.vx *= this.friction;
    this.vy  = this.vy * this.friction + this.gravity;
    this.x  += this.vx;
    this.y  += this.vy;
    this.rotation += this.rotSpeed;
    this.alpha    -= this.decay;
  }

  draw() {
    if (this.alpha <= 0) return;
    cCtx.save();
    cCtx.globalAlpha = Math.max(0, this.alpha);
    cCtx.translate(this.x, this.y);
    cCtx.rotate(this.rotation);

    if (this.isHeart) {
      cCtx.fillStyle = this.color;
      cCtx.beginPath();
      const d = this.size;
      cCtx.moveTo(0, d / 4);
      cCtx.quadraticCurveTo(0, 0, d / 4, 0);
      cCtx.quadraticCurveTo(d / 2, 0, d / 2, d / 4);
      cCtx.quadraticCurveTo(d / 2, 0, (3 * d) / 4, 0);
      cCtx.quadraticCurveTo(d, 0, d, d / 4);
      cCtx.quadraticCurveTo(d, d / 2, (3 * d) / 4, (3 * d) / 4);
      cCtx.lineTo(d / 2, d);
      cCtx.lineTo(d / 4, (3 * d) / 4);
      cCtx.quadraticCurveTo(0, d / 2, 0, d / 4);
      cCtx.closePath();
      cCtx.fill();
    } else {
      cCtx.fillStyle = this.color;
      cCtx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 0.65);
    }
    cCtx.restore();
  }
}

function launchCelebration(x, y) {
  for (let i = 0; i < 90; i++) confettiParticles.push(new Confetti(x, y));
}

function renderConfetti() {
  cCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  for (let i = confettiParticles.length - 1; i >= 0; i--) {
    const p = confettiParticles[i];
    p.update();
    p.draw();
    if (p.alpha <= 0 || p.y > confettiCanvas.height + 50) confettiParticles.splice(i, 1);
  }
  requestAnimationFrame(renderConfetti);
}
renderConfetti();

/* ==========================================================
 * 12. KHỞI CHẠY LẦN ĐẦU
 * ========================================================== */
window.onload = () => {
  renderWishStructure();
  setTimeout(typeWish, 650);
  if (appConfig.musicUrl && appConfig.musicUrl.trim() !== '') playMusic();
};