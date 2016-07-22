(function(){
	angular
		.module('shopApp')
		.controller('cartCtrl',cartCtrl)

	function cartCtrl($scope,$state,cartSrv){
		/*Controller for the customer cart page*/
		var cartVm = this;

		//variables and function bindings
		cartVm.checkout = checkout;
		cartVm.is_cart = cartSrv.is_cart;
		cartVm.cart = cartSrv.getCart();
		cartVm.deletefromCart = deletefromCart;
		cartVm.toPage = toPage;
		cartVm.toCategory = toCategory;

		// update Cart quantity inside the cart
		cartVm.updateQuantity = updateQuantity;

		//watches the cart for changes and updates is_products if cart empty
		$scope.$watch(function(){
	    	return cartSrv.cart;
		}, function (newValue) {
			console.log(cartSrv.cart.length)
			if(cartSrv.cart.length > 0){
					cartVm.cart = cartSrv.getCart();
			    cartVm.is_products = true;
			} else {
				cartVm.is_products = false;
			}
		});

		function deletefromCart(productId) {
			//Removes an item from the cart
			cartSrv.removefromCart(productId);
			if(cartSrv.cart.length === 0){
					cartVm.is_cart = false;
			}
		}

		function checkout() {
			//Redirects to the checkout page
			$state.go("checkout");
		}

		// updateQuantity function
		function updateQuantity(productId, quantity){
			//Updates the quantity of items the user is buying
			cartSrv.changeQuantity(productId, quantity);
		}

		function toCategory(categoryname) {
			//Goes to a page of a product-category
			$state.go('categories', {category: categoryname});
		}

		function toPage(pagename) {
			//Redirects to the page state passed in as an arg
			$state.go(pagename);
		}
	}

})();
