import axios from 'axios';
import { browserHistory } from 'react-router';

// const ROOT_URL = 'http://localhost:9090/api';
const ROOT_URL = 'http://hw5p1.herokuapp.com/api';
// const ROOT_URL = 'https://cs52-blog.herokuapp.com/api';
const API_KEY = '?key=weijia_tang';

// keys for actiontypes
export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  // CREATE_POST: 'CREATE_POST',
  // UPDATE_POST: 'UPDATE_POST',
  // DELETE_POST: 'DELETE_POST',
};


export function fetchPosts() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts${API_KEY}`).then(response => {
      dispatch({ type: 'FETCH_POSTS', payload: {
        all: response.data,
      } });
    }).catch(error => {
      console.log(error);
    });
  };
}

export function fetchPost(postID) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/${postID}${API_KEY}`).then(response => {
      dispatch({ type: 'FETCH_POST', payload: {
        post: response.data,
      } });
    }).catch(error => {
      console.log(error);
    });
  };
}

export function createPost(post) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/posts/${API_KEY}`, post).then(response => {
      browserHistory.push('/');
    }).catch(error => {
      console.log(error);
    });
  };
}

export function updatePost(postID, post) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/posts/${postID}${API_KEY}`, post).then(response => {
      dispatch({ type: 'FETCH_POST', payload: {
        post: response.data,
      } });
    }).catch(error => {
      console.log(error);
    });
  };
}

export function deletePost(postID) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/posts/${postID}${API_KEY}`).then(response => {
      browserHistory.push('/');
    }).catch(error => {
      console.log(error);
    });
  };
}
