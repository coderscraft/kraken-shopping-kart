'use strict';


var IndexModel = require('../models/index');
var Product = require('../models/product');


module.exports = function (router) {

    var model = new IndexModel();


    router.get('/', function (req, res) {
        

        Product.find(function(err, prods){
        	if(err) {
        		console.log(err);
        	}
        	prods.forEach(function(prod){
        		prod.prettyPrice = prod.prettyPrice();
        	});
            
            var model = {
            	products: prods
            };

            res.render('index', model);    

        });
        
    });


     router.get('/setLanguage/:locale', function (req, res) {
     	console.log("req.params.locale:" + req.params.locale);
        res.cookie('locale', req.params.locale);
        console.log("req.params.locale:" + res.get('locale'));
        res.redirect('/');
    });

};
