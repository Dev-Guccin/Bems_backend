// events 모듈 사용
var events = require('events');

// EventEmitter 객체 생성
var eventEmitter = new events.EventEmitter({

});
var flag = false;

// 함수를 변수안에 담는 대신에, .on() 메소드의 인자로 직접 함수를 전달
eventEmitter.on('start', function(){
    console.log("Data Received");
    if(flag == true) return
    else{
        console.log("test")
    }
});
eventEmitter.on('end', function(){
    flag = true;
});

module.exports = eventEmitter