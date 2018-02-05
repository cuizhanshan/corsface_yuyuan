/**
 * Created by Riky on 2017/4/7.
 */

import React from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import SystemLayout from '../../SystemLayout';
import {StyleSheet, css} from 'aphrodite/no-important';
import {notification, Select, Input, DatePicker, Radio, Button,Spin} from 'antd';
import {Link} from 'dva/router'
import title from '../../../../style/common/title.css';
import record from '../../../../style/record.css';
import PaginationView from '../../../../components/common/PaginationView';
import FaceCardView from '../../../../components/common/FaceCardView';
import NoDateRemind from '../../../../components/common/NoDateRemind'
import {SYSTEM_TARGET_PERSON_SIZE} from '../../../../utils/constant';
const {RangePicker} = DatePicker;
const RadioGroup = Radio.Group;
const styles = StyleSheet.create({
  container: {
    width: 1604,
    position: 'relative',
    height: 880,
    background: '#232C31'
  },
  searchBar: {
    position: 'relative',
    width: '100%',
    height: 112,
    fontSize: 16,
    fontFamily: ['SimHei', 'sans-serif'],
  },
  label: {
    height: 64,
    width: 80,
    display: 'inline-block',
    lineHeight: '64px',
    color: '#fff',
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
    width: 80,
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
    top: 36,
    marginRight: 40,
    borderRadius: 6,
    color: '#fff',
    textAlign: 'center'
  },
  content: {
    width: 1604,
    height: 750,
    background: '#151A20',
    border: '1px solid #384A54',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,

  },
  spin:{
      width: 1602,
      height: 737,
  },
  list: {
    width: 1602,
    height: 737,
  },
  item: {
    width: 160,
    fontSize: 13,
    // height: 233,
    height: 160,
    margin: '12px 18px 0px 18px',
    display: 'inline-block',
    cursor: 'pointer',
    background: '#33444e',
    borderRadius: 0,
    border: 0,
    position: 'relative',
    color: '#ffffff',
    ':hover': {
      border: '2px solid #109dec'
    }
  },
  page: {
    height: 32,
    color: '#70c8ea',
    width: 1604,
    position: 'absolute'
  },
  newline: {
    // float: 'left',
    marginTop: -14
  }

});


class PersonPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      model: false,
      visible: false
    };
    this.pageTranslate = this.pageTranslate.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onGenderChange = this.onGenderChange.bind(this);
    this.onTimeChange = this.onTimeChange.bind(this);
    this.onGroupChange = this.onGroupChange.bind(this);
    this.fetchPoi = this.fetchPoi.bind(this);
    this.onSearchBtn = this.onSearchBtn.bind(this);
    this.onFaceCardClick = this.onFaceCardClick.bind(this);
  }

  componentDidMount() {
    this.fetchPoi({});
    this.props.dispatch({
      type: 'person/groupList'
    });
  }

  componentWillUnmount(){
    console.log('PersonPage.. componentWillUnmount')
    let query = {
      pageSize:  SYSTEM_TARGET_PERSON_SIZE,
      pageNo: 1,
      groupId: '',
      name:'',
      gender: '',
      startTime: '',
      endTime: '',
      identityCard: ''
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
    this.props.dispatch({
      type: 'person/spinLoading'
    });
  }

  // componentWillUpdate(){
  //   this.props.dispatch({
  //     type: 'person/spinLoading'
  //   });
  // }
  // componentDidUpdate(){
  //   this.props.dispatch({
  //     type: 'person/loadUp'
  //   });
  // }

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
      endTime: this.state && this.state.endTime ? this.state.endTime : '',
      identityCard: this.state && this.state.identityCard ? this.state.identityCard : ''
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
      type: 'person/spinLoading'
    });
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

  onFaceCardClick = (value) => {
    this.props.dispatch(routerRedux.push(`/system/aims/person/edit/${value.personId}`))
  };

  onNameChange = (e) => {
    this.setState({
      name: e.target.value
    });
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

  onIDCardChange = (e) => {
    this.setState({
      identityCard: e.target.value
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
      endTime: this.state && this.state.endTime ? this.state.endTime : '',
      identityCard: this.state && this.state.identityCard ? this.state.identityCard : ''
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

  render() {
    return (
      <SystemLayout location={this.props.location} dispatch={this.props.dispatch}>
        <div className={css(styles.container)}>
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
              { this.props.person.groupList ? this.props.person.groupList.map((value, i) => <Select.Option key={i}
                                                                                                           value={value.id + ''}>{value.name}</Select.Option>) : null}
            </Select>

            <a className={css(styles.btn)} onClick={this.onSearchBtn}>查询</a>
            <Link className={css(styles.add)} to={`/system/aims/person/new`}>新建目标</Link>

            <div className={css(styles.newline)}>
              <label className={css(styles.label)}>身份证号：</label>
              <Input size="large" className={css(styles.input)} onChange={this.onIDCardChange}/>
            </div>

          </div>
          <div className={css(styles.content)}>
            <div className={title.container}>
              <span className={title.text}>名单列表</span>
              <Link className={record.listImgSelect} to='/system/aims/person'/>
              <Link className={record.viewImg}/>
            </div>

            <Spin spinning={this.props.person.loading} tip="数据加载中..." wrapperClassName={css(styles.spin)}>
              <NoDateRemind visible={this.props.person.remindControl}/>
              <div className={css(styles.list)}>
                {this.props.person && this.props.person.poi && this.props.person.poi.list ? this.props.person.poi.list.map((value, i) =>
                  <FaceCardView data={value}
                                className={css(styles.item)}
                                key={value.id} onFaceCardClick={this.onFaceCardClick}/>) : null }
              </div>
             </Spin>

          </div>

          {this.props.person && this.props.person.poi && this.props.person.poi.page ?
            <PaginationView className={css(styles.page)} page={this.props.person.poi.page}
                            pageTranslate={this.pageTranslate ? this.pageTranslate : null}/> : null}
        </div>

      </SystemLayout>
    )
  }
}

function mapStateToProps({person}) {
  return {person}
}

export  default connect(mapStateToProps)(PersonPage);






