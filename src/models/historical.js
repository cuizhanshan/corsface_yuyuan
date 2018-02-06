/**
 * Created by Jason on 2018/2/5.
 */
import moment from 'moment';
import { ygGetDefaultHistory, ygGetHistory, ygGetWeekHistory } from '../services/historical';

export default {
  namespace: 'historical',
  state: {
    initDatePicker: [],
    cascaderSelect: [],
    ygCount: [],
    ygDefaultHistoryParams: {
      type: 0
    },
    ygGetWeekHistoryParams: {
      time: ''
    },
    ygGetHistoryParams: {
      time: '',
      week: 0
    },
    titleCount: {
      count: 0,
      startTime: moment().format('YYYY年MM月DD日'),
      endTime: moment().format('YYYY年MM月DD日')
    }
  },
  effects: {
    * ygDefaultHistory({ payload }, { put, call, select }) {
      const params = yield select(store => store.historical.ygDefaultHistoryParams);
      const { data } = yield call(ygGetDefaultHistory, params);
      let count = 0;
      data.result.map(value => {
        count += value.intoCount - value.outCount;
      });
      if (data && data.status === 0) {
        yield put({
          type: 'success',
          payload: {
            ygCount: data.result,
            titleCount: {
              count,
              startTime: moment(data.result[0].date).format('YYYY年MM月DD日'),
              endTime: moment(data.result[data.result.length - 1].date).format('YYYY年MM月DD日')
            }
          }
        });
      }
    },
    * ygGetHistory({ payload }, { put, call, select }) {
      const params = yield select(store => store.historical.ygGetHistoryParams);
      const { data } = yield call(ygGetHistory, params);
      if (data && data.status === 0) {
        let count = 0;
        data.result.map(value => {
          count += value.intoCount - value.outCount;
        });
        yield put({
          type: 'success',
          payload: {
            ygCount: data.result,
            titleCount: {
              count,
              startTime: moment(data.result[0].date).format('YYYY年MM月DD日'),
              endTime: moment(data.result[data.result.length - 1].date).format('YYYY年MM月DD日')
            }
          }
        });
      }
    },
    * ygGetWeekHistory({ payload }, { put, call, select }) {
      const params = yield select(store => store.historical.ygGetWeekHistoryParams);
      const { data } = yield call(ygGetWeekHistory, params);
      if (data && data.status === 0) {
        yield put({
          type: 'success',
          payload: {
            ygCount: data.result
          }
        });
      }
    }
  },
  reducers: {
    success(state, action) {
      return { ...state, ...action.payload };
    }
  }
};
