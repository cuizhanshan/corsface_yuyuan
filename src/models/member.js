/**
 * Created by Riky on 2017/3/31.
 */

/**
 * Created by Riky on 2017/2/23.
 */
import {SYSTEM_TARGET_GROUP_SIZE} from '../utils/constant'
import {
  memberList,
  notMemberList,
  deleteMember,
  groupDetail,
  addGroupMember,
} from '../services/system';
import pathToRegexp from 'path-to-regexp';
export default {
  namespace: 'member',
  state: {
    modalVisible: false,
    confirmModalVisible: false,
    member: {},
    detail: {},
    notMember: {},
    errorMsg: ''
  },
  subscriptions: {
    fetchMemberList({dispatch, history}) {
      return history.listen(({pathname}) => {
        const match = pathToRegexp('/system/aims/group/:id?').exec(pathname);
        if (match && match[1]) {
          dispatch({type: 'memberList', payload: {groupId: match[1]}});
          dispatch({type: 'groupDetail', payload: {groupId: match[1]}});
        }
      });
    }
  },
  effects: {
    *memberList({payload}, {put, call, select}){
      const {member} = yield select(state => state.member);
      const {data} = yield call(memberList, {
        pageSize: member && member.page && member.page.pageSize ? member.page.pageSize : SYSTEM_TARGET_GROUP_SIZE,
        pageNo: member && member.page && member.page.currentPage ? member.page.currentPage : 1,
        groupId: payload.groupId,
      });

      if (data && data.status == 0) {

        yield put({
          type: 'success',
          payload: {
            member: {
              list: data.result.list,
              page: data.result.page
            }
          }
        });
      }
    },
    *groupDetail({payload}, {put, call}){
      const {data} = yield call(groupDetail, {groupId: payload.groupId});
      if (data && data.status == 0) {
        yield put({
          type: 'success',
          payload: {
            detail: data.result
          }
        });
      }
    },
    *showAddMember({payload}, {put, call, select}){
      const {notMember} = yield select(state => state.member);
      const {data} = yield call(notMemberList, {
        pageSize: notMember && notMember.page && notMember.page.pageSize ? notMember.page.pageSize : SYSTEM_TARGET_GROUP_SIZE,
        pageNo: notMember && notMember.page && notMember.page.currentPage ? notMember.page.currentPage : 1,
        groupId: payload.groupId,
      });

      if (data && data.status == 0) {
        yield put({
          type: 'success',
          payload: {
            modalVisible: true,
            notMember: {
              list: data.result.list,
              page: data.result.page
            }
          }
        });
      }
    },
    *closeAddMember({payload}, {put}){
      yield put({
        type: 'success',
        payload: {
          modalVisible: false
        }
      });
    },
    *closeConfirmModal({payload}, {put}){
      yield put({
        type: 'success',
        payload: {
          modalVisible: true,
          confirmModalVisible: false,
          addMemberParam: {},
          deleteParam: {}
        }
      });
    },
    *showAddConfirmModal({payload}, {put}){
      yield put({
        type: 'success',
        payload: {
          modalVisible: false,
          confirmModalVisible: true,
          addMemberParam: payload
        }
      });
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
    *addMember({payload}, {put, call, select}){
      const {addMemberParam, detail, member} = yield select(state => state.member);
      if (addMemberParam) {
        const {data} = yield call(addGroupMember, addMemberParam);
        if (data && data.status == 0) {
          let result = yield call(memberList, {
            pageSize: member && member.page && member.page.pageSize ? member.page.pageSize : SYSTEM_TARGET_GROUP_SIZE,
            pageNo: member && member.page && member.page.currentPage ? member.page.currentPage : 1,
            groupId: detail.id
          });

          yield put({
            type: 'success',
            payload: {
              modalVisible: false,
              confirmModalVisible: false,
              addMemberParam: {},
              member: {
                list: result && result.data && result.data.result && result.data.result.list ? result.data.result.list : null,
                page: result && result.data && result.data.result && result.data.result.page ? result.data.result.page : null
              }
            }
          });
        } else {
          yield put({
            type: 'success',
            payload: {
              modalVisible: false,
              confirmModalVisible: false,
              errorMsg: data ? data.message : '接口调用异常'
            }
          });
        }
      }
    },
    *deleteMember({payload}, {put, call, select}){
      const {deleteParam, detail, member} = yield select(state => state.member);
      if (deleteParam) {
        const {data} = yield call(deleteMember, deleteParam);
        if (data && data.status == 0) {
          let result = yield call(memberList, {
            pageSize: member && member.page && member.page.pageSize ? member.page.pageSize : SYSTEM_TARGET_GROUP_SIZE,
            pageNo: member && member.page && member.page.currentPage ? member.page.currentPage : 1,
            groupId: detail.id
          });

          yield put({
            type: 'success',
            payload: {
              modalVisible: false,
              confirmModalVisible: false,
              deleteParam: {},
              member: {
                list: result && result.data && result.data.result && result.data.result.list ? result.data.result.list : null,
                page: result && result.data && result.data.result && result.data.result.page ? result.data.result.page : null
              }
            }
          });
        } else {
          yield put({
            type: 'success',
            payload: {
              confirmModalVisible: false,
              errorMsg: data ? data.message : '接口调用异常'
            }
          });
        }
      }
    },
    *memberPageTranslate({payload}, {put, call}){

      const {pageNo, pageSize, groupId} = payload;
      const {data} = yield call(memberList, {
        pageSize: pageSize ? pageSize : SYSTEM_TARGET_GROUP_SIZE,
        pageNo: pageNo ? pageNo : 1,
        groupId: groupId
      });
      if (data && data.status == 0) {
        yield put({
          type: 'success',
          payload: {
            member: {
              list: data.result.list,
              page: data.result.page
            }
          }
        })
      }

    },
    *notMemberPageTranslate({payload}, {put, call}){
      const {pageNo, pageSize, groupId} = payload;
      const {data} = yield call(notMemberList, {
        pageSize: pageSize ? pageSize : SYSTEM_TARGET_GROUP_SIZE,
        pageNo: pageNo ? pageNo : 1,
        groupId: groupId
      });
      if (data && data.status == 0) {
        yield put({
          type: 'success',
          payload: {
            notMember: {
              list: data.result.list,
              page: data.result.page
            }
          }
        })
      }
    },
  },
  reducers: {
    success(state, action){
      return {...state, ...action.payload}
    }
  }
}



