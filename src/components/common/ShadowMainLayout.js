/**
 * Created by Riky on 2017/2/21.
 */
import React from 'react';
import {Link} from 'dva/router';
import {Layout, Menu,Icon, Button} from 'antd';
import styles from './ShadowMainLayout.css';
import pathToRegexp from 'path-to-regexp';

const {Header, Content} = Layout;

const {Item} = Menu;

const ShadowMainLayout = (props) => {

  function SelectedKey() {
    const match = pathToRegexp('/:foo/:bar?/:id?/:action?/:more?').exec(props.location.pathname);
    if (!match || match[1] == '') {
      return ['index'];
    } else {
      return [match[1]];
    }

  }

  const handleClick = (e) => {
    alert(e.key);
  };

  return (
    <Layout className={styles.normal}>
      <Content className={styles.content}>
        {props.children}
      </Content>

    </Layout>
  )

};

export default ShadowMainLayout;


