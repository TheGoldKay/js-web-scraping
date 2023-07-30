const axios = require('axios');
const cheerio = require('cheerio');

async function run() {
  try {
    const response = await axios.get('https://www.tgstorytime.com/browse.php?type=titles&offset=0');
    const html = response.data;

    // Load the HTML content into Cheerio
    const $ = cheerio.load(html);

    // Select all elements with the class 'listboxtop' and get their text content
    //const data = $('.listbox').map((index, element) => $(element).text()).get();
    const novels = $('.listbox');
    console.log($($(novels.eq(127)).find('.title')).eq(1).text());
  } catch (error) {
    console.error('Error:', error.message);
  }
}

run();