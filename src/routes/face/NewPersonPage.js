/**
 * Created by Riky on 2017/3/22.
 */
import React from 'react';
import {connect} from 'dva';
import MainLayout from '../../components/common/MainLayout';
import ImgView from '../../components/common/ImgView';
import {StyleSheet, css} from 'aphrodite';
import {Row, Button, Input, Radio, InputNumber, Select, notification} from 'antd';
import title from '../../style/common/title.css';
const RadioGroup = Radio.Group;
import {NEW_PERSON_FACE_IMG_SIZE} from '../../utils/constant';

const styles = StyleSheet.create({
  container: {
    width: 1200,
    height: 785,
    margin: '50px auto 0',
    background: '#151a20',
    border: '1px solid #3d515d',
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
  },
  content: {
    width: 1190,
    height: 737,
    background: '#33444e',
    margin: '5px auto',
    position: 'relative'
  },
  list: {
    height: 350,
    width: 1010,
    background: '#151a20',
    position: 'absolute',
    left: 90,
    right: 90,
    top: 30,
    padding: 8
  },

  img: {
    width: 150,
    display: 'inline-block',
    margin: '8px 24px'
  },

  info: {
    width: 1010,
    position: 'absolute',
    left: 90,
    right: 90,
    top: 400,
    color: '#70c8ea',
    fontFamily: 'SimHei',
    fontSize: 14
  },
  title: {
    display: 'block',
    width: '100%'
  },

  underline: {
    height: 1,
    background: '#70c8ea'
  },
  person: {
    width: '100%',
    textAlign: 'center',
    height: 226,
    padding: 10
  },
  item: {
    marginTop: 9,
    marginBottom: 9,
    height: 32,
    width: 450,
    color: '#ffffff',
    fontSize: 16,
    display: 'inline-block',
    float: 'left'
  },
  itemText: {
    display: 'inline-block',
    textAlign: 'right',
    lineHeight: '32px',
    width: 94
  },
  itemInput: {
    display: 'inline-block',
    fontSize: 16,
    width: 200,
    height: 32,
    marginLeft: 10,

  },
  radioGroup: {
    height: 32
  },
  radio: {
    fontSize: 16,
    marginTop: 4
  },
  btnArea: {
    position: 'absolute',
    bottom: 35,
    textAlign: 'center',
    paddingLeft: 340
  },
  btn: {
    fontSize: 16,
    fontFamily: 'SimHei',
    width: 120,
    height: 44,
    marginLeft: 50
  }

});

class NewPersonPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      gender: '1',
      face: props.face ? props.face.modalFaceDescData : null
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onGenderChange = this.onGenderChange.bind(this);
    this.onIdentityCardChange = this.onIdentityCardChange.bind(this);
    this.onGroupChange = this.onGroupChange.bind(this);
    this.onThresholdChange = this.onThresholdChange.bind(this);
    this.onTagChange = this.onTagChange.bind(this);
    this.onMemoChange = this.onMemoChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.openNotificationWithIcon = this.openNotificationWithIcon.bind(this);
    this.onCloseNewPage = this.onCloseNewPage.bind(this);
  }

  componentWillMount() {
    this.props.dispatch({
      type: 'face/groupList'
    })
  }

  componentWillUpdate(){
    if(this.props.face.newPerson.error){
      this.openNotificationWithIcon('error',this.props.face.newPerson.error)
    }
  }

  onCloseNewPage(){
    this.props.dispatch({
      type: 'face/onCloseNewPerson'
    })
  }

  onNameChange(value) {
    this.setState({
      name: value.target.value
    });
  }

  onGenderChange(value) {
    this.setState({
      gender: value.target.value
    });
  }

  onIdentityCardChange(value) {
    this.setState({
      identityCard: value.target.value
    });
  }

  onGroupChange(value) {
    this.setState({
      groupId: value
    });
  }

  onThresholdChange(value) {
    this.setState({
      threshold: value
    });
  }

  onTagChange(value) {
    this.setState({
      impTag: value.target.value
    });
  }

  onMemoChange(value) {

    this.setState({
      memo: value.target.value
    });
  }


  openNotificationWithIcon(type, message) {
    notification[type]({
      message: '错误提示',
      description: message
    });
  };

  onSubmit() {

    if (!this.state.face.code) {
      this.openNotificationWithIcon('error', '非法进入，请返回首页！');
      return;
    }
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
      facetrackId: this.state.face.code,
      name: this.state.name,
      groupId: this.state.groupId,
      threshold: this.state.threshold,
      gender: this.state.gender,
      identityCard: this.state.identityCard ? this.state.identityCard : '',
      impTag: this.state.impTag ? this.state.impTag : '',
      memo: this.state.memo ? this.state.memo : ''
    };

   this.props.dispatch({
      type: 'face/newPerson',
      payload: payload
    });
  }

  render() {
    return (
      <MainLayout location={location}>
        <Row className={css(styles.container)}>
          <div className={title.container}>
            <span className={title.text}>新建目标</span>
            <div className={title.closeBtn} onClick={this.onCloseNewPage}/>
          </div>
          <div className={css(styles.content)}>

            <div className={css(styles.list)}>
              {this.state.face && this.state.face.imgs ? this.state.face.imgs.map((value, i) => {
                  return i < NEW_PERSON_FACE_IMG_SIZE ? <ImgView src={value} key={i} className={css(styles.img)}/> : null
                }
              ) : null}
            </div>
            <div className={css(styles.info)}>
              <span className={css(styles.title)}>基本信息</span>
              <div className={css(styles.underline)}/>
              <div className={css(styles.person)}>

                <div className={css(styles.item)}>
                  <div className={css(styles.itemText)}>姓名(*)：</div>
                  <Input className={css(styles.itemInput)} onChange={this.onNameChange}/>
                </div>
                <div className={css(styles.item)}>
                  <RadioGroup className={css(styles.radioGroup)} defaultValue={this.state.gender}
                              onChange={this.onGenderChange}>
                    <Radio value={'1'} className={css(styles.radio)}>男</Radio>
                    <Radio value={'0'} className={css(styles.radio)}>女</Radio>
                  </RadioGroup>
                </div>
                <div className={css(styles.item)}>
                  <div className={css(styles.itemText)}>分组(*)：</div>
                  <Select className={css(styles.itemInput)} size="large" allowClear onChange={this.onGroupChange}>
                    { this.props.face.groupList ? this.props.face.groupList.map((value, i) => <Select.Option key={i}
                                                                                                             value={value.id + ''}>{value.name}</Select.Option>) : null}
                  </Select>
                </div>
                <div className={css(styles.item)}>
                  <div className={css(styles.itemText)}>识别率(*)：</div>
                  <InputNumber className={css(styles.itemInput)} min={1} max={99} onChange={this.onThresholdChange}/>
                </div>
                <div className={css(styles.item)}>
                  <div className={css(styles.itemText)}>标签：</div>
                  <Input className={css(styles.itemInput)} onChange={this.onTagChange}/>
                </div>

                <div className={css(styles.item)}>
                  <div className={css(styles.itemText)}>身份证号：</div>
                  <Input className={css(styles.itemInput)} onChange={this.onIdentityCardChange}/>
                </div>

                <div className={css(styles.item)}>
                  <div className={css(styles.itemText)}>备注：</div>
                  <Input className={css(styles.itemInput)} onChange={this.onMemoChange}/>
                </div>
              </div>
            </div>
            <div className={css(styles.btnArea)}>
              <Button type="primary" className={css(styles.btn)} onClick={this.onSubmit}>创建</Button>
              <Button type="primary" className={css(styles.btn)} onClick={this.onCloseNewPage}>取消</Button>
            </div>
          </div>
        </Row>

      </MainLayout>
    )
  }
}

function mapStateToProps({face}) {
  return {face}
}
export default connect(mapStateToProps)(NewPersonPage);
