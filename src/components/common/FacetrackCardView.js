/**
 * Created by Riky on 2017/2/22.
 * faceTrack 展示卡
 *
 */
import React, {PropTypes} from 'react';
import {Card} from 'antd';
import ImgView from './ImgView';
import styles from './FaceCardView.css';

/**
 *
 * @param data   需要展示的数据
 * @param onImgClick 图片点击之后的回调方法
 * @param className 外部传入的样式
 * @param style 传入的style
 * @returns {XML}
 * @constructor
 */
const FacetrackCardView = ({data, onImgClick, className,alarmClass,style,onFaceCardClick,resetImg}) => {
  return (
    <Card className={className ? `${styles.container} ${className}` : styles.container} bodyStyle={{padding: 10}} style={style} onClick={onFaceCardClick ?
      () => onFaceCardClick(data) : null}>
      <ImgView src={data} className={`${styles.imgView} ${resetImg}`} onImgClick={onImgClick}/>
      {data.alarmed?<div className={alarmClass ?`${alarmClass} ${styles.alarmImg} ${styles.IndexAlarmImg}`:styles.alarmImg}/>:null}
      <div>
        {/*{data.alarmed? <p className={styles.alarmText}>{data.name ? data.name : data.srcName}</p>: <p>{data.name ? data.name : data.srcName}</p>}
*/}
        <p className="">{data.name ? data.name : data.srcName}</p>
        <p className={styles.fixDateTwo}>{data.offsetTime ? data.offsetTime : data.captureTime}</p>
      </div>
    </Card>
  )
};

/**
 * 定义默认参数，以及传入参数类型的校验
 * @type {{data: ((()=>any)|*), onImgClick, className, style}}
 */

FacetrackCardView.propTypes = {
  data: PropTypes.object.isRequired,
  onImgClick: PropTypes.func,
  className: PropTypes.any,
  style: PropTypes.any
};

export default FacetrackCardView;
