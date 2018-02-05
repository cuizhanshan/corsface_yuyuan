/**
 * Created by Riky on 2017/4/12.
 */
import React from 'react';
import {Modal, notification} from 'antd';
import {StyleSheet, css} from 'aphrodite';
import Title from '../../style/common/title.css';
import CheckImgView from '../common/CheckImgView';

const styles = StyleSheet.create({
  modal: {
    top: 60
  },
  container: {
    width: '100%',
    height: 784,
    background: '#232C31'
  },
  fixTitleBg: {
    background: '#33444C'
  },
  list: {
    width: 500,
    height: 436,
    background: '#151A20',
    border: '1px solid #3D515C',
    marginTop: 5,
    overflow: 'auto',
    position: 'relative'
  },
  img: {
    margin: '12px 5px 0',
    width: 150,
    height: 150
  },
  left: {
    float: 'left',
    marginLeft: 10
  },
  right: {
    float: 'right',
    marginRight: 10
  },

  title: {
    width: '100%',
    height: 36,
    background: '#33444C',
    color: '#70c8ea'
  },
  titleText: {
    width: '100%',
    height: 36,
    textAlign: 'left',
    display: 'block',
    fontSize: 14,
    fontFamily: ['SimHei', 'sans-serif'],
    lineHeight: '36px',
    paddingLeft: 10
  },

  bgImg: {
    position: 'relative',
    top: 40,
    width: '100%',
    height: 226,
    paddingLeft: 40
  },
  btnArea: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 70,
    textAlign: 'center'
  },
  btn: {
    display: 'inline-block',
    color: '#fff',
    height: 40,
    lineHeight: '40px',
    background: '#109DEC',
    width: 100,
    top: 15,
    fontFamily: ['SimHei', 'sans-serif'],
    position: 'relative',
    marginLeft: 40,
    borderRadius:6
  }
});


class ModalCheckPersonView extends React.Component {

  constructor(props) {
    super(props);
    this.getArrayIndex = this.getArrayIndex.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onOk = this.onOk.bind(this);
    this.openNotificationWithIcon = this.openNotificationWithIcon.bind(this);
    this.state = {
      checkedIndex: '-1',
      checkedFile: ''
    }
  }

  onCancel = () => {
    this.props.onCancel(this.props.data);
  };

  getArrayIndex = (dst, file) => {
    let index = -1 + '';
    dst.map((value, i) => {
      if (value.name == file.name) {
        index = i + '';
      }
    });
    return index;
  };

  onClick = (valve) => {

    const {response} = this.props.data;

    let dst = response ? response.result.dst : [];
    let index = this.getArrayIndex(dst, valve);
    let checkedIndex = this.state.checkedIndex;
    if (checkedIndex) {
      checkedIndex = (index == checkedIndex) ? '-1' : index
    }
    let checkedFile = (checkedIndex == '-1') ? '' : valve;
    this.setState({checkedIndex, checkedFile});
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
  onOk = () => {
    if (this.state.checkedFile) {

      let file = this.props.data;
      file.thumbUrl = this.state.checkedFile.url;

      this.props.onSubmit({checkedFile: this.state.checkedFile, file});


    } else {
      this.openNotificationWithIcon('error', '请从人脸列表中选择一张人脸')
    }
  };

  render() {

    const { response} = this.props.data ? this.props.data : [];

    return (
      <Modal visible={this.props.visible} title={null} footer={null} onCancel={this.onCancel} closable={false}
             width={1080}
             className={css(styles.modal)}
             bodyStyle={{padding: 0, height: 820, overflow: 'auto'}}>

        <div className={Title.container}>
          <span className={Title.text}>人脸选择</span>
        </div>
        <div className={css(styles.container)}>
          <div className={`${css(styles.list)} ${css(styles.left)}`}>
            <div className={css(styles.title)}>
              <span className={css(styles.titleText)}>人脸列表</span>
            </div>
            {response ? response.result.dst.map((value, i) => <CheckImgView src={value} key={i}
                                                                            onClick={this.onClick}
                                                                            className={css(styles.img)}
                                                                            checked={ this.state && this.state.checkedIndex && this.state.checkedIndex == i ? true : false }/>) : null}
          </div>
          <div className={`${css(styles.list)} ${css(styles.right)}`}>
            <div className={css(styles.title)}>
              <span className={css(styles.titleText)}>人脸照片</span>
            </div>
            {this.state.checkedFile ? <CheckImgView src={this.state.checkedFile} className={css(styles.img)}/> : null}

          </div>

          {response ? <CheckImgView src={response.result.src} className={css(styles.bgImg)}/> : null}

          <div className={css(styles.btnArea)}>
            <a className={css(styles.btn)} onClick={this.onOk}>确认</a>
            <a className={css(styles.btn)} onClick={this.onCancel}>取消</a>
          </div>

        </div>
      </Modal>
    )
  }
}

export default ModalCheckPersonView;


