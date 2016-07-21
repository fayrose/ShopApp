(function(){

	angular
		.module('shopApp')
		.service('cartSrv',cartService);

	function cartService($state,api){
		var self = this;
		//public variables
		self.cart = [];

		//public functions
		self.getCart = getCart;
		self.addtoCart = addtoCart;
		self.removefromCart = removefromCart;
		self.changeQuantity = changeQuantity;

		function getCart(){
			return self.cart;
		}

		function addtoCart(product, quantity){
      self.cart.push({product: product, quantity: quantity});
		}

		function changeQuantity(productId, quantity){
			for (var i = 0; i < self.cart.length; i++) {
        if (self.cart[i].product.id === productId) {
          self.cart[i].quantity = quantity;
        }
      }
		}

		function removefromCart(productId){
      for(var i=0;i < self.cart.length;i++){
				if(self.cart[i].product.id === productId){
					self.cart.splice(i, 1);
				}
			}
		}

})();
