/**
 * Created by Riky on 2017/2/24.
 */
import React from 'react';
import {Row, Col, Modal, Table} from 'antd';
import {Link} from 'dva/router';
import ImgView from '../common/ImgView';
import styles from './AlarmDescView.css';

const formatterGroup=(groups)=>{
  const rst = [];
  if( groups.length > 1 ) {
    for (let i = 0; i < groups.length; i++) {
      if (i !== 0) {
        rst.push(<div className={styles.personValue}>{groups[i] + ','}</div>);
      }
    }
  } else {
    rst.push(<div className={styles.personValue}>{groups[0] + ','}</div>);
  }
  return rst;
};

const AlarmDescView = ({modalVisible, data, onClosedModal, modalTitle}) => {


  const {judgePerson} = data;
  return (
    <Modal visible={modalVisible}
           title=''
           footer=''
           closable={false}
           onOk={() => onClosedModal()}
           onCancel={() => onClosedModal()}
           width={852}
           bodyStyle={{padding: 0, height: 757}}
           className={styles.modalBody}
    >

      <div className={styles.modalHeader}>
        <span className={styles.modalHeaderTitle}>{modalTitle ? modalTitle : '报警详情'}</span>
        <div className={styles.modalHeaderCloseBtn} onClick={() => onClosedModal()}/>
      </div>

      <Row type="flex" justify="space-between" className={styles.modalContent}>
        <Col span={14} className={styles.faceList}>
          <div className={styles.title}>人脸记录</div>

          <div className={styles.container}>

            {data && data.imgs ? data.imgs.map((value, index) => <ImgView src={value} key={index}
                                                                          className={styles.faceImg}/>) : null}
          </div>

        </Col>
        <Col span={9} className={styles.person}>
          <div className={styles.title}>目标人</div>

          <div className={styles.container}>
            <ImgView src={judgePerson ? judgePerson : null} className={styles.personImg}/>

            <div className={styles.info}>
              <div className={styles.personText}>姓名：</div>
              <div className={styles.personValue}>{judgePerson ? judgePerson.name : null}</div>
            </div>
            <div className={styles.info}>
              <div className={styles.personText}>身份证：</div>
              <div className={styles.personValue}>{judgePerson ? judgePerson.identityCard : null}</div>
            </div>
            <div className={styles.info}>
              <div className={styles.personText}>备注：</div>
              <div className={styles.personValue}>{judgePerson ? judgePerson.memo : null}</div>
            </div>
            <div className={styles.info}>
              <div className={styles.personText}>录入时间：</div>
              <div className={styles.personValue}>{judgePerson ? judgePerson.gmtCreate : null}</div>
            </div>
            <div className={styles.info}>
              <label className={styles.personText}>报警分组：</label>
              <div className={styles.personValue}>{data.alarmInfo ? data.alarmInfo.groupName : null}</div>
            </div>
            <div className={styles.info}>
              <label className={styles.personText}>所属分组：</label>
              {/*{judgePerson && judgePerson.groupList ? judgePerson.groupList.map(value => <div className={styles.personValue}>{value + '; '}</div>) : null}*/}
              {judgePerson && judgePerson.groupList ? formatterGroup(judgePerson.groupList) : ''}
            </div>
            <div className={styles.info}>
              <label className={styles.personText}>家庭地址：</label>
              <label className={styles.personValue}>{''}</label>
            </div>
            <div className={styles.info}>
              <label className={styles.personText}>电话号码：</label>
              <label className={styles.personValue}>{''}</label>
            </div>
            <div className={styles.info}>
              <label className={styles.personText}>报警等级：</label>
              <label className={styles.personValue}>{''}</label>
            </div>

            <Link className={styles.descBtn} to={judgePerson?`/face/contrast/${data.code}/${judgePerson.personId}`:null}>查看详情</Link>

          </div>

        </Col>
      </Row>
      <iframe src="about:blank" frameBorder="0" filter='progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=1)'
              className={styles.iframe}/>
    </Modal>

  )
};
export default AlarmDescView;
