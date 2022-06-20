const mysql = require('mysql2');

class CreateArticleService {
    async execute(title, abstract, authors, year, citedBy, base, referenceUrl, protocol, selected) {
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            port: 3306,
            database: 'unisis'
        });

        let articleCreate = connection.query(`INSERT INTO article (title, abstract, authors, year, citedBy, base, referenceUrl, protocol, selected) VALUES ("${title}", "${abstract}", "${authors}", "${year}", "${citedBy}", "${base}", "${referenceUrl}", "${protocol}", "${selected}")`);

        return {articleCreate};
    }
}

module.exports = {CreateArticleService};