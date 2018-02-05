/**
 * Created by Riky on 2017/4/17.
 */
import React from 'react';
import {connect} from 'dva';
import {Link} from 'dva/router';
import {notification, Collapse, Table, Popover, Button} from 'antd';
import MayLayout from '../../../components/common/MainLayout';
import {StyleSheet, css} from 'aphrodite';
import FilterProcessFaceView from '../../../components/search/FilterProcessFaceView';
import SearchBar from '../../../components/common/SearchBarView';
import PaginationView from '../../../components/common/PaginationView';
import title from '../../../style/common/title.css';
import record from '../../../style/record.css';
import ImgView from '../../../components/common/ImgView';
import ExpandImgView from '../../../components/common/ExpandImgView';
import ImgWithBadgeView from '../../../components/common/ImgWithBadgeView';
const Panel = Collapse.Panel;
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
    height: 815,
    background: '#151a20',
    border: '1px solid #3D515C',
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
  },
  searchBar: {
    width: 1800,
    position: 'relative',
    left: 50
  },

  list: {
    position: 'relative',
    width: 1502,
    height: 773,
    display: 'inline-block',
  },

  page: {
    width: 1502,
    position: 'absolute',
    bottom: 0,
    height: 32,
    color: '#70c8ea'
  },

  actionBtn: {
    height: 40,
    lineHeight: '40px',
    background: '#109DEC',
    width: 100,
    fontSize: 16,
    display: 'inline-block',
    color: '#fff',
    border: 1,
    borderRadius: 6,
    textAlign: 'center'
  },
  faceImg: {
    width: 84,
    height: 84,
  },
  expand:{
    width:1404
  },
  imgClass:{
    margin: '15px 11px',
  }
});


class IndexPage extends React.Component {

  constructor(props) {
    super(props);
    this.onFaceCardClick = this.onFaceCardClick.bind(this);
    this.openNotificationWithIcon = this.openNotificationWithIcon.bind(this);
    this.fetchFaceList = this.fetchFaceList.bind(this);
    this.searchSubmit = this.searchSubmit.bind(this);
  }

  componentDidMount() {
    this.fetchFaceList({});
    this.props.dispatch({
      type:'search/cameraList'
    });
  }

  fetchFaceList = (query) => {
    this.props.dispatch({
      type: 'search/faceList',
      payload: query
    })
  };

  onFaceCardClick = (value) => {
    this.setState({checkedFace: value});
  };



  /**
   * 在组件更新的时候读取错误信息，提示异常更新操作
   */
  componentDidUpdate() {
    if (this.props.search && this.props.search.errorMsg) {
      this.openNotificationWithIcon('error', this.props.person.errorMsg)
    }

    if (this.props.search.faceList) {
      if (!this.state) {
        this.setState({checkedFace: this.props.search.faceList.list[0]});
      }
    }
  }
  componentWillUnmount(){
    this.props.dispatch({type:'search/clearMatch'});
    this.props.dispatch({type:'search/clearErrorMsg'});
  }

  /**
   * 翻页
   * @param value
   */
  pageTranslate = (value) => {
    let query = {
      pageNo: value.pageNo,
      pageSize: value.pageSize,
      srcId: this.state && this.state.srcId ? this.state.srcId : '',
      personId: this.state && this.state.personId ? this.state.personId : '',
      startTime: this.state && this.state.startTime ? this.state.startTime : '',
      endTime: this.state && this.state.endTime ? this.state.endTime : ''
    };

    this.fetchFaceList(query);
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

  searchSubmit = (value) => {
    const {srcId, startTime, endTime} = value;
    this.props.dispatch({
      type: 'search/faceList',
      payload: {
        srcId: srcId ? srcId : '',
        startTime: startTime ? startTime : '',
        endTime: endTime ? endTime : '',
      }
    })
  };

  render() {



    const tableProps = {
      pagination: false,
      expandedRowRender(record){
        return <ExpandImgView className={css(styles.expand)} imgClass={css(styles.imgClass)} size={16} imgs={record.imgs}/>
      },
      scroll: {
        y: 692
      },
      columns: [
        {
          title: '序号',
          dataIndex: 'id',
          width: 80
        }, {
          title: '照片',
          dataIndex: 'imgs',
          width: 210,
          render: text => {
            return text && text.length > 0 ? <ImgWithBadgeView src={text[0]} count={text.length}/> : null
          }
        },
        {
          title: '摄像头',
          width: 170,
          dataIndex: 'srcName',
        }, {
          title: '时间',
          width: 170,
          render: (record) => {
            return <Popover placement="top" content={<ImgView src={record.snapImg}/>} trigger="click"
                            arrowPointAtCenter><Button
              className={record.popoverBtn}>{record.captureTime}</Button></Popover >
          }
        }, {
          title: '相似人',
          width: 170,
          render: (record) => {
            if (record.alarmed) {
              return record.judgePerson ? <ImgView className={css(styles.faceImg)} src={record.judgePerson}/> : null
            } else {
              return record.mostPerson ? <ImgView className={css(styles.faceImg)} src={record.mostPerson}/> : null
            }
          }
        }, {
          title: '相似人姓名',
          width: 170,
          render: (record) => {
            if (record.alarmed) {
              return record.judgePerson ? record.judgePerson.name : null
            } else {
              return record.mostPerson ? record.mostPerson.name : null
            }
          }
        }, {
          title: '身份证号',
          width: 170,
          render: (record) => {
            if (record.alarmed) {
              return record.judgePerson ? record.judgePerson.identityCard : null
            } else {
              return record.mostPerson ? record.mostPerson.identityCard : null
            }
          }
        }, {
          title: '匹配度(%)',
          width: 130,
          dataIndex: 'percent',
          render: text => text ? (text * 100).toFixed(2) : null

        }, {
          title: '操作',
          width: 170,
          render: (record) => <Link className={css(styles.actionBtn)} to={`/search/face/face2person/${record.code}`}>搜索</Link>
        }
      ]
    };




    return (
      <MayLayout location={this.props.location}>
        <SearchBar className={css(styles.searchBar)}  cameraList={this.props.search.cameraList ? this.props.search.cameraList : null} onSubmit={this.searchSubmit}/>
        <FilterProcessFaceView current={0} className={css(styles.process)}/>
        <div className={css(styles.container)}>
          <div className={title.container}>
            <span className={title.text}>人脸记录筛查</span>
            <Link className={record.listImg}/>
            <Link className={record.viewImgSelect} to='/search/face'/>
          </div>
          <div className={css(styles.list)}>

            <Table rowKey={record => record.id}
                   dataSource={this.props.search.faceList && this.props.search.faceList.list ? this.props.search.faceList.list : null} {...tableProps}
                   style={{textAlign: 'center'}}/>

            {this.props.search.faceList && this.props.search.faceList.page ?
              <PaginationView className={css(styles.page)} page={this.props.search.faceList.page}
                              pageTranslate={this.pageTranslate ? this.pageTranslate : null}/> : null}

          </div>

        </div>
      </MayLayout>
    )
  }
}
function mapStateToProps({search}) {
  return {search}
}
export default connect(mapStateToProps)(IndexPage)

