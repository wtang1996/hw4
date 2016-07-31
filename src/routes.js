import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Welcome from './components/welcome';

export default(
  <Route path="/">
    <IndexRoute component={Welcome} />
  </Route>
);
