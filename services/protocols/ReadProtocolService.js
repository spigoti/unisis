const {connectToDB} = require("../../database");

class ReadProtocolService {
    async execute(id) {

      try {
        const connection = await connectToDB();
        const [rows] = await connection.execute(`SELECT * FROM article WHERE protocolId = ${id};`);
        return rows;
      } catch (error) {
        throw new Error(error);
      }
    }
}

module.exports = ReadProtocolService;
