const ListProtocolService = require("../../services/protocols/ListProtocolService");

class ListProtocolController {
    async handle (req, res) {
			const service = new ListProtocolService();

			try {
					const result = await service.execute();
					return res.json(result);
			} catch (err) {
					return res.json({error: err.message});
			}
    }
}

module.exports = ListProtocolController;
