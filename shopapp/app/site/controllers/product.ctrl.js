(function(){

	angular
	.module('shopApp')
	.controller('ProductCtrl',ProductCtrl);

	function ProductCtrl($stateParams,api,productSrv,$state) {
		var productVm = this;

		productVm.categories = [
			{label:'Food Supplies',value:'Food Supplies'},
			{label:'Shelter Supplies',value:'Shelter Supplies'},
			{label:'Protective Supplies',value:'Protective Supplies'},
			{label:'Clothing Supplies',value:'Clothing Supplies'},
		];
		productVm.product = [
			{id:1, category:'Dolls', name:'Cabbage Patch Kid',price:'$250', quantity:'10'},
			{id:2, category:'Fabric', name:'leather', price:'$45', quantity:'40'},
			{id:3, category:'Woodwork', name:'table', price:'$4100', quantity:'2'},
			{id:4, category:'Jewelry', name:'ring', price:'$50000', quantity:'10'},
		];
		productVm.product_update_btn = 'Update Product';
		productVm.product_delete_btn = 'Remove Product';

		if($stateParams.productId != undefined){
			productSrv.getProduct($stateParams.productId)
			.then(function(res){
				console.log(res);
				productVm.product = res.data.product;
				//TODO #2 set category based on edit form based on
				//product category
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


		function is_products(){
		// 	var show = '';
		// 	var hide = '';
		// 	(productVm == undefined) ? return show = false: return  hide = true;
		// 	(productVm != undefined) ? return show = true: return hide = false;
			return false;
		}

		function listProducts(){
			var products=[];
			for (var item in productVm.product.length){
				console.log(item);
				products.push(item);
			}
		}

		function addProduct(){
			//TODO #2
			//create product object, pass to product service
			//Update text in button
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
			//TODO #2
			//remove product, pass to product service
			//update text in button
			 productSrv.deleteProduct(productVm.product.id);
		}

	}
})();
