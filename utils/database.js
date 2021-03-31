var mysql = require('mysql')

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123123',
  database : 'bems'
});
connection.connect();
var Database = {
    device_select:function(){
        connection.query('SELECT * from devices', (error, rows, fields) => {
            if (error) throw error;
            console.log('User info is: ', rows);
        })
    },
    device_delete:function(tablename){
        connection.query('DELETE from '+tablename, (error, rows, fields) => {
            if (error) throw error;
            console.log('User info is: ', rows);
        });
    },
    device_insert:function(page,data){
        if(page == 0){//Device
            connection.query(`INSERT INTO Devices VALUES('${data.ChannelName}','${data.ComType}','${data.IpAddress}',${data.Port},${data.Period},${data.WaitTime},${data.Active})`, (error, rows, fields) => {
                if (error) throw error;
                console.log('User info is: ', rows);
            });
        }
        else if(page == 1){//Frame
            connection.query(`INSERT INTO Frames VALUES('${data.ChannelName}','${data.FrameName}',${data.FunctionCode},${data.DeviceAddress},${data.StartAddress},${data.ReadByte},${data.Active})`, (error, rows, fields) => {
                if (error) throw error;
                console.log('User info is: ', rows);
            });
        }
        else{//Detail

        }
        
    }
}
module.exports = Database