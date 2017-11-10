exports.id = 0;
exports.modules = {

/***/ 20:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(11);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactBootstrap = __webpack_require__(17);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	class Toast extends _react2.default.Component {
	  componentDidUpdate() {
	    if (this.props.showing) {
	      clearTimeout(this.dismissTimer);
	      this.dismissTimer = setTimeout(this.props.onDismiss, 5000);
	    }
	  }
	  componentWillUnmount() {
	    clearTimeout(this.dismissTimer);
	  }
	
	  render() {
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
	}
	
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

/***/ 31:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = withToast;
	
	var _react = __webpack_require__(11);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Toast = __webpack_require__(20);
	
	var _Toast2 = _interopRequireDefault(_Toast);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function withToast(OriginalComponent) {
	  return class WithToast extends _react2.default.Component {
	    constructor(props) {
	      super(props);
	      this.state = {
	        toastVisible: false, toastMessage: '', toastType: 'success'
	      };
	      this.showSuccess = this.showSuccess.bind(this);
	      this.showError = this.showError.bind(this);
	      this.dismissToast = this.dismissToast.bind(this);
	    }
	
	    showSuccess(message) {
	      this.setState({ toastVisible: true, toastMessage: message, toastType: 'success' });
	    }
	
	    showError(message) {
	      this.setState({ toastVisible: true, toastMessage: message, toastType: 'danger' });
	    }
	
	    dismissToast() {
	      this.setState({ toastVisible: false });
	    }
	
	    render() {
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
	  };
	}

/***/ })

};
//# sourceMappingURL=0.9fcdf085a50f362f194b.hot-update.js.map