const {CreateProtocolService} = require("../../services/protocols/CreateProtocolService");

class CreateProtocolController {
    async handle (req, res) {
        const {name, ieeeQuery, acmQuery} = req.body;
        const service = new CreateProtocolService();

        try {
            const result = service.execute(name, ieeeQuery, acmQuery);
            console.log(result)
            return res.json("Deu certo");

        } catch (err) {
            return res.json({error: err.message});
        }
    }
}

module.exports = CreateProtocolController;

