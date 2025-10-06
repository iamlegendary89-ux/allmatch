const STARTING_PHONE_COUNT = 2500;

const QUESTIONS = [
    { id: 'budget', text: 'What is your budget for a new smartphone?', options: [{val: 1, text: 'Under $300'}, {val: 2, text: '$300 - $500'}, {val: 3, text: '$500 - $800'}, {val: 4, text: '$800+'}] },
    { id: 'primaryUse', text: 'What will be your primary use for the phone?', options: [{val: 1, text: 'Social Media & Browsing'}, {val: 2, text: 'Mobile Gaming'}, {val: 3, text: 'Photography & Video'}, {val: 4, text: 'Work & Productivity'}] },
    { id: 'camera', text: 'How important is camera quality to you?', options: [{val: 5, text: 'Top priority, I want the best'}, {val: 4, text: 'Important, but not the main thing'}, {val: 3, text: 'Just needs to be decent'}, {val: 1, text: 'I rarely take photos'}] },
    { id: 'battery', text: 'What are your expectations for battery life?', options: [{val: 5, text: 'Must last all day, even with heavy use'}, {val: 3, text: 'A full day of average use is fine'}, {val: 1, text: 'I can charge it during the day'}] },
    { id: 'os', text: 'Which operating system do you prefer?', options: [{val: 1, text: 'iOS (Apple iPhone)'}, {val: 2, text: 'Android (e.g., Samsung, Google)'}, {val: 3, text: 'No preference'}] }
];

