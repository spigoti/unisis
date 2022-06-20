const {CreateUserService} = require("../../services/users/CreateUserService");

class CreateUserController {
    async handle (req, res) {
        const {email, password } = req.body;
        const service = new CreateUserService();

        try {
            const result = service.execute(email, password);
            return res.json(result);

        } catch (err) {
            return res.json({error: err.message});
        }
    }
}

module.exports = {CreateUserController};
