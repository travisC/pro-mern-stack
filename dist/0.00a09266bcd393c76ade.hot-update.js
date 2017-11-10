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
	
	var _withToast = __webpack_require__(31);
	
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

/***/ }),

/***/ 21:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(11);
	
	var _react2 = _interopRequireDefault(_react);
	
	__webpack_require__(22);
	
	var _reactRouter = __webpack_require__(13);
	
	var _reactBootstrap = __webpack_require__(17);
	
	var _IssueFilter = __webpack_require__(23);
	
	var _IssueFilter2 = _interopRequireDefault(_IssueFilter);
	
	var _withToast = __webpack_require__(31);
	
	var _withToast2 = _interopRequireDefault(_withToast);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	const IssueRow = props => {
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
	        { to: `/issues/${props.issue._id}` },
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
	  const issueRows = props.issues.map(issue => _react2.default.createElement(IssueRow, { key: issue._id, issue: issue, deleteIssue: props.deleteIssue }));
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
	
	const PAGE_SIZE = 10;
	
	class IssueList extends _react2.default.Component {
	  static dataFetcher(_ref) {
	    let urlBase = _ref.urlBase,
	        location = _ref.location;
	
	    const query = Object.assign({}, location.query);
	    const pageStr = query._page;
	    if (pageStr) {
	      delete query._page;
	      query._offset = (parseInt(pageStr, 10) - 1) * PAGE_SIZE;
	    }
	    query._limit = PAGE_SIZE;
	    const search = Object.keys(query).map(k => `${k}=${query[k]}`).join('&');
	    return fetch(`${urlBase || ''}/api/issues?${search}`).then(response => {
	      if (!response.ok) return response.json().then(error => Promise.reject(error));
	      return response.json().then(data => ({ IssueList: data }));
	    });
	  }
	
	  constructor(props, context) {
	    super(props, context);
	    const data = context.initialState.IssueList ? context.initialState.IssueList : { metadata: { totalCount: 0 }, records: [] };
	    const issues = data.records;
	    issues.forEach(issue => {
	      issue.created = new Date(issue.created);
	      if (issue.completionDate) {
	        issue.completionDate = new Date(issue.completionDate);
	      }
	    });
	    this.state = {
	      issues: issues,
	      totalCount: data.metadata.totalCount
	    };
	
	    this.setFilter = this.setFilter.bind(this);
	    this.selectPage = this.selectPage.bind(this);
	    this.deleteIssue = this.deleteIssue.bind(this);
	  }
	
	  componentDidMount() {
	    this.loadData();
	  }
	
	  componentDidUpdate(prevProps) {
	    const oldQuery = prevProps.location.query;
	    const newQuery = this.props.location.query;
	    if (oldQuery.status === newQuery.status && oldQuery.effort_gte === newQuery.effort_gte && oldQuery.effort_lte === newQuery.effort_lte && oldQuery._page === newQuery._page) {
	      return;
	    }
	    this.loadData();
	  }
	
	  setFilter(query) {
	    this.props.router.push({ pathname: this.props.location.pathname, query: query });
	  }
	
	  selectPage(eventKey) {
	    const query = Object.assign(this.props.location.query, { _page: eventKey });
	    this.props.router.push({ pathname: this.props.location.pathname, query: query });
	  }
	
	  loadData() {
	    IssueList.dataFetcher({ location: this.props.location }).then(data => {
	      const issues = data.IssueList.records;
	      issues.forEach(issue => {
	        issue.created = new Date(issue.created);
	        if (issue.completionDate) {
	          issue.completionDate = new Date(issue.completionDate);
	        }
	      });
	      this.setState({ issues: issues, totalCount: data.IssueList.metadata.totalCount });
	    }).catch(err => {
	      this.props.showError(`Error in fetching data from server: ${err}`);
	    });
	  }
	
	  deleteIssue(id) {
	    fetch(`/api/issues/${id}`, { method: 'DELETE' }).then(response => {
	      if (!response.ok) this.props.showError('Failed to delete issue');else this.loadData();
	    });
	  }
	
	  render() {
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
	}
	
	IssueList.propTypes = {
	  location: _react2.default.PropTypes.object.isRequired,
	  router: _react2.default.PropTypes.object,
	  showError: _react2.default.PropTypes.func.isRequired
	};
	
	IssueList.contextTypes = {
	  initialState: _react2.default.PropTypes.object
	};
	
	const IssueListWithToast = (0, _withToast2.default)(IssueList);
	IssueListWithToast.dataFetcher = IssueList.dataFetcher;
	
	exports.default = IssueListWithToast;

/***/ }),

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
	
	var _withToast = __webpack_require__(31);
	
	var _withToast2 = _interopRequireDefault(_withToast);
	
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
	      invalidFields: {}, showingValidation: false
	    };
	    this.dismissValidation = this.dismissValidation.bind(this);
	    this.showValidation = this.showValidation.bind(this);
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
	          this.props.showSuccess('Updated issue successfully.');
	        });
	      } else {
	        response.json().then(error => {
	          this.props.showError(`Failed to update issue: ${error.message}`);
	        });
	      }
	    }).catch(err => {
	      this.props.showError(`Error in sending data to server: ${err.message}`);
	    });
	  }
	
	  loadData() {
	    IssueEdit.dataFetcher({ params: this.props.params }).then(data => {
	      const issue = data.IssueEdit;
	      issue.created = new Date(issue.created);
	      issue.completionDate = issue.completionDate != null ? new Date(issue.completionDate) : null;
	      this.setState({ issue: issue });
	    }).catch(err => {
	      this.props.showError(`Error in fetching data from server: ${err.message}`);
	    });
	  }
	
	  showValidation() {
	    this.setState({ showingValidation: true });
	  }
	
	  dismissValidation() {
	    this.setState({ showingValidation: false });
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
	      )
	    );
	  }
	}
	
	IssueEdit.propTypes = {
	  params: _react2.default.PropTypes.object.isRequired,
	  showSuccess: _react2.default.PropTypes.func.isRequired,
	  showError: _react2.default.PropTypes.func.isRequired
	};
	
	IssueEdit.contextTypes = {
	  initialState: _react2.default.PropTypes.object
	};
	
	const IssueEditWithToast = (0, _withToast2.default)(IssueEdit);
	IssueEditWithToast.dataFetcher = IssueEdit.dataFetcher;
	
	exports.default = IssueEditWithToast;

