/**
 * Created by Riky on 2017/4/11.
 * 带有选中图标的图片展示卡
 */
import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import styles from './CheckingImgView.css'

/**
 *
 * @param className
 * @param style
 * @param src
 * @param alt
 * @param onImgClick
 * @returns {XML}
 * @constructor
 */


const CheckImgView = ({className, style, src, alt, onClick, checked}) => {
  return (
    <div className={className ? `${className} ${styles.container}` : styles.container} style={style}
         onClick={onClick ? () => onClick(src) : null}>
      <img src={src.url} alt={alt} height='100%'/>
      {checked ? <div className={styles.icon}/> : null}
    </div>
  )
};
export default CheckImgView;
