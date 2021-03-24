var express = require('express');
var path = require('path');
var router = express.Router();

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
router.post('/excel', upload.single('file'), function(req, res, next) {
    console.log("post");
    console.log(req.file)
    console.log(req.file.filename)
    res.send('respond with a');
});
router.get('/excel', function(req, res, next) {
    console.log("get");
    res.send('respond with a resource');
});
module.exports = router;
