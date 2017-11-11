exports.id = 0;
exports.modules = {

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.setDb = exports.app = undefined;
	
	var _express = __webpack_require__(7);
	
	var _express2 = _interopRequireDefault(_express);
	
	var _expressSession = __webpack_require__(35);
	
	var _expressSession2 = _interopRequireDefault(_expressSession);
	
	var _bodyParser = __webpack_require__(8);
	
	var _bodyParser2 = _interopRequireDefault(_bodyParser);
	
	var _mongodb = __webpack_require__(5);
	
	var _issue = __webpack_require__(9);
	
	var _issue2 = _interopRequireDefault(_issue);
	
	var _renderedPageRouter = __webpack_require__(10);
	
	var _renderedPageRouter2 = _interopRequireDefault(_renderedPageRouter);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	const app = (0, _express2.default)();
	app.use(_express2.default.static('static'));
	app.use(_bodyParser2.default.json());
	
	let db;
	
	app.use((0, _expressSession2.default)({ secret: 'h7e3f5s6', resave: false, saveUninitialized: true }));
	
	app.all('/api/*', (req, res, next) => {
	  if (req.method === 'DELETE' || req.method === 'POST' || req.method === 'PUT') {
	    if (!req.session || !req.session.user) {
	      res.status(403).send({
	        message: 'You are not authorized to perform the operation'
	      });
	    } else {
	      next();
	    }
	  } else {
	    next();
	  }
	});
	
	app.get('/api/issues', (req, res) => {
	  const filter = {};
	  if (req.query.status) filter.status = req.query.status;
	  if (req.query.effort_lte || req.query.effort_gte) filter.effort = {};
	  if (req.query.effort_lte) filter.effort.$lte = parseInt(req.query.effort_lte, 10);
	  if (req.query.effort_gte) filter.effort.$gte = parseInt(req.query.effort_gte, 10);
	  if (req.query.search) filter.$text = { $search: req.query.search };
	
	  if (req.query._summary === undefined) {
	    const offset = req.query._offset ? parseInt(req.query._offset, 10) : 0;
	    let limit = req.query._limit ? parseInt(req.query._limit, 10) : 20;
	    if (limit > 50) limit = 50;
	
	    const cursor = db.collection('issues').find(filter).sort({ _id: 1 }).skip(offset).limit(limit);
	
	    let totalCount;
	    cursor.count(false).then(result => {
	      totalCount = result;
	      return cursor.toArray();
	    }).then(issues => {
	      res.json({ metadata: { totalCount: totalCount }, records: issues });
	    }).catch(error => {
	      console.log(error);
	      res.status(500).json({ message: `Internal Server Error: ${error}` });
	    });
	  } else {
	    db.collection('issues').aggregate([{ $match: filter }, { $group: { _id: { owner: '$owner', status: '$status' }, count: { $sum: 1 } } }]).toArray().then(results => {
	      const stats = {};
	      results.forEach(result => {
	        if (!stats[result._id.owner]) stats[result._id.owner] = {};
	        stats[result._id.owner][result._id.status] = result.count;
	      });
	      res.json(stats);
	    }).catch(error => {
	      console.log(error);
	      res.status(500).json({ message: `Internal Server Error: ${error}` });
	    });
	  }
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
	
	app.get('/api/users/me', (req, res) => {
	  if (req.session && req.session.user) {
	    res.json(req.session.user);
	  } else {
	    res.json({ signedIn: false, name: '' });
	  }
	});
	
	app.post('/signin', (req, res) => {
	  if (!req.body.id_token) {
	    res.status(400).send({ code: 400, message: 'Missing Token.' });
	    return;
	  }
	  fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${req.body.id_token}`).then(response => {
	    if (!response.ok) response.json().then(error => Promise.reject(error));
	    response.json().then(data => {
	      req.session.user = {
	        signedIn: true, name: data.given_name
	      };
	      res.json(req.session.user);
	    });
	  }).catch(error => {
	    console.log(error);
	    res.status(500).json({ message: `Internal Server Error: ${error}` });
	  });
	});
	
	app.post('/signout', (req, res) => {
	  if (req.session) req.session.destroy();
	  res.json({ status: 'ok' });
	});
	
	app.use('/', _renderedPageRouter2.default);
	
	function setDb(newDb) {
	  db = newDb;
	}
	
	exports.app = app;
	exports.setDb = setDb;

/***/ }),

/***/ 35:
/***/ (function(module, exports) {

	module.exports = require("express-session");

/***/ })

};
//# sourceMappingURL=0.88bb062a582bef268a17.hot-update.js.map