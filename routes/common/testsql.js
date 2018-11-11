var express = require('express');
var router = express.Router();
var testsql = require('../../core/common/testsql').testsql;
var testpool = require('../../core/common/testpool').testpool;
module.exports = router;

router.get('/', testsql.add, testsql.query, function (req, res) {
    var tpl = 'testsql';
    //req.body.date = req.params.date;
    //req.body.params = req.query.id;
    res.render(tpl);
});

router.get('/pool', testpool.add, testpool.query, function (req, res) {
    var tpl = 'testsql';
    //req.body.date = req.params.date;
    //req.body.params = req.query.id;
    res.render(tpl);
});