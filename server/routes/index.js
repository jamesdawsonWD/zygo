// V1
const emailRoutesV1 = require('./v1/emails');
const contractRoutesV1 = require('./v1/contracts');

const routes = (app) => {
    app.use('/api/emails', emailRoutesV1);
    app.use('/contracts', contractRoutesV1);
};

module.exports = routes;
