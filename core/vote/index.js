var sqlpool = require('../common/sqlpool');
var mysql = require('mysql');
var apis = require("../api").apis;
var signature = require("../common/getSignature").signature;
var vote = {};
exports.vote = vote;


var sqlConfig = {
    host: 'localhost',
    user: 'root',
    password: 'vote-wechat',
    database: 'vote',
    timeout: 10000
};

// 验证登陆
vote.authorize = function (req, res, next) {
    let ua = req.headers['user-agent'].toLowerCase();
    let isWeixin = (/micromessenger/.test(ua)) ? true : false;
    if (isWeixin) {
        return next();
    } else {
        return res.render('error', {
            error: -1,
            message: '请用微信打开！'
        });
    }
    // if (req.query.code) {
    //     signature.GetOpenId(req, res, next);
    // } else {
    //     let url = apis.authorizeUrl({ redirect_uri: `http://wechat.synet.vip${req.originalUrl}`, scope: 'snsapi_base' });
    //     res.redirect(302, url);
    // }
}

//获取首页信息
vote.genIndexInfo = function (req, res, next) {

    var connection = mysql.createConnection(sqlConfig);
    connection.connect();
    var sql = 'SELECT * FROM level';
    //查
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }
        console.log(result);
        req.body.indexObj = {
            govList: result
        };
        return next();
    });

    connection.end();

};

vote.postData = function (req, res, next) {
    console.info('req.headers', req.headers.origin);
    let answer_id = req.body.answer_id;
    let item_id = req.body.item_id;
    
    if (req.headers.origin !== 'http://localhost:3002') {
        req.body = {
            success: false,
            message: '非法请求'
        };
        return next();
    }

    if ((answer_id !== '0' && answer_id !== '1' && answer_id !== '2') || (item_id !== 'court' && item_id !== 'ep' && item_id !== 'ps' && item_id !== 'pp' && item_id !== 'fs')) {
        req.body = {
            success: false,
            message: '参数非法'
        };
        return next();
    }

    let cb = ()=>{
        req.body = {
            success: true,
            message: '评论成功！感谢您对我们工作的支持',
            data: {}
        };
        return next();
    }

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

    // var sql = `SELECT * FROM userlog where userid = '${req.body.userid}'`;
    // //查
    // sqlpool.query(sql, [], function (result, fields) {
    //     if (result.length === 0) {
    //         addLog({
    //             cb: () => {
    //                 req.body = {
    //                     success: true,
    //                     message: '评论成功！感谢您对我们工作的支持',
    //                     data: {}
    //                 };
    //                 return next();
    //             },
    //             userid: req.body.userid,
    //             answer_id: req.body.answer_id,
    //             item_id: req.body.item_id
    //         });
    //     } else {
    //         editLog({
    //             data: result[0],
    //             cb: () => {
    //                 req.body = {
    //                     success: true,
    //                     message: '评论成功！感谢您对我们工作的支持',
    //                     data: {}
    //                 };
    //                 return next();
    //             },
    //             userid: req.body.userid,
    //             answer_id: req.body.answer_id,
    //             item_id: req.body.item_id,
    //             req,
    //             next
    //         });
    //     }
    // });
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

    var modSql = `UPDATE userlog SET ${item_id} = ${answer_id} WHERE userid = '${userid}'`;
    sqlpool.query(modSql, function (result2, fields) {
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
    var connection = mysql.createConnection(sqlConfig);
    connection.connect();

    let sql = `SELECT * FROM level WHERE name_en = '${item_id}'`;
    connection.query(sql, [], function (err, result) {
        if (err) {
            console.log('[UPDATE ERROR] - ', err.message);
            connection.end();
            return;
        }
        var modSql = `UPDATE level SET ${answer_id} = ${parseInt(result[0][answer_id]) + 1} WHERE name_en = '${item_id}'`;
        connection.query(modSql, [], function () {
            cb()
        });

        connection.end();
    });
}