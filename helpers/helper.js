var Parse = require('parse/node');

Parse.initialize(process.env.APP_ID || 'myAppId');
Parse.serverURL = 'http://localhost:1337/parse';

module.exports.Parse = Parse;
