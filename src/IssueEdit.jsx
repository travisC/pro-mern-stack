import React from 'react';
import { Link } from 'react-router';

export default class IssueEdit extends React.Component { // eslint-disable-line
  //eslint-disable-line
  render() {
    return (
      <div>
        <p>Placeholder for edit component. {this.props.params.id}</p>
        <Link to="/issues">Back to issue list</Link>
      </div>
    );
  }
}

IssueEdit.propTypes = {
  params: React.PropTypes.object.isRequired,
};
