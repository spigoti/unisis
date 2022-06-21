const {connectToDB} = require('../../database');

class DeleteUserService {
    async execute(id) {
        try {
            const connection = await connectToDB();
            const [result] = await connection.execute(`DELETE FROM user WHERE id = ${id}`);
            return result;
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = DeleteUserService;
