const { connection } = require('../../database');

class CreateArticleService {
    async execute(title, abstract, authors, year, citedBy, base, referenceUrl, protocol, selected) {

        let articleCreate = await connection.execute(`INSERT INTO article (title, abstract, authors, year, citedBy, base, referenceUrl, protocol, selected) VALUES ("${title}", "${abstract}", "${authors}", "${year}", "${citedBy}", "${base}", "${referenceUrl}", "${protocol}", "${selected}")`);

        return {
            articleCreate
        };

        // var sql = "INSERT INTO Test (name, email, n) VALUES ?";
        //
        // conn.query(sql, [values], function(err) {
        //     if (err) throw err;
        //     conn.end();
        // });
    }
}

module.exports = {
    CreateArticleService
};