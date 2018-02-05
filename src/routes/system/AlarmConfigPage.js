/**
 * Created by Riky on 2017/2/24.
 */
import React from 'react';
import { connect } from 'dva';
import { StyleSheet, css } from 'aphrodite';
import { Table, notification, Select } from 'antd';
import SystemLayout from './SystemLayout';
import PaginationView from './../../components/common/PaginationView';
import EditAlarmCfgModal from '../../components/system/EditAlarmCfgView';
import AddAlarmCfgModal from '../../components/system/AddAlarmCfgView';
import AlarmConfigPageImg from './AlarmConfigPageImg.css';
import ConfirmModal from './../../components/common/ConfirmModal';

const { Column, ColumnGroup } = Table;
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
    height: 64,
    lineHeight: '64px',
    color: '#fff'
  },
  input: {
    height: 34,
    lineHeight: '64px',
    fontSize: 14,
    width: 200,
    border: 1,
    borderRadius: 6,
    padding: '0 5px'

  },
  inputLabel: {
    height: 34,
    width: 200,
    border: '1px solid #3d515d',
    background: '#ffffff',
    fontSize: 14,
    borderRadius: 6,
    lineHeight: '32px',
    paddingLeft: 10,
    display: 'inline-block',
    position: 'relative',
    marginLeft: 5
  },
  fix: {
    marginLeft: 30
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
  add: {
    position: 'relative',
    height: 40,
    lineHeight: '40px',
    background: '#109DEC',
    float: 'right',
    width: 100,
    top: 12,
    marginRight: 40,
    borderRadius: 6,
    color: '#fff',
    textAlign: 'center'
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
  }

});
class AlarmConfigPage extends React.Component {
  constructor(props) {
    super(props);
    this.renderPagination = this.renderPagination.bind(this);
    this.openNotificationWithIcon = this.openNotificationWithIcon.bind(this);
    this.onGroupChange = this.onGroupChange.bind(this);
    this.pageTranslate = this.pageTranslate.bind(this);
    this.onCloseActionModal = this.onCloseActionModal.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onShowAddConfirmModal = this.onShowAddConfirmModal.bind(this);
    this.onShowEditConfirmModal = this.onShowEditConfirmModal.bind(this);
  }

  onGroupChange(value) {
    this.setState({
      groupId: value
    });
  }

  onCameraClick = value => {
    this.setState({
      srcId: value
    });
  };

  componentWillMount() {
    console.log('........');

    this.props.dispatch({
      type: 'alarmCfg/groupList'
    });
    this.props.dispatch({
      type: 'alarmCfg/alarmCfgList'
    });
    this.props.dispatch({
      type: 'alarmCfg/cameraList'
    });
  }

  /**
   * 在组件更新的时候读取错误信息，提示异常更新操作
   */
  componentDidUpdate() {
    if (this.props.alarmCfg && this.props.alarmCfg.errorMsg) {
      this.openNotificationWithIcon('error', this.props.alarmCfg.errorMsg);
      this.props.dispatch({
        type: 'alarmCfg/clearMsg'
      });
    }
  }
  componentWillUnmount() {
    this.props.dispatch({
      type: 'alarmCfg/clearMsg'
    });
  }
  /**
   * 显示删除确认弹窗
   */
  onShowDeleteConfirmModal = () => {
    if (this.state && this.state.selectedRows) {
      const ids = [];
      this.state.selectedRows.map(value => ids.push(value.id));
      this.props.dispatch({
        type: 'alarmCfg/showDeleteConfirmModal',
        payload: { ids }
      });
      this.setState({ action: 'delete' });
    } else {
      this.openNotificationWithIcon('error', '请选择需要删除的报警规则！');
    }
  };

  /**
   * 关闭确认弹窗
   */
  onCloseConfirmModal = () => {
    this.props.dispatch({
      type: 'alarmCfg/closeConfirmModal'
    });
  };

  /**
   * 关闭确认弹窗
   */
  onCloseActionModal = () => {
    this.props.dispatch({
      type: 'alarmCfg/closeActionModal'
    });
    this.setState({ action: '', record: {} });
  };

  onEdit = record => {
    this.props.dispatch({
      type: 'alarmCfg/showEditModal'
    });
    this.setState({ record, action: 'edit' });
  };
  onAdd = () => {
    this.props.dispatch({
      type: 'alarmCfg/showAddModal'
    });
    this.setState({ action: 'add' });
  };

  onShowAddConfirmModal = value => {
    this.props.dispatch({
      type: 'alarmCfg/showAddConfirmModal',
      payload: value
    });
  };

  onShowEditConfirmModal = value => {
    this.props.dispatch({
      type: 'alarmCfg/showEditConfirmModal',
      payload: value
    });
  };

