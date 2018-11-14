var sqlpool = require('../common/sqlpool');
var logger = require('../../common/log/logHelper').helper;
var apis = require("../api").apis;
var signature = require("../common/getSignature").signature;
var vote = {};
exports.vote = vote;

// 验证登陆
vote.authorize = function (req, res, next) {
    if (req.query.code) {
        signature.GetOpenId(req, res, next);
    } else {
        let url = apis.authorizeUrl({ redirect_uri: `http://wechat.synet.vip${req.originalUrl}`, scope: 'snsapi_base' });
        res.redirect(302, url);
    }
}

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
    if (req.body.userid == '' || (req.body.answer_id !== '0' && req.body.answer_id !== '1' && req.body.answer_id !== '2') || (req.body.item_id !== 'court' && req.body.item_id !== 'ep' && req.body.item_id !== 'ps' && req.body.item_id !== 'pp' && req.body.item_id !== 'fs')) {
        req.body = {
            success: false,
            message: '参数非法'
        };
        return next();
    }

    var sql = `SELECT * FROM userlog where userid = '${req.body.userid}'`;
    //查
    sqlpool.query(sql, [], function (result, fields) {
        console.log('--------------------------反查用户数据----------------------------');
        console.log(result);
        console.log('------------------------------------------------------------\n\n');
        if (result.length === 0) {
            addLog({
                cb: () => {
                    req.body = {
                        success: true,
                        message: '评论成功！感谢您对我们工作的支持',
                        data: {}
                    };
                    return next();
                },
                userid: req.body.userid,
                answer_id: req.body.answer_id,
                item_id: req.body.item_id
            });
        } else {
            editLog({
                data: result[0],
                cb: () => {
                    req.body = {
                        success: true,
                        message: '评论成功！感谢您对我们工作的支持',
                        data: {}
                    };
                    return next();
                },
                userid: req.body.userid,
                answer_id: req.body.answer_id,
                item_id: req.body.item_id,
                req,
                next
            });
        }
    });
};

var addLog = function ({ userid, answer_id, item_id, cb }) {
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
        switch (answer_id) {
            case '0':
                editLevel('aLevel', item_id, cb);
                break;
            case '1':
                editLevel('bLevel', item_id, cb);
                break;
            case '2':
                editLevel('cLevel', item_id, cb);
                break;

        }

    });
};

var editLog = function ({ userid, answer_id, item_id, cb, data, req, next }) {
    if (data[item_id] !== 'null') {
        req.body = {
            success: false,
            message: '抱歉！您已经对该单位评价过了',
            data: {}
        };
        return next();
    }
    var modSql = `UPDATE userlog SET ${item_id} = ${answer_id} WHERE userid = '${userid}'`;
    sqlpool.query(modSql, function (result2, fields) {
        console.log('--------------------------修改userlog表数据----------------------------');
        console.log(result2);
        console.log('------------------------------------------------------------\n\n');
        switch (answer_id) {
            case '0':
                editLevel('aLevel', item_id, cb);
                break;
            case '1':
                editLevel('bLevel', item_id, cb);
                break;
            case '2':
                editLevel('cLevel', item_id, cb);
                break;

        }
    });
};

var editLevel = function (answer_id, item_id, cb) {
    let sql = `SELECT * FROM level WHERE name_en = '${item_id}'`;
    sqlpool.query(sql, [], function (result, fields) {
        console.log('--------------------------获取当前投票数----------------------------');
        console.log(result);
        console.log('------------------------------------------------------------\n\n');
        var modSql = `UPDATE level SET ${answer_id} = ${parseInt(result[0][answer_id]) + 1} WHERE name_en = '${item_id}'`;
        sqlpool.query(modSql, function (result2, fields) {
            console.log('--------------------------修改level表数据----------------------------');
            console.log(result2);
            console.log('------------------------------------------------------------\n\n');
            cb()
        });
    });
}