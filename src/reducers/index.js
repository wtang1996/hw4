import { combineReducers } from 'redux';

import PostsReducer from './postsReducer';
import AuthReducer from './auth-reducer';
import UserReducer from './user-reducer';
import ErrorReducer from './error-reducer';

const rootReducer = combineReducers({
  posts: PostsReducer,
  auth: AuthReducer,
  profile: UserReducer,
  error: ErrorReducer,
});

export default rootReducer;
