const { connectToDB } = require("../../database");

class DeleteArticleService {
  async execute(id) {
    try {
      const connection = await connectToDB();
      const [result] = await connection.execute(`DELETE FROM article WHERE id = ${id}`);
      return result;
    } catch (error) {
        throw new Error(error);
    }
  }
}

module.exports = DeleteArticleService;