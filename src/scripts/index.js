// import '../styles/index.css';
import '../styles/index.scss';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import shoppingCart from './shopping-cart';

(function () {
  // accessing required DOM elements
  let home = document.querySelector('.home');
  let products = document.querySelector('.products');
  let contacts = document.querySelector('.contacts');
  let cart = document.querySelector('.shopping-cart');
  let homeBtn = document.querySelector('.home-btn');
  let productsBtn = document.querySelector('.products-btn');
  let contactsBtn = document.querySelector('.contacts-btn');
  let cartBtn = document.querySelector('.cart-btn');

  // adding click event for home-btn in navbar
  homeBtn.addEventListener('click', function () {
    home.classList.remove('hide');
    cart.classList.add('hide');
    products.classList.add('hide');
    contacts.classList.add('hide');
  });

  // adding click event for cart-btn in navbar
  cartBtn.addEventListener('click', function () {
    cart.classList.remove('hide');
    products.classList.add('hide');
    contacts.classList.add('hide');
    home.classList.add('hide');
  });

  // adding click event for product-btn in navbar
  productsBtn.addEventListener('click', function () {
    products.classList.remove('hide');
    cart.classList.add('hide');
    contacts.classList.add('hide');
    home.classList.add('hide');
  });

  // adding click event for contacts-btn in navbar
  contactsBtn.addEventListener('click', function () {
    contacts.classList.remove('hide');
    cart.classList.add('hide');
    products.classList.add('hide');
    home.classList.add('hide');
  });
})();