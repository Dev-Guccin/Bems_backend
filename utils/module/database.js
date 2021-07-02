const mysql = require('mysql')
let dbconfig = {
    host: 'localhost',
    user: 'root',
    password: '4msys',
    database: 'bems'
}
const connection = mysql.createConnection(dbconfig);
connection.connect();

const Database = {
    select_table: function (table, callback) {
        // connection = mysql.createConnection(dbconfig);
        // connection.connect();
        return new Promise(function (resolve, reject) {
            connection.query(`SELECT * from ${table}`, (error, rows, fields) => {
                if (error) throw error;
                // connection.end();
                resolve(rows);
            })
        })
    },
    delete_table: function (tablename) {
        // // console.log("delete table name ",tablename)
        // connection = mysql.createConnection(dbconfig);
        // connection.connect();
        return new Promise(function (resolve, reject) {
            connection.query(`DELETE FROM ${tablename}`, function (err) {
                // connection.end();
                if(err){console.log(err); resolve(false)}
                resolve();
            });
        });
    },
    insert_table: function (page, data) {
        // console.log("insert table name ",page)
        // connection = mysql.createConnection(dbconfig);
        // connection.connect();
        if (page == 0) {//Device
            return new Promise(function (resolve, reject) {
                connection.query(`INSERT INTO bacnet_device (id,name,ip_address,port,period,active,available) 
                VALUES(${data.Id},'${data.Name}','${data.IpAddress}',${data.Port},${data.Period},${data.Active},${data.Available})`, function(error, rows, fields)  {
                    // connection.end();
                    if(error){
                        console.log(error)
                        resolve(false)
                    }
                    resolve();
                });
            });
        }
        else {//Station
            return new Promise(function (resolve, reject) {
                connection.query(`INSERT INTO bacnet_station (id,name,device_id,object,object_type,object_instance,value_type,active)
                VALUES(${data.Id},'${data.Name}',${data.DeviceId},'${data.Object}',${data.Object_type},${data.Object_instance},${data.Value_type},${data.Active})`, function (error, rows, fields)  {
                    // connection.end();
                    if(error){
                        console.log(error)
                        resolve(false)
                    }
                    resolve();
                });
            });
        }
    },
    set_available: function (data) {
        //ipaddress
        ipadr = data.split(":")
        console.log(ipadr)
        connection.query(`UPDATE bacnet_device SET available=1 WHERE ip_address='${ipadr[0]}' and port=${ipadr[1]!=undefined?parseInt(ipadr[1]):47808};`, function (error, rows, fields) {
            if(error){
                console.log(error)
            }
            else{
            }
        });
    },
    reset_available: function () {
        connection.query(`UPDATE bacnet_device SET available=0;`, function (error, rows, fields) {
            if(error){
                console.log(error)
            }
            else{
            }
        });
    },
    get_ids_device:async function(){
        return new Promise(function(resolve, reject){
            connection.query(`SELECT id FROM bacnet_device;`, function (error, rows, fields) {
                if(error){
                    console.log(error)
                    resolve()
                }
                else{
                    resolve(rows)
                }
            });
        })
    },
    get_ids_device_available: function(id){
        return new Promise(function(resolve, reject){
            connection.query(`SELECT id,period FROM bacnet_device WHERE id=${id} and active=1 and available=1;`, function (error, rows, fields) {
                if(error){
                    console.log(error)
                    resolve()
                }
                else{
                    resolve(rows[0])
                }
            });
        })
    },
    get_device_from_id: function(id){
        return new Promise(function(resolve, reject){
            connection.query(`SELECT * FROM bacnet_device WHERE id=${id};`, function (error, rows, fields) {
                if(error){
                    console.log(error)
                    resolve()
                }
                else{
                    resolve(rows[0])
                }
            });
        })
    },
    get_ids_station: function(device_id){
        console.log("get_ids_station:",device_id)
        return new Promise(function(resolve, reject){
            connection.query(`SELECT id FROM bacnet_station WHERE device_id=${device_id};`, function (error, rows, fields) {
                if(error){
                    console.log(error)
                    resolve()
                }
                else{
                    resolve(rows)
                }
            });
        })
    },
    get_station_from_id: function(id){
        return new Promise(function(resolve, reject){
            connection.query(`SELECT * FROM bacnet_station WHERE id=${id};`, function (error, rows, fields) {
                if(error){
                    console.log(error)
                    resolve()
                }
                else{
                    resolve(rows[0])
                }
            });
        })
    },
    realtime_upsert: function (id, object_name, resData, object_type) {
        console.log("INSERT!!! ", id, object_name, resData, object_type)
        connection.query(`insert into realtime_table (id,object_name, logvalue, logtime,object_type, com_type)
        values (${id},'${object_name}', ${resData}, now(),'${object_type}','bacnet') as t
        on duplicate key update logvalue = t.logvalue, logtime = t.logtime`, (error, rows, fields) => {
            if (error) throw error;
        });
    }
}
module.exports = Database