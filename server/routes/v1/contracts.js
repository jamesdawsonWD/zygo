const Router = require('express').Router();

const Traverse = require('./../../controllers/traverse');

console.log(Traverse);
Router.route('/move').post(Traverse.move);

module.exports = Router;
