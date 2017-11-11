webpackJsonp([0],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(1);
	
	var _react = __webpack_require__(326);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(362);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _reactRouter = __webpack_require__(509);
	
	var _Routes = __webpack_require__(572);
	
	var _Routes2 = _interopRequireDefault(_Routes);
	
	var _ContextWrapper = __webpack_require__(854);
	
	var _ContextWrapper2 = _interopRequireDefault(_ContextWrapper);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var WrappedApp = function WrappedApp(props) {
	  return _react2.default.createElement(
	    _ContextWrapper2.default,
	    props,
	    _react2.default.createElement(
	      _reactRouter.Router,
	      { history: _reactRouter.browserHistory },
	      _Routes2.default
	    )
	  );
	};
	
	var contentNode = document.getElementById('contents');
	
	_reactDom2.default.render(_react2.default.createElement(WrappedApp, { initialState: window.__INITIAL_STATE__ }), contentNode);
	
	if (false) {
	  module.hot.accept();
	}

/***/ }),

/***/ 572:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(326);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(509);
	
	var _App = __webpack_require__(573);
	
	var _App2 = _interopRequireDefault(_App);
	
	var _IssueList = __webpack_require__(846);
	
	var _IssueList2 = _interopRequireDefault(_IssueList);
	
	var _IssueEdit = __webpack_require__(850);
	
	var _IssueEdit2 = _interopRequireDefault(_IssueEdit);
	
	var _IssueReport = __webpack_require__(853);
	
	var _IssueReport2 = _interopRequireDefault(_IssueReport);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var NoMatch = function NoMatch() {
	  return _react2.default.createElement(
	    'p',
	    null,
	    'Page Not Found'
	  );
	};
	
	exports.default = _react2.default.createElement(
	  _reactRouter.Route,
	  { path: '/', component: _App2.default },
	  _react2.default.createElement(_reactRouter.IndexRedirect, { to: '/issues' }),
	  _react2.default.createElement(_reactRouter.Route, { path: 'issues', component: (0, _reactRouter.withRouter)(_IssueList2.default) }),
	  _react2.default.createElement(_reactRouter.Route, { path: 'issues/:id', component: _IssueEdit2.default }),
	  _react2.default.createElement(_reactRouter.Route, { path: 'reports', component: (0, _reactRouter.withRouter)(_IssueReport2.default) }),
	  _react2.default.createElement(_reactRouter.Route, { path: '*', component: NoMatch })
	);

/***/ }),

/***/ 573:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	__webpack_require__(1);
	
	var _react = __webpack_require__(326);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Header = __webpack_require__(574);
	
	var _Header2 = _interopRequireDefault(_Header);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var App = function App(props) {
	  return _react2.default.createElement(
	    'div',
	    null,
	    _react2.default.createElement(_Header2.default, null),
	    _react2.default.createElement(
	      'div',
	      { className: 'container-fluid' },
	      props.children,
	      _react2.default.createElement('hr', null),
	      _react2.default.createElement(
	        'h5',
	        null,
	        _react2.default.createElement(
	          'small',
	          null,
	          'Full source code available at this ',
	          _react2.default.createElement(
	            'a',
	            { href: 'https://github.com/vasansr/pro-mern-stack' },
	            'GitHub repository'
	          ),
	          '.'
	        )
	      )
	    )
	  );
	};
	
	App.propTypes = {
	  children: _react2.default.PropTypes.object.isRequired
	};
	
	exports.default = App;

/***/ }),

/***/ 574:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(326);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactBootstrap = __webpack_require__(575);
	
	var _reactRouterBootstrap = __webpack_require__(827);
	
	var _reactRouter = __webpack_require__(509);
	
	var _reactSelect = __webpack_require__(830);
	
	var _reactSelect2 = _interopRequireDefault(_reactSelect);
	
	var _IssueAddNavItem = __webpack_require__(843);
	
	var _IssueAddNavItem2 = _interopRequireDefault(_IssueAddNavItem);
	
	var _withToast = __webpack_require__(844);
	
	var _withToast2 = _interopRequireDefault(_withToast);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Header = function Header(props) {
	  function searchIssues(input) {
	    var _this = this;
	
	    if (input.length < 2) return Promise.resolve({ options: [] });
	
	    return fetch('/api/issues?search=' + input).then(function (response) {
	      if (!response.ok) return response.json().then(function (error) {
	        return Promise.reject(error);
	      });
	      return response.json().then(function (data) {
	        var options = data.records.map(function (issue) {
	          return {
	            value: issue._id,
	            label: issue._id.substr(-4) + ': ' + issue.title
	          };
	        });
	        return { options: options };
	      }).catch(function (error) {
	        _this.props.showError('Error fetching data from server: ' + error);
	      });
	    });
	  }
	
	  function filterOptions(options) {
	    return options;
	  }
	
	  function selectIssue(item) {
	    if (item) props.router.push('/issues/' + item.value);
	  }
	
	  return _react2.default.createElement(
	    _reactBootstrap.Navbar,
	    { fluid: true },
	    _react2.default.createElement(
	      _reactBootstrap.Col,
	      { sm: 5 },
	      _react2.default.createElement(
	        _reactBootstrap.Navbar.Header,
	        null,
	        _react2.default.createElement(
	          _reactBootstrap.Navbar.Brand,
	          null,
	          'Issue Tracker'
	        )
	      ),
	      _react2.default.createElement(
	        _reactBootstrap.Nav,
	        null,
	        _react2.default.createElement(
	          _reactRouterBootstrap.LinkContainer,
	          { to: '/issues' },
	          _react2.default.createElement(
	            _reactBootstrap.NavItem,
	            null,
	            'Issues'
	          )
	        ),
	        _react2.default.createElement(
	          _reactRouterBootstrap.LinkContainer,
	          { to: '/reports' },
	          _react2.default.createElement(
	            _reactBootstrap.NavItem,
	            null,
	            'Reports'
	          )
	        )
	      )
	    ),
	    _react2.default.createElement(
	      _reactBootstrap.Col,
	      { sm: 4 },
	      _react2.default.createElement(
	        'div',
	        { style: { paddingTop: 8 } },
	        _react2.default.createElement(_reactSelect2.default.Async, {
	          instanceId: 'search', placeholder: 'Search ...', autoload: false, cache: false,
	          loadOptions: searchIssues, filterOptions: filterOptions, onChange: selectIssue
	        })
	      )
	    ),
	    _react2.default.createElement(
	      _reactBootstrap.Col,
	      { sm: 3 },
	      _react2.default.createElement(
	        _reactBootstrap.Nav,
	        { pullRight: true },
	        _react2.default.createElement(_IssueAddNavItem2.default, { showError: props.showError }),
	        _react2.default.createElement(
	          _reactBootstrap.NavDropdown,
	          { id: 'user-dropdown', title: _react2.default.createElement(_reactBootstrap.Glyphicon, { glyph: 'option-horizontal' }), noCaret: true },
	          _react2.default.createElement(
	            _reactBootstrap.MenuItem,
	            null,
	            'Logout'
	          )
	        )
	      )
	    )
	  );
	};
	
	Header.propTypes = {
	  showError: _react2.default.PropTypes.func.isRequired,
	  router: _react2.default.PropTypes.object
	};
	
	exports.default = (0, _reactRouter.withRouter)((0, _withToast2.default)(Header));

