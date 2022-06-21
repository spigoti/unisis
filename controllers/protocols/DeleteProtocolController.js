const DeleteProtocolService = require("../../services/protocols/DeleteProtocolService");

class DeleteProtocolController {
    async handle (req, res) {
        const {id} = req.params;
        const service = new DeleteProtocolService();

        try {
            service.execute(id);
            return res.json({message: 'Protocolo removido com sucesso!'});

        } catch (err) {
            return res.json({error: err.message});
        }
    }
}

module.exports = {CreateProtocolController};

