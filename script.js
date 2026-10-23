/* ==========================================================
 * 1. CẤU HÌNH & XỬ LÝ DỮ LIỆU
 * ========================================================== */
const DEFAULT_CONFIG = {
  pageTitle: "Chúc Mừng 20/10 - You're My Queen",
  badgeText: "20.10 Vietnamese Women's Day",
  footerText: "Gửi trọn yêu thương ngày 20/10 • Ngày Phụ Nữ Việt Nam",
  fallEffect: "petals", // 'petals', 'hearts', 'letters', 'stars', 'mix'
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

let appConfig = { ...DEFAULT_CONFIG };
let isRecipientMode = false;

// Nén ảnh tối ưu độ nét và kích thước (700px - 0.72) giúp chạy mượt mà, không lag giật
function compressImageFile(file, maxWidth, quality, callback) {
  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      let w = img.width;
      let h = img.height;
      if (w > maxWidth) {
        h = Math.round((h * maxWidth) / w);
        w = maxWidth;
      }
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'medium';
      ctx.drawImage(img, 0, 0, w, h);
      const dataUrl = canvas.toDataURL('image/jpeg', quality);
      callback(dataUrl);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function encodeConfigToHash(cfg) {
  try {
    const jsonStr = JSON.stringify(cfg);
    const encoded = encodeURIComponent(jsonStr);
    return btoa(encoded);
  } catch (e) {
    return "";
  }
}

function decodeHashToConfig(hashStr) {
  try {
    const decoded = atob(hashStr);
    const jsonStr = decodeURIComponent(decoded);
    return JSON.parse(jsonStr);
  } catch (e) {
    return null;
  }
}

function checkURLMode() {
  const hash = window.location.hash;
  if (hash && hash.startsWith('#card=')) {
    const code = hash.replace('#card=', '');
    const parsed = decodeHashToConfig(code);
    if (parsed) {
      appConfig = { ...DEFAULT_CONFIG, ...parsed };
      if (parsed.secretImg && (!appConfig.photos || appConfig.photos.length === 0)) {
        appConfig.photos = [{ url: parsed.secretImg, caption: "Khoảnh khắc tuyệt đẹp ✨" }];
      }
      if (parsed.recipient && !parsed.cardTitle) {
        appConfig.cardTitle = `Thân gửi ${parsed.recipient}!`;
      }
      isRecipientMode = true;
    }
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

  // Nếu chỉ có 1 ảnh thì hiển thị chính giữa không cần cuộn vô tận
  if (photos.length === 1) {
    filmstripTrack.style.animation = 'none';
    filmstripTrack.style.margin = '0 auto';
    filmstripTrack.appendChild(createFilmCard(photos[0], 0));
    return;
  }

  // Nhân đôi danh sách ảnh để tạo hiệu ứng trượt cuộn Film vô tận mượt mà
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
 * 5. CANVAS HIỆU ỨNG RƠI ĐA DẠNG (HOA, TRÁI TIM, THIỆP THƯ, SAO)
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
      this.envelopeColor    = '#fff7ed';
      this.heartStampColor  = '#e11d48';
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
      fCtx.beginPath();
      fCtx.moveTo(-w/2, -h/2);
      fCtx.lineTo(0, h * 0.15);
      fCtx.lineTo(w/2, -h/2);
      fCtx.strokeStyle = '#fda4af';
      fCtx.stroke();
      fCtx.fillStyle = '#e11d48';
      fCtx.beginPath();
      fCtx.arc(0, h * 0.05, 2, 0, Math.PI * 2);
      fCtx.fill();

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
 * 6. HỆ THỐNG ÂM THANH (HỖ TRỢ CẢ LINK YOUTUBE & MP3 TỰ PHÁT)
 * ========================================================== */
let audioCtx         = null;
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

function initAudio() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === 'suspended') audioCtx.resume();
}

function playTypingSound()  { /* Đã tắt tiếng gõ phím mặc định */ }
function playChimeMelody()  { /* Đã tắt giai điệu nhạc chuông mặc định */ }

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
    playTypingSound();
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
  initAudio();
  restartWishTyping();
});

/* ==========================================================
 * 9. HỘP QUÀ TƯƠNG TÁC
 * ========================================================== */
const giftBoxBtn       = document.getElementById('giftBoxBtn');
const giftSvg          = document.getElementById('giftSvg');
const cardOverlay      = document.getElementById('cardOverlay');
const closeCardBtn     = document.getElementById('closeCardBtn');
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
  playChimeMelody();
  launchCelebration(window.innerWidth / 2, window.innerHeight / 2);
});

cardOverlay.addEventListener('click', (e) => {
  if (e.target === cardOverlay) {
    cardOverlay.classList.remove('active');
    setTimeout(() => giftSvg.classList.remove('gift-open'), 300);
  }
});

