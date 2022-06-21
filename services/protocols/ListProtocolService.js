const {connectToDB} = require("../../database");

class ListProtocolService {
    async execute() {

      try {
        const connection = await connectToDB();
        const [rows] = await connection.execute(`SELECT * FROM protocol;`);
        return rows;
      } catch (error) {
        throw new Error(error);
      }
    }
}

module.exports = ListProtocolService;
