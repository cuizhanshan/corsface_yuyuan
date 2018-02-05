/**
 * Created by Riky on 2017/4/17.
 */
import React from 'react';
import {connect} from 'dva';
import {Link} from 'dva/router';
import {notification,Collapse,Button, Spin} from 'antd';
import MayLayout from '../../../components/common/MainLayout';
import {StyleSheet, css} from 'aphrodite';
import FilterProcessFaceView from '../../../components/search/FilterProcessFaceView';
import SearchBar from '../../../components/common/SearchBarView';
import FacetrackCardView from '../../../components/common/FacetrackCardView';
import PaginationView from '../../../components/common/PaginationView';
import title from '../../../style/common/title.css';
import record from '../../../style/record.css';
import ImgView from '../../../components/common/ImgView';
import NoDateRemind from '../../../components/common/NoDateRemind'
import {routerRedux} from 'dva/router';
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

  desc: {
    position:'absolute',
    width: 682,
    height: 773,
    display: 'inline-block',
    borderLeft: '1px solid #3D515C'
  },

  list: {
    position:'relative',
    width: 820,
    height: 773,
    display: 'inline-block',
  },

  content: {
    position:'absolute',
    top:0,
    width: 820,
    height: 739,
    borderBottom: '1px solid #3D515C',
    overflow:'auto'
  },

  page: {
    width: 798,
    position: 'absolute',
    top: 739,
    left: 22,
    height: 32,
    color: '#70c8ea'
  },
  faceCardView: {

    fontSize: 15,
    /*width: 130,
    height: 203,
    margin: '31px 17px 0',*/

    width: 140,
    height: 150,
    margin: '25px 11px 0',

    display: 'inline-block',

    cursor: 'pointer',
    background: '#33444e',
    borderRadius: 0,
    border: 0,
    color: '#ffffff',
    ':hover': {
      border: '2px solid #109dec'
    }
  },
  collapse: {
    position: 'absolute',
    top: 0,
    width: 681,
    border: 0,
  },
  panel: {
    background: '#33444e',
    borderRadius: 0,
    border: '1px solid #3d515d',
  },
  panelHeader: {
    border: 0,
    height: '100%',
    color: '#70c8ea',
    fontSize: 16,
    fontFamily: 'SimHei'
  },
  imgList: {
    height: 580,
    overflow: 'auto'
  },
  img: {
   /* width: 200,
    height: 200,
    margin: '5px 5px',*/
    width: 144,
    height: 144,
    margin: '5px 10px',
    display: 'inline-block'
  },
  backImg: {
    height: 392
  },
  btnArea: {
    position:'absolute',
    width:'100%',
    left:0,
    bottom:-2,
    height: 80,
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  actionBtn: {
    // position:'absolute',
    height: 40,
    lineHeight: '40px',
    background: '#109DEC',
    width: 100,
    bottom: 20,
    fontSize: 16,
    display: 'inline-block',
    color: '#fff',
    border: 1,
    // marginLeft:-50,
    borderRadius: 6
  },
  spin: {
    float: 'left',
    width: 820,
    height: 773
  }

});


class IndexPage extends React.Component {

  constructor(props) {
    super(props);
    this.onFaceCardClick = this.onFaceCardClick.bind(this);
    this.openNotificationWithIcon = this.openNotificationWithIcon.bind(this);
    this.fetchFaceList = this.fetchFaceList.bind(this);
    this.searchSubmit = this.searchSubmit.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.pageTranslate = this.pageTranslate.bind(this);
  }



  componentDidMount() {
    this.fetchFaceList({});
    this.props.dispatch({
      type:'search/cameraList'
    });
    this.props.dispatch({
      type:'search/spinLoading'
    });
  };

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
      this.openNotificationWithIcon('error', this.props.search.errorMsg)
    }

    if(this.props.search.faceList){
      if(!this.state){
        this.setState({checkedFace: this.props.search.faceList.list[0]});
      }
    }
  }

  componentWillUnmount(){
    this.props.dispatch({type:'search/clearMatch'});
    this.props.dispatch({type:'search/clearErrorMsg'});
    this.props.dispatch({type:'search/cancelMatch'})
  }

  nextStep = () => {
    if(this.state.checkedFace){
      this.props.dispatch(routerRedux.push(`/search/face/face2person/${this.state.checkedFace.code}`))
    }else {
      this.openNotificationWithIcon('error','请选择一个人脸时序！')
    }
  };


  /**
   * 翻页
   * @param value
   */
  pageTranslate = (value) => {

    let payload = this.state && this.state.query ? this.state.query : {};

    payload.pageNo = value.pageNo;
    payload.pageSize = value.pageSize;

    this.fetchFaceList(payload);
    this.props.dispatch({
      type:'search/spinLoading'
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

  searchSubmit = (value) => {
    const {srcId, startTime, endTime} = value;
    this.setState({query: value});
    this.props.dispatch({
      type: 'search/cleanFaceList'
    });

    this.props.dispatch({
      type: 'search/faceList',
      payload: {
        srcId: srcId ? srcId : '',
        startTime: startTime ? startTime : '',
        endTime: endTime ? endTime : '',
      }
    });
    this.props.dispatch({
      type: 'search/spinLoading'
    });
  };

  render() {
    return (
      <MayLayout location={this.props.location}>
        <SearchBar className={css(styles.searchBar)}  cameraList={this.props.search.cameraList ? this.props.search.cameraList : null} onSubmit={this.searchSubmit}/>
        <FilterProcessFaceView current={0} className={css(styles.process)}/>
        <div className={css(styles.container)}>
          <div className={title.container}>
            <span className={title.text}>人脸记录筛查</span>
            <Link className={record.listImgSelect} to='/search/face/table'/>
            <Link className={record.viewImg}/>
          </div>

          <Spin spinning={this.props.search.loading} tip="数据加载中..." wrapperClassName={css(styles.spin)}>
            <NoDateRemind visible={this.props.search.remindControl}/>
            <div className={css(styles.list)}>

              <div className={css(styles.content)}>
                {this.props.search.faceList && this.props.search.faceList.list ? this.props.search.faceList.list.map((value, i) =>
                    <FacetrackCardView data={value}
                                  className={css(styles.faceCardView)}
                                  key={value.id}
                                  onFaceCardClick={this.onFaceCardClick}/>) : null }
              </div>
              {this.props.search.faceList && this.props.search.faceList.page ?
                <PaginationView className={css(styles.page)} page={this.props.search.faceList.page} pageTranslate={this.pageTranslate ? this.pageTranslate : null} /> : null}
            </div>
          </Spin>

          <div className={css(styles.desc)}>
            <Collapse accordion className={css(styles.collapse)} defaultActiveKey={['1']}>

              <Panel header={<div className={css(styles.panelHeader)}>识别人</div>} key="1" className={css(styles.panel)}
                     bodyStyle={{padding: 0}}>
                <div className={css(styles.imgList)}>
                  {this.state && this.state.checkedFace.imgs ? this.state.checkedFace.imgs.map((value, i) => <ImgView src={value} key={i} className={css(styles.img)}/>) : null}
                </div>

              </Panel>
              <Panel header={<div className={css(styles.panelHeader)}>镜头记录</div>} key="2" className={css(styles.panel)}>
                <div className={css(styles.backImg)}>
                  {this.state && this.state.checkedFace.snapImg ? <ImgView src={this.state.checkedFace.snapImg}/> : null}
                </div>
              </Panel>
            </Collapse>

            <div className={css(styles.btnArea)}>
              <a className={css(styles.actionBtn)} onClick={this.nextStep} >搜索</a>
            </div>

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

