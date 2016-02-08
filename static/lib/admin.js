'use strict';
/* globals $, app, socket */

define('admin/plugins/wp-s2member', ['settings'], function(Settings) {

	var ACP = {};

	ACP.init = function() {
		Settings.load('wp-s2member', $('.wp-s2member-settings'));

		$('#save').on('click', function() {
			Settings.save('wp-s2member', $('.wp-s2member-settings'), function() {
				app.alert({
					type: 'success',
					alert_id: 'wp-s2member-saved',
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