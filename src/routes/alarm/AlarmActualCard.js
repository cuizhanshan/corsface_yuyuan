/**
 * Created by Ethan on 2017/10/23.
 */
import React from 'react';
import { Row, Progress } from 'antd';
import { StyleSheet, css } from 'aphrodite';
import ImgView from '../../components/common/ImgView';

const styles = StyleSheet.create({
  card: {
    width: 440,
    height: 285,
    float: 'left',
    color: '#fff',
    backgroundColor: '#33444e',
    margin: '20px 10px 0px 10px'
  },
  left: {
    float: 'left',
    width: 190,
    margin: '20px 0px 0px 20px'
  },
  right: {
    float: 'right',
    width: 190,
    margin: '20px 20px 0px 20px'
  },
  images: {
    width: 190,
    height: 190,
    backgroundColor: '#ccc'
  },
  textLeft: {
    width: 190,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontSize: '12px',
    lineHeight: '24px'
  },
  timeText: {
    width: 115,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontSize: '12px',
    lineHeight: '24px'
  },
  textRight: {
    width: 80,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontSize: '12px',
    lineHeight: '24px'
  },
  idcard: {
    width: 100,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontSize: '12px',
    float: 'right',
    lineHeight: '24px'
  },
  memo: {
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontSize: '12px',
    float: 'right',
    lineHeight: '24px'
  },
  number: {
    fontSize: '12px',
    float: 'right',
    lineHeight: '24px'
  },
  groupText: {
    width: 130,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontSize: '12px',
    float: 'left',
    lineHeight: '24px',
  }

});

const filterGroupNames = list => {
  const rst = [];
  if (list){
    if(list && list.length > 1 ) {
      for (let i = 0; i < list.length; i++) {
        if (i !== 0) {
          rst.push(<span>{list[i] + ' '}</span>);
        }
      }
    } else {
      rst.push(<span>{list[0] + ' '}</span>);
    }
  }
  return rst;
};

const filterGroupTitle = list => {
  const rst = [];
  if (list){
    if(list && list.length > 1 ) {
      for (let i = 0; i < list.length; i++) {
        if (i !== 0) {
          rst.push(list[i] + ' ');
        }
      }
    } else {
      rst.push(list[0] + ' ');
    }
  }
  return rst;
}

const AlarmActualCard = ({ data, onClick }) => (
  <div onClick={onClick ? () => onClick(data) : null}>
    <div className={css(styles.card)}>
      <div className={css(styles.left)}>
        <ImgView src={data} className={css(styles.images)} />
        <p title={data.srcName ? data.srcName : ''} className={css(styles.textLeft)}>{data.srcName ? data.srcName : ''}</p>
        <p title={data.offsetTime ? data.offsetTime : data.captureTime} className={css(styles.timeText)}>{data.offsetTime ? data.offsetTime : data.captureTime}</p>
      </div>
      {/* 分割 */}
      <div className={css(styles.right)}>
        <ImgView src={data.judgePerson} className={css(styles.images)} />
        <span title={data.judgePerson && data.judgePerson.name ? data.judgePerson.name : data.srcName} className={css(styles.textRight)}>{data.judgePerson && data.judgePerson.name ? data.judgePerson.name : data.srcName}</span>
        <span title={data.judgePerson && data.judgePerson.identityCard ? data.judgePerson.identityCard : ''} className={css(styles.idcard)}>{data.judgePerson && data.judgePerson.identityCard ? data.judgePerson.identityCard : ''}</span>
        <div>
          <span title={filterGroupTitle(data.judgePerson.groupList)} className={css(styles.groupText)}>
            {data.judgePerson && data.judgePerson.groupList && data.judgePerson.groupList.length > 0 ?
              filterGroupNames(data.judgePerson.groupList) :
              (<span>{data.alarmInfo.groupName}</span>)}
          </span>
           <span className={css(styles.number)}>{(data.percent * 100).toFixed(2)}</span>
        </div>
        <div>
          <span title={data.judgePerson && data.judgePerson.memo ? data.judgePerson.memo : ''} className={css(styles.memo)}>{data.judgePerson && data.judgePerson.memo ? data.judgePerson.memo : ''}</span>
        </div>
      </div>
    </div>
  </div>
  );
export default AlarmActualCard;
