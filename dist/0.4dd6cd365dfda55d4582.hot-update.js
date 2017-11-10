exports.id = 0;
exports.modules = {

/***/ 16:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	__webpack_require__(3);
	
	var _react = __webpack_require__(11);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactBootstrap = __webpack_require__(17);
	
	var _reactRouterBootstrap = __webpack_require__(18);
	
	var _IssueAddNavItem = __webpack_require__(19);
	
	var _IssueAddNavItem2 = _interopRequireDefault(_IssueAddNavItem);
	
	var _withToast = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./withToast.jsx\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _withToast2 = _interopRequireDefault(_withToast);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	const Header = props => _react2.default.createElement(
	  _reactBootstrap.Navbar,
	  { fluid: true },
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
	  ),
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
	);
	
	Header.propTypes = {
	  showError: _react2.default.PropTypes.func.isRequired
	};
	
	const HeaderWithToast = (0, _withToast2.default)(Header);
	
	const App = props => _react2.default.createElement(
	  'div',
	  null,
	  _react2.default.createElement(HeaderWithToast, null),
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
	
	App.propTypes = {
	  children: _react2.default.PropTypes.object.isRequired
	};
	
	exports.default = App;

/***/ })

};
//# sourceMappingURL=0.4dd6cd365dfda55d4582.hot-update.js.map