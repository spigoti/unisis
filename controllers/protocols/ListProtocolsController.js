const ListProtocolService = require("../../services/protocols/ListProtocolService");

class ListProtocolController {
    async handle (req, res) {
			const service = new ListProtocolService();
			const {userId} = req;

			try {
					const result = await service.execute(userId);
					return res.json(result);
			} catch (err) {
					return res.json({error: err.message});
			}
    }
}

module.exports = ListProtocolController;
