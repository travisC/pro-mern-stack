'use strict';

var _sourceMapSupport = require('source-map-support');

var _sourceMapSupport2 = _interopRequireDefault(_sourceMapSupport);

require('babel-polyfill');

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _mongodb = require('mongodb');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_sourceMapSupport2.default.install();


let appModule = require('./server.js');
let db;
let server;

_mongodb.MongoClient.connect('mongodb://localhost/issuetracker').then(connection => {
  db = connection;
  server = _http2.default.createServer();
  appModule.setDb(db);
  server.on('request', appModule.app);
  server.listen(3000, () => {
    console.log('App started on port 3000');
  });
}).catch(error => {
  console.log('ERROR:', error);
});

if (module.hot) {
  module.hot.accept('./server.js', () => {
    server.removeListener('request', appModule.app);
    appModule = require('./server.js'); // eslint-disable-line
    appModule.setDb(db);
    server.on('request', appModule.app);
  });
}
//# sourceMappingURL=index.js.map