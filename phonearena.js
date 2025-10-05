const { makeRequest } = require('../utils/request');

const PHONES_URL = 'https://www.phonearena.com/phones';
const BRAND_FILTER_URL = 'https://www.phonearena.com/phones?manufacturer=';

async function fetchPhoneArenaBrands(cheerio) {
    try {
        const { data } = await makeRequest(PHONES_URL, true);
        const $ = cheerio.load(data);
        const brands = [];
        $('#brand-filter option').each((i, el) => {
            const brand = $(el).text().trim();
            if (brand && brand !== 'All') {
                brands.push({ name: brand.toLowerCase(), url: `${BRAND_FILTER_URL}${encodeURIComponent(brand.toLowerCase())}` });
            }
        });
        console.log(`PhoneArena: Fetched ${brands.length} brands`);
        return brands.slice(0, 15);
    } catch (error) {
        console.error('PhoneArena brand fetch failed:', error.message);
        return [];
    }
}

async function scrapePhoneArenaModels(brandUrl, cheerio) {
    try {
        const { data } = await makeRequest(brandUrl, true);
        const $ = cheerio.load(data);
        const models = [];
        $('.phone-tile').each((i, el) => {
            const name = $(el).find('.phone-name').text().trim();
            const href = $(el).find('a').attr('href');
            const image = $(el).find('img').attr('src') || 'https://via.placeholder.com/120';
            if (name && href) {
                models.push({ name, url: `https://www.phonearena.com${href}`, imageUrl: image });
            }
        });
        console.log(`PhoneArena: Scraped ${models.length} models for brand`);
        return models.slice(0, 20);
    } catch (error) {
        console.error(`PhoneArena model scrape failed for ${brandUrl}:`, error.message);
        return [];
    }
}

async function extractPhoneArenaSpecs(phoneUrl, cheerio) {
    try {
        const { data } = await makeRequest(phoneUrl, true);
        const $ = cheerio.load(data);
        const specs = {
            name: $('.phone-title').text().trim() || 'Unknown',
            price: parseInt($('.price').text().replace('$', '')) || 500,
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
            pros: $('.pros-list li').map((i, el) => $(el).text().trim().slice(0, 100)).get(),
            cons: $('.cons-list li').map((i, el) => $(el).text().trim().slice(0, 100)).get(),
            link: phoneUrl,
            imageUrl: $('.phone-image img').attr('src') || 'https://via.placeholder.com/120'
        };

        $('.specs-table td').each((i, el) => {
            const key = $(el).text().trim().toLowerCase();
            const value = $(el).next('td').text().trim();
            if (!value) return;

            switch (key) {
                case 'battery':
                    specs.battery = Math.min(10, Math.max(1, Math.round(parseInt(value) / 1000)));
                    break;
                case 'main camera':
                    specs.camera = Math.min(10, Math.max(1, Math.round(parseInt(value.split(' ')[0]) / 25)));
                    break;
                case 'display':
                    specs.screen = value.includes('6.8"') && value.includes('AMOLED') ? 8 : value.includes('6.5"') ? 6 : 4;
                    break;
                case 'chipset':
                    specs.performance = value.includes('Snapdragon 8') || value.includes('A18') ? 10 : value.includes('Dimensity') ? 6 : 4;
                    break;
                case 'storage':
                    specs.storage = value.includes('1TB') ? '512GB-1TB' : value.includes('512GB') ? '256GB-512GB' : '128GB-256GB';
                    break;
                case 'os':
                    specs.os = value.includes('iOS') ? 'iOS' : 'Android';
                    break;
                case 'design':
                    if (value.includes('IP68')) specs.durability = 8;
                    if (value.includes('Wireless')) specs.wireless = true;
                    if (value.includes('microSD')) specs.expandable = true;
                    if (value.includes('3.5mm')) specs.headphone = true;
                    break;
            }
        });

        specs.price = Math.min(10, Math.max(1, 10 - Math.round(specs.price / 200)));
        specs.ai = specs.performance >= 8 ? 8 : 4;
        specs.softwareSupport = specs.os === 'iOS' ? 10 : specs.performance >= 8 ? 8 : 6;
        specs.eco = specs.performance >= 8 ? 8 : 5;

        console.log(`PhoneArena: Extracted specs for ${specs.name}`);
        return specs;
    } catch (error) {
        console.error(`PhoneArena spec extraction failed for ${phoneUrl}:`, error.message);
        return null;
    }
}

module.exports = { fetchPhoneArenaBrands, scrapePhoneArenaModels, extractPhoneArenaSpecs };