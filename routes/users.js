var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// router.post('/login', function(req, res, next){
//   res.send('login check');
//   var body = req.body;
//   console.log(req.body)
//   if(body.id == "admin"){//아이디 검증
//     if(body.password == "admin"){//해시검증 (passwd, isolate)
//       console.log("어드민이 맞음");
//     }
//   }
// })

module.exports = router;
