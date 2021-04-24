var express = require('express');
var router = express.Router();
var Database = require("../utils/database.js")
var Setting = require("../utils/setting.js")
var Modbus = require("../utils/modbus.js")

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
    res.send(rows)
  });
});

router.get('/soso', function(req, res, next){
  console.log("test soso");
  res.send("김성연 바보");
})

router.get('/start', function(req, res, next){
  console.log("test modbus");
  Modbus.emit("start");
  res.send("good");
})
router.get('/end', function(req, res, next){
  console.log("test modbus");
  Modbus.emit("end");
  res.send("good");
})
module.exports = router;
