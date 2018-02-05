/**
 * Created by Riky on 2017/2/22.
 * 通用图片展示卡
 */
import React from 'react';

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


const getPersonImg = (poi) => {
  if (poi && poi.uploadImgs && poi.uploadImgs.length > 0) {
    return poi.uploadImgs[0];
  }

  if (poi && poi.imgs && poi.imgs.length > 0) {
    return poi.imgs[0];
  }

  return poi;
};


const ImgView = ({ className, style, src, alt, onImgClick }) => {
  return (
    <div className={className || ''} style={style} onClick={onImgClick ? () => onImgClick(src) : null}>
      <img src={getPersonImg(src)} alt={alt} width="100%" height="100%" />
    </div>
  );
};
export default ImgView;
