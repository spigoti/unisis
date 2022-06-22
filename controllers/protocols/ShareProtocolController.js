const ShareProtocolService = require("../../services/protocols/ShareProtocolService");

class ShareProtocolController {
  async handle(req, res) {
    const service = new ShareProtocolService();
    const {user, protocol} = req.body;
    const {userId} = req;

    try {
        const result = await service.execute(userId, user, protocol);
        return res.json({id:result});
    } catch (err) {
        return res.json({error: err.message});
    }
  }
}

module.exports = ShareProtocolController;