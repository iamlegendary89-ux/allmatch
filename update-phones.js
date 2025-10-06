const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const OUTPUT_FILE = path.join(__dirname, 'phones.json');
const PHONES_URL = 'https://www.phonearena.com/phones';
const BRAND_FILTER_URL = 'https://www.phonearena.com/phones?manufacturer=';
const GSMARENA_MAKERS_URL = 'https://www.gsmarena.com/makers.php3';
const TOP_REVIEW_SITES = [
    'https://www.techradar.com/reviews/phones?search=',
    'https://www.cnet.com/reviews/',
    'https://www.pcmag.com/picks/the-best-phones?search=',
    'https://www.trustedreviews.com/type/mobile-phones?search=',
    'https://www.gsmarena.com/results.php3?sFreeText=',
    'https://www.gadgets360.com/mobiles/reviews?search=',
    'https://www.gizbot.com/mobile/reviews?search=',
    'https://www.knowyourmobile.com/reviews?search=',
    'https://www.nextpit.com/search?query=',
    'https://www.smartprix.com/phones?search=',
    'https://www.stuff.tv/reviews?search=',
    'https://www.dxomark.com/smartphones?search=',
    'https://www.gizchina.com/?s=',
    'https://www.androidguys.com/reviews?search=',
    'https://www.techjuice.pk/?s=',
    'https://www.androidauthority.com/?s=',
    'https://www.zdnet.com/topic/smartphones/?search=',
    'https://www.expertreviews.co.uk/mobile-phones?search=',
    'https://www.thenextweb.com/?s=',
    'https://www.gizmodo.com/search?q=',
    'https://www.engadget.com/search/?q='
];
const REDDIT_URL = 'https://www.reddit.com/r/Android/search?q=';
const DELAY_MS = 1000;
const MAX_RETRIES = 3;
const USER_AGENTS = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
];

let lastUpdate = null;
let lastReviewUpdate = null;

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function makeRequest(url, retries = MAX_RETRIES) {
    const ua = USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
    try {
        const response = await axios.get(url, {
            timeout: 10000,
            headers: { 'User-Agent': ua }
        });
        await delay(DELAY_MS);
        return response;
    } catch (error) {
        if (retries > 0) {
            console.warn(`Request failed for ${url}, retrying...`);
            await delay(2000 * (MAX_RETRIES - retries + 1));
            return makeRequest(url, retries - 1);
        }
        console.error(`Failed to fetch ${url}:`, error.message);
        return null;
    }
}

async function fetchBrands(source = 'phonearena') {
    const url = source === 'phonearena' ? PHONES_URL : GSMARENA_MAKERS_URL;
    const response = await makeRequest(url);
    if (!response) return [];
    const $ = cheerio.load(response.data);
    const brands = [];
    const selector = source === 'phonearena' ? '#brand-filter option' : 'div.brandmenu-v2 ul li a';
    $(selector).each((i, el) => {
        const brand = $(el).text().trim();
        if (brand && brand !== 'All') {
            const brandUrl = source === 'phonearena' ? `${BRAND_FILTER_URL}${encodeURIComponent(brand.toLowerCase())}` : `https://www.gsmarena.com/${$(el).attr('href')}`;
            brands.push({ name: brand.toLowerCase(), url: brandUrl });
        }
    });
    console.log(`${source}: Fetched ${brands.length} brands`);
    return brands.slice(0, 10);
}

async function scrapeModels(brandUrl, source = 'phonearena') {
    const response = await makeRequest(brandUrl);
    if (!response) return [];
    const $ = cheerio.load(response.data);
    const models = [];
    const selector = source === 'phonearena' ? '.phone-tile' : 'div.makers ul li span a';
    $(selector).each((i, el) => {
        const name = source === 'phonearena' ? $(el).find('.phone-name').text().trim() : $(el).text().trim();
        const href = $(el).attr('href');
        const image = source === 'phonearena' ? $(el).find('img').attr('src') : $(el).parent().find('img').attr('src') || 'https://via.placeholder.com/120';
        if (name && href) {
            const modelUrl = source === 'phonearena' ? `https://www.phonearena.com${href}` : `https://www.gsmarena.com/${href}`;
            models.push({ name, url: modelUrl, imageUrl: image || 'https://via.placeholder.com/120' });
        }
    });
    console.log(`${source}: Scraped ${models.length} models for brand`);
    return models.slice(0, 20);
}

