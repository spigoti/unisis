// const mysql = require('mysql2');
// const crypto = require('crypto');
//
// class CreateUserService {
//     async execute(email, password) {
//         const connection = mysql.createConnection({
//             host: 'localhost',
//             user: 'root',
//             password: '',
//             port: 3306,
//             database: 'unisis'
//         });
//
//         let passwordSha1 = crypto.createHash('sha1').update(password).digest('hex');
//         let userCreate = connection.query(`INSERT INTO user (email, password) VALUES ("${email}", "${passwordSha1}")`);
//
//         return {userCreate};
//     }
// }
//
// module.exports = {CreateUserService};
