// ✅ ดึง query parameter จาก URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// ✅ แปลงชื่อ type เป็นชื่อไฟล์
const type = getQueryParam('type') || 'dining'; // fallback เป็น dining
const videoSrc = `menu-vdo/${type}.mp4`;
const dataSrc = `data/${type}.json`;

// ✅ ใส่วิดีโอ banner ตาม type
const bannerVideo = document.getElementById('bannerVideo');
bannerVideo.querySelector('source').src = videoSrc;
bannerVideo.load();

// ✅ โหลดร้านค้าจาก JSON
fetch(dataSrc)
  .then(res => res.json())
  .then(data => {
    const grid = document.getElementById('shopGrid');
    grid.innerHTML = "";

    let count = 0;

    // ✅ แสดงร้านค้าจาก JSON
    data.forEach(shop => {
      const div = document.createElement('div');
      div.className = 'shop-card';
      div.innerHTML = `
        <img src="${shop.image}" alt="${shop.name}" />
        <div class="shop-name">${shop.name}</div>
      `;
      grid.appendChild(div);
      count++;
    });

    // ✅ เติมช่องว่างให้ครบ 12 ช่องเสมอ
    for (let i = count; i < 12; i++) {
      const div = document.createElement('div');
      div.className = 'shop-card empty';
      grid.appendChild(div);
    }
  })
  .catch(err => {
    console.error('Error loading shop data:', err);
  });
  
