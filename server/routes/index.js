// V1
const emailRoutesV1 = require('./v1/emails');

const routes = (app) => {
    app.use('/api/emails', emailRoutesV1);
};

module.exports = routes;
