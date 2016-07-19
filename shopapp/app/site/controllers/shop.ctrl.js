(function(){
	angular
		.module('shopApp')
		.controller('ShopCtrl',ShopCtrl)

	function ShopCtrl($scope,productSrv){
		var shopVm = this;

		//TODO #3 Capture resolved products for view
		shopVm.products;
		shopVm.images = [];
		shopVm.background_image = choose_background(shopVm.images);
		//watch for any changes to model data
		$scope.$watch(function(){
	    	return productSrv.products;
		}, function (newValue) {
		    shopVm.products = productSrv.products;
		});
	}

	function choose_background(images) {
		return images[Math.floor(Math.random()*images.length)];
	}

})();
