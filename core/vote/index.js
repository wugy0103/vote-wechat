var sqlpool = require('../common/sqlpool');
var logger = require('../../common/log/logHelper').helper;
var vote = {};
exports.vote = vote;

//获取首页信息
vote.genIndexInfo = function (req, res, next) {
    var sql = 'SELECT * FROM level';
    //查
    sqlpool.query(sql, [], function (result, fields) {
        console.log('--------------------------SELECT----------------------------');
        console.log(result);
        console.log('------------------------------------------------------------\n\n');
        req.body.indexObj = {
            govList: result
        };
        return next();

    });


    
};