const { makeRequest } = require('../utils/request');

const GSMARENA_MAKERS_URL = 'https://www.gsmarena.com/makers.php3';

async function fetchGSMArenaBrands(cheerio) {
    try {
        const { data } = await makeRequest(GSMARENA_MAKERS_URL, false);
        const $ = cheerio.load(data);
        const brands = [];
        $('div.brandmenu-v2 ul li a').each((i, el) => {
            const brand = $(el).text().trim();
            const href = $(el).attr('href');
            if (brand && href) {
                brands.push({ name: brand.toLowerCase(), url: `https://www.gsmarena.com/${href}` });
            }
        });
        console.log(`GSMArena: Fetched ${brands.length} brands`);
        return brands.slice(0, 15);
    } catch (error) {
        console.error('GSMArena brand fetch failed:', error.message);
        return [];
    }
}

async function scrapeGSMArenaModels(brandUrl, cheerio) {
    try {
        const { data } = await makeRequest(brandUrl, false);
        const $ = cheerio.load(data);
        const models = [];
        let page = 1;
        while (page <= 2) {
            const pageUrl = page > 1 ? `${brandUrl}?page=${page}` : brandUrl;
            const { data: pageData } = await makeRequest(pageUrl, false);
            const $page = cheerio.load(pageData);
            const newModels = [];
            $page('div.makers ul li span a').each((i, el) => {
                const name = $page(el).text().trim();
                const href = $page(el).attr('href');
                const image = $page(el).parent().find('img').attr('src') || 'https://via.placeholder.com/120';
                if (name && href) {
                    newModels.push({ name, url: `https://www.gsmarena.com/${href}`, imageUrl: image });
                }
            });
            if (!newModels.length) break;
            models.push(...newModels);
            page++;
        }
        console.log(`GSMArena: Scraped ${models.length} models for brand`);
        return models.slice(0, 20);
    } catch (error) {
        console.error(`GSMArena model scrape failed for ${brandUrl}:`, error.message);
        return [];
    }
}

async function extractGSMArenaSpecs(phoneUrl, cheerio) {
    try {
        const { data } = await makeRequest(phoneUrl, false);
        const $ = cheerio.load(data);
        const specs = {
            name: $('h1 span').first().text().trim() || 'Unknown',
            price: 6,
            battery: 3,
            camera: 3,
            screen: 2,
            performance: 4,
            storage: '128GB',
            os: 'Android',
            ai: 3,
            durability: 4,
            eco: 3,
            softwareSupport: 4,
            wireless: false,
            expandable: false,
            headphone: false,
            pros: $('#user-reviews p').slice(0, 2).map((i, el) => $(el).text().trim().slice(0, 100)).get(),
            cons: $('#user-reviews p').slice(2, 4).map((i, el) => $(el).text().trim().slice(0, 100)).get(),
            link: phoneUrl,
            imageUrl: $('div#body p a img').first().attr('src') || 'https://via.placeholder.com/120'
        };

        $('div#specs-table td').each((i, el) => {
            const key = $(el).text().trim();
            const value = $(el).next('td').text().trim();
            if (!value) return;

            switch (key) {
                case 'Battery':
                    specs.battery = Math.min(10, Math.max(1, Math.round(parseInt(value) / 1000)));
                    break;
                case 'Main Camera':
                    specs.camera = Math.min(10, Math.max(1, Math.round(parseInt(value.split(' ')[0]) / 25)));
                    break;
                case 'Display':
                    specs.screen = value.includes('6.8"') && value.includes('AMOLED') ? 8 : value.includes('6.5"') ? 6 : 4;
                    break;
                case 'Chipset':
                    specs.performance = value.includes('Snapdragon 8') || value.includes('A18') ? 10 : value.includes('Dimensity') ? 6 : 4;
                    break;
                case 'Internal':
                    specs.storage = value.includes('1TB') ? '512GB-1TB' : value.includes('512GB') ? '256GB-512GB' : '128GB-256GB';
                    break;
                case 'OS':
                    specs.os = value.includes('iOS') ? 'iOS' : 'Android';
                    break;
                case 'Misc':
                    if (value.includes('IP68')) specs.durability = 8;
                    if (value.includes('Wireless')) specs.wireless = true;
                    if (value.includes('microSD')) specs.expandable = true;
                    if (value.includes('3.5mm')) specs.headphone = true;
                    break;
            }
        });

        specs.ai = specs.performance >= 8 ? 8 : 4;
        specs.softwareSupport = specs.os === 'iOS' ? 10 : specs.performance >= 8 ? 8 : 6;
        specs.eco = specs.performance >= 8 ? 8 : 5;

        console.log(`GSMArena: Extracted specs for ${specs.name}`);
        return specs;
    } catch (error) {
        console.error(`GSMArena spec extraction failed for ${phoneUrl}:`, error.message);
        return null;
    }
}

module.exports = { fetchGSMArenaBrands, scrapeGSMArenaModels, extractGSMArenaSpecs };