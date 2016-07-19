var models = require('../models');
var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
	//check if admin user exists
	var where = {where:{email:'admin@shop.com'}};
	models.Users.findAll(where).then(function(users){
		if('0' in users){
			res.send('Admin Account Already Exists');
		}
		else{
			//admin user obj
			var user_obj = {
				email:'admin@shop.com',
				password:'brainstation'
			}
			//add to database model and respond with object
			models.Users.create(user_obj).then(function(users){
				res.json({
					users:users
				});
			});
			res.send('<h1>Admin Account Created</h1><p>Log In:admin@shop.com<br>Password:brainstation</p>');
		}
		
	});

});

module.exports = router;