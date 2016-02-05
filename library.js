"use strict";

var async = require.main.require('async'),
	xmlrpc = require('xmlrpc');

var db = module.parent.require('./database');

var controllers = require('./lib/controllers'),
	plugin = {};

plugin.init = function(params, callback) {
	var router = params.router,
		hostMiddleware = params.middleware,
		hostControllers = params.controllers;
		
	router.get('/admin/plugins/wp-paidmembershipspro', hostMiddleware.admin.buildHeader, controllers.renderAdminPage);
	router.get('/api/admin/plugins/wp-paidmembershipspro', controllers.renderAdminPage);

	callback();
};

plugin.addAdminNavigation = function(header, callback) {
	header.plugins.push({
		route: '/plugins/wp-paidmembershipspro',
		icon: 'fa-lock',
		name: 'Paid Memberships Pro (WordPress)'
	});

	callback(null, header);
};

plugin.process = function(data, callback) {
	var client = xmlrpc.createClient({ host: 'somehost', port: 80, path: '/test/xmlrpc.php' });

	client.methodCall('pmpro.getMembershipLevelForUser', ['adminusername', 'adminpassword', data.profile.ID], function(err, value) {
		console.log(err, value);
	});

	db.getObjectField(data.strategy.name + 'Id:uid', data.profile.ID, function(err, uid) {
		if (err) {
			return callback(err);
		}
		callback(null, uid);
	});
};

module.exports = plugin;