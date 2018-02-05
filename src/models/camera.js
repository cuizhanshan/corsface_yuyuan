/**
 * Created by Riky on 2017/2/23.
 */

import { cameraList, changeCameraStatus, addCamera, modifyCamera, deleteCamera, getDevices, ygGetAccess } from '../services/camera';
import { CAMERA_PAGE_SIZE } from '../utils/constant';
import { routerRedux } from 'dva/router';
export default {
  namespace: 'camera',
  state: {
    errorMsg: '',
    confirmModalVisible: false,
    page: {},
      ygAccess: []
  },
  subscriptions: {},
  effects: {
    *clearMsg({ payload }, { put, call }) {
      yield put({
        type: 'success',
        payload: {
          errorMsg: '',
        },
      });
    },
    *addCamera({ payload }, { put, call }) {
      const { data } = yield call(addCamera, payload);

      if (data && data.status === 0) {
        const list = yield call(cameraList, {
          pageSize: CAMERA_PAGE_SIZE,
          pageNo: 1,
          name: name || '',
          categoryId: 1,
        });
        if (list.data && list.data.status === 0) {
          const { result } = list.data;

          yield put({
            type: 'success',
            payload: {
              cameraList: {
                list: result.list,

              },
              page: list.data.result.page,
              confirmModalVisible: false,
            },
          });
        } else {
          yield put({
            type: 'success',
            payload: {
              errorMsg: list.data ? list.data.message : '',
              confirmModalVisible: false,
            },
          });
        }
        yield put(routerRedux.push('/system/facility/camera'));
      } else {
        yield put({
          type: 'success',
          payload: {
            errorMsg: data ? data.message : '',
          },
        });
      }
    },
    *cameraList({ payload }, { put, call }) {
      console.log('cameraList')

      const { pageNo, pageSize, name } = payload;
      const { data } = yield call(cameraList, {
        pageSize: pageSize || CAMERA_PAGE_SIZE,
        pageNo: pageNo || 1,
        name: name || '',
        categoryId: 1,
      });

      if (data && data.status == 0) {
        const { result } = data;
        console.log(result)
        yield put({
          type: 'success',
          payload: {
            cameraList: {
              list: result.list,
            },
            page: result.page,
          },
        });
      } else {
        yield put({
          type: 'success',
          payload: {
            errorMsg: data.message,
          },
        });
      }
    },
    *showDeleteConfirmModal({ payload }, { put }) {
      yield put({
        type: 'success',
        payload: {
          confirmModalVisible: true,
          deleteParam: payload,
        },
      });
    },
    *showEditConfirmModal({ payload }, { put }) {
      yield put({
        type: 'success',
        payload: {
          confirmModalVisible: true,
          editParam: payload,
        },
      });
    },
    *closeConfirmModal({ payload }, { put }) {
      yield put({
        type: 'success',
        payload: {
          confirmModalVisible: false,
          deleteParam: '',
        },
      });
    },
    *deleteCamera({ payload }, { put, call, select }) {
      const { deleteParam } = yield select(state => state.camera);
      const { data } = yield call(deleteCamera, deleteParam);
      if (data && data.status == 0) {
        const list = yield call(cameraList, {
          pageSize: CAMERA_PAGE_SIZE,
          pageNo: 1,
          name: name || '',
          categoryId: 1,
        });

        if (list.data && list.data.status == 0) {
          const { result } = list.data;
          yield put({
            type: 'success',
            payload: {
              cameraList: {
                list: result.list,

              },
              page: list.data.result.page,
              confirmModalVisible: false,
            },
          });
        } else {
          yield put({
            type: 'success',
            payload: {
              errorMsg: list.data.message,
              confirmModalVisible: false,
            },
          });
        }
      } else {
        yield put({
          type: 'success',
          payload: {
            errorMsg: data.message,
            confirmModalVisible: false,
          },
        });
      }
    },
    *modifyCamera({ payload }, { put, call, select }) {
      const { editParam } = yield select(state => state.camera);
      const { data } = yield call(modifyCamera, editParam);
      if (data && data.status == 0) {
        const list = yield call(cameraList, {
          pageSize: CAMERA_PAGE_SIZE,
          pageNo: 1,
          name: name || '',
          categoryId: 1,
        });

        if (list.data && list.data.status == 0) {
          const { result } = list.data;
          yield put({
            type: 'success',
            payload: {
              cameraList: {
                list: result.list,
              },
              page: list.data.result.page,
              confirmModalVisible: false,
            },
          });
        } else {
          yield put({
            type: 'success',
            payload: {
              errorMsg: list.data.message,
              confirmModalVisible: false,
            },
          });
        }
      } else {
        yield put({
          type: 'success',
          payload: {
            errorMsg: data.message,
            confirmModalVisible: false,
          },
        });
      }
    },
    *changeStatus({ payload }, { put, call }) {
      const { data } = yield call(changeCameraStatus, { srcId: payload });
      if (data && data.status == 0) {
        const list = yield call(cameraList, {
          pageSize: CAMERA_PAGE_SIZE,
          pageNo: 1,
          name: name || '',
          categoryId: 1,
        });

        if (list.data && list.data.status == 0) {
          const { result } = list.data;

          yield put({
            type: 'success',
            payload: {
              cameraList: {
                list: result.list,

              },
              page: list.data.result.page,
              confirmModalVisible: false,
            },
          });
        } else {
          yield put({
            type: 'success',
            payload: {
              errorMsg: list.data.message,
              confirmModalVisible: false,
            },
          });
        }
      } else {
        yield put({
          type: 'success',
          payload: {
            errorMsg: data.message,
          },
        });
      }
    },
    *devicesList({ payload }, { put, call }) {
      const { data } = yield call(getDevices);
      if (data && data.status == 0) {
        yield put({
          type: 'success',
          payload: {
            devicesList: data.result,
          },
        });
      } else {
        yield put({
          type: 'success',
          payload: {
            errorMsg: data ? data.message : '',
          },
        });
      }
    },
      *ygGetAccess({ payload }, { put, call }) {
      const { data } = yield call(ygGetAccess);
      if (data && data.status == 0) {
        yield put({
          type: 'success',
          payload: {
              ygAccess: data.result,
          },
        });
      } else {
        yield put({
          type: 'success',
          payload: {
            errorMsg: data ? data.message : '',
          },
        });
      }
    },
    *clearMsg({ payload }, { put, call }) {
      yield put({
        type: 'success',
        payload: {
          errorMsg: '',
        },
      });
    },
  },
  reducers: {
    success(state, action) {
      return { ...state, ...action.payload };
    },
  },
};

