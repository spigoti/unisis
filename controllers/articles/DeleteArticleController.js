const DeleteArticleService = require("../../services/articles/DeleteArticleService");

class DeleteArticleController {
    async handle (req, res) {
        const {id} = req.params;
        const service = new DeleteArticleService();

        try {
            await service.execute(id);
            return res.json({message: 'Artigo removido com sucesso!'});

        } catch (err) {
            return res.json({error: err.message});
        }
    }
}

module.exports = DeleteArticleController;

