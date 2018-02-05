/**
 * Created by dell on 2017/5/25.
 */
import React from 'react';
import { StyleSheet, css } from 'aphrodite';
// import { MAP_CAMERA } from '../../utils/base64img';
import MAP_CAMERA from '../../assets/map_camera.png';

const styles = StyleSheet.create({
  container: {
    width: 1444,
    height: 406
  },
});

class BaiduMap extends React.Component {
  constructor(props) {
    super(props);

    let longtitude;
    let lantitude;
    if (props.makers && props.makers.length > 0) {
      const maker = props.makers[0];

      const crd = maker.srcCoordinate ? maker.srcCoordinate.split(',') : [116.404, 39.915];

      longtitude = crd[0];
      lantitude = crd[1];
    }

    this.state = {
      iconData: {
        w: 28,
        h: 34,
        l: 0,
        t: 0,
        x: 6,
        lb: 5
      },
      longtitude,
      lantitude,
      zoom: props.zoom ? props.zoom : 15,
      makers: props.makers ? props.makers : []

    };
    this.createIcon = this.createIcon.bind(this);
    this.addMaker = this.addMaker.bind(this);
    this.addPolyline = this.addPolyline.bind(this);
    this.infoWindowMsg = this.infoWindowMsg.bind(this);
  }

  componentDidMount() {
    const map = new BMap.Map('container');          // 创建地图实例
    setTimeout(() => {
      const point = new BMap.Point(this.state.longtitude, this.state.lantitude);  // 创建点坐标
      map.centerAndZoom(point, this.state.zoom);
    }, 100);

    this.setState({
      map
    });

    // 添加带有定位的导航控件
    const navigationControl = new BMap.NavigationControl({
      // 靠左上角位置
      anchor: BMAP_ANCHOR_TOP_LEFT,
      // LARGE类型
      type: BMAP_NAVIGATION_CONTROL_LARGE
    });
    map.addControl(navigationControl);

    setTimeout(() => {
      const scaleControl = new BMap.ScaleControl({ anchor: BMAP_ANCHOR_BOTTOM_LEFT });
      map.addControl(scaleControl);

      const ctrl_ove = new BMap.OverviewMapControl({ anchor: BMAP_ANCHOR_BOTTOM_RIGHT, isOpen: 1 });
      map.addControl(ctrl_ove);
    }, 200);

    map.enableScrollWheelZoom();   // 启用滚轮放大缩小，默认禁用
    map.enableContinuousZoom();    // 启用地图惯性拖拽，默认禁用},500)

    // 循环数据后创建maker
    setTimeout(
      () => {
        const makers = this.state.makers;
        makers.map(value => this.addMaker(map, value));
        this.addPolyline(map, this.state.makers);
      }
      , 500);
  }

  createIcon = () => new BMap.Icon(MAP_CAMERA, new BMap.Size(this.state.iconData.w, this.state.iconData.h), {
    imageOffset: new BMap.Size(this.state.iconData.l, this.state.iconData.t),
    anchor: new BMap.Size(this.state.iconData.w / 2, this.state.iconData.h),
    infoWindowOffset: new BMap.Size(this.state.iconData.lb + 5, 1),
    offset: new BMap.Size(this.state.iconData.x, this.state.iconData.h)
  });
  infoWindowMsg = maker => {
    const infoMsg = `${'<div style="height:247px;width:400px;font-size:16px;font-family:微软雅黑">' +
      '<span style="color:#c30909">摄像头</span>' +
      '<span style="color:#c30909">'}${maker.srcName}</span>` +
      '<span style="color:#c30909;margin-left:80px">日期: </span>' +
      `<span style="color:#c30909">${maker.captureTime}</span>` +
      `<img style="margin-top:10px" src=${maker.snapImg} />` +
      '</div>';
    return infoMsg;
  };
  addMaker = (map, maker) => {
    if (maker && maker.srcCoordinate) {
      const crd = maker.srcCoordinate.split(',');

      const point = new BMap.Point(crd[0], crd[1]);

      const marker = new BMap.Marker(point, { icon: this.createIcon() });  // 创建标注

      const $that = this;
      marker.addEventListener('click', function () {
        const infoWindow = new BMap.InfoWindow($that.infoWindowMsg(maker));
        this.openInfoWindow(infoWindow);
      });
      map.addOverlay(marker);// 将标注添加到地图中
    }
  };

  addPolyline = (map, makers = []) => {
    const points = [];
    if (makers && makers.length > 0) {
      makers.map(value => {
        if (value.srcCoordinate) {
          const crd = value.srcCoordinate.split(',');
          points.push(new BMap.Point(crd[0], crd[1]));
        }
      });
      const line = new BMap.Polyline(points, {
        strokeStyle: 'solid',
        strokeWeight: 4,
        strokeColor: '#f00',
        strokeOpacity: 0.6
      });
      map.addOverlay(line);
    }
  };

  render() {
    return (
      <div
        id="container"
        className={this.props.className ? `${this.props.className} ${css(styles.container)}` : css(styles.container)}
        style={this.props.style}
      />
    );
  }
}

export default BaiduMap;
