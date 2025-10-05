const cron = require('node-cron');
const { main } = require('./update-phones');

console.log('Scheduling daily PhoneArena/GSMArena updates...');

// Daily at 00:00
cron.schedule('0 0 * * *', () => {
    console.log(`Daily update started at ${new Date().toISOString()}`);
    main().catch(err => console.error('Cron error:', err));
});