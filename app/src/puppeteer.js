const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://dl.acm.org/action/doSearch?AllField=music');
    // await page.waitForTimeout(6000)
    await page.waitForSelector('.items-results');
    await page.screenshot({ path: 'example.png' });
    const text = await page.evaluate(() => {
        const el = document.querySelector('.items-results');
        return el.textContent;
    })
    console.log(text);
    // await extractData(page);
    await browser.close();
})();

const extractData = async (page) => {
    try {
        const articles = await page.evaluate(() => {
            console.log(document.querySelector('body'))
            // console.log('TEST')
            // let articles = [];
            // const articlesElem = document.querySelectorAll('li.search__item');
            // console.log(articlesElem)
            //
            // const articlesElemLen = articlesElem.length;

            // for (let i = 0; i < articlesElemLen; i++) {
            //     try {
            //         const title = articlesElem[i].querySelector('h2').innerText;
            //         const url = articlesElem[i].querySelector('a').href;
            //         const year = articlesElem[i].querySelector('.publisher-info-container span:first-child').innerText.split(': ')[1];
            //         const abstract = articlesElem[i].querySelector('.js-displayer-content > span').innerText;
            //         const authors = articlesElem[i].querySelector('.author').innerText;
            //         // const photo = personElem.querySelector("img").src;
            //         // const name = personElem.querySelector("h3").innerText;
            //         // const email = personElem.querySelector(".email").innerText;
            //         // const phone = personElem.querySelector(".phone").innerText;
            //
            //         articles.push({ title, url, year, abstract, authors});
            //     } catch (e) {
            //         console.log(e)
            //     }
            // }

            // return articles;
        });

console.log(4440)

        // do anything with articles

        // console.log(articles.length, "articles", articles);
    } catch(e) {
        console.error("Unable to extract articles data", e);
    }
};

