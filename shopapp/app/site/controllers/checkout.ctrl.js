(function(){
	angular
		.module('shopApp')
		.controller('checkoutCtrl',checkoutCtrl)

	function checkoutCtrl($scope,$state,productSrv, cartSrv){
		/*
		Controller for the checkout page
		*/
		var checkoutVm = this;

		//Function bindings and variable definitions
		checkoutVm.changeQuantity = changeQuantity;
		checkoutVm.submitForm = submitForm;
		checkoutVm.subtotal = cartSrv.calcSubtotal();
		checkoutVm.total = cartSrv.calcTotal();
		checkoutVm.cart = getCart();
		checkoutVm.products = productSrv.getProducts();
		checkoutVm.deletefromCart = deletefromCart;

		function submitForm() {
			//Goes to the order confirmation page
			$state.go('orderconfirmation');
			cartSrv.cart = [];
		}
		function getCart() {
			//Retrieves the cart from the Cart service
			return cartSrv.getCart();
		}

		function deletefromCart(productId) {
			//Deletes an item from the user's cart
			cartSrv.removefromCart(productId);
			checkoutVm.subtotal = cartSrv.calcSubtotal();
			checkoutVm.total = cartSrv.calcTotal();
		}

		function changeQuantity() {
			//Changes the quantity of an item one is buying in the checkout
			var product;
			for(var i = 0; i < checkoutVm.cart.length; i++) {
				for(var j = 0; j < checkoutVm.products.length; j++) {
					if (checkoutVm.cart[i].product.id === checkoutVm.products.id) {
						product = checkoutVm.products[j]
						product.quantity -= checkoutVm.cart[i].quantity
						productSrv.updateProduct(product, product.id)
					}
				}
			}
		}
	}
})();
