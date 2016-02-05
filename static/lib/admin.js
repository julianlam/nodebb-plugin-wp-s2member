'use strict';
/* globals $, app, socket */

define('admin/plugins/wp-paidmembershipspro', ['settings'], function(Settings) {

	var ACP = {};

	ACP.init = function() {
		Settings.load('wp-paidmembershipspro', $('.wp-paidmembershipspro-settings'));

		$('#save').on('click', function() {
			Settings.save('wp-paidmembershipspro', $('.wp-paidmembershipspro-settings'), function() {
				app.alert({
					type: 'success',
					alert_id: 'wp-paidmembershipspro-saved',
					title: 'Settings Saved',
					message: 'Please reload your NodeBB to apply these settings',
					clickfn: function() {
						socket.emit('admin.reload');
					}
				});
			});
		});
	};

	return ACP;
});