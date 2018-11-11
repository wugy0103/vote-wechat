var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var log = require('./common/log/logHelper');
var app = express();

var artTemplate = require('express-art-template');
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', artTemplate);
app.set('view engine', 'html');

log.use(app);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '50mb',extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.static(path.join(__dirname, 'public')));

/********************************路由配置********************************/
//公共模块
var getTime = require('./routes/common/getTime.js');
app.use('/common/getTime', getTime);

//获取微信签名
var getSignature = require('./routes/common/getSignature.js');
app.use('/common/getSignature', getSignature);

//测试sql页面
var testsql = require('./routes/common/testsql.js');
app.use('/common/testsql/', testsql);

//测试页面
var test = require('./routes/test.js');
app.use('/', test);

//demo
var demo = require('./routes/demo/index.js');
app.use('/demo/', demo);

/********************************路由配置 End********************************/

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

var logHelper = log.helper;
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        logHelper.writeErr4Request(err, res);
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    logHelper.writeErr4Request(err, res);
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
module.exports = app;

