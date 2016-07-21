(function(){
	angular
		.module('shopApp')
		.controller('checkoutCtrl',checkoutCtrl)

	function checkoutCtrl($scope,$state,productSrv, cartSrv){
		var checkoutVm = this;
		checkoutVm.changeQuantity = changeQuantity;
		checkoutVm.submitForm = submitForm;
		checkoutVm.subtotal = cartSrv.calcSubtotal();
		checkoutVm.total = cartSrv.calcTotal();
		checkoutVm.cart = getCart();
		checkoutVm.products = productSrv.getProducts();
		checkoutVm.deletefromCart = deletefromCart;

		function submitForm() {
			$state.go('orderconfirmation');
		}
		function getCart() {
			return cartSrv.getCart();
		}

		function deletefromCart(productId) {
			cartSrv.removefromCart(productId);
		}

		function changeQuantity() {
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
