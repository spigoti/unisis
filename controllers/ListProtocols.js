// const puppeteer = require("puppeteer");
//
// class ListArticlesController {
//     async handle(req, res) {
//         puppeteer.launch()
//             .then(async function (browser) {
//                 const page = await browser.newPage();
//                 await page.goto(req.body.query);
//                 await page.waitForSelector('.List-results-items');
//                 const articles = await extractData(page);
//                 res.send(articles)
//             })
//             .catch(error => {
//                 console.log(error);
//                 res.send(error);
//             })
//     }
// }
//
// async function extractData (page) {
//     try {
//         return await page.evaluate(() => {
//             let articles = [];
//             const articlesElem = document.querySelectorAll("xpl-results-item");
//             const articlesElemLen = articlesElem.length;
//
//             for (let i = 0; i < articlesElemLen; i++) {
//                 try {
//                     const title = articlesElem[i].querySelector('h2').innerText;
//                     const url = articlesElem[i].querySelector('a').href;
//                     const year = articlesElem[i].querySelector('.publisher-info-container span:first-child').innerText.split(': ')[1];
//                     const abstract = articlesElem[i].querySelector('.js-displayer-content > span').innerText;
//                     const authors = articlesElem[i].querySelector('.author').innerText;
//                     articles.push({title, url, year, abstract, authors});
//                 } catch (e) {
//                     console.log(e)
//                 }
//             }
//
//             return articles;
//         });
//     } catch(e) {
//         console.error("Unable to extract articles data", e);
//     }
// };
//
// module.exports = ListArticlesController;