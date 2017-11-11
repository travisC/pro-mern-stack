exports.id = 0;
exports.modules = {

/***/ 17:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(11);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactBootstrap = __webpack_require__(18);
	
	var _reactRouterBootstrap = __webpack_require__(19);
	
	var _reactRouter = __webpack_require__(13);
	
	var _reactSelect = __webpack_require__(20);
	
	var _reactSelect2 = _interopRequireDefault(_reactSelect);
	
	var _IssueAddNavItem = __webpack_require__(21);
	
	var _IssueAddNavItem2 = _interopRequireDefault(_IssueAddNavItem);
	
	var _SigninNavItem = __webpack_require__(34);
	
	var _SigninNavItem2 = _interopRequireDefault(_SigninNavItem);
	
	var _withToast = __webpack_require__(22);
	
	var _withToast2 = _interopRequireDefault(_withToast);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	const Header = props => {
	  function searchIssues(input) {
	    if (input.length < 2) return Promise.resolve({ options: [] });
	
	    return fetch(`/api/issues?search=${input}`).then(response => {
	      if (!response.ok) return response.json().then(error => Promise.reject(error));
	      return response.json().then(data => {
	        const options = data.records.map(issue => ({
	          value: issue._id,
	          label: `${issue._id.substr(-4)}: ${issue.title}`
	        }));
	        return { options: options };
	      }).catch(error => {
	        this.props.showError(`Error fetching data from server: ${error}`);
	      });
	    });
	  }
	
	  function filterOptions(options) {
	    return options;
	  }
	
	  function selectIssue(item) {
	    if (item) props.router.push(`/issues/${item.value}`);
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
	        _react2.default.createElement(_SigninNavItem2.default, {
	          user: props.user, onSignin: props.onSignin, onSignout: props.onSignout,
	          showError: props.showError, showSuccess: props.showSuccess
	        })
	      )
	    )
	  );
	};
	
	Header.propTypes = {
	  showError: _react2.default.PropTypes.func.isRequired,
	  showSuccess: _react2.default.PropTypes.func.isRequired,
	  onSignin: _react2.default.PropTypes.func.isRequired,
	  onSignout: _react2.default.PropTypes.func.isRequired,
	  user: _react2.default.PropTypes.object,
	  router: _react2.default.PropTypes.object
	};
	
	exports.default = (0, _reactRouter.withRouter)((0, _withToast2.default)(Header));

/***/ }),

/***/ 34:
/***/ (function(module, exports) {

	"use strict";

/***/ })

};
//# sourceMappingURL=0.be1b405c58f76d9c2c74.hot-update.js.map