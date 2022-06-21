const {
  CreateArticleService
} = require("../../services/articles/CreateArticleService");

class CreateArticleController {
  async handle(req, res) {
    const { title, abstract, authors, year, citedBy, base, referenceUrl, protocol, selected } = req.body;
    const service = new CreateArticleService();

    try {
      const result = service.execute(title, abstract, authors, year, citedBy, base, referenceUrl, protocol, selected);
      console.log(result)
      return res.json("Deu certo");

    } catch (err) {
      return res.json({
        error: err.message
      });
    }
  }
}

module.exports = CreateArticleController;