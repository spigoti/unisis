const puppeteer = require("puppeteer");
const CreateArticleService = require("../../services/articles/CreateArticleService");
let totalResults;

class ListArticlesController {
    async handle(req, res) {
        const {protocol, base} = req.body;

        puppeteer.launch()
            .then(async function (browser) {
                const pageAcm = await browser.newPage();
                const pageIeee = await browser.newPage();

                let articles = [];
                if (req.body.acmQuery) {
                    await pageAcm.goto(req.body.acmQuery);
                    await pageAcm.waitForSelector('.search-result__xsl-body');
                    articles = articles.concat(await extractDataAcm(page));
                    console.log(articles)
                }
                if (req.body.ieeeQuery){
                    await pageIeee.goto(req.body.ieeeQuery);
                    await pageIeee.waitForSelector('.List-results-items');
                    articles = articles.concat(await extractDataIeee(page));
                    console.log(articles)
                }

                const service = new CreateArticleService();
                articles.forEach(async (item) => {
                    await service.execute(item.title, item.abstract, item.authors, item.year, item.citedBy, base, item.referenceUrl, protocol);
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
            totalResults = document.querySelector('.Dashboard-header span:first-child span:last-child').innerText;
            const articlesElemLen = articlesElem.length;

            totalResults = +totalResults.replace(',', '');

            for (let i = 0; i < articlesElemLen; i++) {
                try {
                    let title = articlesElem[i].querySelector('h2').innerText;
                    let referenceUrl = articlesElem[i].querySelector('a').href;
                    let year = +articlesElem[i].querySelector('.publisher-info-container span:first-child').innerText.split(': ')[1];
                    let abstract = articlesElem[i].querySelector('.js-displayer-content > span').innerText;
                    let authors = articlesElem[i].querySelector('.author').innerText;
                    let citedBy = articlesElem[i].querySelector('[href*="#citations"]').innerText;
                    citations = +citations.slice(citations.indexOf('(') + 1, citations.indexOf(')'))

                    articles.push({title, referenceUrl, year, abstract, authors, citedBy, base:'ieee'});
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
            // totalResults = document.querySelector('.Dashboard-header span:first-child span:last-child').innerText;
            const articlesElemLen = articlesElem.length;

            for (let i = 0; i < articlesElemLen; i++) {
                try {
                    let title = articlesElem[i].querySelector('.hlFld-Title a').innerText;
                    let referenceUrl = articlesElem[i].querySelector('.hlFld-Title a').href;
                    let year = +articlesElem[i].querySelector('.bookPubDate').innerText.split(' ')[1];
                    let abstract = articlesElem[i].querySelector('.issue-item__abstract > p').innerText;
                    let authors = articlesElem[i].querySelector('ul.loa').innerText;
                    let citedBy = +articlesElem[i].querySelector('.citation span').innerText;
                    // citations = +citations.slice(citations.indexOf('(') + 1, citations.indexOf(')'))

                    articles.push({title, referenceUrl, year, abstract, authors, citedBy, base:'acm'});
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