const mysql = require('mysql');
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1216',
  database: 'books'
});
module.exports = connection;