  onAddSubmit = () => {
    this.props.dispatch({
      type: 'alarmCfg/addAlarmCfg'
    });
  };
  onEditSubmit = () => {
    this.props.dispatch({
      type: 'alarmCfg/modifyAlarmCfg'
    });
  };
  onDeleteSubmit = () => {
    this.props.dispatch({
      type: 'alarmCfg/deleteAlarmCfg'
    });
  };
  onSubmit = () => {
    if (this.state && this.state.action) {
      switch (this.state.action) {
        case 'add':
          this.onAddSubmit();
          break;
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
    if (this.props.alarmCfg && this.props.alarmCfg.alarmCfg && this.props.alarmCfg.alarmCfg.page) {
      return (
        <div className={css(styles.page)}>
          <a className={css(styles.delete)} onClick={this.onShowDeleteConfirmModal}>删除</a>
          <PaginationView
            className={css(styles.pagination)}
            page={this.props.alarmCfg.alarmCfg.page}
            pageTranslate={this.pageTranslate ? this.pageTranslate : null}
          />
        </div>
      );
    }
    return null;
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

  /**
   * 翻页
   * @param value
   */
  pageTranslate = value => {
    this.props.dispatch({
      type: 'alarmCfg/alarmCfgPageTranslate',
      payload: {
        pageNo: value.pageNo,
        pageSize: value.pageSize,
        srcId: this.state && this.state.srcId ? this.state.srcId : '',
        groupId: this.state && this.state.groupId ? this.state.groupId : ''
      }
    });
  };

  /**
   * 查询
   */
  onSearchBtn = () => {
    if (this.state) {
      this.props.dispatch({
        type: 'alarmCfg/alarmCfgPageTranslate',
        payload: {
          srcId: this.state && this.state.srcId ? this.state.srcId : '',
          groupId: this.state && this.state.groupId ? this.state.groupId : ''
        }
      });
    }
  };

  render() {
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({ selectedRows });
      },
      onSelect: (record, selected, selectedRows) => {
        this.setState({ selectedRows });
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        this.setState({ selectedRows });
      }
    };
    const tableProps = {
      pagination: false,
      scroll: {
        y: 692
      }
    };
    return (
      <SystemLayout location={this.props.location} dispatch={this.props.dispatch}>
        <div className={css(styles.container)}>
          <div className={css(styles.searchBar)}>

            <label className={css(styles.label)}>摄像头：</label>
            <Select className={css(styles.input)} size="large" allowClear onChange={this.onCameraClick}>
              { this.props.alarmCfg.cameraList ? this.props.alarmCfg.cameraList.map((value, i) => <Select.Option
                key={i}
                value={`${value.srcId}`}
              >{value.name}</Select.Option>) : null}
            </Select>

            <label className={`${css(styles.label)} ${css(styles.fix)}`}>分组：</label>
            <Select size="large" allowClear className={css(styles.input)} onChange={this.onGroupChange}>
              { this.props.alarmCfg.groupList ? this.props.alarmCfg.groupList.map((value, i) => <Select.Option
                key={i}
                value={`${value.id}`}
              >{value.name}</Select.Option>) : null}
            </Select>
            <a className={css(styles.btn)} onClick={this.onSearchBtn}>查询</a>
            {/* <a className={`${css(styles.btn)} ${css(styles.add)}`} onClick={this.onShowDeleteConfirmModal}>删除规则</a> */}
            <a className={css(styles.add)} onClick={this.onAdd}>添加规则</a>
          </div>
          <Table
            rowSelection={rowSelection} {...tableProps} rowKey={record => record.id} className={css(styles.table)}
            dataSource={this.props.alarmCfg && this.props.alarmCfg.alarmCfg ? this.props.alarmCfg.alarmCfg.list : null}
          >
            <ColumnGroup title="报警规则列表">
              <Column
                title="序号"
                dataIndex="id"
                key="id"
                width={125}
              />
              <Column
                title="名称"
                dataIndex="name"
                key="name"
                width={200}
              />

              <Column
                title="所在分组"
                dataIndex="groupName"
                key="groupName"
                width={200}
              />


              <Column
                title="摄像头"
                dataIndex="srcName"
                key="srcName"
                width={200}
              />

              <Column
                title="报警方式"
                dataIndex="alarmType"
                key="alarmType"
                width={200}
              />
              <Column
                title="创建时间"
                dataIndex="gmtCreate"
                key="gmtCreate"
                width={280}
              />

              <Column
                title="备注"
                dataIndex="memo"
                key="memo"
                width={150}
              />

              <Column
                title="编辑"
                key="edit"
                width={150}
                render={record => (<div className={AlarmConfigPageImg.edit} onClick={() => this.onEdit(record)}/>)}
              />
            </ColumnGroup>
          </Table>
          {this.renderPagination()}
        </div>

        <ConfirmModal
          modalVisible={this.props.alarmCfg.confirmModalVisible}
          title={this.props.alarmCfg.confirm ? this.props.alarmCfg.confirm.title : null}
          content={this.props.alarmCfg.confirm ? this.props.group.alarmCfg.msg : null}
          onClosedModal={this.onCloseConfirmModal}
          onSubmit={this.onSubmit}
        />

        <EditAlarmCfgModal
          modalVisible={this.props.alarmCfg.editModalVisible}
          key={this.state && this.state.record ? this.state.record.id : null}
          onClosedModal={this.onCloseActionModal}
          data={this.state && this.state.record ? this.state.record : null}
          groupList={this.props.alarmCfg && this.props.alarmCfg.groupList ? this.props.alarmCfg.groupList : null}
          onOk={this.onShowEditConfirmModal}
        />

        <AddAlarmCfgModal
          modalVisible={this.props.alarmCfg.addModalVisible} key={`${Math.random()}`}
          onClosedModal={this.onCloseActionModal}
          cameraList={this.props.alarmCfg && this.props.alarmCfg.cameraList ? this.props.alarmCfg.cameraList : null}
          groupList={this.props.alarmCfg && this.props.alarmCfg.groupList ? this.props.alarmCfg.groupList : null}
          onOk={this.onShowAddConfirmModal}
        />


      </SystemLayout>
    );
  }
}
function mapStateToProps({ alarmCfg }) {
  return { alarmCfg };
}
export default connect(mapStateToProps)(AlarmConfigPage);
