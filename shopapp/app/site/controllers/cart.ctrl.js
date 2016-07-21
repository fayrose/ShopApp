(function(){
	angular
		.module('shopApp')
		.controller('cartCtrl',cartCtrl)

	function cartCtrl($scope,$state,cartSrv){
		var cartVm = this;

		cartVm.checkout = checkout;
		cartVm.is_cart = cartSrv.is_cart;
		cartVm.cart = cartSrv.getCart();

		$scope.$watch(function(){
	    	return cartSrv.cart;
		}, function (newValue) {
			console.log(cartSrv.cart.length)
			if(cartSrv.cart.length > 0){
					cartVm.cart = cartSrv.getCart();
			    cartVm.is_products = true;
			}
		});



		function checkout() {
			$state.go("checkout");
		}
	}

})();
