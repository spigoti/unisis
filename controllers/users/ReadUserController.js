const ReadUserService = require("../../services/users/ReadUserService");

class ReadUserController {
    async handle (req, res) {
        const { id } = req.params;
        const service = new ReadUserService();

        try {
            const result = await service.execute(id);
            return res.json(result);
        } catch (err) {
            return res.json({error: err.message});
        }
    }
}

module.exports = ReadUserController;
