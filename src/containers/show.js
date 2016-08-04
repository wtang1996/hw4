import React, { Component } from 'react';
import { connect } from 'react-redux';

import { deletePost, updatePost, fetchPost } from '../actions';
import marked from 'marked';

class Show extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {
      title: '',
      tags: '',
      content: '',
      isTitleEditing: false,
      isTagsEditing: false,
      isContentEditing: false,
    };

    this.delete = this.delete.bind(this);
    this.update = this.update.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onTagsChange = this.onTagsChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.renderTitle = this.renderTitle.bind(this);
    this.renderTags = this.renderTags.bind(this);
    this.renderContent = this.renderContent.bind(this);
  }

  componentWillMount() {
    this.props.fetchPost(this.props.params.id);
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

  update() {
    this.props.updatePost(this.props.params.id, { content: this.state.content, tags: this.state.tags, title: this.state.title });
  }

  delete() {
    this.props.deletePost(this.props.params.id);
  }

  renderTitle() {
    if (this.state.isTitleEditing) {
      return (
        <input onChange={this.onTitleChange} defaultValue={this.props.post.title} onBlur={() => {
          this.setState({ isTitleEditing: false });
          this.update();
        }} />
      );
    } else {
      return (
        <div className="title" onClick={() => this.setState({ isTitleEditing: true })}
          dangerouslySetInnerHTML={{ __html: marked(this.props.post.title || '') }}
        />
        );
    }
  }

  renderTags() {
    if (this.state.isTagsEditing) {
      return (
        <input onChange={this.onTagsChange} defaultValue={this.props.post.tags} onBlur={() => {
          this.setState({ isTagsEditing: false });
          this.update();
        }} />
      );
    } else {
      return (
        <div className="tags" onClick={() => this.setState({ isTagsEditing: true })}
          dangerouslySetInnerHTML={{ __html: marked(this.props.post.tags || '') }}
        />
        );
    }
  }

  renderContent() {
    if (this.state.isContentEditing) {
      return (
        <input onChange={this.onContentChange} defaultValue={this.props.post.content} onBlur={() => {
          this.setState({ isContentEditing: false });
          this.update();
        }} />
      );
    } else {
      return (
        <div className="content" onClick={() => this.setState({ isContentEditing: true })}
          dangerouslySetInnerHTML={{ __html: marked(this.props.post.content || 'tags:') }}
        />
        );
    }
  }

  render() {
    if (this.props.post != null) {
      return (
        <div className="show">
          <h1>{this.renderTitle()}</h1>
          <div>{this.renderTags()}</div>
          <div>{this.renderContent()}</div>
          <button onClick={this.delete} className="delete">Delete</button>
        </div>
      );
    }
    return <div>Loading......</div>;
  }
}

// connects particular parts of redux state to this components props
const mapStateToProps = (state) => (
  {
    post: state.posts.post,
  }
);

// react-redux glue -- outputs Container that knows how to call actions
export default connect(mapStateToProps, { deletePost, updatePost, fetchPost })(Show);