/***/ }),

/***/ 843:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(326);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(509);
	
	var _reactBootstrap = __webpack_require__(575);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var IssueAddNavItem = function (_React$Component) {
	  _inherits(IssueAddNavItem, _React$Component);
	
	  function IssueAddNavItem(props) {
	    _classCallCheck(this, IssueAddNavItem);
	
	    var _this = _possibleConstructorReturn(this, (IssueAddNavItem.__proto__ || Object.getPrototypeOf(IssueAddNavItem)).call(this, props));
	
	    _this.state = {
	      showing: false
	    };
	    _this.showModal = _this.showModal.bind(_this);
	    _this.hideModal = _this.hideModal.bind(_this);
	    _this.submit = _this.submit.bind(_this);
	    return _this;
	  }
	
	  _createClass(IssueAddNavItem, [{
	    key: 'showModal',
	    value: function showModal() {
	      this.setState({ showing: true });
	    }
	  }, {
	    key: 'hideModal',
	    value: function hideModal() {
	      this.setState({ showing: false });
	    }
	  }, {
	    key: 'submit',
	    value: function submit(e) {
	      var _this2 = this;
	
	      e.preventDefault();
	      this.hideModal();
	      var form = document.forms.issueAdd;
	      var newIssue = {
	        owner: form.owner.value, title: form.title.value,
	        status: 'New', created: new Date()
	      };
	      fetch('/api/issues', {
	        method: 'POST',
	        headers: { 'Content-Type': 'application/json' },
	        body: JSON.stringify(newIssue)
	      }).then(function (response) {
	        if (response.ok) {
	          response.json().then(function (updatedIssue) {
	            _this2.props.router.push('/issues/' + updatedIssue._id);
	          });
	        } else {
	          response.json().then(function (error) {
	            _this2.props.showError('Failed to add issue: ' + error.message);
	          });
	        }
	      }).catch(function (err) {
	        _this2.props.showError('Error in sending data to server: ' + err.message);
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        _reactBootstrap.NavItem,
	        { onClick: this.showModal },
	        _react2.default.createElement(_reactBootstrap.Glyphicon, { glyph: 'plus' }),
	        ' Create Issue',
	        _react2.default.createElement(
	          _reactBootstrap.Modal,
	          { keyboard: true, show: this.state.showing, onHide: this.hideModal },
	          _react2.default.createElement(
	            _reactBootstrap.Modal.Header,
	            { closeButton: true },
	            _react2.default.createElement(
	              _reactBootstrap.Modal.Title,
	              null,
	              'Create Issue'
	            )
	          ),
	          _react2.default.createElement(
	            _reactBootstrap.Modal.Body,
	            null,
	            _react2.default.createElement(
	              _reactBootstrap.Form,
	              { name: 'issueAdd' },
	              _react2.default.createElement(
	                _reactBootstrap.FormGroup,
	                null,
	                _react2.default.createElement(
	                  _reactBootstrap.ControlLabel,
	                  null,
	                  'Title'
	                ),
	                _react2.default.createElement(_reactBootstrap.FormControl, { name: 'title', autoFocus: true })
	              ),
	              _react2.default.createElement(
	                _reactBootstrap.FormGroup,
	                null,
	                _react2.default.createElement(
	                  _reactBootstrap.ControlLabel,
	                  null,
	                  'Owner'
	                ),
	                _react2.default.createElement(_reactBootstrap.FormControl, { name: 'owner' })
	              )
	            )
	          ),
	          _react2.default.createElement(
	            _reactBootstrap.Modal.Footer,
	            null,
	            _react2.default.createElement(
	              _reactBootstrap.ButtonToolbar,
	              null,
	              _react2.default.createElement(
	                _reactBootstrap.Button,
	                { type: 'button', bsStyle: 'primary', onClick: this.submit },
	                'Submit'
	              ),
	              _react2.default.createElement(
	                _reactBootstrap.Button,
	                { bsStyle: 'link', onClick: this.hideModal },
	                'Cancel'
	              )
	            )
	          )
	        )
	      );
	    }
	  }]);
	
	  return IssueAddNavItem;
	}(_react2.default.Component);
	
	IssueAddNavItem.propTypes = {
	  router: _react2.default.PropTypes.object,
	  showError: _react2.default.PropTypes.func.isRequired
	};
	
	exports.default = (0, _reactRouter.withRouter)(IssueAddNavItem);

/***/ }),

/***/ 844:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.default = withToast;
	
	var _react = __webpack_require__(326);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Toast = __webpack_require__(845);
	
	var _Toast2 = _interopRequireDefault(_Toast);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function withToast(OriginalComponent) {
	  return function (_React$Component) {
	    _inherits(WithToast, _React$Component);
	
	    function WithToast(props) {
	      _classCallCheck(this, WithToast);
	
	      var _this = _possibleConstructorReturn(this, (WithToast.__proto__ || Object.getPrototypeOf(WithToast)).call(this, props));
	
	      _this.state = {
	        toastVisible: false, toastMessage: '', toastType: 'success'
	      };
	      _this.showSuccess = _this.showSuccess.bind(_this);
	      _this.showError = _this.showError.bind(_this);
	      _this.dismissToast = _this.dismissToast.bind(_this);
	      return _this;
	    }
	
	    _createClass(WithToast, [{
	      key: 'showSuccess',
	      value: function showSuccess(message) {
	        this.setState({ toastVisible: true, toastMessage: message, toastType: 'success' });
	      }
	    }, {
	      key: 'showError',
	      value: function showError(message) {
	        this.setState({ toastVisible: true, toastMessage: message, toastType: 'danger' });
	      }
	    }, {
	      key: 'dismissToast',
	      value: function dismissToast() {
	        this.setState({ toastVisible: false });
	      }
	    }, {
	      key: 'render',
	      value: function render() {
	        return _react2.default.createElement(
	          'div',
	          null,
	          _react2.default.createElement(OriginalComponent, _extends({
	            showError: this.showError, showSuccess: this.showSuccess }, this.props)),
	          _react2.default.createElement(_Toast2.default, {
	            showing: this.state.toastVisible, message: this.state.toastMessage,
	            onDismiss: this.dismissToast, bsStyle: this.state.toastType
	          })
	        );
	      }
	    }]);
	
	    return WithToast;
	  }(_react2.default.Component);
	}

