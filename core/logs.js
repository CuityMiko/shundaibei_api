/**
 * 封装logs日志
 * 使用方式：
 * logger.trace('Entering cheese testing');
 * logger.debug('Got cheese.');
 * logger.info('Cheese is Gouda.');
 * logger.warn('Cheese is quite smelly.');
 * logger.error('Cheese is too ripe!');
 * logger.fatal('Cheese was breeding ground for listeria.');
 * // log objects
 * logger.info({id: 1, name: 'wayne'});
 * logger.info([1, 2, 3]);
 * log级别：
 * trace < debug < info < warn < error < fatal
 */

var log4js = require('log4js');
var mongoAppender = require('log4js-node-mongodb');
var siteConf = require('../config/site_conf');
var logdb = 'shundaibei_logs'; // mongodb日志库
var logtable = 'api_logs'; // api接口日志表
var _connectionString = siteConf.mogodburl + logdb;
var logkey = 'sdblogs'; // logos key
 
log4js.addAppender(
    mongoAppender.appender({
        connectionString: _connectionString,
        collectionName: logtable
    }),
    logkey
);
 
var logger = log4js.getLogger(logkey);
module.exports = logger;