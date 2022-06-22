const {connectToDB} = require('../../database');

class DeleteShareProtocolService {
    async execute(id) {

        try {
            const connection = await connectToDB();
            const [result] = await connection.execute(`DELETE FROM userProtocol WHERE id = ${id}`);
            return result;
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = DeleteShareProtocolService;
