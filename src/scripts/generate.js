module.exports = function () {
  let faker = require('faker');
  let _ = require('lodash');

  return {
    products: _.times(50, function(index) {
      return {
        id: index,
        name: faker.commerce.productName(),
        description: faker.lorem.paragraph(),
        imageUrl: faker.image.fashion(),
        price: faker.commerce.price()
      };
    })
  };
};