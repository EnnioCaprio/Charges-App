const knex = require('knex');
const knexfile = require('./knexfile');
require('dotenv').config();

//For prod, just set a env variable and use it, this is a fixed way to get dev env

const env = process.env.NODE_ENV || 'development';

const configEnvironment = knexfile[env];

console.log(env, knexfile[env]);

module.exports = knex(configEnvironment);