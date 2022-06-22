const {connectToDB} = require('../../database');

class CreateProtocolService {
    async execute(name, ieeeQuery, acmQuery, userId) {
        
        try {
            let entity = {
                name,
                ieeeQuery,
                acmQuery
            };

            const connection = await connectToDB();
            const query = this.createQuery(entity);
            const [result] = await connection.execute(query);

            await connection.execute(`INSERT INTO userProtocol (createdBy, userId, protocolId) VALUES (${userId}, ${userId}, ${result.insertId});`);

            return result.insertId;
        } catch (error) {
            throw new Error(error);
        }
    }

    createQuery(entity) {
        let availableFields = [];
        let availableValues = [];

        for(let index in entity) {
            if(!!entity[index]) {
                availableFields.push(index);
                availableValues.push(`"${entity[index]}"`);
            }
        }

        let availableValuesString = availableValues.join(',');
        let availableFieldsString = availableFields.join(',');
        return `INSERT INTO protocol (${availableFieldsString}) VALUES (${availableValuesString})`;
    }
}

module.exports = {CreateProtocolService};
