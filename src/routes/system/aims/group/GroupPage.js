/**
 * Created by Riky on 2017/2/24.
 */

import React from 'react';
import {connect} from 'dva';
import SystemLayout from '../../SystemLayout';
import {StyleSheet, css} from 'aphrodite';
import {Table, Modal, notification, Input} from 'antd';
const {Column, ColumnGroup} = Table;
import PaginationView from '../../../../components/common/PaginationView';
import title from '../../../../style/common/title.css';
import {routerRedux} from 'dva/router';
import ConfirmModal from '../../../../components/common/ConfirmModal';
import GroupPageImg from './GroupPageImg.css'

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
    fontFamily: ['SimHei', 'sans-serif'],
  },
  label: {
    height: 64,
    lineHeight: '64px',
    color: '#fff'
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
    height: 421,
    width: '100%'
  },
  info: {
    width: 572,
    height: 322,
    background: '#151a20',
    marginLeft: 14,
    position: 'relative',
    paddingTop: 60
  },
  item: {
    margin: '30px auto 0',
    width: 300,
    height: 40,
    fontSize: 14,
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
    top: 30,
    marginRight: 50
  },
});
class GroupPage extends React.Component {
  /**
   * 构造器，绑定自定义方法
   * @param props
   */
  constructor(props) {
    super(props);
    this.onSearchBtn = this.onSearchBtn.bind(this);
    this.onKeyUpEvent = this.onKeyUpEvent.bind(this);
    this.onClosedModal = this.onClosedModal.bind(this);
    this.onShowAddModal = this.onShowAddModal.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onOk = this.onOk.bind(this);
    this.openNotificationWithIcon = this.openNotificationWithIcon.bind(this);
    this.onDeleteSubmit = this.onDeleteSubmit.bind(this);
    this.onAddSubmit = this.onAddSubmit.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
    this.onShowDeleteConfirmModal = this.onShowDeleteConfirmModal.bind(this);
    this.onShowMembers = this.onShowMembers.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.renderPagination = this.renderPagination.bind(this);
    this.pageTranslate = this.pageTranslate.bind(this);
    this.state={
      addKey:parseInt(Math.random()*100)
    }
  }

  /**
   * 页面加载之前请求分组列表
   */
  componentWillMount() {
    this.props.dispatch({
      type: 'group/groupList'
    })
  }

  /**
   * 在组件更新的时候读取错误信息，提示异常更新操作
   */
  componentDidUpdate() {
    if (this.props.group && this.props.group.errorMsg) {
      this.openNotificationWithIcon('error', this.props.group.errorMsg)
      this.props.dispatch({
        type: 'group/clearMsg'
      })
    }
  }

  componentWillUnmount(){
    this.props.dispatch({
      type: 'group/clearMsg'
    })
  }

  onEdit(record) {
    this.props.dispatch({
      type: 'group/triggerGroupModal',
    });
    this.setState({title: '编辑分组', record, action: 'edit', name: record.name, memo: record.memo});
  }

  /**
   * 查看分组内的组员详情
   * @param record
   */
  onShowMembers(record) {
    this.props.dispatch(routerRedux.push(`/system/aims/group/${record.id}`));
  }

  /**
   * 绑定参数onChange
   * @param e
   */
  onQueryChange = (e) => {
    this.setState({
      query: {
        name: e.target.value
      }
    })
  };
  onNameInputChange = (e) => {
    this.setState({
      name: e.target.value
    })
  };
  onMemoInputChange = (e) => {
    this.setState({
      memo: e.target.value
    })
  };

