const {connectToDB} = require('../../database');

class UpdateUserService {
    async execute(id, email) {

        try {
            const connection = await connectToDB();
            const [result] = await connection.execute(`UPDATE user SET email = ${email} WHERE id = ${id}`);
            return result.insertId;
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = UpdateUserService;
