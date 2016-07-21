(function(){
	angular
		.module('shopApp')
		.controller('checkoutCtrl',checkoutCtrl)

	function checkoutCtrl($scope,$state,productSrv, cartSrv){
		var checkoutVm = this;

		checkoutVm.submitForm = submitForm;
		checkoutVm.subtotal = cartSrv.calcSubtotal();
		checkoutVm.total = cartSrv.calcTotal();
		checkoutVm.cart = getCart();

		function submitForm() {
			$state.go('orderconfirmation');
		}
		function getCart() {
			return cartSrv.getCart();
		}
	}
})();
