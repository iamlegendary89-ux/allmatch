// 10 Questions with options (priorities mapped to scores)
const questions = [
    { id: 'budget', text: 'What\'s your budget range?', options: [{val: 3, text: 'Budget (<$500)'}, {val: 2, text: 'Mid-range ($500-800)'}, {val: 1, text: 'Premium (>$800)'}] },
    { id: 'battery', text: 'How important is battery life? (1-5 scale)', options: [{val: 1, text: '1 (Not important)'}, {val: 2, text: '2'}, {val: 3, text: '3'}, {val: 4, text: '4'}, {val: 5, text: '5 (Very important)'}] },
    { id: 'camera', text: 'Camera quality priority? (1-5 scale)', options: [{val: 1, text: '1'}, {val: 2, text: '2'}, {val: 3, text: '3'}, {val: 4, text: '4'}, {val: 5, text: '5'}] },
    { id: 'screen', text: 'Preferred screen size?', options: [{val: 1, text: 'Compact (<6.3")'}, {val: 2, text: 'Standard (6.3-6.7")'}, {val: 3, text: 'Large (>6.7") or Foldable'}] },
    { id: 'performance', text: 'Performance for gaming/multitasking? (1-5 scale)', options: [{val: 1, text: '1'}, {val: 2, text: '2'}, {val: 3, text: '3'}, {val: 4, text: '4'}, {val: 5, text: '5'}] },
    { id: 'storage', text: 'Storage needs?', options: [{val: 1, text: 'Basic (128GB)'}, {val: 2, text: 'Medium (256-512GB)'}, {val: 3, text: 'High (1TB+)'}] },
    { id: 'os', text: 'OS preference?', options: [{val: 1, text: 'iOS'}, {val: 2, text: 'Android'}, {val: 3, text: 'No preference'}] },
    { id: 'ai', text: 'AI features like photo editing? (1-5 scale)', options: [{val: 1, text: '1'}, {val: 2, text: '2'}, {val: 3, text: '3'}, {val: 4, text: '4'}, {val: 5, text: '5'}] },
    { id: 'durability', text: 'Durability/water resistance? (1-5 scale)', options: [{val: 1, text: '1'}, {val: 2, text: '2'}, {val: 3, text: '3'}, {val: 4, text: '4'}, {val: 5, text: '5'}] },
    { id: 'eco', text: 'Eco-friendliness/sustainable materials? (1-5 scale)', options: [{val: 1, text: '1'}, {val: 2, text: '2'}, {val: 3, text: '3'}, {val: 4, text: '4'}, {val: 5, text: '5'}] }
];

// Sample 2025 phone data (aggregated from sources; scores normalized 1-5 or categorical)
const phones = [
    { name: 'Apple iPhone 17', price: 3, battery: 5, camera: 4, screen: 2, performance: 5, storage: '256GB-512GB', os: 'iOS', ai: 4, durability: 5, eco: 4, pros: 'Excellent battery, AI features', link: 'https://www.apple.com/iphone-17/' },
    { name: 'Samsung Galaxy S25 Ultra', price: 1, battery: 4, camera: 5, screen: 3, performance: 5, storage: '256GB-1TB', os: 'Android', ai: 5, durability: 5, eco: 3, pros: 'Versatile camera, powerful AI', link: 'https://www.samsung.com/galaxy-s25-ultra/' },
    { name: 'Google Pixel 10 Pro', price: 1, battery: 4, camera: 5, screen: 2, performance: 4, storage: '128GB-1TB', os: 'Android', ai: 5, durability: 4, eco: 4, pros: 'AI photo tools, bright screen', link: 'https://store.google.com/product/pixel_10_pro' },
    { name: 'OnePlus 13', price: 2, battery: 5, camera: 4, screen: 3, performance: 5, storage: '256GB-512GB', os: 'Android', ai: 3, durability: 4, eco: 3, pros: 'Fast charging, great performance', link: 'https://www.oneplus.com/13' },
    { name: 'Google Pixel 9a', price: 3, battery: 4, camera: 4, screen: 2, performance: 3, storage: '128GB-256GB', os: 'Android', ai: 4, durability: 4, eco: 4, pros: 'Affordable, good AI', link: 'https://store.google.com/product/pixel_9a' },
    { name: 'Samsung Galaxy Z Fold 7', price: 1, battery: 3, camera: 5, screen: 3, performance: 5, storage: '256GB-1TB', os: 'Android', ai: 5, durability: 4, eco: 3, pros: 'Foldable screen, AI tools', link: 'https://www.samsung.com/galaxy-z-fold7/' },
    { name: 'Apple iPhone 17 Pro Max', price: 1, battery: 5, camera: 5, screen: 3, performance: 5, storage: '256GB-2TB', os: 'iOS', ai: 4, durability: 5, eco: 4, pros: 'Top battery, pro camera', link: 'https://www.apple.com/iphone-17-pro-max/' },
    { name: 'Motorola Razr Ultra', price: 1, battery: 5, camera: 3, screen: 3, performance: 4, storage: '512GB-1TB', os: 'Android', ai: 2, durability: 4, eco: 3, pros: 'Flip design, long battery', link: 'https://www.motorola.com/razr-ultra/' },
    { name: 'Samsung Galaxy S25', price: 2, battery: 4, camera: 4, screen: 2, performance: 5, storage: '128GB-256GB', os: 'Android', ai: 4, durability: 5, eco: 3, pros: 'Balanced, AI integration', link: 'https://www.samsung.com/galaxy-s25/' },
    { name: 'Nothing Phone 3a Pro', price: 3, battery: 4, camera: 3, screen: 3, performance: 3, storage: '128GB-256GB', os: 'Android', ai: 2, durability: 4, eco: 3, pros: 'Unique design, affordable', link: 'https://nothing.tech/phone-3a-pro/' }
    // Add more if needed; sources: PCMag<grok-card data-id="fb4dee" data-type="citation_card"></grok-card>, CNET<grok-card data-id="69ec53" data-type="citation_card"></grok-card>, TechRadar<grok-card data-id="9fc2d8" data-type="citation_card"></grok-card>, Tom's Guide<grok-card data-id="976406" data-type="citation_card"></grok-card>
];

