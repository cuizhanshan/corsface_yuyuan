/**
 * Created by Riky on 2017/2/28.
 */
import pathToRegexp from 'path-to-regexp';
import { FACE_PAGE_SIZE, CONTRAST_FACE_PAGE_SIZE } from '../utils/constant';
import {
    faceList,
    groupList,
    newPerson,
    ftVsPoi,
    refreshMatch,
    deleteFacetrack
} from '../services/face';
import { bindFaceTrack } from '../services/system';
import { cameraListAll } from '../services/camera';
import { routerRedux } from 'dva/router';

export default {
    namespace: 'face',
    state: {
        modalCameraTreeVisible: false,
        modalPersonTableVisible: false,
        modalFaceDescVisible: false,
        confirm: {
            type: '',
            visible: false,
            msg: '',
        },
        modalFaceDescData: {},
        modalAlarmData: {},
        selectCameraData: {},
        selectPersonData: {},
        query: {},
        newPerson: {},
        loading: true,
        remindControl: 'none'
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname }) => {
                const match = pathToRegexp('/:foo/:bar?/:id?').exec(pathname);
                if (match && match[1] == 'face') {
                    dispatch({
                        type: 'faceList', payload: {
                            startPercent: 0,
                            endPercent: 1
                        }
                    });
                    dispatch({ type: 'cameraList' });
                }

            });
        },
        fetchContrast({ dispatch, history }){
            return history.listen(({ pathname }) => {
                const match = pathToRegexp('/face/contrast/:faceId/:personId').exec(pathname);
                const facetrackId = match && match[1] ? match[1] : null;
                const personId = match && match[2] ? match[2] : null;

                if (facetrackId && personId) {
                    dispatch({ type: 'contrastPerson', payload: { facetrackId, personId } })
                }

            })
        }
    },
    effects: {
        *spinLoading({ payload }, { put }){
            yield put({
                type: 'success',
                payload: {
                    loading: true
                }
            })
        },
        *showModalAlarm({ payload }, { put }){
            const { modalAlarmData } = payload;
            const { snapImg } = modalAlarmData;
            yield put({
                type: 'success',
                payload: {
                    modalAlarmVisible: true,
                    modalAlarmData,
                    snapImg
                }
            })
        },
        *closeModalAlarm({ payload }, { put }){
            yield put({
                type: 'success',
                payload: {
                    modalAlarmVisible: false,
                    // modalAlarmData: {}
                }
            })
        },
        *showModalCameraTree({ payload }, { put }){
            yield put({
                type: 'success',
                payload: {
                    modalCameraTreeVisible: true,
                }
            })
        },
        *closeModalCameraTree({ payload }, { put }){
            yield put({
                type: 'success',
                payload: {
                    modalCameraTreeVisible: false,
                }
            })
        },
        *showModalPersonTable({ payload }, { put }){
            yield put({
                type: 'success',
                payload: {
                    modalPersonTableVisible: true,
                }
            })
        },
        *closeModalPersonTable({ payload }, { put }){
            yield put({
                type: 'success',
                payload: {
                    modalPersonTableVisible: false,
                }
            })
        },
        *showModalFaceDesc({ payload }, { put }){
            const { modalFaceDescData } = payload;
            yield put({
                type: 'success',
                payload: {
                    modalFaceDescVisible: true,
                    modalFaceDescData: modalFaceDescData
                }
            })
        },
        *closeModalFaceDesc({ payload }, { put }){
            yield put({
                type: 'success',
                payload: {
                    modalFaceDescVisible: false,
                    modalFaceDescData: {}
                }
            })
        },
        *faceList({ payload }, { put, call }){
            console.log('faceList')
            const { pageNo, pageSize, srcId, startTime, endTime, personId, startPercent, endPercent } = payload;
            const { data } = yield call(faceList, {
                pageSize: pageSize ? pageSize : FACE_PAGE_SIZE,
                pageNo: pageNo ? pageNo : 1,
                srcId: srcId ? srcId : '',
                startTime: startTime ? startTime : '',
                endTime: endTime ? endTime : '',
                personId: personId ? personId : '',
                startPercent: startPercent || startPercent == 0 ? startPercent : '',
                endPercent: endPercent ? endPercent : ''
            });

            if (data && data.status == 0) {
                // if(data && data.result.list !== 'null'){
                yield put({
                    type: 'success',
                    payload: {
                        faceList: {
                            page: data.result.page,
                            list: data.result.list
                        },
                        loading: false,
                        remindControl: data.result.list ? 'none' : 'block'
                    }
                });
            }
        },
        *facePageTranslate({ payload }, { put, call, select }){
            const { query } = yield select(state => state.face);
            const { pageNo, pageSize } = payload;

            const { data } = yield call(faceList, {
                pageSize: pageSize ? pageSize : FACE_PAGE_SIZE,
                pageNo: pageNo ? pageNo : 1,
                srcId: query && query.srcId ? query.srcId : '',
                startTime: query && query.startTime ? query.startTime : "",
                endTime: query && query.endTime ? query.endTime : "",
                personId: query && query.personId ? query.personId : ""
            });
            if (data && data.status == 0) {
                yield put({
                    type: 'success',
                    payload: {
                        page: data.result.page,
                        faceList: data.result.list
                    }
                })
            }
        },
        *showConfirmModal({ payload }, { put }){
            const { type } = payload;
            let confirmMsg;

            switch (type) {
                case '1':
                    confirmMsg = '新建目标';
                    break;
                case '2':
                    confirmMsg = '把人脸关联到现有目标';
                    break;
                case '3':
                    confirmMsg = '把人脸关联到相似目标';
                    break;
                case '4':
                    confirmMsg = '将人脸重新匹配目标';
                    break;
            }
            yield put(
                    {
                        type: 'success',
                        payload: {
                            confirm: {
                                visible: true,
                                msg: confirmMsg,
                                type: type
                            },
                            modalFaceDescVisible: false
                        }
                    }
            )
        },
        *closeConfirmModal({ payload }, { put }){
            yield put(
                    {
                        type: 'success',
                        payload: {
                            confirm: {
                                visible: false,
                                msg: '',
                                type: ''
                            },
                            modalFaceDescVisible: true
                        }
                    }
            )
        },
        *onRelateToNew({ payload }, { put }){
            yield put({
                type: 'success',
                payload: {
                    confirm: {
                        visible: false,
                        type: '',
                        msg: ''
                    }
                }
            });
            yield put(routerRedux.push('/face/new'));
        },
        *onRelateToPerson({ payload }, { put, call, select }){
            console.log('onRelateToPerson');
            yield put({
                type: 'success',
                payload: {
                    confirm: {
                        visible: false,
                        type: '',
                        msg: ''
                    }
                }
            })
        },
        *onRelateToJudge({payload}, {put, call, select}){
            console.log('onRelateToJudge');

            const {modalFaceDescData} = yield select(state => state.face);

            if (modalFaceDescData) {

                let facetrackId = modalFaceDescData.code;
                let personId = '';
                if(modalFaceDescData.judgePerson){
                    personId = modalFaceDescData.judgePerson.personId
                }else if(modalFaceDescData.mostPerson){
                    personId = modalFaceDescData.mostPerson.personId
                }else{
                    return false;
                    //弹窗提示没有可关联的人
                }

                const { data } = yield call(bindFaceTrack, {facetrackId, personId});
                console.log(data)
                if(data && data.status === 0){
                    yield put({
                        type: 'success',
                        payload: {
                            confirm: {
                                visible: false,
                                type: '',
                                msg: ''
                            }
                        }
                    })
                    yield put({
                        type: 'faceList',
                        payload: {
                            pageSize: FACE_PAGE_SIZE,
                            pageNo:1,
                            srcId:'',
                            startTime: '',
                            endTime:  '',
                            personId: '',
                            startPercent: '',
                            endPercent: ''
                        }
                    })
                }
            }




        },
        *groupList({ payload }, { put, call }){
            const { data } = yield call(groupList);
            if (data && data.status == 0) {
                yield put({
                    type: 'success',
                    payload: {
                        groupList: data.result
                    }
                })
            }
        },
        *newPerson({ payload }, { put, call }){
            const { data } = yield call(newPerson, payload);
            if (data && data.status == 0) {
                yield put({
                    type: 'success',
                    payload: {
                        modalFaceDescData: {},
                        modalCameraTreeVisible: false,
                        modalPersonTableVisible: false,
                        modalFaceDescVisible: false,
                    }
                });
                yield put(routerRedux.push('/face'))

            } else {
                yield put({
                    type: 'success',
                    payload: {
                        newPerson: {
                            error: data.message
                        }
                    }
                });
            }
        },
        *onCloseNewPerson({ payload }, { put }){
            yield put({
                type: 'success',
                payload: {
                    modalFaceDescVisible: true
                }
            });
            yield put(routerRedux.push('/face'))
        },
        *contrastPerson({ payload }, { put, call }){
            const { data } = yield call(ftVsPoi, payload);
            if (data && data.status === 0) {
                yield put({
                    type: 'success',
                    payload: {
                        contrast: {
                            face: data.result.face,
                            person: data.result.person,
                            personFace: data.result.person && data.result.person.faceList && data.result.person.faceList.length > 0 ? data.result.person.faceList[0] : null,
                            page: {
                                total: data.result.person.faceList && data.result.person.faceList.length > 0 ? data.result.person.faceList.length : 0,
                                pageSize: CONTRAST_FACE_PAGE_SIZE
                            },
                            faceList: data.result.person && data.result.person.faceList && data.result.person.faceList.filter((value, i) => {
                                return i < CONTRAST_FACE_PAGE_SIZE;
                            })
                        }
                    }
                });
            }
            else {
                yield put(routerRedux.push('/face'));
            }
        },
        *contrastRowSelect({ payload }, { put, select }){

            let { contrast } = yield select(state => state.face);

            contrast.personFace = payload;

            yield put({
                type: 'success',
                payload: {
                    contrast: contrast
                }
            });
        },
        *contrastPageTranslate({ payload }, { put, select }){
            console.log('contrastPageTranslate')
            let { contrast } = yield select(state => state.face);
            const { pageNo, pageSize } = payload;

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
        *contrastClosed({ payload }, { put }){
            yield put(routerRedux.goBack());
        },

        *cameraList({ payload }, { put, call }){
            const { data } = yield call(cameraListAll, payload);
            if (data && data.status == 0) {
                const { result } = data;
                if (result && result.length > 0) {
                    let cameraList = result;
                    yield put({
                        type: 'success',
                        payload: {
                            cameraList: cameraList,
                            loading: false
                        }
                    })

                }
            }
        },

        *cleanFaceList({ payload }, { put, call }){
            yield put({
                type: 'success',
                payload: {
                    faceList: ''
                }
            })
        },
        *refreshMatch({ payload }, { put, call }){
            const { data } = yield call(refreshMatch, payload);

            if (data) {
                const result = yield call(faceList, {
                    pageSize: FACE_PAGE_SIZE,
                    pageNo: 1,
                });

                if (result.data && result.data.status == 0) {
                    yield put({
                        type: 'success',
                        payload: {
                            faceList: {
                                page: result.data.result.page,
                                list: result.data.result.list
                            },
                            confirm: {
                                visible: false,
                                msg: '',
                                type: ''
                            },
                        }
                    })
                }

            }
        },
        *deleteFacetrack({ payload }, { put, call }){
            const { data } = yield call(deleteFacetrack, payload);

            if (data && data.status == 0) {
                const result = yield call(faceList, {
                    pageSize: FACE_PAGE_SIZE,
                    pageNo: 1,
                });
                if (result.data && result.data.status == 0) {
                    yield put({
                        type: 'success',
                        payload: {
                            faceList: {
                                page: result.data.result.page,
                                list: result.data.result.list
                            }
                        }
                    })
                }
            }
        }
    },
    reducers: {
        success(state, action){
            return { ...state, ...action.payload }
        }
    }
}



