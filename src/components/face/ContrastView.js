/**
 * Created by Riky on 2017/3/22.
 */

import React from 'react';

import {StyleSheet, css} from 'aphrodite';
import ImgView from '../common/ImgView';

import {Row, Card, Progress,} from 'antd';
import {Link} from 'dva/router'

const styles = StyleSheet.create({
  container: {
    width: 570,
    margin: '15px auto 0',
    height: 342,
    border: '1px solid #36464F',
    background: '#151a20',
    position: 'relative',
    padding: 14
  },
  faceCard: {
    fontSize: 15,
    width: 219,
    height: 296,
    float: 'left',
    background: '#33444e',
    color: '#ffffff',
    border: 0,
    marginTop: 9,
  },
  faceDate: {
    fontFamily: 'Arial Bold',
    position: 'absolute',
    bottom: 2
  },
  img: {
    width: '100%',
    margin: '0 auto'
  },
  percent: {
    width: 100,
    float: 'left',
    height: 296,
    background: '#151a20',
    marginTop: 9,
    position: 'relative'
  },
  circle: {
    position: 'relative',
    left: 20,
    top: 80
  },
  text: {
    position: 'relative',
    fontFamily: 'SimHei',
    fontSize: 16,
    textAlign: 'center',
    color: '#ffffff',
    top: 100
  },
  photoContrast: {
    width: 78,
    height: 36,
    position: 'absolute',
    fontFamily: 'SimHei',
    fontSize: 16,
    textAlign: 'center',
    color: '#ffffff',
    bottom: 0,
    left: 12,
    background: '#339a99',
    border: '1px solid #339a99',
    borderRadius: 6
  }

});


const ContrastView = ({face, className, style}) => {

  function hasContrast(face) {
    let url;

      if(face.judgePerson){
          url = 'face/contrast/' + face.code + '/' + face.judgePerson.personId;
          return <Link to={url} className={css(styles.photoContrast)}>照片对照</Link>;
      }else if(face.mostPerson){
          url = 'face/contrast/' + face.code + '/' + face.mostPerson.personId;
          return <Link to={url} className={css(styles.photoContrast)}>照片对照</Link>;
      }else{
          return false
      }
  }

  function contrastPerson(face) {
      if(face.judgePerson){
          return (
                  <Card className={css(styles.faceCard)} bodyStyle={{padding: 5}}>
                      {face && face.judgePerson ? <ImgView src={face.judgePerson} className={css(styles.img)}/> : null}
                    <div>
                      <p>{face && face.judgePerson && face.judgePerson.name ? face.judgePerson.name : null}</p>
                      <p className={css(styles.faceDate)}>{face && face.judgePerson && face.judgePerson.identityCard ? face.judgePerson.identityCard : face.judgePerson.gmtCreate}</p>
                    </div>
                  </Card>
          );
      }else if(face.mostPerson){
          return (
                  <Card className={css(styles.faceCard)} bodyStyle={{padding: 5}}>
                      {face && face.mostPerson ? <ImgView src={face.mostPerson} className={css(styles.img)}/> : null}
                    <div>
                      <p>{face && face.mostPerson && face.mostPerson.name ? face.mostPerson.name : null}</p>
                      <p className={css(styles.faceDate)}>{face && face.mostPerson && face.mostPerson.identityCard ? face.mostPerson.identityCard : face.mostPerson.gmtCreate}</p>
                    </div>
                  </Card>
          );
      }else{
          return (
                  <Card className={css(styles.faceCard)} bodyStyle={{padding: 5}}>
                    <div>
                      <p></p>
                      <p></p>
                    </div>
                  </Card>
          )
      }
  }


  return (
    <Row className={className ? `${className} ${css(styles.container)}` : css(styles.container) } style={style}>
      <Card className={css(styles.faceCard)} bodyStyle={{padding: 5}}>
        <ImgView src={face} className={css(styles.img)}/>
        <div>
          <p>{face.name ? face.name : face.srcName}</p>
          <p className={css(styles.faceDate)}>{face.offsetTime ? face.offsetTime : face.captureTime}</p>
        </div>
      </Card>

      <div className={css(styles.percent)}>
        <Progress type="circle" format={percent => `${percent}%`} status="exception"
                  percent={face && face.percent ? parseFloat((face.percent * 100).toFixed(2)) : 0}
                  width={60} className={css(styles.circle)}/>
        <div className={css(styles.text)}>相似度</div>
        {face ? hasContrast(face) : null}
      </div>
      {face ? contrastPerson(face) : null}
    </Row>
  )

};


export default ContrastView;

