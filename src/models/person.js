/**
 * Created by Riky on 2017/4/7.
 */
import {
  poiList,
  poiDetail,
  addByUpload,
  deletePersonImg,
  removeFaceTrack,
  modify,
  deletePoi,
  faceDetail,
  matchFacetrack2Person,
  getMatchedPersonByTransId,
  getFacetrackInfo,
  matchFacetrack2PersonForPhoto
} from '../services/system';

import {routerRedux} from 'dva/router';
import {SYSTEM_TARGET_PERSON_SIZE} from '../utils/constant';
import {groupList, createFacetrackByImg} from '../services/face';
export default {
  namespace: 'person',
  state: {
    loading: true,
    errorMsg: '',
    matchPoiProcessed: false,
    confirmModalVisible: false,
    remindControl: '',
    poiListParams: {
      pageSize:  SYSTEM_TARGET_PERSON_SIZE,
      pageNo: 1,
      groupId: '',
      name:'',
      gender: '',
      startTime: '',
      endTime: '',
      identityCard: ''
    }
  },
  subscriptions: {},
  effects: {
    *groupList({payload}, {put, call}){
      const {data} = yield call(groupList);
      if (data && data.status == 0) {
        yield put({
          type: 'success',
          payload: {
            groupList: data.result,
            // loading: false
          }
        })
      }
    },
    *poiList({payload}, {put, call, select}){
      const {data} = yield call(poiList, yield select((state) => state.person.poiListParams));
      if (data && data.status == 0) {
        yield put({
          type: 'success',
          payload: {
            poi: {
              list: data.result.list,
              page: data.result.page,
            },
            loading: false,
            remindControl: data.result.list ? 'none' : 'block'
          }
        })
      }

    },
    *poi({payload}, {put, call}){
      const {data} = yield call(poiDetail, payload);
      if (data && data.status == 0) {
        let detail = {};
        detail.poi = data.result;

        if (data.result.faceList && data.result.faceList.length > 0) {
          detail.page = {
            total: data.result.faceList && data.result.faceList.length > 0 ? data.result.faceList.length : 0,
            pageSize: SYSTEM_TARGET_PERSON_SIZE
          };
          detail.faceList = data.result.faceList.filter((value, i) => {
            return i < SYSTEM_TARGET_PERSON_SIZE;
          });
        }

        yield put({
          type: 'success',
          payload: {
            detail: detail
          }
        })
      } else {
        yield put({
          type: 'success',
          payload: {
            errorMsg: data.message,

          }
        })
      }
    },
    *editPageTranslate({payload}, {put, select}){
      let {detail} = yield select(state => state.person);
      const {pageNo, pageSize} = payload;
      detail.faceList = detail.poi.faceList.filter((value, i) => {
        return (((parseInt(pageNo) - 1) * pageSize) <= i) && (i <= (parseInt(pageNo) * parseInt(pageSize) - 1));
      });
      yield put({
        type: 'success',
        payload: {
          detail: detail
        }
      });
    },
    *addByUpload({payload}, {put, call}){
      const {data} = yield call(addByUpload, payload);
      if (data && data.status == 0) {
        yield put(routerRedux.push('/system'));
      } else {
        yield put({
          type: 'success',
          payload: {
            errorMsg: data.message
          }
        })
      }
    },
    *cleanDetail({payload}, {put}){
      yield put({
        type: 'success',
        payload: {
          detail: {}
        }
      })
    },
    *deleteImg({payload}, {put, select, call}){
      let {detail, deleteImgParam} = yield select(state => state.person);
      const {id, name} = deleteImgParam;
      const {data} = yield call(deletePersonImg, {personId: id, imgName: name});
      if (data && data.status == 0) {
        if (detail && detail.poi) {

          let {uploadFiles, uploadImgs} = detail.poi;
          let index = -1;

          uploadFiles.map((value, i) => {
            if (name == value) {
              index = i;
            }
          });

          if (index != -1) {
            uploadFiles.splice(index, 1);
            uploadImgs.splice(index, 1);
            detail.poi.uploadFiles = uploadFiles;
            detail.poi.uploadImgs = uploadImgs;
          }
          yield put({
            type: 'success',
            payload: {
              detail: detail,
              deleteImgParam: {},
              confirmModalVisible: false
            }
          })
        }
      } else {
        yield put({
          type: 'success',
          payload: {
            errorMsg: data.message,
            confirmModalVisible: false
          }
        })
      }
    },
    *deleteFaceTrack({payload}, {put, select, call}){
      let {deleteFaceTrackParam} = yield select(state => state.person);
      const {personId, ids} = deleteFaceTrackParam;
      const {data} = yield call(removeFaceTrack, {
        facetrackIds: ids,
        personId: personId
      });

      if (data && data.status == 0) {

        const result = yield call(poiDetail, {personId});

        if (result.data && result.data.status == 0) {

          let detail = {};

          detail.poi = result.data.result;


          if (result.data.result && result.data.result.faceList && result.data.result.faceList.length > 0) {


            detail.page = {
              total: result.data.result.faceList && result.data.result.faceList.length > 0 ? result.data.result.faceList.length : 0,
              pageSize: SYSTEM_TARGET_PERSON_SIZE
            };
            detail.faceList = result.data.result.faceList.filter((value, i) => {
              return i < SYSTEM_TARGET_PERSON_SIZE;
            });
          }

          yield put({
            type: 'success',
            payload: {
              detail: detail,
              deleteFaceTrackParam: {},
              confirmModalVisible: false
            }
          })
        } else {
          yield put({
            type: 'success',
            payload: {
              errorMsg: data.message,
              confirmModalVisible: false
            }
          })
        }
      } else {
        yield put({
          type: 'success',
          payload: {
            errorMsg: data.message,
            confirmModalVisible: false
          }
        })
      }
    },
    *modifyPoi({payload}, {put, select, call}){
      let {editParam} = yield select(state => state.person);

      const {data} = yield call(modify, editParam);

      if (data && data.status == 0) {

        yield put({
          type: 'success',
          payload: {
            editParam: {},
            confirmModalVisible: false,
          }
        });
        yield put(routerRedux.push('/system'))
      } else {
        yield put({
          type: 'success',
          payload: {
            errorMsg: data.message,
            confirmModalVisible: false
          }
        })
      }
    },
    *closeConfirmModal({payload}, {put}){
      yield put({
        type: 'success',
        payload: {
          confirmModalVisible: false,
          deleteImgParam: {},
          deleteFaceTrackParam: {},
          deletePoiParam: {},
          editParam: {}
        }
      });
    },
    *showDeleteImgConfirmModal({payload}, {put}){
      yield put({
        type: 'success',
        payload: {
          deleteImgParam: payload,
          confirmModalVisible: true
        }
      });
    },
    *showDeleteFaceTrackConfirmModal({payload}, {put}){
      yield put({
        type: 'success',
        payload: {
          deleteFaceTrackParam: payload,
          confirmModalVisible: true
        }
      });
    },
    *showModifyPoiConfirmModal({payload}, {put}){
      yield put({
        type: 'success',
        payload: {
          editParam: payload,
          confirmModalVisible: true
        }
      });
    },
    *showDeletePoiConfirmModal({payload}, {put}){
      yield put({
        type: 'success',
        payload: {
          deletePoiParam: payload.ids,
          confirmModalVisible: true
        }
      });
    },
    *deletePoi({payload}, {put, select, call}){

      let {deletePoiParam} = yield select(state => state.person);
      if (deletePoiParam) {
        for (let i = 0; i < deletePoiParam.length; i++) {
          yield call(deletePoi, {personId: deletePoiParam[i]})
        }
      }
      const {data} = yield call(poiList, {
        pageSize: SYSTEM_TARGET_PERSON_SIZE,
        pageNo: 1,
      });
      if (data && data.status == 0) {
        yield put({
          type: 'success',
          payload: {
            poi: {
              list: data.result.list,
              page: data.result.page
            },
            confirmModalVisible: false
          }
        })
      }
    },
    *createFaceTrack({payload}, {put, call}){
      const {data} = yield call(createFacetrackByImg, payload);
      if (data && data.status == 0) {
        const {result} = data;
        yield put(routerRedux.push(`/system/aims/photoMatch/${result}`));
      } else {
        yield put({
          type: 'success',
          payload: {
            errorMsg: data ? data.message : ''
          }
        })
      }

    },
    *face({payload}, {put, call}){
      const {data} = yield call(getFacetrackInfo, payload);
      if (data && data.status === 0) {
        const {result} = data;
        yield put({
          type: 'success',
          payload: {
            faceDetail: result,
            loading: false
          }
        });
      } else {
        yield put({
          type: 'success',
          payload: {
            errorMsg: data ? data.message : ''
          }
        })
      }
    },
    *spinLoading({payload}, {put}){
      yield put({
        type: 'success',
        payload: {
          loading: true
        }
      })
    },
    *clearMatch({payload}, {put}){
      yield put({
        type: 'success',
        payload: {
          matchedPoiList: '',
        }
      })
    },
    *clearErrorMsg({payload}, {put}){
      yield put({
        type: 'success',
        payload: {
          errorMsg: ''
        }
      })
    },
    *cancelMatch({payload}, {put}){
      yield put({
        type: 'success',
        payload: {
          matchPoiProcessed: true
        }
      })
    },
    *resetMatch({payload}, {put}){
      yield put({
        type: 'success',
        payload: {
          matchPoiProcessed: false
        }
      })
    },
    *matchFaceTrack2Person({payload}, {put, call, select}){

      const {data} = yield call(matchFacetrack2PersonForPhoto, payload);
      if (data && data.status == 0) {
        const delay = timeout => {
          return new Promise(resolve => {
            setTimeout(resolve, timeout);
          });
        };
        let transactionId = data.result;
        yield call(delay, 2000);
        let person = yield select(state => state.person);
        let processed = person.matchPoiProcessed;

        let entend = false;

        while ((!processed)&&(!entend)) {
          yield call(delay, 1000);
          const matchResult = yield call(getMatchedPersonByTransId, {transactionId, facetrackId: payload.facetrackId});

          if (matchResult.data && matchResult.data.status == 0) {

            let loading = !matchResult.data.result.processed;

            if (matchResult.data.result.processed) {
              processed = matchResult.data.result.processed;
            } else {
              yield call(delay, 2000);
              person = yield select(state => state.person);
              processed = person.matchPoiProcessed;
            }
            yield put({
              type: 'success',
              payload: {
                matchedPoiList: matchResult.data.result.list,
                loading: loading,
                matchPoiProcessed: processed
              }
            })
          } else {
            yield put({
              type: 'success',
              payload: {
                matchedPoiList: '',
                loading: false,
                matchPoiProcessed: true
              }
            })
            entend = true;
          }
        }
      } else {
        yield put({
          type: 'success',
          payload: {
            errorMsg: data.message,
            loading: false
          }
        })
      }
    },
  }
  ,
  reducers: {
    success(state, action){
      return {...state, ...action.payload}
    }
  }
}
