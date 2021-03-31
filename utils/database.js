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
    device_delete:function(){
        connection.query('DELETE from devices ', (error, rows, fields) => {
            if (error) throw error;
            console.log('User info is: ', rows);
        });
    },
    device_insert:function(data){
        connection.query('INSERT INTO TABLENAME() VALUES()', (error, rows, fields) => {
            if (error) throw error;
            console.log('User info is: ', rows);
        });
    }
}
module.exports = Database