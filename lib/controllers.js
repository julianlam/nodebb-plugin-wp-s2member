'use strict';

var Controllers = {};

Controllers.renderAdminPage = function (req, res, next) {
	res.render('admin/plugins/wp-s2member', {});
};

module.exports = Controllers;