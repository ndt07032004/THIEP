/**
 * 20/10 VIETNAMESE WOMEN'S DAY - SCRIPT.JS (Optimized for Cloudinary dq4xqmsrh & Hash Code Compression)
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- CLOUDINARY CONFIGURATION ---
  const CLOUD_NAME = 'dq4xqmsrh';
  const UPLOAD_PRESET = 'thiep2010';

  // --- MẶC ĐỊNH CẤU HÌNH BAN ĐẦU ---
  const defaultConfig = {
    pt: "Chúc Mừng 20/10 - You're My Queen",
    bt: "20.10 Vietnamese Women's Day",
    ft: "Gửi trọn yêu thương ngày 20/10 • Ngày Phụ Nữ Việt Nam",
    eff: "petals",
    tf: "You're My",
    kw: "Queen, Love, Sunshine",
    wl: [
      "20.10.2023 Ngày Phụ Nữ Việt Nam",
      "Chúc cho bà, mẹ, chị em phụ nữ",
      "Luôn xinh đẹp, mạnh khoẻ và hạnh phúc",
      "Chúc cho những người con gái",
      "Luôn được yêu thương, che chở",
      "Tìm được người mình yêu và cũng yêu thương mình <3"
    ],
    ct: "Thân gửi người phụ nữ tuyệt vời nhất!",
    ci: "Nhân ngày Phụ Nữ Việt Nam 20/10, xin gửi tới bạn muôn vàn lời chúc an lành, rực rỡ và hạnh phúc nhất.",
    cl: "Mong bạn mỗi ngày đều nở nụ cười rạng rỡ như đóa hồng ban mai, luôn luôn tự tin, kiêu hãnh và được yêu thương chở che đúng như cách một Nữ Hoàng xứng đáng!",
    sn: "You're always my Sunshine, my Love & my Queen!",
    bg: "",
    bo: 78,
    mu: "",
    ph: [] // Danh sách ảnh {url, caption}
  };

  // State hiện tại của trang
  let currentConfig = JSON.parse(JSON.stringify(defaultConfig));
  let isCreatorMode = true; // Mặc định mở trang là Creator Mode trừ khi có Hash param

  // Biến điều khiển âm thanh & hiệu ứng
  let bgAudioEl = document.getElementById('bgAudio');
  let ytPlayer = null;
  let isMusicPlaying = false;
  let customAudioBlobUrl = null;
  let mediaRecorder = null;
  let audioChunks = [];
  let recordTimerInterval = null;
  let recordSeconds = 0;

  // --- 1. XỬ LÝ HASH ENCODE / DECODE (RÚT GỌN LINK GỬI ĐI) ---
  function encodeConfigToHash(config) {
    try {
      // Loại bỏ bớt dữ liệu trùng lặp mặc định để link siêu gọn
      const cleanObj = {};
      if (config.pt !== defaultConfig.pt) cleanObj.pt = config.pt;
      if (config.bt !== defaultConfig.bt) cleanObj.bt = config.bt;
      if (config.ft !== defaultConfig.ft) cleanObj.ft = config.ft;
      if (config.eff !== defaultConfig.eff) cleanObj.eff = config.eff;
      if (config.tf !== defaultConfig.tf) cleanObj.tf = config.tf;
      if (config.kw !== defaultConfig.kw) cleanObj.kw = config.kw;
      if (JSON.stringify(config.wl) !== JSON.stringify(defaultConfig.wl)) cleanObj.wl = config.wl;
      if (config.ct !== defaultConfig.ct) cleanObj.ct = config.ct;
      if (config.ci !== defaultConfig.ci) cleanObj.ci = config.ci;
      if (config.cl !== defaultConfig.cl) cleanObj.cl = config.cl;
      if (config.sn !== defaultConfig.sn) cleanObj.sn = config.sn;
      if (config.bg) cleanObj.bg = config.bg;
      if (config.bo !== defaultConfig.bo) cleanObj.bo = config.bo;
      if (config.mu) cleanObj.mu = config.mu;
      if (config.ph && config.ph.length > 0) cleanObj.ph = config.ph;

      if (Object.keys(cleanObj).length === 0) return "";
      const jsonStr = JSON.stringify(cleanObj);
      const encoded = btoa(unescape(encodeURIComponent(jsonStr)));
      return `#card=${encoded}`;
    } catch (e) {
      console.error("Lỗi encode hash:", e);
      return "";
    }
  }

  function decodeConfigFromHash() {
    const hash = window.location.hash;
    if (!hash || !hash.startsWith('#card=')) return null;
    try {
      const base64Str = hash.replace('#card=', '');
      const jsonStr = decodeURIComponent(escape(atob(base64Str)));
      const parsed = JSON.parse(jsonStr);
      return { ...defaultConfig, ...parsed };
    } catch (e) {
      console.error("Lỗi decode hash:", e);
      return null;
    }
  }

  // --- 2. UPLOAD ẢNH LÊN CLOUDINARY (dq4xqmsrh) ---
  async function uploadImageToCloudinary(file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
    try {
      showToast("Đang tải ảnh lên Cloudinary...");
      const response = await fetch(url, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      if (data.secure_url) {
        showToast("Tải ảnh lên mây thành công! ☁️");
        return data.secure_url;
      } else {
        throw new Error(data.error?.message || "Upload failed");
      }
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      showToast("Lỗi tải ảnh lên Cloudinary. Vui lòng thử lại!");
      return null;
    }
  }

  // --- 3. KHỞI TẠO & RENDER GIAO DIỆN ---
  function initApp() {
    const loadedConfig = decodeConfigFromHash();
    if (loadedConfig) {
      currentConfig = loadedConfig;
      isCreatorMode = false; // Người nhận link sẽ ở Chế độ Người Nhận
    } else {
      isCreatorMode = true;
    }

    applyConfigToDOM();
    setupModeUI();
    initFallingAnimation(currentConfig.eff);
    initTypewriterEffect();
    initFireworksAndConfetti();
  }

  function applyConfigToDOM() {
    // Tiêu đề trang & header/footer
    document.title = currentConfig.pt;
    document.getElementById('badgeText').textContent = currentConfig.bt;
    document.getElementById('footerText').textContent = currentConfig.ft;

    // Ảnh nền & Overlay
    const bgLayer = document.getElementById('customBgLayer');
    const bgOverlay = document.getElementById('customBgOverlay');
    if (currentConfig.bg) {
      bgLayer.style.backgroundImage = `url('${currentConfig.bg}')`;
    } else {
      bgLayer.style.backgroundImage = 'none';
    }
    bgOverlay.style.background = `linear-gradient(135deg, rgba(255, 241, 242, ${currentConfig.bo / 100}) 0%, rgba(254, 205, 211, ${currentConfig.bo / 100}) 100%)`;

    // Tiêu đề cố định & Từ khóa xoay vòng
    document.getElementById('displayTitleFixed').textContent = currentConfig.tf;

    // Thiệp trong hộp quà
    document.getElementById('cardRecipientHeader').textContent = currentConfig.ct;
    document.getElementById('cardIntroContent').textContent = currentConfig.ci;
    document.getElementById('cardLetterContent').textContent = `"${currentConfig.cl}"`;
    document.getElementById('cardSenderFooter').textContent = `💖 ${currentConfig.sn} 💖`;

    // Album ảnh cuộn phim
    renderFilmstripGallery();

    // Nhạc nền
    if (currentConfig.mu) {
      setupAudioPlayer(currentConfig.mu);
    }

    // Đồng bộ form trong Editor Modal
    syncEditorForm();
  }

  function setupModeUI() {
    const creatorToolbar = document.getElementById('creatorToolbar');
    const recipientToolbar = document.getElementById('recipientToolbar');

    if (isCreatorMode) {
      creatorToolbar.classList.remove('hidden');
      recipientToolbar.classList.add('hidden');
    } else {
      creatorToolbar.classList.add('hidden');
      recipientToolbar.classList.remove('hidden');
      // Người nhận bấm màn hình hoặc nút nhạc để kích hoạt nhạc
    }
  }

  function syncEditorForm() {
    document.getElementById('inputPageTitle').value = currentConfig.pt;
    document.getElementById('inputBadgeText').value = currentConfig.bt;
    document.getElementById('inputFooterText').value = currentConfig.ft;
    document.getElementById('inputTitleFixed').value = currentConfig.tf;
    document.getElementById('inputKeywords').value = currentConfig.kw;
    document.getElementById('inputWishLines').value = currentConfig.wl.join('\n');
    document.getElementById('inputCardTitle').value = currentConfig.ct;
    document.getElementById('inputCardIntro').value = currentConfig.ci;
    document.getElementById('inputCardLetter').value = currentConfig.cl;
    document.getElementById('inputSenderName').value = currentConfig.sn;
    document.getElementById('inputBgUrl').value = currentConfig.bg.startsWith('http') ? currentConfig.bg : '';
    document.getElementById('bgOverlayRange').value = currentConfig.bo;
    document.getElementById('bgOverlayVal').textContent = currentConfig.bo + '%';
    document.getElementById('inputMusicShareUrl').value = currentConfig.mu.startsWith('http') ? currentConfig.mu : '';

    // Radio hiệu ứng rơi
    const radios = document.querySelectorAll('input[name="fallEffect"]');
    radios.forEach(r => {
      r.checked = (r.value === currentConfig.eff);
    });

    renderEditorPhotosList();
  }

  // --- 4. HIỆU ỨNG GÕ CHỮ TIÊU ĐỀ & LỜI CHÚC ---
  let keywordInterval = null;
  function initTypewriterEffect() {
    // Xoay vòng từ khóa
    const keywords = currentConfig.kw.split(',').map(s => s.trim()).filter(Boolean);
    if (keywords.length === 0) keywords.push('Queen');
    
    let kwIndex = 0;
    const keywordEl = document.getElementById('keywordText');
    
    if (keywordInterval) clearInterval(keywordInterval);
    
    keywordEl.textContent = keywords[0];
    if (keywords.length > 1) {
      keywordInterval = setInterval(() => {
        kwIndex = (kwIndex + 1) % keywords.length;
        keywordEl.textContent = keywords[kwIndex];
      }, 3500);
    }

    // Gõ từng chữ lời chúc
    startWishTyping();
  }

  let typingTimeouts = [];
  function startWishTyping() {
    typingTimeouts.forEach(t => clearTimeout(t));
    typingTimeouts = [];

    const container = document.getElementById('wishContainer');
    container.innerHTML = '';

    const lines = currentConfig.wl;
    let lineDelay = 0;

    lines.forEach((lineText, lIdx) => {
      const p = document.createElement('p');
      p.className = 'transition-opacity duration-500 opacity-0 min-h-[1.5em]';
      container.appendChild(p);

      let tId = setTimeout(() => {
        p.classList.remove('opacity-0');
        typeCharacters(p, lineText, 0);
      }, lineDelay);
      typingTimeouts.push(tId);

      lineDelay += lineText.length * 40 + 800;
    });
  }

  function typeCharacters(element, text, charIdx) {
    if (charIdx < text.length) {
      element.textContent += text.charAt(charIdx);
      let tId = setTimeout(() => {
        typeCharacters(element, text, charIdx + 1);
      }, 35 + Math.random() * 25);
      typingTimeouts.push(tId);
    }
  }

  // --- 5. HIỆU ỨNG RƠI CANVAS (PETALS, HEARTS, LETTERS, STARS) ---
  let fallingAnimationId = null;
  function initFallingAnimation(type) {
    const canvas = document.getElementById('falling-canvas');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let particles = [];
    const count = 35;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 8 + 8,
        speedY: Math.random() * 1.2 + 0.6,
        speedX: Math.random() * 1 - 0.5,
        rotation: Math.random() * 360,
        rotSpeed: Math.random() * 2 - 1,
        opacity: Math.random() * 0.5 + 0.4,
        type: type === 'mix' ? ['petals', 'hearts', 'letters', 'stars'][Math.floor(Math.random() * 4)] : type
      });
    }

    if (fallingAnimationId) cancelAnimationFrame(fallingAnimationId);

    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;

        ctx.font = `${p.size}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        let char = '🌸';
        if (p.type === 'hearts') char = '💖';
        else if (p.type === 'letters') char = '✉️';
        else if (p.type === 'stars') char = '✨';

        ctx.fillText(char, 0, 0);
        ctx.restore();

        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y * 0.02) * 0.4;
        p.rotation += p.rotSpeed;

        if (p.y > canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
      });

      fallingAnimationId = requestAnimationFrame(render);
    }
    render();
  }

  // --- 6. ALBUM ẢNH & FILMSTRIP TRONG HỘP QUÀ ---
  function renderFilmstripGallery() {
    const gallerySection = document.getElementById('albumGallerySection');
    const track = document.getElementById('filmstripTrack');
    track.innerHTML = '';

    if (!currentConfig.ph || currentConfig.ph.length === 0) {
      gallerySection.classList.add('hidden');
      return;
    }

    gallerySection.classList.remove('hidden');

    // Tạo danh sách ảnh nhân đôi để chạy vô tận mượt mà
    const itemsToRender = [...currentConfig.ph, ...currentConfig.ph];

    itemsToRender.forEach(photo => {
      const card = document.createElement('div');
      card.className = 'film-card-item';
      card.innerHTML = `
        <div class="w-full h-28 sm:h-32 rounded-lg overflow-hidden bg-pink-100 mb-1.5">
          <img src="${photo.url}" alt="Kỷ niệm" class="w-full h-full object-cover">
        </div>
        <p class="handwriting-font text-rose-950 text-xs sm:text-sm text-center truncate px-1">${photo.caption || 'Khoảnh khắc đẹp ✨'}</p>
      `;

      card.addEventListener('click', () => {
        openLightbox(photo.url, photo.caption || 'Khoảnh khắc tuyệt vời ✨');
      });

      track.appendChild(card);
    });
  }

  function renderEditorPhotosList() {
    const listEl = document.getElementById('photosThumbnailList');
    const badge = document.getElementById('photoCountBadge');
    badge.textContent = currentConfig.ph.length;

    if (!currentConfig.ph || currentConfig.ph.length === 0) {
      listEl.innerHTML = `<span class="text-pink-400 text-[11px] italic col-span-full text-center py-3">Chưa có ảnh nào được thêm...</span>`;
      return;
    }

    listEl.innerHTML = '';
    currentConfig.ph.forEach((photo, idx) => {
      const div = document.createElement('div');
      div.className = 'flex items-center gap-2 bg-white p-2 rounded-xl border border-pink-200 shadow-2xs';
      div.innerHTML = `
        <img src="${photo.url}" class="w-10 h-10 rounded-lg object-cover flex-shrink-0">
        <input type="text" value="${photo.caption || ''}" placeholder="Lời nhắn cho ảnh này..." 
          class="flex-1 px-2 py-1 rounded-lg bg-pink-50/50 border border-pink-200 text-pink-950 text-[11px] focus:outline-none focus:ring-1 focus:ring-pink-400 caption-input" data-index="${idx}">
        <button type="button" class="w-7 h-7 flex items-center justify-center text-rose-600 hover:bg-rose-50 rounded-lg delete-photo-btn" data-index="${idx}" title="Xóa ảnh">✕</button>
      `;
      listEl.appendChild(div);
    });

    // Lắng nghe sự kiện sửa caption & xóa ảnh
    listEl.querySelectorAll('.caption-input').forEach(inp => {
      inp.addEventListener('input', (e) => {
        const i = e.target.getAttribute('data-index');
        currentConfig.ph[i].caption = e.target.value;
      });
    });

    listEl.querySelectorAll('.delete-photo-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const i = e.target.getAttribute('data-index');
        currentConfig.ph.splice(i, 1);
        renderEditorPhotosList();
      });
    });
  }

  // --- 7. ÂM THANH & TRÌNH PHÁT NHẠC ---
  function setupAudioPlayer(src) {
    if (!src) return;
    if (src.includes('youtube.com') || src.includes('youtu.be')) {
      // Xử lý YouTube URL nếu cần hoặc dùng audio thông thường
      bgAudioEl.src = '';
    } else {
      bgAudioEl.src = src;
      bgAudioEl.load();
    }
  }

  function togglePlayMusic() {
    const miniDisc = document.getElementById('miniDisc');
    const soundWave = document.getElementById('soundWave');
    const playStatusLabel = document.getElementById('playStatusLabel');

    if (isMusicPlaying) {
      bgAudioEl.pause();
      miniDisc.classList.add('disc-paused');
      soundWave.classList.add('wave-paused');
      playStatusLabel.textContent = "Bật nhạc 🎵";
      isMusicPlaying = false;
    } else {
      bgAudioEl.play().then(() => {
        miniDisc.classList.remove('disc-paused');
        soundWave.classList.remove('wave-paused');
        playStatusLabel.textContent = "Đang phát 🎶";
        isMusicPlaying = true;
      }).catch(e => {
        console.log("Autoplay blocked:", e);
        showToast("Chạm vào màn hình để bật nhạc nhé!");
      });
    }
  }

  // --- 8. PHÁO HOA & CONFETTI KHI MỞ QUÀ ---
  function initFireworksAndConfetti() {
    // Sẵn sàng canvas pháo hoa
  }

  function triggerFireworks() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    const colors = ['#f43f5e', '#ec4899', '#f59e0b', '#fb7185', '#ffffff'];

    for (let i = 0; i < 90; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 2;
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 6 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        decay: Math.random() * 0.015 + 0.008
      });
    }

    function animateConfetti() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, idx) => {
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.2; // trọng lực
        p.alpha -= p.decay;

        if (p.alpha <= 0) particles.splice(idx, 1);
      });

      if (particles.length > 0) {
        requestAnimationFrame(animateConfetti);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    animateConfetti();
  }

  // --- 9. LIGHTBOX XEM ẢNH PHÓNG TO ---
  function openLightbox(url, caption) {
    const lightbox = document.getElementById('lightboxOverlay');
    document.getElementById('lightboxImg').src = url;
    document.getElementById('lightboxCaption').textContent = caption;
    lightbox.classList.add('active');
  }

  function closeLightbox() {
    document.getElementById('lightboxOverlay').classList.remove('active');
  }

  // --- TOAST THÔNG BÁO ---
  function showToast(msg) {
    const toast = document.getElementById('toastMsg');
    document.getElementById('toastText').textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // --- 10. GẮN KẾT SỰ KIỆN DOM (EVENT LISTENERS) ---
  
  // Mở/đóng Editor Modal
  document.getElementById('openEditorModalBtn').addEventListener('click', () => {
    syncEditorForm();
    document.getElementById('editorModalOverlay').classList.add('active');
  });
  document.getElementById('closeEditorModalBtn').addEventListener('click', () => {
    document.getElementById('editorModalOverlay').classList.remove('active');
  });

  // Mở hộp quà
  const giftBoxBtn = document.getElementById('giftBoxBtn');
  const cardOverlay = document.getElementById('cardOverlay');

  giftBoxBtn.addEventListener('click', () => {
    giftBoxBtn.classList.add('gift-open');
    triggerFireworks();
    
    // Tự động phát nhạc nếu chưa phát
    if (!isMusicPlaying && currentConfig.mu) {
      togglePlayMusic();
    }

    setTimeout(() => {
      cardOverlay.classList.add('active');
      giftBoxBtn.classList.remove('gift-open');
    }, 550);
  });

  document.getElementById('closeCardBtn').addEventListener('click', () => {
    cardOverlay.classList.remove('active');
  });

  document.getElementById('celebrateAgainBtn').addEventListener('click', () => {
    triggerFireworks();
  });

  // Nút phát lại hiệu ứng gõ chữ
  document.getElementById('restartBtn').addEventListener('click', () => {
    startWishTyping();
    showToast("Đã phát lại hiệu ứng thông điệp! ✨");
  });

  // Nút bật/tắt nhạc (Recipient mode)
  document.getElementById('togglePlayMusicBtn').addEventListener('click', togglePlayMusic);

  // Lightbox đóng
  document.getElementById('closeLightboxBtn').addEventListener('click', closeLightbox);
  document.getElementById('lightboxOverlay').addEventListener('click', (e) => {
    if (e.target.id === 'lightboxOverlay') closeLightbox();
  });

  // Range độ mờ background
  document.getElementById('bgOverlayRange').addEventListener('input', (e) => {
    const val = e.target.value;
    document.getElementById('bgOverlayVal').textContent = val + '%';
    document.getElementById('customBgOverlay').style.background = `linear-gradient(135deg, rgba(255, 241, 242, ${val / 100}) 0%, rgba(254, 205, 211, ${val / 100}) 100%)`;
  });

  // Xử lý upload ảnh nhiều tấm lên Cloudinary trong Editor
  document.getElementById('multiPhotosFileInput').addEventListener('change', async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    for (let file of files) {
      const secureUrl = await uploadImageToCloudinary(file);
      if (secureUrl) {
        currentConfig.ph.push({ url: secureUrl, caption: 'Khoảnh khắc tuyệt vời ✨' });
      }
    }
    renderEditorPhotosList();
    e.target.value = '';
  });

  // Thêm ảnh từ dán link textarea
  document.getElementById('inputPhotosUrls').addEventListener('change', (e) => {
    const lines = e.target.value.split('\n').map(s => s.trim()).filter(Boolean);
    lines.forEach(url => {
      currentConfig.ph.push({ url: url, caption: 'Khoảnh khắc tuyệt vời ✨' });
    });
    renderEditorPhotosList();
    e.target.value = '';
  });

  document.getElementById('clearAllPhotosBtn').addEventListener('click', () => {
    currentConfig.ph = [];
    renderEditorPhotosList();
  });

  // Upload ảnh nền lên Cloudinary
  document.getElementById('bgFileInput').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const secureUrl = await uploadImageToCloudinary(file);
    if (secureUrl) {
      currentConfig.bg = secureUrl;
      document.getElementById('inputBgUrl').value = secureUrl;
      document.getElementById('customBgLayer').style.backgroundImage = `url('${secureUrl}')`;
    }
    e.target.value = '';
  });

  document.getElementById('inputBgUrl').addEventListener('input', (e) => {
    currentConfig.bg = e.target.value.trim();
  });

  document.getElementById('clearBgBtn').addEventListener('click', () => {
    currentConfig.bg = '';
    document.getElementById('inputBgUrl').value = '';
    document.getElementById('bgFileInput').value = '';
    document.getElementById('customBgLayer').style.backgroundImage = 'none';
  });

  // Upload file MP3 nhạc nền
  document.getElementById('musicFileInput').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const blobUrl = URL.createObjectURL(file);
    currentConfig.mu = blobUrl;
    setupAudioPlayer(blobUrl);
    document.getElementById('inputMusicShareUrl').value = '';
    showToast("Đã tải file nhạc thành công! 🎶");
  });

  document.getElementById('inputMusicShareUrl').addEventListener('input', (e) => {
    currentConfig.mu = e.target.value.trim();
    setupAudioPlayer(currentConfig.mu);
  });

  document.getElementById('clearMusicBtn').addEventListener('click', () => {
    currentConfig.mu = '';
    bgAudioEl.src = '';
    document.getElementById('musicFileInput').value = '';
    document.getElementById('inputMusicShareUrl').value = '';
    showToast("Đã xóa nhạc nền!");
  });

  // Xem trước thay đổi
  document.getElementById('applyPreviewBtn').addEventListener('click', () => {
    readFormToConfig();
    applyConfigToDOM();
    initFallingAnimation(currentConfig.eff);
    initTypewriterEffect();
    document.getElementById('editorModalOverlay').classList.remove('active');
    showToast("Đã cập nhật giao diện xem trước! ✨");
  });

  // Tạo và sao chép link chia sẻ tối ưu rút gọn Hash
  document.getElementById('generateShareLinkBtn').addEventListener('click', () => {
    readFormToConfig();
    const hash = encodeConfigToHash(currentConfig);
    const fullLink = window.location.origin + window.location.pathname + hash;

    navigator.clipboard.writeText(fullLink).then(() => {
      document.getElementById('editorModalOverlay').classList.remove('active');
      showToast("Đã sao chép link rút gọn! Gửi ngay cho người ấy nhé 📋");
    }).catch(err => {
      console.error("Lỗi copy link:", err);
      prompt("Sao chép link thủ công dưới đây:", fullLink);
    });
  });

  function readFormToConfig() {
    currentConfig.pt = document.getElementById('inputPageTitle').value.trim() || defaultConfig.pt;
    currentConfig.bt = document.getElementById('inputBadgeText').value.trim() || defaultConfig.bt;
    currentConfig.ft = document.getElementById('inputFooterText').value.trim() || defaultConfig.ft;
    currentConfig.tf = document.getElementById('inputTitleFixed').value.trim() || defaultConfig.tf;
    currentConfig.kw = document.getElementById('inputKeywords').value.trim() || defaultConfig.kw;
    
    const wishLinesRaw = document.getElementById('inputWishLines').value;
    currentConfig.wl = wishLinesRaw.split('\n').map(s => s.trim()).filter(Boolean);
    if (currentConfig.wl.length === 0) currentConfig.wl = defaultConfig.wl;

    currentConfig.ct = document.getElementById('inputCardTitle').value.trim() || defaultConfig.ct;
    currentConfig.ci = document.getElementById('inputCardIntro').value.trim() || defaultConfig.ci;
    currentConfig.cl = document.getElementById('inputCardLetter').value.trim() || defaultConfig.cl;
    currentConfig.sn = document.getElementById('inputSenderName').value.trim() || defaultConfig.sn;
    currentConfig.bo = parseInt(document.getElementById('bgOverlayRange').value) || 78;

    const selectedEff = document.querySelector('input[name="fallEffect"]:checked');
    if (selectedEff) currentConfig.eff = selectedEff.value;
  }

  // Khởi chạy ứng dụng lần đầu
  initApp();
});