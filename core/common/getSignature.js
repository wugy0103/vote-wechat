
var apis = require("../api").apis;
var request = require('request');
var globals = require('../../common/global').global;
var crypto = require('crypto');
var fs=require("fs");
var signature = {};
var tokenKeep,keepTime,ticketKeep,ticketKeepTime;

exports.signature = signature;

//获取微信签名所需的access_token
signature.GetAccessToken = function(req, res, next) {
    var access_token = req.cookies.access_token;
    var nowTime;
    if(access_token){
        console.info("在cookies返回access_token：", access_token);
        req.body.access_token = access_token;
        return next();
    }

    apis.GetAccessToken.url = apis.AccessTokenUrl + "?grant_type=client_credential&appid=" + apis.appid + "&secret=" + apis.appsecret;
    console.info("获取微信access_token请求参数：", apis.GetAccessToken);

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            var json = JSON.parse(body);
            console.info("获取微信access_token返回:", json);
            if (json.access_token) {
                res.cookie('access_token',json.access_token,{ maxAge: 6600000});
                tokenKeep=json.access_token;
                keepTime=new Date().getTime();
                req.body.access_token = json.access_token;
                return next();
            }
            return res.json({ error: json.errcode, message: json.errmsg });
        } else {
            return res.render('error', { error: -2, message: "服务器异常" });
        }
    }
     nowTime = new Date().getTime();
    if (tokenKeep == "" || tokenKeep == undefined || tokenKeep == null || keepTime == undefined || (nowTime-keepTime>6000000)) {
        request(apis.GetAccessToken, callback);

    }
    else{
        req.body.access_token=tokenKeep;
        return next();
    }

}

//获取微信签名所需的ticket
signature.GetTicket = function(req, res, next) {
    var ticket = req.cookies.ticket;
    var nowTime;
    if(ticket){
        console.info("在cookies返回ticket：", ticket);
        req.body.ticket = ticket;
        return next();
    }

    apis.GetTicket.url = apis.TicketUrl + "?access_token=" + req.body.access_token + "&type=jsapi";
    console.info("获取微信ticket请求参数：", apis.GetTicket);

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            var json = JSON.parse(body);
            console.info("获取微信ticket返回:", json);
            if (json.ticket) {
                res.cookie('ticket',json.ticket,{ maxAge: 6600000});
                req.body.ticket = json.ticket;
                ticketKeep = json.ticket;
                ticketKeepTime=new Date().getTime();
                return next();
            }
            return res.render('error', {
                error: json.errcode,
                message: json.errmsg
            });
        } else {
            return res.render('error', { error: -2, message: "服务器异常" });
        }
    }

    nowTime = new Date().getTime();
    if (ticketKeep == "" || ticketKeep == undefined || ticketKeep == null || ticketKeepTime==undefined || (nowTime - ticketKeepTime>6000000)) {
        request(apis.GetTicket, callback);
    }
    else{
        req.body.ticket=ticketKeep;
        return next();
    }

}

//拼装配置参数
signature.GetConfig = function(req, res, next) {
    var ticket = req.body.ticket;
    var noncestr = globals.generateRandomAlphaNum(10, 1);
    var timestamp = (Date.parse(new Date()) / 1000).toString();
    var url = req.query.url;
    var string = 'jsapi_ticket=' + ticket + '&noncestr=' + noncestr + '&timestamp=' + timestamp + '&url=' + url;
    var signature = crypto.createHash('SHA1').update(string).digest("HEX");

    req.body.ConfigData = {
        time: new Date().getTime(),
        url: url,
        config: {
            timestamp: timestamp,
            nonceStr: noncestr,
            signature: signature,
            appId: apis.appid
        }
    };
    console.log("返回微信配置参数", req.body.ConfigData)
    return next();
}
