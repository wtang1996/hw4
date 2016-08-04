import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { fetchPosts } from '../actions';

// function based "dumb" component with no state
class Index extends Component {
  constructor(props) {
    super(props);

    this.postList = this.postList.bind(this);
  }

  componentWillMount() {
    this.props.fetchPosts();
  }

  postList() {
    return this.props.all.map((post) => {
      return (
        <li key={post.id} className="post_index">
          <Link to={`/posts/${post.id}`}>{post.title}</Link>
          <div>{post.tags}</div>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <h1>Posts</h1>
        <ul className="postList_index">
          {this.postList()}
        </ul>
      </div>
    );
  }
}

// connects particular parts of redux state to this components props
const mapStateToProps = (state) => (
  {
    all: state.posts.all,
    post: state.posts.post,
  }
);

// react-redux glue -- outputs Container that know state in props
export default connect(mapStateToProps, { fetchPosts })(Index);
