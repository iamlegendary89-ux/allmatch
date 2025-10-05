const { makeRequest } = require('../utils/request');

async function scrapeRedditFeedback(phoneName, cheerio) {
    const searchQuery = encodeURIComponent(phoneName);
    const urls = [
        `https://www.reddit.com/r/Android/search?q=${searchQuery}&restrict_sr=on`,
        `https://www.reddit.com/r/Apple/search?q=${searchQuery}&restrict_sr=on`
    ];
    let pros = [], cons = [];

    for (const url of urls) {
        try {
            const { data } = await makeRequest(url, true);
            const $ = cheerio.load(data);
            const comments = $('div.comment').slice(0, 5).map((i, el) => $(el).text().trim().slice(0, 100)).get();
            comments.forEach(comment => {
                if (comment.match(/love|great|amazing|excellent/i)) {
                    pros.push(comment);
                } else if (comment.match(/bad|poor|issue|disappointing/i)) {
                    cons.push(comment);
                }
            });
            if (pros.length || cons.length) break;
        } catch (error) {
            console.error(`Reddit feedback scrape failed for ${phoneName}:`, error.message);
        }
    }
    return { pros: pros.slice(0, 2), cons: cons.slice(0, 2) };
}

module.exports = { scrapeRedditFeedback };