/**
 * Created by Riky on 2017/2/24.
 */

import React from 'react';
import {connect} from 'dva';
import {Link} from  'dva/router'

import {Row, Table, Popover, Button} from 'antd';
import MayLayout from '../../components/common/MainLayout';
import SearchBar from '../../components/common/SearchBarView';
import record from '../../style/record.css';
import styles from './FaceRecord.css';
import ImgView from '../../components/common/ImgView';
import PaginationView from '../../components/common/PaginationView';
import ImgWithBadgeView from '../../components/common/ImgWithBadgeView';
import ExpandImgView from '../../components/common/ExpandImgView';
import ModalFaceDescView from '../../components/face/ModalFaceDescView';
import ConfirmModal from '../../components/common/ConfirmModal';

//const FaceRecordTablePage = ({dispatch, face, location}) => {
class FaceRecordTablePage extends React.Component {

  constructor(props) {
    super(props);
    this.searchSubmit = this.searchSubmit.bind(this);
    this.pageTranslate = this.pageTranslate.bind(this);
    this.onRefreshMatch = this.onRefreshMatch.bind(this);
    this.onConfirmSubmit = this.onConfirmSubmit.bind(this);
    this.showConfirmModal = this.showConfirmModal.bind(this);
  }

  componentWillUnmount(){
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
  };

  searchSubmit = (value) => {
    const {srcId, startTime, endTime, startPercent, endPercent} = value;

    this.setState({query: value});
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
    const {type,facetrackId} = value;
    this.setState({facetrackId});
    this.showConfirmModal({type})
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
          payload:{facetrackId:this.state.facetrackId}
        });
        this.props.dispatch({
          type: 'face/cleanFaceList'
        });
        break;
    }
  };

  btnClick = (value)=>{

    this.props.dispatch({
      type: 'face/showModalFaceDesc',
      payload: {
        modalFaceDescData: value
      }
    });
  };

  onDelete = (value)=>{
    this.props.dispatch({
      type: 'face/deleteFacetrack',
      payload: {
        facetrackId: value.code
      }
    });
  };



  render() {


    const tableProps = {
      pagination: false,
      expandedRowRender(record){
        return <ExpandImgView imgs={record.imgs}/>
      },
      scroll: {
        y: 696
      },
      columns: [
        {
          title: '序号',
          dataIndex: 'id',
          width: 100
        }, {
          title: '照片',
          dataIndex: 'imgs',
          width: 210,
          render: text => {
            return text && text.length > 0 ? <ImgWithBadgeView src={text[0]} count={text.length}/> : null
          }
        },
        {
          title: '摄像头',
          width: 170,
          dataIndex: 'srcName',
        }, {
          title: '时间',
          width: 170,
          render: (record) => {
            return <Popover placement="top" content={<ImgView src={record.snapImg}/>} trigger="click"
                            arrowPointAtCenter><Button
              className={record.popoverBtn}>{record.captureTime}</Button></Popover >
          }
        }, {
          title: '相似人',
          width: 200,
          render: (record) => {
            if (record.alarmed) {
              return record.judgePerson ? <ImgView className={styles.faceImg} src={record.judgePerson}/> : null
            } else {
              return record.mostPerson ? <ImgView className={styles.faceImg} src={record.mostPerson}/> : null
            }
          }
        }, {
          title: '相似人姓名',
          width: 170,
          render: (record) => {
            if (record.alarmed) {
              return record.judgePerson ? record.judgePerson.name : null
            } else {
              return record.mostPerson ? record.mostPerson.name : null
            }
          }
        }, {
          title: '身份证号',
          width: 170,
          render: (record) => {
            if (record.alarmed) {
              return record.judgePerson ? record.judgePerson.identityCard : null
            } else {
              return record.mostPerson ? record.mostPerson.identityCard : null
            }
          }
        }, {
          title: '匹配度(%)',
          width: 170,
          dataIndex: 'percent',
          render: text => text ? (text * 100).toFixed(2) : null

        }, {
          title: '关联',
          width: 170,
          dataIndex: 'state',
          render: text => text == 0 ? '未关联' : '已关联'
        }, {
          title: '操作',
          width: 170,
          render: (record) => <div><Button onClick={() => this.btnClick(record)}>查看详情</Button><Button onClick={() => this.onDelete(record)}>删除</Button></div>
        }
      ]
    };

    return (
      <MayLayout location={this.props.location}>

        <Row className={record.main}>
          <SearchBar cameraList={this.props.face.cameraList ? this.props.face.cameraList : null} showThreshold onSubmit={this.searchSubmit}/>
          <Row className={record.content}>
            <div className={record.title}>人脸记录
              <Link className={record.listImg}/>
              <Link className={record.viewImgSelect} to='/face'/>
            </div>
            <div className={record.list}>
              <Table  rowKey={record => record.id}  dataSource={this.props.face.faceList && this.props.face.faceList.list ? this.props.face.faceList.list : null} {...tableProps}
                      style={{textAlign: 'center'}}/>
            </div>
          </Row>
          {this.props.face.faceList && this.props.face.faceList.page ?
            <PaginationView className={record.footerBar} page={this.props.face.faceList.page}
                            pageTranslate={this.pageTranslate}/> : null}
        </Row>

        <ModalFaceDescView modalVisible={this.props.face.modalFaceDescVisible}
                           key={this.props.face.modalFaceDescData.id}
                           data={this.props.face.modalFaceDescData}
                           onRefreshMatch={this.onRefreshMatch}
                           onClosedModal={this.onClosedModalFaceDesc} showConfirmModal={this.showConfirmModal}/>


        <ConfirmModal modalVisible={this.props.face.confirm.visible} content={this.props.face.confirm.msg}
                      key={`confirm${this.props.face.confirm.type}`}
                      onClosedModal={this.onClosedConfirmModal} onSubmit={this.onConfirmSubmit}/>

      </MayLayout>
    )
  }
}
;

function mapStateToProps({face}) {
  return {face}
}

export  default connect(mapStateToProps)(FaceRecordTablePage);






