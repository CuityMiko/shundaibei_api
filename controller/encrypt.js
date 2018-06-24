/**
 * EncryptController
 */
var md5 = require('md5');
var Crypto = require('ezcrypto').Crypto;
var sitConf = require('../config/site_conf');

exports.index = function(req, res) {
    var digest = Crypto.MD5("shundaibei");
    var digestBytes = Crypto.MD5("shundaibei", { asBytes: true });
    var digestString = Crypto.MD5("shundaibei", { asString: true });
    var userinfo = {
        id: 1,
        username: 'admin',
        userpwd: '486f5f587abc72cec56c277869a64089',
        phone: '15201776956',
        role: 'admin'
    }
    var crypted = Crypto.AES.encrypt(JSON.stringify(userinfo), sitConf.encryptkey);
    var plain = Crypto.AES.decrypt('G/0fctudgIzU0PriIrw6xlWgeDKHjv4SkbhL0YtN1M370eis3mW+4ZvIrDh/Tdhi/8Gvsk/V5CP8cpS+AOa//2flW1Ehxyekie6amIDmnPYOXQaRCqVg1Zr0WdQbl2XEhY3iiSeXOtMGVp9MCuSJPO/6PQsohdMhJ4TNxsw=', sitConf.encryptkey);
    console.log(digestBytes);
    console.log(digestString);
    console.log(plain);
    return res.send(digest + ' , ' + md5('shundaibei') + ' , ' + crypted);
};