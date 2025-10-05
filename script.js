const STARTING_PHONE_COUNT = 2500;

// Basic and advanced questions
const BASIC_QUESTIONS = [
    { id: 'budget', text: 'What is your budget for a new smartphone?', options: [{val: 1, text: 'Under $300'}, {val: 2, text: '$300 - $500'}, {val: 3, text: '$500 - $800'}, {val: 4, text: '$800+'}] },
    { id: 'primaryUse', text: 'What will be your primary use for the phone?', options: [{val: 1, text: 'Social Media & Browsing'}, {val: 2, text: 'Mobile Gaming'}, {val: 3, text: 'Photography & Video'}, {val: 4, text: 'Work & Productivity'}] },
    { id: 'camera', text: 'How important is camera quality to you?', options: [{val: 5, text: 'Top priority, I want the best'}, {val: 4, text: 'Important, but not the main thing'}, {val: 3, text: 'Just needs to be decent'}, {val: 1, text: 'I rarely take photos'}] },
    { id: 'battery', text: 'What are your expectations for battery life?', options: [{val: 5, text: 'Must last all day, even with heavy use'}, {val: 3, text: 'A full day of average use is fine'}, {val: 1, text: 'I can charge it during the day'}] },
    { id: 'os', text: 'Which operating system do you prefer?', options: [{val: 1, text: 'iOS (Apple iPhone)'}, {val: 2, text: 'Android (e.g., Samsung, Google)'}, {val: 3, text: 'No preference'}] }
];

