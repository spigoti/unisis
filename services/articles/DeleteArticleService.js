const { connection } = require("../../database");

class DeleteArticleService {
  async execute(id) {
    let articleDelete = await connection.execute(`DELETE FROM article WHERE id = "${id}"`);

    return {
      articleDelete
    };
  }
}

module.exports = {
  DeleteArticleService
};