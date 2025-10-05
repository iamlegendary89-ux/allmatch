// script.js (optimized matching with hybrid weighted cosine + categorical, refined weights for accuracy based on algo best practices)

// User answers
let answers = {};
let currentQuestion = 0;

// Questions from ADVANCED_QUESTIONS (vals for scoring: higher = higher priority/preference)
const questions = [
    { id: 'budget', text: 'What is your budget for a new smartphone?', options: [{val: 1, text: 'Under $300'}, {val: 2, text: '$300 - $500'}, {val: 3, text: '$500 - $800'}, {val: 4, text: '$800+'}] },
    { id: 'primaryUse', text: 'What will be your primary use for the phone?', options: [{val: 1, text: 'Social Media & Browsing'}, {val: 2, text: 'Mobile Gaming'}, {val: 3, text: 'Photography & Video'}, {val: 4, text: 'Work & Productivity'}] },
    { id: 'camera', text: 'How important is camera quality to you?', options: [{val: 5, text: 'Top priority, I want the best'}, {val: 4, text: 'Important, but not the main thing'}, {val: 3, text: 'Just needs to be decent'}, {val: 1, text: 'I rarely take photos'}] },
    { id: 'battery', text: 'What are your expectations for battery life?', options: [{val: 5, text: 'Must last all day, even with heavy use'}, {val: 3, text: 'A full day of average use is fine'}, {val: 1, text: 'I can charge it during the day'}] },
    { id: 'screenSize', text: 'What screen size do you prefer?', options: [{val: 1, text: 'Compact (under 6.1 inches)'}, {val: 2, text: 'Standard (6.1 - 6.5 inches)'}, {val: 3, text: 'Large (6.6 inches and up)'}] },
    { id: 'os', text: 'Which operating system do you prefer?', options: [{val: 1, text: 'iOS (Apple iPhone)'}, {val: 2, text: 'Android (e.g., Samsung, Google)'}, {val: 3, text: 'No preference'}] },
    { id: 'gaming', text: 'How seriously do you take mobile gaming?', options: [{val: 5, text: 'I play demanding 3D games'}, {val: 3, text: 'I play casual games occasionally'}, {val: 1, text: 'I don\'t game on my phone'}] },
    { id: 'storage', text: 'How much storage space do you need?', options: [{val: 1, text: '64GB is enough'}, {val: 2, text: '128GB is ideal'}, {val: 3, text: '256GB or more'}] },
    { id: 'softwareSupport', text: 'How important is long-term software support (getting OS updates for many years)?', options: [{val: 5, text: 'Very important - I want 5+ years of updates.'}, {val: 3, text: 'Somewhat important - 3 to 4 years is good.'}, {val: 1, text: 'Not a priority for me.'}] },
    { id: 'specialFeature', text: 'Which of these features is most important to you?', options: [{val: 1, text: 'Top-tier Water Resistance'}, {val: 2, text: 'Wireless Charging'}, {val: 3, text: 'Expandable Storage (SD card)'}, {val: 4, text: 'Headphone Jack'}] }
];

