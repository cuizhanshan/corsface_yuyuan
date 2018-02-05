/**
 * Created by Riky on 2017/4/7.
 */

import React from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import SystemLayout from '../../SystemLayout';
import {StyleSheet, css} from 'aphrodite';
import {notification} from 'antd';
import NewPoiView from '../../../../components/common/NewPoiView';

class NewPoiPage extends React.Component {
  constructor(props) {
    super(props);
    this.openNotificationWithIcon = this.openNotificationWithIcon.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancelNew = this.onCancelNew.bind(this);
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'person/groupList'
    })
  }

  /**
   * 在组件更新的时候读取错误信息，提示异常更新操作
   */
  componentDidUpdate() {
    if (this.props.person && this.props.person.errorMsg) {
      this.openNotificationWithIcon('error', this.props.person.errorMsg)
      this.props.dispatch({
        type: 'group/clearMsg'
      })
    }
  }

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

  onCancelNew = () => {
    this.props.dispatch(routerRedux.goBack());
  };

  onSubmit = (value) => {
    this.props.dispatch({
      type: 'person/addByUpload',
      payload: value
    });
  };

  render() {

    return (
      <SystemLayout location={this.props.location} dispatch={this.props.dispatch}>
        {this.props.person.groupList ?
          <NewPoiView  groupList={this.props.person.groupList} onCancel={this.onCancelNew} onNew={this.onSubmit}/> : null}
      </SystemLayout>
    )
  }
}

function mapStateToProps({person}) {
  return {person}
}

export  default connect(mapStateToProps)(NewPoiPage);


