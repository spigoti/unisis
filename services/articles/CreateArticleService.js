const { connectToDB } = require('../../database');

class CreateArticleService {
    async execute(title, abstract, authors, year, citedBy, base, referenceUrl, protocol) {
        base = (!base) ? null : base;

        try {
            const connection = await connectToDB();
            const [rows] = await connection.execute(`INSERT INTO article (title, abstract, authors, year, citedBy, reference, protocolId) VALUES ('${title}', '${abstract}', '${authors}', "${year}", ${citedBy}, '${referenceUrl}', ${protocol});`);
            return rows;
          } catch (error) {
            throw new Error(error);
          }
    }
}

module.exports = CreateArticleService;