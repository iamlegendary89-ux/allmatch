fetch('http://localhost:3000/triggerUpdate').then(() => {
    fetch('phones.json').then(r => r.json()).then(data => {
        // Sort by data[brand].recommendationScore
    });
});
