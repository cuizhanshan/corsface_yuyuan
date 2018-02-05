/**
 * Created by Riky on 2017/4/17.
 */
import React from 'react';
import {connect} from 'dva';
import MayLayout from '../../../components/common/MainLayout';
import {StyleSheet, css} from 'aphrodite';
import FilterProcessPoiView from '../../../components/search/FilterProcessPoiView';
import title from '../../../style/common/title.css';
import recordCss from '../../../style/record.css';
import PaginationView from '../../../components/common/PaginationView';
import {Button, notification, Select, Input, DatePicker, Radio, Modal,Popover,Table} from 'antd';
import {Link} from 'dva/router'
import PoiView from '../../../components/common/PoiView';
import ImgWithBadgeView from '../../../components/common/ImgWithBadgeView';
import ExpandImgView from '../../../components/common/ExpandImgView';
import {routerRedux} from 'dva/router';
const {RangePicker} = DatePicker;
const RadioGroup = Radio.Group;


const styles = StyleSheet.create({
  process: {
    position: 'absolute',
    top: 100,
    left: 50
  },
  container: {
    position: 'absolute',
    top: 64,
    left: 366,
    width: 1504,
    height: 726,
    background: '#151a20',
    border: '1px solid #3D515C',
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
  },
  page: {
    height: 32,
    color: '#70c8ea',
    width: 1504,
    position: 'absolute',
    left: 366,
    top: 790
  },
  nextBtn: {
    width: 100,
    height: 40,
    position: 'absolute',
    top: 800,
    left: 1000
  },
  searchBar: {
    position: 'absolute',
    left: 50,
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
    padding: '0 5px',
  },
  fix: {
    marginLeft: 30
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
    lineHeight: '34px',
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
  content: {
    overflow: 'auto'
  },
  list: {
    width: 1440,
    height: 413,
    padding: 6,
    overflow: 'auto'
  },
  faceItem: {
    margin: '6px 20px 6px 21px',
  },
  modal: {
    top: 50
  }

});




class IndexPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
    this.fetchPoiList = this.fetchPoiList.bind(this);
  }

  componentDidMount() {
    this.fetchPoiList({});
    this.props.dispatch({
      type: 'search/groupList'
    });
  }
  componentWillUnmount(){
    this.props.dispatch({type:'search/clearMatch'});
    this.props.dispatch({type:'search/clearErrorMsg'});
  }

  fetchPoiList = (query) => {
    this.props.dispatch({
      type: 'search/poiList',
      payload: query
    });
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
   * 在组件更新的时候读取错误信息，提示异常更新操作
   */
  componentDidUpdate() {
    if (this.props.search && this.props.search.errorMsg) {
      this.openNotificationWithIcon('error', this.props.search.errorMsg)
    }
  }


  onNameChange = (e) => {
    this.setState({name: e.target.value})
  };

  onGenderChange = (e) => {
    console.log("onGenderChange", e.target.value);
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
    this.fetchPoiList(query);
  };

  closedModal = () => {
    this.setState({visible: false, modalPoi: ''})
  };

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

    this.fetchPoiList(query);
  };

  onFaceCardTextClick = (value) => {
    this.setState({
      visible: true,
      modalPoi: value
    })
  };
  onFaceCardImgClick = (value) => {
    let selectedRow = this.state.selectedRow;
    if (selectedRow && (value.id == selectedRow.id)) {
      selectedRow = '';
    } else {
      selectedRow = value;
    }
    this.setState({selectedRow});

  };


  isSelected = (value) => {

    let selectedRow = this.state.selectedRow ? this.state.selectedRow : '';
    let selected = false;

    if (selectedRow && (value.id == selectedRow.id)) {
      selected = true;
    }
    return selected;
  };

  nextStep = () => {
    console.log(this.state);
    if(this.state.selectedRows){
      this.props.dispatch(routerRedux.push(`/search/poi/person2face/${this.state.selectedRows[0].personId}`))
    }else {
      this.openNotificationWithIcon('error','请选择一个目标人物！')
    }
  };

  render() {


    const tableProps = {
      pagination: false,
      expandedRowRender(record){
        return <ExpandImgView imgs={record.imgs}/>
      },
      scroll: {
        y: 638
      },
      columns: [
        {
          title: '序号',
          dataIndex: 'id',
          width: 150
        }, {
          title: '照片',
          dataIndex: 'imgs',
          width: 210,
          render: text => text && text.length > 0 ? <ImgWithBadgeView src={text[0]} count={text.length}/> : null
        },
        {
          title: '性别',
          width: 100,
          dataIndex: 'gender',
        }, {
          title: '创建时间',
          width: 170,
          dataIndex:'gmtCreate'
        },  {
          title: '身份证号',
          width: 220,
          dataIndex:'identityCard'
        },{
          title: '标签',
          width: 170,
          dataIndex:'impTag'
        },{
          title: '报警识别率',
          width: 130,
          dataIndex:'alarmThreshold'
        }, {
          title: '操作',
          width: 170,
          render: (record) => <Button type="primary" onClick={()=>this.onFaceCardTextClick(record)}>查看详情</Button>
        }
      ]
    };


    const rowSelection = {
      type:'radio',
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
      <MayLayout location={this.props.location}>
        <div className={css(styles.searchBar)}>
          <label className={css(styles.label)}>姓名：</label>
          <Input size="large" className={css(styles.input)} onChange={this.onNameChange}/>

          <RadioGroup className={css(styles.radioGroup)} onChange={this.onGenderChange}>
            <Radio value={'1'} className={css(styles.radio)}>男</Radio>
            <Radio value={'0'} className={css(styles.radio)}>女</Radio>
          </RadioGroup>

          <label className={`${css(styles.label)} ${css(styles.fix)}`}>创建时间：</label>
          <RangePicker size="large" className={css(styles.input)} showTime format="YYYY-MM-DD HH:mm:ss"
                       style={{width: 300}} onChange={this.onTimeChange}/>
          <label className={`${css(styles.label)} ${css(styles.fix)}`}>分组：</label>
          <Select size="large" allowClear className={css(styles.input)} onChange={this.onGroupChange}>
            { this.props.search.groupList ? this.props.search.groupList.map((value, i) => <Select.Option key={i}
                                                                                                         value={value.id + ''}>{value.name}</Select.Option>) : null}
          </Select>
          <a className={css(styles.btn)} onClick={this.onSearchBtn}>查询</a>
        </div>
        <FilterProcessPoiView current={0} className={css(styles.process)}/>
        <div className={css(styles.container)}>
          <div className={title.container}>
            <span className={title.text}>目标人筛查</span>
            <Link className={recordCss.listImg}/>
            <Link className={recordCss.viewImgSelect}  to='/search/poi'/>
          </div>

          <div className={css(styles.content)}>

            <Table rowSelection={rowSelection}  rowKey={record => record.id} dataSource={this.props.search.poiList && this.props.search.poiList.list ? this.props.search.poiList.list : null} {...tableProps}/>

          </div>


        </div>

        {this.props.search.poiList && this.props.search.poiList.page ?
          <PaginationView className={css(styles.page)} page={this.props.search.poiList.page}
                          pageTranslate={this.pageTranslate}/> : null}

        <Button type="primary" className={css(styles.nextBtn)} onClick={this.nextStep}>确定继续</Button>


        <Modal visible={this.state.visible}
               title=''
               footer=''
               onOk={this.closedModal}
               onCancel={this.closedModal}
               closable={false}
               width={1116}
               bodyStyle={{padding: 0, height: 803}}
               className={css(styles.modal)}
        >
          {this.state.modalPoi ?
            <PoiView key={this.state.modalPoi.id} poi={this.state.modalPoi} onClosed={this.closedModal}/> : null}

        </Modal>


      </MayLayout>
    )
  }
}
function mapStateToProps({search}) {
  return {search}
}
export default connect(mapStateToProps)(IndexPage)

