/**
 * Created by yunshitu on 2017/4/28.
 */
import React from 'react';
import {connect} from 'dva';
import MayLayout from '../../../components/common/MainLayout';
import styles from './FaceMatchPoiPage.css'
import FilterProcessFaceView from '../../../components/search/FilterProcessFaceView';
import title from '../../../style/common/title.css';
import pathToRegexp from  'path-to-regexp';
import RatePoiCardView from '../../../components/common/RatePoiCardView';
import PoiView from '../../../components/common/PoiView';
import ImgView from '../../../components/common/ImgView';
import NoDateRemind from '../../../components/common/NoDateRemind';
import {notification, Button, Radio, Input, Select, Modal, Spin} from 'antd';
import {routerRedux} from 'dva/router';
const RadioGroup = Radio.Group;

class FaceMatchPoiPage extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      gender: '1',
      visible: false
    };
    this.onNameChange = this.onNameChange.bind(this);
    this.onFaceCardTextClick = this.onFaceCardTextClick.bind(this);
    this.onFaceCardImgClick = this.onFaceCardImgClick.bind(this);
    this.onGenderChange = this.onGenderChange.bind(this);
    this.onGroupChange = this.onGroupChange.bind(this);
    this.onIdentityCardChange = this.onIdentityCardChange.bind(this);
    this.onThresholdChange = this.onThresholdChange.bind(this);
    this.onMemoChange = this.onMemoChange.bind(this);
    this.isSelected = this.isSelected.bind(this);
    this.fetchFace2Person = this.fetchFace2Person.bind(this);
    this.openNotificationWithIcon = this.openNotificationWithIcon.bind(this);
    this.onNewSubmit = this.onNewSubmit.bind(this);
    this.closedModal = this.closedModal.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.previousStep = this.previousStep.bind(this);
    this.renderFaceImg = this.renderFaceImg.bind(this);
    this.onTagChange = this.onTagChange.bind(this);
  }

  /**
   * 在组件更新的时候读取错误信息，提示异常更新操作
   */
  componentDidUpdate() {
    if (this.props.search && this.props.search.errorMsg) {
      this.openNotificationWithIcon('error', this.props.search.errorMsg)
    }
  }

  componentWillMount() {
    const match = pathToRegexp('/search/face/face2person/:faceTrackId').exec(this.props.location.pathname);
    if (match && match[1] && match[1]) {
      this.props.dispatch({type: 'search/face', payload: {facetrackId: match[1]}});
      this.setState({facetrackId: match[1]});
      this.props.dispatch({type: 'search/resetMatch'});
      this.props.dispatch({type: 'search/groupList'});
      this.props.dispatch({type: 'search/spinLoading'});

    }
  }

  componentDidMount() {
    this.fetchFace2Person({facetrackId: this.state.facetrackId});
  }

  componentWillUnmount() {
    this.props.dispatch({type: 'search/clearMatch'});
    this.props.dispatch({type: 'search/clearErrorMsg'});
    this.props.dispatch({type: 'search/cancelMatch'})
  }

  fetchFace2Person = (query) => {
    this.props.dispatch({type: 'search/matchFaceTrack2Person', payload: query});
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

  onNameChange = (value) => {
    this.setState({
      name: value.target.value
    });
  }

  onGenderChange = (value) => {
    this.setState({
      gender: value.target.value
    });
  }

  onIdentityCardChange = (value) => {
    this.setState({
      identityCard: value.target.value
    });
  }

  onGroupChange = (value) => {
    this.setState({
      groupId: value
    });
  }

  onThresholdChange = (value) => {
    this.setState({
      threshold: value.target.value
    });
  }

  onTagChange = (value) => {

    console.log('onTagChange', value.target.value)
    this.setState({
      impTag: value.target.value
    });
  }

  onMemoChange = (value) => {
    this.setState({
      memo: value.target.value
    });
  }


  onNewSubmit = () => {

    if (!this.state.name) {
      this.openNotificationWithIcon('error', '请填写姓名！');
      return;
    }
    if (!this.state.groupId) {
      this.openNotificationWithIcon('error', '请选择分组！');
      return;
    }
    if (!this.state.threshold) {
      this.openNotificationWithIcon('error', '请填写识别率！');
      return;
    }

    const payload = {
      facetrackId: this.state.facetrackId,
      name: this.state.name,
      groupId: this.state.groupId,
      threshold: this.state.threshold,
      gender: this.state.gender,
      identityCard: this.state.identityCard ? this.state.identityCard : '',
      impTag: this.state.impTag ? this.state.impTag : '',
      memo: this.state.memo ? this.state.memo : ''
    };


    this.props.dispatch({
     type: 'search/addByFaceTrack',
     payload
     });
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

  isSelected = (value) => {

    let selectedRow = this.state.selectedRow ? this.state.selectedRow : '';
    let selected = false;

    if (selectedRow && (value.poiDetailData.id == selectedRow.id)) {
      selected = true;
    }
    return selected;
  };

  previousStep = () => {
    this.props.dispatch(routerRedux.goBack());
  };

  nextStep = () => {
    if (this.state.selectedRow) {
      this.props.dispatch({
        type: 'search/bindFaceTrack',
        payload: {
          facetrackId: this.state.facetrackId,
          personId: this.state.selectedRow.personId
        }
      });
    } else {
      this.openNotificationWithIcon('error', '请选择一个目标人物！');
    }
  };

  renderFaceImg = (imgList) => {

    return imgList.map((value, i) => {
      return i < 10 ? <ImgView className={styles.img} key={i} src={value}/> : null
    })
  };

  render() {
    return (
      <MayLayout location={this.props.location}>
        <FilterProcessFaceView current={1} className={styles.process}/>
        <div className={styles.container}>
          <div className={title.container}>
            <span className={title.text}>人脸记录筛查确认</span>
          </div>
          <div className={styles.face}>
            <span className={styles.header}>人脸记录</span>
            {this.props.search.faceDetail ? this.renderFaceImg(this.props.search.faceDetail.imgs) : null}

          </div>
          <Spin spinning={this.props.search.loading} tip="匹配目标人物..." wrapperClassName={styles.spin}>

            <div className={styles.poiList}>
              <NoDateRemind visible={this.props.search.remindControl}/>
              {this.props.search.matchedPoiList && this.props.search.matchedPoiList.length > 0 ? this.props.search.matchedPoiList.map((value, i) =>
                <RatePoiCardView className={styles.faceItem}
                                 key={value.poiDetailData.id}
                                 data={value}
                                 checked={this.isSelected(value)}
                                 onImgClick={this.onFaceCardImgClick}
                                 onTextClick={this.onFaceCardTextClick}/>) : null}
            </div>
          </Spin>
          <div className={styles.new}>
            <span className={styles.tip}>提示：如果非以上选择，可新建一个目标。</span>
            <div className={styles.infoBg}/>
            <div className={styles.info}>
              <div className={styles.item}>
                <label className={styles.label}>姓名(*)：</label>
                <Input size="large" className={styles.input}
                       onChange={this.onNameChange}/>
              </div>
              <div className={styles.item}>
                <RadioGroup className={styles.radioGroup} defaultValue={this.state.gender}
                            onChange={this.onGenderChange}>
                  <Radio value={'1'} className={styles.radio}>男</Radio>
                  <Radio value={'0'} className={styles.radio}>女</Radio>
                </RadioGroup>
              </div>

              <div className={styles.item}>
                <label className={`${styles.label}`}>识别率(*)：</label>
                <Input size="large" className={styles.input}
                       onChange={this.onThresholdChange}/>
              </div>
              <div className={styles.item}>
                <label className={`${styles.label}`}>分组(*)：</label>
                <Select size="large" allowClear className={styles.input} onChange={this.onGroupChange}>
                  { this.props.search.groupList ? this.props.search.groupList.map((value, i) => <Select.Option key={i}
                                                                                                               value={value.id + ''}>{value.name}</Select.Option>) : null}
                </Select>
              </div>
              <div className={styles.item}>
                <label className={`${styles.label}`}>身份证号：</label>
                <Input size="large" className={styles.input} onChange={this.onIdentityCardChange}/>
              </div>

              <div className={styles.item}>
                <div className={styles.label}>标签：</div>
                <Input className={styles.input} onChange={this.onTagChange}/>
              </div>

              <div className={styles.item}>
                <label className={`${styles.label}`}>备注：</label>
                <Input size="large" className={styles.input} onChange={this.onMemoChange}/>
              </div>

              <div className={`${styles.fix} ${styles.item}`}>
                <Button type='primary' className={styles.newBtn} onClick={this.onNewSubmit}>新建</Button>
              </div>
            </div>
          </div>


          <div className={styles.btnArea}>
            <Button type='primary' className={`${styles.previous} ${styles.btn}`} onClick={this.previousStep}>上一步</Button>
            <Button type='primary' className={`${styles.next} ${styles.btn}`}
                    onClick={this.nextStep}>下一步</Button>
          </div>
        </div>


        <Modal visible={this.state.visible}
               title=''
               footer=''
               onOk={this.closedModal}
               onCancel={this.closedModal}
               closable={false}
               width={1116}
               bodyStyle={{padding: 0, height: 803}}
               className={styles.modal}
        >
          {this.state.modalPoi ?
            <PoiView key={this.state.modalPoi.id} poi={this.state.modalPoi} onClosed={this.closedModal}/> : null}

        </Modal>


      </MayLayout>
    )
  }
}

function mapStateToProps({search}) {
  return {search}
}

export default connect(mapStateToProps)(FaceMatchPoiPage);

