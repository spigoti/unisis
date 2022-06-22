const {AuthService} = require('../services/AuthService')

class AuthController {
    async handle (req, res) {
        const {email, password} = req.body;
        const service = new AuthService();

        try {
            const result = await service.execute(email, password);

            if (result.status === 404) {
                return res.status(404).json({ message: "Usuário ou senha inválidos." }); // 404
            }
            return res.json(result);
        } catch (err) {
            return res.json({error: err.message});
        }
    }
}

module.exports = AuthController;
