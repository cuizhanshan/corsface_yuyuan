/**
 * Created by Riky on 2017/2/23.
 */
import { watchList } from '../services/webSocket';
import { listAllRunning, cameraList, cameraScreenList } from '../services/camera';
import { ftVsPoi } from '../services/face';
import { alarmList } from '../services/alarm';
import { getDictoryByTag } from '../services/system';
import { WEBSOCKET_URL, INDEX_FACE_SIZE, ACTUAL_ALARM_SIZE } from '../utils/constant';

export default {
  namespace: 'index',
  state: {
    playStatus: false,
    stat: {
      totalFace: '0',
      totalAlarm: '0',
      todayFace: '0',
      todayAlarm: '0'
    },
    modalFaceVisible: false,
    modalAlarmVisible: false,
    actualDetailsVisible: false,
    faceList: [],
    alarmList: [],
    modalFaceData: {},
    modalAlarmData: {},
    snapImg: '',
    screenView: [],
    toggleScreenVisible: false,
    toggleScreenNum: null,
    togglecameraList: [],
    tooglecameraPage: {},
    playScreen: '',
    xAxisData: [2.4, 5.1, 6.2, 3.5, 5.5, 20.3, 40, 50, 36, 8, 5, 3, 2, 6, 6, 4, 3, 52, 152, 32, 41, 36, 5, 3],
    yAxisData: [3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7, 3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7],
    alarmModalPopup: false,
    PopupFaceTrack: {},
      autoAlarm: '0'
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/' || pathname === '/shadow' || pathname === '/alarm/actual') {
          return watchList(WEBSOCKET_URL, data => {
            dispatch({ type: 'socketMsg', payload: { data } });
          });
        }
      });
    }
  },
  effects: {
    * socketMsg({ payload }, { put, call, select }) {
      const { data } = payload;
      const delay = timeout => new Promise(resolve => {
        setTimeout(resolve, timeout);
      });
      const autoAlarm = yield select(store => store.index.autoAlarm);

      let { alarmList, faceList } = yield select(state => ({
        alarmList: state.index.alarmList ? state.index.alarmList : [],
        faceList: state.index.faceList ? state.index.faceList : []
      }));

      faceList = data && data.faceTrackList ? (data.faceTrackList.length > 0 ? [...data.faceTrackList, ...faceList] : faceList) : faceList;

      faceList.length > INDEX_FACE_SIZE ? faceList.splice(INDEX_FACE_SIZE, faceList.length - INDEX_FACE_SIZE) : faceList;

      if (data && data.faceTrackList && data.faceTrackList.length === 1 && data.faceTrackList[0].alarmed === true) {
        alarmList.reverse()
        alarmList.push(data.faceTrackList[0])
        alarmList.reverse()
        alarmList.length > ACTUAL_ALARM_SIZE ? alarmList.splice(ACTUAL_ALARM_SIZE, alarmList.length - ACTUAL_ALARM_SIZE) : faceList;
      }

      yield put({
        type: 'success',
        payload: {
          faceList,
          alarmList,
          stat: data.stat,
          playStatus: !!(data && data.faceTrackList && data.faceTrackList.length > 0 &&
            ( data.faceTrackList.filter(value => value.alarmed)) && (data.faceTrackList.filter(value => value.alarmed)).length > 0)
        }
      });

      // 报警自动弹框
      if (autoAlarm === '1') {
        if (data && data.faceTrackList && data.faceTrackList.length === 1 && data.faceTrackList[0].alarmed === true) {
          yield put({
            type: 'success',
            payload: {
              alarmModalPopup: true,
              PopupFaceTrack: data.faceTrackList[0]
            }
          });
        }
        yield call(delay, 10000);
        yield put({
          type: 'success',
          payload: {
            alarmModalPopup: false,
            PopupFaceTrack: []
          }
        });
      }
    },
      *getDictoryByTag ({ payload }, { put, call }) {
        const { data } = yield call(getDictoryByTag, {tag: 'index.auto-modal'});
        if( data && data.status === 0 ){
            yield put({
              type: 'success',
                payload: {
                  autoAlarm: data.result[0].dicValue
                }
            })
        }else{
            yield put({
                type: 'success',
                payload: {
                    autoAlarm: "0"
                }
            })
        }
       },
    * initAlarmHistory({ payload }, { put, call }) {
      const params = payload
      const { data } = yield call(alarmList, params);
      if (data && data.status == 0) {
        const { result } = data;
        if (result.list && result.list.length > 0) {
          yield put({
            type: 'success',
            payload: {
              alarmList: result.list
            }
          })

        }
      }
    },
    * closePopupModal({ payload }, { put }) {
      yield put({
        type: 'success',
        payload: {
          alarmModalPopup: false,
          PopupFaceTrack: {}
        }
      });
    },
    * showModalFace({ payload }, { put }) {
      const { modalFaceData } = payload;

      const snapImg = modalFaceData.snapImg;
      console.log(snapImg)
      yield put({
        type: 'success',
        payload: {
          modalFaceVisible: true,
          modalFaceData,
          snapImg
        }
      });
    },
    * closeModalFace({ payload }, { put }) {
      yield put({
        type: 'success',
        payload: {
          modalFaceVisible: false,
          modalFaceData: {}
        }
      });
    },
    * showModalAlarm({ payload }, { put }) {
      const { modalAlarmData } = payload;
      // console.log(payload);
      const snapImg = modalAlarmData.snapImg;
      yield put({
        type: 'success',
        payload: {
          modalAlarmVisible: true,
          modalAlarmData,
          snapImg
        }
      });
    },
    * closeModalAlarm({ payload }, { put }) {
      yield put({
        type: 'success',
        payload: {
          modalAlarmVisible: false,
          modalAlarmData: {}
        }
      });
    },
    // 首页屏幕接口
    * currentCamera({ payload }, { put, call }) {
      const { data } = yield call(listAllRunning);

      if (data && data.status == 0) {
        const { result } = data;
        if (result && result.length > 0) {
          const cameraList = result;
          const currentCamera = result[0];
          const playScreen = result[0].name;
          yield put({
            type: 'success',
            payload: {
              cameraList,
              currentCamera,
              playScreen
            }
          });
        }
      }
    },
    // 四分屏接口
    * cameraList({ payload }, { put, call }) {
      const { data } = yield call(cameraScreenList);

      if (data && data.status == 0) {
        const { result } = data;
        if (result && result.length > 0) {
          const screenView = [];
          screenView.push(result[0]);
          screenView.push(result[1]);
          screenView.push(result[2]);
          screenView.push(result[3]);

          yield put({
            type: 'success',
            payload: {
              screenView
            }
          });
        }
      }
    },
    // 切换摄像头modal接口
    * cameraListPage({ payload }, { put, call }) {
      const { pageNo, pageSize, name } = payload;
      const { data } = yield call(cameraList, {
        pageSize: pageSize || 6,
        pageNo: pageNo || 1,
        name: name || '',
        categoryId: 1
      });
      if (data && data.status == 0) {
        const { result } = data;
        const togglecameraList = result.list;
        const togglecameraPage = result.page;
        yield put({
          type: 'success',
          payload: {
            togglecameraList,
            togglecameraPage
          }
        });
      }
    },
    * transformCamera({ payload }, { put }) {
      yield put({
        type: 'success',
        payload: {
          currentCamera: payload
        }
      });
    },
    * changePlayStatus({ payload }, { put }) {
      yield put({
        type: 'success',
        payload: {
          playStatus: false
        }
      });
    },
    * fetchContrast({ payload }, { put, call }) {
      const { code, judgePerson } = payload;
      const facetrackId = code;
      const personId = judgePerson.personId ? judgePerson.personId : '';

      if (facetrackId && personId) {
        const { data } = yield call(ftVsPoi, { facetrackId, personId });
        if (data && data.status === 0) {
          console.log('fetchContrast')
          console.log(data)
          yield put({
            type: 'success',
            payload: {
              contrast: {
                face: data.result.face,
                person: data.result.person,
                personFace: data.result.person && data.result.person.faceList && data.result.person.faceList.length > 0 ? data.result.person.faceList[0] : null
              },
              actualDetailsVisible: true
            }
          });
        }
      } else if (facetrackId && !personId) {
        const { data } = yield call(ftVsPoi, { facetrackId });
        if (data && data.status === 0) {
          yield put({
            type: 'success',
            payload: {
              contrast: {
                face: data.result.face,
                person: data.result.person,
                personFace: data.result.person && data.result.person.faceList && data.result.person.faceList.length > 0 ? data.result.person.faceList[0] : null
              },
              actualDetailsVisible: true
            }
          });
        }
      }

    },
    * closeViewDetailsModule({ payload }, { put }) {
      yield put({
        type: 'success',
        payload: {
          actualDetailsVisible: false
        }
      });
    }
  },
  reducers: {
    success(state, action) {
      return { ...state, ...action.payload };
    }
  }
};
