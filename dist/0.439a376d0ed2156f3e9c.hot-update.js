exports.id = 0;
exports.modules = {

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
	
	var _Toast = __webpack_require__(20);
	
	var _Toast2 = _interopRequireDefault(_Toast);
	
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
	      toastVisible: false, toastMessage: '', toastType: 'success',
	      totalCount: data.metadata.totalCount
	    };
	
	    this.setFilter = this.setFilter.bind(this);
	    this.selectPage = this.selectPage.bind(this);
	    this.deleteIssue = this.deleteIssue.bind(this);
	    this.showError = this.showError.bind(this);
	    this.dismissToast = this.dismissToast.bind(this);
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
	
	  showError(message) {
	    this.setState({ toastVisible: true, toastMessage: message, toastType: 'danger' });
	  }
	
	  dismissToast() {
	    this.setState({ toastVisible: false });
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
	      this.showError(`Error in fetching data from server: ${err}`);
	    });
	  }
	
	  deleteIssue(id) {
	    fetch(`/api/issues/${id}`, { method: 'DELETE' }).then(response => {
	      if (!response.ok) this.showError('Failed to delete issue');else this.loadData();
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
	      _react2.default.createElement(IssueTable, { issues: this.state.issues, deleteIssue: this.deleteIssue }),
	      _react2.default.createElement(_Toast2.default, {
	        showing: this.state.toastVisible, message: this.state.toastMessage,
	        onDismiss: this.dismissToast, bsStyle: this.state.toastType
	      })
	    );
	  }
	}
	
	exports.default = IssueList;
	IssueList.propTypes = {
	  location: _react2.default.PropTypes.object.isRequired,
	  router: _react2.default.PropTypes.object
	};
	
	IssueList.contextTypes = {
	  initialState: _react2.default.PropTypes.object
	};

/***/ })

};
//# sourceMappingURL=0.439a376d0ed2156f3e9c.hot-update.js.map