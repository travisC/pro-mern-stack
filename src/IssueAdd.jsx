import React from 'react';

export default class IssueAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.issueAdd;
    this.props.createIssue({
      owner: form.owner.value,
      title: form.title.value,
      effort: form.effort.value,
      status: 'New',
      created: new Date(),
    });
    // clear the form for the next input
    form.owner.value = ''; form.title.value = '';
    form.effort.value = '';
  }

  render() {
    return (
      <div>
        <form name="issueAdd" onSubmit={this.handleSubmit}>
          <input type="text" name="owner" placeholder="Owner" />
          <input type="text" name="effort" placeholder="Effort" />
          <input type="text" name="title" placeholder="Title" />
          <button>Add</button>
        </form>
      </div>
    );
  }
}

IssueAdd.propTypes = {
  createIssue: React.PropTypes.func.isRequired,
};
