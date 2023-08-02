const axios = require('axios');
const cheerio = require('cheerio');

async function run() {
  let novels = [];
  let page = 0;
  try {
    const response = await axios.get(`https://www.tgstorytime.com/browse.php?type=titles&offset=${page}`);
    const html = response.data;
    // Load the HTML content into Cheerio
    const $ = cheerio.load(html);
    // Select all elements with the class 'listboxtop' and get their text content
    //const data = $('.listbox').map((index, element) => $(element).text()).get();
    const storyList = $('div.listboxtop');
    const first = storyList.eq(0);
    const titleLink = first.find('div.title').eq(1).find('a').eq(0);
    const title = titleLink.text();
    const titleUrl = titleLink.attr('href');
    const authorLink = first.find('div.title').eq(1).find('a').eq(1);
    const author = authorLink.text();
    const authorUrl = authorLink.attr('href');
    const summary = first.find('div.summarytext').html().replace(/<br>/g, '\n');
    novels.push({
      title: title,
      titleUrl: titleUrl,
      author: author,
      authorUrl: authorUrl,
      summary: summary
    });
    console.log(novels)
  } catch (error) {
    console.error('Error:', error.message);
  }
}

run();