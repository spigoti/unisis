const {connectToDB} = require('../../database');

class UpdateProtocolService {
    async execute(name, ieeeQuery, acmQuery, id) {

        try {
            let entity = {
                name,
                ieeeQuery,
                acmQuery
            };

            const connection = await connectToDB();
            const query = this.createQuery(entity, id)
            const [result] = await connection.execute(query);
            return result.insertId;
        } catch (error) {
            throw new Error(error);
        }
    }

    createQuery(entity, id) {
        let availableValues = [];

        for(let index in entity) {
            if(!!entity[index]) {
                availableValues.push(`${index}" = ${entity[index]}"`);
            }
        }

        let availableValuesString = availableValues.join(',');
        return `UPDATE protocol SET ${availableValuesString} WHERE id = ${id}`;
    }
}

module.exports = UpdateProtocolService;