/* ==========================================================
 * 10. MODAL EDITOR VÀ LƯU TRỮ
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

  // Tải nhiều ảnh tối ưu mượt mà không lag (750px - 0.72)
  document.getElementById('multiPhotosFileInput').addEventListener('change', function(e) {
    const files = Array.from(this.files || []);
    if (files.length === 0) return;
    let loadedCount = 0;
    files.forEach((file) => {
      compressImageFile(file, 750, 0.72, (dataUrl) => {
        if (!appConfig.photos) appConfig.photos = [];
        appConfig.photos.push({ url: dataUrl, caption: `Khoảnh khắc xinh đẹp #${appConfig.photos.length + 1} ✨` });
        loadedCount++;
        if (loadedCount === files.length) {
          renderEditorThumbnailList();
          showToast(`✓ Đã thêm ${loadedCount} ảnh! Hãy nhập thông điệp riêng cho từng ảnh nhé.`);
        }
      });
    });
    this.value = '';
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
      showToast(`✓ Đã thêm ${lines.length} ảnh! Bạn có thể sửa lời nhắn từng ảnh ở bên dưới.`);
      this.value = '';
    }
  });

  document.getElementById('clearAllPhotosBtn').addEventListener('click', () => {
    appConfig.photos = [];
    renderEditorThumbnailList();
    showToast("Đã xóa toàn bộ ảnh trong thiệp.");
  });

  document.getElementById('bgFileInput').addEventListener('change', function() {
    if (this.files && this.files[0]) {
      compressImageFile(this.files[0], 1200, 0.75, (dataUrl) => {
        appConfig.bgUrl = dataUrl;
        document.getElementById('inputBgUrl').value = '';
        showToast("✓ Đã tải ảnh nền mới!");
      });
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

  // Xử lý tải file nhạc MP3/Audio tự edit từ máy
  const musicFileInput        = document.getElementById('musicFileInput');
  const customAudioPreviewBox = document.getElementById('customAudioPreviewBox');
  const editorAudioPreview    = document.getElementById('editorAudioPreview');
  const customAudioName       = document.getElementById('customAudioName');
  const clearMusicBtn         = document.getElementById('clearMusicBtn');

  musicFileInput.addEventListener('change', function() {
    const file = this.files && this.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
      const dataUrl = e.target.result;
      appConfig.musicUrl   = dataUrl;
      appConfig.musicLabel = `File: ${file.name}`;
      document.getElementById('inputMusicShareUrl').value = '';
      customAudioPreviewBox.classList.remove('hidden');
      customAudioPreviewBox.classList.add('flex');
      editorAudioPreview.src      = dataUrl;
      customAudioName.textContent = appConfig.musicLabel;
      showToast(`✓ Đã nạp đoạn nhạc "${file.name}"!`);
    };
    reader.readAsDataURL(file);
    this.value = '';
  });

  // Xử lý Ghi âm trực tiếp trên trình duyệt
  let mediaRecorder  = null;
  let audioChunks    = [];
  let recordInterval = null;
  let recordSeconds  = 0;

  const startRecordBtn  = document.getElementById('startRecordBtn');
  const stopRecordBtn   = document.getElementById('stopRecordBtn');
  const recordTimer     = document.getElementById('recordTimer');
  const recordStatusText = document.getElementById('recordStatusText');

  function formatRecordTime(sec) {
    const m = String(Math.floor(sec / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    return `${m}:${s}`;
  }

  startRecordBtn.addEventListener('click', async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      showToast("⚠️ Trình duyệt của bạn không hỗ trợ thu âm trực tiếp.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, sampleRate: 22050 }
      });
      audioChunks = [];
      const options = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? { mimeType: 'audio/webm;codecs=opus', audioBitsPerSecond: 32000 }
        : (MediaRecorder.isTypeSupported('audio/mp4') ? { mimeType: 'audio/mp4', audioBitsPerSecond: 32000 } : {});

      mediaRecorder = new MediaRecorder(stream, options);
      mediaRecorder.ondataavailable = (e) => { if (e.data && e.data.size > 0) audioChunks.push(e.data); };
      mediaRecorder.onstop = () => {
        stream.getTracks().forEach(track => track.stop());
        const mimeType  = mediaRecorder.mimeType || 'audio/webm';
        const audioBlob = new Blob(audioChunks, { type: mimeType });
        const reader    = new FileReader();
        reader.onloadend = () => {
          const base64Audio        = reader.result;
          appConfig.musicUrl       = base64Audio;
          appConfig.musicLabel     = `Bản ghi âm (${formatRecordTime(recordSeconds)})`;
          document.getElementById('inputMusicShareUrl').value = '';
          customAudioPreviewBox.classList.remove('hidden');
          customAudioPreviewBox.classList.add('flex');
          editorAudioPreview.src      = base64Audio;
          customAudioName.textContent = appConfig.musicLabel;
          recordStatusText.textContent = "Đã lưu bản ghi âm! Bạn có thể nghe thử ở bên dưới.";
          showToast("🎙️ Đã lưu bản ghi âm giọng nói thành công!");
        };
        reader.readAsDataURL(audioBlob);
      };

      mediaRecorder.start();
      recordSeconds = 0;
      recordTimer.textContent = "00:00";
      startRecordBtn.classList.add('hidden');
      stopRecordBtn.classList.remove('hidden');
      stopRecordBtn.classList.add('flex');
      recordStatusText.textContent = "Đang thu âm... Hãy nói lời chúc hoặc hát nhé!";
      recordInterval = setInterval(() => { recordSeconds++; recordTimer.textContent = formatRecordTime(recordSeconds); }, 1000);
    } catch (err) {
      showToast("⚠️ Vui lòng cấp quyền Micro cho trình duyệt để ghi âm!");
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
    appConfig.musicUrl  = '';
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
    showToast("Đã cập nhật xem trước & nhạc thành công!");
  });

  generateShareLinkBtn.addEventListener('click', () => {
    collectCurrentSettings();
    applyConfigToDom();
    const hashPayload  = encodeConfigToHash(appConfig);
    const fullShareUrl = window.location.origin + window.location.pathname + '#card=' + hashPayload;

    const copyTemp = document.createElement("input");
    document.body.appendChild(copyTemp);
    copyTemp.value = fullShareUrl;
    copyTemp.select();
    document.execCommand("copy");
    document.body.removeChild(copyTemp);

    editorModalOverlay.classList.remove('active');
    showToast("✨ Đã sao chép link tặng kèm hiệu ứng & ảnh! Người nhận sẽ chỉ thấy thông điệp thuần khiết.");
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
