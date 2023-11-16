document.addEventListener('DOMContentLoaded', () => {
    // Define an array to store the cart items
    const cart = [];
  
    // Function to handle "Tambah Pesanan" button click
    const handleAddToCart = (item) => {
      // Check if the item is already in the cart
      const existingItem = cart.find((cartItem) => cartItem.name === item.name);
  
      if (existingItem) {
        // Jika barang sudah ada di keranjang, tambah jumlahnya
        existingItem.quantity++;
      } else {
        // fitur dropdown quantity
        cart.push({ ...item, quantity: 1 });
      }
  
      // Update pada tampilan keranjang
      updateCart();
    };
  
    // Membuat Function to update the cart view
    const updateCart = () => {
      // Select the cart container
      const cartContainer = document.querySelector('#cart');
  
      // Clear the current cart content
      cartContainer.innerHTML = '';
  
      // Loop through the cart items and create HTML elements for each item
      cart.forEach((item) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart__item');
  
        cartItem.innerHTML = `
          cart-title = ${item.name}
          cart-quantity = ${item.quantity}
          cart-quantity__price${item.price * item.quantity}
          cart-remove__icon${item.remove}
        `;
  
        // Attach event listener for quantity changes
        const quantityButtons = cartItem.querySelectorAll('.cart-quantity__btn');
        quantityButtons.forEach((button) => {
          button.addEventListener('click', () => {
            handleQuantityChange(item, button.innerText);
          });
        });
  
        // Attach event listener for item removal
        const removeButton = cartItem.querySelector('.cart-remove__icon');
        removeButton.addEventListener('click', () => {
          removeFromCart(item);
        });
  
        // Append the cart item to the cart container
        cartContainer.appendChild(cartItem);
      });
  
      // kalkulasi total element keranjang
      const totalCost = cart.reduce((total, item) => total + item.price * item.quantity, 0);
      const totalCostElement = document.querySelector('#totalCost');
      totalCostElement.textContent = `Total Cost: Rp ${totalCost}`;
    };
  
    // fungsi mengubah quantity pesanan 
    const handleQuantityChange = (item, change) => {
      if (change === '+' && item.quantity < 10) {
        item.quantity++;
      } else if (change === '-' && item.quantity > 1) {
        item.quantity--;
      }
  
      updateCart();
    };
  
    // Function to remove an item from the cart
    const removeFromCart = (item) => {
      const itemIndex = cart.findIndex((cartItem) => cartItem.name === item.name);
  
      if (itemIndex !== -1) {
        cart.splice(itemIndex, 1);
        updateCart();
      }
    };
  
    // data menu items (you can replace this with your data)
    const menuItems = [
      {
        name: '',
        description: '',
        price: '',
      },
    ];
  
    // membuat elemen html menuitems
    const menuContainer = document.querySelector('.menu__items');
    menuItems.forEach((item) => {
      const menuItem = document.createElement('div');
      menuItem.classList.add('item');
      menuItem.innerHTML = `
      item_image.menuItem = ${item.name};
      item_title.menuItem = ${item.name};
      item_description.menuItem = ${item.description};
      item_price.menuItem = ${item.price};`
        ;
  
      // Attach event listener for "Tambah Pesanan" button click
      const addToCartButton = menuItem.querySelector('.add-cart-btn');
      addToCartButton.addEventListener('click', () => {
        handleAddToCart(item);
      });
  
      // Append the menu item to the menu container
      menuContainer.appendChild(menuItem);
    });
  
    // Initial update of the cart
    updateCart();
  });
