const {DeleteUserService} = require("../../services/users/DeleteUserService");

class DeleteUserController {
    async handle (req, res) {
        const {id} = req.body;
        const service = new DeleteUserService();

        try {
            const result = service.execute(id);
            return res.json(result);

        } catch (err) {
            return res.json({error: err.message});
        }
    }
}

module.exports = {DeleteUserController};

