const puppeteer = require('puppeteer');

async function run() {
    const browser = await puppeteer.launch({executablePath: '/usr/bin/google-chrome'});
    const page = await browser.newPage();
    
    await page.goto('https://www.reddit.com/r/javascript/');
    
    const result = await page.evaluate(() => {
        let title = document.querySelector('h3._eYtD2XCVieq6emjKBH3m').innerText; // innetText / textContent
        let url = document.querySelector('a._2INHSNB8V5eaWp4P0rY_mE').href;
        return {title, url};
    })
    .catch(() => {
        console.log('again...');
        run();
    });
    
    console.log(result);
    
    browser.close();
}

run();
