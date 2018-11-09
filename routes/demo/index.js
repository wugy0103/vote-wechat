var express = require('express');
var router = express.Router();
var topic = require('../../core/demo/index').topic;
module.exports = router;

router.get('/:date', topic.getSubjectInfo, function(req, res) {
    var tpl = 'demo';
    //req.body.date = req.params.date;
    //req.body.params = req.query.id;
    res.render(tpl, req.body);
});