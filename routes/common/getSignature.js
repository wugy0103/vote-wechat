
var express = require('express');
var router = express.Router();
var signature = require('../../core/common/getSignature.js').signature;

module.exports = router;

router.get('/', signature.GetAccessToken, signature.GetTicket, signature.GetConfig, function(req, res){
    res.json(req.body);
});
