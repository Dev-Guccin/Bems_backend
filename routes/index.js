var express = require('express');
var path = require('path');
var router = express.Router();

router.post('/endpoint-for-get-user-info',function(req,res,next){
  var body = req.body;
  console.log(body.params);
  if (body.params.uid == "admin" && body.params.password == "admin"){
    res.send({uid : 'admin'});
  }else{
    res.send();
  }
})
router.post('/endpoint-for-is-finished', function(req,res,next){
  var body = req.body;
  if (body.params.uid == 'admin'){
    res.send({uid : 'admin'})
  }
})
/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname,'../public','index.html'));
  //res.render('index', { title: 'Express' });
});

module.exports = router;