const ADVANCED_QUESTIONS = [
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

// Phone data (2025 models, normalized scores)
const phones = [
    { name: 'Apple iPhone 17', price: 3, battery: 4, camera: 4, screen: 2, performance: 5, storage: '256GB-512GB', os: 'iOS', ai: 4, durability: 5, eco: 4, softwareSupport: 5, wireless: true, expandable: false, headphone: false, pros: 'Smooth iOS, great battery', link: 'https://www.apple.com/iphone-17/', imageUrl: 'https://images.unsplash.com/photo-1758467700568-9eee4b5470a1?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Samsung Galaxy S25 Ultra', price: 4, battery: 4, camera: 5, screen: 3, performance: 5, storage: '256GB-1TB', os: 'Android', ai: 5, durability: 5, eco: 3, softwareSupport: 5, wireless: true, expandable: false, headphone: false, pros: 'Top camera, S Pen', link: 'https://www.samsung.com/galaxy-s25-ultra/', imageUrl: 'https://images.unsplash.com/photo-1738830230234395-a351829a1c7b?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2Ftc3VuZyUyMHMyNSUyMHVsdHJhfGVufDB8fDB8fHww' },
    { name: 'Google Pixel 10 Pro', price: 4, battery: 4, camera: 5, screen: 2, performance: 4, storage: '128GB-1TB', os: 'Android', ai: 5, durability: 4, eco: 4, softwareSupport: 5, wireless: true, expandable: false, headphone: false, pros: 'AI magic, pure Android', link: 'https://store.google.com/product/pixel_10_pro', imageUrl: 'https://www.androidheadlines.com/wp-content/uploads/2025/08/Google-Pixel-10-Pro-official-renders-leak-16.webp' },
    { name: 'OnePlus 13', price: 4, battery: 5, camera: 4, screen: 3, performance: 5, storage: '256GB-512GB', os: 'Android', ai: 3, durability: 4, eco: 3, softwareSupport: 4, wireless: true, expandable: false, headphone: false, pros: 'Fast charging, value', link: 'https://www.oneplus.com/13', imageUrl: 'https://www.digitaltrends.com/wp-content/uploads/2024/10/OnePlus-13-blue-e1733513695394.jpeg?fit=1920%2C1080&p=1' },
    { name: 'Google Pixel 9a', price: 3, battery: 4, camera: 4, screen: 2, performance: 3, storage: '128GB-256GB', os: 'Android', ai: 4, durability: 4, eco: 4, softwareSupport: 5, wireless: true, expandable: false, headphone: false, pros: 'Affordable AI, clean UI', link: 'https://store.google.com/product/pixel_9a', imageUrl: 'https://www.androidauthority.com/wp-content/uploads/2024/09/Pixel-9a-render-scaled-e1727709849297.jpg' },
    { name: 'Samsung Galaxy Z Fold 7', price: 4, battery: 3, camera: 5, screen: 3, performance: 5, storage: '256GB-1TB', os: 'Android', ai: 5, durability: 4, eco: 3, softwareSupport: 5, wireless: true, expandable: false, headphone: false, pros: 'Foldable productivity', link: 'https://www.samsung.com/galaxy-z-fold7/', imageUrl: 'https://samsungmobilepress.com/file/ABC120511EB453D8021DF3C3BF89F34121C095334A21F29258FE7CCBAB50CF395E45164D1EEAADA8B73765B438C2F41B8E1257ABCB7740717B229CBAB716C8C85443F3FB6D2B9E84AB6EE709E588E10DEE6D2C98B4EA102F7758C419AA32BC1ED692DF31E5C40E7B6066EA9338FB4007F32FC90CA7D63E0325A8F62D5B6C30CDD310D381506F0D6243231E9ED111609E' },
    { name: 'Apple iPhone 17 Pro Max', price: 4, battery: 5, camera: 5, screen: 3, performance: 5, storage: '256GB-2TB', os: 'iOS', ai: 4, durability: 5, eco: 4, softwareSupport: 5, wireless: true, expandable: false, headphone: false, pros: 'Pro camera, huge screen', link: 'https://www.apple.com/iphone-17-pro-max/', imageUrl: 'https://www.apple.com/newsroom/images/2025/09/apple-unveils-iphone-17-pro-and-iphone-17-pro-max/tile/Apple-iPhone-17-Pro-camera-close-up-250909-lp.jpg.landing-big_2x.jpg' },
    { name: 'Motorola Razr Ultra', price: 4, battery: 5, camera: 3, screen: 3, performance: 4, storage: '512GB-1TB', os: 'Android', ai: 2, durability: 4, eco: 3, softwareSupport: 3, wireless: true, expandable: false, headphone: false, pros: 'Flip design, battery champ', link: 'https://www.motorola.com/razr-ultra/', imageUrl: 'https://crdms.images.consumerreports.org/f_auto,w_600/prod/products/cr/models/415550-smartphones-motorola-razr-2024-10040698.png' },
    { name: 'Samsung Galaxy S25', price: 3, battery: 4, camera: 4, screen: 2, performance: 5, storage: '128GB-256GB', os: 'Android', ai: 4, durability: 5, eco: 3, softwareSupport: 5, wireless: true, expandable: false, headphone: false, pros: 'Balanced flagship', link: 'https://www.samsung.com/galaxy-s25/', imageUrl: 'https://9to5google.com/wp-content/uploads/sites/4/2025/01/Galaxy-S25-HD-render-leak-1.jpg?quality=82&strip=all&w=960' },
    { name: 'Nothing Phone 3a Pro', price: 3, battery: 4, camera: 3, screen: 3, performance: 3, storage: '128GB-256GB', os: 'Android', ai: 2, durability: 4, eco: 3, softwareSupport: 3, wireless: false, expandable: false, headphone: false, pros: 'Unique glyph lights, budget', link: 'https://nothing.tech/phone-3a-pro/', imageUrl: 'https://m.media-amazon.com/images/I/717afjK8rOL._UF350,350_QL80_.jpg' },
    { name: 'Samsung Galaxy Z Flip 7', price: 4, battery: 4, camera: 4, screen: 3, performance: 4, storage: '256GB-512GB', os: 'Android', ai: 4, durability: 4, eco: 3, softwareSupport: 5, wireless: true, expandable: false, headphone: false, pros: 'Compact flip, fun AI', link: 'https://www.samsung.com/galaxy-z-flip7/', imageUrl: 'https://images.unsplash.com/photo-1676121228785-f1dcd462025f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z2FsYXh5JTIweiUyMGZsaXB8ZW58MHx8MHx8fDA%3D' },
    { name: 'Google Pixel 10', price: 3, battery: 4, camera: 5, screen: 2, performance: 4, storage: '128GB-512GB', os: 'Android', ai: 5, durability: 5, eco: 4, softwareSupport: 5, wireless: true, expandable: false, headphone: false, pros: 'AI camera wizard, stock Android', link: 'https://store.google.com/product/pixel_10/', imageUrl: 'https://sm.pcmag.com/t/pcmag_me/news/n/not-a-leak/not-a-leak-google-offers-an-official-look-at-the-pixel-10_2y73.1920.jpg' },
    { name: 'Samsung Galaxy A16 5G', price: 1, battery: 4, camera: 4, screen: 3, performance: 3, storage: '128GB', os: 'Android', ai: 3, durability: 3, eco: 3, softwareSupport: 4, wireless: false, expandable: true, headphone: true, pros: 'Budget 5G, long updates', link: 'https://www.samsung.com/galaxy-a16/', imageUrl: 'https://m-cdn.phonearena.com/images/article/162496-wide-two_1200/Samsung-Galaxy-A16-5G-leaked-render-leaves-nothing-to-the-imagination.jpg' },
    { name: 'Apple iPhone 17 Pro', price: 4, battery: 4, camera: 5, screen: 2, performance: 5, storage: '256GB-1TB', os: 'iOS', ai: 4, durability: 5, eco: 4, softwareSupport: 5, wireless: true, expandable: false, headphone: false, pros: 'Pro performance, compact', link: 'https://www.apple.com/iphone-17-pro/', imageUrl: 'https://9to5mac.com/wp-content/uploads/sites/6/2025/09/iphone-17-event-13.58.32.jpg?quality=82&strip=all&w=1600' },
    { name: 'Honor Magic V5', price: 4, battery: 4, camera: 4, screen: 3, performance: 5, storage: '512GB-1TB', os: 'Android', ai: 4, durability: 4, eco: 3, softwareSupport: 4, wireless: true, expandable: false, headphone: false, pros: 'Ultra-thin foldable, premium build', link: 'https://www.honor.com/global/phones/honor-magic-v5/', imageUrl: 'https://www.honor.com/content/dam/honor/common/products/smartphone/honor-magic-v5/product/share.jpg' }
];

// State
let answers = {};
let currentQuestion = 0;
let quizType = null;
let currentQuestions = [];
let finalPhoneCount = 0;

// Show error modal (simple, CSS-driven)
function showError(message) {
    const modal = document.createElement('div');
    modal.className = 'error-modal';
    modal.innerHTML = `
        <div style="background: rgba(255, 75, 75, 0.9); padding: 20px; border-radius: 12px; color: white; text-align: center; max-width: 300px; margin: 20px auto;">
            <p>${message}</p>
            <button onclick="this.parentElement.parentElement.remove()" style="background: #fff; color: #333; padding: 8px 16px; border: none; border-radius: 8px; cursor: pointer;">OK</button>
        </div>
    `;
    document.body.appendChild(modal);
}

// Random background with error handling
function setRandomBackground() {
    const themes = ['abstract', 'nature', 'technology', 'minimal', 'gradient'];
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    const bgUrl = `https://source.unsplash.com/random/1920x1080/?${randomTheme}`;
    const bgElement = document.getElementById('background');
    if (!bgElement) {
        console.error('Background element not found');
        return;
    }
    bgElement.style.backgroundImage = `url('${bgUrl}')`;
    // Preload to cache (handled by SW)
    const img = new Image();
    img.src = bgUrl;
    img.onerror = () => {
        console.warn('Failed to load background, using fallback');
        bgElement.style.backgroundImage = `linear-gradient(135deg, #0ea5e9, #8b5cf6)`;
    };
}

// Start quiz with validation
function startQuiz(type) {
    if (!['basic', 'advanced'].includes(type)) {
        showError('Invalid quiz type. Please try again.');
        console.error('Invalid quiz type:', type);
        return;
    }
    quizType = type;
    currentQuestions = type === 'basic' ? BASIC_QUESTIONS : ADVANCED_QUESTIONS;
    if (!currentQuestions.length) {
        showError('No questions available. Please try again later.');
        console.error('Empty question set for type:', type);
        return;
    }
    document.getElementById('welcome').style.display = 'none';
    const quizContainer = document.getElementById('quiz-container');
    if (!quizContainer) {
        showError('Quiz container not found. Please refresh the page.');
        console.error('Quiz container missing');
        return;
    }
    quizContainer.style.display = 'block';
    loadQuestion(0);
    updateProgress();
    updateContention();
}

// Load question with error handling
function loadQuestion(index) {
    if (index < 0 || index >= currentQuestions.length) {
        console.error('Invalid question index:', index);
        return;
    }
    const q = currentQuestions[index];
    const quizDiv = document.getElementById('quiz');
    if (!quizDiv) {
        showError('Quiz element not found. Please refresh the page.');
        console.error('Quiz div missing');
        return;
    }
    quizDiv.innerHTML = `<div class="question"><h3>${q.text}</h3>${
        q.options.map(o => `<label><input type="radio" name="${q.id}" value="${o.val}" onchange="handleSelection('${q.id}', ${o.val})"> ${o.text}</label>`).join('')
    }</div>`;
    const prevBtn = document.getElementById('previousBtn');
    if (prevBtn) {
        prevBtn.style.display = index > 0 ? 'block' : 'none';
    }
}

// Handle selection with validation
function handleSelection(id, val) {
    if (!id || isNaN(val)) {
        showError('Invalid selection. Please try again.');
        console.error('Invalid selection:', { id, val });
        return;
    }
    answers[id] = parseInt(val);
    const questionDiv = document.querySelector('.question');
    if (!questionDiv) {
        console.error('Question div not found during selection');
        return;
    }
    questionDiv.classList.add('fade-out');
    
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < currentQuestions.length) {
            loadQuestion(currentQuestion);
            updateProgress();
            updateContention();
        } else {
            const submitBtn = document.getElementById('submitBtn');
            if (submitBtn) {
                submitBtn.style.display = 'block';
            }
        }
    }, 1000);
}

