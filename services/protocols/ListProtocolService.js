const {connectToDB} = require("../../database");

class ListProtocolService {
    async execute(userId) {

      try {
        const connection = await connectToDB();
        const [rows] = await connection.execute(`SELECT * FROM protocol pr JOIN userProtocol up ON pr.id = up.protocolId WHERE up.userId = ${userId}`);
        return rows;
      } catch (error) {
        throw new Error(error);
      }
    }
}

module.exports = ListProtocolService;
