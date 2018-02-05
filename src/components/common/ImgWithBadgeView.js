/**
 * Created by Riky on 2017/3/12.
 */
import React from 'react';
import {Badge} from 'antd';
import ImgView from './ImgView';
import styles from './ImgWithBadgeView.css';

const ImgWithBadgeView = ({src,count}) => {
  return(
    <div className={styles.container}>
      <ImgView src={src} className={styles.img}/>
      <Badge count={count} className={styles.badge}/>
    </div>
  )
};

export default ImgWithBadgeView;

