const {UpdateUserService} = require("../../services/users/UpdateUserService");

class UpdateUserController {
    async handle (req, res) {
        const {name, ieeeQuery, acmQuery} = req.body;
        const service = new UpdateUserService();
        //
        // try {
        //     const result = service.execute(name, ieeeQuery, acmQuery);
        //     console.log(result)
        //     return res.json("Deu certo");
        //
        // } catch (err) {
        //     return res.json({error: err.message});
        // }
    }
}

module.exports = UpdateUserController;

