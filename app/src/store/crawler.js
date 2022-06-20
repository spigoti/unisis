// import puppeteer from 'puppeteer';
//
// const actions = {
//     async getIe({commit}, url){
//         const browser = await puppeteer.launch();
//         const page = await browser.newPage();
//         let result;
//
//         try {
//             await page.goto('https://ieeexplore.ieee.org/search/searchresult.jsp?newsearch=true&queryText=security');
//             // await page.waitForTimeout(6000)
//             await page.waitForSelector('.List-results-items');
//             result =  await extractData(page);
//
//         } catch (e) {
//             console.log(e);
//         }
//
//         await browser.close();
//         return result;
//     }
// }
//
// export default {
//     namespaced: true,
//     actions
// }
//
//
// (async () => {
//
// })();
//
//
// const extractData = async (page) => {
//     try {
//         const articles = await page.evaluate(() => {
//             let articles = [];
//             const articlesElem = document.querySelectorAll("xpl-results-item");
//             const articlesElemLen = articlesElem.length;
//
//             for (let i = 0; i < articlesElemLen; i++) {
//                 try {
//                     console.log(i)
//                     const title = articlesElem[i].querySelector('h2').innerText;
//                     const url = articlesElem[i].querySelector('a').href;
//                     const year = articlesElem[i].querySelector('.publisher-info-container span:first-child').innerText.split(': ')[1];
//                     const abstract = articlesElem[i].querySelector('.js-displayer-content > span').innerText;
//                     const authors = articlesElem[i].querySelector('.author').innerText;
//                     // const photo = personElem.querySelector("img").src;
//                     // const name = personElem.querySelector("h3").innerText;
//                     // const email = personElem.querySelector(".email").innerText;
//                     // const phone = personElem.querySelector(".phone").innerText;
//
//                     articles.push({ title, url, year, abstract, authors});
//                 } catch (e) {
//                     console.log(e)
//                 }
//             }
//
//             return articles;
//         });
//
//
//
//         // do anything with articles
//
//         console.log(articles.length, "articles", articles);
//     } catch(e) {
//         console.error("Unable to extract articles data", e);
//     }
// };
//
