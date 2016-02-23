// Example express application adding the parse-server module to expose Parse
// compatible API routes.

var express = require('express')
  , ParseServer = require('parse-server').ParseServer
  , morgan = require('morgan')
  , Parse = require('./helpers/helper.js').Parse
  , statusRoute = require('./routes/status.js')
  , publishSdlBatchRoute = require('./routes/publish-sdl-batch.js')
  , swagger = require('swagger-express');

var databaseUri = process.env.DATABASE_URI || process.env.MONGOLAB_URI;

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

var api = new ParseServer({
  databaseURI: databaseUri || 'mongodb://localhost:27017/dev',
  // databaseURI: databaseUri || 'mongodb://den00pnp.us.oracle.com:27017/dev',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'myAppId',
  masterKey: process.env.MASTER_KEY || '' //Add your master key here. Keep it secret!
});
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

var app = express();

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);
app.use(morgan('dev'));

// Parse Server plays nicely with the rest of your web routes
app.get('/', function(req, res) {
  res.status(200).send('I dream of being a web site.');
});

// Serve the Parse API on the /parse URL prefix
app.use('/parse', api);
app.use('/status', statusRoute);
app.use('/publish-sdl-batch', publishSdlBatchRoute);

app.all('/*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(swagger.init(app, {
  apiVersion: '1.0',
  swaggerVersion: '1.0',
  basePath: 'http://localhost:1337',
  swaggerURL: '/swagger',
  swaggerJSON: '/api-docs.json',
  swaggerUI: './public/swagger/',
  apis: ['./routes/status.js', './routes/publish-sdl-batch.js']
}));

app.use(express.static('public'));


var port = process.env.PORT || 1337;
app.listen(port, function() {
  console.log('parse-server-example running on port ' + port + '.');
});
