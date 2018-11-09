var request = require('request');
var time = {};
exports.time = time;

time.GetServerTime = function (req, res, next) {

    var now = new Date().getTime();
    if(now){
        console.info("服务器时间：", now);
        req.body.serverTime = now;
        return next();
    }
}