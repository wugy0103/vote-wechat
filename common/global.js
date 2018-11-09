var request = require('request');
var logger = require('./log/logHelper').helper;
var formidable = require('formidable');
var crypto = require('crypto');
var Busboy = require('busboy');
var apis = require("../core/api").apis;
var fs = fs = require('fs');
var path = require('path');
var global = global || {};
exports.global = global;

global.baseImgUrl = "http://img.healthmall.me/photos/";

global.sortFunc=function (order, sortBy) {
    var ordAlpah = (order == 'asc') ? '>' : '<';
    var sortFun = new Function('a', 'b', 'return a.' + sortBy + ordAlpah + 'b.' + sortBy + '?1:-1');
    return sortFun;
}

/**
 * form表单提交上传文件到本服务器，暂时不用
 * @param {} req
 * @param {} res
 * @param {} next
 * @returns {}
 */
global.upload=function(req,res,next) {
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    //设置文件存储路径
    form.uploadDir = apis.BaseUploadDir;
    form.keepExtensions = true;

    form.parse(req, function (err, fields, files) {
        req.body.fields = fields;
        if (files != null && files.uploadBox.size > 0) {
            files.uploadBox.path=files.uploadBox.path.substring(7, files.uploadBox.path.length);
            req.body.files = files;
        }
        return next();
    });
}

/**
 * 上传图片至图片服务器
 * @param {req.body.strBase64为图片的base64编码} req
 * @param {} callbackfunc
 * @returns {}
 */
global.UploadImg = function (req,callbackfunc) {
    apis.UploadImgToServer.json = global.base64Img(req.body.strBase64);
    var result = {};
    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            result.state = body.succeed;
            if (body.succeed) {
                result.url = global.baseImgUrl+ body.valuse;
                result.filePath = body.valuse;
            }else {
                result.errorMsg = "上传失败";
            }

        } else {
            logger.writeErr4Request(error, response, apis.UploadImgToServer.url);
            result.state = false;
            result.errorMsg = "服务器异常";
        }
        return callbackfunc(result);
    }
    request(apis.UploadImgToServer, callback);
}

/**
 * 监听请求有图片上传请求，并获取base64调用uploadToServer上传到图片服务器
 * @param {} req
 * @param {} res
 * @param {} next
 * @returns {}
 */
global.UploadImgToServer = function (req, res, next) {
    var busboy = new Busboy({ headers: req.headers });
    busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
        var dataArr = [], len = 0;
        file.on('data', function (data) {
            dataArr.push(data);
            len += data.length;
        });
        file.on("end", function () {
            req.body.strBase64 = Buffer.concat(dataArr, len).toString('base64');
            global.UploadImg(req,function(result) {
                req.body.result = result;
                return next();
            });

        });
    });
    req.pipe(busboy);
}

/**
 * 获取上传图片的参数
 * @param {} base64Img
 * @returns {}
 */
global.base64Img = function (base64Img) {
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;

    //随机数，生成签名用
    var nonce = "123456";
    //密码，生成签名用
    var pwd = "fse9aZbwzjysbmHKN1zULHQ";

    var reg = new RegExp("(data:image/)([a-z]{1,})(;base64,)", "gmi");
    //var imgType = "data:image/png;base64,";
    ////判断当前上传图片类型
    //if (base64Img != null && base64Img != "") {
    //    if (base64Img.substring(11, 3) != "png") {
    //        imgType = "data:image/jpeg;base64,";
    //    }
    //}
    var imgStr = base64Img.toString().replace(reg, "");

    var signArray = new Array(timestamp, nonce, pwd);
    signArray.sort();
    var sha1 = crypto.createHash('sha1');
    sha1.update(signArray.join(""));
    var hash = sha1.digest('hex');
    var data = { Imgs: [imgStr], timestamp: timestamp.toString(), nonce: nonce.toString(), Signature: hash.toString() };
    return data;
}

global.saveFile = function (content, callback) {
    var n = new Date().getTime();
    fs.writeFile(path.join("public/upload/html/",n+ '.html'), content, function (err) {
        if (err) throw err;
        callback(path.join("public/upload/html/",n+ '.html'));
    });
}

//合并json，将jsonB合并到jsonA的name字段下面
//name为新字段的名称，aID为主jsonA里的某个id字段，jsonA为主json，jsonB为将被合并的json，bID为jsonB的ID字段，bKey为jsonB里的名称字段
global.mergeJson = function (name, aID, jsonA, jsonB, bID, bKey){
    var jsonALength=jsonA.length, jsonBLength=jsonB.length;
    if (jsonALength) {
        for(var i=0;i<jsonALength;i++){
            for(var j=0;j<jsonB.length;j++){
                if(jsonA[i][aID]==jsonB[j][bID]){
                    jsonA[i][name]=jsonB[j];
                }
            }
        }
    }
    return jsonA;
}

//生成随机字符串，如果第二次参数不为null，则生成随机的纯数字串，否则生成随机的字符串。
global.generateRandomAlphaNum = function (len,radix) {
    radix = radix ? 10 : 36;
    var rdmString = "";
    for (; rdmString.length < len; rdmString += Math.random().toString(radix).substr(2));
    return rdmString.substr(0, len);
}