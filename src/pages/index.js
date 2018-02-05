import 'console-polyfill';
import 'babel-polyfill';
import dva from 'dva';
import { useRouterHistory } from 'dva/router';
import { createHashHistory } from 'history';
import '../index.less';


// 1. Initialize
const app = dva({
  history: useRouterHistory(createHashHistory)({queryKey: false})
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('../models/index'));
app.model(require('../models/face'));
app.model(require('../models/alarm'));
app.model(require('../models/group'));
app.model(require('../models/member'));
app.model(require('../models/alarmCfg'));
app.model(require('../models/person'));
app.model(require('../models/search'));
app.model(require('../models/camera'));
app.model(require('../models/analysis'));
app.model(require('../models/historical'));
app.model(require('../models/dictory'));

// 4. Router
app.router(require('../router'));

// 5. Start
app.start('#root');
