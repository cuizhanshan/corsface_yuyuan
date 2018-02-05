/**
 * Created by Ethan on 2017/7/19.
 */
import React from 'react';
import { routerRedux } from 'dva/router';
import { StyleSheet, css } from 'aphrodite';
import MayLayout from '../../components/common/MainLayout';
import SliderBarView from '../../components/analysis/AnalysisSlideView';


const styles = StyleSheet.create({
  content: {
    width: '1620px',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: '260px',
    paddingTop: '40px'
    // backgroundColor: 'rgba(243,243,243,1)'
  },
  searchBar: {
    position: 'absolute',
    top: 0,
    left: '260px',
    paddingTop: '10px'
  },
  title: {
    position: 'absolute',
    top: 0,
    left: '260px',
    textAlign: 'center',
    height: '36px',
    fontSize: '16px',
    lineHeight: '36px',
    fontFamily: 'SimHei, sans-serif',
    color: '#70c8ea',
    background: '#304351',
    border: '1px solid #304351',
    position: 'relative'
  }
});
const AnalysisLayout = ({ dispatch, location, children }) => {
  const SliderBarViewProps = {
    onMenuItemClick(key) {
      switch (key) {
        case 'traffic':
          dispatch(routerRedux.push('/analysis'));
          break;
        case 'camera':
          dispatch(routerRedux.push('/analysis/camera'));
          break;
      }
    }
  };

  return (
    <MayLayout location={location}>
      <SliderBarView location={location} {...SliderBarViewProps} className={css(styles.sliderBar)}/>
      {/* <div className={css(styles.title)}>*/}
      {/* 流量统计*/}
      {/* </div>*/}
      <div className={css(styles.content)}>

        {children}
      </div>
    </MayLayout>
  );
};

export default AnalysisLayout;
