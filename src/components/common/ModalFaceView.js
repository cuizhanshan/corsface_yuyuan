/**
 * Created by Riky on 2017/4/25.
 */
import React from 'react';
import {Modal} from 'antd';
import ImgView from '../common/ImgView';
import {StyleSheet, css} from 'aphrodite/no-important';
import modalFaceView from './ModalFaceView.css'

const styles = StyleSheet.create({
  body: {
    top: 94
  },
  header: {
    height: 36,
    width: '100%',
    background: '#304351',
    color: '#70c8ea',
    border: '1px solid #3d515d',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    position: 'relative'
  },
  title: {
    width: '100%',
    textAlign: 'center',
    display: 'block',
    fontSize: 16,
    fontFamily: ['SimHei', 'sans-serif'],
    color: '#70c8ea',
    lineHeight: '36px'
  },


  /*container: {
   width: 1370,
   height: 715,
   background: '#232C31'
   },*/

  container: {
    // width: 1370,
    width: 1204,
    height: 715,
    background: '#232C31',
    zIndex: 9999
  },
  iframe: {
    position: 'absolute',
    visibility: 'inherit',
    top: 0,
    left: 0,
    height: 751,
    width: 1204,
    zIndex: -1
  },

  list: {
    width: 777,
    height: 703,
    background: '#151a20',
    display: 'inline-block',
    padding: '12px 0',
    overflow: 'auto'
  },
  snap: {
    /* width: 570,
     height: 322,*/
    width: 400,
    height: 226,
    display: 'inline-block',
    float: 'right',
    marginRight: 12,
    marginTop: 24
  },
  img: {
    /*width: 210,
     height: 210,
     margin: '12px  23px 0 20px',*/

    /* width: 72,
     height: 72,
     margin: '12px 19px 0 19px',*/

    width: 144,
    height: 144,
    margin: '12px 26px 0 19px',


    border: '1px solid #3d515d',
    background: '#33444e',
    display: 'inline-block'
  }
});


const ModalFaceView = ({visible, onClosed, data}) => {


  // width={1370}
  return (
    <Modal visible={visible}
           title=''
           footer=''
           closable={false}
           onOk={() => onClosed()}
           onCancel={() => onClosed()}
           width={1204}
           bodyStyle={{padding: 0, height: 751}}
           className={css(styles.body)}
    >

      {/*<div className={css(styles.header)}>
       <span className={css(styles.title)}>人脸记录详情</span>
       <div className={ModalFaceView.closeBtn} onClick={() => onClosed()}/>
       </div>

       <div className={css(styles.container)}>

       <div className={css(styles.list)}>
       {data && data.imgs && data.imgs.length > 0 ? data.imgs.map((item, index) => <ImgView src={item}
       className={css(styles.img)}
       key={index}/>) : null}
       </div>
       <div className={css(styles.snap)}>
       <img src={data && data.snapImg ? data.snapImg : null} alt="" height='100%'/>
       </div>

       </div>*/}


      <div className={css(styles.header)}>
        <span className={css(styles.title)}>人脸记录详情</span>
        <div className={modalFaceView.closeBtn} onClick={() => onClosed()}/>
      </div>

      <div className={css(styles.container)}>
        <div className={css(styles.list)}>
          {data && data.imgs && data.imgs.length > 0 ? data.imgs.map((item, index) => <ImgView src={item}
                                                                                               className={css(styles.img)}
                                                                                               key={index}/>) : null}
        </div>

        <div className={css(styles.snap)}>
          <img src={data && data.snapImg ? data.snapImg : null} alt="" height='100%'/>
        </div>

        <iframe src="about:blank" frameBorder="0" filter='progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=1)'
                className={css(styles.iframe)}>

        </iframe>
      </div>


    </Modal>
  )

};


export default ModalFaceView;
