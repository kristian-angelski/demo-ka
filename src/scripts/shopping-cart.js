import productsArr from './products.js';

var shoppingCart = (function () {
  'use strict';

  // Get necesarry DOM Elements / initialize needed variables
  var productsEl = document.querySelector('.products'),
    cartEl = document.querySelector('.shopping-cart-list'),
    productQuantityEl = document.querySelector('.product-quantity'),
    emptyCartEl = document.querySelector('.empty-cart-btn'),
    cartCheckoutEl = document.querySelector('.cart-checkout'),
    totalPriceEl = document.querySelector('.total-price');
  var countElement = document.querySelector('.cart-sel');
  var counter = 0;
  var productsInCart = [];
  var products = productsArr;

  // Creating div element for each obj element in the array
  var generateProductList = function () {
    products.forEach(function (item) {
      var productEl = document.createElement('div');
      productEl.className = 'product';
      productEl.innerHTML = `    <div class="card">
                                    <div class="card-image waves-effect waves-block waves-light">
                                        <img class="activator" src="${item.imageUrl}">
                                    </div>
                                    <div class="card-content">
                                        <span class="card-title activator grey-text text-darken-4">${item.name} - $${item.price}<i class="material-icons right">more_vert</i></span>
                                        <p><a href="#" class="button add-to-cart" data-id=${item.id}>Add to Cart</a></p>
                                    </div>
                                    <div class="card-reveal">
                                        <span class="card-title grey-text text-darken-4">${item.name}<i class="material-icons right">close</i></span>
                                        <p>Description: ${item.description}</p>
                                    </div>
                                </div>
                              </div>`;

      productsEl.appendChild(productEl);
    });
  };

  // Like one before and I have also used ES6 template strings
  var generateCartList = function () {
    cartEl.innerHTML = '';
    productsInCart.forEach(function (item) {
      var li = document.createElement('li');
      li.innerHTML = `${item.quantity} ${item.product.name} - $${item.product.price * item.quantity}`;
      cartEl.appendChild(li);
      countElement.classList.add('badge');
    });
    countElement.setAttribute('data-count', counter);
    productQuantityEl.innerHTML = counter;
    generateCartButtons();
  };

  // Function that generates Empty Cart and Checkout buttons based on condition that checks if productsInCart array is empty
  var generateCartButtons = function () {
    if (productsInCart.length > 0) {
      emptyCartEl.style.display = 'inline-block';
      cartCheckoutEl.style.display = 'inline-block';
      totalPriceEl.innerHTML = '$ ' + calculateTotalPrice();
    } else {
      emptyCartEl.style.display = 'none';
      cartCheckoutEl.style.display = 'none';
    }
  };

  // Setting up listeners for click event on all products and Empty Cart button as well
  var setupListeners = function () {
    productsEl.addEventListener('click', function (event) {
      var el = event.target;
      if (el.classList.contains('add-to-cart')) {
        var elId = el.dataset.id;
        counter++;
        addToCart(elId);
      }
    });

    emptyCartEl.addEventListener('click', function (event) {
      if (confirm('Are you sure?')) {
        productsInCart = [];
        counter = 0;
        countElement.classList.remove('badge');
        countElement.setAttribute('data-count', counter);
      }
      generateCartList();
    });
  };

  // Adds new items or updates existing one in productsInCart array
  var addToCart = function (id) {
    var obj = products[id];
    if (productsInCart.length === 0 || productFound(obj.id) === undefined) {
      productsInCart.push({
        product: obj,
        quantity: 1
      });
    } else {
      productsInCart.forEach(function (item) {
        if (item.product.id === obj.id) {
          item.quantity++;
        }
      });
    }
    generateCartList();
  };

  // This function checks if product is already in productsInCart array
  var productFound = function (productId) {
    return productsInCart.find(function (item) {
      return item.product.id === productId;
    });
  };

  // This function calculates the total prices of all products
  var calculateTotalPrice = function () {
    return productsInCart.reduce(function (total, item) {
      return total + (item.product.price * item.quantity);
    }, 0);
  };

  // This functon starts the application
  var init = function () {
    generateProductList();
    setupListeners();
  };

  // Exposes just init function to public, everything else is private
  return {
    init: init
  };

})();

shoppingCart.init();

export default {
  shoppingCart
};