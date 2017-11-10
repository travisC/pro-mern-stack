exports.id = 0;
exports.modules = {

/***/ 19:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(11);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(13);
	
	var _reactBootstrap = __webpack_require__(17);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	class IssueAddNavItem extends _react2.default.Component {
	  constructor(props) {
	    super(props);
	    this.state = {
	      showing: false
	    };
	    this.showModal = this.showModal.bind(this);
	    this.hideModal = this.hideModal.bind(this);
	    this.submit = this.submit.bind(this);
	  }
	
	  showModal() {
	    this.setState({ showing: true });
	  }
	
	  hideModal() {
	    this.setState({ showing: false });
	  }
	
	  submit(e) {
	    e.preventDefault();
	    this.hideModal();
	    const form = document.forms.issueAdd;
	    const newIssue = {
	      owner: form.owner.value, title: form.title.value,
	      status: 'New', created: new Date()
	    };
	    fetch('/api/issues', {
	      method: 'POST',
	      headers: { 'Content-Type': 'application/json' },
	      body: JSON.stringify(newIssue)
	    }).then(response => {
	      if (response.ok) {
	        response.json().then(updatedIssue => {
	          this.props.router.push(`/issues/${updatedIssue._id}`);
	        });
	      } else {
	        response.json().then(error => {
	          this.props.showError(`Failed to add issue: ${error.message}`);
	        });
	      }
	    }).catch(err => {
	      this.props.showError(`Error in sending data to server: ${err.message}`);
	    });
	  }
	
	  render() {
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
	}
	
	IssueAddNavItem.propTypes = {
	  router: _react2.default.PropTypes.object,
	  showError: _react2.default.PropTypes.func.isRequired
	};
	
	exports.default = (0, _reactRouter.withRouter)(IssueAddNavItem);

/***/ })

};
//# sourceMappingURL=0.57afa8c762f183f23487.hot-update.js.map