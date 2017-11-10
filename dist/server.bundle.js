(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _sourceMapSupport = __webpack_require__(1);
	
	var _sourceMapSupport2 = _interopRequireDefault(_sourceMapSupport);
	
	__webpack_require__(2);
	
	var _path = __webpack_require__(12);
	
	var _path2 = _interopRequireDefault(_path);
	
	var _express = __webpack_require__(3);
	
	var _express2 = _interopRequireDefault(_express);
	
	var _bodyParser = __webpack_require__(4);
	
	var _bodyParser2 = _interopRequireDefault(_bodyParser);
	
	var _mongodb = __webpack_require__(5);
	
	var _issue = __webpack_require__(6);
	
	var _issue2 = _interopRequireDefault(_issue);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_sourceMapSupport2.default.install();
	
	
	const app = (0, _express2.default)();
	app.use(_express2.default.static('static'));
	app.use(_bodyParser2.default.json());
	
	let db;
	
	app.get('/api/issues', (req, res) => {
	  const filter = {};
	  if (req.query.status) filter.status = req.query.status;
	  if (req.query.effort_lte || req.query.effort_gte) filter.effort = {};
	  if (req.query.effort_lte) filter.effort.$lte = parseInt(req.query.effort_lte, 10);
	  if (req.query.effort_gte) filter.effort.$gte = parseInt(req.query.effort_gte, 10);
	
	  db.collection('issues').find(filter).toArray().then(issues => {
	    const metadata = { total_count: issues.length };
	    res.json({ _metadata: metadata, records: issues });
	  }).catch(error => {
	    console.log(error);
	    res.status(500).json({ message: `Internal Server Error: ${error}` });
	  });
	});
	
	app.post('/api/issues', (req, res) => {
	  const newIssue = req.body;
	  newIssue.created = new Date();
	  if (!newIssue.status) {
	    newIssue.status = 'New';
	  }
	
	  const err = _issue2.default.validateIssue(newIssue);
	  if (err) {
	    res.status(422).json({ message: `Invalid request: ${err}` });
	    return;
	  }
	
	  db.collection('issues').insertOne(_issue2.default.cleanupIssue(newIssue)).then(result => db.collection('issues').find({ _id: result.insertedId }).limit(1).next()).then(savedIssue => {
	    res.json(savedIssue);
	  }).catch(error => {
	    console.log(error);
	    res.status(500).json({ message: `Internal Server Error: ${error}` });
	  });
	});
	
	app.get('/api/issues/:id', (req, res) => {
	  let issueId;
	  try {
	    issueId = new _mongodb.ObjectId(req.params.id);
	  } catch (error) {
	    res.status(422).json({ message: `Invalid issue ID format: ${error}` });
	    return;
	  }
	
	  db.collection('issues').find({ _id: issueId }).limit(1).next().then(issue => {
	    if (!issue) res.status(404).json({ message: `No such issue: ${issueId}` });else res.json(issue);
	  }).catch(error => {
	    console.log(error);
	    res.status(500).json({ message: `Internal Server Error: ${error}` });
	  });
	});
	
	app.put('/api/issues/:id', (req, res) => {
	  let issueId;
	  try {
	    issueId = new _mongodb.ObjectId(req.params.id);
	  } catch (error) {
	    res.status(422).json({ message: `Invalid issue ID format: ${error}` });
	    return;
	  }
	
	  const issue = req.body;
	  delete issue._id;
	
	  const err = _issue2.default.validateIssue(issue);
	  if (err) {
	    res.status(422).json({ message: `Invalid request: ${err}` });
	    return;
	  }
	
	  db.collection('issues').updateOne({ _id: issueId }, _issue2.default.convertIssue(issue)).then(() => db.collection('issues').find({ _id: issueId }).limit(1).next()).then(savedIssue => {
	    res.json(savedIssue);
	  }).catch(error => {
	    console.log(error);
	    res.status(500).json({ message: `Internal Server Error: ${error}` });
	  });
	});
	
	app.delete('/api/issues/:id', (req, res) => {
	  let issueId;
	  try {
	    issueId = new _mongodb.ObjectId(req.params.id);
	  } catch (error) {
	    res.status(422).json({ message: `Invalid issue ID format: ${error}` });
	    return;
	  }
	
	  db.collection('issues').deleteOne({ _id: issueId }).then(deleteResult => {
	    if (deleteResult.result.n === 1) res.json({ status: 'OK' });else res.json({ status: 'Warning: object not found' });
	  }).catch(error => {
	    console.log(error);
	    res.status(500).json({ message: `Internal Server Error: ${error}` });
	  });
	});
	
	app.get('*', (req, res) => {
	  res.sendFile(_path2.default.resolve('static/index.html'));
	});
	
	_mongodb.MongoClient.connect('mongodb://localhost/issuetracker').then(connection => {
	  db = connection;
	  app.listen(3000, () => {
	    console.log('App started on port 3000');
	  });
	}).catch(error => {
	  console.log('ERROR:', error);
	});

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = require("source-map-support");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = require("babel-polyfill");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = require("express");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	module.exports = require("body-parser");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	module.exports = require("mongodb");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	const validIssueStatus = {
	  New: true,
	  Open: true,
	  Assigned: true,
	  Fixed: true,
	  Verified: true,
	  Closed: true
	};
	
	const issueFieldType = {
	  status: 'required',
	  owner: 'required',
	  effort: 'optional',
	  created: 'required',
	  completionDate: 'optional',
	  title: 'required'
	};
	
	function cleanupIssue(issue) {
	  const cleanedUpIssue = {};
	  Object.keys(issue).forEach(field => {
	    if (issueFieldType[field]) cleanedUpIssue[field] = issue[field];
	  });
	  return cleanedUpIssue;
	}
	
	function convertIssue(issue) {
	  if (issue.created) issue.created = new Date(issue.created);
	  if (issue.completionDate) issue.completionDate = new Date(issue.completionDate);
	  return cleanupIssue(issue);
	}
	
	function validateIssue(issue) {
	  const errors = [];
	  Object.keys(issueFieldType).forEach(field => {
	    if (issueFieldType[field] === 'required' && !issue[field]) {
	      errors.push(`Missing mandatory field: ${field}`);
	    }
	  });
	
	  if (!validIssueStatus[issue.status]) {
	    errors.push(`${issue.status} is not a valid status.`);
	  }
	
	  return errors.length ? errors.join('; ') : null;
	}
	
	exports.default = {
	  validateIssue: validateIssue,
	  cleanupIssue: cleanupIssue,
	  convertIssue: convertIssue
	};

/***/ }),
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
/***/ (function(module, exports) {

	module.exports = require("path");

/***/ })
/******/ ])));
//# sourceMappingURL=server.bundle.js.map