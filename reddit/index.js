const puppeteer = require('puppeteer');

async function run() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    await page.goto('https://www.reddit.com/r/javascript/');
    
    const result = await page.evaluate(() => {
        let title = document.querySelector('h3._eYtD2XCVieq6emjKBH3m').innerText;
        let url = document.querySelector('a.SQnoC3ObvgnGjWt90zD9Z_').href;
        return {title, url};
    });
    
    console.log(result);
    
    browser.close();
}

run();
