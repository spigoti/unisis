const {CreateUserService} = require("../../services/users/CreateUserService");

class CreateUserController {
    async handle (req, res) {
        const {email, password } = req.body;
        const service = new CreateUserService();

        try {
            const result = await service.execute(email, password);
            return res.json({id: result});

        } catch (err) {
            return res.send({error: err.message});
        }
    }
}

module.exports = CreateUserController;
