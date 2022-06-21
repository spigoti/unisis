const mysql = require('mysql2');
const {
    pool
} = require('../../database');

class CreateArticleService {
    async execute(title, abstract, authors, year, citedBy, base, referenceUrl, protocol, selected) {

        let articleCreate = pool.query(`INSERT INTO article (title, abstract, authors, year, citedBy, base, referenceUrl, protocol, selected) VALUES ("${title}", "${abstract}", "${authors}", "${year}", "${citedBy}", "${base}", "${referenceUrl}", "${protocol}", "${selected}")`);

        return {
            articleCreate
        };
    }
}

module.exports = {
    CreateArticleService
};