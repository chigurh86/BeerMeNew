var mysql = require('mysql')
var connection;
if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);

} else{
  connection = mysql.createConnection({
    host: process.env.DB_HOST || "127.0.0.1" || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root",
    database : process.env.DB_NAME || "express-cc",
    socketName: '/tmp/mysql.sock'
  });
};

connection.connect()
//comment
// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });

module.exports = connection;
