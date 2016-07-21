(function(){
	angular
		.module('shopApp')
		.controller('confirmCtrl',confirmCtrl)

	function confirmCtrl($scope,productSrv, cartSrv, $state){
		var confirmVm = this;
		confirmVm.subtotal = cartSrv.calcSubtotal();
		confirmVm.total = cartSrv.calcTotal();
		confirmVm.cart = getCart();

		function getCart() {
			return cartSrv.getCart();
		}
	}

})();
