/**
 * WXController
 */
var wxService = require('../service/wxService');

exports.index = function(req, res) {
    var jscode = req.query.jscode || '';
    wxService.getAuthorizationCode(jscode).then((result) => {
        res.json(result);
    }).catch((err) => {
        res.json('getAuthorizationCode faild!');
    })
};