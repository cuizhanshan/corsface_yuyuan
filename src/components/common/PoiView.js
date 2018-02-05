/**
 * Created by Riky on 2017/3/24.
 */

import React from 'react';
import title from '../../style/common/title.css';
import {StyleSheet, css} from 'aphrodite/no-important';
import {Row, Col, Table, Collapse, Button} from 'antd';
const Panel = Collapse.Panel;
import ImgView from './ImgView';
import PaginationView from './PaginationFacetrackView';

import {CONTRAST_FACE_PAGE_SIZE} from '../../utils/constant';
const styles = StyleSheet.create({
  container: {
    height: 803,
    width: 1116,
    background: '#151a20',
    margin: '62px  auto 0',
    border: '1px solid #3d515d',
    borderRadius: 4
  },
  content: {
    height: 767,
    width: '100%',
    padding: '5px 0px 10px 15px',
    fontFamily: 'SimHei'
  },

  faceTrack: {
    height: 752,
    width: 512,
    background: '#151a20',
    display: 'inline-block',
    border: '1px solid #3d515d',
    position: 'relative'
  },
  collapse: {
    position: 'absolute',
    top: 0,
    width: 512,
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
  list: {
    height: 640,
    overflow: 'auto'
  },

  backImg: {
    height: 289
  },

  img: {
   /* width: 200,
    height: 200,
    margin: '5px 15px',*/
    width: 144,
    height: 144,
    margin: '5px 10px',
    display: 'inline-block'
  },

  person: {
    height: 752,
    width: 567,
    display: 'inline-block',
    marginLeft: 5,
    background: '#33444e',
    border: '1px solid #3d515d'
  },

  info: {
    position: 'absolute',
    top: 5,
    width: 567
  },
  desc: {
    position: 'relative',
    width: 537,
    height: 222,
    margin: '0 auto'
  },
  personImg: {
    width: 200,
    height: 200,
    margin: '5px 11px',
    float: 'left'
  },
  descInfo: {
    width: 315,
    height: 222,
    float: 'right',
    position: 'relative'
  },
  item: {
    width: 315,
    height: 32,
    color: '#ffffff',
    fontSize: 16,
    float: 'left'
  },
  itemText: {
    // display: 'inline-block',
    float: 'left',
    textAlign: 'right',
    lineHeight: '32px',
    height: 32,
    width: 80
  },
  itemInput: {
    // display: 'inline-block',
    float: 'right',
    width: 200,
    height: 32,
    lineHeight: '32px',
    marginLeft: 10,
  },
  table: {
    width: 537,
    margin: '0 auto',
    height: 460,
    fontSize: 16
  },
  pagination: {
    height: 32,
    color: '#70c8ea',
    width: 567,
    position: 'relative',
    bottom: 0
  }


});


class PoiView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      poi: props.poi,
      page: {
        total: props.poi.faceList && props.poi.faceList.length > 0 ? props.poi.faceList.length : 0,
        pageSize: CONTRAST_FACE_PAGE_SIZE
      },
      personFace: props.poi.faceList && props.poi.faceList.length > 0 ? props.poi.faceList[0] : null,
      faceList: props.poi.faceList && props.poi.faceList.length > 0 ? props.poi.faceList.filter((value, i) => {
          return i < CONTRAST_FACE_PAGE_SIZE
        }) : null
    };

    this.selectRow = this.selectRow.bind(this);

  }


  formatterGroups = (groups) => {

    let names = [];

    if (groups && groups.length > 0) {
      groups.map(value => names.push(value.name));
    }
    return names.join(',');
  };

  selectRow = (value) => {
    this.setState({personFace: value})
  };

  onClosed = () => {
    this.props.onClosed();
  };


  pageTranslate = (value) => {
    const {pageNo, pageSize} = value;
    let faceList = this.state.poi.faceList.filter((value, i) => {
      return (((parseInt(pageNo) - 1) * pageSize) <= i) && (i <= (parseInt(pageNo) * parseInt(pageSize) - 1));
    });
    this.setState({faceList});
  };

  render() {

    const that = this;
    const tableProps = {
      pagination: false,
      columns: [
        {
          title: '序号',
          dataIndex: 'id',
          width: 117
        }, {
          title: '摄像头',
          dataIndex: 'srcName',
          width: 210
        },
        {
          title: '时间',
          width: 210,
          dataIndex: 'captureTime'
        }
      ],
      onRowClick(record, index){
        that.selectRow(record);
      }
    };

    return (
      <Row type="flex" justify="space-between" className={css(styles.container)}>
        <div className={title.container}>
          <span className={title.text}>识别人详情</span>
          <div className={title.closeBtn} onClick={this.onClosed}/>
        </div>
        <Row className={css(styles.content)}>
          <Col className={css(styles.faceTrack)}>
            <Collapse accordion className={css(styles.collapse)} defaultActiveKey={['1']}>

              <Panel header={<div className={css(styles.panelHeader)}>识别人</div>} key="1" className={css(styles.panel)}
                     bodyStyle={{padding: 0}}>
                <div className={css(styles.list)}>
                  {this.state.personFace && this.state.personFace.imgs ? this.state.personFace.imgs.map((value, i) =>
                      <ImgView src={value} key={i}
                               className={css(styles.img)}/>) : null}
                </div>

              </Panel>
              <Panel header={<div className={css(styles.panelHeader)}>镜头记录</div>} key="2" className={css(styles.panel)}>
                <div className={css(styles.backImg)}>
                  {this.state.personFace && this.state.personFace.snapImg ?
                    <ImgView src={this.state.personFace.snapImg}/> : null}
                </div>
              </Panel>
            </Collapse>
          </Col>
          <Col className={css(styles.person)}>
            <div className={css(styles.info)}>
              <div className={title.container} style={{border: 0, borderRadius: 0, background: '#33444e'}}>
                <span className={title.text}>照片对照</span>
              </div>
              <div className={css(styles.desc)}>
                <ImgView src={this.state.poi} className={css(styles.personImg)}/>
                <div className={css(styles.descInfo)}>
                  <div className={css(styles.item)}>
                    <label className={css(styles.itemText)}>姓名：</label>
                    <label className={css(styles.itemInput)}>{this.state.poi ? this.state.poi.name : null}</label>
                  </div>
                  <div className={css(styles.item)}>
                    <label className={css(styles.itemText)}>性别：</label>
                    <label className={css(styles.itemInput)}>{this.state.poi ? this.state.poi.gender : null}</label>
                  </div>
                  <div className={css(styles.item)}>
                    <label className={css(styles.itemText)}>身份证号：</label>
                    <label
                      className={css(styles.itemInput)}>{this.state.poi && this.state.poi.identityCard ? this.state.poi.identityCard : null}</label>
                  </div>
                  <div className={css(styles.item)}>
                    <label className={css(styles.itemText)}>收入时间：</label>
                    <label className={css(styles.itemInput)}>{this.state.poi ? this.state.poi.gmtCreate : null}</label>
                  </div>
                  <div className={css(styles.item)}>
                    <label className={css(styles.itemText)}>分组：</label>
                    <label
                      className={css(styles.itemInput)}>{this.props.poi ? this.formatterGroups(this.props.poi.groups) : ''}</label>
                  </div>
                  <div className={css(styles.item)}>
                    <label className={css(styles.itemText)}>标签：</label>
                    <label
                      className={css(styles.itemInput)}>{this.state.poi && this.state.poi.impTag ? this.state.poi.impTag : null}</label>
                  </div>
                </div>
              </div>

              <Table rowKey={record => record.id} className={css(styles.table)}
                     dataSource={this.state.faceList ? this.state.faceList : null} {...tableProps}/>
              {this.state.page && this.state.page.total > 0 ?
                <PaginationView className={css(styles.pagination)} page={this.state.page}
                                pageTranslate={this.pageTranslate}/> : null}

            </div>
          </Col>
        </Row>
      </Row>
    )
  }
}

export default PoiView;
