/**
 * Created by Riky on 2017/4/19.
 */
import React from 'react';
import {Icon} from 'antd';
import {StyleSheet, css} from 'aphrodite/no-important'

const styles = StyleSheet.create({
  container: {
    width: 96,
    height: 96,
    padding: 8,
    borderRadius: 4,
    border: '1px solid #d9d9d9',
    position: 'relative',
  },
  info: {
    height: 78,
    width:78
  },

  action: {
    width: 78,
    height: 78,
    display: 'block',
    position: 'absolute',
    left: '50%',
    top: '50%',
    opacity: 0,
    transform: 'translate(-50%, -50%)',
    zIndex: '10',
    whiteSpace: 'nowrap',
    textAlign: 'center',
    transition: 'all .3s',
    ':hover': {
      opacity: 0.5,
      background: '#000000'
    }
  },

  icon: {
    position: 'relative',
    top: '44%',
    zIndex: 10,
    transition: 'all .3s',
    cursor: 'pointer',
    fontSize: 16,
    width: 16,
    color: 'rgba(255, 255, 255, 0.91)',
    margin: '0 4px'
  }

});
const ActionImgView = ({className, onPreview, onDelete, file}) => {
  const previewImg = () => {
    onPreview(file)
  };
  const deleteImg = () => {
    onDelete(file);
  };
  return (
    <div className={className ? `${css(styles.container)} ${className}` : css(styles.container)}>
      <div >
        <img src={file.url} alt="info" className={css(styles.info)}/>
      </div>
      <span className={css(styles.action)}>
        <Icon type="eye-o" className={css(styles.icon)} onClick={previewImg}/>
        <Icon type="delete" className={css(styles.icon)} onClick={deleteImg}/>
      </span>
    </div>
  )
};

export default ActionImgView;