// Previous question
function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion(currentQuestion);
        updateProgress();
        updateContention();
    }
}

// Update progress
function updateProgress() {
    const progressFill = document.getElementById('progress-fill');
    const questionCount = document.getElementById('question-count');
    if (!progressFill || !questionCount) {
        console.error('Progress elements not found');
        return;
    }
    const progress = ((currentQuestion + 1) / currentQuestions.length) * 100;
    progressFill.style.width = `${progress}%`;
    questionCount.textContent = `Question ${currentQuestion + 1} of ${currentQuestions.length}`;
}

// Calculate contention count (tuned for smoother decay)
function calculateContentionCount() {
    try {
        let count = STARTING_PHONE_COUNT;
        const answeredKeys = Object.keys(answers);
        if (answeredKeys.length === 0) return count;

        if (answeredKeys.includes('budget')) {
            switch (answers.budget) {
                case 1: count *= 0.15; break;
                case 2: count *= 0.30; break;
                case 3: count *= 0.40; break;
                case 4: count *= 0.35; break;
                default: console.warn('Invalid budget answer:', answers.budget);
            }
        }
        if (answeredKeys.includes('os')) {
            if (answers.os === 1) count *= 0.15;
            else if (answers.os === 2) count *= 0.85;
            else if (answers.os !== 3) console.warn('Invalid OS answer:', answers.os);
        }
        if (answeredKeys.includes('softwareSupport')) {
            switch (answers.softwareSupport) {
                case 5: count *= 0.4; break;
                case 3: count *= 0.7; break;
                case 1: break;
                default: console.warn('Invalid softwareSupport answer:', answers.softwareSupport);
            }
        }
        if (answeredKeys.includes('screenSize')) count *= 0.7;
        if (answeredKeys.includes('camera')) count *= 0.8;
        if (answeredKeys.includes('primaryUse')) count *= 0.85;
        if (answeredKeys.includes('gaming') && answers.gaming !== 1) count *= 0.75;

        const minimum = Math.max(15 - (currentQuestions.length - answeredKeys.length), 3);
        return Math.floor(Math.max(count, minimum));
    } catch (err) {
        console.error('Error calculating contention count:', err);
        return 3; // Fallback to minimum viable count
    }
}

