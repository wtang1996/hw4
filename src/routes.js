import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import Index from './containers/index';
import New from './containers/new';
import Show from './containers/show';

export default(
  <Route path="/" component={App}>
    <IndexRoute component={Index} />
    <Route path="posts/new" component={New} />
    <Route path="posts/:id" component={Show} />
  </Route>
);
