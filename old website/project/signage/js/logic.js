// ✅ ฟีเจอร์ #1, #2, #5, #6, #10, #12, #13, #14
let videos = [];
let currentIndex = 0;
const videoElement = document.getElementById("video-player");
const muteButton = document.getElementById("muteButton");
const menuZone = document.querySelector(".menu-zone");

// ✅ ฟีเจอร์ #13: ตรวจสอบว่าอุปกรณ์ควร mute หรือไม่
function shouldForceMute() {
  const ua = navigator.userAgent;
  const isiOS = /iPad|iPhone|iPod/.test(ua);
  const isSafari = /^((?!chrome|android).)*safari/i.test(ua);
  const isMac = /Macintosh/.test(ua);
  return isiOS || isSafari || isMac;
}

// ✅ ตั้งค่าการ mute และ autoplay ตามอุปกรณ์
const shouldMute = shouldForceMute();
videoElement.muted = shouldMute;
if (!shouldMute) {
  videoElement.autoplay = true;
}
muteButton.style.display = shouldMute ? "block" : "none";

// ✅ โหลดวิดีโอจาก JSON
fetch("data/videos.json")
  .then(response => response.json())
  .then(data => {
    videos = data;
    if (videos.length > 0) {
      const savedIndex = sessionStorage.getItem("lastPlayedIndex");
      currentIndex = savedIndex ? parseInt(savedIndex) : 0;
      playVideo(currentIndex);
    }
  });

function playVideo(index) {
  if (!videos[index]) return;
  videoElement.src = videos[index].src;
  videoElement.load();
  videoElement.play().catch(() => {
    skipToNextVideo(); // ✅ ฟีเจอร์ #12: ข้ามถ้าเล่นไม่ได้
  });
  sessionStorage.setItem("lastPlayedIndex", index); // ✅ ฟีเจอร์ #6
}

function skipToNextVideo() {
  currentIndex = (currentIndex + 1) % videos.length;
  playVideo(currentIndex);
}

// ✅ วนลูปวิดีโอ
videoElement.addEventListener("ended", skipToNextVideo);

// ✅ แตะไอคอน mute เพื่อเปิดเสียง
muteButton.addEventListener("click", (e) => {
  e.stopPropagation(); // ✅ ป้องกัน trigger โซนเมนู
  videoElement.muted = false;
  videoElement.play();
  muteButton.style.display = "none";
});

// ✅ โซนคลิกเพื่อไปหน้าเมนู
menuZone.addEventListener("click", () => {
  sessionStorage.setItem("lastPlayedIndex", currentIndex);
  window.location.href = "menu.html";
});