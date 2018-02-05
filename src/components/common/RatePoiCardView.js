/**
 * Created by Riky on 2017/4/25.
 */
import React, {PropTypes} from 'react';
import {Card, Progress} from 'antd';
import CheckImgView from './CheckImgView';
import style from './FaceCardView.css';
import {StyleSheet, css} from 'aphrodite/no-important';
import RatePoiCardViewImg from './RatePoiCardViewImg.css'

const styles = StyleSheet.create({
  container: {
    width: 160,
    height: 233,
    display: 'inline-block',
    position: 'relative',
    fontSize: 15,
    borderRadius: 0,
    border: 0,
    color: '#ffffff',
    cursor: 'pointer',
    background: '#33444e'
  },
  name: {
    fontFamily: ['SimHei', 'sans-serif'],
    width: 150,
    height: 22,
    overflow: 'hidden'
  },
  date: {
    fontFamily: ['Arial Bold', 'sans-serif'],
    position: 'absolute',
    bottom: 2
  },

  content: {
    width: 150,
    height: 150,
    display: 'block',
    position: 'relative'
  },


});


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



const RatePoiCardView = ({data, className, imgClass, checked, style, onTextClick, onImgClick}) => {

  const {poiDetailData,matchValue} = data;

  return (
    <Card className={className ? `${className} ${css(styles.container)}` : css(styles.container)}
          bodyStyle={{padding: 5}} style={style}>
      <div className={imgClass ? `${imgClass} ${css(styles.content)}` : css(styles.content)} style={style}
           onClick={onImgClick ? () => onImgClick(poiDetailData) : null}>
        <img src={getPersonImg(poiDetailData)} alt={'face img'} height='100%'/>
        {checked ? <div className={RatePoiCardViewImg.icon}/> : null}
      </div>
      <Progress percent={parseFloat((matchValue * 100).toFixed(2))}/>
      <div onClick={onTextClick ? () => onTextClick(data) : null}>
        <p className={css(styles.name)}>{ poiDetailData.name}</p>
        <p className={css(styles.date)}>{poiDetailData.gmtCreate }</p>
      </div>
    </Card>
  )
};


/**
 * 定义默认参数，以及传入参数类型的校验
 * @type {{data, onFaceCardClick: *, className: *, imgClass: *, style: *, checked: *}}
 */
RatePoiCardView.propTypes = {
  data: PropTypes.object.isRequired,
  onFaceCardClick: PropTypes.func,
  className: PropTypes.any,
  imgClass: PropTypes.any,
  style: PropTypes.any,
  checked: PropTypes.bool
};

export default RatePoiCardView;
