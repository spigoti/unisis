const ReadProtocolService = require("../../services/protocols/ReadProtocolService");

class ReadProtocolController {
    async handle (req, res) {
        const { id } = req.params;
        const service = new ReadProtocolService();

        try {
            const result = await service.execute(id);
            return res.json(result);
        } catch (err) {
            return res.json({error: err.message});
        }
    }
}

module.exports = ReadProtocolController;

