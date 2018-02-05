/**
 * Created by Riky on 2017/4/7.
 */

import React from 'react';
import {connect} from 'dva';
import SystemLayout from '../../SystemLayout';
import {StyleSheet, css} from 'aphrodite';
import {notification, Select, Input, Radio, Modal, Icon, Upload, Button, Table, Popover} from 'antd';
import title from '../../../../style/common/title.css';
import PaginationFacetrackView from '../../../../components/common/PaginationFacetrackView';
import pathToRegexp from 'path-to-regexp';
import {SYSTEM_TARGET_PERSON_IMAGE_UPLOAD_SIZE, API_PREFIX} from '../../../../utils/constant';
import ActionImgView from '../../../../components/system/ActionImgView';
import ModalCheckPersonView from '../../../../components/system/ModalCheckPersonView';
import ImgWithBadgeView from '../../../../components/common/ImgWithBadgeView';
import ExpandImgView from '../../../../components/common/ExpandImgView';
import ImgView from '../../../../components/common/ImgView';
import ConfirmModal from '../../../../components/common/ConfirmModal';
const RadioGroup = Radio.Group;
const styles = StyleSheet.create({
  container: {
    width: 1604,
    position: 'relative',
    height: 862,
    background: '#151a20',
    marginTop: 14,
    border: '1px solid #3D515C',
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6
  },

  label: {
    height: 32,
    lineHeight: '32px',
    color: '#fff',
    fontSize: 14,
    display: 'inline-block',
    width: 80,
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
    marginLeft: 10,
  },
  radioGroup: {
    height: 32,
    marginLeft: 35,
  },
  radio: {
    fontSize: 16,
    marginTop: 4,
    color: '#fff'
  },
  btn: {
    height: 34,
    fontSize: 16,
    lineHeight: '32px',
    display: 'inline-block',
    background: '#339A99',
    color: '#fff',
    width: 78,
    textAlign: 'center',
    position: 'relative',
    left: 20,
    border: 1,
    borderRadius: 6
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
  info: {
    width: 1592,
    height: 463,
    margin: 5,
    background: '#33444E',
    position: 'relative',
    padding: 5
  },
  item: {
    width: 320,
    marginLeft: 50,
    marginTop: 15,
    display: 'inline-block'
  },

  uploadArea: {
    position: 'absolute',
    width: 1500,
    left: 50,
    top: 160,
    height: 160,
  },
  uploadText: {
    marginTop: 8,
    fontSize: 14,
    color: '#666'
  },
  uploadLabel: {
    position: 'relative',
    height: 32,
    lineHeight: '32px',
    color: '#fff',
    fontSize: 14,
    display: 'block',
    left: 15
  },
  upload: {
    position: 'relative',
    top: 30,
    height: 98,
    width: 1306,
    left: 94,
  },
  imgView: {
    marginRight: 8,
    display: 'inline-block',
    float: 'left'
  },

  btnArea: {
    position: 'absolute',
    bottom: 0,
    width: 1582,
    height: 100,
    textAlign: 'center',
  },
  saveBtn: {
    color: '#fff',
    background: '#109DEC',
    top: 33,
    width: 100
  },
  tip: {
    color: '#70c8ea',
    position: 'absolute',
    display: 'block',
    fontSize: 12,
    left: 5,
    bottom: 8
  },

  expand: {
    width: 1470
  },
  imgClass: {
    margin: '15px 15px',
  }

});

class EditPersonPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameChanged: false,
      genderChanged: false,
      alarmThresholdChanged: false,
      groupChanged: false,
      identityCardChanged: false,
      memoChanged: false,
      previewVisible: false,
      previewImage: '',
      personId: '',
      fileList: [],
      uploadList: [],
      chooseVisible: false,
      checkedIndex: '',
      showSaveBtn: false
    };

    this.openNotificationWithIcon = this.openNotificationWithIcon.bind(this);
    this.renderPagination = this.renderPagination.bind(this);
    this.renderDOM = this.renderDOM.bind(this);
    this.formatterGender = this.formatterGender.bind(this);
    this.setGroupValues = this.setGroupValues.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onGenderChange = this.onGenderChange.bind(this);
    this.onIdentityCardChange = this.onIdentityCardChange.bind(this);
    this.onGroupChange = this.onGroupChange.bind(this);
    this.onThresholdChange = this.onThresholdChange.bind(this);
    this.onMemoChange = this.onMemoChange.bind(this);

    this.handlePreview = this.handlePreview.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCancelChoose = this.handleCancelChoose.bind(this);
    this.getArrayIndex = this.getArrayIndex.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleOnOk = this.handleOnOk.bind(this);

    this.renderUploadImgs = this.renderUploadImgs.bind(this);
    this.formatterFile = this.formatterFile.bind(this);
    this.handleDeleteImg = this.handleDeleteImg.bind(this);
    this.showDeleteFaceTrackModal = this.showDeleteFaceTrackModal.bind(this);
    this.onCloseConfirmModal = this.onCloseConfirmModal.bind(this);
    this.showDeleteImgModal = this.showDeleteImgModal.bind(this);
    this.showModifyPoiModal = this.showModifyPoiModal.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
    this.onDeleteFaceTrackSubmit = this.onDeleteFaceTrackSubmit.bind(this);

  }

  formatterGender = (value) => {
    let gender = '-1';
    switch (value) {
      case '女':
        gender = '0';
        break;
      case '男':
        gender = '1';
        break;
      default:
        gender = '-1';
        break;
    }
    return gender;
  };
  componentWillMount() {

    const match = pathToRegexp('/system/aims/person/edit/:personId').exec(this.props.location.pathname);
    if (match && match[1] && match[1]) {
      this.props.dispatch({type: 'person/poi', payload: {personId: match[1]}});
      this.setState({personId: match[1]});
    }

    if (this.props.person && !this.props.person.groupList) {
      this.props.dispatch({
        type: 'person/groupList'
      });
    }
  }
  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
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
  getArrayIndex = (fileList, file) => {
    let index = '-1';
    fileList.map((value, i) => {
      if (value.uid == file.uid) {
        index = i + '';
      }
    });
    return index;
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
        this.openNotificationWithIcon('error', '上传的照片中位检测到人脸，请重新选择照片上传');
      }
    }
    this.setState({
      fileList: files,
      uploadList: list,
      chooseVisible: chooseVisible,
      chooseFile: this.formatterFile(file),
      showSaveBtn: true
    });
  };
  handleCancelChoose = (value) => {
    let index = this.getArrayIndex(this.state.fileList, value);
    let fileList = this.state.fileList;
    if (index != '-1') {
      fileList.splice(parseInt(index), 1);
    }
    this.setState({chooseVisible: false, fileList: fileList, chooseFile: ''});
  };
  handleCancel = () => this.setState({previewVisible: false});
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
  handleDeleteImg = () => {
    this.props.dispatch({
      type: 'person/deleteImg',
    });
  };
  componentWillUnmount() {
    this.props.dispatch({
      type: 'person/cleanDetail'
    });
  }
  setGroupValues = (value) => {
    let groups = [];
    value.map((value) => groups.push(value.id + ''));
    return groups;
  };
  onNameChange(value) {
    this.setState({
      name: value.target.value,
      nameChanged: true,
      showSaveBtn: true
    });
  }
  onGenderChange(value) {
    this.setState({
      gender: value.target.value,
      genderChanged: true,
      showSaveBtn: true
    });
  }
  onIdentityCardChange(value) {
    this.setState({
      identityCard: value.target.value,
      identityCardChanged: true,
      showSaveBtn: true
    });
  }
  onGroupChange(value) {

    this.setState({
      groupId: value,
      groupChanged: true,
      showSaveBtn: true
    });
  }
  onThresholdChange(value) {
    this.setState({
      threshold: value.target.value,
      alarmThresholdChanged: true,
      showSaveBtn: true
    });
  }
  onMemoChange(value) {
    this.setState({
      memo: value.target.value,
      memoChanged: true,
      showSaveBtn: true
    });
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
  /**
   * 翻页
   * @param value
   */
  pageTranslate = (value) => {
    let query = {
      pageNo: value.pageNo,
      pageSize: value.pageSize
    };
    this.props.dispatch({
      type: 'person/editPageTranslate',
      payload: query
    })
  };
  renderUploadImgs = () => {

    let result = [];
    let remainSize = SYSTEM_TARGET_PERSON_IMAGE_UPLOAD_SIZE;
    const uploadButton = (
      <div>
        <Icon type="plus"/>
        <div className={css(styles.uploadText)}>上传</div>
      </div>
    );

    if (this.props.person.detail.poi) {

      const {personId, uploadFiles, uploadImgs} = this.props.person.detail.poi;
      if (uploadImgs && uploadImgs.length > 0) {
        remainSize = SYSTEM_TARGET_PERSON_IMAGE_UPLOAD_SIZE - uploadImgs.length;
        result = uploadImgs.map((value, i) => {
          let file = {
            id: personId,
            name: uploadFiles[i],
            url: value
          };
          return <ActionImgView key={i} file={file} onDelete={this.showDeleteImgModal} onPreview={this.handlePreview}
                                className={css(styles.imgView)}/>
        });
      }
    }

    const uploadComponent = (
      <Upload
        key="upload"
        action={`${API_PREFIX}` + '/poi/uploadFace.do'}
        name="image_1"
        accept="image/jpeg"
        listType="picture-card"
        fileList={this.state.fileList}
        onPreview={this.handlePreview}
        onChange={this.handleChange}
      >
        {this.state.fileList.length >= remainSize ? null : uploadButton}
      </Upload>
    );
    result.push(uploadComponent);
    return result;
  };
  renderPagination = () => {
    if (this.props.person && this.props.person.detail && this.props.person.detail.page) {
      return (
        <div className={css(styles.page)}>
          <a className={css(styles.delete)} onClick={this.showDeleteFaceTrackModal}>删除</a>
          <PaginationFacetrackView className={css(styles.pagination)}
                          page={this.props.person.detail.page}
                          pageTranslate={this.pageTranslate ? this.pageTranslate : null}/>
        </div>
      )

    } else {
      return null;
    }
  };
  showDeleteImgModal = (value) => {
    this.props.dispatch({
      type: 'person/showDeleteImgConfirmModal',
      payload: value
    });

    this.setState({action: 'deleteImg'});
  };
  showModifyPoiModal = () => {
    if (this.state.nameChanged && !this.state.name) {
      this.openNotificationWithIcon('error', '姓名不能为空！');
      return;
    }
    if (this.state.groupChanged && !this.state.groupId) {
      this.openNotificationWithIcon('error', '请选择分组！');
      return;
    }
    if (this.state.alarmThresholdChanged && !this.state.threshold) {
      this.openNotificationWithIcon('error', '请填写识别率！');
      return;
    }
    let groupIds = [];
    this.props.person.detail.poi.groups.map((value) => groupIds.push(value.id));
    const payload = {
      personId:this.state.personId,
      name: this.state.nameChanged ? this.state.name : this.props.person.detail.poi.name,
      groupId: this.state.groupChanged ? this.state.groupId.join(',') : groupIds.join(','),
      threshold: this.state.alarmThresholdChanged ? this.state.threshold : this.props.person.detail.poi.alarmThreshold,
      gender: this.state.genderChanged ? this.state.gender : this.formatterGender(this.props.person.detail.poi.gender),
      identityCard: this.state.identityCardChanged ? this.state.identityCard : (this.props.person.detail.poi.identityCard?this.props.person.detail.poi.identityCard:''),
      memo: this.state.memoChanged ? this.state.memo : (this.props.person.detail.poi.memo?this.props.person.detail.poi.memo:''),
      faceCount:this.state.uploadList.length
    };
    if (this.state.uploadList && this.state.uploadList.length > 0) {
      let imgNames = this.state.uploadList.map((value, i) => {
        let key = "img_path_" + (i + 1);
        let path = value.path;
        return {key, path}
      });

      imgNames.map((value, i) => payload[`${value.key}`] = value.path);
    }
    this.props.dispatch({
      type: 'person/showModifyPoiConfirmModal',
      payload: payload
    });

    this.setState({action: 'edit'});
  };
  showDeleteFaceTrackModal = () => {
    if (this.state && this.state.selectedRows) {
      let ids = [];
      this.state.selectedRows.map((value) => ids.push(value.code));

      this.props.dispatch({
        type: 'person/showDeleteFaceTrackConfirmModal',
        payload: {ids:ids.join(','), personId: this.state.personId}
      });
      this.setState({action: 'deleteFaceTrack'});

    } else {
      this.openNotificationWithIcon('error', '请选择需要删除的人脸记录！');
    }
  };
  /**
   * 关闭确认弹窗
   */
  onCloseConfirmModal = () => {
    this.props.dispatch({
      type: 'person/closeConfirmModal'
    })
  };
  onDeleteFaceTrackSubmit = () => {
    this.props.dispatch({
      type: 'person/deleteFaceTrack'
    })
  };
  onEditSubmit = () => {
    this.props.dispatch({
      type: 'person/modifyPoi'
    })
  };
  onSubmit = () => {
    if (this.state && this.state.action) {
      switch (this.state.action) {
        case 'deleteImg':
          this.handleDeleteImg();
          break;
        case 'deleteFaceTrack':
          this.onDeleteFaceTrackSubmit();
          break;
        case 'edit':
          this.onEditSubmit();
          break;
      }
    }
  };
  renderDOM = () => {
    const tableProps = {
      pagination: false,
      expandedRowRender(record){
        return <ExpandImgView className={css(styles.expand)} imgClass={css(styles.imgClass)} size={16}
                              imgs={record.imgs}/>
      },
      scroll: {
        y: 270
      },
      columns: [
        {
          title: '序号',
          dataIndex: 'id',
          width: 200
        }, {
          title: '照片',
          dataIndex: 'imgs',
          width: 300,
          render: text => {
            return text && text.length > 0 ? <ImgWithBadgeView src={text[0]} count={text.length}/> : null
          }
        },
        {
          title: '摄像头',
          width: 300,
          dataIndex: 'srcName',
        }, {
          title: '时间',
          width: 300,
          render: (record) => {
            return <Popover placement="top" content={<ImgView src={record.snapImg}/>} trigger="click"
                            arrowPointAtCenter><Button
              className={record.popoverBtn}>{record.captureTime}</Button></Popover >
          }
        }
      ]
    };
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({selectedRows});
      },
      onSelect: (record, selected, selectedRows) => {
        this.setState({selectedRows});
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        this.setState({selectedRows});
      }
    };
    return (
      <div className={css(styles.container)}>
        <div className={title.container}>
          <span className={title.text}>编辑目标人</span>
        </div>
        <div className={css(styles.info)}>
          <div className={css(styles.item)}>
            <label className={css(styles.label)}>姓名(*)：</label>
            <Input size="large" className={css(styles.input)}
                   defaultValue={this.props.person.detail.poi.name}
                   onChange={this.onNameChange}/>
          </div>
          <div className={css(styles.item)}>
            <RadioGroup className={css(styles.radioGroup)}
                        defaultValue={this.formatterGender(this.props.person.detail.poi.gender)}
                        onChange={this.onGenderChange}>
              <Radio value={'1'} className={css(styles.radio)}>男</Radio>
              <Radio value={'0'} className={css(styles.radio)}>女</Radio>
            </RadioGroup>
          </div>
          <div className={css(styles.item)}>
            <label className={`${css(styles.label)}`}>识别率(*)：</label>
            <Input size="large" className={css(styles.input)}
                   defaultValue={this.props.person.detail.poi.alarmThreshold }
                   onChange={this.onThresholdChange}/>
          </div>
          <div className={css(styles.item)}>
            <label className={`${css(styles.label)}`}>分组(*)：</label>
            <Select multiple size="large" allowClear className={css(styles.input)}
                    defaultValue={this.setGroupValues(this.props.person.detail.poi.groups)}
                    onChange={this.onGroupChange}>
              { this.props.person.groupList ? this.props.person.groupList.map((value, i) => <Select.Option key={i}
                                                                                                           value={value.id + ''}>{value.name}</Select.Option>) : null}
            </Select>
          </div>
          <div className={css(styles.item)}>
            <label className={`${css(styles.label)}`}>身份证号：</label>
            <Input size="large" className={css(styles.input)}
                   defaultValue={this.props.person.detail.poi.identityCard ? this.props.person.detail.poi.identityCard : ''  }
                   onChange={this.onIdentityCardChange}/>
          </div>
          <div className={css(styles.item)}>
            <label className={`${css(styles.label)}`}>备注：</label>
            <Input size="large" className={css(styles.input)}
                   defaultValue={this.props.person.detail.poi.memo ? this.props.person.detail.poi.memo : ''  }
                   onChange={this.onMemoChange}/>
          </div>

          <div className={css(styles.uploadArea)}>
            <label className={`${css(styles.uploadLabel)}`}>上传照片：</label>

            <div className={css(styles.upload)}>
              {this.renderUploadImgs()}
            </div>
          </div>

          <div className={css(styles.btnArea)}>

            {this.state.showSaveBtn ? <a className={`${css(styles.btn)} ${css(styles.saveBtn)}`}
                                         onClick={this.showModifyPoiModal}>保存</a> : null}

            <span className={css(styles.tip)}>已关联的人脸记录:</span>

          </div>

        </div>

        <Table rowKey={record => record.id} rowSelection={rowSelection}
               dataSource={this.props.person.detail.faceList ? this.props.person.detail.faceList : null} {...tableProps}
               style={{textAlign: 'center'}}/>





        <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{width: '100%'}} src={this.state.previewImage}/>
        </Modal>


        <ConfirmModal modalVisible={this.props.person.confirmModalVisible}
                      title={this.props.person.confirm ? this.props.person.confirm.title : null}
                      content={this.props.person.confirm ? this.props.person.confirm.msg : null}
                      onClosedModal={this.onCloseConfirmModal}
                      onSubmit={this.onSubmit}/>


        <ModalCheckPersonView visible={this.state.chooseVisible} data={this.state.chooseFile}
                              onCancel={this.handleCancelChoose}
                              onSubmit={this.handleOnOk}/>
        {this.renderPagination()}
      </div>
    )
  };
  render() {
    return (
      <SystemLayout location={this.props.location} dispatch={this.props.dispatch}>
        {this.props.person.detail && this.props.person.detail.poi ? this.renderDOM() : null}
      </SystemLayout>
    )
  }
}
function mapStateToProps({person}) {
  return {person}
}

export  default connect(mapStateToProps)(EditPersonPage);