// Phone data (refined specs from GSMArena 2025 guides; price: 1=<300, 2=300-500, 3=500-800, 4>800; added/updated based on reviews for accuracy)
const phones = [
    { name: 'Apple iPhone 17', price: 3, battery: 4, camera: 4, screen: 2, performance: 5, storage: '256GB-512GB', os: 'iOS', ai: 4, durability: 5, eco: 4, softwareSupport: 5, wireless: true, expandable: false, headphone: false, pros: 'Smooth iOS, great battery', link: 'https://www.apple.com/iphone-17/', imageUrl: 'https://images.unsplash.com/photo-1758467700568-9eee4b5470a1?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Samsung Galaxy S25 Ultra', price: 4, battery: 5, camera: 5, screen: 3, performance: 5, storage: '256GB-1TB', os: 'Android', ai: 5, durability: 5, eco: 4, softwareSupport: 5, wireless: true, expandable: false, headphone: false, pros: 'Top camera, S Pen', link: 'https://www.samsung.com/galaxy-s25-ultra/', imageUrl: 'https://images.unsplash.com/photo-1738830230234395-a351829a1c7b?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2Ftc3VuZyUyMHMyNSUyMHVsdHJhfGVufDB8fDB8fHww' },
    { name: 'Google Pixel 10 Pro', price: 4, battery: 5, camera: 5, screen: 3, performance: 5, storage: '128GB-1TB', os: 'Android', ai: 5, durability: 4, eco: 4, softwareSupport: 5, wireless: true, expandable: false, headphone: false, pros: 'AI magic, pure Android', link: 'https://store.google.com/product/pixel_10_pro', imageUrl: 'https://www.androidheadlines.com/wp-content/uploads/2025/08/Google-Pixel-10-Pro-official-renders-leak-16.webp' },
    { name: 'OnePlus 13', price: 3, battery: 5, camera: 4, screen: 3, performance: 5, storage: '256GB-512GB', os: 'Android', ai: 4, durability: 5, eco: 3, softwareSupport: 4, wireless: true, expandable: false, headphone: false, pros: 'Fast charging, value', link: 'https://www.oneplus.com/13', imageUrl: 'https://www.digitaltrends.com/wp-content/uploads/2024/10/OnePlus-13-blue-e1733513695394.jpeg?fit=1920%2C1080&p=1' },
    { name: 'Google Pixel 9a', price: 2, battery: 4, camera: 4, screen: 2, performance: 4, storage: '128GB-256GB', os: 'Android', ai: 4, durability: 4, eco: 4, softwareSupport: 5, wireless: true, expandable: false, headphone: false, pros: 'Affordable AI, clean UI', link: 'https://store.google.com/product/pixel_9a', imageUrl: 'https://www.androidauthority.com/wp-content/uploads/2024/09/Pixel-9a-render-scaled-e1727709849297.jpg' },
    { name: 'Samsung Galaxy Z Fold 7', price: 4, battery: 4, camera: 5, screen: 3, performance: 5, storage: '256GB-1TB', os: 'Android', ai: 5, durability: 5, eco: 3, softwareSupport: 5, wireless: true, expandable: false, headphone: false, pros: 'Foldable productivity', link: 'https://www.samsung.com/galaxy-z-fold7/', imageUrl: 'https://samsungmobilepress.com/file/ABC120511EB453D8021DF3C3BF89F34121C095334A21F29258FE7CCBAB50CF395E45164D1EEAADA8B73765B438C2F41B8E1257ABCB7740717B229CBAB716C8C85443F3FB6D2B9E84AB6EE709E588E10DEE6D2C98B4EA102F7758C419AA32BC1ED692DF31E5C40E7B6066EA9338FB4007F32FC90CA7D63E0325A8F62D5B6C30CDD310D381506F0D6243231E9ED111609E' },
    { name: 'Apple iPhone 17 Pro Max', price: 4, battery: 5, camera: 5, screen: 3, performance: 5, storage: '256GB-2TB', os: 'iOS', ai: 5, durability: 5, eco: 4, softwareSupport: 5, wireless: true, expandable: false, headphone: false, pros: 'Pro camera, huge screen', link: 'https://www.apple.com/iphone-17-pro-max/', imageUrl: 'https://www.apple.com/newsroom/images/2025/09/apple-unveils-iphone-17-pro-and-iphone-17-pro-max/tile/Apple-iPhone-17-Pro-camera-close-up-250909-lp.jpg.landing-big_2x.jpg' },
    { name: 'Motorola Razr Ultra', price: 4, battery: 5, camera: 3, screen: 3, performance: 4, storage: '512GB-1TB', os: 'Android', ai: 3, durability: 4, eco: 3, softwareSupport: 4, wireless: true, expandable: false, headphone: false, pros: 'Flip design, battery champ', link: 'https://www.motorola.com/razr-ultra/', imageUrl: 'https://crdms.images.consumerreports.org/f_auto,w_600/prod/products/cr/models/415550-smartphones-motorola-razr-2024-10040698.png' },
    { name: 'Samsung Galaxy S25', price: 3, battery: 4, camera: 4, screen: 2, performance: 5, storage: '128GB-256GB', os: 'Android', ai: 4, durability: 5, eco: 3, softwareSupport: 5, wireless: true, expandable: false, headphone: false, pros: 'Balanced flagship', link: 'https://www.samsung.com/galaxy-s25/', imageUrl: 'https://9to5google.com/wp-content/uploads/sites/4/2025/01/Galaxy-S25-HD-render-leak-1.jpg?quality=82&strip=all&w=960' },
    { name: 'Nothing Phone 3a Pro', price: 2, battery: 4, camera: 3, screen: 3, performance: 3, storage: '128GB-256GB', os: 'Android', ai: 2, durability: 4, eco: 3, softwareSupport: 3, wireless: false, expandable: false, headphone: false, pros: 'Unique glyph lights, budget', link: 'https://nothing.tech/phone-3a-pro/', imageUrl: 'https://m.media-amazon.com/images/I/717afjK8rOL._UF350,350_QL80_.jpg' },
    { name: 'Samsung Galaxy Z Flip 7', price: 4, battery: 4, camera: 4, screen: 3, performance: 4, storage: '256GB-512GB', os: 'Android', ai: 4, durability: 4, eco: 3, softwareSupport: 5, wireless: true, expandable: false, headphone: false, pros: 'Compact flip, fun AI', link: 'https://www.samsung.com/galaxy-z-flip7/', imageUrl: 'https://images.unsplash.com/photo-1676121228785-f1dcd462025f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z2FsYXh5JTIweiUyMGZsaXB8ZW58MHx8MHx8fDA%3D' },
    { name: 'Google Pixel 10', price: 3, battery: 4, camera: 5, screen: 2, performance: 4, storage: '128GB-512GB', os: 'Android', ai: 5, durability: 5, eco: 4, softwareSupport: 5, wireless: true, expandable: false, headphone: false, pros: 'AI camera wizard, stock Android', link: 'https://store.google.com/product/pixel_10/', imageUrl: 'https://sm.pcmag.com/t/pcmag_me/news/n/not-a-leak/not-a-leak-google-offers-an-official-look-at-the-pixel-10_2y73.1920.jpg' },
    { name: 'Samsung Galaxy A16 5G', price: 1, battery: 4, camera: 4, screen: 3, performance: 3, storage: '128GB', os: 'Android', ai: 3, durability: 3, eco: 3, softwareSupport: 4, wireless: false, expandable: true, headphone: true, pros: 'Budget 5G, long updates', link: 'https://www.samsung.com/galaxy-a16/', imageUrl: 'https://m-cdn.phonearena.com/images/article/162496-wide-two_1200/Samsung-Galaxy-A16-5G-leaked-render-leaves-nothing-to-the-imagination.jpg' },
    { name: 'Apple iPhone 17 Pro', price: 4, battery: 4, camera: 5, screen: 2, performance: 5, storage: '256GB-1TB', os: 'iOS', ai: 4, durability: 5, eco: 4, softwareSupport: 5, wireless: true, expandable: false, headphone: false, pros: 'Pro performance, compact', link: 'https://www.apple.com/iphone-17-pro/', imageUrl: 'https://9to5mac.com/wp-content/uploads/sites/6/2025/09/iphone-17-event-13.58.32.jpg?quality=82&strip=all&w=1600' },
    { name: 'Honor Magic V5', price: 4, battery: 4, camera: 4, screen: 3, performance: 5, storage: '512GB-1TB', os: 'Android', ai: 4, durability: 4, eco: 3, softwareSupport: 4, wireless: true, expandable: false, headphone: false, pros: 'Ultra-thin foldable, premium build', link: 'https://www.honor.com/global/phones/honor-magic-v5/', imageUrl: 'https://www.honor.com/content/dam/honor/common/products/smartphone/honor-magic-v5/product/share.jpg' }
];

