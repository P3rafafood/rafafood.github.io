document.addEventListener('DOMContentLoaded', () => {
    const orderButton = document.querySelector('#orderButton');
    orderButton.addEventListener('click', () => {
      const nama = document.querySelector('input[name="nama"]').value;
      const nomerMeja = document.querySelector('input[name="nomer_meja"]').value;
      const metodePembayaran = document.querySelector('#type-menu').value;
  
      // Construct the order data
      const orderData = {
        nama,
        nomerMeja,
        metodePembayaran,
        items: [
          {
            name: 'Zinger burger',
            quantity: document.querySelector('.cart-quantity__btn').innerText,
            price: document.querySelector('.cart-quantity__price--value').innerText,
          },
          // Add more items if needed
        ],
      };
  
      // Send the order data to the server
      fetch('/addOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      })
        .then((response) => {
          if (response.ok) {
            alert('Order placed successfully.');
          } else {
            alert('Failed to place the order.');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    });
  });