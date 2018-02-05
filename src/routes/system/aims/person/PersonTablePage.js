/**
 * Created by Riky on 2017/2/24.
 */

import React from 'react';
import {connect} from 'dva';
import SystemLayout from '../../SystemLayout';
import {StyleSheet, css} from 'aphrodite';
import {notification, Select, Input, DatePicker, Radio, Table} from 'antd';
import {Link} from 'dva/router'
import title from '../../../../style/common/title.css';
import record from '../../../../style/record.css';
import PaginationView from '../../../../components/common/PaginationView';
import ImgWithBadgeView from '../../../../components/common/ImgWithBadgeView';
import ExpandImgView from '../../../../components/common/ExpandImgView';
import ConfirmModal from '../../../../components/common/ConfirmModal';
import {SYSTEM_TARGET_PERSON_SIZE} from '../../../../utils/constant';
const {RangePicker} = DatePicker;
const RadioGroup = Radio.Group;
const {Column} = Table;
import styles from './PersonTablePage.css'

class PersonTablePage extends React.Component {
  constructor(props) {
    super(props);
    this.pageTranslate = this.pageTranslate.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onGenderChange = this.onGenderChange.bind(this);
    this.onTimeChange = this.onTimeChange.bind(this);
    this.onGroupChange = this.onGroupChange.bind(this);
    this.fetchPoi = this.fetchPoi.bind(this);
    this.onSearchBtn = this.onSearchBtn.bind(this);
    this.renderPagination = this.renderPagination.bind(this);
  }

  componentDidMount() {
    // this.fetchPoi({});
    this.props.dispatch({
      type: 'person/groupList'
    });
  }


  /**
   * 翻页
   * @param value
   */
  pageTranslate = (value) => {

    let query = {
      pageNo: value.pageNo,
      pageSize: value.pageSize,
      groupId: this.state && this.state.groupId ? this.state.groupId : '',
      name: this.state && this.state.name ? this.state.name : '',
      gender: this.state && this.state.gender ? this.state.gender : '',
      startTime: this.state && this.state.startTime ? this.state.startTime : '',
      endTime: this.state && this.state.endTime ? this.state.endTime : ''
    };

    const params = this.props.person.poiListParams
    const poiListParams = {...params, ...query}
    console.log(poiListParams)
    this.props.dispatch({
      type: 'person/success',
      payload: {
        poiListParams
      }
    })
    this.fetchPoi(this.props.person.poiListParams);

  };

  fetchPoi = (query) => {
    this.props.dispatch({
      type: 'person/poiList',
      payload: query
    });
  };


  /**
   * 在组件更新的时候读取错误信息，提示异常更新操作
   */
  componentDidUpdate() {
    if (this.props.person && this.props.person.errorMsg) {
      this.openNotificationWithIcon('error', this.props.person.errorMsg)
    }
  }

  onNameChange = (e) => {
    this.setState({name: e.target.value})
  };

  onGenderChange = (e) => {
    this.setState({
      gender: e.target.value
    });
  };

  onTimeChange = (data, dateString) => {
    this.setState({
      startTime: dateString[0],
      endTime: dateString[1]
    });
  };

  onGroupChange = (value) => {
    this.setState({
      groupId: value
    });
  };


