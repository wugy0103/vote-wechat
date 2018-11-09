/*
 * @Author: tangwenyong
 * @Date:   2016-09-28 10:56:53
 * @Last Modified by:   tangwenyong
 * @Last Modified time: 2016-09-28 16:33:33
 */
var express = require('express');
var router = express.Router();
var signature = require('../../core/common/getSignature.js').signature;

module.exports = router;

router.get('/', signature.GetAccessToken, signature.GetTicket, signature.GetConfig, function(req, res){
    res.json(req.body);
});
