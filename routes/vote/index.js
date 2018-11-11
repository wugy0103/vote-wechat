var express = require('express');
var router = express.Router();
var vote = require('../../core/vote/index').vote;
module.exports = router;

router.get('/index', vote.genIndexInfo, function(req, res) {
    var tpl = 'vote/index';
    res.render(tpl, req.body.indexObj);
});

router.get('/court', function (req, res) {
    var tpl = 'vote/court';
    res.render(tpl, req.body);
});

router.get('/ep', function (req, res) {
    var tpl = 'vote/ep';
    res.render(tpl, req.body);
});

router.get('/fs', function (req, res) {
    var tpl = 'vote/fs';
    res.render(tpl, req.body);
});

router.get('/pp', function (req, res) {
    var tpl = 'vote/pp';
    res.render(tpl, req.body);
});

router.get('/ps', function (req, res) {
    var tpl = 'vote/ps';
    res.render(tpl, req.body);
});

// 投票接口
router.post('/addvote', vote.postData, function (req, res) {
    res.json(req.body);
});
