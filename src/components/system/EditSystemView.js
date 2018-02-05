
import React from 'react';
import { connect } from 'dva';
import { Modal, Input, Select, notification } from 'antd';
import { StyleSheet, css } from 'aphrodite';
import title from './../../style/common/title.css';

const { TextArea } = Input;

const styles = StyleSheet.create({
  modal: {
    top: 150
  },
  content: {
    background: '#232C31',
    height: 544,
    width: '100%'
  },
  input: {
    height: 32,
    lineHeight: '32px',
    fontSize: 14,
    width: 200,
    border: 1,
    borderRadius: 6,
    padding: '0 5px'
  },
  inputTextarea: {
    height: 50,
    lineHeight: '16px',
    fontSize: 14,
    width: 200,
    border: 1,
    borderRadius: 6
  },
  select: {
    width: 210
  },
  fix: {
    marginLeft: 5
  },
  btn: {
    height: 32,
    fontSize: 16,
    lineHeight: '32px',
    display: 'inline-block',
    background: '#339A99',
    color: '#fff',
    width: 78,
    textAlign: 'center',
    position: 'relative',
    left: 20,
    top: 2,
    border: 1,
    borderRadius: 6
  },
  info: {
    width: 572,
    height: 426,
    background: '#151a20',
    marginLeft: 14,
    position: 'relative',
    paddingTop: 5
  },
  item: {
    margin: '25px auto 0',
    width: 300,
    height: 40,
    fontSize: 14
  },
  label: {
    color: '#70C5EA',
    height: 40,
    width: 80,
    display: 'inline-block',
    textAlign: 'right'

  },
  camera: {
    color: '#70C5EA',
    height: 32,
    lineHeight: '64px',
    fontSize: 16,
    width: 200,
    border: 1,
    borderRadius: 6,
    padding: '0 5px'
  },

  btnArea: {
    height: 99,
    textAlign: 'center'
  },
  actionBtn: {
    height: 40,
    lineHeight: '40px',
    background: '#109DEC',
    width: 100,
    top: 30,
    marginRight: 50
  }
});
class EditSystemView extends React.Component {

  constructor(props) {
    super(props);
    this.openNotificationWithIcon = this.openNotificationWithIcon.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.alarmType = this.alarmType.bind(this);
    this.memo = this.memo.bind(this);
  }


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
  alarmType = value => {

  };
  memo = value => value || '';


  onSubmit = () => {
    const editSystemView = this.props.dictory.editSystemView;
    if (!editSystemView.dicKey) {
      this.openNotificationWithIcon('error', '请填写主键');
      return false;
    }
    if (!editSystemView.dicTag) {
      this.openNotificationWithIcon('error', '请填写编码');
      return false;
    }
    if (!editSystemView.dicName) {
      this.openNotificationWithIcon('error', '请填写名称');
      return false;
    }
    if (!editSystemView.dicValue) {
      this.openNotificationWithIcon('error', '请填写值');
      return false;
    }
    this.props.onModalSubmit();
  };
  onCancel = () => {
    this.props.onModalCancel();
  };
  onDicKeyChange = e => {
    const editSystemView = this.props.dictory.editSystemView;
    this.props.dispatch({
      type: 'dictory/success',
      payload: {
        editSystemView: {
          ...editSystemView,
          dicKey: e.target.value
        }
      }
    });
  };
  onDicTagChange = e => {
    const editSystemView = this.props.dictory.editSystemView;
    this.props.dispatch({
      type: 'dictory/success',
      payload: {
        editSystemView: {
          ...editSystemView,
          dicTag: e.target.value
        }
      }
    });
  };
  onDicNameChange = e => {
    const editSystemView = this.props.dictory.editSystemView;
    this.props.dispatch({
      type: 'dictory/success',
      payload: {
        editSystemView: {
          ...editSystemView,
          dicName: e.target.value
        }
      }
    });
  };
  onDicValueChange = e => {
    const editSystemView = this.props.dictory.editSystemView;
    this.props.dispatch({
      type: 'dictory/success',
      payload: {
        editSystemView: {
          ...editSystemView,
          dicValue: e.target.value
        }
      }
    });
  };
  onSortNoChange = e => {
    const editSystemView = this.props.dictory.editSystemView;
    this.props.dispatch({
      type: 'dictory/success',
      payload: {
        editSystemView: {
          ...editSystemView,
          sortNo: e.target.value
        }
      }
    });
  };
  onMemoChange = e => {
    const editSystemView = this.props.dictory.editSystemView;
    this.props.dispatch({
      type: 'dictory/success',
      payload: {
        editSystemView: {
          ...editSystemView,
          memo: e.target.value
        }
      }
    });
  }

