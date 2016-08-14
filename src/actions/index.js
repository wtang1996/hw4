import axios from 'axios';
import { browserHistory } from 'react-router';

// const ROOT_URL = 'http://localhost:9090/api';
const ROOT_URL = 'http://hw5-weijia.herokuapp.com/api';
// const ROOT_URL = 'https://cs52-blog.herokuapp.com/api';
const API_KEY = '?key=weijia_tang';

// keys for actiontypes
export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  // CREATE_POST: 'CREATE_POST',
  // UPDATE_POST: 'UPDATE_POST',
  // DELETE_POST: 'DELETE_POST',
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
  FETCH_USER: 'FETCH_USER',
  ERROR_MESSAGE: 'ERROR_MESSAGE',
};

export function errorMessage(error) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.ERROR_MESSAGE, message: error });
    browserHistory.push('/error');
  };
}

export function fetchPosts() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts${API_KEY}`).then(response => {
      dispatch({ type: 'FETCH_POSTS', payload: {
        all: response.data,
      } });
    }).catch(error => {
      dispatch(errorMessage(`Cannot fetch posts: ${error.response.data}`));
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
      dispatch(errorMessage(`Cannot fetch post: ${error.response.data}`));
    });
  };
}

export function createPost(post) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/posts`, post, { headers: { authorization: localStorage.getItem('token') } })
    .then(response => {
      browserHistory.push('/');
    }).catch(error => {
      dispatch(errorMessage(`Cannot create post: ${error.response.data}`));
    });
  };
}

export function updatePost(postID, post) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/posts/${postID}`, post, { headers: { authorization: localStorage.getItem('token') } })
    .then(response => {
      dispatch({ type: 'FETCH_POST', payload: {
        post: response.data,
      } });
    }).catch(error => {
      dispatch(errorMessage(`Cannot update post: ${error.response.data}`));
    });
  };
}

export function deletePost(postID) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/posts/${postID}`, { headers: { authorization: localStorage.getItem('token') } })
    .then(response => {
      browserHistory.push('/');
    }).catch(error => {
      dispatch(errorMessage(`Cannot delete posts: ${error.response.data}`));
    });
  };
}

// deletes token from localstorage
// and deauths
export function signoutUser() {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: ActionTypes.DEAUTH_USER });
    browserHistory.push('/');
  };
}

// trigger to deauth if there is error
// can also use in your error reducer if you have one to display an error message
export function authError(error) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.AUTH_ERROR });
    dispatch(errorMessage(error));
  };
}

export function signinUser({ email, password }) {
  // takes in an object with email and password (minimal user object)
  // returns a thunk method that takes dispatch as an argument (just like our create post method really)
  // does an axios.post on the /signin endpoint
  // on success does:
  //  dispatch({ type: ActionTypes.AUTH_USER });
  //  localStorage.setItem('token', response.data.token);
  // on error should dispatch(authError(`Sign In Failed: ${error.response.data}`));
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signin`, { email, password }).then(response => {
      dispatch({ type: ActionTypes.AUTH_USER });
      localStorage.setItem('token', response.data.token);
      browserHistory.push('/');
    }).catch(error => {
      dispatch(authError(`Sign In Failed: ${error.response.data}`));
    });
  };
}


export function signupUser({ email, password, username }) {
  // takes in an object with email and password (minimal user object)
  // returns a thunk method that takes dispatch as an argument (just like our create post method really)
  // does an axios.post on the /signup endpoint (only difference from above)
  // on success does:
  //  dispatch({ type: ActionTypes.AUTH_USER });
  //  localStorage.setItem('token', response.data.token);
  // on error should dispatch(authError(`Sign Up Failed: ${error.response.data}`));
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signup`, { email, password, username }).then(response => {
      dispatch({ type: ActionTypes.AUTH_USER });
      localStorage.setItem('token', response.data.token);
      browserHistory.push('/');
    }).catch(error => {
      dispatch(authError(`Sign Up Failed: ${error.response.data}`));
    });
  };
}

export function fetchUser() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/profile`, { headers: { authorization: localStorage.getItem('token') } }).then(response => {
      dispatch({ type: ActionTypes.FETCH_USER, payload: {
        user: response.data,
      } });
    }).catch(error => {
      dispatch(errorMessage(`Cannot get user data: ${error.response.data}`));
    });
  };
}
