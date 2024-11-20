// Harga per malam
const pricePerNight = 500;

// Fungsi untuk memperbarui informasi tanggal dan harga di sidebar
function updateSidebarDates() {
  const checkinInput = document.getElementById('checkin').value;
  const checkoutInput = document.getElementById('checkout').value;

  if (checkinInput && checkoutInput) {
    const checkinDate = new Date(checkinInput);
    const checkoutDate = new Date(checkoutInput);

    const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
    const formattedCheckin = checkinDate.toLocaleDateString('en-US', options);
    const formattedCheckout = checkoutDate.toLocaleDateString('en-US', options);

    const timeDifference = checkoutDate - checkinDate;
    const nights = Math.ceil(timeDifference / (1000 * 3600 * 24));

    document.getElementById('sidebar-dates').textContent = `${formattedCheckin} – ${formattedCheckout}`;
    document.getElementById('sidebar-duration').textContent = `${nights} night${nights > 1 ? 's' : ''}`;
    document.getElementById('sidebar-total-price').textContent = `Total price: $${pricePerNight * nights}`;
  } else {
    document.getElementById('sidebar-dates').textContent = 'Select your dates';
    document.getElementById('sidebar-duration').textContent = '0 nights';
    document.getElementById('sidebar-total-price').textContent = 'Total price: $0';
  }
}

// Fungsi untuk memperbarui informasi kamar dan tamu di sidebar
function updateSidebarRoomGuest() {
  const roomCount = document.getElementById('room-count').value;
  const guestCount = document.getElementById('guest-count').value;

  document.getElementById('sidebar-summary').textContent = `${roomCount} room${roomCount > 1 ? 's' : ''} | ${guestCount} guest${guestCount > 1 ? 's' : ''}`;
}

// Fungsi untuk meningkatkan jumlah kamar atau tamu
function increaseValue(id) {
  const input = document.getElementById(id);
  const max = input.max;
  if (parseInt(input.value) < max) {
    input.value = parseInt(input.value) + 1;
  }
  updateSidebarRoomGuest(); 
}

// Fungsi untuk menurunkan jumlah kamar atau tamu
function decreaseValue(id) {
  const input = document.getElementById(id);
  const min = input.min;
  if (parseInt(input.value) > min) {
    input.value = parseInt(input.value) - 1;
  }
  updateSidebarRoomGuest();
}

// Fungsi untuk memfilter kamar berdasarkan ketersediaan tanggal
function filterRoomsByDate() {
  const checkinInput = document.getElementById('checkin').value;
  const checkoutInput = document.getElementById('checkout').value;
  const rooms = document.querySelectorAll('.room-card');

  rooms.forEach(room => {
    const availability = room.getAttribute('data-availability');
    const unavailableDates = availability ? availability.split(',') : [];

    const isAvailable = !unavailableDates.includes(checkinInput) && !unavailableDates.includes(checkoutInput);

    if (isAvailable) {
      room.style.display = 'block';
    } else {
      room.style.display = 'none';
    }
  });
}

// Fungsi untuk memilih kamar dan menambahkan informasi ke sidebar
function selectRoom(title, price) {
  const checkinInput = document.getElementById('checkin').value;
  const checkoutInput = document.getElementById('checkout').value;
  
  // Pastikan tanggal sudah dipilih sebelum menampilkan harga
  if (!checkinInput || !checkoutInput) {
    alert("Please select your check-in and check-out dates.");
    return;
  }

  const checkinDate = new Date(checkinInput);
  const checkoutDate = new Date(checkoutInput);
  
  const timeDifference = checkoutDate - checkinDate;
  const nights = Math.ceil(timeDifference / (1000 * 3600 * 24));

  // Hitung total harga berdasarkan durasi malam
  const totalPrice = price * nights;

  // Update sidebar dengan informasi kamar yang dipilih
  document.getElementById('sidebar-info').innerHTML = `
    <h3>${title}</h3>
    <p>Price per night: $${price}</p>
    <p>Total price for ${nights} night${nights > 1 ? 's' : ''}: $${totalPrice}</p>
  `;
}

// Fungsi untuk memeriksa promo code
function checkPromoCode() {
  const promoCode = document.getElementById('promo-code-input').value.trim();
  const discount = promoCode === 'DISCOUNT10' ? 0.1 : 0; // 10% discount for "DISCOUNT10"
  const checkinInput = document.getElementById('checkin').value;
  const checkoutInput = document.getElementById('checkout').value;

  if (checkinInput && checkoutInput) {
    const checkinDate = new Date(checkinInput);
    const checkoutDate = new Date(checkoutInput);

    const timeDifference = checkoutDate - checkinDate;
    const nights = Math.ceil(timeDifference / (1000 * 3600 * 24));
    const totalPrice = pricePerNight * nights;
    const finalPrice = totalPrice - (totalPrice * discount);

    document.getElementById('sidebar-total-price').textContent = `Total price: $${finalPrice.toFixed(2)}`;
  }
}

// Event listeners untuk input checkin, checkout, dan promo code
document.getElementById('checkin').addEventListener('change', updateSidebarDates);
document.getElementById('checkout').addEventListener('change', updateSidebarDates);
document.getElementById('checkin').addEventListener('change', filterRoomsByDate);
document.getElementById('checkout').addEventListener('change', filterRoomsByDate);
document.getElementById('promo-code-input').addEventListener('input', checkPromoCode);
