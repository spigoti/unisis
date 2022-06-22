const {connectToDB} = require("../../database");

class ReadProtocolService {
    async execute(id) {

      try {
        const connection = await connectToDB();
          const [articles] = await connection.execute(`SELECT * FROM protocol WHERE id = ${id};`);
          let articleData = articles[0];
          const [rows] = await connection.execute(`SELECT * FROM article WHERE protocol = ${id};`);

        return {...articleData, articles: rows};
      } catch (error) {
        throw new Error(error);
      }
    }
}

module.exports = ReadProtocolService;
