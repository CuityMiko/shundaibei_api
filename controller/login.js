/**
 * LoginController
 */

exports.index = function(req, res) {
    var username = req.query.username || '';
    var userpwd = req.query.userpwd || '';
    if (username && userpwd) {
        var user = {
            username,
            userpwd
        }
        req.session.user = user;
        res.redirect('/');
    } else {
        res.json('login faild!');
    }
};