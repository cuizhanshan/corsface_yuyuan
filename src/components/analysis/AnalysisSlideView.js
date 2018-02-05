/**
 * Created by Riky on 2017/3/27.
 */
import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Menu, Icon, Button } from 'antd';
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


class AnalysisSlideView extends React.Component {
  handleClick = (e) => {
    this.props.onMenuItemClick(e.key);
    // console.log(e.key)
  };
  getSelectedKeys = () => {
    const match = pathToRegexp('/:foo?/:bar?').exec(this.props.location.pathname)
    if(match[2]){
      return [match[2]]
    }
    return ['traffic']
  }

  render() {
    return (
      <div style={{ width: 240, height: '100%', backgroundColor: '#044F6C' }}>
        <Menu
          selectedKeys={this.getSelectedKeys()}
          mode="inline"
          theme="dark"
          onClick={this.handleClick}
        >
          <Menu.Item key="traffic" >
            <span>流量统计</span>
          </Menu.Item>
          <Menu.Item key="camera">
            <span>摄像头统计</span>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default AnalysisSlideView;
