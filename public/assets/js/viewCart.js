import { initializeCart } from 'viewCart.html'; // Sesuaikan dengan nama file JavaScript Anda

// Panggil fungsi untuk menginisialisasi keranjang
initializeCart();

export let URLGeoJson = "mongodb+srv://p3orderfood:ratuifah26@cluster0.0himu8k.mongodb.net/";
export let tableTag="tr";
export let tableRowClass="content is-small";
export let tableTemplate=`
<td>#CART TITLE#</td>
<td>#CART QUANTITY#</td>
<td>#CART PRICE#</td>
`
export function responseData(results){
  console.log(results);
  results.forEach(isiRow);
}

export function isiRow(value) {
  let content = tableTemplate
      .replace("#CART TITLE#", value.name)
      .replace("#CART QUANTITY#", value.quantity)
      .replace("#CART PRICE#", JSON.stringify(value.price));
  console.log(content);
  addChild("keranjang", tableTag, tableRowClass, content);
}
document.addEventListener('DOMContentLoaded', () => {
    // Define an array to store the cart items
    const cart = [];
  
    // Function to update the cart and calculate totals
    const updateCart = () => {
      // Select the cart items
      const cartItems = document.querySelectorAll('.cart__item');
      // Menghitung Total
      let totalItems = 0;
      let totalCost = 0;
  
      cartItems.forEach((item, index) => {
        // Get item details
        const itemName = item.querySelector('.cart-title').textContent;
        const itemQuantity = parseInt(item.querySelector('.cart-quantity__btn').innerText);
        const itemPrice = parseFloat(item.querySelector('.cart-quantity__price--value').textContent);
  
        // Update the total items and cost
        totalItems += itemQuantity;
        totalCost += itemQuantity * itemPrice;
  
        //Perbarui susunan keranjang
        cart[index] = {
          name: itemName,
          quantity: itemQuantity,
          price: itemPrice,
        };
      });
  
      // Update the HTML with the total items and cost
      const totalItemsElement = document.querySelector('#totalItems');
      const totalCostElement = document.querySelector('#totalCost');
  
      totalItemsElement.textContent = totalItems;
      totalCostElement.textContent = `Rp ${totalCost}`;
    };
  
    // Add event listeners for quantity changes
    const quantityButtons = document.querySelectorAll('.cart-quantity__btn');
    quantityButtons.forEach((button) => {
      button.addEventListener('click', () => {
        updateCart();
      });
    });
  
    // Add event listeners for item removal
    const removeButtons = document.querySelectorAll('.cart-remove__icon');
    removeButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
        // Remove the item from the cart array and update the view
        cart.splice(index, 1);
        button.parentElement.parentElement.remove();
        updateCart();
      });
    });
  
    // Handle the "Pesan" button click
    const pesanButton = document.querySelector('.btn-primary[href="chekout.html"]');
    pesanButton.addEventListener('click', () => {
      // You can send the `cart` array to the server for further processing
      if (cart.length > 0) {
        // Send the cart data to the server using fetch or an AJAX request
        fetch('/your-server-endpoint', {
          method: 'POST',
          body: JSON.stringify(cart),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => response.json())
          .then((data) => {
            // Handle the server response (e.g., database update confirmation)
            console.log(data);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }
    });
  });
  