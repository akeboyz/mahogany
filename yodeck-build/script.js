document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.category-btn');
  if (buttons.length === 0) return; // ป้องกัน error ถ้าไม่มีปุ่ม

  let selectedCategory = 'condo'; // ค่าเริ่มต้น

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // ลบ class active จากทุกปุ่ม
      buttons.forEach(b => b.classList.remove('active'));

      // ใส่ class active ให้ปุ่มที่ถูกคลิก
      btn.classList.add('active');

      // รับค่าหมวดหมู่ที่เลือก
      selectedCategory = btn.getAttribute('data-value');
      console.log('Selected category:', selectedCategory);
    });
  });

  // ปุ่ม Search
  const searchButton = document.querySelector('.search-button');
  if (searchButton) {
    searchButton.addEventListener('click', () => {
      // หา input ที่เป็นประเภท text (ช่องค้นหา)
      const keywordInput = document.querySelector('.search-input[type="text"]');
      const keyword = keywordInput ? keywordInput.value.trim() : '';

      // กำหนด url redirect ตาม category
      let targetUrl = 'index.html'; // fallback

      switch(selectedCategory) {
        case 'condo':
          targetUrl = 'condo.html';
          break;
        case 'foodies':
          targetUrl = 'foodies.html';
          break;
        case 'marketplace':
          targetUrl = 'marketplace.html';
          break;
      }

      // ถ้ามี keyword ให้ต่อ query string
      if (keyword.length > 0) {
        targetUrl += `?q=${encodeURIComponent(keyword)}`;
      }

      // redirect ไปหน้าเป้าหมาย
      window.location.href = targetUrl;
    });
  }
});