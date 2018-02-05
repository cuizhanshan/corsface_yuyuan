/**
 * Created by Riky on 2017/4/13.
 */

import React from 'react';

import {StyleSheet, css} from 'aphrodite';
import {notification, Select, Input, InputNumber, Radio, Upload, Icon, Modal} from 'antd';
import title from '../../style/common/title.css';
import ModalCheckPersonView from '../system/ModalCheckPersonView';
import {SYSTEM_TARGET_PERSON_IMAGE_UPLOAD_SIZE, API_PREFIX} from '../../utils/constant';
const RadioGroup = Radio.Group;
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
  label: {
    height: 32,
    lineHeight: '32px',
    color: '#70c8ea',
    fontSize: 14,
    display: 'inline-block',
  },
  uploadLabel: {
    position: 'relative',
    width: 1200,
    height: 32,
    lineHeight: '32px',
    color: '#70c8ea',
    fontSize: 14,
    display: 'block',
    top: 50,
    left: 200
  },
  uploadText: {
    marginTop: 8,
    fontSize: 14,
    color: '#666'
  },
  upload: {
    position: 'relative',
    width: 1200,
    top: 80,
    left: 200
  },
  info: {
    position: 'relative',
    width: 1200,
    top: 140,
    left: 200,
    height: 400,
  },

  underline: {
    width: '100%',
    position: 'relative',
    height: 1,
    background: '#72C8EB'
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
    width: '100%',
    bottom: 100,
    height: 70,
    textAlign: 'center',
  },
  btn: {
    display: 'inline-block',
    color: '#fff',
    height: 40,
    lineHeight: '40px',
    background: '#109DEC',
    width: 100,
    fontSize: 16,
    fontFamily: ['SimHei', 'sans-serif'],
    position: 'relative',
    marginLeft: 40,
    borderRadius: 6
  }


});

