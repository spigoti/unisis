const {connection} = require('../../database');

class DeleteUserService {
    async execute(id) {
        const [rows] = await connection.execute(`DELETE FROM users WHERE id = ${id}`);

        return rows;
    }
}

module.exports = {DeleteUserService};
