/**
 * EncryptController
 */
var md5 = require('md5');
var Crypto = require('ezcrypto').Crypto;
var sitConf = require('../config/site_conf');

exports.index = function(req, res) {
    var digest = Crypto.MD5("123456");
    var digestBytes = Crypto.MD5("123456", { asBytes: true });
    var digestString = Crypto.MD5("123456", { asString: true });
    var crypted = Crypto.AES.encrypt("123456", sitConf.encryptkey);
    var plain = Crypto.AES.decrypt('Go7YuX24ew7VudysqAh9bSAVOmuWCg==', sitConf.encryptkey);
    console.log(digestBytes);
    console.log(digestString);
    console.log(plain);
    return res.send(digest + ' , ' + md5('123456') + ' , ' + crypted);
};