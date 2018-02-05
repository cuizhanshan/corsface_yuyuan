/**
 * Created by Jason on 2017/7/12.
 */
import React from 'react';
import $ from 'jquery';
import { connect } from 'dva';

import { Row, Col, Menu, Dropdown, Icon } from 'antd';

const VideoView = ({classVlcContent, classVideoStyle, mrl, videoId}) => {
  return(
    <div className={classVlcContent} >
      {/* {this.renderCamera()}*/}
      <object
        id={videoId} type="application/x-vlc-plugin" width="595"
        height="365"
        className={classVideoStyle}
      >
        <div>不支持插件</div>
        {/* <param name='mrl' value={ this.props.index.currentCamera.debugUrl}/>*/}
        {/* <param name='mrl' value={ 'rtsp://admin:bjoffice001@192.168.1.64:554'}/>*/}
        {/* <param name='mrl' value={ this.props.index.currentCamera?this.props.index.currentCamera.debugUrl:null}/>*/}
        <param name="mrl" value={mrl} />
        <param name="volume" value="50" />
        <param name="wmode" value="Opaque" />
        <param name="autoplay" value="true" />
        <param name="play" value="true" />
        <param name="quality" value="high" />
        <param name="loop" value="false" />
        <param name="fullscreen" value="true" />
        <param name="toolbar" value="false" />
      </object>

    </div>
  )
}

export default VideoView