async function extractSpecs(phoneUrl, source = 'phonearena') {
    const response = await makeRequest(phoneUrl);
    if (!response) return null;
    const $ = cheerio.load(response.data);
    const specs = {
        name: source === 'phonearena' ? $('.phone-title').text().trim() : $('h1 span').first().text().trim() || 'Unknown',
        price: source === 'phonearena' ? parseInt($('.price').text().replace('$', '')) || 500 : 500,
        battery: 50,
        camera: 50,
        screen: 50,
        performance: 50,
        storage: '128GB',
        os: 'Android',
        ai: 50,
        durability: 50,
        eco: 50,
        softwareSupport: 50,
        wireless: false,
        expandable: false,
        headphone: false,
        pros: [],
        cons: [],
        link: phoneUrl,
        imageUrl: source === 'phonearena' ? $('.phone-image img').attr('src') : $('div#body p a img').first().attr('src') || 'https://via.placeholder.com/120'
    };

    const selector = source === 'phonearena' ? '.specs-table td' : 'div#specs-table td';
    $(selector).each((i, el) => {
        const key = $(el).text().trim().toLowerCase();
        const value = $(el).next('td').text().trim();
        if (!value) return;

        switch (key) {
            case 'battery':
                specs.battery = Math.min(100, Math.max(10, Math.round(parseInt(value) / 50)));
                break;
            case 'main camera':
                specs.camera = Math.min(100, Math.max(10, Math.round(parseInt(value.split(' ')[0]) / 0.5)));
                break;
            case 'display':
                specs.screen = value.includes('6.8"') && value.includes('AMOLED') ? 90 : value.includes('6.5"') ? 80 : 70;
                break;
            case 'chipset':
                specs.performance = value.includes('Snapdragon 8') || value.includes('A18') ? 95 : 80;
                break;
            case 'storage':
                specs.storage = value.includes('1TB') ? '512GB-1TB' : value.includes('512GB') ? '256GB-512GB' : '128GB-256GB';
                break;
            case 'os':
                specs.os = value.includes('iOS') ? 'iOS' : 'Android';
                break;
            case 'design':
                if (value.includes('IP68')) specs.durability = 90;
                if (value.includes('Wireless')) specs.wireless = true;
                if (value.includes('microSD')) specs.expandable = true;
                if (value.includes('3.5mm')) specs.headphone = true;
                break;
        }
    });

    specs.ai = specs.performance >= 90 ? 90 : 70;
    specs.softwareSupport = specs.os === 'iOS' ? 95 : specs.performance >= 90 ? 90 : 80;
    specs.eco = specs.performance >= 90 ? 85 : 75;

    console.log(`${source}: Extracted specs for ${specs.name}`);
    return specs;
}

async function scrapeReviews(phoneName) {
    const searchQuery = encodeURIComponent(phoneName);
    let pros = [], cons = [];

    for (const siteBase of TOP_REVIEW_SITES) {
        const url = siteBase + searchQuery;
        const response = await makeRequest(url);
        if (!response) continue;
        const $ = cheerio.load(response.data);
        pros = $('.review-pros li, section.pros-cons .pros li').map((i, el) => $(el).text().trim().slice(0, 100)).get().slice(0, 2);
        cons = $('.review-cons li, section.pros-cons .cons li').map((i, el) => $(el).text().trim().slice(0, 100)).get().slice(0, 2);
        if (pros.length || cons.length) break;
    }
    return { pros, cons };
}

async function scrapeRedditFeedback(phoneName) {
    const searchQuery = encodeURIComponent(phoneName);
    const url = REDDIT_URL + searchQuery + '&restrict_sr=on';
    const response = await makeRequest(url);
    if (!response) return { pros: [], cons: [] };
    const $ = cheerio.load(response.data);
    const comments = $('div.comment').slice(0, 5).map((i, el) => $(el).text().trim().slice(0, 100)).get();
    let pros = [], cons = [];
    comments.forEach(comment => {
        if (comment.match(/love|great|amazing|excellent/i)) pros.push(comment);
        else if (comment.match(/bad|poor|issue|disappointing/i)) cons.push(comment);
    });
    return { pros: pros.slice(0, 2), cons: cons.slice(0, 2) };
}