/***/ }),

/***/ 845:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(326);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactBootstrap = __webpack_require__(575);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Toast = function (_React$Component) {
	  _inherits(Toast, _React$Component);
	
	  function Toast() {
	    _classCallCheck(this, Toast);
	
	    return _possibleConstructorReturn(this, (Toast.__proto__ || Object.getPrototypeOf(Toast)).apply(this, arguments));
	  }
	
	  _createClass(Toast, [{
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate() {
	      if (this.props.showing) {
	        clearTimeout(this.dismissTimer);
	        this.dismissTimer = setTimeout(this.props.onDismiss, 5000);
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      clearTimeout(this.dismissTimer);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        _reactBootstrap.Collapse,
	        { 'in': this.props.showing },
	        _react2.default.createElement(
	          'div',
	          { style: { position: 'fixed', top: 30, left: 0, right: 0, textAlign: 'center' } },
	          _react2.default.createElement(
	            _reactBootstrap.Alert,
	            {
	              style: { display: 'inline-block', width: 500 }, bsStyle: this.props.bsStyle,
	              onDismiss: this.props.onDismiss
	            },
	            this.props.message
	          )
	        )
	      );
	    }
	  }]);
	
	  return Toast;
	}(_react2.default.Component);
	
	exports.default = Toast;
	
	
	Toast.propTypes = {
	  showing: _react2.default.PropTypes.bool.isRequired,
	  onDismiss: _react2.default.PropTypes.func.isRequired,
	  bsStyle: _react2.default.PropTypes.string,
	  message: _react2.default.PropTypes.any.isRequired
	};
	
	Toast.defaultProps = {
	  bsStyle: 'success'
	};

/***/ }),

/***/ 846:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(326);
	
	var _react2 = _interopRequireDefault(_react);
	
	__webpack_require__(847);
	
	var _reactRouter = __webpack_require__(509);
	
	var _reactBootstrap = __webpack_require__(575);
	
	var _IssueFilter = __webpack_require__(849);
	
	var _IssueFilter2 = _interopRequireDefault(_IssueFilter);
	
	var _withToast = __webpack_require__(844);
	
	var _withToast2 = _interopRequireDefault(_withToast);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var IssueRow = function IssueRow(props) {
	  function onDeleteClick() {
	    props.deleteIssue(props.issue._id);
	  }
	
	  return _react2.default.createElement(
	    'tr',
	    null,
	    _react2.default.createElement(
	      'td',
	      null,
	      _react2.default.createElement(
	        _reactRouter.Link,
	        { to: '/issues/' + props.issue._id },
	        props.issue._id.substr(-4)
	      )
	    ),
	    _react2.default.createElement(
	      'td',
	      null,
	      props.issue.status
	    ),
	    _react2.default.createElement(
	      'td',
	      null,
	      props.issue.owner
	    ),
	    _react2.default.createElement(
	      'td',
	      null,
	      props.issue.created.toDateString()
	    ),
	    _react2.default.createElement(
	      'td',
	      null,
	      props.issue.effort
	    ),
	    _react2.default.createElement(
	      'td',
	      null,
	      props.issue.completionDate ? props.issue.completionDate.toDateString() : ''
	    ),
	    _react2.default.createElement(
	      'td',
	      null,
	      props.issue.title
	    ),
	    _react2.default.createElement(
	      'td',
	      null,
	      _react2.default.createElement(
	        _reactBootstrap.Button,
	        { bsSize: 'xsmall', onClick: onDeleteClick },
	        _react2.default.createElement(_reactBootstrap.Glyphicon, { glyph: 'trash' })
	      )
	    )
	  );
	};
	
	IssueRow.propTypes = {
	  issue: _react2.default.PropTypes.object.isRequired,
	  deleteIssue: _react2.default.PropTypes.func.isRequired
	};
	
	function IssueTable(props) {
	  var issueRows = props.issues.map(function (issue) {
	    return _react2.default.createElement(IssueRow, { key: issue._id, issue: issue, deleteIssue: props.deleteIssue });
	  });
	  return _react2.default.createElement(
	    _reactBootstrap.Table,
	    { bordered: true, condensed: true, hover: true, responsive: true },
	    _react2.default.createElement(
	      'thead',
	      null,
	      _react2.default.createElement(
	        'tr',
	        null,
	        _react2.default.createElement(
	          'th',
	          null,
	          'Id'
	        ),
	        _react2.default.createElement(
	          'th',
	          null,
	          'Status'
	        ),
	        _react2.default.createElement(
	          'th',
	          null,
	          'Owner'
	        ),
	        _react2.default.createElement(
	          'th',
	          null,
	          'Created'
	        ),
	        _react2.default.createElement(
	          'th',
	          null,
	          'Effort'
	        ),
	        _react2.default.createElement(
	          'th',
	          null,
	          'Completion Date'
	        ),
	        _react2.default.createElement(
	          'th',
	          null,
	          'Title'
	        ),
	        _react2.default.createElement('th', null)
	      )
	    ),
	    _react2.default.createElement(
	      'tbody',
	      null,
	      issueRows
	    )
	  );
	}
	
	IssueTable.propTypes = {
	  issues: _react2.default.PropTypes.array.isRequired,
	  deleteIssue: _react2.default.PropTypes.func.isRequired
	};
	
	var PAGE_SIZE = 10;
	
	var IssueList = function (_React$Component) {
	  _inherits(IssueList, _React$Component);
	
	  _createClass(IssueList, null, [{
	    key: 'dataFetcher',
	    value: function dataFetcher(_ref) {
	      var urlBase = _ref.urlBase,
	          location = _ref.location;
	
	      var query = Object.assign({}, location.query);
	      var pageStr = query._page;
	      if (pageStr) {
	        delete query._page;
	        query._offset = (parseInt(pageStr, 10) - 1) * PAGE_SIZE;
	      }
	      query._limit = PAGE_SIZE;
	      var search = Object.keys(query).map(function (k) {
	        return k + '=' + query[k];
	      }).join('&');
	      return fetch((urlBase || '') + '/api/issues?' + search).then(function (response) {
	        if (!response.ok) return response.json().then(function (error) {
	          return Promise.reject(error);
	        });
	        return response.json().then(function (data) {
	          return { IssueList: data };
	        });
	      });
	    }
	  }]);
	
	  function IssueList(props, context) {
	    _classCallCheck(this, IssueList);
	
	    var _this = _possibleConstructorReturn(this, (IssueList.__proto__ || Object.getPrototypeOf(IssueList)).call(this, props, context));
	
	    var data = context.initialState.IssueList ? context.initialState.IssueList : { metadata: { totalCount: 0 }, records: [] };
	    var issues = data.records;
	    issues.forEach(function (issue) {
	      issue.created = new Date(issue.created);
	      if (issue.completionDate) {
	        issue.completionDate = new Date(issue.completionDate);
	      }
	    });
	    _this.state = {
	      issues: issues,
	      totalCount: data.metadata.totalCount
	    };
	
	    _this.setFilter = _this.setFilter.bind(_this);
	    _this.selectPage = _this.selectPage.bind(_this);
	    _this.deleteIssue = _this.deleteIssue.bind(_this);
	    return _this;
	  }
	
	  _createClass(IssueList, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.loadData();
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate(prevProps) {
	      var oldQuery = prevProps.location.query;
	      var newQuery = this.props.location.query;
	      if (oldQuery.status === newQuery.status && oldQuery.effort_gte === newQuery.effort_gte && oldQuery.effort_lte === newQuery.effort_lte && oldQuery._page === newQuery._page) {
	        return;
	      }
	      this.loadData();
	    }
	  }, {
	    key: 'setFilter',
	    value: function setFilter(query) {
	      this.props.router.push({ pathname: this.props.location.pathname, query: query });
	    }
	  }, {
	    key: 'selectPage',
	    value: function selectPage(eventKey) {
	      var query = Object.assign(this.props.location.query, { _page: eventKey });
	      this.props.router.push({ pathname: this.props.location.pathname, query: query });
	    }
	  }, {
	    key: 'loadData',
	    value: function loadData() {
	      var _this2 = this;
	
	      IssueList.dataFetcher({ location: this.props.location }).then(function (data) {
	        var issues = data.IssueList.records;
	        issues.forEach(function (issue) {
	          issue.created = new Date(issue.created);
	          if (issue.completionDate) {
	            issue.completionDate = new Date(issue.completionDate);
	          }
	        });
	        _this2.setState({ issues: issues, totalCount: data.IssueList.metadata.totalCount });
	      }).catch(function (err) {
	        _this2.props.showError('Error in fetching data from server: ' + err);
	      });
	    }
	  }, {
	    key: 'deleteIssue',
	    value: function deleteIssue(id) {
	      var _this3 = this;
	
	      fetch('/api/issues/' + id, { method: 'DELETE' }).then(function (response) {
	        if (!response.ok) _this3.props.showError('Failed to delete issue');else _this3.loadData();
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          _reactBootstrap.Panel,
	          { collapsible: true, header: 'Filter' },
	          _react2.default.createElement(_IssueFilter2.default, { setFilter: this.setFilter, initFilter: this.props.location.query })
	        ),
	        _react2.default.createElement(_reactBootstrap.Pagination, {
	          items: Math.ceil(this.state.totalCount / PAGE_SIZE),
	          activePage: parseInt(this.props.location.query._page || '1', 10),
	          onSelect: this.selectPage, maxButtons: 7, next: true, prev: true, boundaryLinks: true
	        }),
	        _react2.default.createElement(IssueTable, { issues: this.state.issues, deleteIssue: this.deleteIssue })
	      );
	    }
	  }]);
	
	  return IssueList;
	}(_react2.default.Component);
	
	IssueList.propTypes = {
	  location: _react2.default.PropTypes.object.isRequired,
	  router: _react2.default.PropTypes.object,
	  showError: _react2.default.PropTypes.func.isRequired
	};
	
	IssueList.contextTypes = {
	  initialState: _react2.default.PropTypes.object
	};
	
	var IssueListWithToast = (0, _withToast2.default)(IssueList);
	IssueListWithToast.dataFetcher = IssueList.dataFetcher;
	
	exports.default = IssueListWithToast;

