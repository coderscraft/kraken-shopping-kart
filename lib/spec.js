'use strict';
var express = require('express'),
	db = require('../lib/database');


module.exports = function spec() {

	return {
		onconfig: function(config, next) {

			//configure mongodb and paypal sdk
			db.config(config.get('databaseConfig'));


			next(null, config);
		}
	};

};