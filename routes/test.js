/**
 * Created by wugy on 2017/1/16.
 */
var express = require('express');
var router = express.Router();
module.exports = router;

router.get('/', function(req, res) {
    var tpl = 'test';
    res.render(tpl, req.body);
});