const phones = [
    { name: 'Samsung Galaxy S25 Ultra', battery: 100, camera: 100, screen: 100, performance: 98, storage: '256GB-1TB', os: 'Android', ai: 100, durability: 100, eco: 80, softwareSupport: 100, wireless: true, expandable: false, headphone: false, pros: 'High build, performance, display', cons: 'Camera quality lower in reviews', link: 'https://www.phonearena.com/phones/Samsung-Galaxy-S25-Ultra_id12343', imageUrl: 'https://m-cdn.phonearena.com/images/phones/12343-800/Samsung-Galaxy-S25-Ultra.jpg' },
    { name: 'Apple iPhone 17 Pro Max', battery: 90, camera: 75, screen: 95, performance: 100, storage: '256GB-2TB', os: 'iOS', ai: 90, durability: 100, eco: 90, softwareSupport: 100, wireless: true, expandable: false, headphone: false, pros: 'Excellent performance, great battery', cons: 'High price', link: 'https://www.gsmarena.com/apple_iphone_17_pro_max-13196.php', imageUrl: 'https://fdn.gsmarena.com/imgroot/reviews/25/apple-iphone-17-pro-max/lifestyle/-1024w2/gsmarena_001.jpg' },
    { name: 'Google Pixel 10 Pro', battery: 95, camera: 80, screen: 90, performance: 95, storage: '128GB-1TB', os: 'Android', ai: 100, durability: 90, eco: 85, softwareSupport: 100, wireless: true, expandable: false, headphone: false, pros: 'Pure Android, AI features', cons: 'Battery life average', link: 'https://www.gsmarena.com/google_pixel_10_pro-13141.php', imageUrl: 'https://fdn.gsmarena.com/imgroot/reviews/25/google-pixel-10-pro/lifestyle/-1024w2/gsmarena_001.jpg' },
    { name: 'Samsung Galaxy Z Fold7', battery: 80, camera: 90, screen: 100, performance: 98, storage: '256GB-1TB', os: 'Android', ai: 95, durability: 85, eco: 80, softwareSupport: 100, wireless: true, expandable: false, headphone: false, pros: 'Foldable screen, multi-tasking', cons: 'Expensive, battery not the best', link: 'https://www.phonearena.com/phones/Samsung-Galaxy-Z-Fold7_id12725', imageUrl: 'https://m-cdn.phonearena.com/images/phones/12725-800/Samsung-Galaxy-Z-Fold7.jpg' },
    { name: 'Samsung Galaxy Z Flip7', battery: 75, camera: 85, screen: 90, performance: 90, storage: '256GB-512GB', os: 'Android', ai: 90, durability: 85, eco: 80, softwareSupport: 100, wireless: true, expandable: false, headphone: false, pros: 'Compact foldable, stylish', cons: 'Smaller battery', link: 'https://www.phonearena.com/phones/Samsung-Galaxy-Z-Flip7_id12726', imageUrl: 'https://m-cdn.phonearena.com/images/phones/12726-800/Samsung-Galaxy-Z-Flip7.jpg' },
    { name: 'Apple iPhone 17', battery: 85, camera: 80, screen: 90, performance: 95, storage: '128GB-512GB', os: 'iOS', ai: 90, durability: 95, eco: 85, softwareSupport: 100, wireless: true, expandable: false, headphone: false, pros: 'Smooth iOS, good camera', cons: 'No expandable storage', link: 'https://www.gsmarena.com/apple_iphone_17-13195.php', imageUrl: 'https://fdn.gsmarena.com/imgroot/reviews/25/apple-iphone-17/lifestyle/-1024w2/gsmarena_001.jpg' },
    { name: 'Motorola Razr Ultra (2025)', battery: 80, camera: 75, screen: 85, performance: 90, storage: '256GB-1TB', os: 'Android', ai: 80, durability: 85, eco: 80, softwareSupport: 90, wireless: true, expandable: false, headphone: false, pros: 'Flip design, good battery', cons: 'Average camera', link: 'https://www.phonearena.com/phones/Motorola-Razr-Ultra-2025_id12727', imageUrl: 'https://m-cdn.phonearena.com/images/phones/12727-800/Motorola-Razr-Ultra-2025.jpg' },
    { name: 'Samsung Galaxy S25', battery: 85, camera: 85, screen: 90, performance: 95, storage: '128GB-512GB', os: 'Android', ai: 90, durability: 95, eco: 80, softwareSupport: 100, wireless: true, expandable: false, headphone: false, pros: 'Balanced flagship', cons: 'No headphone jack', link: 'https://www.phonearena.com/phones/Samsung-Galaxy-S25_id12342', imageUrl: 'https://m-cdn.phonearena.com/images/phones/12342-800/Samsung-Galaxy-S25.jpg' },
    { name: 'Google Pixel 9a', battery: 80, camera: 80, screen: 85, performance: 85, storage: '128GB-256GB', os: 'Android', ai: 90, durability: 85, eco: 85, softwareSupport: 100, wireless: true, expandable: false, headphone: false, pros: 'Affordable AI, clean UI', cons: 'Mid-range performance', link: 'https://www.phonearena.com/phones/Google-Pixel-9a_id12593', imageUrl: 'https://m-cdn.phonearena.com/images/phones/12593-800/Google-Pixel-9a.jpg' },
    { name: 'Samsung Galaxy S24 FE', battery: 85, camera: 80, screen: 90, performance: 90, storage: '128GB-512GB', os: 'Android', ai: 85, durability: 90, eco: 80, softwareSupport: 95, wireless: true, expandable: false, headphone: false, pros: 'Good value, AI features', cons: 'Not flagship camera', link: 'https://www.phonearena.com/phones/Samsung-Galaxy-S24-FE_id12593', imageUrl: 'https://m-cdn.phonearena.com/images/phones/12593-800/Samsung-Galaxy-S24-FE.jpg' },
    { name: 'Samsung Galaxy A36 5G', battery: 80, camera: 75, screen: 85, performance: 80, storage: '128GB-256GB', os: 'Android', ai: 80, durability: 85, eco: 80, softwareSupport: 90, wireless: false, expandable: true, headphone: true, pros: 'Budget 5G, long updates', cons: 'Basic camera', link: 'https://www.phonearena.com/phones/Samsung-Galaxy-A36-5G_id12593', imageUrl: 'https://m-cdn.phonearena.com/images/phones/12593-800/Samsung-Galaxy-A36-5G.jpg' },
    { name: 'Apple iPhone 16e', battery: 80, camera: 75, screen: 85, performance: 85, storage: '128GB-256GB', os: 'iOS', ai: 85, durability: 90, eco: 85, softwareSupport: 100, wireless: true, expandable: false, headphone: false, pros: 'Budget iPhone, good performance', cons: 'Limited storage', link: 'https://www.phonearena.com/phones/Apple-iPhone-16e_id12593', imageUrl: 'https://m-cdn.phonearena.com/images/phones/12593-800/Apple-iPhone-16e.jpg' },
    { name: 'OnePlus 13R', battery: 90, camera: 80, screen: 90, performance: 95, storage: '256GB-512GB', os: 'Android', ai: 85, durability: 85, eco: 80, softwareSupport: 90, wireless: true, expandable: false, headphone: false, pros: 'Fast charging, value', cons: 'No expandable', link: 'https://www.phonearena.com/phones/OnePlus-13R_id12593', imageUrl: 'https://m-cdn.phonearena.com/images/phones/12593-800/OnePlus-13R.jpg' },
    { name: 'Motorola Edge (2024)', battery: 85, camera: 80, screen: 90, performance: 90, storage: '128GB-512GB', os: 'Android', ai: 80, durability: 85, eco: 80, softwareSupport: 85, wireless: true, expandable: false, headphone: false, pros: 'Balanced mid-range', cons: 'Average AI', link: 'https://www.phonearena.com/phones/Motorola-Edge-2024_id12593', imageUrl: 'https://m-cdn.phonearena.com/images/phones/12593-800/Motorola-Edge-2024.jpg' },
    { name: 'Nothing Phone (3a Pro)', battery: 80, camera: 75, screen: 85, performance: 80, storage: '128GB-256GB', os: 'Android', ai: 80, durability: 85, eco: 80, softwareSupport: 85, wireless: false, expandable: false, headphone: false, pros: 'Unique design, budget', cons: 'No wireless charging', link: 'https://www.phonearena.com/phones/Nothing-Phone-3a-Pro_id12593', imageUrl: 'https://m-cdn.phonearena.com/images/phones/12593-800/Nothing-Phone-3a-Pro.jpg' },
    { name: 'Xiaomi 15 Ultra', battery: 95, camera: 100, screen: 95, performance: 100, storage: '256GB-1TB', os: 'Android', ai: 95, durability: 95, eco: 85, softwareSupport: 95, wireless: true, expandable: false, headphone: false, pros: 'Top camera, performance', cons: 'High price', link: 'https://www.gsmarena.com/xiaomi_15_ultra-13197.php', imageUrl: 'https://fdn.gsmarena.com/imgroot/reviews/25/xiaomi-15-ultra/lifestyle/-1024w2/gsmarena_001.jpg' },
    { name: 'Honor 400 Pro', battery: 90, camera: 90, screen: 90, performance: 95, storage: '256GB-512GB', os: 'Android', ai: 90, durability: 90, eco: 85, softwareSupport: 90, wireless: true, expandable: false, headphone: false, pros: 'Great value, AI', cons: 'Limited availability', link: 'https://www.gsmarena.com/honor_400_pro-13198.php', imageUrl: 'https://fdn.gsmarena.com/imgroot/reviews/25/honor-400-pro/lifestyle/-1024w2/gsmarena_001.jpg' },
    { name: 'Apple iPhone 16 Pro Max', battery: 90, camera: 90, screen: 95, performance: 100, storage: '256GB-1TB', os: 'iOS', ai: 95, durability: 100, eco: 90, softwareSupport: 100, wireless: true, expandable: false, headphone: false, pros: 'Top performance, camera', cons: 'High price', link: 'https://www.gsmarena.com/apple_iphone_16_pro_max-13199.php', imageUrl: 'https://fdn.gsmarena.com/imgroot/reviews/25/apple-iphone-16-pro-max/lifestyle/-1024w2/gsmarena_001.jpg' },
    { name: 'Asus ROG Phone 9 Pro', battery: 100, camera: 80, screen: 100, performance: 100, storage: '512GB-1TB', os: 'Android', ai: 85, durability: 90, eco: 80, softwareSupport: 85, wireless: true, expandable: false, headphone: true, pros: 'Gaming beast, battery', cons: 'Bulky design', link: 'https://www.gsmarena.com/asus_rog_phone_9_pro-13200.php', imageUrl: 'https://fdn.gsmarena.com/imgroot/reviews/25/asus-rog-phone-9-pro/lifestyle/-1024w2/gsmarena_001.jpg' },
    { name: 'Motorola Moto G24 Power', battery: 100, camera: 70, screen: 85, performance: 70, storage: '128GB-256GB', os: 'Android', ai: 70, durability: 80, eco: 75, softwareSupport: 80, wireless: false, expandable: true, headphone: true, pros: 'Budget, long battery', cons: 'Basic camera', link: 'https://www.phonearena.com/phones/Motorola-Moto-G24-Power_id12593', imageUrl: 'https://m-cdn.phonearena.com/images/phones/12593-800/Motorola-Moto-G24-Power.jpg' }
];

