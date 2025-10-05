const axios = require('axios');
const puppeteer = require('puppeteer');

const DELAY_MS = 1000;
const MAX_RETRIES = 3;
const USER_AGENTS = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
];

let browser;

async function initBrowser() {
    if (!browser) {
        browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    }
    return browser;
}

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function makeRequest(url, usePuppeteer = false, retries = MAX_RETRIES) {
    const ua = USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
    try {
        if (usePuppeteer) {
            const page = await (await initBrowser()).newPage();
            await page.setUserAgent(ua);
            await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
            const content = await page.content();
            await page.close();
            await delay(DELAY_MS);
            return { data: content };
        } else {
            const response = await axios.get(url, {
                timeout: 15000,
                headers: { 'User-Agent': ua }
            });
            await delay(DELAY_MS);
            return response;
        }
    } catch (error) {
        if (retries > 0) {
            console.warn(`Request failed for ${url}, retrying... (${MAX_RETRIES - retries + 1}/${MAX_RETRIES})`);
            await delay(2000 * (MAX_RETRIES - retries + 1));
            return makeRequest(url, usePuppeteer, retries - 1);
        }
        console.error(`Failed to fetch ${url}:`, error.message);
        throw error;
    }
}

async function closeBrowser() {
    if (browser) {
        await browser.close();
        browser = null;
    }
}

module.exports = { makeRequest, closeBrowser };