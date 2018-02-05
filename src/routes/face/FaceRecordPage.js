/**
 * Created by Riky on 2017/2/24.
 */

import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router'
import { Row, Spin } from 'antd';
import SearchBar from '../../components/common/SearchBarView';
import PaginationView from '../../components/common/PaginationView';
import record from '../../style/record.css';
import FacetrackCardView from '../../components/common/FacetrackCardView';
import styles from './FaceRecord.css';

import AlarmDescView from '../../components/index/AlarmDescView';
import ModalFaceDescView from '../../components/face/ModalFaceDescView';
import ConfirmModal from '../../components/common/ConfirmModal';

import MayLayout from '../../components/common/MainLayout';
import NoDateRemind from '../../components/common/NoDateRemind';

class FaceRecordPage extends React.Component {

    constructor(props) {
        super(props);
        this.searchSubmit = this.searchSubmit.bind(this);
        this.pageTranslate = this.pageTranslate.bind(this);
        this.onRefreshMatch = this.onRefreshMatch.bind(this);
        this.onConfirmSubmit = this.onConfirmSubmit.bind(this);
        this.showConfirmModal = this.showConfirmModal.bind(this);
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'face/spinLoading'
        });

    }

    componentWillUnmount() {
        this.props.dispatch({
            type: 'face/cleanFaceList'
        });

    }

    pageTranslate = (value) => {

        let payload = this.state && this.state.query ? this.state.query : {};

        payload.pageNo = value.pageNo;
        payload.pageSize = value.pageSize;

        this.props.dispatch({
            type: 'face/faceList',
            payload
        })
        this.props.dispatch({
            type: 'face/spinLoading'
        })
    };

    searchSubmit = (value) => {
        const { srcId, startTime, endTime, startPercent, endPercent } = value;

        this.setState({ query: value });
        this.props.dispatch({
            type: 'face/cleanFaceList'
        });
        this.props.dispatch({
            type: 'face/faceList',
            payload: {
                srcId: srcId ? srcId : '',
                startTime: startTime ? startTime : '',
                endTime: endTime ? endTime : '',
                startPercent: startPercent,
                endPercent: endPercent
            }
        });
        this.props.dispatch({
            type: 'face/spinLoading'
        })
    };

    onFaceCardClick = (value) => {
        this.props.dispatch({
            type: 'face/showModalFaceDesc',
            payload: {
                modalFaceDescData: value
            }
        });
    };
    onWhiteViewFaceCardClick = (value) => {
        this.props.dispatch({
            type: 'face/showModalAlarm',
            payload: {
                modalAlarmData: value
            }
        });
    }
    closeWhiteViewFaceCard = () => {
        this.props.dispatch({
            type: 'face/closeModalAlarm'
        });
    }

    onClosedModalFaceDesc = () => {
        this.props.dispatch({
            type: 'face/closeModalFaceDesc'
        })
    };

    showConfirmModal = (value) => {
        this.props.dispatch({
            type: 'face/showConfirmModal',
            payload: value
        })
    };

    onClosedConfirmModal = () => {
        this.props.dispatch({
            type: 'face/closeConfirmModal'
        })
    };

    onRefreshMatch = (value) => {
        const { type, facetrackId } = value;
        this.setState({ facetrackId });
        this.showConfirmModal({ type })
    };

    onConfirmSubmit = () => {

        switch (this.props.face.confirm.type) {
            case '1':
                this.props.dispatch({
                    type: 'face/onRelateToNew'
                });
                break;
            case '2':
                this.props.dispatch({
                    type: 'face/onRelateToPerson'
                });
                break;
            case '3':
                this.props.dispatch({
                    type: 'face/onRelateToJudge'
                });
                break;
            case '4':

                this.props.dispatch({
                    type: 'face/refreshMatch',
                    payload: { facetrackId: this.state.facetrackId }
                });
                this.props.dispatch({
                    type: 'face/cleanFaceList'
                });
                break;
        }
    };

    render() {

        return (
                <MayLayout location={this.props.location}>

                    <Row className={record.main}>
                        <SearchBar
                                cameraList={this.props.face.cameraList ? this.props.face.cameraList : null}
                                showThreshold
                                onSubmit={this.searchSubmit}/>
                        <Row className={record.content}>
                            <div className={record.title}>人脸记录
                                <Link className={record.listImgSelect} to='/face/table'/>
                                <Link className={record.viewImg}/>
                            </div>

                            <Spin spinning={this.props.face.loading} className={record.spin}
                                  tip="数据加载中...">
                                <NoDateRemind visible={this.props.face.remindControl}/>
                                <div className={record.list}>
                                    {this.props.face.faceList && this.props.face.faceList.list ? this.props.face.faceList.list.map((value, i) =>
                                                    <FacetrackCardView data={value}
                                                                       className={styles.faceCardView}
                                                                       resetImg={styles.reset3Img}
                                                                       key={value.id}
                                                                       onFaceCardClick={this.onFaceCardClick}/>) : null }
                                </div>
                            </Spin>
                        </Row>

                        {this.props.face.faceList && this.props.face.faceList.page ?
                                <PaginationView className={record.footerBar}
                                                page={this.props.face.faceList.page}
                                                pageTranslate={this.pageTranslate}/> : null}

                    </Row>

                    <ModalFaceDescView modalVisible={this.props.face.modalFaceDescVisible}
                                       key={this.props.face.modalFaceDescData.id}
                                       data={this.props.face.modalFaceDescData ? this.props.face.modalFaceDescData : null}
                                       onRefreshMatch={this.onRefreshMatch}
                                       onClosedModal={this.onClosedModalFaceDesc}
                                       showConfirmModal={this.showConfirmModal}/>

                    <ConfirmModal modalVisible={this.props.face.confirm.visible}
                                  content={this.props.face.confirm.msg}
                                  key={`confirm${this.props.face.confirm.type}`}
                                  onClosedModal={this.onClosedConfirmModal}
                                  onSubmit={this.onConfirmSubmit}/>

                </MayLayout>
        )
    }
}

function mapStateToProps({ face }) {
    return { face }
}

export  default connect(mapStateToProps)(FaceRecordPage);






