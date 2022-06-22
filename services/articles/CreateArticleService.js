const { connectToDB } = require('../../database');

class CreateArticleService {
    async execute(title, abstract, authors, year, citedBy, referenceUrl, protocol, base) {
        try {
            const connection = await connectToDB();
            title = title.replaceAll("'", '');
            abstract = abstract.replaceAll("'", '');
            authors = authors.replaceAll("'", '');

            const [rows] = await connection.execute(`INSERT INTO article (title, abstract, authors, year, citedBy, base, referenceUrl, protocol) VALUES ('${title}', '${abstract}', '${authors}', "${year}", '${citedBy}', '${base}', '${referenceUrl}', ${protocol});`);
            return rows;
          } catch (error) {
            throw new Error(error);
          }
    }
}

module.exports = CreateArticleService;