const {AuthService} = require('../services/AuthService')

class AuthController {
    async handle (req, res) {
        const {email, password} = req.body;
        const service = new AuthService();

        try {
            const result = await service.execute(email, password);
            return res.json(result);
        } catch (err) {
            return res.json({error: err.message});
        }
    }
}

module.exports = AuthController;
