exports.id = 0;
exports.modules = {

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
	
	var _withToast = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./withToast.jsx\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
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

/***/ })

};
//# sourceMappingURL=0.02428dfd467b5ed81a3f.hot-update.js.map