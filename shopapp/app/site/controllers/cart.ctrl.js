(function(){
	angular
		.module('shopApp')
		.controller('cartCtrl',cartCtrl)

	function cartCtrl($scope,$state,cartSrv){
		var cartVm = this;

		cartVm.checkout = checkout;
		cartVm.is_cart = cartSrv.is_cart;
		cartVm.cart = cartSrv.getCart();

		function checkout() {
			$state.go("checkout");
		}
	}

})();
