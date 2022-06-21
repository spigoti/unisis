const {connectToDB} = require('../../database');

class UpdateProtocolService {
    async execute(name, ieeeQuery, acmQuery) {

        try {
            const connection = await connectToDB();
            const [result] = await connection.execute(`UPDATE user SET name = ${name}, ieeeQuery = ${ieeeQuery}, acmQuery = ${acmQuery} WHERE id = ${id}`);
            return result.insertId;
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = UpdateProtocolService;