// Random blurred wallpaper (using Unsplash random, lazy load)
function setRandomBackground() {
    const themes = ['abstract', 'nature', 'technology', 'minimal', 'gradient'];
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    const bgUrl = `https://source.unsplash.com/random/1920x1080/?${randomTheme}`;
    const bgElement = document.getElementById('background');
    bgElement.style.backgroundImage = `url('${bgUrl}')`;
}

// Init
setRandomBackground();
loadQuestion(0);

// Load question
function loadQuestion(index) {
    const q = questions[index];
    const quizDiv = document.getElementById('quiz');
    quizDiv.innerHTML = `<div class="question"><h3>${q.text}</h3>${q.options.map(o => `<label><input type="radio" name="${q.id}" value="${o.val}" onchange="handleSelection('${q.id}', ${o.val})"> ${o.text}</label>`).join('')}</div>`;
}

// Handle selection
function handleSelection(id, val) {
    answers[id] = parseInt(val);
    const questionDiv = document.querySelector('.question');
    questionDiv.classList.add('fade-out');
    
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion(currentQuestion);
        } else {
            document.getElementById('submitBtn').style.display = 'block';
        }
    }, 1000);
}

// Cosine similarity
function cosineSimilarity(vecA, vecB) {
    let dot = 0, normA = 0, normB = 0;
    const len = vecA.length;
    for (let i = 0; i < len; i++) {
        dot += vecA[i] * vecB[i];
        normA += vecA[i] ** 2;
        normB += vecB[i] ** 2;
    }
    return normA === 0 || normB === 0 ? 0 : dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

// Submit with refined hybrid matching (increased weights for user priorities, added primaryUse influence for accuracy)
function submitQuiz() {
    const weightedKeys = ['battery', 'camera', 'gaming', 'softwareSupport', 'ai', 'durability', 'eco', 'performance'];
    const userVec = weightedKeys.map(k => answers[k] || 0);

    const matches = phones.map(phone => {
        const phoneVec = weightedKeys.map(k => phone[k] || 0);
        let cos = cosineSimilarity(userVec, phoneVec);

        let catScore = 0;
        catScore += 1 - Math.abs(answers.budget - phone.price) / 4; // Adjusted for new budget scale
        catScore += 1 - Math.abs(answers.screenSize - phone.screen) / 3;
        let phoneStorageVal = phone.storage.includes('2TB') ? 4 : phone.storage.includes('1TB') ? 3 : phone.storage.includes('256GB') ? 2 : 1; // Refined storage mapping
        catScore += 1 - Math.abs(answers.storage - phoneStorageVal) / 3;
        catScore += answers.os === 3 || (answers.os === 1 && phone.os === 'iOS') || (answers.os === 2 && phone.os === 'Android') ? 1 : 0;
        let specialBonus = 0;
        if (answers.specialFeature === 1) specialBonus = phone.durability / 5;
        if (answers.specialFeature === 2) specialBonus = phone.wireless ? 1 : 0;
        if (answers.specialFeature === 3) specialBonus = phone.expandable ? 1 : 0;
        if (answers.specialFeature === 4) specialBonus = phone.headphone ? 1 : 0;
        catScore += specialBonus;
        let primaryBonus = 0;
        if (answers.primaryUse === 1) primaryBonus = (phone.battery + phone.ai) / 10; // Social: battery + AI
        if (answers.primaryUse === 2) primaryBonus = (phone.performance + phone.gaming || phone.performance) / 5; // Gaming: performance
        if (answers.primaryUse === 3) primaryBonus = phone.camera / 5; // Photo: camera
        if (answers.primaryUse === 4) primaryBonus = (phone.battery + phone.softwareSupport) / 10; // Work: battery + support
        catScore += primaryBonus;

        let totalCat = catScore / 6; // Balanced categories
        let score = (cos * 0.6 + totalCat * 0.4) * 100; // Increased cosine weight for content-based accuracy

        return { ...phone, score: Math.round(score) };
    }).sort((a, b) => b.score - a.score).slice(0, 3);

    document.getElementById('quiz').style.display = 'none';
    document.getElementById('submitBtn').style.display = 'none';
    const recDiv = document.getElementById('recommendations');
    recDiv.innerHTML = matches.map((m, i) => `<div class="rec${i === 0 ? ' top' : ''}"><img src="${m.imageUrl}" alt="${m.name}"><h3>${m.name} (${m.score}% Match)</h3><p>Pros: ${m.pros}</p><p>Storage: ${m.storage} | OS: ${m.os}</p><a href="${m.link}" target="_blank">Buy Now</a> | <a href="https://grok.com/?q=Details on ${m.name} smartphone" target="_blank">Ask Grok for More</a></div>`).join('');
    document.getElementById('results').style.display = 'block';
}
