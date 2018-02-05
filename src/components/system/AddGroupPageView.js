/**
 * Created by Riky on 2017/4/5.
 */
import React from 'react';
import { Modal, Input, Select, notification } from 'antd';
import { connect } from 'dva';
import { StyleSheet, css } from 'aphrodite';
import title from './../../style/common/title.css';

const styles = StyleSheet.create({
  container: {
    width: 1604,
    position: 'relative',
    height: 880,
    background: '#151A20'
  },
  searchBar: {
    position: 'relative',
    width: '100%',
    height: 64,
    fontSize: 16,
    fontFamily: ['SimHei', 'sans-serif']
  },
  label: {
    color: '#70C5EA',
    height: 40,
    width: 86,
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
  addGroup: {
    height: 40,
    lineHeight: '40px',
    background: '#109DEC',
    float: 'right',
    width: 100,
    top: 12,
    marginRight: 40
  },
  table: {
    width: 1604
  },
  page: {
    height: 32,
    color: '#70c8ea',
    width: 1604,
    position: 'absolute',
    bottom: 0
  },
  delete: {
    fontSize: 16,
    textDecoration: 'underline',
    float: 'left',
    display: 'inline-block',
    height: 32,
    lineHeight: '36px'
  },

  pagination: {
    height: 32,
    color: '#70c8ea',
    width: 1572,
    position: 'absolute',
    bottom: 0,
    display: 'inline-block'
  },


  modal: {
    top: 150
  },
  content: {
    background: '#232C31',
    height: 590,
    width: '100%'
  },
  info: {
    width: 552,
    height: 570,
    background: '#33444E',
    left: 5,
    top: 5,
    position: 'relative',
    paddingTop: 10
  },
  item: {
    margin: '30px auto 0',
    width: 300,
    height: 60,
    fontSize: 14
  },
  modalLabel: {
    color: '#70C5EA',
    height: 40,
    width: 48,
    display: 'inline-block',
    lineHeight: '40px'
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
    top: 50,
    marginRight: 50
  }
});
// const AddMasjidPgView = ({modalVisible, onOk, onClosedModal}) => {
class AddGroupPageView extends React.Component {

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
  componentDidMount() {

  }

  onNameChange = e => {
    const addCameraGroupParam = this.props.addCameraGroupParam
    this.props.dispatch({
      type: 'group/success',
      payload: {
        addCameraGroupParam: {
          ...addCameraGroupParam,
          name: e.target.value
        }
      }
    })
  };
  onSortNoChange = e => {
    const addCameraGroupParam = this.props.addCameraGroupParam
    this.props.dispatch({
      type: 'group/success',
      payload: {
        addCameraGroupParam: {
          ...addCameraGroupParam,
          sortNo: e.target.value
        }
      }
    })
  };
  onMemoChange = e => {
    const addCameraGroupParam = this.props.addCameraGroupParam
    this.props.dispatch({
      type: 'group/success',
      payload: {
        addCameraGroupParam: {
          ...addCameraGroupParam,
          memo: e.target.value
        }
      }
    })
  };
  onOrgunitIdChange = value => {
    const addCameraGroupParam = this.props.addCameraGroupParam
    this.props.dispatch({
      type: 'group/success',
      payload: {
        addCameraGroupParam: {
          ...addCameraGroupParam,
          orgunitId: value
        }
      }
    })
  };
  onSrcChange = value => {
    this.setState({
      srcId: value
    });
  };
  onGroupChange = value => {
    this.setState({ groupId: value });
  };
  onAlarmTypeChange = value => {
    this.setState({ alarmType: value });
  };

  onCancel = () => {
    this.props.dispatch({
      type: 'group/success',
      payload: {
        addGroupVisiable: false
      }

    });
  };
  onSubmit = () => {
    if (this.props.addCameraGroupParam) {
      if (!this.props.addCameraGroupParam.sortNo) {
        this.openNotificationWithIcon('error', '排序号不能为空');
        return;
      }

      if (!this.props.addCameraGroupParam.name) {
        this.openNotificationWithIcon('error', '分组名称不能为空');
        return;
      }

      if (!this.props.addCameraGroupParam.parentId) {
        this.openNotificationWithIcon('error', '上一级不能为空');
        return;
      }

      this.props.dispatch({
        type: 'group/addCameraGroup'
      })
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
      <Modal
          visible={this.props.addGroupVisiable}
        title=""
        footer=""
        closable={false}
        onOk={this.onCancel}
        onCancel={this.onCancel}
        width={572}
        bodyStyle={{ padding: 0, overflow: 'auto' }}
        className={css(styles.modal)}
      >
        <div className={title.container}>
          <span className={title.text}>添加分组</span>
        </div>
        <div className={css(styles.content)}>
          <div className={css(styles.info)}>

            <div className={css(styles.item)}>
              <label className={css(styles.label)}>序号：</label>
              <Input type="text" className={css(styles.input)} value={this.props.addCameraGroupParam.sortNo} onChange={this.onSortNoChange}/>
            </div>


            <div className={css(styles.item)}>
              <label className={css(styles.label)}>名称：</label>
              <Input type="text" className={css(styles.input)} value={this.props.addCameraGroupParam.name} onChange={this.onNameChange}/>
            </div>


            <div className={css(styles.item)}>
              <label className={css(styles.label)} >备注：</label>
              <Input type="text" className={css(styles.input)} value={this.props.addCameraGroupParam.memo} onChange={this.onMemoChange}/>
            </div>
            {/*<div className={css(styles.item)}>*/}
              {/*<label className={`${css(styles.label)}`}>关联清真寺：</label>*/}
              {/*<Select size="large" className={css(styles.input)}*/}
                      {/*value={this.props.addCameraGroupParam.orgunitId ?*/}
                        {/*this.props.addCameraGroupParam.orgunitId : ''}*/}
                      {/*onChange={this.onOrgunitIdChange}>*/}
                {/*<Select.Option value={''}>--无关联清真寺--</Select.Option>*/}
                {/*{ this.props.ougunitList ? this.props.ougunitList.map((value, i) => <Select.Option key={i}*/}
                                                                                                   {/*value={value.id + ''}>{value.name}</Select.Option>) : null}*/}
              {/*</Select>*/}
            {/*</div>*/}

            <div className={css(styles.btnArea)}>
              <a className={`${css(styles.btn)} ${css(styles.actionBtn)}`} onClick={this.onSubmit}>保存</a>
              <a className={`${css(styles.btn)} ${css(styles.actionBtn)}`} onClick={this.onCancel}>取消</a>
            </div>

          </div>
        </div>
      </Modal>
    );
  }
}

function mapStateToProps({ group }) {
  return { ...group };
}
export default connect(mapStateToProps)(AddGroupPageView);