/***/ }),

/***/ 27:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(11);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactBootstrap = __webpack_require__(17);
	
	var _IssueFilter = __webpack_require__(23);
	
	var _IssueFilter2 = _interopRequireDefault(_IssueFilter);
	
	var _withToast = __webpack_require__(31);
	
	var _withToast2 = _interopRequireDefault(_withToast);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	const statuses = ['New', 'Open', 'Assigned', 'Fixed', 'Verified', 'Closed'];
	
	const StatRow = props => _react2.default.createElement(
	  'tr',
	  null,
	  _react2.default.createElement(
	    'td',
	    null,
	    props.owner
	  ),
	  statuses.map((status, index) => _react2.default.createElement(
	    'td',
	    { key: index },
	    props.counts[status]
	  ))
	);
	
	StatRow.propTypes = {
	  owner: _react2.default.PropTypes.string.isRequired,
	  counts: _react2.default.PropTypes.object.isRequired
	};
	
	class IssueReport extends _react2.default.Component {
	  static dataFetcher(_ref) {
	    let urlBase = _ref.urlBase,
	        location = _ref.location;
	
	    const search = location.search ? `${location.search}&_summary` : '?_summary';
	    return fetch(`${urlBase || ''}/api/issues${search}`).then(response => {
	      if (!response.ok) return response.json().then(error => Promise.reject(error));
	      return response.json().then(data => ({ IssueReport: data }));
	    });
	  }
	
	  constructor(props, context) {
	    super(props, context);
	    const stats = context.initialState.IssueReport ? context.initialState.IssueReport : {};
	    this.state = {
	      stats: stats
	    };
	    this.setFilter = this.setFilter.bind(this);
	  }
	
	  componentDidMount() {
	    this.loadData();
	  }
	
	  componentDidUpdate(prevProps) {
	    const oldQuery = prevProps.location.query;
	    const newQuery = this.props.location.query;
	    if (oldQuery.status === newQuery.status && oldQuery.effort_gte === newQuery.effort_gte && oldQuery.effort_lte === newQuery.effort_lte) {
	      return;
	    }
	    this.loadData();
	  }
	
	  setFilter(query) {
	    this.props.router.push({ pathname: this.props.location.pathname, query: query });
	  }
	
	  loadData() {
	    IssueReport.dataFetcher({ location: this.props.location }).then(data => {
	      this.setState({ stats: data.IssueReport });
	    }).catch(err => {
	      this.props.showError(`Error in fetching data from server: ${err}`);
	    });
	  }
	
	  render() {
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
	            statuses.map((status, index) => _react2.default.createElement(
	              'td',
	              { key: index },
	              status
	            ))
	          )
	        ),
	        _react2.default.createElement(
	          'tbody',
	          null,
	          Object.keys(this.state.stats).map((owner, index) => _react2.default.createElement(StatRow, { key: index, owner: owner, counts: this.state.stats[owner] }))
	        )
	      )
	    );
	  }
	}
	
	IssueReport.propTypes = {
	  location: _react2.default.PropTypes.object.isRequired,
	  router: _react2.default.PropTypes.object,
	  showError: _react2.default.PropTypes.func.isRequired
	};
	
	IssueReport.contextTypes = {
	  initialState: _react2.default.PropTypes.object
	};
	
	const IssueReportWithToast = (0, _withToast2.default)(IssueReport);
	IssueReportWithToast.dataFetcher = IssueReport.dataFetcher;
	
	exports.default = IssueReportWithToast;

/***/ }),

/***/ 31:
/***/ (function(module, exports) {

	"use strict";

/***/ })

};
//# sourceMappingURL=0.00a09266bcd393c76ade.hot-update.js.map