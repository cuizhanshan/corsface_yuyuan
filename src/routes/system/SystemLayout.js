/**
 * Created by Riky on 2017/3/28.
 */
import React from 'react';

import MayLayout from '../../components/common/MainLayout';
import SliderBarView from '../../components/system/SliderBarView';
import {routerRedux} from 'dva/router';
import {StyleSheet, css} from 'aphrodite';

const styles = StyleSheet.create({
  sliderBar:{
    position:'absolute',
    top:0,
    left:0,
    height:'100%'
  },
  content: {
    position:'absolute',
    display: 'inline-block',
    left:256,
    background: '#232c31',
    width:1604
  }
});
const SystemLayout = ({dispatch, location, children}) => {

  const SliderBarViewProps = {
    onMenuItemClick(key){
      switch (key) {
        case 'person':
          dispatch(routerRedux.push('/system'));
          break;
        case 'group':
          dispatch(routerRedux.push('/system/aims/group'));
          break;
        case 'import':
          dispatch(routerRedux.push('/system/aims/import'));
          break;
        case 'photoMatch':
          dispatch(routerRedux.push('/system/aims/photoMatch'));
          break;
        case 'camera':
          dispatch(routerRedux.push('/system/facility/camera'));
          break;
        case 'fGroup':
          dispatch(routerRedux.push('/system/facility/fGroup'));
          break;
        case 'config':
          dispatch(routerRedux.push('/system/config'));
          break;
        case 'alarmCfg':
          dispatch(routerRedux.push('/system/alarmCfg'));
          break;
        case 'my':
          dispatch(routerRedux.push('/system/my'));
          break;
      }
    }
  };

  return (
    <MayLayout location={location}>
      <SliderBarView location={location} {...SliderBarViewProps} className={css(styles.sliderBar)}/>
      <div className={css(styles.content)}>
        {children}
      </div>
    </MayLayout>
  )

};

export default SystemLayout;
