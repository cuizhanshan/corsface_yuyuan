/**
 * Created by Jason on 2017/7/20.
 */
import { allTrafficStatistics, getCamerCaptureFtCount, getCamerCaptureAmCount, ygGetTitleCount, ygGetCount, ygGetPeriodCount, ygGetStayCount } from '../services/analysis';

export default {
  namespace: 'analysis',
  state: {
    trafficStatisticsData: {
      facetrackCount: [],
      alarmCount: []
    },
      ygCount: [],
      ygPeriodCount: [],
      ygStayCount: [],
      ygTitleCount: {
          intoCount: 0,
          stayCount: 0
      },

    cameraFaceData: [],
    cameraCameraData: []
  },
  sunscriptions: {},
  effects: {
    * ygGetAllState ( {payload}, { put, call } ){
        const delay = timeout => {
            return new Promise(resolve => {
                setTimeout(resolve, timeout);
            });
        };
        yield put({type: 'ygGetTitleCount'});
        yield put({type: 'ygGetCount'});
        yield put({type: 'ygGetPeriodCount'});
        yield put({type: 'ygGetStayCount'});
        while( true ){
            yield call(delay, 5000);
            yield put({type: 'ygGetTitleCount'});
            yield put({type: 'ygGetCount'});
            yield put({type: 'ygGetPeriodCount'});
            yield put({type: 'ygGetStayCount'});
        }

    },
    * ygGetTitleCount ({ payload }, { put, call, select }) {
      const { data } = yield call(ygGetTitleCount);
      if( data && data.status === 0 ){
          yield put({
              type: 'success',
              payload: {
                  ygTitleCount: data.result
              }
          })
      }
    },
      * ygGetCount ({ payload }, { put, call }) {
      const { data } = yield call(ygGetCount);
      if( data && data.status === 0 ){
          yield put({
            type: 'success',
              payload: {
              ygCount: data.result
              }
          })
      }
    },
      * ygGetPeriodCount ({ payload }, { put, call }) {
      const { data } = yield call(ygGetPeriodCount);
      if( data && data.status === 0 ){
          yield put({
            type: 'success',
              payload: {
                  ygPeriodCount: data.result
              }
          })
      }
    },
      * ygGetStayCount ({ payload }, { put, call }) {
      const { data } = yield call(ygGetStayCount);
      if( data && data.status === 0 ){
          yield put({
              type: 'success',
              payload: {
                  ygStayCount: data.result
              }
          })
      }
    },
    * allTrafficStatistics({ payload }, { put, call }) {
      const { data } = yield call(allTrafficStatistics, payload);

      if (data && data.status === 0) {
        const facetrackCount = data.result.facetrackCount;
        const alarmCount = data.result.alarmCount;
        yield put({
          type: 'success',
          payload: {
            trafficStatisticsData: {
              facetrackCount,
              alarmCount
            }
          }
        });
      }
    },

    * getCamerCaptureFtCount({ payload }, { put, call }) {
      const { data } = yield call(getCamerCaptureFtCount, payload);
      if (data && data.status === 0) {
        const { result } = data;
        yield put({
          type: 'success',
          payload: {
            cameraFaceData: result
          }
        });
      }
    },
    * getCamerCaptureAmCount({ payload }, { put, call }) {
      const { data } = yield call(getCamerCaptureAmCount, payload);
      if (data && data.status === 0) {
        const { result } = data;
        yield put({
          type: 'success',
          payload: {
            cameraCameraData: result
          }
        });
      }
    }
  },
  reducers: {
    success(state, action) {
      const data = { ...state, ...action };
      return { ...state, ...action.payload };
    }
  }
};
