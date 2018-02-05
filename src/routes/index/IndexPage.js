import React from 'react';
import $ from 'jquery';
import { connect } from 'dva';
import { Row, Col, Menu, Dropdown, Icon, Pagination } from 'antd';
import { Link } from 'dva/router';
import MainLayout from '../../components/common/MainLayout';
import FacetrackCardView from '../../components/common/FacetrackCardView';
import ModalFaceView from '../../components/common/ModalFaceView';
import HomeAlarmFaceView from '../../components/common/HomeAlarmFaceView';
import AlarmDescView from '../../components/index/AlarmDescView';
import styles from './IndexPage.css';

// import alarmMp3 from './../../assets/alarm.mp3'
import { ALARM_AUDIO } from '../../utils/base64img';

// function IndexPage({dispatch, index, location}) {

class IndexPage extends React.Component {

  componentWillMount() {
    this.props.dispatch({
      type: 'index/currentCamera',
      payload: { id: 1 }
    });

  }
  componentDidUpdate() {
    const audio = document.getElementById('audio');
    if (this.props.index.playStatus) {
      audio.play();
      this.props.dispatch({
        type: 'index/changePlayStatus'
      });
    }
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'index/getDictoryByTag'
    })
    this.props.dispatch({
      type: 'index/initAlarmHistory',
      payload: {
        pageSize: 12,
        pageNo: 1
      }
    });
    this.initCamera();
  }
  initCamera=() => {
    const bbb = document.getElementById('vlc_1');
    const width = Math.round(10);
    const height = Math.round(5);
    $(bbb).width(520 + width);
    $(bbb).height(290 + height);

    const that = this;
    setTimeout(() => {
      try {
        bbb.playlist.stop();
      } catch (exception) {
        console.log(exception);
      }
      try {
        bbb.playlist.clear();
        bbb.playlist.add(that.props.index.currentCamera ?
          that.props.index.currentCamera.debugUrl : null);
        console.log(that.props.index.currentCamera);
        bbb.playlist.play();
      } catch (exception) {
        console.log(exception);
      }
    }, 1000);
  };

  actionMenu = cameraList => {
    const items = cameraList.map(value => <Menu.Item key={`${value.id}`}>
      <a onClick={() => this.transformCamera(value)}>{value.name}</a>
    </Menu.Item>);
    return (
      <Menu className={styles.dropMenu}>
        {items}
      </Menu>
    );
  };

  renderDropDown = () => {
    let dropdown;
    console.log(this.props.index && this.props.index.cameraList)
    if (this.props.index && this.props.index.cameraList && this.props.index.cameraList.length > 0) {
      dropdown = (<Dropdown overlay={this.actionMenu(this.props.index.cameraList)} trigger={['click']} placement="topLeft">
        <a className="ant-dropdown-link" href="javascript:void(0);">
          切换视频 <Icon type="up" />
        </a>
      </Dropdown>);
    } else {
      console.log('renderDropDown false', this.props.index.cameraList);

      dropdown = null;
    }
    return dropdown;
  };

  transformCamera = value => {
    this.props.dispatch({
      type: 'index/transformCamera',
      payload: value
    });
    this.props.dispatch({
      type: 'index/success',
      payload: {
        playScreen: value.name
      }
    });
    this.initCamera();
  };

  onFaceCardClick = value => {
    console.log(value)
    this.props.dispatch({
      type: 'index/showModalFace',
      payload: {
        modalFaceData: value
      }
    });
  };

  closeModalFace = () => {
    this.props.dispatch({
      type: 'index/closeModalFace'
    });
  };

  showModalAlarm = value => {
    this.props.dispatch({
      type: 'index/showModalAlarm',
      payload: {
        modalAlarmData: value
      }
    });
  };

  closeModalAlarm = () => {
    this.props.dispatch({
      type: 'index/closeModalAlarm'
    });
  };
  closePopupModal = () => {
    this.props.dispatch({
      type: 'index/closePopupModal'
    });
  };


  render() {
    return (
      <MainLayout location={this.props.location}>
        <Row className={styles.main}>
          <div className={styles.faceArea}>
            <div className={styles.subTitle}>
              <span>人脸记录</span>
              <Link to="/face">更多&gt;</Link>
            </div>

            <div className={styles.faceRecordList}>
              {this.props.index.faceList ?
                this.props.index.faceList.map(value => <FacetrackCardView
                  data={value}
                  className={styles.faceCardView}
                  resetImg={styles.reset2Img}
                  key={value.id}
                  onFaceCardClick={this.onFaceCardClick}
                />) : null}
            </div>

          </div>
          <div className={styles.alarmArea}>

            <Row className={styles.statistical} type="flex" justify="space-between" gutter={10}>
              <Col span={6} className={styles.statItem} >
                <div
                  className={styles.statItemNumber}
                >{this.props.index.stat ? this.props.index.stat.totalFace : 0}</div>
                <div className={styles.statItemTxt}>累计抓拍</div>
              </Col>
              <Col span={6} className={styles.statItem}>
                <div
                  className={styles.statItemNumber}
                >{this.props.index.stat ? this.props.index.stat.totalAlarm : 0}</div>
                <div className={styles.statItemTxt}>累计报警</div>
              </Col>
              <Col span={6} className={styles.statItem}>
                <div
                  className={styles.statItemNumber}
                >{this.props.index.stat ? this.props.index.stat.todayFace : 0}</div>
                <div className={styles.statItemTxt}>今日抓拍</div>
              </Col>
              <Col span={6} className={styles.statItem}>
                <div
                  className={styles.statItemNumber}
                >{this.props.index.stat ? this.props.index.stat.todayAlarm : 0}</div>
                <div className={styles.statItemTxt}>今日报警</div>
              </Col>
            </Row>


            <Row className={styles.alarmList}>

              <div className={styles.subTitle}>
                <span>最新报警</span>
                <Link to="/alarm">更多&gt;</Link>
              </div>

              <div className={styles.alarmRecord}>
                {this.props.index.alarmList ?
                  this.props.index.alarmList.map((value, i) => <HomeAlarmFaceView
                    data={value}
                    className={styles.alarmFaceTwo}
                    alarmClass={styles.alarmClassTwo}
                    faceViewClass={styles.faceView}
                    faceViewTwoClass={styles.faceViewTwo}
                    faceViewJudgeTwoClass={styles.faceViewJudgeTwo}
                    resetImg={styles.resetImg}
                    circleViewClass={styles.circleView}
                    key={i}
                    onClick={this.showModalAlarm}
                  />) : null}
              </div>

            </Row>
            {/* <Row className={styles.faceBgImg}>
             {index.snapImg ? <ImgView src={index.snapImg}/> : null}
             </Row>*/}
            <Row className={styles.faceBgImg}>
              <div className={styles.subTitle}>
                <span>实时视频 {this.props.index.playScreen}</span>
                {this.props.index.cameraList ? this.renderDropDown() : null};
              </div>
              <div style={{ width: 571, height: 295 }}>
                <object
                  id="vlc_1" type="application/x-vlc-plugin" width="526"
                  height="295"

                  className={styles.videoStyle}
                >
                  <param name="mrl" value={this.props.index.currentCamera ? this.props.index.currentCamera.debugUrl : null} />
                  <param name="volume" value="50" />
                  <param name="wmode" value="Opaque" />
                  <param name="autoplay" value="true" />
                  <param name="play" value="true" />
                  <param name="quality" value="high" />
                  <param name="loop" value="false" />
                  <param name="fullscreen" value="false" />
                </object>
              </div>
            </Row>


          </div>

          {/* 报警声音*/}
          <div className={styles.audio}>
            <audio id="audio" src={ALARM_AUDIO} />
          </div>

        </Row>

        <ModalFaceView
          visible={this.props.index.modalFaceVisible} key={this.props.index.modalFaceData.id}
          data={this.props.index.modalFaceData} onClosed={this.closeModalFace}
        />


        <AlarmDescView
          modalVisible={this.props.index.modalAlarmVisible} key={this.props.index.modalAlarmData.id}
          data={this.props.index.modalAlarmData} onClosedModal={this.closeModalAlarm}
        />
        <AlarmDescView
          modalVisible={this.props.index.alarmModalPopup}
          data={this.props.index.PopupFaceTrack} onClosedModal={this.closePopupModal}
        />

      </MainLayout>
    );
  }
}

function mapStateToProps({ index }) {
  return { index };
}

export default connect(mapStateToProps)(IndexPage);
