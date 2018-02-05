/**
 * Created by Riky on 2017/2/23.
 */

import React from 'react';
import {Row, Progress} from 'antd';
import {StyleSheet,css} from 'aphrodite';
import FacetrackCardView from './FacetrackCardView';
import AnonymousFaceCard from './AnonymousFaceCard'
import HomeFaceCardView from './HomeFaceCardView';

const styles = StyleSheet.create({
  text:{
    position: 'relative',
    fontFamily: 'SimHei',
    fontSize: 16,
    textAlign: 'center',
    color: '#ffffff',
    top:10
  }
});

const HomeAlarmFaceView = ({data, className, style, faceViewClass,faceViewTwoClass,faceViewJudgeTwoClass,alarmClass, circleViewClass, onClick,circleWidth,resetImg}) => {
  const toggleFaceCard = () =>{
    if(data.judgePerson){
      return <HomeFaceCardView data={data} className={`${faceViewClass} ${faceViewJudgeTwoClass}`} resetImg={resetImg}/>
    }else{
      return <AnonymousFaceCard className={faceViewClass} resetImg={resetImg}/>
    }
  }

  return (
    <Row className={className} style={style} onClick={onClick ? () => onClick(data) : null}>
      <FacetrackCardView data={data} className={`${faceViewClass} ${faceViewTwoClass}`} resetImg={resetImg} alarmClass={alarmClass?alarmClass:''}/>
      <div className={circleViewClass}>
        <Progress showInfo={true} type="circle" format={percent => `${percent}%`} status="exception" percent={parseFloat((data.percent*100).toFixed(2))} width={circleWidth?circleWidth:70}/>
        <div className={css(styles.text)}>相似度</div>
      </div>

      {toggleFaceCard()}
    </Row>
  )
};


export default HomeAlarmFaceView;


