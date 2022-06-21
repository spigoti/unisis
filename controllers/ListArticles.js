const puppeteer = require("puppeteer");

class ListArticlesController {
    async handle(req, res) {
        console.log(req)
        // puppeteer.launch()
        //     .then(async function (browser) {
        //         const page = await browser.newPage();
        //         await page.goto(req.body.query);
        //         await page.waitForSelector('.List-results-items');
        //         const articles = await extractData(page);
        //         res.send(articles)
        //     })
        //     .catch(error => {
        //         console.log(error);
        //         res.send(error);
        //     })
    }
}

async function extractData(page) {
    try {
        return await page.evaluate(() => {
            let articles = [];
            const articlesElem = document.querySelectorAll("xpl-results-item");
            const articlesElemLen = articlesElem.length;

            for (let i = 0; i < articlesElemLen; i++) {
                try {
                    const title = articlesElem[i].querySelector('h2').innerText;
                    const url = articlesElem[i].querySelector('a').href;
                    const year = articlesElem[i].querySelector('.publisher-info-container span:first-child').innerText.split(': ')[1];
                    const abstract = articlesElem[i].querySelector('.js-displayer-content > span').innerText;
                    const authors = articlesElem[i].querySelector('.author').innerText;
                    // const photo = personElem.querySelector("img").src;
                    // const name = personElem.querySelector("h3").innerText;
                    // const email = personElem.querySelector(".email").innerText;
                    // const phone = personElem.querySelector(".phone").innerText;

                    articles.push({
                        title,
                        url,
                        year,
                        abstract,
                        authors
                    });
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

function extractDataIeee() {

}

function extractDataAcm() {

    // class="issue-item__content" { >>>
    // let referenceURL = "issue-item__title a.href";
    //let citacoes = document.querySelector(".citation span");
    // let totalResults = document.querySelector(".hitsLength");
    //let title = document.querySelector(".issue-item__title");
    //let abstract = document.querySelector(".abstract-text p");
    //let authors =  document.querySelector("ul.loa || [aria-label=authors]");
    // let ano =  document.querySelector(".bookPubDate");


}

module.exports = {
    ListArticlesController
};