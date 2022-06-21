const puppeteer = require("puppeteer");
let totalResults;

class ListArticlesController {
    async handle(req, res) {
        puppeteer.launch()
            .then(async function (browser) {
                const page = await browser.newPage();
                let articles;
                await page.goto(req.body.query);
                if (req.body.base === 'acm') {
                    await page.waitForSelector('.search-result__xsl-body');
                    articles = await extractDataAcm(page);
                } else {
                    await page.waitForSelector('.List-results-items');
                    articles = await extractDataIeee(page);
                }
                res.send(articles)
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
                    let url = articlesElem[i].querySelector('a').href;
                    let year = +articlesElem[i].querySelector('.publisher-info-container span:first-child').innerText.split(': ')[1];
                    let abstract = articlesElem[i].querySelector('.js-displayer-content > span').innerText;
                    let authors = articlesElem[i].querySelector('.author').innerText;
                    let citations = articlesElem[i].querySelector('[href*="#citations"]').innerText;
                    citations = +citations.slice(citations.indexOf('(') + 1, citations.indexOf(')'))

                    articles.push({title, url, year, abstract, authors, citations, base:'ieee'});
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
                    let url = articlesElem[i].querySelector('.hlFld-Title a').href;
                    let year = +articlesElem[i].querySelector('.bookPubDate').innerText.split(' ')[1];
                    let abstract = articlesElem[i].querySelector('.issue-item__abstract > p').innerText;
                    let authors = articlesElem[i].querySelector('ul.loa').innerText;
                    let citations = +articlesElem[i].querySelector('.citation span').innerText;
                    // citations = +citations.slice(citations.indexOf('(') + 1, citations.indexOf(')'))

                    articles.push({title, url, year, abstract, authors, citations, base:'acm'});
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