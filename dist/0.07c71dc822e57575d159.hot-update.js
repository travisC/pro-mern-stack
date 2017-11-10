exports.id = 0;
exports.modules = {

/***/ 24:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(11);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactBootstrap = __webpack_require__(17);
	
	var _reactRouterBootstrap = __webpack_require__(18);
	
	var _NumInput = __webpack_require__(25);
	
	var _NumInput2 = _interopRequireDefault(_NumInput);
	
	var _DateInput = __webpack_require__(26);
	
	var _DateInput2 = _interopRequireDefault(_DateInput);
	
	var _Toast = __webpack_require__(20);
	
	var _Toast2 = _interopRequireDefault(_Toast);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	class IssueEdit extends _react2.default.Component {
	  static dataFetcher(_ref) {
	    let params = _ref.params,
	        urlBase = _ref.urlBase;
	
	    return fetch(`${urlBase || ''}/api/issues/${params.id}`).then(response => {
	      if (!response.ok) return response.json().then(error => Promise.reject(error));
	      return response.json().then(data => ({ IssueEdit: data }));
	    });
	  }
	
	  constructor(props, context) {
	    super(props, context);
	    let issue;
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
	    this.state = {
	      issue: issue,
	      invalidFields: {}, showingValidation: false,
	      toastVisible: false, toastMessage: '', toastType: 'success'
	    };
	    this.dismissValidation = this.dismissValidation.bind(this);
	    this.showValidation = this.showValidation.bind(this);
	    this.showSuccess = this.showSuccess.bind(this);
	    this.showError = this.showError.bind(this);
	    this.dismissToast = this.dismissToast.bind(this);
	    this.onChange = this.onChange.bind(this);
	    this.onValidityChange = this.onValidityChange.bind(this);
	    this.onSubmit = this.onSubmit.bind(this);
	  }
	
	  componentDidMount() {
	    this.loadData();
	  }
	
	  componentDidUpdate(prevProps) {
	    if (prevProps.params.id !== this.props.params.id) {
	      this.loadData();
	    }
	  }
	
	  onChange(event, convertedValue) {
	    const issue = Object.assign({}, this.state.issue);
	    const value = convertedValue !== undefined ? convertedValue : event.target.value;
	    issue[event.target.name] = value;
	    this.setState({ issue: issue });
	  }
	
	  onValidityChange(event, valid) {
	    const invalidFields = Object.assign({}, this.state.invalidFields);
	    if (!valid) {
	      invalidFields[event.target.name] = true;
	    } else {
	      delete invalidFields[event.target.name];
	    }
	    this.setState({ invalidFields: invalidFields });
	  }
	
	  onSubmit(event) {
	    event.preventDefault();
	    this.showValidation();
	
	    if (Object.keys(this.state.invalidFields).length !== 0) {
	      return;
	    }
	
	    fetch(`/api/issues/${this.props.params.id}`, {
	      method: 'PUT',
	      headers: { 'Content-Type': 'application/json' },
	      body: JSON.stringify(this.state.issue)
	    }).then(response => {
	      if (response.ok) {
	        response.json().then(updatedIssue => {
	          updatedIssue.created = new Date(updatedIssue.created);
	          if (updatedIssue.completionDate) {
	            updatedIssue.completionDate = new Date(updatedIssue.completionDate);
	          }
	          this.setState({ issue: updatedIssue });
	          this.showSuccess('Updated issue successfully.');
	        });
	      } else {
	        response.json().then(error => {
	          this.showError(`Failed to update issue: ${error.message}`);
	        });
	      }
	    }).catch(err => {
	      this.showError(`Error in sending data to server: ${err.message}`);
	    });
	  }
	
	  loadData() {
	    IssueEdit.dataFetcher({ params: this.props.params }).then(data => {
	      const issue = data.IssueEdit;
	      issue.created = new Date(issue.created);
	      issue.completionDate = issue.completionDate != null ? new Date(issue.completionDate) : null;
	      this.setState({ issue: issue });
	    }).catch(err => {
	      this.showError(`Error in fetching data from server: ${err.message}`);
	    });
	  }
	
	  showValidation() {
	    this.setState({ showingValidation: true });
	  }
	
	  dismissValidation() {
	    this.setState({ showingValidation: false });
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
	    const issue = this.state.issue;
	    let validationMessage = null;
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
	      ),
	      _react2.default.createElement(_Toast2.default, {
	        showing: this.state.toastVisible, message: this.state.toastMessage,
	        onDismiss: this.dismissToast, bsStyle: this.state.toastType
	      })
	    );
	  }
	}
	
	exports.default = IssueEdit;
	IssueEdit.propTypes = {
	  params: _react2.default.PropTypes.object.isRequired
	};
	
	IssueEdit.contextTypes = {
	  initialState: _react2.default.PropTypes.object
	};

/***/ })

};
//# sourceMappingURL=0.07c71dc822e57575d159.hot-update.js.map