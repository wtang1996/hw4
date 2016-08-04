import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createPost } from '../actions';

class New extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {
      title: '',
      tags: '',
      content: '',
    };

    this.onTitleChange = this.onTitleChange.bind(this);
    this.onTagsChange = this.onTagsChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.Submit = this.Submit.bind(this);
  }

  onTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  onTagsChange(event) {
    this.setState({ tags: event.target.value });
  }

  onContentChange(event) {
    this.setState({ content: event.target.value });
  }

  Submit(e) {
    e.preventDefault();
    const post = {
      title: this.state.title,
      tags: this.state.tags,
      content: this.state.content,
    };
    this.props.createPost(post);
  }

  render() {
    return (
      <div>
        <h1>Create A New Post</h1>
        <form onSubmit={this.Submit} className="createPost">
          Title: <input onChange={this.onTitleChange} value={this.state.title} />
          Tags: <input onChange={this.onTagsChange} value={this.state.tags} />
          Content: <input onChange={this.onContentChange} value={this.state.content} />
          <button>Submit</button>
        </form>
      </div>
  ); }
}


// react-redux glue -- outputs Container that knows how to call actions
export default connect(null, { createPost })(New);