let answers = {};
let currentQuestion = 0;
let finalPhoneCount = 0;

function setRandomBackground() {
    const themes = ['abstract', 'nature', 'technology', 'minimal', 'gradient'];
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    const bgUrl = `https://source.unsplash.com/random/1920x1080/?${randomTheme}`;
    document.getElementById('background').style.backgroundImage = `url('${bgUrl}')`;
}

function startQuiz() {
    document.getElementById('welcome').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    loadQuestion(0);
    updateProgress();
    updateContention();
}

function loadQuestion(index) {
    const q = QUESTIONS[index];
    document.getElementById('quiz').innerHTML = `<div class="question"><h3>${q.text}</h3>${q.options.map(o => `<label><input type="radio" name="${q.id}" value="${o.val}" onchange="handleSelection('${q.id}', ${o.val})"> ${o.text}</label>`).join('')}</div>`;
    document.getElementById('previousBtn').style.display = index > 0 ? 'block' : 'none';
}

function handleSelection(id, val) {
    answers[id] = parseInt(val);
    const questionDiv = document.querySelector('.question');
    questionDiv.classList.add('fade-out');
    
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < QUESTIONS.length) {
            loadQuestion(currentQuestion);
        } else {
            document.getElementById('submitBtn').style.display = 'block';
        }
    }, 1000);
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion(currentQuestion);
        updateProgress();
        updateContention();
    }
}

