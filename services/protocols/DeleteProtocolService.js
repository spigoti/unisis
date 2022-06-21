const {connectToDB} = require('../../database');

class DeleteProtocolService {
    async execute(id) {

        try {
            const connection = await connectToDB();
            const [result] = await connection.execute(`DELETE FROM protocol WHERE id = ${id}`);
            return result;
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = DeleteProtocolService;