/***/ }),

/***/ 849:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(326);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactBootstrap = __webpack_require__(575);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var IssueFilter = function (_React$Component) {
	  _inherits(IssueFilter, _React$Component);
	
	  function IssueFilter(props) {
	    _classCallCheck(this, IssueFilter);
	
	    var _this = _possibleConstructorReturn(this, (IssueFilter.__proto__ || Object.getPrototypeOf(IssueFilter)).call(this, props));
	
	    _this.state = {
	      status: props.initFilter.status || '',
	      effort_gte: props.initFilter.effort_gte || '',
	      effort_lte: props.initFilter.effort_lte || '',
	      changed: false
	    };
	    _this.onChangeStatus = _this.onChangeStatus.bind(_this);
	    _this.onChangeEffortGte = _this.onChangeEffortGte.bind(_this);
	    _this.onChangeEffortLte = _this.onChangeEffortLte.bind(_this);
	    _this.applyFilter = _this.applyFilter.bind(_this);
	    _this.resetFilter = _this.resetFilter.bind(_this);
	    _this.clearFilter = _this.clearFilter.bind(_this);
	    return _this;
	  }
	
	  _createClass(IssueFilter, [{
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(newProps) {
	      this.setState({
	        status: newProps.initFilter.status || '',
	        effort_gte: newProps.initFilter.effort_gte || '',
	        effort_lte: newProps.initFilter.effort_lte || '',
	        changed: false
	      });
	    }
	  }, {
	    key: 'onChangeStatus',
	    value: function onChangeStatus(e) {
	      this.setState({ status: e.target.value, changed: true });
	    }
	  }, {
	    key: 'onChangeEffortGte',
	    value: function onChangeEffortGte(e) {
	      var effortString = e.target.value;
	      if (effortString.match(/^\d*$/)) {
	        this.setState({ effort_gte: e.target.value, changed: true });
	      }
	    }
	  }, {
	    key: 'onChangeEffortLte',
	    value: function onChangeEffortLte(e) {
	      var effortString = e.target.value;
	      if (effortString.match(/^\d*$/)) {
	        this.setState({ effort_lte: e.target.value, changed: true });
	      }
	    }
	  }, {
	    key: 'applyFilter',
	    value: function applyFilter() {
	      var newFilter = {};
	      if (this.state.status) newFilter.status = this.state.status;
	      if (this.state.effort_gte) newFilter.effort_gte = this.state.effort_gte;
	      if (this.state.effort_lte) newFilter.effort_lte = this.state.effort_lte;
	      this.props.setFilter(newFilter);
	    }
	  }, {
	    key: 'clearFilter',
	    value: function clearFilter() {
	      this.props.setFilter({});
	    }
	  }, {
	    key: 'resetFilter',
	    value: function resetFilter() {
	      this.setState({
	        status: this.props.initFilter.status || '',
	        effort_gte: this.props.initFilter.effort_gte || '',
	        effort_lte: this.props.initFilter.effort_lte || '',
	        changed: false
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        _reactBootstrap.Row,
	        null,
	        _react2.default.createElement(
	          _reactBootstrap.Col,
	          { xs: 6, sm: 4, md: 3, lg: 2 },
	          _react2.default.createElement(
	            _reactBootstrap.FormGroup,
	            null,
	            _react2.default.createElement(
	              _reactBootstrap.ControlLabel,
	              null,
	              'Status'
	            ),
	            _react2.default.createElement(
	              _reactBootstrap.FormControl,
	              {
	                componentClass: 'select', value: this.state.status,
	                onChange: this.onChangeStatus
	              },
	              _react2.default.createElement(
	                'option',
	                { value: '' },
	                '(Any)'
	              ),
	              _react2.default.createElement(
	                'option',
	                { value: 'New' },
	                'New'
	              ),
	              _react2.default.createElement(
	                'option',
	                { value: 'Open' },
	                'Open'
	              ),
	              _react2.default.createElement(
	                'option',
	                { value: 'Assigned' },
	                'Assigned'
	              ),
	              _react2.default.createElement(
	                'option',
	                { value: 'Fixed' },
	                'Fixed'
	              ),
	              _react2.default.createElement(
	                'option',
	                { value: 'Verified' },
	                'Verified'
	              ),
	              _react2.default.createElement(
	                'option',
	                { value: 'Closed' },
	                'Closed'
	              )
	            )
	          )
	        ),
	        _react2.default.createElement(
	          _reactBootstrap.Col,
	          { xs: 6, sm: 4, md: 3, lg: 2 },
	          _react2.default.createElement(
	            _reactBootstrap.FormGroup,
	            null,
	            _react2.default.createElement(
	              _reactBootstrap.ControlLabel,
	              null,
	              'Effort'
	            ),
	            _react2.default.createElement(
	              _reactBootstrap.InputGroup,
	              null,
	              _react2.default.createElement(_reactBootstrap.FormControl, { value: this.state.effort_gte, onChange: this.onChangeEffortGte }),
	              _react2.default.createElement(
	                _reactBootstrap.InputGroup.Addon,
	                null,
	                '-'
	              ),
	              _react2.default.createElement(_reactBootstrap.FormControl, { value: this.state.effort_lte, onChange: this.onChangeEffortLte })
	            )
	          )
	        ),
	        _react2.default.createElement(
	          _reactBootstrap.Col,
	          { xs: 6, sm: 4, md: 3, lg: 2 },
	          _react2.default.createElement(
	            _reactBootstrap.FormGroup,
	            null,
	            _react2.default.createElement(
	              _reactBootstrap.ControlLabel,
	              null,
	              '\xA0'
	            ),
	            _react2.default.createElement(
	              _reactBootstrap.ButtonToolbar,
	              null,
	              _react2.default.createElement(
	                _reactBootstrap.Button,
	                { bsStyle: 'primary', onClick: this.applyFilter },
	                'Apply'
	              ),
	              _react2.default.createElement(
	                _reactBootstrap.Button,
	                { onClick: this.resetFilter, disabled: !this.state.changed },
	                'Reset'
	              ),
	              _react2.default.createElement(
	                _reactBootstrap.Button,
	                { onClick: this.clearFilter },
	                'Clear'
	              )
	            )
	          )
	        )
	      );
	    }
	  }]);
	
	  return IssueFilter;
	}(_react2.default.Component);
	
	exports.default = IssueFilter;
	
	
	IssueFilter.propTypes = {
	  setFilter: _react2.default.PropTypes.func.isRequired,
	  initFilter: _react2.default.PropTypes.object.isRequired
	};

/***/ }),

