import 'console-polyfill';
import 'babel-polyfill';
import dva from 'dva';

import { useRouterHistory } from 'dva/router';
import { createHashHistory } from 'history';
import '../login.css';

// 1. Initialize
const app = dva({
  history: useRouterHistory(createHashHistory)({ queryKey: false })
});

// 2. Plugins
// app.use({});

// 3. Model
 app.model(require('../models/login'));

// 4. Router
app.router(require('../loginRouter'));

// 5. Start
app.start('#root');
