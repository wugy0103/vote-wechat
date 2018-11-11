var express = require('express');
var router = express.Router();
var vote = require('../../core/vote/index').vote;
module.exports = router;

router.get('/index', vote.genIndexInfo, function(req, res) {
    var tpl = 'vote/index';
    //req.body.date = req.params.date;
    //req.body.params = req.query.id;
    res.render(tpl, req.body.indexObj);
});

router.get('/court', function (req, res) {
    var tpl = 'vote/court';
    //req.body.date = req.params.date;
    //req.body.params = req.query.id;
    res.render(tpl, req.body);
});

router.get('/ep', function (req, res) {
    var tpl = 'vote/ep';
    //req.body.date = req.params.date;
    //req.body.params = req.query.id;
    res.render(tpl, req.body);
});

router.get('/fs', function (req, res) {
    var tpl = 'vote/fs';
    //req.body.date = req.params.date;
    //req.body.params = req.query.id;
    res.render(tpl, req.body);
});

router.get('/pp', function (req, res) {
    var tpl = 'vote/pp';
    //req.body.date = req.params.date;
    //req.body.params = req.query.id;
    res.render(tpl, req.body);
});

router.get('/ps', function (req, res) {
    var tpl = 'vote/ps';
    //req.body.date = req.params.date;
    //req.body.params = req.query.id;
    res.render(tpl, req.body);
});