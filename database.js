const mysql = require('mysql2/promise');

async function connectToDB() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'unisis'
  });

  return connection;
}

module.exports = {
  connectToDB
};