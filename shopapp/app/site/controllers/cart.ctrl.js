(function(){
	angular
		.module('shopApp')
		.controller('cartCtrl',cartCtrl)

	function cartCtrl($scope,$state){
		var cartVm = this;

		cartVm.checkout = checkout;

		function checkout() {
			$state.go("checkout");
		}
	}

})();
