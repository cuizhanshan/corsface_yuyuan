/**
 * Created by Riky on 2017/3/23.
 */
import React from 'react';

import {StyleSheet, css} from 'aphrodite';

import {Modal, Button} from 'antd';


import styles from '../../style/common/confirm.css';
import titleStyle from '../../style/common/title.css';


const ConfirmModal = ({modalVisible, title, onSubmit, onClosedModal, content}) => {

  return (
    <Modal visible={modalVisible}
           // key={this.state && this.state.action && this.state.action =='add'? this.state.record.id:Math.random()+'' }
           title=''
           footer=''
           onOk={() => onClosedModal()}
           onCancel={() => onClosedModal()}
           width={400}
           bodyStyle={{padding: 0, height: 200, overflow: 'auto'}}
           className={styles.container}>

      <div className={titleStyle.container}>
        <span className={titleStyle.text}>{title ? title : '确认操作'}</span>
        <div className={titleStyle.closeBtn} onClick={() => onClosedModal()}/>
      </div>

      <div className={styles.content}>
        您将执行{content ? content : null}操作，将会引起数据变化，是否继续执行？
      </div>

      <div className={styles.footer}>
        <Button type='primary' className={styles.btn} onClick={() => onSubmit()}>确定</Button>
        <Button type='primary' className={styles.btn} onClick={() => onClosedModal()}>取消</Button>
      </div>
    </Modal>
  )
};

export default ConfirmModal;
