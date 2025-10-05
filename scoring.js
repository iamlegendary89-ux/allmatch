function calculateRecommendationScore(specs) {
    // Weights: 60% specs, 30% tech reviews, 10% Reddit sentiment
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

    let techSentiment = 0;
    const positiveKeywords = ['great', 'excellent', 'stunning', 'fast', 'smooth', 'reliable'];
    const negativeKeywords = ['poor', 'disappointing', 'slow', 'weak', 'issue'];
    for (const pro of specs.pros) {
        if (positiveKeywords.some(k => pro.toLowerCase().includes(k))) techSentiment += 0.5;
    }
    for (const con of specs.cons) {
        if (negativeKeywords.some(k => con.toLowerCase().includes(k))) techSentiment -= 0.5;
    }

    let redditSentiment = 0;
    for (const pro of specs.redditPros || []) {
        if (positiveKeywords.some(k => pro.toLowerCase().includes(k))) redditSentiment += 0.5;
    }
    for (const con of specs.redditCons || []) {
        if (negativeKeywords.some(k => con.toLowerCase().includes(k))) redditSentiment -= 0.5;
    }

    return Math.min(10, Math.max(1, (specScore * 0.6 + techSentiment * 0.3 + redditSentiment * 0.1)).toFixed(1));
}

module.exports = { calculateRecommendationScore };