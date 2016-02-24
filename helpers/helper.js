var Parse = require('parse/node')
  , gutil = require('gulp-util')
  , winston = require('winston');

Parse.initialize(process.env.APP_ID || 'myAppId');
Parse.serverURL = 'http://localhost:1337/parse';

gutil.colors.enabled=true;

module.exports.Parse = Parse;
module.exports.gutil = gutil;