  /**
   * 查询
   */
  onSearchBtn = () => {
    if (this.state && this.state.query) {
      this.props.dispatch({
        type: 'group/groupPageTranslate',
        payload: {
          name: this.state.query.name
        }
      })
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

  /**
   * 绑定回车事件
   * @param e
   */
  onKeyUpEvent(e) {
    if (e.keyCode == '10' || e.keyCode == '13') {
      this.onSearchBtn();
    }
  }

  /**
   * 翻页
   * @param value
   */
  pageTranslate = (value) => {
    this.props.dispatch({
      type: 'group/groupPageTranslate',
      payload: {
        pageNo: value.pageNo,
        pageSize: value.pageSize,
        name: this.state && this.state.query && this.state.query.name ? this.state.query.name : ''
      }
    })
  };

  /**
   * 关闭操作弹窗
   */
  onClosedModal = () => {
    this.props.dispatch({
      type: 'group/triggerGroupModal',
    });
    this.setState({title: '', record: {}, action: '', name: '', memo: ''});
  };
  onShowAddModal = () => {
    this.props.dispatch({
      type: 'group/triggerGroupModal',
    });
    this.setState({title: '添加分组', action: 'add',addKey:parseInt(Math.random()*100)});
  };
  onOk = () => {
    if (this.state && this.state.action) {
      if (!this.state.name) {
        this.openNotificationWithIcon('error', '请填写分组名称！');
        return;
      }
      switch (this.state.action) {
        case 'add':
          this.onShowAddConfirmModal();
          break;
        case 'edit':
          this.onShowEditConfirmModal();
          break;
      }

    }
  };




  onShowAddConfirmModal = () => {
    this.props.dispatch({
      type: `group/showAddConfirmModal`,
      payload: {
        name: this.state.name,
        memo: this.state.memo ? this.state.memo : ''
      }
    })

  };
  onShowEditConfirmModal = () => {

    this.props.dispatch({
      type: `group/showEditConfirmModal`,
      payload: {
        id: this.state.record.id,
        name: this.state.name,
        memo: this.state.memo ? this.state.memo : this.state.record.memo
      }
    })
  };
  onAddSubmit = () => {
    this.props.dispatch({
      type: `group/addGroup`
    })
  };
  onEditSubmit = () => {
    this.props.dispatch({
      type: `group/modifyGroup`
    })
  };
  onDeleteSubmit = () => {
    this.props.dispatch({
      type: `group/deleteGroup`
    })
  };
  /**
   * 显示删除确认弹窗
   */
  onShowDeleteConfirmModal = () => {
    if (this.state && this.state.selectedRows) {
      const defaultGroup = this.state.selectedRows.filter((value) => value.default);
      if (defaultGroup && defaultGroup.length > 0) {
        this.openNotificationWithIcon('error', '选择的分组中不应该包含默认分组！');
      } else {
        let ids = [];
        this.state.selectedRows.map((value) => ids.push(value.id));

        this.props.dispatch({
          type: 'group/showDeleteConfirmModal',
          payload: {ids}
        });
        this.setState({action: 'delete'});
      }
    } else {
      this.openNotificationWithIcon('error', '请选择需要删除的分组！');
    }
  };
  /**
   * 关闭确认弹窗
   */
  onCloseConfirmModal = () => {
    this.props.dispatch({
      type: 'group/closeConfirmModal'
    })
    this.setState({title: '', record: {}, action: '', name: '', memo: ''});
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
    if (this.props.group && this.props.group.group && this.props.group.group.page) {
      return (
        <div className={css(styles.page)}>
          <a className={css(styles.delete)} onClick={this.onShowDeleteConfirmModal}>删除</a>
          <PaginationView className={css(styles.pagination)}
                          page={this.props.group.group.page}
                          pageTranslate={this.pageTranslate ? this.pageTranslate : null}/>
        </div>
      )

    } else {
      return null;
    }
  };


  render() {
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
    const tableProps = {
      pagination: false,
      scroll: {
        y: 683
      }
    };

    return (
      <SystemLayout location={this.props.location} dispatch={this.props.dispatch}>
        <div className={css(styles.container)}>
          <div className={css(styles.searchBar)}>
            <label className={css(styles.label)}>分组：</label>
            <Input type="text" className={css(styles.input)} onChange={this.onQueryChange} onKeyUp={this.onKeyUpEvent}/>
            <a className={css(styles.btn)} onClick={this.onSearchBtn}>查询</a>
            {/*<a className={`${css(styles.btn)} ${css(styles.addGroup)}`} onClick={this.onShowDeleteConfirmModal}>删除分组</a>*/}
            <a className={`${css(styles.btn)} ${css(styles.addGroup)}`} onClick={this.onShowAddModal}>添加分组</a>
          </div>
          <Table rowSelection={rowSelection} {...tableProps} rowKey={record => record.id} className={css(styles.table)}
                 dataSource={this.props.group && this.props.group.group ? this.props.group.group.list : null}>
            <ColumnGroup title='分组列表'>
              <Column
                title="序号"
                dataIndex="id"
                key="id"
                width={125}
              />
              <Column
                title="组名"
                dataIndex="name"
                key="name"
                width={230}
              />

              <Column
                title="是否默认分组"
                dataIndex="default"
                key="default"
                render={(text) => text ? '是' : '否'}
                width={230}
              />

              <Column
                title="创建时间"
                dataIndex="gmtCreate"
                key="gmtCreate"
                width={300}
              />

              <Column
                title="备注"
                dataIndex="memo"
                key="memo"
                width={200}
              />

              <Column
                title="编辑"
                key="edit"
                width={220}
                render={(record) => (
                  <div className={GroupPageImg.edit} onClick={() => this.onEdit(record)}/>
                )}
              />

              <Column
                title="查看组员"
                key="show"
                width={220}
                render={(record) => (
                  <div className={GroupPageImg.show} onClick={() => this.onShowMembers(record)}/>
                )}
              />

            </ColumnGroup>
          </Table>

          {/*{this.props.group && this.props.group.group && this.props.group.group.page ?
           <PaginationView className={css(styles.pagination)}
           page={this.props.group.group.page} pageTranslate={this.pageTranslate}/> : null}*/}
          {this.renderPagination()}
        </div>

        <Modal visible={this.props.group.modalVisible}
               key={this.state && this.state.action && this.state.action =='edit'? this.state.record.id:this.state.addKey }
               title=''
               footer=''
               closable={false}
               onOk={this.onClosedModal}
               onCancel={this.onClosedModal}
               width={600}
               bodyStyle={{padding: 0, height: 457}}
               className={css(styles.modal)}>
          <div className={title.container}>
            <span className={title.text}>{this.state && this.state.title ? this.state.title : null}</span>
          </div>
          <div className={css(styles.content)}>
            <div className={css(styles.info)}>
              <div className={css(styles.item)}>
                <label className={css(styles.modalLabel)}>名称：</label>
                <Input type="text" className={css(styles.input)}
                       onChange={this.onNameInputChange}
                       defaultValue={this.state && this.state.record && this.state.record.name ? this.state.record.name : ''}/>
              </div>
              <div className={css(styles.item)}>
                <label className={css(styles.modalLabel)}>备注：</label>
                <Input type="text" className={css(styles.input)}
                       onChange={this.onMemoInputChange}
                       defaultValue={this.state && this.state.record && this.state.record.memo ? this.state.record.memo : ''}/>
              </div>
            </div>
            <div className={css(styles.btnArea)}>
              <a className={`${css(styles.btn)} ${css(styles.actionBtn)}`} onClick={this.onOk}>保存</a>
              <a className={`${css(styles.btn)} ${css(styles.actionBtn)}`} onClick={this.onClosedModal}>取消</a>
            </div>
          </div>
        </Modal>


        <ConfirmModal modalVisible={this.props.group.confirmModalVisible}
                      title={this.props.group.confirm ? this.props.group.confirm.title : null}
                      content={this.props.group.confirm ? this.props.group.confirm.msg : null}
                      onClosedModal={this.onCloseConfirmModal}
                      onSubmit={this.onSubmit}
        />

      </SystemLayout>
    )
  }
}
function mapStateToProps({group}) {
  return {group}
}
export  default connect(mapStateToProps)(GroupPage);
