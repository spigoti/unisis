const mysql = require('mysql2');

class CreateProtocolService {
    async execute(name, ieeeQuery, acmQuery) {
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            port: 3306,
            database: 'unisis'
        });

        let protocolCreate = connection.query(`INSERT INTO protocol (name, ieeeQuery, acmQuery) VALUES ("${name}", "${ieeeQuery}", "${acmQuery}")`);

        return {protocolCreate};
    }
}

module.exports = {CreateProtocolService};
