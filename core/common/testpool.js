var sqlpool = require('./sqlpool');

console.dir(JSON.stringify(sqlpool))

var testpool = {};
exports.testpool = testpool;

testpool.query = function (req, res, next) {
  
    var sql = 'SELECT * FROM websites';
    //查
    sqlpool.query(sql, [], function (result, fields) {
        console.log('--------------------------SELECT----------------------------');
        console.log(result);
        console.log('------------------------------------------------------------\n\n');
        return next();

    });


}

testpool.add = function (req, res, next) {

    var addSql = 'INSERT INTO websites(Id,name,url,alexa,country) VALUES(0,?,?,?,?)';
    var addSqlParams = ['吴国源是个大帅哥哈哈哈哈哈哈', 'https://c.runoob.com', '23453', 'CN'];
    //增
    sqlpool.query(addSql, addSqlParams, function (result, fields) {

        console.log('--------------------------INSERT----------------------------');
        //console.log('INSERT ID:',result.insertId);        
        console.log('INSERT ID:', result);
        console.log('-----------------------------------------------------------------\n\n');
        return next();

    });


}