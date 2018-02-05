/**
 * Created by Riky on 2017/2/23.
 */
import { SYSTEM_TARGET_GROUP_SIZE } from '../utils/constant';
import { Modal } from 'antd'
import {
  groupList,
  addGroup,
  modifyGroup,
  deleteGroup,
  getCatagoryListAll,
  list,
  addCameraGroup,
  ougunitList,
  deleteCameraGroup,
  modifeCameraGroup
} from '../services/system';

export default {
  namespace: 'group',
  state: {
    group: {},
    modalVisible: false,
    confirmModalVisible: false,
    errorMsg: '',
    manageList: {
      pageSize: 10,
      pageNo: 1,
      name: ''
    },
    groupManageList: [],
    getCatagoryListAll: [],
    addGroupVisiable: false,
    editGroupVisiable: false,
    addCameraGroupParam: {
      name: '',
      sortNo: '',
      memo: '',
      orgunitId: '',
      parentId: '1'
    },
    modifeCameraGroupParams:{}
  },
  subscriptions: {},

  effects: {
    * groupList({ payload }, { put, call, select }) {
      const { group } = yield select(state => state.group);
      const { data } = yield call(groupList, {
        pageSize: group && group.page && group.page.pageSize ? group.page.pageSize : SYSTEM_TARGET_GROUP_SIZE,
        pageNo: group && group.page && group.page.currentPage ? group.page.currentPage : 1,
        srcId: group && group.query && group.query.name ? group.query.name : ''
      });
      if (data && data.status == 0) {
        yield put({
          type: 'success',
          payload: {
            group: {
              list: data.result.list,
              page: data.result.page
            },
            modalVisible: false
          }
        });
      }
    },
    * groupPageTranslate({ payload }, { put, call }) {
      const { pageNo, pageSize, name } = payload;
      const { data } = yield call(groupList, {
        pageSize: pageSize || SYSTEM_TARGET_GROUP_SIZE,
        pageNo: pageNo || 1,
        name: name || ''
      });
      if (data && data.status == 0) {
        yield put({
          type: 'success',
          payload: {
            group: {
              list: data.result.list,
              page: data.result.page
            }
          }
        });
      }
    },
    * modifyGroup({ payload }, { put, call, select }) {
      const { group, editParam } = yield select(state => state.group);
      const { data } = yield call(modifyGroup, editParam);

      if (data && data.status === 0) {
        const list = yield call(groupList, {
          pageSize: group && group.page && group.page.pageSize ? group.page.pageSize : SYSTEM_TARGET_GROUP_SIZE,
          pageNo: group && group.page && group.page.currentPage ? group.page.currentPage : 1,
          srcId: group && group.query && group.query.name ? group.query.name : ''
        });

        if (list.data && list.data.status === 0) {
          const { result } = list.data;
          yield put({
            type: 'success',
            payload: {
              group: {
                list: result.list,
                page: result.page
              },
              confirmModalVisible: false
            }
          });
        } else {
          yield put({
            type: 'success',
            payload: {
              errorMsg: list.data ? list.data.message : '',
              confirmModalVisible: false
            }
          });
        }
      } else {
        yield put({
          type: 'success',
          payload: {
            errorMsg: data ? data.message : '',
            confirmModalVisible: false
          }
        });
      }
    },
    * addGroup({ payload }, { put, call, select }) {
      const { group, addParam } = yield select(state => state.group);
      const { data } = yield call(addGroup, addParam);

      if (data && data.status == 0) {
        const list = yield call(groupList, {
          pageSize: group && group.page && group.page.pageSize ? group.page.pageSize : SYSTEM_TARGET_GROUP_SIZE,
          pageNo: group && group.page && group.page.currentPage ? group.page.currentPage : 1,
          srcId: group && group.query && group.query.name ? group.query.name : ''
        });

        if (list.data && list.data.status == 0) {
          const { result } = list.data;
          yield put({
            type: 'success',
            payload: {
              group: {
                list: result.list,
                page: result.page
              },
              confirmModalVisible: false
            }
          });
        } else {
          yield put({
            type: 'success',
            payload: {
              errorMsg: list.data ? list.data.message : '',
              confirmModalVisible: false
            }
          });
        }
      } else {
        yield put({
          type: 'success',
          payload: {
            errorMsg: data ? data.message : '',
            confirmModalVisible: false
          }
        });
      }
    },
    * deleteGroup({ payload }, { put, call, select }) {
      const { deleteParam, group } = yield select(state => state.group);
      const { ids } = deleteParam;

      if (ids && ids.length > 0) {
        for (let i = 0; i < ids.length; i++) {
          yield call(deleteGroup, { groupId: ids[i] });
        }
      }
      const { data } = yield call(groupList, {
        pageSize: group && group.page && group.page.pageSize ? group.page.pageSize : SYSTEM_TARGET_GROUP_SIZE,
        pageNo: group && group.page && group.page.currentPage ? group.page.currentPage : 1,
        srcId: group && group.query && group.query.name ? group.query.name : ''
      });

      if (data && data.status == 0) {
        yield put({
          type: 'success',
          payload: {
            group: {
              list: data.result.list,
              page: data.result.page
            },
            confirmModalVisible: false
          }
        });
      }
    },
    * triggerGroupModal({ payload }, { put, select }) {
      const { modalVisible } = yield select(state => state.group);
      yield put({
        type: 'success',
        payload: {
          modalVisible: !modalVisible
        }
      });
    },
    * closeConfirmModal({ payload }, { put }) {
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
    * showDeleteConfirmModal({ payload }, { put }) {
      yield put({
        type: 'success',
        payload: {
          confirmModalVisible: true,
          deleteParam: payload
        }
      });
    },
    * showAddConfirmModal({ payload }, { put }) {
      yield put({
        type: 'success',
        payload: {
          confirmModalVisible: true,
          modalVisible: false,
          addParam: payload
        }
      });
    },
    * showEditConfirmModal({ payload }, { put }) {
      yield put({
        type: 'success',
        payload: {
          confirmModalVisible: true,
          modalVisible: false,
          editParam: payload
        }
      });
    },

    * devicesList({ payload }, { put, call }) {
      const { data } = yield call(getDevices);
      if (data && data.status == 0) {
        yield put({
          type: 'success',
          payload: {
            devicesList: data.result
          }
        });
      } else {
        yield put({
          type: 'success',
          payload: {
            errorMsg: data ? data.message : ''
          }
        });
      }
    },
    * clearMsg({ payload }, { put, call }) {
      yield put({
        type: 'success',
        payload: {
          errorMsg: ''
        }
      });
    },
    *ougunitList ({payload}, {put, call, select}){
      const { data } = yield call(ougunitList, {pageSize: 10, pageNo:1})
      if(data && data.status === 0){
        yield put({
          type: 'success',
          payload: {
            ougunitList: data.result.list
          }
        })
      }
    },
    // 分组管理
    * groupManageList({ payload }, { put, call, select }) {
      const params = yield select(state => state.group.manageList);
      const { data } = yield call(list, params);

      if (data && data.status === 0) {
        yield put({
          type: 'success',
          payload: {
            groupManageList: data.result
          }
        });
      }
    },
    * addCameraGroup({ payload }, { put, call, select }){
      const params = yield select(state => state.group.addCameraGroupParam)
      const { data } = yield call(addCameraGroup,params)
      if(data && data.status ===0){
        console.log('添加成功')

        yield put({
          type: 'groupManageList',
          payload: {
            pageSize: 11,
            pageNo: 1,
            name: ''
          }
        })
        yield put({
          type: 'success',
          payload: {
            addGroupVisiable: false,
            addCameraGroupParam: {
              name: '',
              sortNo: '',
              memo: '',
              orgunitId: '',
              parentId: '1'
            }
          }
        })
        Modal.success({
          title: '成功',
          content: '添加成功'
        })
      }else{
        Modal.error({
          title: '添加失败',
          content: data.message
        })
      }
    },
    *deleteCameraGroup({payload}, {put, call}){
      const { data } = yield call(deleteCameraGroup, payload)
      if(data && data.status === 0){
        console.log('删除成功')
        yield put({
          type: 'groupManageList',
          payload: {
            pageSize: 11,
            pageNo: 1,
            name: ''
          }
        })
        Modal.success({
          title: '成功',
          content: '删除成功'
        })
      }else{
        Modal.error({
          title: '删除失败',
          content: data.message
        })
      }
    },
  *modifeCameraGroup({payload}, {put, call, select}){
      const query = yield select(state => state.group.modifeCameraGroupParams)
      const params = {
        id: query.id,
        name: query.name,
        parentId: query.parent_id + '',
        sortNo: query.sortNo + '',
        memo: query.memo ? query.memo : '',
        orgunitId: query.orgunit_id ? query.orgunit_id : ''
      }
      console.log(params)
        const { data } = yield call(modifeCameraGroup, params)
        if(data && data.status === 0){
          console.log('修改成功')
          yield put({
            type: 'groupManageList',
            payload: {
              pageSize: 11,
              pageNo: 1,
              name: ''
            }
          })
          yield put({
            type: 'success',
            payload: {
              editGroupVisiable: false
            }
          })
          Modal.success({
            title: '成功',
            content: '修改成功'
          })
        }else{
          Modal.error({
            title: '修改失败',
            content: data.message
          })
        }
      }

  },
  reducers: {
    success(state, action) {
      return { ...state, ...action.payload };
    }
  }
};