function calculateRecommendationScore(specs) {
    const specWeights = {
        battery: 0.2,
        camera: 0.2,
        performance: 0.2,
        screen: 0.15,
        durability: 0.1,
        ai: 0.05,
        softwareSupport: 0.05,
        eco: 0.05,
        price: 0.05
    };
    let specScore = 0;
    for (const [key, weight] of Object.entries(specWeights)) {
        specScore += (specs[key] || 0) * weight;
    }

    let sentiment = 0;
    const positiveKeywords = ['great', 'excellent', 'stunning', 'fast', 'smooth', 'reliable'];
    const negativeKeywords = ['poor', 'disappointing', 'slow', 'weak', 'issue'];
    specs.pros.forEach(pro => {
        if (positiveKeywords.some(k => pro.toLowerCase().includes(k))) sentiment += 0.5;
    });
    specs.cons.forEach(con => {
        if (negativeKeywords.some(k => con.toLowerCase().includes(k))) sentiment -= 0.5;
    });

    return Math.min(100, Math.max(10, (specScore + sentiment) * 10)).toFixed(1);
}

async function scrapeAllPhones(source = 'phonearena') {
    const brands = await fetchBrands(source);
    if (!brands.length && source === 'phonearena') {
        console.warn('PhoneArena failed, falling back to GSMArena');
        return scrapeAllPhones('gsmarena');
    }
    if (!brands.length) {
        throw new Error('No brands fetched');
    }

    const allPhones = [];
    for (const brand of brands) {
        try {
            const models = await scrapeModels(brand.url, source);
            const brandPhones = await Promise.allSettled(
                models.map(async model => {
                    const specs = await extractSpecs(model.url, source);
                    if (specs) {
                        const reviews = await scrapeReviews(specs.name);
                        specs.pros = reviews.pros;
                        specs.cons = reviews.cons;
                        const reddit = await scrapeRedditFeedback(specs.name);
                        specs.redditPros = reddit.pros;
                        specs.redditCons = reddit.cons;
                        specs.recommendationScore = calculateRecommendationScore(specs);
                    }
                    return specs;
                })
            );
            allPhones.push(...brandPhones.filter(result => result.status === 'fulfilled' && result.value).map(result => result.value));
        } catch (error) {
            console.error(`Brand processing failed for ${brand.name}:`, error.message);
        }
    }
    return allPhones;
}

async function separateAndSavePhones(data, mode = 'daily') {
    try {
        let existingData = {};
        try {
            const existing = await fs.readFile(OUTPUT_FILE, 'utf8');
            existingData = JSON.parse(existing);
        } catch (error) {
            console.log('No existing file, creating new');
        }

        const separated = {};
        data.forEach(phone => {
            const brand = phone.name.split(' ')[0].toLowerCase();
            if (!separated[brand]) separated[brand] = [];
            separated[brand].push(phone);
        });

        if (mode === 'daily') {
            Object.keys(separated).forEach(brand => {
                if (!existingData[brand]) existingData[brand] = [];
                separated[brand].forEach(newP => {
                    if (!existingData[brand].some(exP => exP.name === newP.name)) {
                        existingData[brand].push(newP);
                    }
                });
            });
        } else if (mode === 'weekly') {
            Object.keys(existingData).forEach(brand => {
                existingData[brand] = existingData[brand].map(p => {
                    const newP = separated[brand]?.find(np => np.name === p.name);
                    if (newP) {
                        p.pros = newP.pros;
                        p.cons = newP.cons;
                        p.redditPros = newP.redditPros;
                        p.redditCons = newP.redditCons;
                        p.recommendationScore = newP.recommendationScore;
                    }
                    return p;
                });
            });
        }

        existingData.lastUpdated = new Date().toISOString();
        await fs.writeFile(OUTPUT_FILE, JSON.stringify(existingData, null, 2));
        console.log(`Saved/updated phones.json in ${mode} mode`);
    } catch (error) {
        console.error('Save failed:', error.message);
    }
}

async function main(mode = 'daily') {
    const today = new Date().toDateString();
    if (lastUpdate === today && mode === 'daily') {
        console.log('Daily update already done, skipping');
        return;
    }
    if (mode === 'weekly' && lastReviewUpdate === today) {
        console.log('Weekly review update already done, skipping');
        return;
    }
    if (mode === 'daily') lastUpdate = today;
    else lastReviewUpdate = today;

    console.log(`Starting ${mode} scrape...`);
    try {
        const phones = await scrapeAllPhones();
        if (!phones.length) throw new Error('No phones scraped');
        await separateAndSavePhones(phones, mode);
    } catch (error) {
        console.error('Main failed:', error.message);
    }
}

const app = express();
app.get('/triggerUpdate', async (req, res) => {
    const today = new Date().toDateString();
    if (lastUpdate === today) {
        res.json({ status: 'skipped' });
        return;
    }
    await main('daily');
    res.json({ status: 'success' });
});

app.listen(3000, () => console.log('Server on port 3000'));