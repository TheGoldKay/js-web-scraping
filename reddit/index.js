const puppeteer = require('puppeteer');

async function run() {
    const browser = await puppeteer.launch({executablePath: '/usr/bin/google-chrome'});
    const page = await browser.newPage();
    
    await page.goto('https://www.reddit.com/r/depression/top/?t=all');
    
    const results = await page.evaluate(() => {
        let posts = document.querySelectorAll('div._2FCtq-QzlfuN-SwVMUZMM3'); // Selects all posts
        let results = [];
        posts.forEach((post) => {
            try {
                let title = post.querySelector('h3').innerText;
                let url = post.querySelector('a').href;
                results.push({title, url});
            } catch (err) {
                console.log('Skipping a post due to missing information');
            }
        });
        return results;
    })
    
    console.log(results);
    console.log(`Number of posts: ${results.length}`);
    browser.close();
}

run();