function updateProgress() {
    const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100;
    document.getElementById('progress-fill').style.width = `${progress}%`;
    document.getElementById('question-count').textContent = `Question ${currentQuestion + 1} of ${QUESTIONS.length}`;
}

function calculateContentionCount() {
    let count = STARTING_PHONE_COUNT;
    const answeredKeys = Object.keys(answers);
    if (answeredKeys.length === 0) return count;

    if (answeredKeys.includes('budget')) {
        switch (answers.budget) {
            case 1: count *= 0.15; break;
            case 2: count *= 0.30; break;
            case 3: count *= 0.40; break;
            case 4: count *= 0.35; break;
        }
    }
    if (answeredKeys.includes('os')) {
        if (answers.os === 1) count *= 0.15;
        else if (answers.os === 2) count *= 0.85;
    }
    if (answeredKeys.includes('camera')) count *= 0.8;
    if (answeredKeys.includes('battery')) count *= 0.7;
    if (answeredKeys.includes('primaryUse')) count *= 0.85;

    const minimum = 15 - (QUESTIONS.length - answeredKeys.length);
    return Math.floor(Math.max(count, minimum));
}

function updateContention() {
    document.getElementById('contention-count').textContent = `${calculateContentionCount()} phones in contention`;
}

function submitQuiz() {
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('loading').style.display = 'block';
    finalPhoneCount = calculateContentionCount();

    setTimeout(() => {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('results').style.display = 'block';
        document.getElementById('considered-count').textContent = `Based on ${finalPhoneCount} phones considered`;
        computeRecommendations();
    }, 2000);
}

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

function computeRecommendations() {
    const weightedKeys = ['battery', 'camera', 'performance', 'ai', 'durability', 'eco'];
    const userVec = weightedKeys.map(k => answers[k] || 0);

    const matches = phones.map(phone => {
        const phoneVec = weightedKeys.map(k => phone[k] || 0);
        let cos = cosineSimilarity(userVec, phoneVec);

        let catScore = 0;
        catScore += 1 - Math.abs(answers.budget - phone.price) / 4;
        catScore += answers.primaryUse === 1 ? (phone.battery + phone.ai) / 10 : 0;
        catScore += answers.primaryUse === 2 ? phone.performance / 5 : 0;
        catScore += answers.primaryUse === 3 ? phone.camera / 5 : 0;
        catScore += answers.primaryUse === 4 ? (phone.battery + phone.softwareSupport) / 10 : 0;

        let totalCat = catScore / 4;
        let score = (cos * 0.6 + totalCat * 0.4) * 100;

        return { ...phone, score: Math.round(score) };
    }).sort((a, b) => b.score - a.score).slice(0, 3);

    document.getElementById('recommendations').innerHTML = matches.map((m, i) => `<div class="rec${i === 0 ? ' top' : ''}">
        <img src="${m.imageUrl}" alt="${m.name}">
        <h3>${m.name} (${m.score}% Match)</h3>
        <p>Pros: ${m.pros}</p>
        <p>Cons: ${m.cons}</p>
        <p>Battery: ${m.battery}% | Camera: ${m.camera}% | Screen: ${m.screen}% | Performance: ${m.performance}%</p>
        <p>Storage: ${m.storage} | OS: ${m.os}</p>
        <a href="${m.link}" target="_blank">Buy Now</a> | <a href="https://grok.com/?q=Details on ${m.name} smartphone" target="_blank">Ask Grok for More</a>
    </div>`).join('');
}

function restartQuiz() {
    answers = {};
    currentQuestion = 0;
    document.getElementById('results').style.display = 'none';
    document.getElementById('welcome').style.display = 'block';
}

setRandomBackground();