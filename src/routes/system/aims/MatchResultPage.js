/**
 * Created by Riky on 2017/2/24.
 */

import React from 'react';
import {connect} from 'dva';
import SystemLayout from './../SystemLayout';
import {notification, Spin,Modal} from 'antd';
import {StyleSheet, css} from 'aphrodite/no-important';
import title from '../../../style/common/title.css';
import pathToRegexp from  'path-to-regexp';
import RatePoiCardView from '../../../components/common/RatePoiCardView';
import PoiView from '../../../components/common/PoiView';
import ImgView from '../../../components/common/ImgView';
const styles = StyleSheet.create({
  container: {
    width: 1604,
    position: 'relative',
    height: 866,
    background: '#151a20',
    marginTop: 14,
    border: '1px solid #3D515C',
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
  },
  content: {
    width: 1592,
    height: 818,
    margin: 5,
    background: '#33444E',
    position: 'relative'
  },
  face: {
    margin: '0 auto',
    width: 1464,
    height: 156,
    // borderBottom: '1px solid #3D515C',
  },
  header: {
    color: '#70c8ea',
    height: 30,
    lineHeight: '36px',
    display: 'block',
    borderBottom: '1px solid #3D515C',
    fontSize: 14,
    fontFamily: ['SimHei', 'sans-serif']
  },
  faceItem: {
    margin: '6px 20px 6px 21px',
  },
  poiList: {
    border: '1px solid #3D515C',
    margin: '5px auto',
    width: 1464,
    height: 650,
    overflow: 'auto'
  },
  modal: {
    top: 50
  },
  img: {
    display: 'block',
    float: 'left',
    marginRight: 10,
    marginTop: 15,
    width: 100,
    height: 100,
  },
  spin:{
    margin: '0px auto',
    width: 1464,
    height: 650,
    background:'#151a20'
  }

});


class PhotoMatchPage extends React.Component {

  constructor(props){
    super(props);

    this.state={
      visible:false
    }

  }

  /**
   * 在组件更新的时候读取错误信息，提示异常更新操作
   */
  componentDidUpdate() {
    if (this.props.person && this.props.person.errorMsg) {
      this.openNotificationWithIcon('error', this.props.person.errorMsg)
      this.props.dispatch({
        type: 'group/clearMsg'
      })
    }
  }


  componentWillMount() {
    const match = pathToRegexp('/system/aims/photoMatch/:faceTrackId').exec(this.props.location.pathname);
    if (match && match[1] && match[1]) {
      this.props.dispatch({type: 'person/face', payload: {facetrackId: match[1]}});
      this.setState({facetrackId: match[1]});
      this.props.dispatch({type:'person/resetMatch'})
      this.props.dispatch({type:'person/spinLoading'})

    }
  }

  componentDidMount(){
    this.fetchFace2Person({facetrackId:this.state.facetrackId});
  }

  componentWillUnmount(){
    this.props.dispatch({type:'person/clearMatch'});
    this.props.dispatch({type:'person/clearErrorMsg'});
    this.props.dispatch({type:'person/cancelMatch'})
  }

  fetchFace2Person = (query) => {
    this.props.dispatch({type: 'person/matchFaceTrack2Person', payload: query});
  };

  closedModal = () => {
    this.setState({visible: false, modalPoi: ''})
  };

  onFaceCardTextClick = (value) => {
    this.setState({
      visible: true,
      modalPoi: value.poiDetailData
    })
  };
  onFaceCardImgClick = (value) => {
    let selectedRow = this.state.selectedRow;
    if (selectedRow && (value.id == selectedRow.id)) {
      selectedRow = '';
    } else {
      selectedRow = value;
    }
    this.setState({selectedRow});

  };

  renderFaceImg = (imgList) => {

    return imgList.map((value, i) => {
      return i < 10 ? <ImgView className={css(styles.img)} key={i} src={value}/> : null
    })
  };


  /**
   * 错误提示
   * @param type
   * @param message
   */
  openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: '错误提示',
      description: message
    });
  };

  render() {
    return (
      <SystemLayout location={this.props.location} dispatch={this.props.dispatch}>
        <div
          className={this.props.className ? `${this.props.className} ${css(styles.container)}` : css(styles.container)}>
          <div className={title.container}>
            <span className={title.text}>以图搜人结果</span>
          </div>

          <div className={css(styles.face)}>
            <span className={css(styles.header)}>人脸记录</span>
            {this.props.person.faceDetail ? this.renderFaceImg(this.props.person.faceDetail.imgs) : null}

          </div>
          <Spin spinning={this.props.person.loading} tip="匹配目标人物..." wrapperClassName={css(styles.spin)}>
            <div className={css(styles.poiList)}>
              {this.props.person.matchedPoiList && this.props.person.matchedPoiList.length > 0 ? this.props.person.matchedPoiList.map((value, i) =>
                <RatePoiCardView className={css(styles.faceItem)}
                                 key={value.poiDetailData.id}
                                 data={value}
                                 onImgClick={this.onFaceCardImgClick}
                                 onTextClick={this.onFaceCardTextClick}/>) : null}
            </div>
          </Spin>



          <Modal visible={this.state.visible}
                 title=''
                 footer=''
                 onOk={this.closedModal}
                 onCancel={this.closedModal}
                 closable={false}
                 width={1116}
                 bodyStyle={{padding: 0, height: 803}}
                 className={css(styles.modal)}
          >
            {this.state.modalPoi ?
              <PoiView key={this.state.modalPoi.id} poi={this.state.modalPoi} onClosed={this.closedModal}/> : null}

          </Modal>

        </div>
      </SystemLayout>
    )
  }
}

function mapStateToProps({person}) {
  return {person}
}

export  default connect(mapStateToProps)(PhotoMatchPage);






