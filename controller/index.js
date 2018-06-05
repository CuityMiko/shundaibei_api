/**
 * IndexController
 */

exports.index = function(req, res) {
    var user = req.session.user;
    res.render('index', {
        model: {
            user
        }
    });
};