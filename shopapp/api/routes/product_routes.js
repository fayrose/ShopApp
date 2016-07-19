var models = require('../models');
var express = require('express');
var router = express.Router();

//get all products
router.get('/',function(req,res){
	models.Products.findAll().then(function(products){
		res.json({
			products:products
		});
	});
});

//get specific product
router.get('/:productId',function(req,res){
	console.log('Getting Product with ID: '+req.params.productId);
	var where = {where:{id:req.params.productId}};
	models.Products.find(where).then(function(product){
		res.json({
			product:product
		});
	});
});

//update a product
router.put('/:productId',function(req,res){
	var where = {where:{id:req.params.productId}};
	var __product = req.body;
	models.Products.find(where).then(function(product){
		product.updateAttributes({
	      name:__product.name,
	      image:__product.image,
	      description:__product.description,
	      category:__product.category,
	      price:__product.price,
	      quantity:__product.quantity,
	    });

	    __product.id = req.params.productId;
    	res.json({
			product:__product
		});
	});
});

//add new product
router.post('/',function(req,res){
	//code for retrieving products
	var product = req.body;
		product.status = 'active';
	models.Products.create(product).then(function(product){
		res.json({
			product:product
		});
	});
});

//delete product
router.delete('/:productId',function(req,res){
	var where = {where:{id:req.params.productId}}
	models.Products.find(where).then(function(product){
		product.destroy();
		res.json({
			deleted:true
		});	
	});
});
module.exports = router;