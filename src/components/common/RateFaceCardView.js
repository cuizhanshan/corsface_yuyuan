/**
 * Created by Riky on 2017/4/25.
 */
import React, {PropTypes} from 'react';
import {Card, Progress} from 'antd';
import CheckImgView from './CheckImgView';
import style from './FaceCardView.css';
import {StyleSheet, css} from 'aphrodite/no-important';
import RateFaceCardViewImg from './RateFaceCardViewImg.css'

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



const RateFaceCardView = ({data, className, imgClass, checked, style, onTextClick, onImgClick}) => {

  const {ftInfoData,matchValue} = data;
  return (
    <Card className={className ? `${className} ${css(styles.container)}` : css(styles.container)}
          bodyStyle={{padding: 5}} style={style}>
      <div className={imgClass ? `${imgClass} ${css(styles.content)}` : css(styles.content)} style={style}
           onClick={onImgClick ? () => onImgClick(ftInfoData) : null}>
        <img src={ftInfoData && ftInfoData.imgs && ftInfoData.imgs.length > 0 ? ftInfoData.imgs[ftInfoData.imgs.length - 1] : ''} alt={'face img'} height='100%'/>
        {checked ? <div className={RateFaceCardViewImg.icon}/> : null}
      </div>
      <Progress percent={parseFloat((matchValue * 100).toFixed(2))}/>
      <div onClick={onTextClick ? () => onTextClick(data) : null}>
        <p className={css(styles.name)} title={ftInfoData.srcName}>{ ftInfoData.srcName}</p>
        <p className={css(styles.date)}>{ftInfoData.offsetTime ? ftInfoData.offsetTime : ftInfoData.captureTime }</p>
      </div>
    </Card>
  )
};


/**
 * 定义默认参数，以及传入参数类型的校验
 * @type {{data, onFaceCardClick: *, className: *, imgClass: *, style: *, checked: *}}
 */
RateFaceCardView.propTypes = {
  data: PropTypes.object.isRequired,
  onFaceCardClick: PropTypes.func,
  className: PropTypes.any,
  imgClass: PropTypes.any,
  style: PropTypes.any,
  checked: PropTypes.bool
};

export default RateFaceCardView;
