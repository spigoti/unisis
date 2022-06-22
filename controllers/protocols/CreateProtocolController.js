const {CreateProtocolService} = require("../../services/protocols/CreateProtocolService");

class CreateProtocolController {
    async handle (req, res) {
        const {name, ieeeQuery, acmQuery} = req.body;
        const {userId} = req;
        const service = new CreateProtocolService();

        try {
            const result = await service.execute(name, ieeeQuery, acmQuery, userId);
            return res.json({id: result});

        } catch (err) {
            return res.json({error: err.message});
        }
    }
}

module.exports = CreateProtocolController;

