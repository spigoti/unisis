const puppeteer = require("puppeteer");
const CreateArticleService = require("../../services/articles/CreateArticleService");

class ListArticlesController {
    async handle(req, res) {
        const {protocol} = req.body;

        puppeteer.launch()
            .then(async function (browser) {
                const page = await browser.newPage();
                let articles = [];

                if (req.body.acmQuery) {
                    await page.goto(req.body.acmQuery);
                    await page.waitForSelector('.search-result__xsl-body');
                    articles = articles.concat(await extractDataAcm(page));
                }

                if (req.body.ieeeQuery){
                    await page.goto(req.body.ieeeQuery);
                    await page.waitForSelector('.List-results-items');
                    articles = articles.concat(await extractDataIeee(page));
                }

                const service = new CreateArticleService();
                articles.forEach(async (item) => {
                    await service.execute(item.title, item.abstract, item.authors, item.year, item.citedBy, item.referenceUrl, protocol, item.base);
                })

                res.send(articles);
            })
            .catch(error => {
                console.log(error);
                res.send(error);
            })
    }
}

async function extractDataIeee(page) {
    try {
        return await page.evaluate(() => {
            let articles = [];
            const articlesElem = document.querySelectorAll("xpl-results-item");
            const articlesElemLen = articlesElem.length;

            for (let i = 0; i < articlesElemLen; i++) {
                try {

                    let title = articlesElem[i].querySelector('h2').innerText;
                    let referenceUrl = articlesElem[i].querySelector('a').href;
                    let year = +articlesElem[i].querySelector('.publisher-info-container span:first-child').innerText.split(': ')[1];
                    let abstract = articlesElem[i].querySelector('.js-displayer-content > span').innerText;
                    let authors = articlesElem[i].querySelector('.author').innerText;
                    let citedBy = articlesElem[i].querySelector('[href*="#citations"]').innerText;
                    citedBy = +citedBy.slice(citedBy.indexOf('(') + 1, citedBy.indexOf(')'));
                    let base = "ieee";

                    articles.push({title, referenceUrl, year, abstract, authors, citedBy, base});
                } catch (e) {
                    console.log(e)
                }
            }

            return articles;
        });
    } catch (e) {
        console.error("Unable to extract articles data", e);
    }
};

async function extractDataAcm(page) {
    try {
        return await page.evaluate(() => {
            let articles = [];
            const articlesElem = document.querySelectorAll(".search__item");
            const articlesElemLen = articlesElem.length;

            for (let i = 0; i < articlesElemLen; i++) {
                try {
                    let title = articlesElem[i].querySelector('.hlFld-Title a').innerText;
                    let referenceUrl = articlesElem[i].querySelector('.hlFld-Title a').href;
                    let year = +articlesElem[i].querySelector('.bookPubDate').innerText.split(' ')[1];
                    let abstract = articlesElem[i].querySelector('.issue-item__abstract > p').innerText;
                    let authors = articlesElem[i].querySelector('ul.loa').innerText;
                    let citedBy = +articlesElem[i].querySelector('.citation span').innerText;
                    let base = "acm";

                    articles.push({title, referenceUrl, year, abstract, authors, citedBy, base});
                } catch (e) {
                    console.log(e)
                }
            }

            return articles;
        });
    } catch (e) {
        console.error("Unable to extract articles data", e);
    }
};

module.exports = ListArticlesController;