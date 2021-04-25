var express = require('express');
var path = require('path');
var router = express.Router();
var Excel  = require('../utils/setting')
var Handler  = require('../utils/handler')

var multer = require('multer'); // express에 multer모듈 적용 (for 파일업로드)
const upload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'uploads/');
      },
      filename: function (req, file, cb) {
        //cb(null, file.originalname);
        cb(null, "latestExcel.xlsx");
      }
    }),
  });
//var upload = multer({ dest: "uploads" })

/* GET home page. */
router.post('/excel', upload.single('file'), function(req, res, next) {//파일을 받아서 uploads에 저장한다. 그럼 이때 util로 엑셀쪼개기 들어감
    console.log("post");
    console.log(req.file)
    console.log(req.file.filename)
    //엑셀 쪼개기 들어가기
    Excel.loadExcelFile()
    //전체 모듈 재실행 (나중에 bacnet별, modbus별 다르게 해줘도 좋을듯)
    Handler.module_restart()
    res.send('respond with a');
});
router.get('/excel', function(req, res, next) {
    console.log("get");
    res.send('respond with a resource');
});
module.exports = router;
