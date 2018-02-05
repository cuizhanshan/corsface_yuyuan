import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/LoginPage';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} />
    </Router>
  );
}

export default RouterConfig;
