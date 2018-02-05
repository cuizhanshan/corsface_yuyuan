/**
 * Created by Riky on 2017/2/22.
 * faceTrack 展示卡
 *
 */
import React, { PropTypes } from 'react';
import { Card } from 'antd';
import ImgView from './ImgView';
import styles from './HomeFaceCardView.css';

/**
 *
 * @param data   需要展示的数据
 * @param onImgClick 图片点击之后的回调方法
 * @param className 外部传入的样式
 * @param style 传入的style
 * @returns {XML}
 * @constructor
 */
// const formatterGroup=(groups)=>{
//   let groupArr=[];
//   groups.map(value =>groupArr.push(value.name));
//   return groupArr.join(',');
// };
const formatterGroup=(groups)=>{
  const rst = [];
  if( groups.length > 1 ) {
    for (let i = 0; i < groups.length; i++) {
      if (i !== 0) {
        rst.push(<span key={groups[i]}>{groups[i] + ' '}</span>);
      }
    }
  } else {
    rst.push(<span key={groups[0]}>{groups[0] + ' '}</span>);
  }
  return rst;
};
const HomeFaceCardView = ({ data, onImgClick, className, alarmClass, style, onFaceCardClick, resetImg }) => {

  return (
    <Card className={className ? `${styles.container} ${className}` : styles.container} bodyStyle={{ padding: 10 }} style={style} onClick={onFaceCardClick ? () => onFaceCardClick(data) : null}>
      <ImgView src={data.judgePerson} className={`${styles.imgViewTwo} ${resetImg}`} onImgClick={onImgClick} />
      {data.judgePerson.alarmed ? <div className={alarmClass ? `${alarmClass} ${styles.alarmImg}` : styles.alarmImg} /> : null}
      <div className={styles.judgeMsg}>
        {/* {data.alarmed? <p className={styles.alarmText}>{data.name ? data.name : data.srcName}</p>: <p>{data.name ? data.name : data.srcName}</p>}
     */}
        <p className={styles.fixDate}><span>姓名：</span>{data.judgePerson.name ? data.judgePerson.name : data.srcName}</p>
        <p className={styles.fixDate}><span>身份证号：</span>{data.judgePerson.identityCard ? data.judgePerson.identityCard : ''}</p>
        <p className={styles.fixDate}><span>报警分组：</span>{data.alarmInfo.groupName ? data.alarmInfo.groupName : ''}</p>
        <p className={styles.fixDate}>所属分组：
          {data && data.judgePerson.groupList ? formatterGroup(data.judgePerson.groupList) : ''}
          {/*{data && data.judgePerson.groupList ? data.judgePerson.groupList.map(value => <span>{value + ';'}</span>) : null}*/}
        </p>

        <p className={styles.fixDate}><span>家庭地址：</span></p>
        <p className={styles.fixDate}><span>电话号码：</span></p>
        <p className={styles.fixDate}><span>报警等级：</span></p>
        <p className={styles.fixDate}><span>片警电话：</span></p>
      </div>
    </Card>
  );
};

/**
 * 定义默认参数，以及传入参数类型的校验
 * @type {{data: ((()=>any)|*), onImgClick, className, style}}
 */

HomeFaceCardView.propTypes = {
  data: PropTypes.object.isRequired,
  onImgClick: PropTypes.func,
  className: PropTypes.any,
  style: PropTypes.any,
};

export default HomeFaceCardView;
