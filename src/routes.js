import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import Index from './containers/index';
import New from './containers/new';
import Show from './containers/show';
import SignIn from './containers/signin';
import SignUp from './containers/signup';
import RequireAuth from './containers/require-auth';
import Profile from './containers/profile';
import Error from './containers/error';

export default(
  <Route path="/" component={App}>
    <Route path="signin" component={SignIn} />
    <Route path="signup" component={SignUp} />
    <IndexRoute component={Index} />
    <Route path="posts/new" component={RequireAuth(New)} />
    <Route path="posts/:id" component={Show} />
    <Route path="profile" component={Profile} />
    <Route path="error" component={Error} />
  </Route>
);
