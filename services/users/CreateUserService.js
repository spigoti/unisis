const {connectToDB} = require("../../database");
const crypto = require('crypto');

class CreateUserService {
    async execute(email, password) {
        let passwordSha1 = crypto.createHash('sha1').update(password).digest('hex');

        try {
            const connection = await connectToDB();
            const [result] = await connection.execute(`INSERT INTO user (email, password) VALUES ('${email}', '${passwordSha1}')`);
            return result.insertId;
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = {CreateUserService};
