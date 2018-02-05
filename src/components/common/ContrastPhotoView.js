/**
 * Created by Riky on 2017/3/24.
 */

import React from 'react';
import title from '../../style/common/title.css';
import {StyleSheet, css} from 'aphrodite/no-important';
import {Row, Col, Table, Collapse, Button} from 'antd';
const Panel = Collapse.Panel;
import ImgView from './ImgView';
import PaginationFacetrackView from './PaginationFacetrackView';
import styles from './ContrastPhotoView.css'


const ContrastPhotoView = ({data, selectRow, pageTranslate, onClosed}) => {
  const tableProps = {
    pagination: false,
    columns: [
      {
        title: '序号',
        dataIndex: 'id',
        width: 117
      }, {
        title: '摄像头',
        dataIndex: 'srcName',
        width: 210
      },
      {
        title: '时间',
        width: 210,
        render: (record) => {
          return <div>{record.offsetTime?record.offsetTime:record.captureTime}</div>
        }
      }
    ],
    onRowClick(record, index){
      selectRow(record);
    }
  };


  const formatterGroup=(groups)=>{
    const rst = [];
    if( groups.length > 1 ) {
      for (let i = 0; i < groups.length; i++) {
        if (i !== 0) {
          rst.push(<span key={i}>{groups[i].name + ' '}</span>);
        }
      }
    } else {
      rst.push(<span key={0}>{groups[0].name + ' '}</span>);
    }
    return rst;
  };


  const {face, person, personFace, page, faceList} = data;
  return (
    <Row type="flex" justify="space-between" className={styles.container}>
      <div className={title.container}>
        <span className={title.text}>照片对照</span>
        <div className={title.closeBtn} onClick={onClosed}/>
      </div>
      <Row className={styles.content}>
        <Col className={styles.faceTrack}>
          <Collapse accordion className={styles.collapse} defaultActiveKey={['1']}>
            <Panel header={<div className={styles.panelHeader}>人脸记录</div>} key="1" className={styles.panel}>
              <div className={styles.list}>
                {face && face.imgs ? face.imgs.map((value, i) => <ImgView src={value} key={i}
                                                                          className={styles.img}/>) : null}
              </div>
            </Panel>
            <Panel header={<div className={styles.panelHeader}>镜头记录</div>} key="2" className={styles.panel}>
              <div className={styles.backImg}>
                {face && face.snapImg ? <ImgView src={face.snapImg}/> : null}
              </div>
            </Panel>
          </Collapse>
        </Col>
        <Col className={styles.contrast}>
          <div className={styles.contrastImg}/>
        </Col>
        <Col className={styles.faceTrack}>
          <Collapse accordion className={styles.collapse} defaultActiveKey={['1']}>

            <Panel header={<div className={styles.panelHeader}>识别人</div>} key="1" className={styles.panel}
                   bodyStyle={{padding: 0}}>
              <div className={styles.list}>
                {personFace && personFace.imgs ? personFace.imgs.map((value, i) => <ImgView src={value} key={i}
                                                                                            className={styles.img}/>) : null}
              </div>

            </Panel>
            <Panel header={<div className={styles.panelHeader}>镜头记录</div>} key="2" className={styles.panel}>
              <div className={styles.backImg}>
                {personFace && personFace.snapImg ? <ImgView src={data.personFace.snapImg}/> : null}
              </div>
            </Panel>
          </Collapse>
        </Col>
        <Col className={styles.person}>
          <div className={styles.info}>
            <div className={title.container} style={{border: 0, borderRadius: 0, background: '#33444e'}}>
              <span className={title.text}>照片对照</span>
            </div>
            <div className={styles.desc}>
              <ImgView src={data.person} className={styles.personImg}/>
              <div className={styles.descInfo}>
                <div className={styles.item}>
                  <label className={styles.itemText}>姓名：</label>
                  <label className={styles.itemInput}>{person ? person.name : null}</label>
                </div>
                <div className={styles.item}>
                  <label className={styles.itemText}>性别：</label>
                  <label className={styles.itemInput}>{person ? person.gender : null}</label>
                </div>
                <div className={styles.item}>
                  <label className={styles.itemText}>身份证号：</label>
                  <label
                    className={styles.itemInput}>{person && person.identityCard ? person.identityCard : null}</label>
                </div>
                <div className={styles.item}>
                  <label className={styles.itemText}>录入时间：</label>
                  <label className={styles.itemInput}>{person ? person.gmtCreate : null}</label>
                </div>
                <div className={styles.item}>
                  <label className={styles.itemText}>所属分组：</label>
                  <label className={styles.itemInput}>{person && person.groups ? formatterGroup(person.groups):''}</label>
                </div>
                <div className={styles.item}>
                  <label className={styles.itemText}>家庭地址：</label>
                  <label className={styles.itemInput}>{''}</label>
                </div>
                <div className={styles.item}>
                  <label className={styles.itemText}>电话号码：</label>
                  <label className={styles.itemInput}>{''}</label>
                </div>
                <div className={styles.item}>
                  <label className={styles.itemText}>报警等级：</label>
                  <label className={styles.itemInput}>{''}</label>
                </div>
                {/*<div className={styles.item}>*/}
                  {/*<label className={styles.itemText}>备注：</label>*/}
                  {/*<label className={styles.itemInput}>{person && person.memo ? person.memo : null}</label>*/}
                {/*</div>*/}
              </div>
            </div>

            <Table rowKey={record => record.id} className={styles.table}
                   dataSource={faceList ? faceList : null} {...tableProps}/>
            {page ?
              <PaginationFacetrackView className={styles.pagination} page={page} pageTranslate={pageTranslate}/> : null}

          </div>
        </Col>
      </Row>
    </Row>
  )
};

export default ContrastPhotoView;
