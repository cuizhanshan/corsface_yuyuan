/**
 * Created by yunshitu on 2017/4/30.
 */
import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Modal, notification, Input, Button, InputNumber, Select, Tooltip } from 'antd';

const styles = StyleSheet.create({
  modal: {
    top: 48,
  },
  container: {
    width: 1615,
    // height: 860,
    position: 'relative',
    background: '#151a20',
    border: '1px solid #3D515C',
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
  },
  header: {
    height: 36,
    width: '100%',
    background: '#304351',
    color: '#70c8ea',
    border: '1px solid #3d515d',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    marginBottom: 30,
  },
  title: {
    width: '100%',
    textAlign: 'center',
    display: 'block',
    fontSize: 16,
    fontFamily: ['SimHei', 'sans-serif'],
    color: '#70c8ea',
    lineHeight: '36px',
  },
  subTitle: {
    fontSize: 14,
    height: 30,
    fontFamily: ['SimHei', 'sans-serif'],
    color: '#70c8ea',
    lineHeight: '30px',
    width: 1273,
    borderBottom: '1px solid #70c8ea',
    display: 'block',
  },
  section: {
    margin: '0 auto',
    width: 1273,
  },
  info: {
    height: 160,
    textAlign: 'center',
  },

  item: {
    width: 290,
    height: 32,
    display: 'block',
    margin: '20px 8px 0 8px',
    float: 'left',
  },
  text: {
    height: 32,
    lineHeight: '32px',
    color: '#70c8ea',
    textAlign: 'right',
    display: 'inline-block',
    width: 80,
  },
  input: {
    width: 200,
    marginLeft: 10,
  },

  cjItem: {
    width: 612,
    float: 'left',
    height: 32,
    marginTop: 20,
  },
  cjInput: {
    width: 506,
  },

  textArea: {
    display: 'inline-block',
    marginTop: 20,
    width: 983,
    height: 280,
    marginLeft: 98,
    fontSize: 16,
  },

  parameter: {
    display: 'inline-block',
    marginLeft: 30,
    height: 46,
    width: 120,
    background: '#339A99',
    border: '1px solid #339A99',
    fontSize: 16,
  },

  btn: {
    marginLeft: 25,
    marginRight: 25,
    background: '#109DEC',
    marginTop: 36,
  },

  btnArea: {
    height: 100,
    textAlign: 'center',
  },

  camera: {
    color: '#70C5EA',
    height: 32,
    lineHeight: '64px',
    fontSize: 16,
    width: 200,
    border: 1,
    borderRadius: 6,
    padding: '0 5px',
  },
});

class EditCameraView extends React.Component {
  constructor(props) {
    super(props);
  }

  onCancel = () => {
    this.setState({ name: '', memo: '' });
    this.props.onClosed();
  };

