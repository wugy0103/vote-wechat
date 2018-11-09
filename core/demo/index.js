/*
 * @Author: wuguoyuan
 * @Date:   2016-09-14 11:30:23
 * @Last Modified by:   wuguoyuan
 * @Last Modified time: 2016-09-21 16:35:47
 */
var apis = require("../api").apis;
var request = require('request');
var logger = require('../../common/log/logHelper').helper;
var topic = {};
exports.topic = topic;

//获取专题活动信息
topic.getSubjectInfo = function (req, res, next) {
    apis.getSubjectInfo = {
        url: apis.pmsBase+"/acSubject/getSubjectInfoById",
        method: "POST",
        headers: apis.contentHeader,
        body: JSON.stringify({
            id: req.query.id
        })
    };
    console.info("=========================================================");
    console.info(apis.getSubjectInfo,"请求信息：");
    console.info("==========================================================");
    function callback(error, response, body) {
        if(!error && response.statusCode == 200) {
            console.info("=========================================================");
            console.info(body,apis.getSubjectInfo.url+"接口返回信息：");
            console.info("==========================================================");
            var json = JSON.parse(body);
            if(json.success) {
                req.body.subjectInfo = json.model;
                req.body.subjectInfo.mallBase = apis.mallBase;
                return next();
            }
            return res.render('error', {
                error: -1,
                message: json.message
            });
        } else {
            console.info("=========================================================");
            console.info("error:",error);
            console.info("=========================================================");
            console.info("response:",response);
            console.info("=========================================================");
            logger.writeErr4Request(error, response, apis.getSubjectInfo.url);
            return res.render('error', {
                error: error+"====="+body,
                message: response
            });
        }
    }
    request(apis.getSubjectInfo, callback);
};