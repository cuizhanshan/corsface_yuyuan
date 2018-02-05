/**
 * Created by Riky on 2017/4/5.
 */
import React from 'react';
import {Modal, Input, Select, notification} from 'antd';
import {StyleSheet, css} from 'aphrodite';
import title from './../../style/common/title.css';
const styles = StyleSheet.create({
  modal: {
    top: 100
  },
  content: {
    background: '#151a20',
    position: 'relative',
    height: 735,
    width: 756
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
    width: 746,
    height: 725,
    background: '#33444E',
    left: 5,
    top: 5,
    position: 'relative',
    paddingTop: 60
  },
  item: {
    margin: '30px auto 0',
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
    textAlign: 'right'
  },
  input: {
    height: 32,
    lineHeight: '32px',
    fontSize: 14,
    width: 200,
    border: 1,
    borderRadius: 6,
    padding: '0 5px',
    marginLeft: 10
  },
  select: {
    width: 210,
    marginLeft: 5
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
    position: 'relative',
    top: 100,
    marginRight: 50
  }
});
//const AddAlarmCfgView = ({modalVisible, onOk, onClosedModal}) => {
class AddAlarmCfgView extends React.Component {

  constructor(props) {
    super(props);
    this.onCancel = this.onCancel.bind(this);
    this.onGroupChange = this.onGroupChange.bind(this);
    this.onAlarmTypeChange = this.onAlarmTypeChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onMemoChange = this.onMemoChange.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onSrcChange = this.onSrcChange.bind(this);
    this.openNotificationWithIcon = this.openNotificationWithIcon.bind(this);
  }

  onNameChange = (e) => {
    this.setState({name: e.target.value ? e.target.value : ''});
  };
  onSrcChange = (value) => {
    this.setState({
      srcId: value
    });
  };
  onGroupChange = (value) => {
    this.setState({groupId: value});
  };
  onAlarmTypeChange = (value) => {
    this.setState({alarmType: value});
  };
  onMemoChange = (e) => {

    console.log('memo',e,e.target.value)
    this.setState({memo: e.target.value ? e.target.value : ''});
  };
  onCancel = () => {
    this.setState({name: '', alarmType: '', groupId: '', memo: '', srcId: ''});
    this.props.onClosedModal();
  };
  onSubmit = () => {
    if (this.state) {
      if (!this.state.name) {
        this.openNotificationWithIcon('error', '报警规则名称不能为空');
        return;
      }

      if (!this.state.groupId) {
        this.openNotificationWithIcon('error', '请选择分组');
        return;
      }

      if (!this.state.srcId) {
        this.openNotificationWithIcon('error', '请选择摄像头');
        return;
      }

      if (!this.state.alarmType) {
        this.openNotificationWithIcon('error', '请选择报警方式');
        return;
      }

      let payload = {
        srcId: this.state.srcId,
        name: this.state.name,
        alarmType: this.state.alarmType,
        groupId: this.state.groupId,
        memo: this.state.memo ? this.state.memo : ''
      };
      this.props.onOk(payload);
    } else {
      this.openNotificationWithIcon('error', '请填写相关信息');
      return null;
    }

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
      <Modal visible={this.props.modalVisible}
             title=''
             footer=''
             closable={false}
             onOk={this.onCancel}
             onCancel={this.onCancel}
             width={756}
             bodyStyle={{padding: 0, height: 771, overflow: 'auto'}}
             className={css(styles.modal)}
      >
        <div className={title.container}>
          <span className={title.text}>添加报警规则</span>
        </div>
        <div className={css(styles.content)}>
          <div className={css(styles.info)}>

            <div className={css(styles.item)}>
              <label className={css(styles.label)}>名称：</label>
              <Input type="text" className={css(styles.input)} onChange={this.onNameChange}/>
            </div>

            <div className={css(styles.item)}>
              <label className={css(styles.label)}>分组：</label>
              <Select size="large" className={`${css(styles.input)} ${css(styles.select)}`}
                      onChange={this.onGroupChange}>
                { this.props.groupList ? this.props.groupList.map((value, i) => <Select.Option key={i}
                                                                                               value={value.id + ''}>{value.name}</Select.Option>) : null}
              </Select>
            </div>

            <div className={css(styles.item)}>
              <label className={css(styles.label)}>摄像头：</label>
              <Select className={`${css(styles.input)} ${css(styles.select)}`} size="large" allowClear onChange={this.onSrcChange}>
                { this.props.cameraList ? this.props.cameraList.map((value, i) => <Select.Option key={i}
                                                                                                 value={value.srcId + ''}>{value.name}</Select.Option>) : null}
              </Select>

            </div>


            <div className={css(styles.item)}>
              <label className={css(styles.label)}>报警方式：</label>
              <Select size="large" className={`${css(styles.input)} ${css(styles.select)}`}
                      onChange={this.onAlarmTypeChange}>
                <Select.Option key={1} value={'1'}>白名单报警</Select.Option>
                <Select.Option key={2} value={'2'}>黑名单报警</Select.Option>
              </Select>
            </div>

            <div className={css(styles.item)}>
              <label className={css(styles.label)} >备注：</label>
              <Input type="text" className={css(styles.input)} onChange={this.onMemoChange}/>
            </div>


            <div className={css(styles.btnArea)}>
              <a className={`${css(styles.btn)} ${css(styles.actionBtn)}`} onClick={this.onSubmit}>保存</a>
              <a className={`${css(styles.btn)} ${css(styles.actionBtn)}`} onClick={this.onCancel}>取消</a>
            </div>

          </div>


        </div>

      </Modal>
    )
  }
}

export default AddAlarmCfgView;

