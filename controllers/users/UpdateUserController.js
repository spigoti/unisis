const UpdateUserService = require("../../services/users/UpdateUserService");

class UpdateUserController {
    async handle (req, res) {
        const { id } = req.params;
        const { email } = req.body;
        const service = new UpdateUserService();

        try {
            const result = await service.execute(id, email);
            return res.json({id: result});

        } catch (err) {
            return res.send({error: err.message});
        }
    }
}

module.exports = UpdateUserController;

