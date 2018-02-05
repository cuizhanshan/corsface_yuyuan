/**
 * Created by Jason on 2017/12/26.
 */
import { dictoryList, dictoryAdd, dictoryModify, dictoryDelete } from '../services/system';
import { notification } from 'antd';

export default {
    namespace: 'dictory',
    state: {
        dictoryList: [],
        dictoryPage: {
            total:0,
            currentPage: 0
        },
        EditSystemVisiable: false,
        editSystemView: {
            action: 'new'
        },
        dictoryListParams: {
            pageSize: 10,
            pageNo: 1,
            tag:'',
            key: '',
            name: ''
        },
        confirmModalVisible: false
    },
    subscriptions: {},
    effects: {
        *getDictoryList ({payload}, { put, call, select }){
            const params = yield select( store => store.dictory.dictoryListParams );
            const { data } = yield call(dictoryList, params);
            console.log(data);
            if( data && data.status === 0 ){
                yield put({
                    type: 'success',
                    payload: {
                        dictoryList: data.result.list,
                        dictoryPage: data.result.page
                    }
                })
            }
        },
        *dictoryAdd ({payload}, {put, call, select}){
            const editSystemView = yield select(store => store.dictory.editSystemView);
            let params = {
                key: editSystemView.dicKey,
                value: editSystemView.dicValue,
                tag: editSystemView.dicTag,
                name: editSystemView.dicName ? editSystemView.dicName : '',
                memo: editSystemView.memo ? editSystemView.memo : '',
                sortNo: editSystemView.sortNo ? editSystemView.sortNo : 0
            }
            const { data } = yield call(dictoryAdd, params);
            if( data && data.status === 0 ){
                yield put({
                    type: 'getDictoryList'
                });
                yield put({
                    type: 'success',
                    payload: {
                        EditSystemVisiable: false
                    }
                });
            }else{
                notification.error({
                    message: '操作失败',
                    description: data.message
                })
            }
        },
        *dictoryModify ({payload}, {put, call, select}){
            const editSystemView = yield select(store => store.dictory.editSystemView);
            let params = {
                id: editSystemView.id,
                key: editSystemView.dicKey,
                value: editSystemView.dicValue,
                tag: editSystemView.dicTag,
                name: editSystemView.dicName ? editSystemView.dicName : '',
                memo: editSystemView.memo ? editSystemView.memo : '',
                 sortNo: editSystemView.sortNo ? editSystemView.sortNo : 0
            }
            const { data } = yield call(dictoryModify, params);
            if( data && data.status === 0 ){
                yield put({
                    type: 'getDictoryList'
                });
                yield put({
                    type: 'success',
                    payload: {
                        EditSystemVisiable: false
                    }
                });
            }else{

                notification.error({
                    message: '操作失败',
                    description: data.message
                })
            }
        },
        *dictoryDelete ({payload}, {put, call, select}){
            const params = yield select( store => store.dictory.deleteParam );
            const { data } = yield call(dictoryDelete, params);

            if( data && data.status === 0 ){
                yield put({
                    type: 'getDictoryList'
                });
                yield put({
                    type: 'success',
                    payload: {
                        confirmModalVisible: false
                    }
                })
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

    },
    reducers: {
        success(state, action){
            return{ ...state, ...action.payload }
        }
    }
}