  onSearchBtn = () => {
    let query = {
      groupId: this.state && this.state.groupId ? this.state.groupId : '',
      name: this.state && this.state.name ? this.state.name : '',
      gender: this.state && this.state.gender ? this.state.gender : '',
      startTime: this.state && this.state.startTime ? this.state.startTime : '',
      endTime: this.state && this.state.endTime ? this.state.endTime : ''
    };
    const params = this.props.person.poiListParams
    const poiListParams = {...params, ...query}
    console.log(poiListParams)
    this.props.dispatch({
      type: 'person/success',
      payload: {
        poiListParams
      }
    })
    this.fetchPoi(this.props.person.poiListParams);

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
      type: 'person/closeConfirmModal'
    })
  };

  showDeletePoiConfirmModal = () => {
    if (this.state && this.state.selectedRows) {
      let ids = [];
      this.state.selectedRows.map((value) => ids.push(value.personId));

      this.props.dispatch({
        type: 'person/showDeletePoiConfirmModal',
        payload: {ids: ids}
      });
      this.setState({action: 'delete'});

    } else {
      this.openNotificationWithIcon('error', '请选择需要删除的目标！');
    }
  };


  onDeletePoiSubmit = () => {
    this.props.dispatch({
      type: 'person/deletePoi'
    })
  };

  onSubmit = () => {
    if (this.state && this.state.action) {
      switch (this.state.action) {
        case 'delete':
          this.onDeletePoiSubmit();
          break;
      }
    }
  };

  renderPagination = () => {
    if (this.props.person && this.props.person.poi && this.props.person.poi.page) {
      return (
        <div className={styles.page}>
          <a className={styles.delete} onClick={this.showDeletePoiConfirmModal}>删除</a>
          <PaginationView className={styles.pagination}
                          page={this.props.person.poi.page}
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
        return <ExpandImgView className={styles.expand} imgClass={styles.img} imgs={record.imgs} size={16}/>
      },
      scroll: {
        y: 698
      }
    };

    return (
      <SystemLayout location={this.props.location} dispatch={this.props.dispatch}>
        <div className={styles.container}>
          <div className={styles.searchBar}>

            <label className={styles.label}>姓名：</label>
            <Input size="large" className={styles.input} onChange={this.onNameChange}/>

            <RadioGroup className={styles.radioGroup} onChange={this.onGenderChange}>
              <Radio value={'1'} className={styles.radio}>男</Radio>
              <Radio value={'0'} className={styles.radio}>女</Radio>
            </RadioGroup>

            <label className={`${styles.label} ${styles.fix}`}>创建时间：</label>
            <RangePicker size="large" className={styles.input} showTime format="YYYY-MM-DD HH:mm:ss"
                         style={{width: 300}} onChange={this.onTimeChange}/>
            <label className={`${styles.label} ${styles.fix}`}>分组：</label>
            <Select size="large" allowClear className={styles.input} onChange={this.onGroupChange}>
              { this.props.person.groupList ? this.props.person.groupList.map((value, i) => <Select.Option key={i}
                                                                                                           value={value.id + ''}>{value.name}</Select.Option>) : null}
            </Select>
            <a className={styles.btn} onClick={this.onSearchBtn}>查询</a>
            <Link className={`${styles.btn} ${styles.add}`} to={`/system/aims/person/new`}>新建目标</Link>
          </div>
          <div className={styles.content}>
            <div className={title.container}>
              <span className={title.text}>名单列表</span>
              <Link className={record.listImg}/>
              <Link className={record.viewImgSelect} to='/system'/>
            </div>

            <Table rowSelection={rowSelection} {...tableProps}  rowKey={record => record.id} className={styles.list}
                     dataSource={this.props.person && this.props.person.poi && this.props.person.poi.list ? this.props.person.poi.list : null}>

              <Column
                title="姓名"
                dataIndex="name"
                key="name"
                width={100}
              />
              <Column
                title="照片"
                dataIndex="imgs"
                key="imgs"
                width={220}
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
                title="标签"
                dataIndex="impTag"
                key="impTag"
                width={220}
              />
              <Column
                title="编辑"
                key="edit"
                width={220}
                render={(record) => (
                  <Link className={styles.edit} to={`/system/aims/person/edit/${record.personId}`}/>)}
              />
            </Table>
          </div>

          <ConfirmModal modalVisible={this.props.person.confirmModalVisible}
                        title={this.props.person.confirm ? this.props.person.confirm.title : null}
                        content={this.props.person.confirm ? this.props.person.confirm.msg : null}
                        onClosedModal={this.onCloseConfirmModal}
                        onSubmit={this.onSubmit}/>


          {this.renderPagination()}
        </div>

      </SystemLayout>
    )
  }
}

function mapStateToProps({person}) {
  return {person}
}

export  default connect(mapStateToProps)(PersonTablePage);






