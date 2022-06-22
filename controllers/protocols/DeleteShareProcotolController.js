const DeleteShareProtocolService = require("../../services/protocols/DeleteShareProtocolService");

class DeleteShareProcotolController {
    async handle (req, res) {
        const {id} = req.params;
        const service = new DeleteShareProtocolService();

        try {
            service.execute(id);
            return res.json({message: 'Compartilhamento removido com sucesso!'});

        } catch (err) {
            return res.json({error: err.message});
        }
    }
}

module.exports = DeleteShareProcotolController;

