var express = require('express');
var router = express.Router();
var time = require('../../core/common/getTime').time;
module.exports = router;

router.get('/', time.GetServerTime, function(req, res){
    res.json(req.body);
});