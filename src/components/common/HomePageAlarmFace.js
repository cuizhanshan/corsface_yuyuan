
import React from 'react';
import {Row, Progress} from 'antd';
import {StyleSheet,css} from 'aphrodite';
import FacetrackBigCardView from './FacetrackBigCardView';
import HomeFaceCardView from './HomeFaceCardView'
import AnonymousFaceCard from './AnonymousFaceCard'


const styles = StyleSheet.create({
  text:{
    position: 'relative',
    fontFamily: 'SimHei',
    fontSize: 16,
    textAlign: 'center',
    color: '#ffffff',
    top:10
  },
  wrap:{
    float:'left',
    width:200,
    height:200
  }
});

const AlarmFaceView = ({data, className, style, faceViewClass,smFaceViewClass,alarmClass, circleViewClass, onClick,circleWidth,resetImg,smResetImg,alarmHeader}) => {
 const toggleFaceCard = () =>{
  if(data.judgePerson){
    return <HomeFaceCardView data={data.judgePerson} className={smFaceViewClass} resetImg={smResetImg}/>
    }else{
       return <AnonymousFaceCard className={faceViewClass} resetImg={resetImg}/>
    }
   }

  return (
    <Row className={className} style={style}>
      <div className={alarmHeader}>
        <FacetrackBigCardView data={data} className={faceViewClass} resetImg={resetImg} alarmClass={alarmClass?alarmClass:''}/>
        <div className={circleViewClass}>
          <Progress showInfo={false} type="circle" format={percent => `${percent}%`} status="exception" percent={parseFloat((data.percent*100).toFixed(2))} width={circleWidth?circleWidth:60}/>
          <div className={css(styles.text)}>相似度</div>
        </div>
        <div className={css(styles.wrap)}>
          {toggleFaceCard()}
          {toggleFaceCard()}
          {toggleFaceCard()}
          {toggleFaceCard()}
        </div>

      </div>
      <div>

      </div>

    </Row>
  )};


export default AlarmFaceView;


