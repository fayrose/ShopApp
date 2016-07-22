(function(){

	angular
	.module('shopApp')
	.controller('ProductCtrl',ProductCtrl);

	function ProductCtrl($stateParams,api,productSrv,$state, cartSrv, cartSrv) {
		/*
		Controller for the pages involving the products: admin-add-product, admin-edit-product,
		admin-view-product, and the product page.
		*/
		var productVm = this;

		//Initializes the product categories
		productVm.categories = [
			{label:'Food',value:'Food'},
			{label:'Shelter',value:'Shelter'},
			{label:'Safety',value:'Safety'},
			{label:'Clothing',value:'Clothing'},
		];

		//Initializes variables
		productVm.product = [];
		productVm.product_update_btn = 'Update Product';
		productVm.product_delete_btn = 'Remove Product';

		//Gets product if the state param has passed in a product ID
		if($stateParams.productId != undefined){
			productSrv.getProduct($stateParams.productId)
			.then(function(res){
				console.log(res);
				productVm.product = res.data.product;
				for(var index in productVm.categories){
					if(productVm.product.category == productVm.categories[index].value){
						productVm.set_category = productVm.categories[index].value;
					}
				}

			})
		}

		//public functions
		productVm.addProduct = addProduct;
		productVm.updateProduct = updateProduct;
		productVm.deleteProduct = deleteProduct;
		productVm.listProducts = listProducts;
		productVm.is_products = is_products;
		productVm.goUpdate = goUpdate;
		productVm.goBack = goBack;
		productVm.addtoCart = addtoCart;

		function goBack(){
			//Redirects to the admin dashboard
			$state.go("admin.dash");
		}

		function goUpdate(productId) {
			//Redirects to the admin page to edit the product information
			$state.go('admin.editproduct',{productId:productId});
		}

		function is_products(){
		//Initializes the variable is_product as false
		return false;
		}

		function listProducts(){
			//Lists all of the products in the system
			var products=[];
			for (var item in productVm.product.length){
				console.log(item);
				products.push(item);
			}
		}

		function addProduct(){
			//Adds a product to the administrator system
			product = {
				name: productVm.name,
				image: productVm.image,
				description: productVm.description,
				category: productVm.category,
				price: productVm.price,
				quantity: productVm.quantity
			};
			productSrv.addProduct(product);
			document.getElementsByName('add-product').value = "Product added!";
			productVm.name = "";
			productVm.image = "";
			productVm.description = "";
			productVm.categories = "";
			productVm.price = "";
			productVm.quantity = "";
		}

		function updateProduct(){
			//Updates a product with new information on the edit page
			product = {
				name: productVm.product.name,
				image: productVm.product.image,
				description: productVm.product.description,
				category: productVm.product.category,
				price: productVm.product.price,
				quantity: productVm.product.quantity
			};
			console.log(product)
			productSrv.updateProduct(product,productVm.product.id);
			$state.go("admin.dash");
		}

		function deleteProduct(){
			//Deletes a product from the system
			 productSrv.deleteProduct(productVm.product.id);
		}

		function addtoCart(product, quantity) {
			//Adds a product to the cart
			if (quantity > product.quantity) {
				$('#error_message').show();
			}
			else {
				cartSrv.addtoCart(product, quantity);
				$state.go("cart");
				$('#error_message').hide();
		}

		}
	}
})();
