const DeleteUserService = require("../../services/users/DeleteUserService");

class DeleteUserController {
    async handle (req, res) {
        const {id} = req.params;
        const service = new DeleteUserService();

        try {
            await service.execute(id);
            return res.json({message: 'Usuário removido com sucesso!'});

        } catch (err) {
            return res.json({error: err.message});
        }
    }
}

module.exports = DeleteUserController;

