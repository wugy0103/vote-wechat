var sqlpool = require('../common/sqlpool');
var logger = require('../../common/log/logHelper').helper;
var vote = {};
exports.vote = vote;

//获取首页信息
vote.genIndexInfo = function (req, res, next) {
    var sql = 'SELECT * FROM level';
    //查
    sqlpool.query(sql, [], function (result, fields) {
        console.log('--------------------------genIndexInfo----------------------------');
        console.log(result);
        console.log('------------------------------------------------------------\n\n');
        req.body.indexObj = {
            govList: result
        };
        return next();

    });


    
};

vote.postData = function (req, res, next) {
    console.info("-----------------------前端请求信息----------------------------------");
    console.info(req.body);
    console.info("----------------------------------------------------------------\n\n");
    if ((req.body.answer_id !== '0' && req.body.answer_id !== '1' && req.body.answer_id !== '2') || (req.body.item_id !== 'court' && req.body.item_id !== 'ep' && req.body.item_id !== 'ps' && req.body.item_id !== 'pp' && req.body.item_id !== 'fs')) {
        req.body = {
            success: false,
            message: '参数非法'
        };
        return next();
    }

    var sql = `SELECT * FROM userlog where userid =${req.body.userid}`;
    //查
    sqlpool.query(sql, [], function (result, fields) {
        console.log('--------------------------反查用户数据----------------------------');
        console.log(result);
        console.log('------------------------------------------------------------\n\n');
        if (result.length === 0) {
            addLog(req.body);
        } else {
            vote.editLog(req.body);
        }
    });
};

var addLog = function ({ userid, answer_id, item_id }) {
    var addSql = 'INSERT INTO userlog(id,userid,court,ep,fs,pp,ps) VALUES(0,?,?,?,?,?,?)';
    var addSqlParams = [userid, 'null', 'null', 'null', 'null', 'null'];
    switch (item_id) {
        case 'court':
            addSqlParams = [userid, answer_id, 'null', 'null', 'null', 'null'];
            break;
        case 'ep':
            addSqlParams = [userid, 'null', answer_id, 'null', 'null', 'null'];
            break;
        case 'fs':
            addSqlParams = [userid, 'null', 'null', answer_id, 'null', 'null'];
            break;
        case 'pp':
            addSqlParams = [userid, 'null', 'null', 'null', answer_id, 'null'];
            break;
        case 'ps':
            addSqlParams = [userid, 'null', 'null', 'null', 'null', answer_id];
            break;
    }
    
    sqlpool.query(addSql, addSqlParams, function (result, fields) {
        console.log('--------------------------新增用户数据----------------------------');
        console.log(result);
        console.log('------------------------------------------------------------\n\n');
        
    });
};

var editLevel = function () {
    sqlpool.query(addSql, addSqlParams, function (result, fields) {
        console.log('--------------------------修改level表数据----------------------------');
        console.log(result);
        console.log('------------------------------------------------------------\n\n');

    });
}