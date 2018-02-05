/**
 * Created by Riky on 2017/3/31.
 */

import React from 'react';

import {StyleSheet, css} from 'aphrodite';
import {Table, Modal, notification} from 'antd';
const {Column} = Table;
import PaginationView from '../../components/common/PaginationView';
import title from '../../style/common/title.css';
import ImgWithBadgeView from '../../components/common/ImgWithBadgeView';
import ExpandImgView from '../../components/common/ExpandImgView';

const styles = StyleSheet.create({

  table: {
    width: 1584,
    margin: '0 auto'
  },
  page: {
    height: 32,
    color: '#70c8ea',
    width: 1604,
    position: 'absolute',
    bottom: 72
  },
  delete: {
    fontSize: 16,
    textDecoration: 'underline',
    float: 'left',
    display: 'inline-block',
    marginLeft: 10,
    height: 32,
    lineHeight: '36px'
  },
  pagination: {
    display: 'inline-block',
    height: 32,
    color: '#70c8ea',
    width: 1604
  },
  expand: {
    width: 1480
  },
  img: {
    margin: '15px 15px 15px 15px',
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
    background: '#232C31',
    position: 'relative',
  },
  btnArea: {
    textAlign: 'center',
    position: 'absolute',
    bottom: 0,
    height: 60,
    width:1604
  },
  addBtn: {
    height: 40,
    lineHeight: '40px',
    background: '#109DEC',
    width: 100,
    position: 'absolute',
    display: 'block',
    color: '#fff',
    border: 1,
    borderRadius: 6,
    left:'47%',
  }
});
class AddMemberView extends React.Component {
  constructor(props) {
    super(props);
    this.renderGroup = this.renderGroup.bind(this);
    this.renderPagination = this.renderPagination.bind(this);
    this.openNotificationWithIcon = this.openNotificationWithIcon.bind(this);
  }
  renderGroup = () => {
    if (this.props.group) {
      return this.props.group.name
    } else {
      return null
    }
  };
  renderPagination = () => {
    if (this.props.data && this.props.data.page) {

      return (
        <div className={css(styles.page)}>
          {/*<a className={css(styles.delete)}>删除</a>*/}
          <PaginationView className={css(styles.pagination)} page={this.props.data.page}
                          pageTranslate={this.props.pageTranslate ? this.props.pageTranslate : null}/>
        </div>
      )

    } else {
      return null;
    }
  };
  openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: '错误提示',
      description: message
    });
  };
  onSubmit = () => {
    if (this.state && this.state.selectedRows) {
      let poiIds = [];
      this.state.selectedRows.map((value) => poiIds.push(value.id));
      const poiIdStr = poiIds.join(',');
      let groupId = this.props.group.id;
      this.props.onOk({poiIds: poiIdStr, groupId});
      this.setState({selectedRows:[]});
    } else {
      this.openNotificationWithIcon('error', '请选择要添加的组员！')
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
        y: 670
      }
    };
    return (
      <Modal visible={this.props.visible}
             title=''
             footer=''
             closable={false}
             onOk={this.props.onClosedModal}
             onCancel={this.props.onClosedModal}
             width={1604}
             bodyStyle={{padding: 0, height: 856}}
             className={css(styles.modal)}
      >
        <div className={title.container}>
          <span className={title.text}>添加组员</span>
          <div className={title.closeBtn} onClick={this.props.onClosedModal}/>
        </div>
        <div className={css(styles.content)}>
          <Table rowSelection={rowSelection} {...tableProps} rowKey={record => record.id} className={css(styles.table)}
                 dataSource={this.props.data ? this.props.data.list : null}>
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
              width={260}
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
          </Table>
          {this.renderPagination()}
          <div className={css(styles.btnArea)}>
            <a className={css(styles.addBtn)} onClick={this.onSubmit}>确定</a>
          </div>
        </div>

      </Modal>
    )
  }
}
export default AddMemberView;
