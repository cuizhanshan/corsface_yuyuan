/**
 * Created by Riky on 2017/4/26.
 */

import React from 'react';
import title from '../../style/common/title.css';
import record from '../../style/record.css';
import { StyleSheet, css } from 'aphrodite/no-important';
import ImgView from '../common/ImgView';
import RateFaceCardView from '../common/RateFaceCardView';
import { Table, Popover, Button, Tabs } from 'antd';
import ImgWithBadgeView from '../common/ImgWithBadgeView';
import ExpandImgView from '../common/ExpandImgView';
import BaiduMap from '../common/BaiduMap';
// import baiduMaoOffline from 'public/baidumap_offline_v2_load';
const TabPane = Tabs.TabPane;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 1504,
    height: 836,
    background: '#151a20',
    border: '1px solid #3D515C',
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
  },
  poi: {
    width: 1444,
    color: '#fff',
    margin: '12px 30px',
  },
  coverImg: {
    width: 200,
    height: 200,
    display: 'inline-block',
  },
  img: {
    width: 150,
    height: 150,
    marginLeft: 15,
    display: 'inline-block',
  },

  info: {
    height: 200,
    display: 'inline-block',
    fontSize: 14,
    marginLeft: 5,
    fontFamily: ['SimHei', 'sans-serif'],
  },
  item: {
    display: 'block',
    width: 300,
    marginBottom: 10,
    overflow: 'hidden',
  },
  label: {
    display: 'inline-block',
    width: 80,
    textAlign: 'right',
  },
  fixFloat: {
    float: 'right',
    marginTop: 50,
  },

  list: {
    height: 453,
    border: '1px solid #3D515C',
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
  },
  content: {
    width: 1440,
    height: 413,
    overflow: 'auto',
  },
  imgViewList: {
    width: 1440,
    height: 413,
    padding: 6,
    overflow: 'auto',
  },

  faceItem: {
    margin: '6px 20px 6px 21px',
  },

  btnArea: {
    position: 'absolute',
    bottom: 15,
    height: 46,
    margin: '0 30px',
  },
  actionBtn: {
    width: 100,
    height: 46,
    color: '#fff',
    textAlign: 'center',
    background: '#109DEC',
    lineHeight: '46px',
    borderRadius: 6,
    display: 'inline-block',
  },
  previousBtn: {
    float: 'left',
    marginLeft: 20,
  },
  expand: {
    width: '1250px!important',
  },
  expandImgList: {
    margin: '15px 12px 15px 12px',
    width: 150,
    height: 150,
    display: 'inline-block',
  },
  map: {
    width: 1444,
    height: 406,
  },

});


const ImgViewList = ({ data, isSelected, onFaceCardImgClick, onFaceCardTextClick, personMatchLocus }) => {
  return (
    <div className={css(styles.imgViewList)}>
      {data && data.length > 0 ? data.map((value, i) =>
        <RateFaceCardView
          className={css(styles.faceItem)}
          key={value.id}
          data={value}
          checked={isSelected(value)}
          onImgClick={onFaceCardImgClick}
          onTextClick={onFaceCardTextClick}
        />) : null}
    </div>
  );
};


const tableProps = {
  pagination: false,
  expandedRowRender(record) {
    return (<ExpandImgView
      size={14} imgs={record.imgs} className={css(styles.expand)}
      imgClass={css(styles.expandImgList)}
    />);
  },
  scroll: {
    y: 352,
  },
  columns: [
    {
      title: '序号',
      dataIndex: 'id',
      width: 150,
    }, {
      title: '照片',
      dataIndex: 'imgs',
      width: 210,
      render: text => text && text.length > 0 ? <ImgWithBadgeView src={text[0]} count={text.length} /> : null,
    },
    {
      title: '摄像头',
      width: 170,
      dataIndex: 'srcName',
    }, {
      title: '时间',
      width: 170,
      render: (record) => {
        return (<Popover
          placement="top" content={<ImgView src={record.snapImg} />} trigger="click"
          arrowPointAtCenter
        ><Button
          className={record.popoverBtn}
        >{record.offsetTime ? record.offsetTime : record.captureTime}</Button></Popover >);
      },
    },
  ],
};

