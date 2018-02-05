/**
 * Created by Riky on 2017/2/24.
 */

import React from 'react';
import {connect} from 'dva';

import SystemLayout from '../../SystemLayout';
import {StyleSheet, css} from 'aphrodite';
import {Table, notification} from 'antd';
const {Column, ColumnGroup} = Table;
import PaginationView from '../../../../components/common/PaginationView';
import {routerRedux} from 'dva/router';
import ImgWithBadgeView from '../../../../components/common/ImgWithBadgeView';
import ExpandImgView from '../../../../components/common/ExpandImgView';
import AddMemberView from '../../../../components/system/AddMemberView';
import ConfirmModal from '../../../../components/common/ConfirmModal';

/**
 * 样式
 */
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
  btn: {
    fontSize: 16,
    display: 'inline-block',
    height: 40,
    lineHeight: '40px',
    background: '#109DEC',
    width: 100,
    color: '#fff',
    textAlign: 'center',
    position: 'relative',
    top: 12,
    border: 1,
    borderRadius: 6
  },
  addMember: {
    float: 'right',
    marginLeft: 40,
    right: 20
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
  expand: {
    width: 1500
  },
  img: {
    margin: '15px 17px 15px 17px',
    width: 150,
    height: 150,
    display: 'inline-block'
  },
  modal: {
    top: 50,
  },
  content: {
    width: 1604,
    height: 820,
    background: '#232C31'
  }

});


class MemberPage extends React.Component {

