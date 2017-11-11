exports.id = 0;
exports.modules = {

/***/ 25:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(11);
	
	var _react2 = _interopRequireDefault(_react);
	
	__webpack_require__(26);
	
	var _reactRouter = __webpack_require__(13);
	
	var _reactBootstrap = __webpack_require__(18);
	
	var _IssueFilter = __webpack_require__(27);
	
	var _IssueFilter2 = _interopRequireDefault(_IssueFilter);
	
	var _withToast = __webpack_require__(23);
	
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
	    props.deleteIssue ? _react2.default.createElement(
	      'td',
	      null,
	      _react2.default.createElement(
	        _reactBootstrap.Button,
	        { bsSize: 'xsmall', onClick: onDeleteClick },
	        _react2.default.createElement(_reactBootstrap.Glyphicon, { glyph: 'trash' })
	      )
	    ) : null
	  );
	};
	
	IssueRow.propTypes = {
	  issue: _react2.default.PropTypes.object.isRequired,
	  deleteIssue: _react2.default.PropTypes.func
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
	        props.deleteIssue ? _react2.default.createElement('th', null) : null
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
	  deleteIssue: _react2.default.PropTypes.func
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
	      _react2.default.createElement(IssueTable, {
	        issues: this.state.issues,
	        deleteIssue: this.props.user.signedIn ? this.deleteIssue : null
	      })
	    );
	  }
	}
	
	IssueList.propTypes = {
	  location: _react2.default.PropTypes.object.isRequired,
	  router: _react2.default.PropTypes.object,
	  showError: _react2.default.PropTypes.func.isRequired,
	  user: _react2.default.PropTypes.object.isRequired
	};
	
	IssueList.contextTypes = {
	  initialState: _react2.default.PropTypes.object
	};
	
	const IssueListWithToast = (0, _withToast2.default)(IssueList);
	IssueListWithToast.dataFetcher = IssueList.dataFetcher;
	
	exports.default = IssueListWithToast;

/***/ })

};
//# sourceMappingURL=0.96049e22b710ff12431d.hot-update.js.map