(function(){
	'use strict';

	angular
		.module('shopApp',['ui.router']);

	angular
		.module('shopApp')
		.config(function($stateProvider, $httpProvider,$urlRouterProvider){

			$urlRouterProvider.otherwise('/');

			$stateProvider
			.state('shop',{
				url:'/',
				templateUrl:'site/partials/shop-main.html',
				controller:'ShopCtrl as ctrl',
				//TODO #3 resolve products before main page load
				resolve:{
					products:function(productSrv){
						return productSrv.getProducts();
					}
				}
			})

			.state('admin',{
				url:'/admin',
				templateUrl:'site/partials/admin.html',
				controller:'AdminCtrl as ctrl',
				//TODO #2 Resolve Products before admin page load
				resolve:{
					products:function(productSrv){
						return productSrv.getProducts();
					}
				}
			})

			.state('admin.dash',{
				url:'/dashboard',
				templateUrl:'site/partials/admin-dash.html',
				controller:'AdminCtrl as ctrl',
			})

			.state('admin.newproduct',{
				url:'/newproduct',
				controller:'ProductCtrl as ctrl',
				templateUrl:'site/partials/admin-add-product.html'
			})

			.state('admin.editproduct',{
				url:'/editproduct/:productId',
				controller:'ProductCtrl as ctrl',
				templateUrl:'site/partials/admin-edit-product.html',
			})

			.state('login',{
				url:'/login',
				templateUrl:'site/partials/auth-main.html',
				controller:'AuthCtrl as ctrl',
			})

			.state('shop.product',{
				url:'/product/:productId',
				controller:'productCtrl as ctrl',
				templateUrl:'site/partials/product.html',
			})

			.state('shop.categories',{
				url:'/categories/:category',
				controller:'categoryCtrl as ctrl',
				templateUrl:'site/partials/category.html',
			})

			.state('shop.checkout',{
				url:'/checkout',
				controller:'checkoutCtrl as ctrl',
				templateUrl:'site/partials/checkout.html',
			})

			.state('shop.orderconfirmation',{
				url:'/confirmation',
				controller:'confirmCtrl as ctrl',
				templateUrl:'site/partials/confirmation.html',
			});

			$httpProvider.interceptors.push(function(){
		       return {
		           request: function(config) {
		               return config;
		           },
		           response: function(response) {
		               var auth_token = response.headers('authentication');
		               if(localStorage.authToken == undefined && auth_token != null){
		               		localStorage.authToken = auth_token;
		               }
		               return response;
		           }
		       }
		   });
		});
})();
