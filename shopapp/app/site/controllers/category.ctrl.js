(function(){
	angular
		.module('shopApp')
		.controller('categoryCtrl',categoryCtrl)

	function categoryCtrl($stateParams,productSrv, products){
		var categoryVm = this;
		categoryVm.products = products;
		console.log(categoryVm.products);
		categoryVm.category = $stateParams.category;
		console.log("cat: " + categoryVm.category);
	}

})();