// Update contention (debounced)
function updateContention() {
    const contentionCount = document.getElementById('contention-count');
    if (!contentionCount) {
        console.error('Contention count element not found');
        return;
    }
    const count = calculateContentionCount();
    contentionCount.textContent = `${count} phones in contention`;
}

// Submit quiz with validation
function submitQuiz() {
    if (Object.keys(answers).length < currentQuestions.length) {
        showError('Please answer all questions before submitting.');
        return;
    }
    const quizContainer = document.getElementById('quiz-container');
    const loading = document.getElementById('loading');
    if (!quizContainer || !loading) {
        showError('UI elements missing. Please refresh the page.');
        console.error('Missing quiz or loading elements');
        return;
    }
    quizContainer.style.display = 'none';
    loading.style.display = 'block';
    finalPhoneCount = calculateContentionCount();

    setTimeout(() => {
        loading.style.display = 'none';
        const results = document.getElementById('results');
        const consideredCount = document.getElementById('considered-count');
        if (!results || !consideredCount) {
            showError('Results display failed. Please try again.');
            console.error('Results elements missing');
            return;
        }
        results.style.display = 'block';
        consideredCount.textContent = `Based on ${finalPhoneCount} phones considered`;
        computeRecommendations();
    }, 2000);
}

// Compute recommendations (robust scoring)
function computeRecommendations() {
    try {
        if (!phones || !phones.length) {
            showError('No phone data available. Please try again later.');
            console.error('Phone data missing or empty');
            return;
        }
        const weightedKeys = ['battery', 'camera', 'gaming', 'softwareSupport', 'ai', 'durability', 'eco', 'performance'];
        const userVec = weightedKeys.map(k => answers[k] || 0);

        const matches = phones.map(phone => {
            if (!phone.name || !phone.imageUrl || !phone.link) {
                console.warn('Invalid phone data:', phone);
                return null;
            }
            const phoneVec = weightedKeys.map(k => phone[k] || 0);
            let cos = cosineSimilarity(userVec, phoneVec);

            let catScore = 0;
            catScore += 1 - Math.abs(answers.budget - phone.price) / 4;
            catScore += answers.screenSize ? 1 - Math.abs(answers.screenSize - phone.screen) / 3 : 0;
            let phoneStorageVal = phone.storage.includes('2TB') ? 4 : phone.storage.includes('1TB') ? 3 : phone.storage.includes('256GB') ? 2 : 1;
            catScore += answers.storage ? 1 - Math.abs(answers.storage - phoneStorageVal) / 3 : 0;
            catScore += answers.os === 3 || (answers.os === 1 && phone.os === 'iOS') || (answers.os === 2 && phone.os === 'Android') ? 1 : 0;
            let specialBonus = 0;
            if (answers.specialFeature === 1) specialBonus = phone.durability / 5;
            if (answers.specialFeature === 2) specialBonus = phone.wireless ? 1 : 0;
            if (answers.specialFeature === 3) specialBonus = phone.expandable ? 1 : 0;
            if (answers.specialFeature === 4) specialBonus = phone.headphone ? 1 : 0;
            catScore += specialBonus;
            let primaryBonus = 0;
            if (answers.primaryUse === 1) primaryBonus = (phone.battery + phone.ai) / 10;
            if (answers.primaryUse === 2) primaryBonus = phone.performance / 5;
            if (answers.primaryUse === 3) primaryBonus = phone.camera / 5;
            if (answers.primaryUse === 4) primaryBonus = (phone.battery + phone.softwareSupport) / 10;
            catScore += primaryBonus;

            let totalCat = catScore / (answers.specialFeature ? 6 : 5);
            let score = (cos * 0.6 + totalCat * 0.4) * 100;

            return { ...phone, score: Math.round(score) };
        }).filter(p => p !== null).sort((a, b) => b.score - a.score).slice(0, 3);

        if (!matches.length) {
            showError('No matching phones found. Try adjusting your answers.');
            console.error('No valid matches after scoring');
            return;
        }

        const recDiv = document.getElementById('recommendations');
        if (!recDiv) {
            showError('Results display failed. Please refresh the page.');
            console.error('Recommendations div missing');
            return;
        }
        recDiv.innerHTML = matches.map((m, i) => `<div class="rec${i === 0 ? ' top' : ''}">
            <img src="${m.imageUrl}" alt="${m.name}" onerror="this.src='https://via.placeholder.com/120';">
            <h3>${m.name} (${m.score}% Match)</h3>
            <p>Pros: ${m.pros}</p>
            <p>Storage: ${m.storage} | OS: ${m.os}</p>
            <a href="${m.link}" target="_blank">Buy Now</a> | 
            <a href="https://grok.com/?q=Details on ${encodeURIComponent(m.name)} smartphone" target="_blank">Ask Grok for More</a>
        </div>`).join('');
    } catch (err) {
        showError('Error computing recommendations. Please try again.');
        console.error('Recommendation error:', err);
    }
}

