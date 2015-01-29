'use strict';


var CartModel = require('../../models/cart');
var Product = require('../../models/product');


module.exports = function (router) {

    var model = new CartModel();


  /**
	 * Display the shopping cart
	 */
	router.get('/', function (req, res) {

		//Retrieve the shopping cart from memory
		var cart = req.session.cart,
			displayCart = {items: [], total: 0},
			total = 0;
		var cartLength;
		if (!cart) {
			res.render('result', {result: 'Your cart is empty!'});
			return;
		}

		//Ready the products for display
		for (var item in cart) {
			displayCart.items.push(cart[item]);
			total += (cart[item].qty * cart[item].price);
			console.log("total : " + total);
		}
		req.session.total = displayCart.total = total.toFixed(2);
		cartLength = Object.keys(cart).length;
		console.log("cartLength : " + cartLength);
		var model =
		{
			cart: displayCart
		};
		console.log("cartLength 2 : " + cartLength);
		res.render('cart', model);
	
	});



    /**
	 * Add an item to the shopping cart
	 */
	router.post('/', function (req, res) {

		//Load (or initialize) the cart
		req.session.cart = req.session.cart || {};
		var cart = req.session.cart;
		console.log("item id : " + req.param('item_id'));
		//Read the incoming product data
		var id = req.param('item_id');

		//Locate the product to be added
		Product.findById(id, function (err, prod) {
			if (err) {
				console.log('Error adding product to cart: ', err);
				res.redirect('/cart');
				return;
			}

			//Add or increase the product quantity in the shopping cart.
			if (cart[id]) {
				cart[id].qty++;
			}
			else {
				cart[id] = {
					name: prod.name,
					price: prod.price,
					prettyPrice: prod.prettyPrice(),
					qty: 1
				};
			}

			res.redirect('/cart');

		});
	});

};
