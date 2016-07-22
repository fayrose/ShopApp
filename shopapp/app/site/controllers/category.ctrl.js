(function(){
	angular
		.module('shopApp')
		.controller('categoryCtrl',categoryCtrl)

	function categoryCtrl($stateParams,productSrv,$state,products){
		/*
		Controller for the page that displays categories of items
		*/
		var categoryVm = this;

		//Variable definitions
		categoryVm.products = products;
		categoryVm.category = $stateParams.category;

		//function bindings
		categoryVm.goProduct = goProduct;
		categoryVm.toPage = toPage;

		function goProduct(id) {
			//Goes to the customer view page of the given product
			$state.go('product',{productId:id});
		}

		function toPage(pagename) {
			//Redirects to the page passed in as an arg
			$state.go(pagename);
		}
	}

})();
