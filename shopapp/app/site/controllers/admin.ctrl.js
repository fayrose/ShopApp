(function(){
	'use strict';

	angular
		.module('shopApp')
		.controller('AdminCtrl',AdminCtrl);

	function AdminCtrl($scope,$state,productSrv){
		/*
		Controller for the admin.html, admin-dash.html partials.
		*/
		var adminVm = this;
		adminVm.productSrv = productSrv;

		//check if logged in
		if(localStorage.authToken == undefined || localStorage.authToken == null){
			$state.go('auth');
		}

		adminVm.products = [];
		if(adminVm.products.length > 0 ){
			adminVm.is_products = true;
		}

		//watch for updates to products object
		$scope.$watch(function(){
	    	return productSrv.products;
		}, function (newValue) {
			console.log(productSrv.products.length)
			if(productSrv.products.length > 0){
					adminVm.products = productSrv.products;
			    adminVm.is_products = true;
			}
		});

		//public functions
		adminVm.editProduct = editProduct;
		adminVm.logout = logout;
		adminVm.viewProduct = viewProduct;
		adminVm.deleteProduct = deleteProduct;

		function editProduct(product){
			//Redirects to the edit-product page
			$state.go('admin.editproduct',{productId:product.id});
		}

		function viewProduct(product) {
			//Redirects to the administrator view page
			$state.go('admin.view', {productId:product.id});
		}

		function deleteProduct(productid) {
			//Deletes a product
			productSrv.deleteProduct(productid);
			if (productSrv.products.length == 0) {
				adminVm.products = productSrv.products;
				adminVm.is_products = false;
			}
		}

		function logout(){
			//Logs out of the administrator account
			localStorage.removeItem('authToken');
			$state.go('login');
		}

	}
})();
