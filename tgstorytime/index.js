const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

async function run() {
  let novels = {};
  let page = 0;
  try {
    const response = await axios.get(`https://www.tgstorytime.com/browse.php?type=titles&offset=${page}`);
    const html = response.data;
    // Load the HTML content into Cheerio
    const $ = cheerio.load(html);
    // Select all elements with the class 'listboxtop' and get their text content
    //const data = $('.listbox').map((index, element) => $(element).text()).get();
    const storyList = $('div.listboxtop');
    storyList.each((index, element) => {
      const story = $(element);
      const titleLink = story.find('div.title').eq(1).find('a').eq(0);
      const title = titleLink.text();
      const titleUrl = titleLink.attr('href');
      const authorLink = story.find('div.title').eq(1).find('a').eq(1);
      const author = authorLink.text();
      const authorUrl = authorLink.attr('href');
      const summary = story.find('div.summarytext').html().replace(/<br>/g, '\n');
      novels[title] =  {
        titleUrl: titleUrl,
        author: author,
        authorUrl: authorUrl,
        summary: summary
      };
    });
    fs.writeFile('tgdata.json', JSON.stringify(novels), (err) => {
      if(err){
        console.error('Error: ', err);
      }else{
        console.log('Data scrapped successfully');
      }
    });
  } catch (error) {
    console.error('Error:', error.message);
  }
}

run();