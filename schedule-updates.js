const cron = require('node-cron');
const { main } = require('./update-phones');

cron.schedule('0 0 * * *', () => main('daily'));
cron.schedule('0 0 * * 0', () => main('weekly'));