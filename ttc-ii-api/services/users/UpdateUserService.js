const mysql = require('mysql2');

class UpdateUserService {
    async execute(email, password) {
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            port: 3306,
            database: 'unisis'
        });

        let userUpdate = '';

        return {userUpdate};
    }
}

module.exports = {UpdateUserService};
