import '../styles/index.css';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';

(function () {
  let products = document.querySelector('.products');
  let cart = document.querySelector('.shopping-cart');
  let productsBtn = document.querySelector('.products-btn');
  let cartBtn = document.querySelector('.cart-btn');

  cartBtn.addEventListener('click', function () {
    cart.classList.toggle('hidden');
    if (!(products.classList.contains('hidden'))) {
      products.classList.toggle('hidden');
    }
  });

  productsBtn.addEventListener('click', function () {
    products.classList.toggle('hidden');
    if (!(cart.classList.contains('hidden'))) {
      cart.classList.toggle('hidden');
    }
  });

})();

var ShoppingCart = (function () {
  'use strict';

  // Get necesarry DOM Elements
  var productsEl = document.querySelector('.products'),
    cartEl = document.querySelector('.shopping-cart-list'),
    productQuantityEl = document.querySelector('.product-quantity'),
    emptyCartEl = document.querySelector('.empty-cart-btn'),
    cartCheckoutEl = document.querySelector('.cart-checkout'),
    totalPriceEl = document.querySelector('.total-price');

  // Show cart when cart button is pressed

  // Fake JSON data array here should be API call
  var products = [{
        id: 0,
        name: 'iPhone 6S',
        description: 'ip6s desc',
        imageUrl: 'url/ip6s',
        price: 799
      },
      {
        id: 1,
        name: 'iPhone 5S',
        description: 'ip5s desc',
        imageUrl: 'url/ip5s',
        price: 349,
      },
      {
        id: 2,
        name: 'Macbook',
        description: 'macbook desc',
        imageUrl: 'url/macbook',
        price: 1499
      },
      {
        id: 3,
        name: 'Macbook Air',
        description: 'macbook air desc',
        imageUrl: 'url/macbookAir',
        price: 999
      },
      {
        id: 4,
        name: 'Macbook Air 2013',
        description: 'macbook air13 desc',
        imageUrl: 'url/macbook-air13',
        price: 599
      },
      {
        id: 5,
        name: 'Macbook Air 2012',
        description: 'macbook air12 desc',
        imageUrl: 'url/macbook-air12',
        price: 499
      },
      {
        id: 5,
        name: 'Macbook Air 2012',
        description: 'macbook air12 desc',
        imageUrl: 'url/macbook-air12',
        price: 499
      },
      {
        id: 5,
        name: 'Macbook Air 2012',
        description: 'macbook air12 desc',
        imageUrl: 'url/macbook-air12',
        price: 499
      }
    ],
    productsInCart = [];

  // Creating div element for each obj element in the array
  var generateProductList = function () {
    products.forEach(function (item) {
      var productEl = document.createElement('div');
      productEl.className = 'product';
      productEl.innerHTML = `    <div class="card">
                                  <div class="card-image waves-effect waves-block waves-light">
                                      <img class="activator" src="${item.imgUrl}">
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
    });

    productQuantityEl.innerHTML = productsInCart.length;

    generateCartButtons();
  };


  // Function that generates Empty Cart and Checkout buttons based on condition that checks if productsInCart array is empty
  var generateCartButtons = function () {
    if (productsInCart.length > 0) {
      emptyCartEl.style.display = 'block';
      cartCheckoutEl.style.display = 'block';
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
        addToCart(elId);
      }
    });

    emptyCartEl.addEventListener('click', function (event) {
      if (confirm('Are you sure?')) {
        productsInCart = [];
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


  // This function checks if project is already in productsInCart array
  var productFound = function (productId) {
    return productsInCart.find(function (item) {
      return item.product.id === productId;
    });
  };

  var calculateTotalPrice = function () {
    return productsInCart.reduce(function (total, item) {
      return total + (item.product.price * item.quantity);
    }, 0);
  };

  // This functon starts the whole application
  var init = function () {
    generateProductList();
    setupListeners();
  };

  // Exposes just init function to public, everything else is private
  return {
    init: init
  };

})();

ShoppingCart.init();