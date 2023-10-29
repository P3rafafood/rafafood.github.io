document.addEventListener('DOMContentLoaded', () => {
    // Define an array to store the cart items
    const cart = [];
  
    // Function to handle "Tambah Pesanan" button click
    const handleAddToCart = (item) => {
      // Check if the item is already in the cart
      const existingItem = cart.find((cartItem) => cartItem.name === item.name);
  
      if (existingItem) {
        // If the item is already in the cart, increase the quantity
        existingItem.quantity++;
      } else {
        // If the item is not in the cart, add it with a quantity of 1
        cart.push({ ...item, quantity: 1 });
      }
  
      // Update the cart view
      updateCart();
    };
  
    // Function to update the cart view
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
          <div class="cart-title">${item.name}</div>
          <div class="cart-quantity">
            <button class="cart-quantity__btn">-</button>
            <span class="cart-quantity__value">${item.quantity}</span>
            <button class="cart-quantity__btn">+</button>
          </div>
          <div class="cart-quantity__price">Rp <span class="cart-quantity__price--value">${item.price * item.quantity}</span></div>
          <button class="cart-remove__icon">Remove</button>
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
  
      // Calculate and display the total cost
      const totalCost = cart.reduce((total, item) => total + item.price * item.quantity, 0);
      const totalCostElement = document.querySelector('#totalCost');
      totalCostElement.textContent = `Total Cost: Rp ${totalCost}`;
    };
  
    // Function to handle quantity changes
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
  
    // Define an array of sample menu items (you can replace this with your data)
    const menuItems = [
      {
        name: '',
        description: '',
        price: '',
      },
    ];
  
    // Create HTML elements for menu items
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
