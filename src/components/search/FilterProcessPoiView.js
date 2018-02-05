/**
 * Created by Riky on 2017/4/14.
 */
import React from 'react';
import { Timeline } from 'antd';
import classNames from 'classnames';
import styles from './FilterProcessPoiView.css';

const FilterProcessPoiView = ({ className: clazzName, current }) => {

  const steps = current || 0;
  const divClass = classNames(
    styles.container,
    clazzName
  );

  return (
    <div className={divClass}>
      <div className={styles.header}>筛查流程</div>

      <Timeline className={styles.steps}>
        <Timeline.Item dot={<div
          className={steps === 0 ? `${styles.bg} ${styles.p1Active}` : `${styles.bg} ${styles.p1}`}/>}>
          <p className={styles.text}>确定目标人物</p>
          <p
            className={steps === 0 ? `${styles.text} ${styles.subText} ${styles.activeText}` : `${styles.text} ${styles.subText}`}>
            确定目标人物的信息</p>
        </Timeline.Item>
        <Timeline.Item dot={<div
          className={steps === 1 ? `${styles.bg} ${styles.p2Active}` : `${styles.bg} ${styles.p2}`}/>}>
          <p className={styles.text}>搜索确认</p>
          <p
            className={steps === 1 ? `${styles.text} ${styles.subText} ${styles.activeText}` : `${styles.text} ${styles.subText}`}>
            搜索目标轨迹</p>
        </Timeline.Item>
        <Timeline.Item dot={<div
          className={steps === 2 ? `${styles.bg} ${styles.p3Active}` : `${styles.bg} ${styles.p3}`}/>}>
          <p className={styles.text}>显示结果</p>
          <p
            className={steps === 2 ? `${styles.text} ${styles.subText} ${styles.activeText}` : `${styles.text} ${styles.subText}`}>
            显示目标人轨迹</p>
        </Timeline.Item>
      </Timeline>

    </div>
  )
};

export default FilterProcessPoiView;


