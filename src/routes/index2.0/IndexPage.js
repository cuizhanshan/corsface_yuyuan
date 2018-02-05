import React from 'react';
import $ from 'jquery';
import { connect } from 'dva';
import ReactEcharts from 'echarts-for-react';
import { Row, Col, Menu, Dropdown, Icon } from 'antd';
import MainLayout from '../../components/common/ShadowMainLayout';
import FacetrackCardView from '../../components/common/FacetrackCardView';
import AlarmDescView from '../../components/index/AlarmDescView';
import HomeAlarmFaceView from '../../components/common/HomeAlarmFaceView';
import ModalFaceView from '../../components/common/ModalFaceView';
import VideoView from '../../components/common/VideoView';
import FourPointScreenModal from '../../components/common/FourPointScreenModal';
import styles from './IndexPage.css';

// import alarmMp3 from './../../assets/alarm.mp3'
import { ALARM_AUDIO } from '../../utils/base64img';

// function IndexPage({dispatch, index, location}) {

class IndexPage extends React.Component {


  componentWillMount() {
    this.props.dispatch({
      type: 'index/cameraListPage',
      payload: {
        pageSize: 6,
        pageNo: 1,
        name: '',
        categoryId: 1
      }
    });
    this.props.dispatch({
      type: 'index/cameraList'

    });
    // this.collectData();
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
    this.initCamera1();
    this.initCamera2();
    this.initCamera3();
    this.initCamera4();
  }

  initCamera1 = () => {
    const bbb = document.getElementById('vlc_1');
    const width = Math.random();
    const height = Math.random();
    $(bbb).width(595 + width);
    $(bbb).height(365 + height);
    const that = this;
    setTimeout(() => {
      try {
        bbb.playlist.stop();
      } catch (exception) {
        // 暂不处理
      }
      try {
        bbb.playlist.clear();
        bbb.playlist.add(that.props.index.cameraList ?
          that.props.index.cameraList[0].playUrl : null);
        console.log(that.props.index.currentCamera);
        bbb.playlist.play();
      } catch (exception) {
        // 暂不处理
      }
    }, 1000);
    function inlineOnclick() {
      console.log('-->ddd, inlineOnclick.');
    }

    function inlineOnFocus() {
      console.log('-->ddd, inlineOnFocus.');
    }

    // bbb.onclick=inlineOnclick;
    // bbb.onfocus=inlineOnFocus;
  };
  initCamera2 = () => {
    const bbb = document.getElementById('vlc_2');
    const width = Math.random();
    const height = Math.random();
    $(bbb).width(595 + width);
    $(bbb).height(365 + height);

    const that = this;
    setTimeout(() => {
      try {
        bbb.playlist.stop();
      } catch (exception) {
        // 暂不处理
      }
      try {
        bbb.playlist.clear();
        bbb.playlist.add(that.props.index.cameraList ?
          that.props.index.cameraList[1].playUrl : null);
        bbb.playlist.play();
      } catch (exception) {
        // 暂不处理
      }
    }, 1000);
  };
  initCamera3 = () => {
    const bbb = document.getElementById('vlc_3');
    const width = Math.random();
    const height = Math.random();
    $(bbb).width(595 + width);
    $(bbb).height(365 + height);

    const that = this;
    setTimeout(() => {
      try {
        bbb.playlist.stop();
      } catch (exception) {
        // 暂不处理
      }
      try {
        bbb.playlist.clear();
        bbb.playlist.add(that.props.index.cameraList ?
          that.props.index.cameraList[2].playUrl : null);
        console.log(that.props.index.currentCamera);
        bbb.playlist.play();
      } catch (exception) {
        // 暂不处理
      }
    }, 1000);
  };
  initCamera4 = () => {
    const bbb = document.getElementById('vlc_4');
    const width = Math.random();
    const height = Math.random();
    $(bbb).width(595 + width);
    $(bbb).height(365 + height);

    const that = this;
    setTimeout(() => {
      try {
        bbb.playlist.stop();
      } catch (exception) {
      }
      try {
        bbb.playlist.clear();
        bbb.playlist.add(that.props.index.cameraList ?
          that.props.index.cameraList[3].playUrl : null);
        console.log(that.props.index.currentCamera);
        bbb.playlist.play();
      } catch (exception) {
      }
    }, 1000);
  };


  renderDropDown = () => {
    const menu = (
      <div>
        <Menu onClick={this.toggleScreenSelect}>
          <Menu.Item key={0} className={styles.menubkg}>
            <a className={styles.menufont}>屏幕一</a>
          </Menu.Item>
          <Menu.Item key={1} className={styles.menubkg}>
            <a className={styles.menufont} >屏幕二</a>
          </Menu.Item>
          <Menu.Item key={2} className={styles.menubkg}>
            <a className={styles.menufont} >屏幕三</a>
          </Menu.Item>
          <Menu.Item key={3} className={styles.menubkg}>
            <a className={styles.menufont} >屏幕四</a>
          </Menu.Item>
        </Menu>
        <iframe
          src="about:blank" frameBorder="0"
          filter="progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=1)"
          className={styles.iframe}
        />
      </div>
    );

    let dropdown;
    dropdown = (<Dropdown overlay={menu} trigger={['click']} placement="topLeft">
      <a className="ant-dropdown-link" href="#">
            切换视频 <Icon type="up" />
      </a>

    </Dropdown>

      );
    return dropdown;
  };