// User answers
let answers = {};
let currentQuestion = 0;

// Load first question
function loadQuestion(index) {
    const q = questions[index];
    const quizDiv = document.getElementById('quiz');
    quizDiv.innerHTML = `<div class="question"><h3>${q.text}</h3>${q.options.map(o => `<label><input type="radio" name="${q.id}" value="${o.val}"> ${o.text}</label>`).join('')}</div>`;
}

// Next question
function nextQuestion() {
    const q = questions[currentQuestion];
    const selected = document.querySelector(`input[name="${q.id}"]:checked`);
    if (selected) {
        answers[q.id] = parseInt(selected.value);
        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion(currentQuestion);
            if (currentQuestion === questions.length - 1) {
                document.getElementById('nextBtn').style.display = 'none';
                document.getElementById('submitBtn').style.display = 'block';
            }
        }
    } else {
        alert('Please select an option!');
    }
}

// Submit and match
function submitQuiz() {
    const matches = phones.map(phone => {
        let score = 0;
        // Simple scoring: lower diff = higher score; max 50 points (5 per category, inverted for some)
        score += 5 - Math.abs(answers.budget - phone.price); // Budget match
        score += answers.battery * (phone.battery / 5); // Weighted
        score += answers.camera * (phone.camera / 5);
        score += 5 - Math.abs(answers.screen - phone.screen);
        score += answers.performance * (phone.performance / 5);
        score += 5 - Math.abs(answers.storage - (phone.storage.includes('1TB') ? 3 : phone.storage.includes('512') ? 2 : 1));
        score += answers.os === 3 ? 5 : (answers.os === 1 && phone.os === 'iOS') || (answers.os === 2 && phone.os === 'Android') ? 5 : 0;
        score += answers.ai * (phone.ai / 5);
        score += answers.durability * (phone.durability / 5);
        score += answers.eco * (phone.eco / 5);
        return { ...phone, score: Math.round((score / 50) * 100) }; // % match
    }).sort((a, b) => b.score - a.score).slice(0, 3);

    document.getElementById('quiz').style.display = 'none';
    document.getElementById('submitBtn').style.display = 'none';
    const recDiv = document.getElementById('recommendations');
    recDiv.innerHTML = matches.map(m => `<div class="rec"><h3>${m.name} (${m.score}% Match)</h3><p>Pros: ${m.pros}</p><p>Storage: ${m.storage} | OS: ${m.os}</p><a href="${m.link}" target="_blank">Buy Now</a> | <a href="https://grok.com/?q=Details on ${m.name} smartphone" target="_blank">Ask Grok for More</a></div>`).join('');
    document.getElementById('results').style.display = 'block';
}

// Init
loadQuestion(0);
