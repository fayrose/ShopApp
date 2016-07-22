angular.module('shopApp').filter('min', min);

function min() {
    return function(products) {
      in_stock = [];
      for (product in products) {
        console.log(product)
        if (products[product].quantity > 0) {
          in_stock.push(products[product]);
        }
      }
      return in_stock;
    };
}