  /**
   * 构造器，绑定自定义方法
   * @param props
   */
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.renderGroup = this.renderGroup.bind(this);
    this.onCloseAddMemberModal = this.onCloseAddMemberModal.bind(this);
    this.showAddMember = this.showAddMember.bind(this);
    this.onCloseConfirmModal = this.onCloseConfirmModal.bind(this);
    this.showAddConfirmModal = this.showAddConfirmModal.bind(this);
    this.showDeleteConfirmModal = this.showDeleteConfirmModal.bind(this);
    this.onAddMemberSubmit = this.onAddMemberSubmit.bind(this);
    this.openNotificationWithIcon = this.openNotificationWithIcon.bind(this);
    this.renderPagination = this.renderPagination.bind(this);
  }

  /**
   * 在组件更新的时候读取错误信息，提示异常更新操作
   */
  componentDidUpdate() {
    if (this.props.member && this.props.member.errorMsg) {
      this.openNotificationWithIcon('error', this.props.member.errorMsg)
      this.props.dispatch({
        type: 'group/clearMsg'
      })
    }
  }

  /**
   * 渲染表单中的分组信息
   * @returns {*}
   */
  renderGroup = () => {
    if (this.props.member && this.props.member.detail) {
      return this.props.member.detail.name
    } else {
      return null
    }
  };

  /**
   * 渲染操作栏按钮
   * @returns {XML}
   */
  renderActionBtn = () => {
    if (this.props.member && this.props.member.detail && this.props.member.detail.default) {
      return (
        <div className={css(styles.searchBar)}>
          <a className={`${css(styles.btn)} `} onClick={this.goBack}>返回</a>
        </div>
      )
    } else {
      return (
        <div className={css(styles.searchBar)}>
          <a className={`${css(styles.btn)} `} onClick={this.goBack}>返回</a>
         {/* <a className={`${css(styles.btn)} ${css(styles.addMember)}`} onClick={this.showDeleteConfirmModal}>删除组员</a>*/}
          <a className={`${css(styles.btn)} ${css(styles.addMember)}`} onClick={this.showAddMember}>添加组员</a>
        </div>
      )
    }
  };
  /**
   * 返回上一页
   */
  goBack = () => {
    this.props.dispatch(routerRedux.goBack());
  };
  /**
   * 关闭添加组员弹窗
   */
  onCloseAddMemberModal = () => {
    this.props.dispatch({
      type: 'member/closeAddMember'
    })
  };

  /**
   * 显示添加组员弹窗
   */
  showAddMember = () => {
    if (this.props.member && this.props.member.detail) {
      this.props.dispatch({
        type: 'member/showAddMember',
        payload: {
          groupId: this.props.member.detail.id
        }
      })
    }
  };

  /**
   * 关闭确认弹窗
   */
  onCloseConfirmModal = () => {
    this.props.dispatch({
      type: 'member/closeConfirmModal'
    })
  };

  /**
   * 显示确认添加弹窗
   * @param value
   */

  showAddConfirmModal = (value) => {
    this.props.dispatch({
      type: 'member/showAddConfirmModal',
      payload: value
    });
    this.setState({action: 'add'});
  };

  /**
   * 显示删除组员确认弹窗
   */
  showDeleteConfirmModal = () => {

    if (this.state && this.state.selectedRows) {
      let poiIds = [];
      this.state.selectedRows.map((value) => poiIds.push(value.id));

      const poiIdStr = poiIds.join(',');
      let groupId = this.props.member.detail.id;

      this.props.dispatch({
        type: 'member/showDeleteConfirmModal',
        payload: {poiIds: poiIdStr, groupId}
      });
      this.setState({action: 'delete'});
      this.setState({selectedRows: []});
    } else {
      this.openNotificationWithIcon('error', '请选择移除本组的组员！');
      return;
    }


  };

  /**
   * 确认添加
   */
  onAddMemberSubmit = () => {
    this.props.dispatch({
      type: 'member/addMember',
    });
  };

  /**
   * 确认删除
   */
  onDeleteMemberSubmit = () => {
    this.props.dispatch({
      type: 'member/deleteMember',
    });
  };

  /**
   * 确认弹窗，确认按钮点击
   */
  onSubmit = () => {
    if (this.state && this.state.action) {
      switch (this.state.action) {
        case 'add':
          this.onAddMemberSubmit();
          break;
        case 'delete':
          this.onDeleteMemberSubmit();
          break;
      }
    }

  };

  /**
   * 翻页
   * @param value
   */
  pageTranslate = (value) => {
    this.props.dispatch({
      type: 'member/memberPageTranslate',
      payload: {
        pageNo: value.pageNo,
        pageSize: value.pageSize,
        groupId: this.props.member.detail.id
      }
    })
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

  renderPagination = () => {
    if (this.props.member && this.props.member.member && this.props.member.member.page) {
      return (
        <div className={css(styles.page)}>
          <a className={css(styles.delete)} onClick={this.showDeleteConfirmModal}>删除</a>
          <PaginationView className={css(styles.pagination)}
                          page={this.props.member.member.page}
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
      expandedRowRender(record){
        return <ExpandImgView className={css(styles.expand)} imgClass={css(styles.img)} imgs={record.imgs} size={16}/>
      },
      scroll: {
        y: 692
      }
    };

    return (
      <SystemLayout location={this.props.location} dispatch={this.props.dispatch}>
        <div className={css(styles.container)}>
          {this.renderActionBtn()}
          <Table rowSelection={rowSelection} {...tableProps} rowKey={record => record.id} className={css(styles.table)}
                 dataSource={this.props.member && this.props.member.member ? this.props.member.member.list : null}>
            <ColumnGroup title='组员列表'>
              <Column
                title="姓名"
                dataIndex="name"
                key="name"
                width={120}
              />
              <Column
                title="照片"
                dataIndex="imgs"
                key="imgs"
                width={250}
                render={text => {
                  return text && text.length > 0 ? <ImgWithBadgeView src={text[0]} count={text.length}/> : null
                }}
              />
              <Column
                title="性别"
                dataIndex="gender"
                key="gender"
                width={220}
              />
              <Column
                title="时间"
                dataIndex="gmtCreate"
                key="gmtCreate"
                width={280}
              />
              <Column
                title="身份证号"
                dataIndex="identityCard"
                key="identityCard"
                width={220}
              />
              <Column
                title="分组"
                key="edit"
                width={220}
                render={this.renderGroup}
              />
              <Column
                title="标签"
                dataIndex="impTag"
                key="impTag"
                width={220}
              />
            </ColumnGroup>
          </Table>

          {/*{this.props.member && this.props.member.member && this.props.member.member.page ?
            <PaginationView className={css(styles.pagination)}
                            page={this.props.member.member.page} pageTranslate={this.pageTranslate}/> : null}*/}
          {this.renderPagination()}

        </div>
        <AddMemberView visible={this.props.member.modalVisible} onClose={this.onCloseAddMemberModal}
                       group={this.props.member.detail ? this.props.member.detail : null}
                       data={this.props.member.notMember ? this.props.member.notMember : null}
                       onClosedModal={this.onCloseAddMemberModal}
                       onOk={this.showAddConfirmModal}
        />
        <ConfirmModal modalVisible={this.props.member.confirmModalVisible}
                      title={this.props.member.confirm ? this.props.member.confirm.title : null}
                      content={this.props.member.confirm ? this.props.member.confirm.msg : null}
                      onClosedModal={this.onCloseConfirmModal}
                      onSubmit={this.onSubmit}
        />
      </SystemLayout>
    )
  }
}
function mapStateToProps({member}) {
  return {member}
}

export  default connect(mapStateToProps)(MemberPage);
