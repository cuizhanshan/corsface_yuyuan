/**
 * Created by Riky on 2017/3/3.
 */
import React from 'react';
import {Modal} from 'antd';

const ModalCameraTreeView = ({modalVisible}) => {

  return(
    <Modal visible={modalVisible}
           title="选择摄像头"
           footer=''
           width={1200}
           bodyStyle={{padding: 0, height: 600, overflow: 'auto'}}
    >
    </Modal>
    )


};

export default ModalCameraTreeView;


