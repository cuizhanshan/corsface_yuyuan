/**
 * Created by Riky on 2017/4/13.
 */

import React from 'react';
import {Link} from 'dva/router'
import {StyleSheet, css} from 'aphrodite/no-important';
import MayLayout from '../../components/common/MainLayout';
import styles from './IndexPage.css'

const IndexPage = (props) => {
  return (
    <MayLayout location={props.location}>
      <div className={`${styles.container} ${styles.left}`}>
        <div className={`${styles.title} ${styles.leftTitleBg}`}></div>
        <div className={`${styles.personBg} ${styles.leftPersonBg}`}></div>
        <Link className={`${styles.btn} ${styles.faceBtn}`} to="/search/face">人脸记录筛查</Link>
        <div className={`${styles.tip} ${styles.faceTip}`}>
          <span className={styles.tipBg}/>
          <span className={styles.tipText}>从历史记录中进行查找</span>
        </div>
      </div>
      <div className={`${styles.container} ${styles.right}`}>
        <div className={`${styles.title} ${styles.rightTitleBg}`}></div>
        <div className={`${styles.personBg} ${styles.rightPersonBg}`}></div>
        <Link className={`${styles.btn} ${styles.poiBtn}`} to="/search/poi">目标人筛查</Link>
        <div className={`${styles.tip} ${styles.faceTip}`}>
          <span className={styles.tipBg}/>
          <span className={styles.tipText}>从目标人物库中进行查找</span>
        </div>
        <Link className={`${styles.btn} ${styles.newBtn}`} to="/search/new">新建目标人</Link>
        <div className={`${styles.tip} ${styles.newTip}`}>
          <span className={styles.tipBg}/>
          <span className={styles.tipText}>上传目标人物的照片进行查找</span>
        </div>
      </div>

    </MayLayout>
  )

};

export  default IndexPage;






