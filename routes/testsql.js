var express = require('express');
var router = express.Router();
var testsql = require('../core/testsql').testsql;
module.exports = router;

router.get('/', testsql.add, testsql.query, function (req, res) {
    var tpl = 'testsql';
    //req.body.date = req.params.date;
    //req.body.params = req.query.id;
    res.render(tpl);
});