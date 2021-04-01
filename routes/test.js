var express = require('express');
var router = express.Router();
var Database = require("../utils/database.js")
var Setting = require("../utils/setting.js")

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(Database.device_select())
  res.send('respond with a resource');
  var filePath = './uploads/latestExcel.xlsx'
  Setting.loadExcelFile(filePath)
});

router.post('/modbus', function(req, res, next) {
  console.log("modbus test");
  Database.device_select(req.body.tablename, function(rows){
    console.log("이거 콜백 왜 안되냐");
    res.send(rows)
  });
});

router.get('/soso', function(req, res, next){
  console.log("test soso");
  res.send("김성연 바보");
})

module.exports = router;
