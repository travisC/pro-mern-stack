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
	
	var _Header = __webpack_require__(17);
	
	var _Header2 = _interopRequireDefault(_Header);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	class App extends _react2.default.Component {
	  static dataFetcher(_ref) {
	    let urlBase = _ref.urlBase,
	        cookie = _ref.cookie;
	
	    const headers = cookie ? { headers: { Cookie: cookie } } : null;
	    return fetch(`${urlBase || ''}/api/users/me`, headers).then(response => {
	      if (!response.ok) return response.json().then(error => Promise.reject(error));
	      return response.json().then(data => ({ App: data }));
	    });
	  }
	
	  constructor(props, context) {
	    super(props, context);
	    const user = context.initialState.App ? context.initialState.App : {};
	    this.state = {
	      user: user
	    };
	    this.onSignin = this.onSignin.bind(this);
	    this.onSignout = this.onSignout.bind(this);
	  }
	
	  componentDidMount() {
	    App.dataFetcher({}).then(data => {
	      const user = data.App;
	      this.setState({ user: user });
	    });
	  }
	
	  onSignin(name) {
	    this.setState({ user: { signedIn: true, name: name } });
	  }
	
	  onSignout() {
	    this.setState({ user: { signedIn: false, name: '' } });
	  }
	
	  render() {
	    const childrenWithUser = _react2.default.Children.map(this.props.children, child => _react2.default.cloneElement(child, { user: this.state.user }));
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(_Header2.default, { user: this.state.user, onSignin: this.onSignin, onSignout: this.onSignout }),
	      _react2.default.createElement(
	        'div',
	        { className: 'container-fluid' },
	        childrenWithUser,
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
	  }
	}
	
	exports.default = App;
	App.propTypes = {
	  children: _react2.default.PropTypes.object.isRequired
	};
	
	App.contextTypes = {
	  initialState: _react2.default.PropTypes.object
	};

/***/ })

};
//# sourceMappingURL=0.e448a67368a87707eade.hot-update.js.map