  /**
   * 错误提示
   * @param type
   * @param message
   */
  openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: '错误提示',
      description: message,
    });
  };
  onNameChange = (value) => {
    this.setState({
      nameChange: true,
      name: value.target.value,
    });
  };
  onIpAddressChange = (value) => {
    this.setState({
      ipAddressChange: true,
      ipAddress: value.target.value,
    });
  };
  onCjdSubidChange = (value) => {
    this.setState({
      cjdSubidChange: true,
      cjdSubid: `${value}`,
    });
  };
  onUnicodeChange = (value) => {
    this.setState({
      uniCodeChange: true,
      uniCode: value.target.value,
    });
  };
  onInstallAddressChange = (value) => {
    this.setState({
      installAddressChange: true,
      installAddress: value.target.value,
    });
  };
  onCoordinateChange = (value) => {
    this.setState({
      coordinateChange: true,
      coordinate: value.target.value,
    });
  };
  onMemoChange = (value) => {
    this.setState({
      memoChange: true,
      memo: value.target.value,
    });
  };
  onModelTypeChange = (value) => {
    this.setState({
      modelTypeChange: true,
      modelType: value,
    });
  };
  onScreenNoChange = (value) => {
    this.setState({
      screenNoChang: true,
      screenNo: value.target.value,
    });
  };
  onPlayUrlChange = (value) => {
    this.setState({
      playUrlChange: true,
      playUrl: value.target.value,
    });
  };
  onCjdUrlChange = (value) => {
    this.setState({
      cjdUrlChange: true,
      cjdUrl: value.target.value,
    });
  };
  onDebugUrlChange = (value) => {
    this.setState({
      debugUrlChange: true,
      debugUrl: value.target.value,
    });
  };
  onConfigChange = (value) => {
    this.setState({
      configChange: true,
      config: value.target.value,
    });
  };

    onYgioFlagChange = ( value ) => {
      console.log( value )
        this.setState({
            ygIoFlagChange: true,
            ioFlag: value,
        });
    };
    onYgAccessChange = ( value ) => {
        this.setState({
            ygAccessChange: true,
            accessId: value,
        });
    };
  cancelAdd = () => {
    this.props.dispatch(routerRedux.goBack());
  };
  onSubmit = () => {
    if (this.state.nameChange && !this.state.name) {
      this.openNotificationWithIcon('error', '请填写摄像头名称！');
      return;
    }

    if (this.state.cjdSubidChange && !this.state.cjdSubid) {
      this.openNotificationWithIcon('error', '请填写采集端端口！');
      return;
    }
    if (this.state.coordinateChange && !this.state.coordinate) {
      this.openNotificationWithIcon('error', '请填写坐标！');
      return;
    }
    /* if (!this.state.modelType) {
     this.openNotificationWithIcon('error', '请选择摄像头类型！');
     return;
     }*/
    if (this.state.playUrlChange && !this.state.playUrl) {
      this.openNotificationWithIcon('error', '请填写视频流播放地址！');
      return;
    }
    if (this.state.cjdUrlChange && !this.state.cjdUrl) {
      this.openNotificationWithIcon('error', '请填写视频流采集地址！');
      return;
    }
    if (this.state.debugUrlChange && !this.state.debugUrl) {
      this.openNotificationWithIcon('error', '请填写视频流调试地址！');
      return;
    }
    if (this.state.ygIoFlagChange && !this.state.ioFlag) {
      this.openNotificationWithIcon('error', '请填写摄像头进出口！');
      return;
    }if (this.state.ygAccessChange && !this.state.accessId) {
      this.openNotificationWithIcon('error', '请填写摄像头门区信息！');
      return;
    }

    const payload = {
      id: this.props.data.id,
      srcId: this.props.data.srcId,
      name: this.state.nameChange ? this.state.name : this.props.data.name,
      categoryId: this.props.data.categoryId,
      ipAddress: this.state.ipAddressChange ? this.state.ipAddress : (this.props.data.ipAddress ? this.props.data.ipAddress : ''),
      cjdUuid: this.props.data.cjdUuid,
      cjdSubid: this.state.cjdSubidChange ? this.state.cjdSubid : this.props.data.cjdSubid,
      uniCode: this.state.uniCodeChange ? this.state.uniCode : (this.props.data.uniCode ? this.props.data.uniCode : ''),
      installAddress: this.state.installAddressChange ? this.state.installAddress : (this.props.data.installAddress ? this.props.data.installAddress : ''),
      coordinate: this.state.coordinateChange ? this.state.coordinate : this.props.data.coordinate,
      memo: this.state.memoChange ? this.state.memo : (this.props.data.memo ? this.props.data.memo : ''),
      modelType: this.state.modelTypeChange ? this.state.modelType : this.props.data.modelType,
      screenNo: this.state.screenNoChang ? this.state.screenNo : (this.props.data.screenNo ? this.props.data.screenNo : ''),
      playUrl: this.state.playUrlChange ? this.state.playUrl : this.props.data.playUrl,
      cjdUrl: this.state.cjdUrlChange ? this.state.cjdUrl : this.props.data.cjdUrl,
      debugUrl: this.state.debugUrlChange ? this.state.debugUrl : this.props.data.debugUrl,
      config: this.state.configChange ? this.state.config : this.props.data.config,
        accessId: this.state.ygAccessChange ? this.state.accessId : this.props.data.accessId,
        ioFlag: this.state.ygIoFlagChange ? this.state.ioFlag : this.props.data.ioFlag
    };

    this.props.onSubmit(payload);
  };


  render() {
    return (
      <Modal
        visible={this.props.visible}
        title=""
        footer=""
        onOk={this.onCancel}
        onCancel={this.onCancel}
        closable={false}
        width={1615}
        bodyStyle={{ padding: 0, overflow: 'auto' }}
        className={css(styles.modal)}
      >

        <div className={css(styles.container)}>
          <div className={css(styles.header)}>
            <span className={css(styles.title)}>编辑摄像头</span>
          </div>

          <div className={`${css(styles.section)}`}>
            <span className={css(styles.subTitle)}>基本信息</span>
            <div className={css(styles.info)}>

              <div className={css(styles.item)}>
                <label className={css(styles.text)}>名称*：</label>
                <Input
                  size="large" className={css(styles.input)} defaultValue={this.props.data.name}
                  onChange={this.onNameChange}
                />
              </div>
              <div className={css(styles.item)}>
                <label className={css(styles.text)}>IP地址：</label>
                <Input
                  size="large" className={css(styles.input)} defaultValue={this.props.data.ipAddress}
                  onChange={this.onIpAddressChange}
                />
              </div>
              {/* <div className={css(styles.item)}>
               <label className={css(styles.text)}>分组：</label>
               <Input size="large" className={css(styles.input)}/>
               </div>
               <div className={css(styles.item)}>
               <label className={css(styles.text)}>状态：</label>
               <Input size="large" className={css(styles.input)}/>
               </div>*/}


              <div className={css(styles.item)}>
                <label className={css(styles.text)}>采集端编号：</label>
                {/* <label >{this.props.data.cjdUuid}</label>*/}
                <Select
                  className={css(styles.input)} disabled
                  defaultValue={this.props.data.cjdUuid ? this.props.data.cjdUuid : ''} size="large"
                >
                  { this.props.devicesList ? this.props.devicesList.map((value, i) => <Select.Option
                    key={i}
                    value={`${value.devicesId}`}
                  >{value.devicesName}</Select.Option>) : null}
                </Select>
              </div>


              <div className={css(styles.item)}>
                <label className={css(styles.text)}>采集端端口*：</label>
                <InputNumber
                  size="large" defaultValue={this.props.data.cjdSubid} min={0} max={100}
                  className={css(styles.input)}
                  onChange={this.onCjdSubidChange}
                />
              </div>


              <div className={css(styles.item)}>
                <label className={css(styles.text)}>统一编码：</label>
                <Input
                  size="large" className={css(styles.input)} defaultValue={this.props.data.uniCode}
                  onChange={this.onUnicodeChange}
                />
              </div>

              <div className={css(styles.item)}>
                <label className={css(styles.text)}>安装地址：</label>
                <Input
                  size="large" className={css(styles.input)} defaultValue={this.props.data.installAddress}
                  onChange={this.onInstallAddressChange}
                />
              </div>

              <div className={css(styles.item)}>
                <label className={css(styles.text)}>坐标*：</label>
                <Tooltip placement="topLeft" title="输入坐标经纬度，例如：11,22" arrowPointAtCenter>
                  <Input
                    size="large" className={css(styles.input)} defaultValue={this.props.data.coordinate}
                    onChange={this.onCoordinateChange}
                  />
                </Tooltip>
              </div>

              <div className={css(styles.item)}>
                <label className={css(styles.text)}>备注：</label>
                <Input
                  size="large" className={css(styles.input)} defaultValue={this.props.data.memo}
                  onChange={this.onMemoChange}
                />
              </div>


            </div>
          </div>
          <div className={css(styles.section)}>
            <span className={css(styles.subTitle)}>摄像头信息</span>
            <div className={css(styles.info)}>
              <div className={css(styles.item)}>
                <label className={css(styles.text)}>类型*：</label>
                <Select
                  size="large" className={css(styles.input)} defaultValue={[`${this.props.data.modelType}`]}
                  onChange={this.onModelTypeChange}
                >
                  <Select.Option value={'0'}>其他</Select.Option>
                  <Select.Option value={'1'}>海康</Select.Option>
                  <Select.Option value={'2'}>大华</Select.Option>
                  <Select.Option value={'3'}>宇视</Select.Option>
                </Select>
              </div>
              <div className={css(styles.item)}>
                <label className={css(styles.text)}>投屏编号：</label>
                <Input
                  size="large" className={css(styles.input)} defaultValue={this.props.data.screenNo}
                  onChange={this.onScreenNoChange}
                />
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
                <Input
                  size="large" className={`${css(styles.input)} ${css(styles.cjInput)}`}
                  defaultValue={this.props.data.playUrl}
                  onChange={this.onPlayUrlChange}
                />
              </div>

              <div className={css(styles.cjItem)}>
                <label className={`${css(styles.text)} `}>采集地址*：</label>
                <Input
                  size="large" className={`${css(styles.input)} ${css(styles.cjInput)}`}
                  defaultValue={this.props.data.cjdUrl}
                  onChange={this.onCjdUrlChange}
                />
              </div>

              <div className={css(styles.cjItem)}>
                <label className={`${css(styles.text)} `}>调试地址*：</label>
                <Input
                  size="large" className={`${css(styles.input)} ${css(styles.cjInput)}`}
                  defaultValue={this.props.data.debugUrl}
                  onChange={this.onDebugUrlChange}
                />
              </div>
              <div className={css(styles.item)}>
                <label className={css(styles.text)}>所属门*：</label>
                <Select
                        size="large" className={css(styles.input)} defaultValue={[this.props.data.accessId]}
                        onChange={this.onYgAccessChange}
                >
                  <Select.Option value={'0'}>院内</Select.Option>
                    { this.props.ygAccess && this.props.ygAccess.length > 0 ?
                      this.props.ygAccess.map( value => ( <Select.Option value={value.id}>{ value.name }</Select.Option> ) ) : null
                    }
                </Select>
              </div>
              <div className={css(styles.item)}>
                <label className={css(styles.text)}>进出口*：</label>
                <Select
                        size="large" className={css(styles.input)} defaultValue={[`${this.props.data.ioFlag}`]}
                        onChange={this.onYgioFlagChange}
                >
                  <Select.Option value={'0'}>院内</Select.Option>
                <Select.Option value={'1'}>进口</Select.Option>
                <Select.Option value={'2'}>出口</Select.Option>
                </Select>
              </div>

            </div>
          </div>
          <div className={css(styles.section)}>
            <span className={css(styles.subTitle)}>参数配置</span>

            <Input
              type="textarea" className={css(styles.textArea)} autosize={{ minRows: 10, maxRows: 10 }}
              defaultValue={this.props.data.config}
              onChange={this.onConfigChange}
            />
            {/* <Button type="primary" className={css(styles.parameter)}>参数编辑</Button>*/}

          </div>
          <div className={`${css(styles.section)} ${css(styles.btnArea)}`}>

            <Button
              type="primary" className={`${css(styles.parameter)} ${css(styles.btn)}`}
              onClick={this.onSubmit}
            >保存</Button>
            <Button
              type="primary" className={`${css(styles.parameter)} ${css(styles.btn)}`}
              onClick={this.onCancel}
            >取消</Button>

          </div>

        </div>


      </Modal>
    );
  }

}
export default EditCameraView;
