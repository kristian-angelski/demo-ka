import '../styles/index.css';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import shoppingCart from './shopping-cart';

(function () {
  // accessing required DOM elements
  let products = document.querySelector('.products');
  let cart = document.querySelector('.shopping-cart');
  let productsBtn = document.querySelector('.products-btn');
  let cartBtn = document.querySelector('.cart-btn');

  // adding click event for cart-btn in navbar
  cartBtn.addEventListener('click', function () {
    cart.classList.toggle('hidden');
    if (!(products.classList.contains('hidden'))) {
      products.classList.toggle('hidden');
    }
  });

  // adding click event for product-btn in navbar
  productsBtn.addEventListener('click', function () {
    products.classList.toggle('hidden');
    if (!(cart.classList.contains('hidden'))) {
      cart.classList.toggle('hidden');
    }
  });
})();