/***/ 850:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(326);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactBootstrap = __webpack_require__(575);
	
	var _reactRouterBootstrap = __webpack_require__(827);
	
	var _NumInput = __webpack_require__(851);
	
	var _NumInput2 = _interopRequireDefault(_NumInput);
	
	var _DateInput = __webpack_require__(852);
	
	var _DateInput2 = _interopRequireDefault(_DateInput);
	
	var _withToast = __webpack_require__(844);
	
	var _withToast2 = _interopRequireDefault(_withToast);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var IssueEdit = function (_React$Component) {
	  _inherits(IssueEdit, _React$Component);
	
	  _createClass(IssueEdit, null, [{
	    key: 'dataFetcher',
	    value: function dataFetcher(_ref) {
	      var params = _ref.params,
	          urlBase = _ref.urlBase;
	
	      return fetch((urlBase || '') + '/api/issues/' + params.id).then(function (response) {
	        if (!response.ok) return response.json().then(function (error) {
	          return Promise.reject(error);
	        });
	        return response.json().then(function (data) {
	          return { IssueEdit: data };
	        });
	      });
	    }
	  }]);
	
	  function IssueEdit(props, context) {
	    _classCallCheck(this, IssueEdit);
	
	    var _this = _possibleConstructorReturn(this, (IssueEdit.__proto__ || Object.getPrototypeOf(IssueEdit)).call(this, props, context));
	
	    var issue = void 0;
	    if (context.initialState.IssueEdit) {
	      issue = context.initialState.IssueEdit;
	      issue.created = new Date(issue.created);
	      issue.completionDate = issue.completionDate != null ? new Date(issue.completionDate) : null;
	    } else {
	      issue = {
	        _id: '', title: '', status: '', owner: '', effort: null,
	        completionDate: null, created: null
	      };
	    }
	    _this.state = {
	      issue: issue,
	      invalidFields: {}, showingValidation: false
	    };
	    _this.dismissValidation = _this.dismissValidation.bind(_this);
	    _this.showValidation = _this.showValidation.bind(_this);
	    _this.onChange = _this.onChange.bind(_this);
	    _this.onValidityChange = _this.onValidityChange.bind(_this);
	    _this.onSubmit = _this.onSubmit.bind(_this);
	    return _this;
	  }
	
	  _createClass(IssueEdit, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.loadData();
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate(prevProps) {
	      if (prevProps.params.id !== this.props.params.id) {
	        this.loadData();
	      }
	    }
	  }, {
	    key: 'onChange',
	    value: function onChange(event, convertedValue) {
	      var issue = Object.assign({}, this.state.issue);
	      var value = convertedValue !== undefined ? convertedValue : event.target.value;
	      issue[event.target.name] = value;
	      this.setState({ issue: issue });
	    }
	  }, {
	    key: 'onValidityChange',
	    value: function onValidityChange(event, valid) {
	      var invalidFields = Object.assign({}, this.state.invalidFields);
	      if (!valid) {
	        invalidFields[event.target.name] = true;
	      } else {
	        delete invalidFields[event.target.name];
	      }
	      this.setState({ invalidFields: invalidFields });
	    }
	  }, {
	    key: 'onSubmit',
	    value: function onSubmit(event) {
	      var _this2 = this;
	
	      event.preventDefault();
	      this.showValidation();
	
	      if (Object.keys(this.state.invalidFields).length !== 0) {
	        return;
	      }
	
	      fetch('/api/issues/' + this.props.params.id, {
	        method: 'PUT',
	        headers: { 'Content-Type': 'application/json' },
	        body: JSON.stringify(this.state.issue)
	      }).then(function (response) {
	        if (response.ok) {
	          response.json().then(function (updatedIssue) {
	            updatedIssue.created = new Date(updatedIssue.created);
	            if (updatedIssue.completionDate) {
	              updatedIssue.completionDate = new Date(updatedIssue.completionDate);
	            }
	            _this2.setState({ issue: updatedIssue });
	            _this2.props.showSuccess('Updated issue successfully.');
	          });
	        } else {
	          response.json().then(function (error) {
	            _this2.props.showError('Failed to update issue: ' + error.message);
	          });
	        }
	      }).catch(function (err) {
	        _this2.props.showError('Error in sending data to server: ' + err.message);
	      });
	    }
	  }, {
	    key: 'loadData',
	    value: function loadData() {
	      var _this3 = this;
	
	      IssueEdit.dataFetcher({ params: this.props.params }).then(function (data) {
	        var issue = data.IssueEdit;
	        issue.created = new Date(issue.created);
	        issue.completionDate = issue.completionDate != null ? new Date(issue.completionDate) : null;
	        _this3.setState({ issue: issue });
	      }).catch(function (err) {
	        _this3.props.showError('Error in fetching data from server: ' + err.message);
	      });
	    }
	  }, {
	    key: 'showValidation',
	    value: function showValidation() {
	      this.setState({ showingValidation: true });
	    }
	  }, {
	    key: 'dismissValidation',
	    value: function dismissValidation() {
	      this.setState({ showingValidation: false });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var issue = this.state.issue;
	      var validationMessage = null;
	      if (Object.keys(this.state.invalidFields).length !== 0 && this.state.showingValidation) {
	        validationMessage = _react2.default.createElement(
	          _reactBootstrap.Alert,
	          { bsStyle: 'danger', onDismiss: this.dismissValidation },
	          'Please correct invalid fields before submitting.'
	        );
	      }
	      return _react2.default.createElement(
	        _reactBootstrap.Panel,
	        { header: 'Edit Issue' },
	        _react2.default.createElement(
	          _reactBootstrap.Form,
	          { horizontal: true, onSubmit: this.onSubmit },
	          _react2.default.createElement(
	            _reactBootstrap.FormGroup,
	            null,
	            _react2.default.createElement(
	              _reactBootstrap.Col,
	              { componentClass: _reactBootstrap.ControlLabel, sm: 3 },
	              'ID'
	            ),
	            _react2.default.createElement(
	              _reactBootstrap.Col,
	              { sm: 9 },
	              _react2.default.createElement(
	                _reactBootstrap.FormControl.Static,
	                null,
	                issue._id
	              )
	            )
	          ),
	          _react2.default.createElement(
	            _reactBootstrap.FormGroup,
	            null,
	            _react2.default.createElement(
	              _reactBootstrap.Col,
	              { componentClass: _reactBootstrap.ControlLabel, sm: 3 },
	              'Created'
	            ),
	            _react2.default.createElement(
	              _reactBootstrap.Col,
	              { sm: 9 },
	              _react2.default.createElement(
	                _reactBootstrap.FormControl.Static,
	                null,
	                issue.created ? issue.created.toDateString() : ''
	              )
	            )
	          ),
	          _react2.default.createElement(
	            _reactBootstrap.FormGroup,
	            null,
	            _react2.default.createElement(
	              _reactBootstrap.Col,
	              { componentClass: _reactBootstrap.ControlLabel, sm: 3 },
	              'Status'
	            ),
	            _react2.default.createElement(
	              _reactBootstrap.Col,
	              { sm: 9 },
	              _react2.default.createElement(
	                _reactBootstrap.FormControl,
	                {
	                  componentClass: 'select', name: 'status', value: issue.status,
	                  onChange: this.onChange
	                },
	                _react2.default.createElement(
	                  'option',
	                  { value: 'New' },
	                  'New'
	                ),
	                _react2.default.createElement(
	                  'option',
	                  { value: 'Open' },
	                  'Open'
	                ),
	                _react2.default.createElement(
	                  'option',
	                  { value: 'Assigned' },
	                  'Assigned'
	                ),
	                _react2.default.createElement(
	                  'option',
	                  { value: 'Fixed' },
	                  'Fixed'
	                ),
	                _react2.default.createElement(
	                  'option',
	                  { value: 'Verified' },
	                  'Verified'
	                ),
	                _react2.default.createElement(
	                  'option',
	                  { value: 'Closed' },
	                  'Closed'
	                )
	              )
	            )
	          ),
	          _react2.default.createElement(
	            _reactBootstrap.FormGroup,
	            null,
	            _react2.default.createElement(
	              _reactBootstrap.Col,
	              { componentClass: _reactBootstrap.ControlLabel, sm: 3 },
	              'Owner'
	            ),
	            _react2.default.createElement(
	              _reactBootstrap.Col,
	              { sm: 9 },
	              _react2.default.createElement(_reactBootstrap.FormControl, { name: 'owner', value: issue.owner, onChange: this.onChange })
	            )
	          ),
	          _react2.default.createElement(
	            _reactBootstrap.FormGroup,
	            null,
	            _react2.default.createElement(
	              _reactBootstrap.Col,
	              { componentClass: _reactBootstrap.ControlLabel, sm: 3 },
	              'Effort'
	            ),
	            _react2.default.createElement(
	              _reactBootstrap.Col,
	              { sm: 9 },
	              _react2.default.createElement(_reactBootstrap.FormControl, {
	                componentClass: _NumInput2.default, name: 'effort',
	                value: issue.effort, onChange: this.onChange
	              })
	            )
	          ),
	          _react2.default.createElement(
	            _reactBootstrap.FormGroup,
	            { validationState: this.state.invalidFields.completionDate ? 'error' : null },
	            _react2.default.createElement(
	              _reactBootstrap.Col,
	              { componentClass: _reactBootstrap.ControlLabel, sm: 3 },
	              'Completion Date'
	            ),
	            _react2.default.createElement(
	              _reactBootstrap.Col,
	              { sm: 9 },
	              _react2.default.createElement(_reactBootstrap.FormControl, {
	                componentClass: _DateInput2.default, name: 'completionDate',
	                value: issue.completionDate, onChange: this.onChange,
	                onValidityChange: this.onValidityChange
	              }),
	              _react2.default.createElement(_reactBootstrap.FormControl.Feedback, null)
	            )
	          ),
	          _react2.default.createElement(
	            _reactBootstrap.FormGroup,
	            null,
	            _react2.default.createElement(
	              _reactBootstrap.Col,
	              { componentClass: _reactBootstrap.ControlLabel, sm: 3 },
	              'Title'
	            ),
	            _react2.default.createElement(
	              _reactBootstrap.Col,
	              { sm: 9 },
	              _react2.default.createElement(_reactBootstrap.FormControl, { name: 'title', value: issue.title, onChange: this.onChange })
	            )
	          ),
	          _react2.default.createElement(
	            _reactBootstrap.FormGroup,
	            null,
	            _react2.default.createElement(
	              _reactBootstrap.Col,
	              { smOffset: 3, sm: 6 },
	              _react2.default.createElement(
	                _reactBootstrap.ButtonToolbar,
	                null,
	                _react2.default.createElement(
	                  _reactBootstrap.Button,
	                  { bsStyle: 'primary', type: 'submit' },
	                  'Submit'
	                ),
	                _react2.default.createElement(
	                  _reactRouterBootstrap.LinkContainer,
	                  { to: '/issues' },
	                  _react2.default.createElement(
	                    _reactBootstrap.Button,
	                    { bsStyle: 'link' },
	                    'Back'
	                  )
	                )
	              )
	            )
	          ),
	          _react2.default.createElement(
	            _reactBootstrap.FormGroup,
	            null,
	            _react2.default.createElement(
	              _reactBootstrap.Col,
	              { smOffset: 3, sm: 9 },
	              validationMessage
	            )
	          )
	        )
	      );
	    }
	  }]);
	
	  return IssueEdit;
	}(_react2.default.Component);
	
	IssueEdit.propTypes = {
	  params: _react2.default.PropTypes.object.isRequired,
	  showSuccess: _react2.default.PropTypes.func.isRequired,
	  showError: _react2.default.PropTypes.func.isRequired
	};
	
	IssueEdit.contextTypes = {
	  initialState: _react2.default.PropTypes.object
	};
	
	var IssueEditWithToast = (0, _withToast2.default)(IssueEdit);
	IssueEditWithToast.dataFetcher = IssueEdit.dataFetcher;
	
	exports.default = IssueEditWithToast;

