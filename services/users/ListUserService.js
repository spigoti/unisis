const {connectToDB} = require("../../database");

class ListUserService {
    async execute() {

      try {
        const connection = await connectToDB();
        const [rows] = await connection.execute(`SELECT * FROM user;`);
        return rows;
      } catch (error) {
        throw new Error(error);
      }
    }
}

module.exports = ListUserService;
