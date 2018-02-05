/**
 * Created by Riky on 2017/3/13.
 */
import React from 'react';
import {Modal, Row, Col, Menu, Dropdown, Button, Icon, message} from 'antd';
import ImgView from '../common/ImgView';
import ContrastView from '../face/ContrastView';
import styles from './ModalFaceDescView.css';


const ModalFaceDescView = ({modalVisible, onClosedModal, data, showConfirmModal, onRefreshMatch}) => {

  const {imgs, snapImg, code,alarmed, mostPerson, judgePerson, percent} = data;

  function handleMenuClick(e) {
    showConfirmModal({type: e.key});
  }

  const onRefresh = () => {
    const query = {
      type: '4',
      facetrackId: code
    };
    onRefreshMatch(query);
  };


  // bodyStyle={{padding: 0, height: 822}}

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">新建目标</Menu.Item>
      {/*<Menu.Item key="2">现有目标</Menu.Item>*/}
      <Menu.Item key="3">相似目标</Menu.Item>
    </Menu>
  );

  return (
    <Modal visible={modalVisible}
           title=''
           footer=''
           closable={false}
           onOk={() => onClosedModal()}
           onCancel={() => onClosedModal()}
           width={1370}
           bodyStyle={{padding: 0, height: 700}}
           className={styles.modalBody}
    >

      <div className={styles.modalHeader}>
        <span className={styles.modalHeaderTitle}>人脸记录详情</span>
        <div className={styles.modalHeaderCloseBtn} onClick={() => onClosedModal()}/>
      </div>

      <Row type="flex" justify="space-between" className={styles.content}>

        <Col className={styles.faceList}>
          {imgs ? imgs.map((item, index) => <ImgView src={item} className={styles.faceImg} key={index}/>) : null}
        </Col>
        <Col className={styles.info}>
          {snapImg ? <ImgView src={snapImg} className={styles.snapImg} key='sn'/> : null}
          <ContrastView face={data}/>
        </Col>
      </Row>

      <Row type="flex" justify="space-between" className={styles.footer}>


        <Button type="primary" className={styles.refreshMatch} onClick={onRefresh}>重新匹配</Button>

        <Dropdown overlay={menu}>
          <Button className={styles.dropDownBtn}>
            关联目标 <Icon type="down" className={styles.downIcon}/>
          </Button>
        </Dropdown>
      </Row>

    </Modal>
  )
};
export default ModalFaceDescView;
