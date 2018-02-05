/**
 * Created by Riky on 2017/4/5.
 */
import React from 'react';
import {Modal, Input, Select, notification} from 'antd';
import {StyleSheet, css} from 'aphrodite';
import title from './../../style/common/title.css';
const styles = StyleSheet.create({
  modal: {
    top: 150
  },
  content: {
    background: '#232C31',
    height: 421,
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
  select:{
    width:210
  },
  fix:{
    marginLeft:5
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
    height: 322,
    background: '#151a20',
    marginLeft: 14,
    position: 'relative',
    paddingTop: 5
  },
  item: {
    margin: '18px auto 0',
    width: 300,
    height: 40,
    fontSize: 14,
  },
  label: {
    color: '#70C5EA',
    height: 40,
    width: 80,
    display: 'inline-block',
    lineHeight: '40px',
    textAlign: 'right',

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
class EditAlarmCfgView extends React.Component {

  constructor(props) {
    super(props);
    this.onAlarmTypeChange = this.onAlarmTypeChange.bind(this);
    this.onGroupChange = this.onGroupChange.bind(this);
    this.openNotificationWithIcon = this.openNotificationWithIcon.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onMemoChange = this.onMemoChange.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.alarmType = this.alarmType.bind(this);
    this.memo = this.memo.bind(this);
  }

  onNameChange = (e) => {
    this.setState({name: e.target.value ? e.target.value : '', nameChange: true});
  };
  onAlarmTypeChange = (value) => {
    this.setState({alarmType: value});
  };
  onGroupChange = (value) => {
    this.setState({groupId: value});
  };
  onMemoChange = (e) => {
    this.setState({memo: e.target.value ? e.target.value : '', memoChange: true});
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
  alarmType = (value) => {
    let type;
    switch (value) {
      case '黑名单报警':
        type = 2;
        break;
      case '白名单报警':
        type = 1;
        break;
    }
    return type;
  };
  memo = (value) => {
    return value ? value : '';
  };


  onSubmit = () => {
    if (!this.state) {
      //this.state 没有任何修改直接关闭
      this.props.onClosedModal();
      return null;
    }
    else {
      //修改其中某一个字段

      let payload = {
        alarmConfigId: this.props.data.id,
        name: this.props.data.name,
        alarmType: this.state && this.state.alarmType ? this.state.alarmType : this.alarmType(this.props.data.alarmType),
        groupId: this.state && this.state.groupId ? this.state.groupId : this.props.data.groupId,
        memo: this.memo(this.props.data.memo)
      };


      if (this.state.nameChange) {
        if (!this.state.name) {
          this.openNotificationWithIcon('error', '报警规则名称不能为空');
          return null;
        } else {
          if (this.state.name && this.state.name.length == 0 || this.state.name.match(/^\s+$/)) {
            //为空或者输入的是空字符串
            this.openNotificationWithIcon('error', '报警规则名称不能为空');
            return null;
          } else {
            payload.name = this.state.name;
          }
        }
      }

      if (this.state.memoChange) {
        payload.memo = this.state.memo;
      }


      console.log(payload);

      this.props.onOk(payload);
    }
  };
  onCancel = () => {
    this.setState({name: '', alarmType: '', groupId: '', memo: ''});
    this.props.onClosedModal();
  };

  render() {
    return (
      <Modal visible={this.props.modalVisible}
             title=''
             footer=''
             onOk={this.onCancel}
             onCancel={this.onCancel}
             closable={false}
             width={600}
             bodyStyle={{padding: 0, height: 457, overflow: 'auto'}}
             className={css(styles.modal)}
      >
        <div className={title.container}>
          <span className={title.text}>修改报警规则</span>
        </div>

        <div className={css(styles.content)}>
          <div className={css(styles.info)}>
            <div className={css(styles.item)}>
              <label className={css(styles.label)}>摄像头：</label>
              <label
                className={css(styles.camera)}>{this.props.data && this.props.data.srcName ? this.props.data.srcName : ''}</label>
            </div>
            <div className={css(styles.item)}>
              <label className={css(styles.label)}>名称：</label>
              <Input type="text" className={`${css(styles.input)} ${css(styles.fix)}`} onChange={this.onNameChange}
                     defaultValue={this.props.data && this.props.data.name ? this.props.data.name : ''}/>
            </div>
            <div className={css(styles.item)}>
              <label className={css(styles.label)}>分组：</label>
              <Select size="large" className={`${css(styles.input)} ${css(styles.select)}`} onChange={this.onGroupChange}
                      defaultValue={this.props.data && this.props.data.groupId ? [`${this.props.data.groupId}`] : ''}>
                { this.props.groupList ? this.props.groupList.map((value, i) => <Select.Option key={i}
                                                                                               value={value.id + ''}>{value.name}</Select.Option>) : null}
              </Select>
            </div>
            <div className={css(styles.item)}>
              <label className={css(styles.label)}>报警方式：</label>
              <Select size="large" className={`${css(styles.input)} ${css(styles.select)}`}
                      defaultValue={this.props.data && this.props.data.alarmType ? this.props.data.alarmType : ''}
                      onChange={this.onAlarmTypeChange}>
                <Select.Option key={1} value={'1'}>白名单报警</Select.Option>
                <Select.Option key={2} value={'2'}>黑名单报警</Select.Option>
              </Select>
            </div>
            <div className={css(styles.item)}>
              <label className={css(styles.label)}>备注：</label>
              <Input type="text" className={`${css(styles.input)} ${css(styles.fix)}`} onChange={this.onMemoChange}
                     defaultValue={this.props.data && this.props.data.memo ? this.props.data.memo : ''}/>
            </div>
          </div>
          <div className={css(styles.btnArea)}>
            <a className={`${css(styles.btn)} ${css(styles.actionBtn)}`} onClick={this.onSubmit}>保存</a>
            <a className={`${css(styles.btn)} ${css(styles.actionBtn)}`} onClick={this.onCancel}>取消</a>
          </div>
        </div>
      </Modal>
    )
  }
}
export default EditAlarmCfgView;

