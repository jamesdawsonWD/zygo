/**
 * Connect DB
 */

// require('./server/database/db');

/**
 * Required External Modules
 */
const express = require('express');
const path = require('path');
const http = require('http');
const cors = require('cors');

require('dotenv').config();

/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || '8000';

/**
 *  App Configuration
 */
app.use(express.json());
app.use(express.static('express'));

app.use(cors({ origin: true, credentials: true }));

/**
 * Routes Definitions
 */

require('./server/routes')(app);

/**
 * Server Activation
 */
if (process.env.NODE_ENV === 'production') {
    app.use('/assets', express.static(path.join(__dirname, 'client', 'public')));
    app.use(express.static(path.join(__dirname, 'client', 'dist')));
    // If we get to here and have not found what we're looking for then we must be at a client side route and need to serve the index.html.
    app.get('*', (req, res) => {
        console.log('Serve index');
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
    });
}

app.listen(process.env.PORT || 3000);

module.exports = { app };
