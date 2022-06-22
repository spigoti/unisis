const mysql = require('mysql2/promise');
const {sign} = require('jsonwebtoken');
const crypto = require("crypto");

class AuthService {
    async execute(email, password) {
        const connection = await mysql.createConnection(process.env.BD_DATA);
        try {
            let [rows] = await connection.query(`SELECT * FROM user WHERE email = "${email}"`);
            
            if(rows.length === 0) {
                return {
                    error: "Nenhum usuário encontrado.",
                    status: 404
                }
            }

            let userFound = rows[0];
            let passwordSha1 = crypto.createHash('sha1').update(password).digest('hex');

            if(userFound.password !== passwordSha1) {
                return {error: "Senha incorreta."};
            }

            const token = sign(
                {
                    user: {
                        id: userFound.id,
                        email: userFound.email,
                        password: userFound.password,
                    }
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1d",
                    subject: userFound.id.toString()
                }
            )

            const user = {
                id: userFound.id,
                createdAt: userFound.createdAt,
                email: userFound.email,
                status: 200
            }

            return {token, user};
        } catch (error) {
            return error;
        }

    }
}

module.exports = {AuthService};