  render() {
    return (
      <Modal
        visible={this.props.modalVisible}
        title=""
        footer=""
        onOk={this.onCancel}
        onCancel={this.onCancel}
        closable={false}
        width={600}
        bodyStyle={{ padding: 0, height: 580, overflow: 'auto' }}
        className={css(styles.modal)}
      >
        <div className={title.container}>
          <span className={title.text}>{this.props.dictory.editSystemView.action === 'new' ? '新建数据字典' : '修改数据字典'}</span>
        </div>

        <div className={css(styles.content)}>
          <div className={css(styles.info)}>
            <div className={css(styles.item)}>
              <label className={css(styles.label)}>*主键：</label>
              <Input
                type="text"
                className={`${css(styles.input)} ${css(styles.fix)}`}
                value={this.props.data && this.props.data.dicKey ? this.props.data.dicKey : ''}
                onChange={this.onDicKeyChange}
              />
            </div>
            <div className={css(styles.item)}>
              <label className={css(styles.label)}>*编码：</label>
              <Input
                type="text"
                className={`${css(styles.input)} ${css(styles.fix)}`}
                value={this.props.data && this.props.data.dicTag ? this.props.data.dicTag : ''}
                onChange={this.onDicTagChange}
              />
            </div>
            <div className={css(styles.item)}>
              <label className={css(styles.label)}>*名称：</label>
              <Input
                type="text"
                className={`${css(styles.input)} ${css(styles.fix)}`}
                value={this.props.data && this.props.data.dicName ? this.props.data.dicName : ''}
                onChange={this.onDicNameChange}
              />
            </div>
            <div className={css(styles.item)}>
              <label className={css(styles.label)}>排序号：</label>
              <Input
                type="number"
                className={`${css(styles.input)} ${css(styles.fix)}`}
                value={(this.props.data && this.props.data.sortNo) || (this.props.data && this.props.data.sortNo == 0) ? this.props.data.sortNo : 0}
                onChange={this.onSortNoChange}
              />
            </div>
            <div className={css(styles.item)}>
              <label className={css(styles.label)}>*值：</label>
              <Input
                type="textarea"
                className={`${css(styles.inputTextarea)} ${css(styles.fix)}`}
                value={this.props.data && this.props.data.dicValue ? this.props.data.dicValue : ''}
                onChange={this.onDicValueChange}
              />
            </div>


            <div className={css(styles.item)}>
              <label className={css(styles.label)}>备注：</label>
              <Input
                type="textarea" onChange={this.onMemoChange}
                className={`${css(styles.inputTextarea)} ${css(styles.fix)}`}
                value={this.props.data && this.props.data.memo ? this.props.data.memo : ''}
              />
            </div>
          </div>
          <div className={css(styles.btnArea)}>
            <a className={`${css(styles.btn)} ${css(styles.actionBtn)}`} onClick={this.onSubmit}>保存</a>
            <a className={`${css(styles.btn)} ${css(styles.actionBtn)}`} onClick={this.onCancel}>取消</a>
          </div>
        </div>
      </Modal>
    );
  }
}

function mapStateToProps({ dictory }) {
  return { dictory };
}

export default connect(mapStateToProps)(EditSystemView);

