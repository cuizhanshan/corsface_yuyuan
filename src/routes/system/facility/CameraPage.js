/**
 * Created by Riky on 2017/2/24.
 */

import React from 'react';
import {connect} from 'dva';
import SystemLayout from '../SystemLayout';
import {StyleSheet, css} from 'aphrodite/no-important';
import {notification, Switch, Input, Table} from 'antd';
import {Link} from 'dva/router'
import title from '../../../style/common/title.css';
import PaginationView from '../../../components/common/PaginationView';
import ConfirmModal from '../../../components/common/ConfirmModal';
import EditCameraModal from '../../../components/system/EditCameraView';
import styles from './CameraPage.css'


const {Column} = Table;


class CameraPage extends React.Component {
  constructor(props) {
    super(props);
    this.pageTranslate = this.pageTranslate.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.fetchCamera = this.fetchCamera.bind(this);
    this.onSearchBtn = this.onSearchBtn.bind(this);
    this.renderPagination = this.renderPagination.bind(this);
    this.state = {
      visible: false,
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'camera/devicesList'
    });
    this.props.dispatch({
      type: 'camera/ygGetAccess'
    });
    this.fetchCamera({});
  }


  /**
   * 翻页
   * @param value
   */
  pageTranslate = (value) => {

    let query = {
      pageNo: value.pageNo,
      pageSize: value.pageSize,
      name: this.state && this.state.name ? this.state.name : '',
    };

    this.fetchCamera(query);
  };

  fetchCamera = (query) => {
    this.props.dispatch({
      type: 'camera/cameraList',
      payload: query
    });
  };


  /**
   * 在组件更新的时候读取错误信息，提示异常更新操作
   */
  componentDidUpdate() {
    console.log('componentDidUpdate')
    if (this.props.camera && this.props.camera.errorMsg) {
      this.openNotificationWithIcon('error', this.props.camera.errorMsg)
      this.props.dispatch({
        type: 'camera/clearMsg'
      })
    }
  }

  onNameChange = (e) => {
    this.setState({name: e.target.value})
  };


  onSearchBtn = () => {
    let query = {
      name: this.state && this.state.name ? this.state.name : '',
    };
    this.fetchCamera(query);
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

  onCloseConfirmModal = () => {
    this.props.dispatch({
      type: 'camera/closeConfirmModal'
    })
  };

  showDeleteConfirmModal = (value) => {
    this.props.dispatch({
      type: 'camera/showDeleteConfirmModal',
      payload: {srcId: value.srcId}
    });
    this.setState({action: 'delete'});

  };


  onDeleteSubmit = () => {
    this.props.dispatch({
      type: 'camera/deleteCamera'
    })
  };


  onEditSubmit = () => {
    this.props.dispatch({
      type: 'camera/modifyCamera'
    })
  };


  showEditModal = (value) => {

    this.setState({action: 'edit', editCamera: value, visible: true});

  };

  showEditConfirmModal = (value) => {
    this.props.dispatch({
      type: 'camera/showEditConfirmModal',
      payload: value
    });
    this.setState({action: 'edit', visible: false});
  };

  onClosedEditModal = () => {
    this.setState({action: '', editCamera: '', visible: false});
  };

  onSubmit = () => {
    if (this.state && this.state.action) {
      switch (this.state.action) {
        case 'delete':
          this.onDeleteSubmit();
          break;
        case 'edit':
          this.onEditSubmit();
          break;
      }
    }
  };

  renderPagination = () => {
    if (this.props.camera && this.props.camera.page) {
      return (
        <PaginationView className={styles.page}
                        page={this.props.camera.page}
                        pageTranslate={this.pageTranslate ? this.pageTranslate : null}/>
      )

    } else {
      return null;
    }
  };


  test = (name) => {
    let test2 = function (clicked) {
      console.log(name);
      console.log("clicked", clicked);
    };
    return test2;
  };

  changeStatus = (srcId) => {
    this.props.dispatch({
      type: 'camera/changeStatus',
      payload: srcId
    });
  };


  switchOnChange = (record) => {
    let that = this;
    let onChange = function (checked) {
      that.changeStatus(record.srcId);
    };

    return onChange;

  };

  render() {

    const tableProps = {
      pagination: false,
      scroll: {
        y: 710
      }
    };

    return (
      <SystemLayout location={this.props.location} dispatch={this.props.dispatch}>
        <div className={styles.container}>
          <div className={styles.searchBar}>

            <label className={styles.label}>摄像头名称：</label>
            <Input size="large" className={styles.input} onChange={this.onNameChange}/>

            <a className={styles.btn} onClick={this.onSearchBtn}>查询</a>
            <Link className={`${styles.add}`} to={`/system/facility/camera/new`}>新增摄像头</Link>
          </div>
          <div className={styles.content}>
            <div className={title.container}>
              <span className={title.text}>摄像头列表</span>
            </div>

            <Table {...tableProps} rowKey={record => record.id} className={styles.list}
                   dataSource={this.props.camera && this.props.camera.cameraList && this.props.camera.cameraList.list ? this.props.camera.cameraList.list : null}>

              <Column
                title="序号"
                dataIndex="id"
                width={120}
              />
              <Column
                title="名称"
                dataIndex="name"
                width={120}
              />
              <Column
                title="安装地址"
                dataIndex="installAddress"
                width={220}
              />
              <Column
                title="创建时间"
                dataIndex="gmtCreate"
                width={280}
              />
              <Column
                title="摄像头状态"
                width={220}
                render={(record) => <Switch onChange={this.switchOnChange(record)} checked={!!record.flag}
                                            checkedChildren={'开'}
                                            unCheckedChildren={'关'}/>}
              />

              <Column
                title="备注"
                dataIndex="memo"
                width={220}
              />

              <Column
                title="编辑"
                width={220}
                render={(record) => (<div>
                  <div className={styles.edit} onClick={() => this.showEditModal(record)}/>
                  <div className={styles.deleteBtn} onClick={() => this.showDeleteConfirmModal(record)}/>
                </div>)}

              />
            </Table>
          </div>


          {this.state.editCamera ?
            <EditCameraModal visible={this.state.visible} key={this.state.editCamera.id} data={this.state.editCamera}
                             onSubmit={this.showEditConfirmModal}
                             devicesList={this.props.camera.devicesList?this.props.camera.devicesList:null}
                             ygAccess={ this.props.camera.ygAccess}
                             onClosed={this.onClosedEditModal}/> : null}


          <ConfirmModal
                        modalVisible={this.props.camera.confirmModalVisible}
                        title={this.props.camera.confirm ? this.props.camera.confirm.title : null}
                        content={this.props.camera.confirm ? this.props.camera.confirm.msg : null}
                        onClosedModal={this.onCloseConfirmModal}
                        onSubmit={this.onSubmit}/>
          {this.renderPagination()}
        </div>

      </SystemLayout>
    )
  }
}

function mapStateToProps({camera}) {
  return {camera}
}

export  default connect(mapStateToProps)(CameraPage);






