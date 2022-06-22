const UpdateProtocolService = require("../../services/protocols/UpdateProtocolService");

class UpdateProtocolController {
    async handle (req, res) {
        const {name, ieeeQuery, acmQuery} = req.body;
        const {id} = req.params;
        const service = new UpdateProtocolService();

        try {
            const result = service.execute(name, ieeeQuery, acmQuery, id);
            return res.json({id: result});

        } catch (err) {
            return res.json({error: err.message});
        }
    }
}

module.exports = UpdateProtocolController;

