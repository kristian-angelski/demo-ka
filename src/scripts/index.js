// import '../styles/index.css';
import '../styles/index.scss';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import shoppingCart from './shopping-cart';

(function () {
  // accessing required DOM elements
  let products = document.querySelector('.products');
  let cart = document.querySelector('.shopping-cart');
  let contacts = document.querySelector('.contacts');
  let productsBtn = document.querySelector('.products-btn');
  let cartBtn = document.querySelector('.cart-btn');
  let contactsBtn = document.querySelector('.contacts-btn');

  // adding click event for cart-btn in navbar
  cartBtn.addEventListener('click', function () {
    cart.classList.remove('hide');
    products.classList.add('hide');
    contacts.classList.add('hide');
  });

  // adding click event for product-btn in navbar
  productsBtn.addEventListener('click', function () {
    products.classList.remove('hide');
    cart.classList.add('hide');
    contacts.classList.add('hide');
  });

    // adding click event for product-btn in navbar
  contactsBtn.addEventListener('click', function () {
    contacts.classList.remove('hide');
    cart.classList.add('hide');
    products.classList.add('hide');
  });
})();