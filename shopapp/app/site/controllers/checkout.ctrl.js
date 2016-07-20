(function(){
	angular
		.module('shopApp')
		.controller('checkoutCtrl',checkoutCtrl)

	function checkoutCtrl($scope,$state,productSrv){
		var checkoutVm = this;

		checkoutVm.submitForm = submitForm;

		function submitForm() {
			$state.go('orderconfirmation');
		}
	}
})();
