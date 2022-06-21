const { connection } = require('../../database');

class CreateArticleService {
    async execute(title, abstract, authors, year, citedBy, base, referenceUrl, protocol, selected) {

        let articleCreate = await connection.execute(`INSERT INTO article (title, abstract, authors, year, citedBy, base, referenceUrl, protocol, selected) VALUES ("${title}", "${abstract}", "${authors}", "${year}", "${citedBy}", "${base}", "${referenceUrl}", "${protocol}", "${selected}")`);

        return {
            articleCreate
        };
    }
}

module.exports = {
    CreateArticleService
};