  toggleScreenSelect = ({ item, key }) => {
    console.log(item, key);
    const screenNum = key - 0;
    this.props.dispatch({
      type: 'index/success',
      payload: {
        toggleScreenVisible: true,
        toggleScreenNum: screenNum
      }
    });
  }
  toggleScreenClose = () => {
    this.props.dispatch({
      type: 'index/success',
      payload: {
        toggleScreenVisible: false
      }
    });
  }

  transformCamera = value => {
    this.props.dispatch({
      type: 'index/transformCamera',
      payload: value
    });
    this.initCamera();
  };

  onFaceCardClick = value => {
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
  toggleScreen = value => {
    const screenNum = this.props.index.toggleScreenNum;
    const arr = this.props.index.screenView;
    const screenId = ['vlc_1', 'vlc_2', 'vlc_3', 'vlc_4'];
    arr[screenNum] = value;
    this.props.dispatch({
      type: 'index/success',
      payload: {
        screenView: arr,
        toggleScreenVisible: false
      }
    });
    this.restartScreen2(screenId[screenNum], screenNum);
  }

  restartScreen2 = (screenId, screenNum) => {
    const bbb = document.getElementById(screenId);
    $(bbb).width(595);
    $(bbb).height(365);

    const that = this;
    setTimeout(() => {
      try {
        bbb.playlist.stop();
      } catch (exception) {
        // 暂不处理
      }
      try {
        bbb.playlist.clear();
        bbb.playlist.add(that.props.index.screenView ?
          that.props.index.screenView[screenNum].playUrl : null);
        bbb.playlist.play();
      } catch (exception) {
        // 暂不处理
      }
    }, 1000);
  };

    // collectData = () => {
    //   let alarm = this.props.index.xAxisData;
    //   let personFlow = this.props.index.yAxisData;
    //   setInterval(() => {
    //     alarm = alarm.map((item, index) => item + 1);
    //     personFlow = personFlow.map((item, index) => item + 2);
    //     this.props.dispatch({
    //       type: 'index/success',
    //       payload: {
    //         xAxisData: alarm,
    //         yAxisData: personFlow
    //       }
    //     });
    //   }, 1000);
    // }

    // getOption = () => {
    //   const colors = ['#5793f3', '#d14a61', '#675bba'];
    //
    //   return {
    //     color: colors,
    //     textStyle: {
    //       color: '#fff'
    //     },
    //     tooltip: {
    //       trigger: 'none',
    //       axisPointer: {
    //         type: 'cross'
    //       }
    //     },
    //     legend: {
    //       data: ['人流量', '报警次数'],
    //       textStyle: {
    //         color: '#fff'
    //       }
    //     },
    //     grid: {
    //       top: 70,
    //       bottom: 50
    //     },
    //     xAxis: [
    //       {
    //         type: 'category',
    //         axisTick: {
    //           alignWithLabel: true
    //         },
    //         axisLine: {
    //           onZero: false,
    //           lineStyle: {
    //             color: colors[1]
    //           }
    //         },
    //         axisPointer: {
    //           label: {
    //             formatter(params) {
    //               return `人流量  ${params.value
    //                 }${params.seriesData.length ? `：${params.seriesData[0].data}` : ''}`;
    //             }
    //           }
    //         },
    //         data: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
    //       },
    //       {
    //         type: 'category',
    //         axisTick: {
    //           alignWithLabel: true
    //         },
    //         axisLine: {
    //           onZero: false,
    //           lineStyle: {
    //             color: colors[0]
    //           }
    //         },
    //         axisPointer: {
    //           label: {
    //             formatter(params) {
    //               return `报警次数  ${params.value
    //                 }${params.seriesData.length ? `：${params.seriesData[0].data}` : ''}`;
    //             }
    //           }
    //         },
    //         data: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
    //       }
    //     ],
    //     yAxis: [
    //       {
    //         type: 'value',
    //         splitLine: {
    //           show: false
    //         }
    //       }
    //
    //     ],
    //     series: [
    //       {
    //         name: '报警次数',
    //         type: 'line',
    //         xAxisIndex: 1,
    //         smooth: true,
    //         data: this.props.index.xAxisData
    //       },
    //       {
    //         name: '人流量',
    //         type: 'line',
    //         smooth: true,
    //         data: this.props.index.yAxisData
    //       }
    //     ]
    //   };
    // }

  videoViewLimit = (text, value, index) => {
    const MAX_NUM = 5;

    const array = value.slice(0, MAX_NUM - 1);

    return array.map((value, i) => (<VideoView
      key={i}
      videoId={`vlc_${i + 1}`}
      classVlcContent={styles.vlcContent}
      classVideoStyle={styles.videoStyle}
      mrl={this.props.index.screenView[i] ? this.props.index.screenView[i].playUrl : null}
    />));
  }


  toggleScreenPageChange = (pageNo, pageSize) => {
    this.props.dispatch({
      type: 'index/cameraListPage',
      payload: {
        pageSize,
        pageNo,
        name: '',
        categoryId: 1
      }
    });
  }
  cancelScreenFull = () => {
    const canselFull = document;
    if (canselFull.exitFullscreen) {
      canselFull.exitFullscreen();
    } else if (canselFull.msExitFullscreen) {
      canselFull.msExitFullscreen();
    } else if (canselFull.mozCancelFullScreen) {
      canselFull.mozCancelFullScreen();
    } else if (canselFull.webkitCancelFullScreen) {
      canselFull.webkitCancelFullScreen();
    } else {
      // 暂不处理
    }
  }
  closePopupModal = () => {
    this.props.dispatch({
      type: 'index/closePopupModal'
    });
  };
  render() {
    return (
      <MainLayout location={this.props.location}>
        <Row gutter={16} className={styles.main}>
          <a href="#/" className={styles.backBtn} onClick={this.cancelScreenFull} />
          <Col span={17} className={styles.contentLeft}>
            <div className={styles.faceBgImg}>
              <div className={styles.subTitle}>
                <span>实时视频</span>
                {this.props.index.screenView ? this.renderDropDown() : null};
              </div>
              <Row className={styles.videoWrap}>
                {this.props.index.screenView ?
                  this.videoViewLimit(null, this.props.index.screenView) : null};

                {/* 报警声音*/}
                <div className={styles.audio}>
                  <audio id="audio" src={ALARM_AUDIO} />
                </div>
              </Row>
            </div>
            <div className={styles.faceArea}>
              <div className={styles.subTitle}>
                <span>人脸记录</span>
              </div>
              <div className={styles.faceRecordList}>

                {this.props.index.faceList ? this.props.index.faceList.map((value, i) =>
                  <FacetrackCardView
                    data={value}
                    className={styles.faceCardView}
                    resetImg={styles.reset2Img}
                    alarmClass={styles.alarmFaceClass}
                    key={value.id}
                    onFaceCardClick={this.onFaceCardClick}
                  />) : null}
              </div>
            </div>
          </Col>

          <Col span={7} className={styles.contentRight}>
            <Row className={styles.statistical} type="flex" justify="space-between">
              <Col span={5} className={styles.statItem}>
                <div
                  className={styles.statItemNumber}
                >{this.props.index.stat ? this.props.index.stat.totalFace : 0}</div>
                <div className={styles.statItemTxt}>累计抓拍</div>
              </Col>
              <Col span={5} className={styles.statItem}>
                <div
                  className={styles.statItemNumber}
                >{this.props.index.stat ? this.props.index.stat.totalAlarm : 0}</div>
                <div className={styles.statItemTxt}>累计报警</div>
              </Col>
              <Col span={5} className={styles.statItem}>
                <div
                  className={styles.statItemNumber}
                >{this.props.index.stat ? this.props.index.stat.todayFace : 0}</div>
                <div className={styles.statItemTxt}>今日抓拍</div>
              </Col>
              <Col span={5} className={styles.statItem}>
                <div
                  className={styles.statItemNumber}
                >{this.props.index.stat ? this.props.index.stat.todayAlarm : 0}</div>
                <div className={styles.statItemTxt}>今日报警</div>
              </Col>
            </Row>
            <Row className={styles.alarmList}>

              <div className={styles.subTitle}>
                <span>最新报警</span>
              </div>

              <div className={`${styles.alarmRecord} ${styles.alarmRecordTwo}`}>

                {this.props.index.alarmList ? this.props.index.alarmList.map((value, i) =>
                  <HomeAlarmFaceView
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
            {/*<Row className={styles.statistics}>*/}

              {/*<div className={styles.subTitle}>*/}
                {/*<span>流量统计</span>*/}
              {/*</div>*/}

              {/*<div className={styles.cartogram}>*/}
                {/*<ReactEcharts*/}
                  {/*option={this.getOption()}*/}
                  {/*style={{ height: '198px', width: '100%' }}*/}
                  {/*notMerge*/}
                  {/*lazyUpdate*/}
                {/*/>*/}
              {/*</div>*/}

            {/*</Row>*/}
          </Col>
        </Row>

        <FourPointScreenModal
          data={this.props.index.togglecameraList ? this.props.index.togglecameraList : null}
          page={this.props.index.togglecameraPage ? this.props.index.togglecameraPage : null}
          visiable={this.props.index.toggleScreenVisible}
          closeModal={this.toggleScreenClose}
          toggleScreen={this.toggleScreen}
          toggleScreenPageChange={this.toggleScreenPageChange}
        />
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
