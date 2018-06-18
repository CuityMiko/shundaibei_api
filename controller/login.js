/**
 * LoginController
 */

var svgCaptcha = require('svg-captcha');

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

/**
 * 获取图片验证码
 * @param {*} req 
 * @param {*} res 
 */
exports.getCaptcha = (req, res) => {
    var codeConfig = {
        size: 6,// 验证码长度
        ignoreChars: '0o1i', // 验证码字符中排除 0o1i
        noise: 3, // 干扰线条的数量
        height: 50,
        background: 'white'
    }
    var captcha = svgCaptcha.create(codeConfig);
    // req.session.captcha = captcha.text.toLowerCase(); //存session用于验证接口获取文字码
    res.send(captcha.data);
}