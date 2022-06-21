const {
  CreateArticleService
} = require("../../services/articles/CreateArticleService");

class CreateArticleController {
  async handle(req, res) {
    const { title, abstract, authors, year, citedBy, base, referenceUrl, protocol, selected } = req.body;
    const service = new CreateArticleService();


    try {
      const result = await service.execute(title, abstract, authors, year, citedBy, base, referenceUrl, protocol, selected);
      return res.json({id: result});
    } catch (err) {
        return res.send({error: err.message});
    }
  }
}

module.exports = CreateArticleController;