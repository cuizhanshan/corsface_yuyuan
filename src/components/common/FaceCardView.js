/**
 * Created by Riky on 2017/2/22.
 * faceTrack 展示卡
 *
 */
import React, { PropTypes } from 'react';
import { Card } from 'antd';
import ImgView from './ImgView';
import styles from './FaceCardView.css';

/**
 *
 * @param data   需要展示的数据
 * @param onImgClick 图片点击之后的回调方法
 * @param className 外部传入的样式
 * @param style 传入的style
 * @returns {XML}
 * @constructor
 */

const filterGroupNames = list => {

  const rst = [];
  if (list){
    if (list && list.length > 1) {
      for (let i = 0; i < list.length; i++) {
        if (i !== 0) {
          rst.push(<span key={i}>{`${list[i]} `}</span>);
        }
      }
    } else  {
      rst.push(<span key={0}>{`${list[0]} `}</span>);
    }
  }
  return rst;

};

const filterGroupTitle = list => {
  const rst = [];
  if (list){
    if (list && list.length > 1) {
      for (let i = 0; i < list.length; i++) {
        if (i !== 0) {
          rst.push(`${list[i]} `);
        }
      }
    } else {
      rst.push(`${list[0]} `);
    }
  }
  return rst;
};

const FaceCardView = ({ data, onImgClick, className,
  alarmClass, style, onFaceCardClick, resetImg }) =>

    (
      <Card className={className ? `${styles.container} ${className}` : styles.container} bodyStyle={{ padding: 10 }} style={style} onClick={onFaceCardClick ? () => onFaceCardClick(data) : null}>
        {/* 报警记录,person组件应用， */}
        {data && data.judgePerson ?
          <div>
            <ImgView src={data.judgePerson} className={`${styles.imgView} ${resetImg}`} onImgClick={onImgClick}/>
            {data.judgePerson.alarmed ? <div className={alarmClass ? `${alarmClass} ${styles.alarmImg} ${styles.IndexAlarmImg}` : styles.alarmImg}/> : null}
            <div>
              <p className={styles.text}>{data.judgePerson.name ? data.judgePerson.name : data.judgePerson.srcName}</p>

              <p className={styles.text} title={filterGroupTitle(data.judgePerson.groupList)} >
                {data.judgePerson && data.judgePerson.groupList && data.judgePerson.groupList.length > 0 ?
                  filterGroupNames(data.judgePerson.groupList) :
              (<p className={styles.text}>{data.alarmInfo.groupName}</p>)}
              </p>

              <p className={styles.text}>{data.judgePerson.identityCard ? data.judgePerson.identityCard :
              data.judgePerson.gmtCreate}</p>
            </div>
          </div>
        :
          <div>
            {/* 系统配置，名单管理person卡片应用 */}
            <ImgView src={data} className={`${styles.imgView} ${resetImg}`} onImgClick={onImgClick}/>
            {data.alarmed ? <div
              className={alarmClass ? `${alarmClass} ${styles.alarmImg} ${styles.IndexAlarmImg}` :
              styles.alarmImg}
            /> : null}
            <div>
              <p >{data.name ? data.name : data.srcName}</p>
              <p >{data.identityCard ? data.identityCard : data.gmtCreate}</p>
            </div>
          </div>
        }
      </Card>
    );

/**
 * 定义默认参数，以及传入参数类型的校验
 * @type {{data: ((()=>any)|*), onImgClick, className, style}}
 */

FaceCardView.propTypes = {
  data: PropTypes.object.isRequired,
  onImgClick: PropTypes.func,
  className: PropTypes.any,
  style: PropTypes.any
};

export default FaceCardView;
