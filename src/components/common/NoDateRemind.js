/**
 * Created by cuizhanshan on 2017/6/12.
 */
import React from 'react';
import {StyleSheet, css} from 'aphrodite';
import {Icon} from 'antd'
const styles = StyleSheet.create({
  remindControl: {
    position: 'absolute',
    marginTop:10,
    height: 200,
    // width: 1798
    width: '100%'
  },
  remindContent: {
    color: '#70c8ea',
    textAlign:'center'

  }
})
class NoDateRemind extends React.Component{
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div style={{display:this.props.visible}} className={css(styles.remindControl)}>
        <div className={css(styles.remindContent)}><Icon type="exclamation-circle-o" />没有相关搜索内容，请重新搜索</div>
      </div>
    )
  }
}
export  default NoDateRemind;
