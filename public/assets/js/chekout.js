import { initializeCart } from 'menu.html';

document.addEventListener('DOMContentLoaded', () => {
    const orderButton = document.querySelector('#orderButton');
    orderButton.addEventListener('click', () => {
      const nama = document.querySelector('input[name="nama"]').value;
      const nomerMeja = document.querySelector('input[name="nomer_meja"]').value;
      const metodePembayaran = document.querySelector('#type-menu').value;
  
      //Value for order order
      const orderData = {
        nama,
        nomerMeja,
        metodePembayaran,
        items: [
          {
            name: 'THAITEA GREENTEA',
            quantity: document.querySelector('.cart-quantity__btn').innerText,
            price: document.querySelector('.cart-quantity__price--value').innerText,
          },
          // tambahan pesanan lain
        ],
      };
  
      // Kirim data pesanan ke server admin
      fetch('/addOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      })
        .then((response) => {
          if (response.ok) {
            alert('Order pesanan sukses.');
          } else {
            alert('Gagal order pesanan.');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    });
  });