/***/ }),

/***/ 851:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(326);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var NumInput = function (_React$Component) {
	  _inherits(NumInput, _React$Component);
	
	  function NumInput(props) {
	    _classCallCheck(this, NumInput);
	
	    var _this = _possibleConstructorReturn(this, (NumInput.__proto__ || Object.getPrototypeOf(NumInput)).call(this, props));
	
	    _this.state = { value: _this.format(props.value) };
	    _this.onBlur = _this.onBlur.bind(_this);
	    _this.onChange = _this.onChange.bind(_this);
	    return _this;
	  }
	
	  _createClass(NumInput, [{
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(newProps) {
	      this.setState({ value: this.format(newProps.value) });
	    }
	  }, {
	    key: 'onBlur',
	    value: function onBlur(e) {
	      this.props.onChange(e, this.unformat(this.state.value));
	    }
	  }, {
	    key: 'onChange',
	    value: function onChange(e) {
	      if (e.target.value.match(/^\d*$/)) {
	        this.setState({ value: e.target.value });
	      }
	    }
	  }, {
	    key: 'format',
	    value: function format(num) {
	      return num != null ? num.toString() : '';
	    }
	  }, {
	    key: 'unformat',
	    value: function unformat(str) {
	      var val = parseInt(str, 10);
	      return isNaN(val) ? null : val;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement('input', _extends({
	        type: 'text' }, this.props, { value: this.state.value,
	        onBlur: this.onBlur, onChange: this.onChange
	      }));
	    }
	  }]);
	
	  return NumInput;
	}(_react2.default.Component);
	
	exports.default = NumInput;
	
	
	NumInput.propTypes = {
	  value: _react2.default.PropTypes.number,
	  onChange: _react2.default.PropTypes.func.isRequired
	};

