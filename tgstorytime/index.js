const puppeteer = require('puppeteer');

async function run() {
    const browser = await puppeteer.launch({executablePath: '/usr/bin/google-chrome'});
    const page = await browser.newPage();
    await page.goto('https://www.tgstorytime.com/browse.php?type=titles&offset=0');
    //let html = await page.content();
    //console.log(html);      
    await page.waitForSelector('.listboxtop');
    const data = await page.evaluate(() => {
        let elements = Array.from(document.querySelectorAll('.listboxtop'));
        const dataList = [];
        elements.forEach(element => {
          // Example: Get the 'title' attribute of each div with class 'listboxtop'
          const titleAttribute = element.getAttribute('.title');
          dataList.push(titleAttribute);
        });
    
        return dataList;
      });
    console.log(data[0]);
    browser.close();
}

run();