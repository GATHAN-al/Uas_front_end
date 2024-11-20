const swiper = new Swiper(".slider-wrapper", { /* Membuat elemen baru dengan library swiper, mengambil class .slider wrapper */
    // Optional parameters
    loop: true, /* Tidak berhenti */
    spaceBetween: 25, /* Menambahkan jarak 25px antar slide */
    grabCursor: true, /* Mengubah kursor menjadi bentuk tangan saat diarahkan */
  
    // If we need pagination
    pagination: {
      el: ".swiper-pagination", /* Elemen dengan class "" */
      clickable: true, /* Membuat pagination bisa diklik untuk berpindah slide. */
      dynamicBullets: true, /* Ukuran bullets akan menyesuaikan dengan jumlah slide yang aktif */
    },
  
    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next", /* Button untuk klik next & prev */
      prevEl: ".swiper-button-prev", 
    },
  
    breakpoints: { /* Jumlah slide yang bisa dimunculkan sesuai dengan lebar layar */
      0: { /* If lebar 0px keatas, slide = 1 */
        slidesPerView: 1,
      },
      768: { /* If lebar 768px keatas, slide = 2 */
        slidesPerView: 2,
      },
      1024: { /* If lebar 1024px keatas, slide = 3 */
        slidesPerView: 3,
      },
    },
  });
  