const {connectToDB} = require("../../database");

class ReadProtocolService {
    async execute(id) {

      try {
        const connection = await connectToDB();
          const [articles] = await connection.execute(`SELECT * FROM protocol WHERE id = ${id};`);
          let articleData = articles[0];

          let articlesList = [];
          let [rows] = await connection.execute(`SELECT * FROM article WHERE protocolId = ${id} AND classified = 1;`);
          articlesList = [...rows];

          let otherRows = await connection.execute(`SELECT * FROM article WHERE protocolId = ${id} AND classified != 1 ORDER BY citedBy DESC;`);
          otherRows[0].forEach(item => articlesList.push(item));

        return {...articleData, articles: articlesList};
      } catch (error) {
        throw new Error(error);
      }
    }
}

module.exports = ReadProtocolService;
