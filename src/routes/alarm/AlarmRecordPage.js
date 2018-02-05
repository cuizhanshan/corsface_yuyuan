/**
 * Created by Riky on 2017/2/24.
 */

import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Row, Modal, Spin } from 'antd';
import SearchBar from '../../components/common/SearchBarView';
import record from '../../style/record.css';

import MayLayout from '../../components/common/MainLayout';
import PaginationView from '../../components/common/PaginationView';
import AlarmFaceView from '../../components/common/AlarmFaceView';
import ContrastPhotoView from '../../components/common/ContrastPhotoView';
import { StyleSheet, css } from 'aphrodite/no-important';
import NoDateRemind from '../../components/common/NoDateRemind';
import AlarmDescView from '../../components/index/AlarmDescView';

const styles = StyleSheet.create({
  modal: { top: 50 },
  alarmCard: {
    width: 417,
    // height: 233,
    height: 200,
    display: 'inline-block',
    cursor: 'pointer',
    position: 'relative',
    marginLeft: 20,
    marginRight: 10,
    // marginTop: 12,
    marginTop: 35,
    background: '#33444e',
    ':hover': {
      border: '1px solid #3d5154'
    }
  },

  face: {
    width: 157,
    fontSize: 15,
    // height: 226,
    height: 180,
    float: 'left',
    background: '#33444e',
    color: '#ffffff',
    border: 0,
    top: 4,
    position: 'relative',
    ':hover': {
      boxShadow: 'none',
      borderColor: 'none'
    }
  },
  circle: {
    marginLeft: 20,
    marginRight: 20,
    float: 'left',
    // marginTop: 84,
    marginTop: 54,
    position: 'relative'
  },
  alarmClass: {
   /* top: 100,
    left: 105 */
    top: 75,
    left: 100
  },
  resetImg: {
    width: 93,
    height: 93
  },
  spin: {
    width: 1602,
    height: 763
  }
});


// const AlarmRecordPage = ({dispatch, alarm, location}) => {
class AlarmRecordPage extends React.Component {

  constructor(props) {
    super(props);
    this.searchSubmit = this.searchSubmit.bind(this);
    this.pageTranslate = this.pageTranslate.bind(this);
    this.onAlarmFaceWhiteViewClick = this.onAlarmFaceWhiteViewClick.bind(this);
    this.closeModalAlarm = this.closeModalAlarm.bind(this);
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'alarm/spinLoading'
    });
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'alarm/cleanAlarmList'
    });
  }

  searchSubmit = value => {
    const { srcId, startTime, endTime, groupId } = value;
    this.setState({ query: value });
    this.props.dispatch({
      type: 'alarm/cleanAlarmList'
    });
    this.props.dispatch({
      type: 'alarm/alarmList',
      payload: {
        srcId: srcId || '',
        startTime: startTime || '',
        endTime: endTime || '',
        groupId: groupId || ''
      }
    });
    this.props.dispatch({
      type: 'alarm/spinLoading'
    });
  };

  pageTranslate = value => {
    const payload = this.state && this.state.query ? this.state.query : {};
    payload.pageNo = value.pageNo;
    payload.pageSize = value.pageSize;
    this.props.dispatch({
      type: 'alarm/alarmList',
      payload
    });
    this.props.dispatch({
      type: 'alarm/spinLoading'
    });
  };


  onAlarmFaceViewClick = value => {
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


  onContrastPhotoViewSelectRow = value => {
    this.props.dispatch({
      type: 'alarm/contrastRowSelect',
      payload: value
    });
  };


  onContrastPhotoViewPageTranslate = value => {
    this.props.dispatch({
      type: 'alarm/contrastPageTranslate',
      payload: value
    });
  };

  onContrastPhotoViewClosed = () => {
    this.props.dispatch({
      type: 'alarm/contrastClosed'
    });
  };

  onAlarmFaceWhiteViewClick = value => {
    this.props.dispatch({
      type: 'alarm/showModalAlarm',
      payload: {
        modalAlarmData: value
      }
    });
  }
  closeModalAlarm = () => {
    this.props.dispatch({
      type: 'alarm/closeModalAlarm'
    });
  }


  render() {
    return (
      <MayLayout location={this.props.location}>

        <Row className={record.main}>
          <SearchBar
            cameraList={this.props.alarm.cameraList ? this.props.alarm.cameraList : null}
            groupList={this.props.alarm.groupList ? this.props.alarm.groupList : null}
            showGrouping
            onSubmit={this.searchSubmit}
          />
          <Row className={record.content}>
            <div className={record.title}>报警记录
              <Link className={record.listImgSelect} to="/alarm/table"/>
              <Link className={record.viewImg}/>
            </div>
            <Spin spinning={this.props.alarm.loading} className={css(styles.spin)} tip="数据加载中...">
              <NoDateRemind visible={this.props.alarm.remindControl} />
              <div className={record.list}>

                {this.props.alarm.alarmList && this.props.alarm.alarmList.list ? this.props.alarm.alarmList.list.map((value, i) =>
                  <AlarmFaceView
                    data={value}
                    key={value.id}
                    className={css(styles.alarmCard)}
                    faceViewClass={css(styles.face)}
                    circleWidth={60}
                    resetImg={css(styles.resetImg)}
                    circleViewClass={css(styles.circle)}
                    alarmClass={css(styles.alarmClass)}
                    onClick={value.judgePerson ? this.onAlarmFaceViewClick : this.onAlarmFaceWhiteViewClick}
                  />) : null}
              </div>
            </Spin>

          </Row>
          {this.props.alarm.alarmList && this.props.alarm.alarmList.page ?
            <PaginationView
              className={record.footerBar} page={this.props.alarm.alarmList.page}
              pageTranslate={this.pageTranslate}
            /> : null}
        </Row>

        <Modal
          visible={this.props.alarm.modalContrastVisible}
          title=""
          footer=""
          onOk={this.closeModalAlarm}
          onCancel={this.closeModalAlarm}
          closable={false}
          width={1687}
          bodyStyle={{ padding: 0, height: 803 }}
          className={css(styles.modal)}
        >
          {this.props.alarm.contrast ?
            <ContrastPhotoView
              data={this.props.alarm.contrast} selectRow={this.onContrastPhotoViewSelectRow}
              pageTranslate={this.onContrastPhotoViewPageTranslate}
              onClosed={this.onContrastPhotoViewClosed}
            /> : null}

        </Modal>

        <AlarmDescView
          modalVisible={this.props.alarm.modalAlarmVisible} key={this.props.alarm.modalAlarmData.id}
          data={this.props.alarm.modalAlarmData} onClosedModal={this.closeModalAlarm}
        />

      </MayLayout>
    );
  }
}


function mapStateToProps({ alarm }) {
  return { alarm };
}


export default connect(mapStateToProps)(AlarmRecordPage);
