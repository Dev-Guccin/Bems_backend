#!/usr/bin/env node
const shell = require('shelljs');
var fs = require('fs');

var Handler = {
    restart_all: function () {
        //config파일 확인하기
        //해당 통신모듈 전부 삭제
        //해당 통신모듈 전부 실행
    },
    restart_only: function (target) {
        //config확인을 통해 해당 통신확인
        let active = Handler.get_config()
        console.log(active)
        if (target == "modbus") {
            if (active[0] == 0) {
                return false
            }
            // 해당 통신 종료
            Handler.delete_module("modbus")
            // 재실
            Handler.start_module("modbus")
        }
        else if (target == "bacnet") {
            if (active[1] == 0) {
                return false
            }
            // 해당 통신 종료
            Handler.delete_module("bacnet")
            // 재실행
        }
        else if (target == "database") {
            if (active[2] == 0) {
                return false
            }
            // 해당 통신 종료
            Handler.delete_module("database")
            // 재실행
        }
        else {//target == wrong
            console.log("target wrong")
            return false
        }
    },
    get_config: function () {
        const article = fs.readFileSync("./uploads/config.txt");
        lineArray = article.toString().split('\n');
        let active = new Array()
        for (let i = 1; i < lineArray.length; i++) {
            if (lineArray[i].split("=")[1] == 1)
                active.push(1)
            else
                active.push(0)
        }
        return active
    },
    delete_module: function (filename) {
        console.log("[+] delete module :", filename)
        var pm2 = require('pm2')
        pm2.connect(function (err) {
            if (err) {
                console.error(err)
                process.exit(2)
            }
            pm2.delete(filename, function (err, apps) {
                if (err) {
                    console.error(err)
                    return pm2.disconnect()
                }
                pm2.list((err, list) => {
                    console.log(err, list)
                    pm2.restart('api', (err, proc) => {
                        // Disconnects from PM2
                        pm2.disconnect()
                    })
                })
            })
        })
        
    },
    start_module: function (filename) {
        console.log("[+] start moduel : ", filename)
        //filename에 따라 데이터가 달라져야함.
        if(filename)
        var pm2 = require('pm2')
        pm2.connect(function (err) {
            if (err) {
                console.error(err)
                process.exit(2)
            }
            pm2.start({
                script: './utils/test.js',
                name: 'test',
                autorestart: false
            }, function (err, apps) {
                if (err) {
                    console.error(err)
                    return pm2.disconnect()
                }
                pm2.list((err, list) => {
                    console.log(err, list)
                    pm2.restart('api', (err, proc) => {
                        // Disconnects from PM2
                        pm2.disconnect()
                    })
                })
            })
        })
    }
}

module.exports = Handler