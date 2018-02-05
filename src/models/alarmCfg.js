/**
 * Created by Riky on 2017/4/5.
 */
import {alarmConfigList, deleteAlarmConfig, modifyAlarmConfig, addAlarmConfig} from '../services/system';
import {SYSTEM_TARGET_GROUP_SIZE} from '../utils/constant';
import {groupList} from '../services/face';
import {cameraListAll} from '../services/camera';
export default {
  namespace: 'alarmCfg',
  state: {
    alarmCfg: {},
    addModalVisible: false,
    editModalVisible: false,
    confirmModalVisible: false,
    errorMsg: ''
  },
  subscriptions: {},
  effects: {
    *clearMsg({payload}, {put, call}){
      yield put({
        type: 'success',
        payload: {
          errorMsg: ''
        }
      })
    },
    *groupList({payload}, {put, call}){
      const {data} = yield call(groupList);
      if (data && data.status == 0) {
        yield put({
          type: 'success',
          payload: {
            groupList: data.result
          }
        })
      }
    },
    *alarmCfgList({payload}, {put, call, select}){
      const {alarmCfg} = yield select(state => state.alarmCfg);
      const {data} = yield call(alarmConfigList, {
        pageSize: alarmCfg && alarmCfg.page && alarmCfg.page.pageSize ? alarmCfg.page.pageSize : SYSTEM_TARGET_GROUP_SIZE,
        pageNo: alarmCfg && alarmCfg.page && alarmCfg.page.currentPage ? alarmCfg.page.currentPage : 1,
        srcId: alarmCfg && alarmCfg.query && alarmCfg.query.srcId ? alarmCfg.query.srcId : '',
        groupId: alarmCfg && alarmCfg.query && alarmCfg.query.groupId ? alarmCfg.query.groupId : ''
      });
      if (data && data.status == 0) {
        yield put({
          type: 'success',
          payload: {
            alarmCfg: {
              list: data.result.list,
              page: data.result.page,
            }
          }
        });
      }
    },
    *alarmCfgPageTranslate({payload}, {put, call}){
      const {pageNo, pageSize, srcId, groupId} = payload;
      const {data} = yield call(alarmConfigList, {
        pageSize: pageSize ? pageSize : SYSTEM_TARGET_GROUP_SIZE,
        pageNo: pageNo ? pageNo : 1,
        srcId: srcId ? srcId : '',
        groupId: groupId ? groupId : ''
      });
      if (data && data.status == 0) {
        yield put({
          type: 'success',
          payload: {
            alarmCfg: {
              list: data.result.list,
              page: data.result.page
            }
          }
        })
      }
    },
    *showDeleteConfirmModal({payload}, {put}){
      yield put({
        type: 'success',
        payload: {
          confirmModalVisible: true,
          deleteParam: payload
        }
      });
    },
    *closeConfirmModal({payload}, {put}){
      yield put({
        type: 'success',
        payload: {
          confirmModalVisible: false,
          addParam: {},
          deleteParam: {},
          editParam: {}
        }
      });
    },
    *modifyAlarmCfg({payload}, {put, call, select}){
      const {alarmCfg, editParam} = yield select(state => state.alarmCfg);
      yield call(modifyAlarmConfig, editParam);
      const {data} = yield call(alarmConfigList, {
        pageSize: alarmCfg && alarmCfg.page && alarmCfg.page.pageSize ? alarmCfg.page.pageSize : SYSTEM_TARGET_GROUP_SIZE,
        pageNo: alarmCfg && alarmCfg.page && alarmCfg.page.currentPage ? alarmCfg.page.currentPage : 1,
        srcId: alarmCfg && alarmCfg.query && alarmCfg.query.srcId ? alarmCfg.query.srcId : '',
        groupId: alarmCfg && alarmCfg.query && alarmCfg.query.groupId ? alarmCfg.query.groupId : ''
      });
      if (data && data.status == 0) {
        yield put({
          type: 'success',
          payload: {
            alarmCfg: {
              list: data.result.list,
              page: data.result.page,
            },
            confirmModalVisible: false
          }
        });
      }
    },
    *addAlarmCfg({payload}, {put, call, select}){
      const {alarmCfg, addParam} = yield select(state => state.alarmCfg);

      const {data} = yield call(addAlarmConfig,addParam);

      if (data && data.status == 0) {

        const result = yield call(alarmConfigList, {
          pageSize: alarmCfg && alarmCfg.page && alarmCfg.page.pageSize ? alarmCfg.page.pageSize : SYSTEM_TARGET_GROUP_SIZE,
          pageNo: alarmCfg && alarmCfg.page && alarmCfg.page.currentPage ? alarmCfg.page.currentPage : 1,
          srcId: alarmCfg && alarmCfg.query && alarmCfg.query.srcId ? alarmCfg.query.srcId : '',
          groupId: alarmCfg && alarmCfg.query && alarmCfg.query.groupId ? alarmCfg.query.groupId : ''
        });
        if (result.data && result.data.status == 0) {
          yield put({
            type: 'success',
            payload: {
              alarmCfg: {
                list: result.data.result.list,
                page: result.data.result.page,
              },
              confirmModalVisible: false
            }
          });
        }
      }else{
        yield put({
          type: 'success',
          payload: {
            errorMsg: data?data.message:'',
            confirmModalVisible: false
          }
        })
      }
    },
    *deleteAlarmCfg({payload}, {put, call, select}){

      const {deleteParam, alarmCfg} = yield select(state => state.alarmCfg);
      const {ids} = deleteParam;

      if (ids && ids.length > 0) {
        for (let i = 0; i < ids.length; i++) {
          yield call(deleteAlarmConfig, {alarmConfigId: ids[i]})
        }
      }
      const {data} = yield call(alarmConfigList, {
        pageSize: alarmCfg && alarmCfg.page && alarmCfg.page.pageSize ? alarmCfg.page.pageSize : SYSTEM_TARGET_GROUP_SIZE,
        pageNo: alarmCfg && alarmCfg.page && alarmCfg.page.currentPage ? alarmCfg.page.currentPage : 1,
        srcId: alarmCfg && alarmCfg.query && alarmCfg.query.srcId ? alarmCfg.query.srcId : '',
        groupId: alarmCfg && alarmCfg.query && alarmCfg.query.groupId ? alarmCfg.query.groupId : ''
      });

      if (data && data.status == 0) {
        yield put({
          type: 'success',
          payload: {
            alarmCfg: {
              list: data.result.list,
              page: data.result.page
            },
            confirmModalVisible: false
          }
        });
      }
    },
    *showAddConfirmModal({payload}, {put}){
      yield put({
        type: 'success',
        payload: {
          confirmModalVisible: true,
          addModalVisible: false,
          addParam: payload
        }
      });
    },
    *showEditConfirmModal({payload}, {put}){
      yield put({
        type: 'success',
        payload: {
          confirmModalVisible: true,
          editModalVisible: false,
          editParam: payload
        }
      });
    },
    *showAddModal({payload}, {put}){
      yield put({
        type: 'success',
        payload: {
          addModalVisible: true
        }
      });
    },
    *showEditModal({payload}, {put}){
      yield put({
        type: 'success',
        payload: {
          editModalVisible: true
        }
      });
    },
    *closeActionModal({payload}, {put}){
      yield put({
        type: 'success',
        payload: {
          addModalVisible: false,
          editModalVisible: false
        }
      });
    },
    *cameraList({payload}, {put, call}){
      const {data} =yield call(cameraListAll, payload);
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
    *clearMsg({payload}, {put, call}){
      yield put({
        type: 'success',
        payload: {
          errorMsg:''
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




