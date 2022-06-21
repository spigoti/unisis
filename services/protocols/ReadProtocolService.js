const {connectToDB} = require("../../database");

class ReadProtocolService {
    async execute(id) {

      try {
        const connection = await connectToDB();
        const [rows] = await connection.execute(`SELECT * FROM protocol WHERE id = ${id};`);
        return rows[0];
      } catch (error) {
        throw new Error(error);
      }
    }
}

module.exports = ReadProtocolService;
