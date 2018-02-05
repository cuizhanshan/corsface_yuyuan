/**
 * Created by Riky on 2017/2/24.
 */

import React from 'react';
import { connect } from 'dva';
import SystemLayout from '../SystemLayout';
import { StyleSheet, css } from 'aphrodite/no-important';
import { notification, Switch, Input, Table, Modal } from 'antd';
import { Link } from 'dva/router';
import title from '../../../style/common/title.css';
import PaginationView from '../../../components/common/PaginationFacetrackView';
import ConfirmModal from '../../../components/common/ConfirmModal';
import EditGroupPageView from '../../../components/system/EditGroupPageView';
import AddGroupPageView from '../../../components/system/AddGroupPageView';
import styles from './GroupPage.css';


const { Column } = Table;


class GroupPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    };
  }

  componentWillMount() {
    this.props.dispatch({
      type: 'group/groupManageList'
    });
  }
  onAddGroup = () => {
    this.props.dispatch({
      type: 'group/success',
      payload: {
        addGroupVisiable: true
      }
    })
  }
  onEditGroup = (record) => {
    console.log(record)
    this.props.dispatch({
      type: 'group/success',
      payload: {
        editGroupVisiable: true,
        modifeCameraGroupParams: record
      }
    })
  }
  showDeleteConfirmModal = (record) => {
    console.log(record)
    Modal.confirm({
      title: '确认操作',
      content: '您将执行操作，将会引起数据变化，是否继续执行？',
      okText: '删除',
      cancelText: '取消',
      onCancel: () => {
        console.log('取消删除')
        return false
      },
      onOk: () => this.onDeleteSubmit(record)

    })
  }
  onDeleteSubmit = (value) => {
    console.log(value.id)
    this.props.dispatch({
      type: 'group/deleteCameraGroup',
      payload: {
        id: value.id
      }
    })
  }
  onSearchNameChange = (e) => {
    const manageList = this.props.group.manageList
    this.props.dispatch({
      type: 'group/success',
      payload: {
        manageList: {
          ...manageList,
          name: e.target.value
        }
      }
    })
  }
  onSearchBtn = () => {
    this.props.dispatch({
      type: 'group/groupManageList'
    })
  }
   // 分页,半成品,需要的话你自己打开
  renderPagination = () => {
    if (this.props.group.groupManageList && this.props.group.groupManageList.page) {
      return (
        <PaginationView
          className={styles.page}
          page={this.props.group.groupManageList.page}
          pageTranslate={this.pageTranslate ? this.pageTranslate : null}
        />
      );
    }
    return null;
  };

  pageTranslate = value => {
    console.log(value);
    const manageList = this.props.group.manageList
    this.props.dispatch({
      type: 'group/success',
      payload: {
        manageList: {
          ...manageList,
          pageNo: value.pageNo,
          pageSize: value.pageSize,
        }
      }
    })
    this.props.dispatch({
      type: 'group/groupManageList'
    })
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

            <label className={styles.label}>分组名称：</label>
            <Input size="large" className={styles.input} value={this.props.group.manageList.name} onChange={this.onSearchNameChange}/>

            <a className={styles.btn} onClick={this.onSearchBtn}>查询</a>
            <Link className={`${styles.add}`} onClick={this.onAddGroup}>新增分组</Link>
          </div>
          <div className={styles.content}>
            <div className={title.container}>
              <span className={title.text}>分组列表</span>
            </div>

            <Table
              {...tableProps} rowKey={record => record.id} className={styles.list}
              dataSource={this.props.group && this.props.group.groupManageList && this.props.group.groupManageList.list ? this.props.group.groupManageList.list : null}
            >

              <Column
                title="序号"
                dataIndex="id"
                width={100}
              />
              <Column
                title="名称"
                dataIndex="name"
                width={200}
              />
              <Column
                title="备注"
                dataIndex="memo"
                width={200}
              />
              <Column
                title="创建日期"
                dataIndex="gmt_create"
                width={200}
              />
              <Column
                title="修改日期"
                dataIndex="gmt_modified"
                width={200}
              />
              <Column
                title="编辑"
                width={100}
                render={record => (<div>
                  <div className={styles.edit} onClick={() => this.onEditGroup(record)}/>
                  <div className={styles.deleteBtn} onClick={() => this.showDeleteConfirmModal(record)}/>
                </div>)}

              />
            </Table>
          </div>

          <AddGroupPageView modalVisible={this.props.addGroupVisiable}/>

          <EditGroupPageView modalVisible={this.props.editGroupVisiable}/>
          {this.renderPagination()}
        </div>

      </SystemLayout>
    );
  }
}

function mapStateToProps({ group }) {
  return { group };
}

export default connect(mapStateToProps)(GroupPage);

