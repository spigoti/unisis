const ReadSharedProtocolService = require("../../services/protocols/ReadSharedProtocolService");

class ReadSharedProtocolController {
  async handle (req, res) {
    const { id } = req.params;
    const service = new ReadSharedProtocolService();

    try {
        const result = await service.execute(id);
        return res.json(result);
    } catch (err) {
        return res.json({error: err.message});
    }
  }
}

module.exports = ReadSharedProtocolController;