/**
 * Created by Riky on 2017/4/25.
 */
import React, {PropTypes} from 'react';
import {Card, Progress} from 'antd';
import CheckImgView from './CheckImgView';
import style from './FaceCardView.css';
import styles from './CheckedFaceCardView.css';


/**
 *
 * @param data
 * @param className
 * @param imgClass
 * @param checked
 * @param style
 * @param onTextClick
 * @param onImgClick
 * @returns {XML}
 * @constructor
 */

const getPersonImg = (poi) => {
  if (poi && poi.uploadImgs && poi.uploadImgs.length > 0) {
    return poi.uploadImgs[0];
  }

  if (poi && poi.imgs && poi.imgs.length > 0) {
    return poi.imgs[0];
  }

  return poi;
};

const CheckedFaceCardView = ({data, className, imgClass, checked, style, onTextClick, onImgClick}) => {


  return (
    <Card className={className ? `${className} ${styles.container}` : styles.container}
          bodyStyle={{padding: 5}} style={style}>
      <div className={imgClass ? `${imgClass} ${styles.content}` : styles.content} style={style}
           onClick={onImgClick ? () => onImgClick(data) : null}>
        <img src={getPersonImg(data)} alt={'face img'} height='100%'/>
        {checked ? <div className={styles.icon}/> : null}
      </div>
      <div onClick={onTextClick ? () => onTextClick(data) : null}>
        <p className={styles.name}>{data.name ? data.name : data.srcName}</p>
        <p className={styles.date}>{data.captureTime ? data.captureTime : data.gmtCreate}</p>
      </div>
    </Card>
  )
};


/**
 * 定义默认参数，以及传入参数类型的校验
 * @type {{data, onFaceCardClick: *, className: *, imgClass: *, style: *, checked: *}}
 */
CheckedFaceCardView.propTypes = {
  data: PropTypes.object.isRequired,
  onFaceCardClick: PropTypes.func,
  className: PropTypes.any,
  imgClass: PropTypes.any,
  style: PropTypes.any,
  checked: PropTypes.bool
};

export default CheckedFaceCardView;
