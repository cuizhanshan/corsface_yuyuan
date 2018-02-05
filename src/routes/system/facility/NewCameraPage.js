/**
 * Created by Riky on 2017/2/24.
 */

import React from 'react';
import {connect} from 'dva';
import SystemLayout from './../SystemLayout';
import {StyleSheet, css} from 'aphrodite/no-important';
import {notification, Input, Button, InputNumber, Select, Tooltip} from 'antd';
import {CAMERA_CONFIG} from '../../../utils/constant'
import {routerRedux} from 'dva/router'
const styles = StyleSheet.create({
  container: {
    width: 1615,
    // height: 860,
    position: 'relative',
    top: 20,
    border: '1px solid #3D515C',
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
  },
  header: {
    height: 36,
    width: '100%',
    background: '#304351',
    color: '#70c8ea',
    border: '1px solid #3d515d',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    marginBottom: 30
  },
  title: {
    width: '100%',
    textAlign: 'center',
    display: 'block',
    fontSize: 16,
    fontFamily: ['SimHei', 'sans-serif'],
    color: '#70c8ea',
    lineHeight: '36px'
  },
  subTitle: {
    fontSize: 14,
    height: 30,
    fontFamily: ['SimHei', 'sans-serif'],
    color: '#70c8ea',
    lineHeight: '30px',
    width: 1273,
    borderBottom: '1px solid #70c8ea',
    display: 'block'
  },
  section: {
    margin: '0 auto',
    width: 1273
  },
  info: {
    height: 160,
    textAlign: 'center'
  },

  item: {
    width: 290,
    height: 32,
    display: 'block',
    margin: '20px 8px 0 8px',
    float: 'left'
  },
  text: {
    height: 32,
    lineHeight: '32px',
    color: '#70c8ea',
    textAlign: 'right',
    display: 'inline-block',
    width: 80
  },
  input: {
    width: 200,
    marginLeft: 10
  },

  cjItem: {
    width: 612,
    float: 'left',
    height: 32,
    marginTop: 20,
  },
  cjInput: {
    width: 506
  },


  textArea: {
    display: 'inline-block',
    marginTop: 20,
    width: 983,
    height:280,
    marginLeft: 98,
    fontSize:16
  },
  parameter: {
    display: 'inline-block',
    marginLeft: 30,
    height: 46,
    width: 120,
    background: '#339A99',
    border: '1px solid #339A99',
    fontSize: 16
  },
  btn: {
    marginLeft: 25,
    marginRight: 25,
    background: '#109DEC',
    marginTop: 36
  }
});


