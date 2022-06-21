const ListUserService = require("../../services/users/ListUserService");

class ListUserController {
    async handle (req, res) {
			const service = new ListUserService();

			try {
					const result = await service.execute();
					return res.json(result);
			} catch (err) {
					return res.json({error: err.message});
			}
    }
}

module.exports = ListUserController;