class NewPoiView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      previewVisible: false,
      chooseVisible: false,
      previewImage: '',
      fileList: [],
      checkedIndex: '',
      uploadList: [],
      gender: '1'
    };
    this.openNotificationWithIcon = this.openNotificationWithIcon.bind(this);
    this.getArrayIndex = this.getArrayIndex.bind(this);
    this.formatterFile = this.formatterFile.bind(this);
    this.handleCancelChoose = this.handleCancelChoose.bind(this);
    this.handleOnOk = this.handleOnOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handlePreview = this.handlePreview.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.onNameChange = this.onNameChange.bind(this);
    this.onGenderChange = this.onGenderChange.bind(this);
    this.onIdentityCardChange = this.onIdentityCardChange.bind(this);
    this.onGroupChange = this.onGroupChange.bind(this);
    this.onThresholdChange = this.onThresholdChange.bind(this);
    this.onTagChange = this.onTagChange.bind(this);
    this.onMemoChange = this.onMemoChange.bind(this);

    this.onCancelNew = this.onCancelNew.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }


  /**
   * 在组件更新的时候读取错误信息，提示异常更新操作
   */
  componentDidUpdate() {
    if (this.props.person && this.props.person.errorMsg) {
      this.openNotificationWithIcon('error', this.props.person.errorMsg)
    }
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
  handleCancel = () => this.setState({previewVisible: false});
  handleCancelChoose = (value) => {
    let index = this.getArrayIndex(this.state.fileList, value);
    let fileList = this.state.fileList;
    if (index != '-1') {
      fileList.splice(parseInt(index), 1);
    }
    this.setState({chooseVisible: false, fileList: fileList, chooseFile: ''});
  };
  handleOnOk = (value) => {
    const {checkedFile, file} = value;
    let fileList = this.state.fileList;
    let uploadList = this.state.uploadList.concat(checkedFile);
    let index = this.getArrayIndex(fileList, file);
    if (index != '-1') {
      fileList[parseInt(index)] = file;
    }
    this.setState({chooseVisible: false, uploadList: uploadList, fileList, chooseFile: ''});
  };
  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };
  getArrayIndex = (fileList, file) => {
    let index = '-1';
    fileList.map((value, i) => {
      if (value.uid == file.uid) {
        index = i + '';
      }
    });
    return index;
  };
  formatterFile = (file) => {
    let chooseFile = {};
    chooseFile.uid = file.uid;
    chooseFile.status = file.status;
    chooseFile.name = file.name;
    chooseFile.response = file.response;
    let dst = file.response && file.response.result ? file.response.result.dst : [];
    chooseFile.thumbUrl = dst.length > 1 ? (file.thumbUrl ? file.thumbUrl : '') : (dst.length > 0 ? dst[0].url : '');
    return chooseFile;

  };
  handleChange = ({file, fileList}) => {
    let files = fileList.map((value) => this.formatterFile(value));
    let chooseImages = file.response && file.response.result ? file.response.result.dst : [];
    let chooseVisible = !!(chooseImages && chooseImages.length > 1) && (file.status != 'removed');
    let uploadList = this.state.uploadList ? this.state.uploadList : [];
    let list = uploadList;

    if (file.response) { //接收到服务器返回新的信息

      if (file.response.result.dst && file.response.result.dst.length > 0) {  //获取到人脸列表
        list = chooseVisible ? uploadList : uploadList.concat(this.formatterFile(file).response.result.dst[0]);
      } else {
        //上传的照片没有人脸,删除上传的照片

        let index = this.getArrayIndex(files, this.formatterFile(file));

        if (index != '-1') {
          files.splice(parseInt(index), 1);
        }
        this.openNotificationWithIcon('error', '上传的照片中未检测到人脸，请重新选择照片上传');
      }
    }
    this.setState({
      fileList: files,
      uploadList: list,
      chooseVisible: chooseVisible,
      chooseFile: this.formatterFile(file),
    });
  };

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


  onCancelNew = () => {
    this.props.onCancel();
  };

  onSubmit = () => {
    if (!(this.state.uploadList && this.state.uploadList.length > 0)) {
      this.openNotificationWithIcon('error', '请至少上传一张人脸照片');
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
    let faceCount = this.state.uploadList.length;
    let imgNames = this.state.uploadList.map((value, i) => {
      let key = "img_path_" + (i + 1);
      let path = value.path;
      return {key, path}
    });
    const payload = {
      faceCount,
      name: this.state.name,
      groupId: this.state.groupId,
      threshold: this.state.threshold,
      gender: this.state.gender,
      identityCard: this.state.identityCard ? this.state.identityCard : '',
      impTag: this.state.impTag ? this.state.impTag : '',
      memo: this.state.memo ? this.state.memo : ''
    };
    imgNames.map((value, i) => payload[`${value.key}`] = value.path);
    this.props.onNew(payload);
  };

  render() {
    const uploadButton = (
      <div>
        <Icon type="plus"/>
        <div className={css(styles.uploadText)}>上传</div>
      </div>
    );

    return (
      <div className={this.props.className?`${this.props.className} ${css(styles.container)}`:css(styles.container)}>
        <div className={title.container}>
          <span className={title.text}>新建目标人</span>
        </div>
        <div className={css(styles.content)}>
          <label className={`${css(styles.uploadLabel)}`}>上传照片：</label>

          <div className={css(styles.upload)}>
            <Upload
              action={`${API_PREFIX}` + '/poi/uploadFace.do'}
              name="image_1"
              accept="image/jpeg"
              listType="picture-card"
              fileList={this.state.fileList}
              onPreview={this.handlePreview}
              onChange={this.handleChange}
            >
              {this.state.fileList.length >= SYSTEM_TARGET_PERSON_IMAGE_UPLOAD_SIZE ? null : uploadButton}
            </Upload>

          </div>

          <div className={css(styles.info)}>
            <label className={css(styles.label)}>基本信息</label>
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
                  { this.props.groupList ? this.props.groupList.map((value, i) => <Select.Option key={i}
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
            <a className={css(styles.btn)} onClick={this.onSubmit}>创建</a>
            <a className={css(styles.btn)} onClick={this.onCancelNew}>取消</a>
          </div>


          <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
            <img alt="example" style={{width: '100%'}} src={this.state.previewImage}/>
          </Modal>

          <ModalCheckPersonView visible={this.state.chooseVisible} data={this.state.chooseFile}
                                onCancel={this.handleCancelChoose}
                                onSubmit={this.handleOnOk}/>

        </div>
      </div>

    )
  }
}

export default NewPoiView;


