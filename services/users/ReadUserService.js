const {connectToDB} = require("../../database");

class ReadUserService {
    async execute(id) {

      try {
        const connection = await connectToDB();
        const [rows] = await connection.execute(`SELECT * FROM user WHERE id = ${id};`);
        return rows[0];
      } catch (error) {
        throw new Error(error);
      }
    }
}

module.exports = ReadUserService;
