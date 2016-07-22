(function(){
	angular
		.module('shopApp')
		.controller('ShopCtrl',ShopCtrl)

	function ShopCtrl($scope,productSrv,$state){
		var shopVm = this;

		shopVm.products;
		shopVm.images = ["assets/img/img-hero-1.jpg" ];
		shopVm.background_image = choose_background(shopVm.images);
		shopVm.toCategory = toCategory;
		shopVm.toPage = toPage;

		//watch for any changes to model data
		$scope.$watch(function(){
	    	return productSrv.products;
		}, function (newValue) {
		    shopVm.products = productSrv.products;
		});

	function choose_background(images) {
		return images[Math.floor(Math.random()*images.length)];
	}

	function toCategory(categoryname) {
		$state.go('categories', {category: categoryname});
	}

	function toPage(pagename) {
		$state.go(pagename);
	}
	}
})();
