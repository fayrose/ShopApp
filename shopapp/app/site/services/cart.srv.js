(function(){

	angular
		.module('shopApp')
		.service('cartSrv',cartService);

	function cartService(productSrv){
		var self = this;

		//public variables
		self.cart = JSON.parse(localStorage.getItem("cart"));

		if (self.cart == null){
				localStorage.setItem("cart", JSON.stringify([]));
				self.cart = JSON.parse(localStorage.getItem("cart"));
		}
    		self.is_cart;

    if (self.cart.length > 0) {
      self.is_cart = true;
    }
    else {
      self.is_cart = false;
		}

		//public functions
		self.getCart = getCart;
		self.addtoCart = addtoCart;
		self.removefromCart = removefromCart;
		self.changeQuantity = changeQuantity;
    	self.setisCart = setisCart;
		self.calcSubtotal = calcSubtotal;
		self.calcTotal = calcTotal;

		//Allow the user to input a new quantity in the cart
		self.updateCartQuantity = updateCartQuantity;

		function getCart(){
			return self.cart;
		}

		function addtoCart(product, quantity){
			productSrv.updateProduct(product, product.id);
			var in_cart = false;
			for (var i=0; i < self.cart.length; i++) {
				if (product.id === self.cart[i].product.id) {
					in_cart = true;
					self.cart[i].quantity += quantity;
				}
			}
			if (in_cart == false) {
      	self.cart.push({product: product, quantity: quantity});
			}

			localStorage.setItem("cart", JSON.stringify(self.cart));
      self.setisCart();
			calcSubtotal();
			calcTotal();
		}

		function changeQuantity(productId, new_quantity){
			product = productSrv.getProduct(productId);
			for (var i = 0; i < self.cart.length; i++) {
        if (self.cart[i].product.id === productId) {
					self.cart[i].quantity = new_quantity;
        }
      }

			localStorage.setItem("cart", JSON.stringify(self.cart))
		}

		function removefromCart(productId){
	    for(var i=0;i < self.cart.length;i++){
				if(self.cart[i].product.id === productId){
					self.cart.splice(i, 1);
				}
			}
			localStorage.setItem("cart", JSON.stringify(self.cart));
			self.setisCart();
			calcSubtotal();
			calcTotal();
		}

    function setisCart() {
      if (self.cart.length > 0) {
        self.is_cart = true;
      }
      else {
        self.is_cart = false;
      }
    }

		function calcSubtotal() {
			subtotal = 0;
			for(var i=0;i < self.cart.length;i++){
				subtotal += self.cart[i].product.price * self.cart[i].quantity;
			}
			return subtotal;
		}

		function calcTotal() {
			return calcSubtotal() * 1.13;
		}

		function updateCartQuantity(productId,quantity){

		}


  }

})();
