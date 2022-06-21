class DeleteArticleController {
	async handle(req, res) {
		const {
			id
		} = req.body;

		const service = new DeleteArticleService(id);

		try {
			const result = service.execute();
			return res.json(result);
		} catch (err) {
			return res.json({
				error: err.message
			});
		}
	}
}

module.exports = {DeleteArticleController}