const {connectToDB} = require("../../database");

class ReadSharedProtocolService {
    async execute(id) {

      try {
        const connection = await connectToDB();
        const [rows] = await connection.execute(`SELECT * FROM userProtocol pr JOIN user us ON us.id = pr.userId WHERE pr.protocolId = ${id};`);
        return rows;
      } catch (error) {
        throw new Error(error);
      }
    }
}

module.exports = ReadSharedProtocolService;
