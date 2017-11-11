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
	  constructor(props) {
	    super(props);
	    this.state = {
	      user: { signedIn: false, name: '' }
	    };
	    this.onSignin = this.onSignin.bind(this);
	    this.onSignout = this.onSignout.bind(this);
	  }
	
	  onSignin(name) {
	    this.setState({ user: { signedIn: true, name: name } });
	  }
	
	  onSignout() {
	    this.setState({ user: { signedIn: false, name: '' } });
	  }
	
	  render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(_Header2.default, { user: this.state.user, onSignin: this.onSignin, onSignout: this.onSignout }),
	      _react2.default.createElement(
	        'div',
	        { className: 'container-fluid' },
	        this.props.children,
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

/***/ })

};
//# sourceMappingURL=0.c6d74e769206244614ef.hot-update.js.map