"use strict";

var async = require.main.require('async'),
	winston = require.main.require('winston'),
	_ = require.main.require('underscore'),
	xmlrpc = require('xmlrpc'),
	request = module.parent.require('request');

var db = module.parent.require('./database'),
	groups = module.parent.require('./groups'),
	meta = module.parent.require('./meta');

var controllers = require('./lib/controllers'),
	plugin = {
		_settings: {
			key: '',
			url: 'http://localhost'
		}
	};

plugin.init = function(params, callback) {
	var router = params.router,
		hostMiddleware = params.middleware,
		hostControllers = params.controllers;
		
	router.get('/admin/plugins/wp-s2member', hostMiddleware.admin.buildHeader, controllers.renderAdminPage);
	router.get('/api/admin/plugins/wp-s2member', controllers.renderAdminPage);
	router.get('/plugins/wp-s2member/eot', plugin.processEOT);

	async.waterfall([
		async.apply(plugin.refreshSettings),
		async.apply(plugin.createGroups)
	], callback);
};

plugin.addAdminNavigation = function(header, callback) {
	header.plugins.push({
		route: '/plugins/wp-s2member',
		icon: 'fa-lock',
		name: 's2Member (WordPress)'
	});

	callback(null, header);
};

plugin.refreshSettings = function(callback) {
	meta.settings.get('wp-s2member', function(err, settings) {
		plugin._settings = _.defaults(settings, plugin._settings);
		callback();
	});
};

plugin.createGroups = function(callback) {
	winston.verbose('[plugins/wp-s2member] Creating groups...');
	var groupsNames = ['s2Member-0', 's2Member-1', 's2Member-2', 's2Member-3', 's2Member-4'];
	async.each(groupsNames, function(groupName, next) {
		groups.exists(groupName, function(err, exists) {
			if (!exists) {
				groups.create({
					name: groupName,
					description: '',
					hidden: 1,
					disableJoinRequests: 1,
					system: 1
				}, next);
			} else {
				next();
			}
		});
	}, callback);
};

plugin.process = function(data, callback) {
	if (plugin._settings.key.length > 0) {
		// Check user against s2member records
		request.post({
			url: plugin._settings.url + '/?s2member_pro_remote_op=1',
			form: {
				s2member_pro_remote_op: 'a:3:{s:2:"op";s:8:"get_user";s:7:"api_key";s:' + plugin._settings.key.length + ':"' + plugin._settings.key + '";s:4:"data";a:1:{s:7:"user_id";s:' + data.profile.id.length + ':"' + data.profile.id + '";}}'
			}
		}, function(err, res, body) {
			// Retrieve the user's level from the serialized data
			var level = body.match(/level";i:(\d)+;/);
			if (level) {
				level = parseInt(level[1], 10);
				winston.verbose('[plugins/wp-s2member] uid ' + data.user.uid + ' is level ' + level + ', logging them in...');
				async.series([
					async.apply(plugin.revokeAccess, data.user.uid),
					async.apply(plugin.grantAccess, data.user.uid, level)
				]);
			} else {
				winston.warn('[plugins/wp-s2member] Could not find level for user ' + data.user.uid + '!');
				async.series([
					async.apply(plugin.revokeAccess, data.user.uid),
					async.apply(plugin.grantAccess, data.user.uid, 0)
				]);
			}
		});

		callback();
	} else {
		winston.warn('[plugins/wp-s2member] No API key defined, cannot process login!');
		callback();
	}
};

plugin.grantAccess = function(uid, level, callback) {
	callback = callback || function() {};
	var groupName = 's2Member-' + level;
	winston.verbose('[plugins/wp-s2member] Granting access to "' + groupName + '" for uid ' + uid);
	groups.join(groupName, parseInt(uid, 10), callback);
};

plugin.revokeAccess = function(uid, callback) {
	callback = callback || function() {};
	winston.verbose('[plugins/wp-s2member] Revoking access to membership groups for uid ' + uid);

	var groupNames = [];
	for(var x=0;x<=4;x++) {
		groupNames.push('s2Member-' + x);
	}
	async.each(groupNames, function(name, next) {
		groups.leave(name, uid, next);
	}, callback);
};

plugin.processEOT = function(req, res, next) {
	console.log('process EOT:', req.query);
};

module.exports = plugin;