/***/ }),

/***/ 852:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(326);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var DateInput = function (_React$Component) {
	  _inherits(DateInput, _React$Component);
	
	  function DateInput(props) {
	    _classCallCheck(this, DateInput);
	
	    var _this = _possibleConstructorReturn(this, (DateInput.__proto__ || Object.getPrototypeOf(DateInput)).call(this, props));
	
	    _this.state = { value: _this.editFormat(props.value), focused: false, valid: true };
	    _this.onFocus = _this.onFocus.bind(_this);
	    _this.onBlur = _this.onBlur.bind(_this);
	    _this.onChange = _this.onChange.bind(_this);
	    return _this;
	  }
	
	  _createClass(DateInput, [{
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(newProps) {
	      if (newProps.value !== this.props.value) {
	        this.setState({ value: this.editFormat(newProps.value) });
	      }
	    }
	  }, {
	    key: 'onFocus',
	    value: function onFocus() {
	      this.setState({ focused: true });
	    }
	  }, {
	    key: 'onBlur',
	    value: function onBlur(e) {
	      var value = this.unformat(this.state.value);
	      var valid = this.state.value === '' || value != null;
	      if (valid !== this.state.valid && this.props.onValidityChange) {
	        this.props.onValidityChange(e, valid);
	      }
	      this.setState({ focused: false, valid: valid });
	      if (valid) this.props.onChange(e, value);
	    }
	  }, {
	    key: 'onChange',
	    value: function onChange(e) {
	      if (e.target.value.match(/^[\d-]*$/)) {
	        this.setState({ value: e.target.value });
	      }
	    }
	  }, {
	    key: 'displayFormat',
	    value: function displayFormat(date) {
	      return date != null ? date.toDateString() : '';
	    }
	  }, {
	    key: 'editFormat',
	    value: function editFormat(date) {
	      return date != null ? date.toISOString().substr(0, 10) : '';
	    }
	  }, {
	    key: 'unformat',
	    value: function unformat(str) {
	      var val = new Date(str);
	      return isNaN(val.getTime()) ? null : val;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var value = this.state.focused || !this.state.valid ? this.state.value : this.displayFormat(this.props.value);
	      var childProps = Object.assign({}, this.props);
	      delete childProps.onValidityChange;
	      return _react2.default.createElement('input', _extends({
	        type: 'text' }, childProps, { value: value,
	        placeholder: this.state.focused ? 'yyyy-mm-dd' : null,
	        onFocus: this.onFocus, onBlur: this.onBlur, onChange: this.onChange
	      }));
	    }
	  }]);
	
	  return DateInput;
	}(_react2.default.Component);
	
	exports.default = DateInput;
	
	
	DateInput.propTypes = {
	  value: _react2.default.PropTypes.object,
	  onChange: _react2.default.PropTypes.func.isRequired,
	  onValidityChange: _react2.default.PropTypes.func,
	  name: _react2.default.PropTypes.string.isRequired
	};

