const {connectToDB} = require('../../database');

class CreateProtocolService {
    async execute(name, ieeeQuery, acmQuery, userId) {
        
        try {
            const connection = await connectToDB();
            const [result] = await connection.execute(`INSERT INTO protocol (name, ieeeQuery, acmQuery) VALUES ("${name}", "${ieeeQuery}", "${acmQuery}");`);

            await connection.execute(`INSERT INTO userProtocol (createdBy, userId, protocolId) VALUES (${userId}, ${userId}, ${result.insertId});`);

            return result.insertId;
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = {CreateProtocolService};
