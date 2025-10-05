const { makeRequest } = require('../utils/request');

async function scrapeTechReviews(phoneName, cheerio) {
    const searchQuery = encodeURIComponent(phoneName);
    const urls = [
        `https://www.techradar.com/reviews/phones?search=${searchQuery}`,
        `https://www.cnet.com/reviews/${searchQuery.replace(/\s+/g, '-')}`
    ];
    let pros = [], cons = [];

    for (const url of urls) {
        try {
            const { data } = await makeRequest(url, true);
            const $ = cheerio.load(data);
            if (url.includes('techradar')) {
                pros = $('.review-pros li').map((i, el) => $(el).text().trim().slice(0, 100)).get().slice(0, 2);
                cons = $('.review-cons li').map((i, el) => $(el).text().trim().slice(0, 100)).get().slice(0, 2);
            } else if (url.includes('cnet')) {
                pros = $('section.pros-cons .pros li').map((i, el) => $(el).text().trim().slice(0, 100)).get().slice(0, 2);
                cons = $('section.pros-cons .cons li').map((i, el) => $(el).text().trim().slice(0, 100)).get().slice(0, 2);
            }
            if (pros.length || cons.length) break;
        } catch (error) {
            console.error(`Tech review scrape failed for ${phoneName}:`, error.message);
        }
    }
    return { pros, cons };
}

module.exports = { scrapeTechReviews };