// Cosine similarity (safe math)
function cosineSimilarity(vecA, vecB) {
    try {
        let dot = 0, normA = 0, normB = 0;
        const len = Math.min(vecA.length, vecB.length);
        for (let i = 0; i < len; i++) {
            dot += (vecA[i] || 0) * (vecB[i] || 0);
            normA += (vecA[i] || 0) ** 2;
            normB += (vecB[i] || 0) ** 2;
        }
        return normA === 0 || normB === 0 ? 0 : dot / (Math.sqrt(normA) * Math.sqrt(normB));
    } catch (err) {
        console.error('Cosine similarity error:', err);
        return 0;
    }
}

// Restart quiz
function restartQuiz() {
    try {
        answers = {};
        currentQuestion = 0;
        quizType = null;
        const results = document.getElementById('results');
        const welcome = document.getElementById('welcome');
        if (!results || !welcome) {
            console.error('Restart UI elements missing');
            return;
        }
        results.style.display = 'none';
        welcome.style.display = 'block';
        setRandomBackground();
    } catch (err) {
        showError('Error restarting quiz. Please refresh the page.');
        console.error('Restart error:', err);
    }
}

// Service worker registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('SW registered:', reg))
            .catch(err => console.error('SW registration failed:', err));
    });
}

// Init
try {
    setRandomBackground();
} catch (err) {
    console.error('Initialization error:', err);
}
