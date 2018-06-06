/**
 * IndexController
 */

var logger = require('../core/logs');

exports.index = function(req, res) {
    var user = req.session.user;
    var _username = user ? user.username : '';
    logger.info(`用户：${_username}进入首页`);
    res.render('index', {
        model: {
            user
        }
    });
};