/***/ }),

/***/ 853:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(326);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactBootstrap = __webpack_require__(575);
	
	var _IssueFilter = __webpack_require__(849);
	
	var _IssueFilter2 = _interopRequireDefault(_IssueFilter);
	
	var _withToast = __webpack_require__(844);
	
	var _withToast2 = _interopRequireDefault(_withToast);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var statuses = ['New', 'Open', 'Assigned', 'Fixed', 'Verified', 'Closed'];
	
	var StatRow = function StatRow(props) {
	  return _react2.default.createElement(
	    'tr',
	    null,
	    _react2.default.createElement(
	      'td',
	      null,
	      props.owner
	    ),
	    statuses.map(function (status, index) {
	      return _react2.default.createElement(
	        'td',
	        { key: index },
	        props.counts[status]
	      );
	    })
	  );
	};
	
	StatRow.propTypes = {
	  owner: _react2.default.PropTypes.string.isRequired,
	  counts: _react2.default.PropTypes.object.isRequired
	};
	
	var IssueReport = function (_React$Component) {
	  _inherits(IssueReport, _React$Component);
	
	  _createClass(IssueReport, null, [{
	    key: 'dataFetcher',
	    value: function dataFetcher(_ref) {
	      var urlBase = _ref.urlBase,
	          location = _ref.location;
	
	      var search = location.search ? location.search + '&_summary' : '?_summary';
	      return fetch((urlBase || '') + '/api/issues' + search).then(function (response) {
	        if (!response.ok) return response.json().then(function (error) {
	          return Promise.reject(error);
	        });
	        return response.json().then(function (data) {
	          return { IssueReport: data };
	        });
	      });
	    }
	  }]);
	
	  function IssueReport(props, context) {
	    _classCallCheck(this, IssueReport);
	
	    var _this = _possibleConstructorReturn(this, (IssueReport.__proto__ || Object.getPrototypeOf(IssueReport)).call(this, props, context));
	
	    var stats = context.initialState.IssueReport ? context.initialState.IssueReport : {};
	    _this.state = {
	      stats: stats
	    };
	    _this.setFilter = _this.setFilter.bind(_this);
	    return _this;
	  }
	
	  _createClass(IssueReport, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.loadData();
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate(prevProps) {
	      var oldQuery = prevProps.location.query;
	      var newQuery = this.props.location.query;
	      if (oldQuery.status === newQuery.status && oldQuery.effort_gte === newQuery.effort_gte && oldQuery.effort_lte === newQuery.effort_lte) {
	        return;
	      }
	      this.loadData();
	    }
	  }, {
	    key: 'setFilter',
	    value: function setFilter(query) {
	      this.props.router.push({ pathname: this.props.location.pathname, query: query });
	    }
	  }, {
	    key: 'loadData',
	    value: function loadData() {
	      var _this2 = this;
	
	      IssueReport.dataFetcher({ location: this.props.location }).then(function (data) {
	        _this2.setState({ stats: data.IssueReport });
	      }).catch(function (err) {
	        _this2.props.showError('Error in fetching data from server: ' + err);
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this3 = this;
	
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          _reactBootstrap.Panel,
	          { collapsible: true, header: 'Filter' },
	          _react2.default.createElement(_IssueFilter2.default, { setFilter: this.setFilter, initFilter: this.props.location.query })
	        ),
	        _react2.default.createElement(
	          _reactBootstrap.Table,
	          { bordered: true, condensed: true, hover: true, responsive: true },
	          _react2.default.createElement(
	            'thead',
	            null,
	            _react2.default.createElement(
	              'tr',
	              null,
	              _react2.default.createElement('th', null),
	              statuses.map(function (status, index) {
	                return _react2.default.createElement(
	                  'td',
	                  { key: index },
	                  status
	                );
	              })
	            )
	          ),
	          _react2.default.createElement(
	            'tbody',
	            null,
	            Object.keys(this.state.stats).map(function (owner, index) {
	              return _react2.default.createElement(StatRow, { key: index, owner: owner, counts: _this3.state.stats[owner] });
	            })
	          )
	        )
	      );
	    }
	  }]);
	
	  return IssueReport;
	}(_react2.default.Component);
	
	IssueReport.propTypes = {
	  location: _react2.default.PropTypes.object.isRequired,
	  router: _react2.default.PropTypes.object,
	  showError: _react2.default.PropTypes.func.isRequired
	};
	
	IssueReport.contextTypes = {
	  initialState: _react2.default.PropTypes.object
	};
	
	var IssueReportWithToast = (0, _withToast2.default)(IssueReport);
	IssueReportWithToast.dataFetcher = IssueReport.dataFetcher;
	
	exports.default = IssueReportWithToast;

/***/ }),

/***/ 854:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(326);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ContextWrapper = function (_React$Component) {
	  _inherits(ContextWrapper, _React$Component);
	
	  function ContextWrapper() {
	    _classCallCheck(this, ContextWrapper);
	
	    return _possibleConstructorReturn(this, (ContextWrapper.__proto__ || Object.getPrototypeOf(ContextWrapper)).apply(this, arguments));
	  }
	
	  _createClass(ContextWrapper, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      return { initialState: this.props.initialState };
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return this.props.children;
	    }
	  }]);
	
	  return ContextWrapper;
	}(_react2.default.Component);
	
	exports.default = ContextWrapper;
	
	
	ContextWrapper.childContextTypes = {
	  initialState: _react2.default.PropTypes.object
	};
	
	ContextWrapper.propTypes = {
	  children: _react2.default.PropTypes.object.isRequired,
	  initialState: _react2.default.PropTypes.object
	};

/***/ })

});
//# sourceMappingURL=app.bundle.js.map