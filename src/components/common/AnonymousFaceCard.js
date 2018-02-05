/**
 * Created by Jason on 2017/6/14.
 */

import React from 'react';
import { Card } from 'antd';
import styles from './FaceCardView.css';
import ImgView from './ImgView';
import AnonymousFaceCardImg from '../../assets/AnonymousFaceCard.png';

const AnonymousFaceCard = ({ className, resetImg }) => (
  <Card className={className ? `${styles.container} ${className}` : styles.container} bodyStyle={{ padding: 10 }}>
    <ImgView src={AnonymousFaceCardImg} className={`${styles.imgView} ${resetImg}`} />
    <div>
      <p className="">未知</p>
      <p className={styles.fixDate}>未知</p>
    </div>
  </Card>
  );
export default AnonymousFaceCard;
