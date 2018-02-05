/**
 * Created by Riky on 2017/3/12.
 */
import React from 'react';
import ImgView from './ImgView';
import {StyleSheet, css} from 'aphrodite/no-important'


import {EXPAND_IMG_SIZE} from '../../utils/constant';


const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: 1700,
    background: '#151a20'
  },
  img: {
    margin: '15px 18px 15px 18px',
    width: 150,
    height: 150,
    display: 'inline-block'
  }
});


const ExpandImgView = ({className, imgClass, imgs, size, style}) => {

  const IMG_SIZE = size ? size : EXPAND_IMG_SIZE;

  return (
    <div className={className ? `${className} ${css(styles.container)}` : css(styles.container)} style={style}>
      {imgs ? imgs.map((value, i) => {
          return i < IMG_SIZE ? <ImgView src={value} key={i}
                                         className={imgClass ? `${imgClass} ${css(styles.img)}` : css(styles.img)}/> : null
        }
      ) : null}
    </div>
  )
};
export default ExpandImgView;