class HistoryTrackView extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      longitude: '121',
      latitude: '35',
    };
  }

  formatterGroups = (groups) => {
    const names = [];
    if (groups && groups.length > 0) {
      groups.map(value => names.push(value.name));
    }
    return names.join(',');
  };

  previousStep = () => {
    this.props.previousStep();
  };

  formatterMaps = (faceList) => {
    const maps = [];
    if (faceList && faceList.length > 0) {
      faceList.map((value) => {
        const face = {};
        face.captureTime = value.captureTime;
        face.snapImg = value.snapImg;
        face.srcCoordinate = value.srcCoordinate;
        face.srcName = value.srcName;
        maps.push(face);
      });
    }

    return maps;
  };

  render() {
    return (
      <div
        className={this.props.className ? `${css(styles.container)} ${this.props.className}` : css(styles.container)}
      >
        <div className={title.container}>
          <span className={title.text}>历史轨迹</span>
        </div>

        <div className={css(styles.poi)}>

          {this.props.poi && this.props.poi.imgs && this.props.poi.imgs.length > 0 ?
            <ImgView src={this.props.poi.imgs[0]} className={css(styles.coverImg)} /> : null}

          <div className={css(styles.info)}>
            <span className={css(styles.item)}>
              <label className={css(styles.label)}>姓名：</label>
              <span>{this.props.poi ? this.props.poi.name : ''}</span>
            </span>
            <span className={css(styles.item)}>
              <label className={css(styles.label)}>性别：</label>
              <span>{this.props.poi ? this.props.poi.gender : ''}</span>
            </span>
            <span className={css(styles.item)}>
              <label className={css(styles.label)}>身份证号：</label>
              <span>{this.props.poi ? this.props.poi.identityCard : ''}</span>
            </span>
            <span className={css(styles.item)}>
              <label className={css(styles.label)}>收入时间：</label>
              <span>{this.props.poi ? this.props.poi.gmtCreate : ''}</span>
            </span>
            <span className={css(styles.item)}>
              <label className={css(styles.label)}>分组：</label>
              <span>{this.props.poi ? this.formatterGroups(this.props.poi.groups) : ''}</span>
            </span>
            <span className={css(styles.item)}>
              <label className={css(styles.label)}>标签：</label>
              <span>{this.props.poi ? this.props.poi.impTag : ''}</span>
            </span>
          </div>
          <div className={`${css(styles.info)} ${css(styles.fixFloat)}`}>
            {this.props.poi && this.props.poi.imgs && this.props.poi.imgs.length > 0 ? this.props.poi.imgs.map((value, i) => i < 5 ?
              <ImgView key={`img_${i}`} src={value} className={css(styles.img)} /> : null) : null}
          </div>
        </div>

        <Tabs defaultActiveKey="1" className={`${css(styles.poi)} ${css(styles.list)} `}>
          <TabPane tab="列表显示" key="1">
            <Table
              rowKey={record => record.id}
              dataSource={this.props.poi && this.props.poi.faceList ? this.props.poi.faceList : null} {...tableProps}
            />
          </TabPane>
          <TabPane tab="地图显示" key="2">
            <BaiduMap makers={this.formatterMaps(this.props.poi && this.props.poi.faceList ? this.props.poi.faceList : null)} />
          </TabPane>
        </Tabs>


        <div className={`${css(styles.poi)} ${css(styles.btnArea)}`}>
          <a className={`${css(styles.previousBtn)} ${css(styles.actionBtn)}`} onClick={this.previousStep}>上一步</a>
        </div>

      </div>
    );
  }
}

export
default
HistoryTrackView;

