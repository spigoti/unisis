const {connectToDB} = require('../../database');

class UpdateArticleService {
    async execute(id, selected) {

        try {
            const connection = await connectToDB();
            const [result] = await connection.execute(`UPDATE article SET selected = ${selected} WHERE id = ${id}`);
            return result.insertId;
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = UpdateArticleService;
