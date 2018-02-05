/**
 * Created by Riky on 2017/2/22.
 */

import React from 'react';
import {Modal} from 'antd';
import styles from './ModalFaceView.css';
import ImgView from '../common/ImgView';


const ModalFaceView = ({modalVisible, onClosedModal,data}) => {

  return (
    <Modal visible={modalVisible}
           title=''
           footer=''
           closable={false}
           onOk={()=>onClosedModal()}
           onCancel={()=>onClosedModal()}
           width={757}
           bodyStyle={{padding: 0, height: 739}}
           className={styles.modalBody}
    >

      <div className={styles.modalHeader}>
        <span className={styles.modalHeaderTitle}>人脸记录详情</span>
        <div className={styles.modalHeaderCloseBtn} onClick={() => onClosedModal()}/>
      </div>
      <div className={styles.container}>
        {data?data.map((item, index) => <ImgView src={item} className={styles.faceImg} key={index}/>):null}
      </div>

    </Modal>
  )

};


export default ModalFaceView;
