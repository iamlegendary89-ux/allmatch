const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cheerio = require('cheerio');
const { fetchPhoneArenaBrands, scrapePhoneArenaModels, extractPhoneArenaSpecs } = require('./scraper/phonearena');
const { fetchGSMArenaBrands, scrapeGSMArenaModels, extractGSMArenaSpecs } = require('./scraper/gsmarena');
const { scrapeTechReviews } = require('./scraper/techreviews');
const { scrapeRedditFeedback } = require('./scraper/reddit');
const { calculateRecommendationScore } = require('./utils/scoring');
const { closeBrowser } = require('./utils/request');

const OUTPUT_FILE = path.join(__dirname, '../phones.json');
let lastUpdate = null;

async function scrapeAllPhones(source = 'phonearena') {
    const brands = source === 'phonearena' ? await fetchPhoneArenaBrands(cheerio) : await fetchGSMArenaBrands(cheerio);
    if (!brands.length && source === 'phonearena') {
        console.warn('PhoneArena failed, falling back to GSMArena');
        return scrapeAllPhones('gsmarena');
    }
    if (!brands.length) {
        throw new Error('No brands fetched from either source');
    }

    const allPhones = [];
    for (const brand of brands) {
        try {
            const models = source === 'phonearena' ? await scrapePhoneArenaModels(brand.url, cheerio) : await scrapeGSMArenaModels(brand.url, cheerio);
            const brandPhones = await Promise.allSettled(
                models.map(async model => {
                    const specs = source === 'phonearena' ? await extractPhoneArenaSpecs(model.url, cheerio) : await extractGSMArenaSpecs(model.url, cheerio);
                    if (specs) {
                        const techReviews = await scrapeTechReviews(specs.name, cheerio);
                        const redditFeedback = await scrapeRedditFeedback(specs.name, cheerio);
                        specs.pros = techReviews.pros.length ? techReviews.pros : specs.pros;
                        specs.cons = techReviews.cons.length ? techReviews.cons : specs.cons;
                        specs.redditPros = redditFeedback.pros;
                        specs.redditCons = redditFeedback.cons;
                        specs.recommendationScore = calculateRecommendationScore(specs);
                    }
                    return specs;
                })
            );
            const validPhones = brandPhones
                .filter(result => result.status === 'fulfilled' && result.value)
                .map(result => result.value);
            allPhones.push(...validPhones);
            console.log(`Processed ${validPhones.length} phones for ${brand.name} (${source})`);
        } catch (error) {
            console.error(`Brand processing failed for ${brand.name} (${source}):`, error.message);
        }
    }
    return allPhones;
}

async function separateAndSavePhones(data) {
    try {
        let existingData = {};
        try {
            const existing = await fs.readFile(OUTPUT_FILE, 'utf8');
            existingData = JSON.parse(existing);
        } catch (error) {
            console.log('No existing phones.json, creating new');
        }

        const separatedData = {};
        data.forEach(phone => {
            const brand = phone.name.split(' ')[0].toLowerCase();
            if (!separatedData[brand]) separatedData[brand] = [];
            separatedData[brand].push(phone);
        });

        let hasChanges = false;
        Object.keys(separatedData).forEach(brand => {
            const newModels = separatedData[brand].map(p => p.name).sort();
            const existingModels = (existingData[brand] || []).map(p => p.name).sort();
            if (JSON.stringify(newModels) !== JSON.stringify(existingModels)) hasChanges = true;
        });

        if (!hasChanges) {
            console.log('No changes detected, skipping write');
            return;
        }

        separatedData.lastUpdated = new Date().toISOString();
        await fs.writeFile(OUTPUT_FILE, JSON.stringify(separatedData, null, 2));
        console.log(`Saved ${Object.values(separatedData).reduce((a, b) => a + (b || []).length, 0)} phones to phones.json`);
    } catch (error) {
        console.error('Save failed:', error.message);
    }
}

async function main() {
    const today = new Date().toDateString();
    if (lastUpdate === today) {
        console.log('Already updated today, skipping');
        return;
    }
    lastUpdate = today;

    console.log('Starting daily scrape...');
    try {
        const phones = await scrapeAllPhones('phonearena');
        if (!phones.length) throw new Error('No phones scraped');
        await separateAndSavePhones(phones);
        await closeBrowser();
    } catch (error) {
        console.error('Main scrape failed:', error.message);
        await closeBrowser();
    }
}

const app = express();
app.get('/triggerUpdate', async (req, res) => {
    const today = new Date().toDateString();
    if (lastUpdate === today) {
        res.json({ status: 'skipped', message: 'Already updated today' });
        return;
    }
    await main();
    res.json({ status: 'success', message: 'Update triggered' });
});

app.listen(3000, () => {
    console.log('Update server running on http://localhost:3000');
});

if (require.main === module) {
    main();
}

module.exports = { main };