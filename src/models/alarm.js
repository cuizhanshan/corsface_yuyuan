/**
 * Created by Riky on 2017/2/23.
 */

import {ALARM_PAGE_SIZE, CONTRAST_FACE_PAGE_SIZE} from '../utils/constant';
import {alarmList} from '../services/alarm';
import {ftVsPoi, groupList} from '../services/face';
import pathToRegexp from 'path-to-regexp';
import {cameraListAll} from '../services/camera';
export default {
  namespace: 'alarm',
  state: {
    modalCameraTreeVisible: false,
    modalPersonTableVisible: false,
    selectCameraData: {},
    selectPersonData: {},
    query: {},
    modalContrastVisible: false,

    loading: true,
    remindControl: 'none',
    modalAlarmData:{},
    snapImg:''
  },
  subscriptions: {
    fetchAlarmList({dispatch, history}) {
      return history.listen(({pathname}) => {
        const match = pathToRegexp('/:foo/:bar?/:id?').exec(pathname);
        if (match && match[1] == 'alarm') {
          dispatch({type: 'alarmList', payload: {}});
          dispatch({type: 'cameraList'});
          dispatch({type: 'groupList'});
        }
      });
    }
  },
  effects: {
    *showModalAlarm({payload}, {put}){
      const {modalAlarmData} = payload;
      const {snapImg} = modalAlarmData;
      yield put({
        type: 'success',
        payload: {
          modalAlarmVisible: true,
          modalAlarmData,
          snapImg
        }
      })
    },
    *closeModalAlarm({payload}, {put}){
      yield put({
        type: 'success',
        payload: {
          modalAlarmVisible: false,
          // modalAlarmData: {}
        }
      })
    },
    *spinLoading({payload},{put}){
      yield put({
        type: 'success',
        payload: {
          loading: true
        }
      })
    },
    *showModalCameraTree({payload}, {put}){
      yield put({
        type: 'success',
        payload: {
          modalCameraTreeVisible: true,
        }
      })
    },
    *closeModalCameraTree({payload}, {put}){
      yield put({
        type: 'success',
        payload: {
          modalCameraTreeVisible: false,
        }
      })
    },
    *showModalPersonTable({payload}, {put}){
      yield put({
        type: 'success',
        payload: {
          modalPersonTableVisible: true,
        }
      })
    },
    *closeModalPersonTable({payload}, {put}){
      yield put({
        type: 'success',
        payload: {
          modalPersonTableVisible: false,
        }
      })
    },
    *alarmList({payload}, {put, call}){
      const {pageNo, pageSize, srcId, startTime, endTime, personId, groupId} = payload;
      const {data} = yield call(alarmList, {
        pageSize: pageSize ? pageSize : ALARM_PAGE_SIZE,
        pageNo: pageNo ? pageNo : 1,
        srcId: srcId ? srcId : '',
        startTime: startTime ? startTime : '',
        endTime: endTime ? endTime : '',
        personId: personId ? personId : '',
        groupId: groupId ? groupId : ''
      });

      if (data && data.status == 0) {
        console.log('data')
        console.log(data)
        yield put({
          type: 'success',
          payload: {
            alarmList: {
              page: data.result.page,
              list: data.result.list
            },
            loading: false,
            remindControl: data.result.list ? 'none' : 'block'
          }
        })
      }
    },
    *alarmPageTranslate({payload}, {put, call, select}){
      const {query} = yield select(state => state.alarm);
      const {pageNo, pageSize} = payload;

      const {data} = yield call(alarmList, {
        pageSize: pageSize ? pageSize : ALARM_PAGE_SIZE,
        pageNo: pageNo ? pageNo : 1,
        srcId: query && query.srcId ? query.srcId : '',
        startTime: query && query.startTime ? query.startTime : "",
        endTime: query && query.endTime ? query.endTime : "",
        personId: query && query.personId ? query.personId : "",
        groupId: query && query.id ? query.id : ""
      });
      if (data && data.status == 0) {
        yield put({
          type: 'success',
          payload: {
            page: data.result.page,
            alarmList: data.result.list
          }
        })
      }
    },
    *fetchContrast({payload}, {put, call}){

      const {code, judgePerson} = payload;
      const facetrackId = code;
      const personId = judgePerson.personId?judgePerson.personId:'';

      if (facetrackId && personId) {
        const {data} = yield call(ftVsPoi, {facetrackId, personId});
        if (data && data.status === 0) {
          yield put({
            type: 'success',
            payload: {
              contrast: {
                face: data.result.face,
                person: data.result.person,
                personFace: data.result.person && data.result.person.faceList && data.result.person.faceList.length > 0 ? data.result.person.faceList[0] : null,
                page: {
                  total: data.result.person && data.result.person.faceList && data.result.person.faceList.length > 0 ? data.result.person.faceList.length : 0,
                  pageSize: CONTRAST_FACE_PAGE_SIZE
                },
                faceList: data.result.person && data.result.person.faceList && data.result.person.faceList.filter((value, i) => {
                  return i < CONTRAST_FACE_PAGE_SIZE;
                })
              },
              modalContrastVisible: true,
            }
          });
        }
      }else if(facetrackId && !personId){
        const {data} = yield call(ftVsPoi, {facetrackId});
        if (data && data.status === 0) {
          yield put({
            type: 'success',
            payload: {
              contrast: {
                face: data.result.face,
                person: data.result.person,
                personFace: data.result.person && data.result.person.faceList && data.result.person.faceList.length > 0 ? data.result.person.faceList[0] : null,
                page: {
                  total: data.result.person && data.result.person.faceList && data.result.person.faceList.length > 0 ? data.result.person.faceList.length : 0,
                  pageSize: CONTRAST_FACE_PAGE_SIZE
                },
                faceList: data.result.person && data.result.person.faceList && data.result.person.faceList.filter((value, i) => {
                  return i < CONTRAST_FACE_PAGE_SIZE;
                })
              },
              modalContrastVisible: true
            }
          });
        }
      }

    },
    *contrastRowSelect({payload}, {put, select}){
      let {contrast} = yield select(state => state.alarm);
      console.log('contrastRowSelect')
      contrast.personFace = payload;
      yield put({
        type: 'success',
        payload: {
          contrast: contrast
        }
      });
    },
    *contrastPageTranslate({payload}, {put, select}){
      let {contrast} = yield select(state => state.alarm);

      const {pageNo, pageSize} = payload;
      contrast.faceList = contrast.person.faceList.filter((value, i) => {
        return (((parseInt(pageNo) - 1) * pageSize) <= i) && (i <= (parseInt(pageNo) * parseInt(pageSize) - 1));
      });
      yield put({
        type: 'success',
        payload: {
          contrast: contrast
        }
      });
    },
    *contrastClosed({payload}, {put}){
      yield put({
        type: 'success',
        payload: {
          contrast: {},
          modalContrastVisible: false
        }
      });
    },
    *cameraList({payload}, {put, call}){
      const {data} = yield call(cameraListAll, payload);
      if (data && data.status == 0) {
        const {result} = data;
        if (result && result.length > 0) {
          let cameraList = result;
          yield put({
            type: 'success',
            payload: {
              cameraList
            }
          })

        }
      }
    },
    *groupList({payload}, {put, call}){
      const {data} = yield call(groupList, payload);
      if (data && data.status == 0) {
        const {result} = data;
        if (result && result.length > 0) {
          let groupList = result;
          yield put({
            type: 'success',
            payload: {
              groupList
            }
          })

        }
      }
    },

    *cleanAlarmList({payload}, {put, call}){
      yield put({
        type: 'success',
        payload: {
          alarmList: ''
        }
      })
    }
  },
  reducers: {
    success(state, action){
      return {...state, ...action.payload}
    }
  }
}
