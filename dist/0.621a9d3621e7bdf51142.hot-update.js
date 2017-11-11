exports.id = 0;
exports.modules = {

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(11);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactBootstrap = __webpack_require__(18);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	class SigninNavItem extends _react2.default.Component {
	  constructor(props) {
	    super(props);
	    this.state = {
	      showing: false, disabled: true
	    };
	    this.showModal = this.showModal.bind(this);
	    this.hideModal = this.hideModal.bind(this);
	    this.signout = this.signout.bind(this);
	    this.signin = this.signin.bind(this);
	  }
	
	  componentDidMount() {
	    window.gapi.load('auth2', () => {
	      if (!window.gapi.auth2.getAuthInstance()) {
	        if (!window.config || !window.config.googleClientId) {
	          this.props.showError('Missing Google Client ID or config file /static.config.js');
	        } else {
	          window.gapi.auth2.init({ client_id: window.config.googleClientId }).then(() => {
	            this.setState({ disabled: false });
	          });
	        }
	      }
	    });
	  }
	
	  signin() {
	    this.hideModal();
	    const auth2 = window.gapi.auth2.getAuthInstance();
	    auth2.signIn().then(googleUser => {
	      fetch('/signin', {
	        method: 'POST',
	        headers: { 'Content-Type': 'application/json' },
	        body: JSON.stringify({ id_token: googleUser.getAuthResponse().id_token })
	      }).then(response => {
	        if (response.ok) {
	          response.json().then(user => {
	            this.props.onSignin(user.name);
	          });
	        } else {
	          response.json().then(error => {
	            this.props.showError(`App login failed: ${error}`);
	          });
	        }
	      }).catch(err => {
	        this.props.showError(`Error posting login to app: ${err}`);
	      });
	    }, error => {
	      this.props.showError(`Error authenticating with Google: ${error}`);
	    });
	  }
	
	  signout() {
	    const auth2 = window.gapi.auth2.getAuthInstance();
	    fetch('/signout', {
	      method: 'POST',
	      headers: { 'Content-Type': 'application/json' }
	    }).then(response => {
	      if (response.ok) {
	        auth2.signOut().then(() => {
	          this.props.showSuccess('Successfully signed out.');
	          this.props.onSignout();
	        });
	      }
	    });
	  }
	
	  showModal() {
	    if (this.state.disabled) {
	      this.props.showError('Missing Google Client ID or config file /static.config.js');
	    } else {
	      this.setState({ showing: true });
	    }
	  }
	
	  hideModal() {
	    this.setState({ showing: false });
	  }
	
	  render() {
	    if (this.props.user.signedIn) {
	      return _react2.default.createElement(
	        _reactBootstrap.NavDropdown,
	        { title: this.props.user.name, id: 'user-dropdown' },
	        _react2.default.createElement(
	          _reactBootstrap.MenuItem,
	          { onClick: this.signout },
	          'Sign out'
	        )
	      );
	    }
	    return _react2.default.createElement(
	      _reactBootstrap.NavItem,
	      { onClick: this.showModal },
	      'Sign in',
	      _react2.default.createElement(
	        _reactBootstrap.Modal,
	        { keyboard: true, show: this.state.showing, onHide: this.hideModal, bsSize: 'sm' },
	        _react2.default.createElement(
	          _reactBootstrap.Modal.Header,
	          { closeButton: true },
	          _react2.default.createElement(
	            _reactBootstrap.Modal.Title,
	            null,
	            'Sign in'
	          )
	        ),
	        _react2.default.createElement(
	          _reactBootstrap.Modal.Body,
	          null,
	          _react2.default.createElement(
	            _reactBootstrap.Button,
	            { block: true, disabled: this.state.disabled, onClick: this.signin },
	            _react2.default.createElement('img', { src: '/btn_google_signin_dark_normal_web.png', alt: 'Sign in' })
	          )
	        ),
	        _react2.default.createElement(
	          _reactBootstrap.Modal.Footer,
	          null,
	          _react2.default.createElement(
	            _reactBootstrap.Button,
	            { bsStyle: 'link', onClick: this.hideModal },
	            'Cancel'
	          )
	        )
	      )
	    );
	  }
	}
	
	exports.default = SigninNavItem;
	SigninNavItem.propTypes = {
	  user: _react2.default.PropTypes.object,
	  onSignin: _react2.default.PropTypes.func.isRequired,
	  onSignout: _react2.default.PropTypes.func.isRequired,
	  showError: _react2.default.PropTypes.func.isRequired,
	  showSuccess: _react2.default.PropTypes.func.isRequired
	};

/***/ })

};
//# sourceMappingURL=0.621a9d3621e7bdf51142.hot-update.js.map