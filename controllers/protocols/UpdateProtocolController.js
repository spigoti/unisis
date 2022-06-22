const UpdateProtocolService = require("../../services/protocols/UpdateProtocolService");

class UpdateProtocolController {
    async handle (req, res) {
        const {name, ieeeQuery, acmQuery} = req.body;
        const service = new UpdateProtocolService();

        try {
            const result = service.execute(name, ieeeQuery, acmQuery);
            return res.json({id: result});

        } catch (err) {
            return res.json({error: err.message});
        }
    }
}

module.exports = UpdateProtocolController;

