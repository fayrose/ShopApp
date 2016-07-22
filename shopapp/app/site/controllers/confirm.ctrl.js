(function(){
	angular
		.module('shopApp')
		.controller('confirmCtrl',confirmCtrl)

	function confirmCtrl($scope,productSrv, cartSrv, $state){
		/*
		Controller for the order confirmation page
		*/

		var confirmVm = this;

		//function bindings and variables
		confirmVm.subtotal = cartSrv.calcSubtotal();
		confirmVm.total = cartSrv.calcTotal();
		confirmVm.cart = getCart();

		function getCart() {
			//Retrieves the cart from the cart service
			return cartSrv.getCart();
		}
	}

})();