class NewCameraPage extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      categoryId: '1',
      cjdSubid: '0',
      config: CAMERA_CONFIG
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onIpAddressChange = this.onIpAddressChange.bind(this);
    this.onCjdUuidChange = this.onCjdUuidChange.bind(this);
    this.onCjdSubidChange = this.onCjdSubidChange.bind(this);
    this.onInstallAddressChange = this.onInstallAddressChange.bind(this);
    this.onUnicodeChange = this.onUnicodeChange.bind(this);
    this.onCoordinateChange = this.onCoordinateChange.bind(this);
    this.onMemoChange = this.onMemoChange.bind(this);
    this.onModelTypeChange = this.onModelTypeChange.bind(this);
    this.onScreenNoChange = this.onScreenNoChange.bind(this);
    this.onPlayUrlChange = this.onPlayUrlChange.bind(this);
    this.onCjdUrlChange = this.onCjdUrlChange.bind(this);
    this.onDebugUrlChange = this.onDebugUrlChange.bind(this);
    this.onConfigChange = this.onConfigChange.bind(this);

    this.openNotificationWithIcon = this.openNotificationWithIcon.bind(this);
    this.cancelAdd = this.cancelAdd.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }




  /**
   * 在组件更新的时候读取错误信息，提示异常更新操作
   */
  componentDidUpdate() {
    if (this.props.camera && this.props.camera.errorMsg) {
      this.openNotificationWithIcon('error', this.props.camera.errorMsg)
      this.props.dispatch({
        type: 'camera/clearMsg'
      })
    }
  }

  openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: '错误提示',
      description: message
    });
  };

  componentDidMount(){
    this.props.dispatch({
      type: 'camera/devicesList'
    });
    this.props.dispatch({
      type: 'camera/ygGetAccess'
    });
  }

  componentWillUnmount(){
    this.props.dispatch({
      type: 'camera/clearMsg'
    })
  }
  /**
   * 错误提示
   * @param type
   * @param message
   */

  onNameChange = (value) => {
    this.setState({
      name: value.target.value
    });
  };
  onIpAddressChange = (value) => {
    this.setState({
      ipAddress: value.target.value
    });
  };
  onCjdUuidChange = (value) => {
    this.setState({
      cjdUuid: value
    });
  };
  onCjdSubidChange = (value) => {
    this.setState({
      cjdSubid: value + ''
    });
  };
  onUnicodeChange = (value) => {
    this.setState({
      uniCode: value.target.value
    });
  };
  onInstallAddressChange = (value) => {
    this.setState({
      installAddress: value.target.value
    });
  };
  onCoordinateChange = (value) => {
    this.setState({
      coordinate: value.target.value
    });
  };
  onMemoChange = (value) => {
    this.setState({
      memo: value.target.value
    });
  };
  onModelTypeChange = (value) => {
    this.setState({
      modelType: value
    });
  };
  onScreenNoChange = (value) => {
    this.setState({
      screenNo: value.target.value,
    });
  };
  onPlayUrlChange = (value) => {
    this.setState({
      playUrl: value.target.value
    });
  };
  onCjdUrlChange = (value) => {
    this.setState({
      cjdUrl: value.target.value
    });
  };
  onDebugUrlChange = (value) => {
    this.setState({
      debugUrl: value.target.value
    });
  };
  onConfigChange = (value) => {
    this.setState({
      config: value.target.value
    });
  };
    onYgAccessChange = (value) => {
        this.setState({
            accessId: value
        });
    }
    onYgioFlagChange = (value) => {
        this.setState({
            ioFlag: value
        });
    }
  cancelAdd = () => {
    this.props.dispatch(routerRedux.goBack())
  };
  onSubmit = () => {

    if (!this.state.name) {
      this.openNotificationWithIcon('error', '请填写摄像头名称！');
      return;
    }
    if (!this.state.cjdUuid) {
      this.openNotificationWithIcon('error', '请填写采集端编号！');
      return;
    }
    if (!this.state.cjdSubid) {
      this.openNotificationWithIcon('error', '请填写采集端端口！');
      return;
    }
    if (!this.state.coordinate) {
      this.openNotificationWithIcon('error', '请填写坐标！');
      return;
    }
    if (!this.state.modelType) {
      this.openNotificationWithIcon('error', '请选择摄像头类型！');
      return;
    }
    if (!this.state.playUrl) {
      this.openNotificationWithIcon('error', '请填写视频流播放地址！');
      return;
    }
    if (!this.state.cjdUrl) {
      this.openNotificationWithIcon('error', '请填写视频流采集地址！');
      return;
    }
    if (!this.state.debugUrl) {
      this.openNotificationWithIcon('error', '请填写视频流调试地址！');
      return;
    }
    if (!this.state.accessId) {
      this.openNotificationWithIcon('error', '请填写摄像头门区信息！');
      return;
    }
    if (!this.state.ioFlag) {
      this.openNotificationWithIcon('error', '请填写摄像头进出口！');
      return;
    }

    const payload = {
      name: this.state.name,
      categoryId: this.state.categoryId,
      ipAddress: this.state.ipAddress ? this.state.ipAddress : '',
      cjdUuid: this.state.cjdUuid,
      cjdSubid: this.state.cjdSubid,
      uniCode: this.state.uniCode ? this.state.uniCode : '',
      installAddress: this.state.installAddress ? this.state.installAddress : '',
      coordinate: this.state.coordinate ? this.state.coordinate : '',
      memo: this.state.memo ? this.state.memo : '',
      modelType: this.state.modelType,
      screenNo: this.state.screenNo ? this.state.screenNo : '',
      playUrl: this.state.playUrl,
      cjdUrl: this.state.cjdUrl,
      debugUrl: this.state.debugUrl,
      config: this.state.config,
        accessId: this.state.accessId,
        ioFlag: this.state.ioFlag
    };
    console.log(payload);
    this.props.dispatch({
      type: 'camera/addCamera',
      payload
    })
  };


  render() {
    return (
      <SystemLayout location={this.props.location} dispatch={this.props.dispatch}>

        <div className={css(styles.container)}>
          <div className={css(styles.header)}>
            <span className={css(styles.title)}>添加摄像头</span>
          </div>

          <div className={`${css(styles.section)}`}>
            <span className={css(styles.subTitle)}>基本信息</span>
            <div className={css(styles.info)}>

              <div className={css(styles.item)}>
                <label className={css(styles.text)}>名称*：</label>
                <Input size="large" className={css(styles.input)} onChange={this.onNameChange}/>
              </div>
              <div className={css(styles.item)}>
                <label className={css(styles.text)}>IP地址：</label>
                <Input size="large" className={css(styles.input)} onChange={this.onIpAddressChange}/>
              </div>
              {/*<div className={css(styles.item)}>
               <label className={css(styles.text)}>分组：</label>
               <Input size="large" className={css(styles.input)}/>
               </div>
               <div className={css(styles.item)}>
               <label className={css(styles.text)}>状态：</label>
               <Input size="large" className={css(styles.input)}/>
               </div>*/}
              <div className={css(styles.item)}>
                <label className={css(styles.text)}>采集端编号*：</label>
                {/*<Input size="large" className={css(styles.input)} onChange={this.onCjdUuidChange}/>*/}
                <Select className={css(styles.input)} size="large" allowClear onChange={this.onCjdUuidChange}>
                  { this.props.camera.devicesList ? this.props.camera.devicesList.map((value, i) => <Select.Option
                    key={i}
                    value={value.devicesId + ''}>{value.devicesName}</Select.Option>) : null}
                </Select>
              </div>
              <div className={css(styles.item)}>
                <label className={css(styles.text)}>采集端端口*：</label>
                <InputNumber size="large" defaultValue={0} min={0} max={100} className={css(styles.input)}
                             onChange={this.onCjdSubidChange}/>
              </div>


              <div className={css(styles.item)}>
                <label className={css(styles.text)}>统一编码：</label>
                <Input size="large" className={css(styles.input)} onChange={this.onUnicodeChange}/>
              </div>

              <div className={css(styles.item)}>
                <label className={css(styles.text)}>安装地址：</label>
                <Input size="large" className={css(styles.input)} onChange={this.onInstallAddressChange}/>
              </div>

              <div className={css(styles.item)}>
                <label className={css(styles.text)}>坐标*：</label>
                <Tooltip placement="topLeft" title="输入坐标经纬度，例如：11,22" arrowPointAtCenter>
                  <Input size="large" className={css(styles.input)} onChange={this.onCoordinateChange}/>
                </Tooltip>
              </div>

              <div className={css(styles.item)}>
                <label className={css(styles.text)}>备注：</label>
                <Input size="large" className={css(styles.input)} onChange={this.onMemoChange}/>
              </div>


            </div>
          </div>
          <div className={css(styles.section)}>
            <span className={css(styles.subTitle)}>摄像头信息</span>
            <div className={css(styles.info)}>
              <div className={css(styles.item)}>
                <label className={css(styles.text)}>类型*：</label>
                <Select size="large" className={css(styles.input)} onChange={this.onModelTypeChange}>
                  <Select.Option value={'0'}>其他</Select.Option>
                  <Select.Option value={'1'}>海康</Select.Option>
                  <Select.Option value={'2'}>大华</Select.Option>
                  <Select.Option value={'3'}>宇视</Select.Option>
                </Select>
              </div>
              <div className={css(styles.item)}>
                <label className={css(styles.text)}>投屏编号：</label>
                <Input size="large" className={css(styles.input)} onChange={this.onScreenNoChange}/>
              </div>
              {/* <div className={css(styles.item)}>
               <label className={css(styles.text)}>访问用户名：</label>
               <Input size="large" className={css(styles.input)}/>
               </div>
               <div className={css(styles.item)}>
               <label className={css(styles.text)}>访问密码：</label>
               <Input size="large" className={css(styles.input)}/>
               </div>*/}

              <div className={css(styles.cjItem)}>
                <label className={`${css(styles.text)} `}>播放地址*：</label>
                <Input size="large" className={`${css(styles.input)} ${css(styles.cjInput)}`}
                       onChange={this.onPlayUrlChange}/>
              </div>

              <div className={css(styles.cjItem)}>
                <label className={`${css(styles.text)} `}>采集地址*：</label>
                <Input size="large" className={`${css(styles.input)} ${css(styles.cjInput)}`}
                       onChange={this.onCjdUrlChange}/>
              </div>

              <div className={css(styles.cjItem)}>
                <label className={`${css(styles.text)} `}>调试地址*：</label>
                <Input size="large" className={`${css(styles.input)} ${css(styles.cjInput)}`}
                       onChange={this.onDebugUrlChange}/>
              </div>
              <div className={css(styles.item)}>
                <label className={css(styles.text)}>所属门*：</label>
                <Select size="large" className={css(styles.input)} onChange={this.onYgAccessChange}>
                  <Select.Option value={'0'}>院内</Select.Option>
                    { this.props.camera.ygAccess && this.props.camera.ygAccess.length > 0 ?
                            this.props.camera.ygAccess.map( value => ( <Select.Option value={value.id}>{value.name}</Select.Option> ) ) : null
                    }
                </Select>
              </div>
              <div className={css(styles.item)}>
                <label className={css(styles.text)}>进出口*：</label>
                <Select size="large" className={css(styles.input)} onChange={this.onYgioFlagChange}>
                  <Select.Option value={'0'}>院内</Select.Option>
                  <Select.Option value={'1'}>进口</Select.Option>
                  <Select.Option value={'2'}>出口</Select.Option>
                </Select>
              </div>

            </div>
          </div>
          <div className={css(styles.section)}>
            <span className={css(styles.subTitle)}>参数配置</span>

            <Input type="textarea" className={css(styles.textArea)} autosize={{minRows: 10, maxRows: 10}}
                   defaultValue={CAMERA_CONFIG} onChange={this.onConfigChange}/>
            {/* <Button type="primary" className={css(styles.parameter)}>参数编辑</Button>*/}

          </div>
          <div className={`${css(styles.section)} ${css(styles.info)}`}>

            <Button type="primary" className={`${css(styles.parameter)} ${css(styles.btn)}`}
                    onClick={this.onSubmit}>添加</Button>
            <Button type="primary" className={`${css(styles.parameter)} ${css(styles.btn)}`}
                    onClick={this.cancelAdd}>取消</Button>

          </div>

        </div>


      </SystemLayout>
    )
  }


}

function mapStateToProps({camera}) {
  return {camera}
}

export  default connect(mapStateToProps)(NewCameraPage);
