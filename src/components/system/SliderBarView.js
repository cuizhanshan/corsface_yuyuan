/**
 * Created by Riky on 2017/3/27.
 */
import React from 'react';
import {StyleSheet, css} from 'aphrodite';
import {Menu} from 'antd';
import pathToRegexp from 'path-to-regexp';
const SubMenu = Menu.SubMenu;

const styles = StyleSheet.create({
  container: {
    width: 226,
    height: '100%',
    background: '#044F6C',
    display: 'inline-block'
  }
});
class SliderBarView extends React.Component {

  constructor(props) {
    super(props);
    const match = pathToRegexp('/system/:module?/:id?/:foo?/:foo2?').exec(props.location.pathname);
    const current = match[2] ? match[2] : (match[1] ? match[1] : 'person');
    const openKeys = match[1] ? [match[1]] : ['aims'];
    this.state = {
      current: current,
      openKeys: openKeys,
    };
  }

  handleClick = (e) => {
    this.props.onMenuItemClick(e.key);
  };
  onOpenChange = (openKeys) => {
    if (!Array.prototype.find) {
      Array.prototype.find = function(predicate) {
        'use strict';
        if (this == null) {
          throw new TypeError('Array.prototype.find called on null or undefined');
        }
        if (typeof predicate !== 'function') {
          throw new TypeError('predicate must be a function');
        }
        var list = Object(this);
        var length = list.length >>> 0;
        var thisArg = arguments[1];
        var value;

        for (var i = 0; i < length; i++) {
          value = list[i];
          if (predicate.call(thisArg, value, i, list)) {
            return value;
          }
        }
        return undefined;
      };
    }
    const state = this.state;
    const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
    // console.log('latestOpenKey:',latestOpenKey);
    const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));
    // console.log('latestCloseKey:',latestCloseKey);
    // var openKey = state.openKeys;
    // const aims = "aims";
    // const facility = "facility";


    // if (openKey[0] === aims){
    //   nextOpenKeys = this.getAncestorKeys(facility).concat(facility);
    // }
    // if (openKey[0] === facility){
    //   nextOpenKeys = this.getAncestorKeys(aims).concat(aims);
    // }
    // var latestOpenKey = null;
    // openKeys.map(function (value) {
    //   if (openKey>-1){
    //     latestOpenKey = value[0];
    //   }
    // });

    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = this.getAncestorKeys(latestCloseKey);
    }
    this.setState({openKeys: nextOpenKeys});
  };

  getAncestorKeys = (key) => {
    const map = {
      group: ['aims'],
      import: ['aims'],
      photoMatch: ['aims']
    };
    return map[key] || [];
  };


  render() {
    return (
      <div className={this.props.className ? `${css(styles.container)} ${this.props.className}` : css(styles.container)}
           style={this.props.style ? this.props.style : {}}>
        <Menu
          openKeys={this.state.openKeys}
          selectedKeys={[this.state.current]}
          mode="inline"
          onOpenChange={this.onOpenChange}
          onClick={this.handleClick}
        >
          <SubMenu key="aims" title={<span>目标管理</span>}>
            <Menu.Item key="person">名单管理</Menu.Item>
            <Menu.Item key="group">分组管理</Menu.Item>
            <Menu.Item key="import">导入管理</Menu.Item>
            <Menu.Item key="photoMatch">以图搜人</Menu.Item>
          </SubMenu>
          <SubMenu key="facility" title={<span>摄像头管理</span>}>
            <Menu.Item key="camera">设备管理</Menu.Item>
            <Menu.Item key="fGroup">分组管理</Menu.Item>
          </SubMenu>
          <Menu.Item key="alarmCfg">报警管理</Menu.Item>
          <Menu.Item key="my">个人中心</Menu.Item>
          <Menu.Item key="config">系统设置</Menu.Item>
        </Menu>
      </div>
    )
  }
}

export default SliderBarView;
