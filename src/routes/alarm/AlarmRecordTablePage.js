/**
 * Created by Riky on 2017/2/24.
 */

import React from 'react';
import {connect} from 'dva';
import {Link} from  'dva/router'
import {StyleSheet, css} from 'aphrodite'
import {Row, Table, Popover, Button, Modal} from 'antd';
import MayLayout from '../../components/common/MainLayout';
import SearchBar from '../../components/common/SearchBarView';
import record from '../../style/record.css';
import ImgView from '../../components/common/ImgView';
import PaginationView from '../../components/common/PaginationView';
import ImgWithBadgeView from '../../components/common/ImgWithBadgeView';
import ExpandImgView from '../../components/common/ExpandImgView';
import ContrastPhotoView from '../../components/common/ContrastPhotoView';
import {ALARM_TYPE} from '../../utils/constant';


const styles = StyleSheet.create({
  modal: {top: 50},
  faceCardView: {
    width: 160,
    fontSize: 15,
    height: 233,
    margin: '12px 18px 0px 18px',
    display: 'inline-block',
    cursor: 'pointer',
    background: '#33444e',
    borderRadius: 0,
    border: 0,
    position: 'relative',
    color: '#ffffff',
    ':hover': {
      border: '2px solid #109dec'
    }
  },
  faceImg: {
    width: 84,
    height: 84
  },


});


//const AlarmRecordTablePage = ({dispatch, alarm, location}) => {
class AlarmRecordTablePage extends React.Component {

  constructor(props) {
    super(props);
    this.searchSubmit = this.searchSubmit.bind(this);
    this.pageTranslate = this.pageTranslate.bind(this);
  }

  componentWillUnmount(){
    this.props.dispatch({
      type: 'alarm/cleanAlarmList'
    });
  }
  searchSubmit = (value) => {
    const {srcId, startTime, endTime, groupId} = value;

    this.setState({query: value});
    this.props.dispatch({
      type: 'alarm/cleanAlarmList'
    });
    this.props.dispatch({
      type: 'alarm/alarmList',
      payload: {
        srcId: srcId ? srcId : '',
        startTime: startTime ? startTime : '',
        endTime: endTime ? endTime : '',
        groupId: groupId ? groupId : ''
      }
    })
  };

  pageTranslate = (value) => {

    let payload = this.state && this.state.query ? this.state.query : {};

    payload.pageNo = value.pageNo;
    payload.pageSize = value.pageSize;
    this.props.dispatch({
      type: 'alarm/alarmList',
      payload
    })
  };


  onAlarmFaceViewClick = (value) => {
    this.props.dispatch({
      type: 'alarm/fetchContrast',
      payload: value
    });
  };


  closeModalAlarm = () => {

    this.props.dispatch({
      type: 'alarm/contrastClosed'
    });
  };


  onContrastPhotoViewSelectRow = (value) => {
    this.props.dispatch({
      type: 'alarm/contrastRowSelect',
      payload: value
    })
  };

  onContrastPhotoViewPageTranslate = (value) => {
    this.props.dispatch({
      type: 'alarm/contrastPageTranslate',
      payload: value
    })
  };

  onContrastPhotoViewClosed = () => {
    this.props.dispatch({
      type: 'alarm/contrastClosed',
    })
  };

  btnClick = (value) => {
    this.props.dispatch({
      type: 'alarm/fetchContrast',
      payload: value
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
              className={record.popoverBtn}>{record.offsetTime ? record.offsetTime : record.captureTime}</Button></Popover >
          }
        }, {
          title: '相似人',
          width: 200,
          render: (record) => {
            if (record.alarmed) {
              return record.judgePerson ? <ImgView className={css(styles.faceImg)} src={record.judgePerson}/> : null
            } else {
              return record.mostPerson ? <ImgView className={css(styles.faceImg)} src={record.mostPerson}/> : null
            }
          }
        }, {
          title: '相似人姓名',
          width: 130,
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
          width: 90,
          dataIndex: 'percent',
          render: text => text ? (text * 100).toFixed(2) : null

        }, {
          title: '告警规则',
          width: 170,
          render: (record) => record.alarmInfo ? record.alarmInfo.name : null
        },
        {
          title: '告警方式',
          width: 100,
          render: (record) => record.alarmInfo ? ALARM_TYPE[record.alarmInfo.alarmType - 1] : null
        }, {
          title: '告警组别',
          width: 140,
          render: (record) => record.alarmInfo ? record.alarmInfo.groupName : null
        }, {
          title: '操作',
          width: 100,
          render: (record) => <Button onClick={() => this.btnClick(record)}>查看详情</Button>
        }
      ]
    };

    return (
      <MayLayout location={this.props.location}>

        <Row className={record.main}>
          <SearchBar cameraList={this.props.alarm.cameraList ? this.props.alarm.cameraList : null}
                     groupList={this.props.alarm.groupList ? this.props.alarm.groupList : null}
                     showGrouping
                     onSubmit={this.searchSubmit}/>
          <Row className={record.content}>
            <div className={record.title}>报警记录
              <Link className={record.listImg}/>
              <Link className={record.viewImgSelect} to='/alarm'/>
            </div>
            <div className={record.list}>
              <Table rowKey={record => record.id}
                     dataSource={this.props.alarm.alarmList && this.props.alarm.alarmList.list ? this.props.alarm.alarmList.list : null} {...tableProps}/>
            </div>
          </Row>
          {this.props.alarm.alarmList && this.props.alarm.alarmList.page ?
            <PaginationView className={record.footerBar} page={this.props.alarm.alarmList.page}
                            pageTranslate={this.pageTranslate}/> : null}
        </Row>

        <Modal visible={this.props.alarm.modalContrastVisible}
               title=''
               footer=''
               onOk={this.closeModalAlarm}
               onCancel={this.closeModalAlarm}
               closable={false}
               width={1687}
               bodyStyle={{padding: 0, height: 803}}
               className={css(styles.modal)}
        >
          {this.props.alarm.contrast ?
            <ContrastPhotoView data={this.props.alarm.contrast} selectRow={this.onContrastPhotoViewSelectRow }
                               pageTranslate={this.onContrastPhotoViewPageTranslate}
                               onClosed={this.onContrastPhotoViewClosed}
            /> : null}

        </Modal>

      </MayLayout>
    )
  }
}
;

function mapStateToProps({alarm}) {
  return {alarm}
}

export  default connect(mapStateToProps)(AlarmRecordTablePage);






