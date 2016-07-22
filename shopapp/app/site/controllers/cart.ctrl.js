(function(){
	angular
		.module('shopApp')
		.controller('cartCtrl',cartCtrl)

	function cartCtrl($scope,$state,cartSrv){
		var cartVm = this;

		cartVm.checkout = checkout;
		cartVm.is_cart = cartSrv.is_cart;
		cartVm.cart = cartSrv.getCart();
		cartVm.deletefromCart = deletefromCart;
		cartVm.toPage = toPage;
		cartVm.toCategory = toCategory;

		// update Cart quantity inside the cart
		cartVm.updateQuantity = updateQuantity;

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
			cartSrv.removefromCart(productId);
			if(cartSrv.cart.length === 0){
					cartVm.is_products = false;
			}
		}

		function checkout() {
			$state.go("checkout");
		}

		// updateQuantity function
		function updateQuantity(productId, quantity){
			cartSrv.changeQuantity(productId, quantity);
		}

		function toCategory(categoryname) {
			$state.go('categories', {category: categoryname});
		}

		function toPage(pagename) {
			$state.go(pagename);
		}
	}

})();
