/**
 * FileController
 */

var path = require('path');
var cos = require('../core/cos');

// 上传
exports.upload = function(req, res) {
    var _filepath = path.resolve(__dirname, '../resources/images/sjb.png');
    cos.fileupload('shundaibei/idcards/shijiebei4.png', _filepath).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
        res.json(err);
    })
};

// 下载
exports.download = function(req, res) {
    var _filepath = path.resolve(__dirname, '../resources/images/sjbddd.png');
    cos.filedownload('shundaibei/idcards/shijiebei4.png', _filepath).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
        res.json(err);
    })
}