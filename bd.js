const mysql = require('mysql2');

const connection = mysql.createConnection('mysql://root@localhost/unisis');

// CREATE TABLE protocol(
//     id INT NOT NULL AUTO_INCREMENT,
//     createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
//     updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
//     name VARCHAR(255) NOT NULL,
//     ieeeQuery VARCHAR(255) NOT NULL,
//     acmQuery VARCHAR(255) NOT NULL,
//     primary key (id)
// );

// CREATE TABLE user (
//  	id INT NOT NULL AUTO_INCREMENT,
//   	createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
//     createdBy INT NOT NULL,
//     email varchar(40) UNIQUE NOT NULL,
//   	password char(40) NOT NULL,
//   	primary key (id)
// );

// CREATE TABLE userProtocol (
//     id INT NOT NULL AUTO_INCREMENT,
//     createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
//     createdBy INT NOT NULL,
//     userId INT NOT NULL,
//     protocolId INT NOT NULL,
//     primary key (id),
//     foreign key (createdBy)
// 		references user(id),
//     foreign key (userId)
// 		references user(id),
//     foreign key (protocolId)
// 		references protocol(id)
// );

// CREATE TABLE article (
//         id INT NOT NULL AUTO_INCREMENT,
//         createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
//         title VARCHAR(255) NOT NULL,
//         abstract VARCHAR(500) NOT NULL,
//         authors VARCHAR(255),
//         year CHAR(4),
//         citedBy INT,
//         pdf VARCHAR(255),
//         reference VARCHAR(255),
//         protocolId INT NOT NULL,
//         classified INT NOT NULL,
//         primary key (id),
//         foreign key (protocolId)
//             references protocol(id)
//     );

const query = ``;

connection.query(
    query,
    function (err, results, fields) {
        if (err) {
            console.log(err)
            return;
        }

        console.log('Deu certo!');
    }
);