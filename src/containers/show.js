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
      comment: '',
      comments: [],
      author: '',
      isTitleEditing: false,
      isTagsEditing: false,
      isContentEditing: false,
    };

    this.delete = this.delete.bind(this);
    this.update = this.update.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onTagsChange = this.onTagsChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.onCommentChange = this.onCommentChange.bind(this);
    this.renderTitle = this.renderTitle.bind(this);
    this.renderTags = this.renderTags.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.renderComments = this.renderComments.bind(this);
    this.submitComment = this.submitComment.bind(this);
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

  onCommentChange(event) {
    this.setState({ comment: event.target.value });
  }

  update() {
    this.props.updatePost(this.props.params.id, { content: this.state.content, tags: this.state.tags, title: this.state.title, comments: this.state.comments });
  }

  delete() {
    this.props.deletePost(this.props.params.id);
  }

  submitComment(e) {
    e.preventDefault();
    const updatedComments = this.state.comments;
    updatedComments.push(this.state.comment);
    this.setState({
      comments: updatedComments,
      comment: '',
    });
    this.update();
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
        <div className="editingContent">
          <input onChange={this.onContentChange} defaultValue={this.props.post.content} onBlur={() => {
            this.setState({ isContentEditing: false });
            this.update();
          }} />
          <div className="content" dangerouslySetInnerHTML={{ __html: marked(this.state.content || '') }} />
        </div>
      );
    } else {
      return (
        <div className="content" onClick={() => this.setState({ isContentEditing: true })}
          dangerouslySetInnerHTML={{ __html: marked(this.props.post.content || '') }}
        />
        );
    }
  }

  renderComments() {
    return (
      <form onSubmit={this.submitComment}>
        <input onChange={this.onCommentChange} value={this.state.comment} />
        <button>Submit</button>
      </form>
    );
  }

  render() {
    if (this.props.post != null) {
      let index = 0;
      return (
        <div className="show">
          <h1>{this.renderTitle()}</h1>
          <div>Author: {this.props.post.author}</div>
          <div>{this.renderTags()}</div>
          <div>{this.renderContent()}</div>
          <button onClick={this.delete} className="delete">Delete</button>
          <div className="comments">Comments
            {
              this.props.post.comments.map(comment => {
                index++;
                return (<div className="comment" key={index}>{index}. {comment}</div>);
              })}
          </div>
          <div>{this.renderComments()}</div>
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
