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
    cart.classList.toggle('hide');
    if (!(products.classList.contains('hide'))) {
      products.classList.toggle('hide');
    }
  });

  // adding click event for product-btn in navbar
  productsBtn.addEventListener('click', function () {
    products.classList.toggle('hide');
    if (!(cart.classList.contains('hide'))) {
      cart.classList.toggle('hide');
    }
  });
})();