const {connectToDB} = require("../../database");

class ShareProtocolService {
  async execute(userId, id, protocol) {

    try {
      const connection = await connectToDB();
      const [result] = await connection.execute(`INSERT INTO userProtocol (createdBy, userId, protocolId) VALUES ("${userId}", "${id}", "${protocol}");`);

      return result.insertId;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = ShareProtocolService;