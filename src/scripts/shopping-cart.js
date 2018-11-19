import productsArr from './products.js';

let shoppingCart = (function () {
  'use strict';

  // Get necesarry DOM Elements / initialize needed variables
  let productsEl = document.querySelector('.products'),
    cartEl = document.querySelector('.shopping-cart-list'),
    productQuantityEl = document.querySelector('.product-quantity'),
    emptyCartEl = document.querySelector('.empty-cart-btn'),
    cartCheckoutEl = document.querySelector('.cart-checkout'),
    totalPriceEl = document.querySelector('.total-price');
  let cartBtns = document.querySelector('.cart-buttons');
  let countElement = document.querySelector('.cart-sel');
  let counter = 0;
  let productsInCart = [];
  let products = productsArr;

  // Creating div element for each obj element in the array
  let generateProductList = function () {
    products.forEach(function (item) {
      let productEl = document.createElement('div');
      productEl.className = 'product';
      productEl.innerHTML = ` 
         <div class="card hoverable z-depth-2">
          <div class="card-image waves-effect waves-block waves-light">
              <img class="activator" src="${item.imageUrl}">
          </div>
          <div class="card-content">
              <span class="card-title activator grey-text text-darken-4">${item.name} - $${item.price}<i class="material-icons right">more_vert</i></span>
              <p><a href="#" onclick="M.toast({html: '${item.name} added', classes: 'rounded'})" class="waves-effect waves-light btn add-to-cart" data-id=${item.id}>buy</a></p>
          </div>
          <div class="card-reveal">
              <span class="card-title grey-text text-darken-4">${item.name}<i class="material-icons right">close</i></span>
              <p>Description: ${item.description}</p>
          </div>
      </div>`;

      productsEl.appendChild(productEl);
    });
  };

  // Like one before and I have also used ES6 template strings
  let generateCartList = function () {
    cartEl.innerHTML = '';
    productsInCart.forEach(function (item) {
      let tr = document.createElement('tr');
      tr.innerHTML = `
          <td>${item.product.name}</td>
          <td>$${item.product.price}</td>
          <td>$${item.product.price * item.quantity}</td>
          <td><a href="#"><i class="material-icons remove-btn" onClick="reduceItemCount(${item.product.id})">remove</i></a>${item.quantity}<a href="#"><i class="material-icons add-btn" onClick="increaseItemCount(${item.product.id})">add</i></a></td>
          <td><a href="#"><i class="material-icons clear-btn" onClick="removeAll(${item.product.id})">clear</i></a></td>
        </tr>
      `;
      cartEl.appendChild(tr);
      countElement.classList.add('badge');
    });

    countElement.setAttribute('data-count', counter);
    productQuantityEl.innerHTML = counter;
    generateCartButtons();
  };

  // Function that generates Empty Cart and Checkout buttons based on condition that checks if productsInCart array is empty
  let generateCartButtons = function () {
    if (productsInCart.length > 0) {
      cartBtns.classList.remove('hide');
      totalPriceEl.innerHTML = '$ ' + calculateTotalPrice();
    } else {
      cartBtns.classList.add('hide');
    }
  };

  // Setting up listeners for click event on all products and Empty Cart button as well
  let setupListeners = function () {
    productsEl.addEventListener('click', function (event) {
      let el = event.target;
      if (el.classList.contains('add-to-cart')) {
        let elId = el.dataset.id;
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
  let addToCart = function (id) {
    let obj = products[id];
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
  let productFound = function (productId) {
    return productsInCart.find(function (item) {
      return item.product.id === productId;
    });
  };

  // This function calculates the total prices of all products
  let calculateTotalPrice = function () {
    return productsInCart.reduce(function (total, item) {
      return total + (item.product.price * item.quantity);
    }, 0);
  };

  // // Functions called from cart
  // // Removing one item when '-' gets clicked
  let reduceItemCount = function (id) {
    for (let i = 0; i < productsInCart.length; i++) {
      if (productsInCart[i].product.id === id) {
        productsInCart[i].quantity--;
        counter--;
        if (productsInCart[i].quantity === 0) {
          productsInCart.splice(i, 1);
          if (counter === 0) {
            countElement.classList.remove('badge');
          }
        }
      }
      generateCartList();
    }
  };
  window.reduceItemCount = reduceItemCount;

  // Adding one item when '+' gets clicked
  let increaseItemCount = (function (id) {
    for (let i = 0; i < productsInCart.length; i++) {
      if (productsInCart[i].product.id === id) {
        productsInCart[i].quantity++;
        counter++;
      }
      generateCartList();
    }
  });
  window.increaseItemCount = increaseItemCount;

  // Removing all items of a kind when 'x" gets clicked
  let removeAll = function (id) {
    if (confirm('Are you sure?')) {
      for (let i = 0; i < productsInCart.length; i++) {
        if (productsInCart[i].product.id === id) {
          let removeFromCounter = productsInCart[i].quantity;
          counter -= removeFromCounter;
          productsInCart.splice(i, 1);
          if (counter === 0) {
            countElement.classList.remove('badge');
          }
        }
      }
      generateCartList();
    }
  };
  window.removeAll = removeAll;

  // This functon starts the application
  let init = function () {
    generateProductList();
    generateCartButtons();
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