(function(){
	angular
		.module('shopApp')
		.controller('categoryCtrl',categoryCtrl)

	function categoryCtrl($stateParams,productSrv,$state,products){
		var categoryVm = this;

		categoryVm.products = products;
		categoryVm.category = $stateParams.category;
		categoryVm.toPage = toPage;

		//function bindings
		categoryVm.goProduct = goProduct;

		function goProduct(id) {
			$state.go('product',{productId:id});
		}

		function toPage(pagename) {
			$state.go(pagename);
		}
	}

})();
