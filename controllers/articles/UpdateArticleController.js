const UpdateArticleService = require("../../services/articles/UpdateArticleService");

class UpdateArticleController {
    async handle (req, res) {
        const {selected} = req.body;
        const {id} = req.params;
        const service = new UpdateArticleService();

        try {
            const result = service.execute(id, selected);
            return res.json({id: result});

        } catch (err) {
            return res.json({error: err.message});
        }
    }
}

module.exports = UpdateArticleController;

