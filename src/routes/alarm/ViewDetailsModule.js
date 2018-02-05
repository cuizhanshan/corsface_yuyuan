/**
 * Created by Riky on 2017/4/25.
 */
import React from 'react';
import { Modal, Radio, Button } from 'antd';
import { StyleSheet, css } from 'aphrodite/no-important';
// import ImgView from '../common/ImgView';
import modalFaceView from '../../components/common/ModalFaceView.css';
// import cheacked from '../../assets/person-check.png';

const RadioGroup = Radio.Group;

const styles = StyleSheet.create({
  body: {
    top: 94,
    zIndex: 2000
  },
  header: {
    height: 36,
    width: '100%',
    background: '#33444e ',
    color: '#fff',
    borderBottom: '1px solid #232c31',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    position: 'relative'
  },
  title: {
    width: '100%',
    textAlign: 'center',
    display: 'block',
    fontSize: 16,
    fontFamily: ['SimHei', 'sans-serif'],
    color: '#fff',
    lineHeight: '36px'
  },

  /* container: {
   width: 1370,
   height: 715,
   background: '#232C31'
   }, */

  container: {
    // width: 1370,
    width: '100%',
    height: 715,
    background: '#232c31',
    zIndex: 9999
  },

  list: {
    width: 777,
    height: 703,
    background: '#33444e ',
    display: 'inline-block',
    padding: '12px 0',
    overflow: 'auto'
  },
  snap: {
    /* width: 570,
     height: 322, */
    width: 400,
    height: 226,
    display: 'inline-block',
    float: 'right',
    marginRight: 12,
    marginTop: 24
  },
  img: {
    /* width: 210,
     height: 210,
     margin: '12px  23px 0 20px', */

    /* width: 72,
     height: 72,
     margin: '12px 19px 0 19px', */

    width: 144,
    height: 144,
    margin: '12px 26px 0 19px',

    border: '1px solid #3d515d',
    background: '#33444e',
    display: 'inline-block'
  },
  sort: {
    float: 'left',
    width: 400,
    height: 700,
    backgroundColor: '#33444e ',
    margin: '5px',
    overflow: 'auto',
    borderRadius: 6
  },
  contrast: {
    float: 'left',
    width: 515,
    backgroundColor: '#33444e ',
    margin: '5px',
    overflow: 'auto',
    borderRadius: 6
  },
  comparison: {
    height: '344px',
    overflow: 'auto',
    borderBottom: '10px solid #232c31'
  },
  scene: {
    float: 'left',
    width: 500,
    backgroundColor: '#33444e ',
    margin: '5px',
    borderRadius: 6
  },
  imgList: {
    width: 115,
    height: 115,
    margin: 5,
    float: 'left'
  },
  contrastList: {
    position: 'relative',
    width: '94%',
    height: 130,
    margin: 10,
    backgroundColor: '#33444e',
    borderRadius: 6,
    boxSizing: 'content-box',
    overflow: 'hidden',
    border: '3px solid #F4F4F4'
  },
  contrastListActive: {
    transition: 'all .1s',
    border: '3px solid #01ACE4'

  },
  contrastImg: {
    width: 130,
    height: 130,
    float: 'left',
    borderRadius: '4px'
  },
  contrastSpan: {
    width: 300,
    marginLeft: 150,
    fontSize: 14
  },
  sceneImg: {
    width: 480,
    height: 286,
    margin: 10,
    borderRadius: 6
  },
  sceneResult: {
    padding: 70,
    boxSizing: 'border-box',
    borderTop: '5px solid #D6DDE0'
  },
  sceneRadio: {
    fontSize: 16
  },
  sceneRadioGroup: {
    marginTop: 50
  },

  sceneBtn: {
    margin: '129px',
    marginLeft: 180
  },
  snapImgWrap: {
    boxSizing: 'border-box'
  },
  personCheck: {
    position: 'absolute',
    bottom: 0,
    right: 0
  },
  p: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  affirm: {
    float: 'right',
    width: '476px',
    height: '334px',
    borderRadius: '6px',
    textAlign: 'center',
    margin: '6px 14px 0px 0px',
    backgroundColor: '#33444e'
  },
  more: {
    float: 'right',
    width: '476px',
    height: '355px',
    borderRadius: '6px',
    textAlign: 'center',
    margin: '6px 14px 0px 0px',
    backgroundColor: '#33444e'
  },
  wrap: {
    margin: '10px',
    border: '2px solid #666',
    height: '134px',
    borderRadius: '6px'
  },
  iframe: {
    position: 'absolute',
    visibility: 'inherit',
    top: 0,
    left: 0,
    height: 751,
    width: 936,
    zIndex: -1
  }
});

function contrastListCss(id, personId) {
  if (id === personId) {
    return `${css(styles.contrastList)} ${css(styles.contrastListActive)}`;
  }
  return css(styles.contrastList);
}

function personCardSelected(id, personId) {
  if (id === personId) {
    return { display: 'block' };
  }
  return { display: 'none' };
}
const filterGroupNames = list => {
  const rst = [];
  if (list){
    if(list && list.length > 1 ) {
      for (let i = 0; i < list.length; i++) {
        if (i !== 0) {
          rst.push(<span>{list[i].name + ' '}</span>);
        }
      }
    } else {
      rst.push(<span>{list[0].name + ' '}</span>);
    }
  }

  return rst;
};
const ViewDetailsModule = ({
                             visible, onClosed, data, key, alarmTitle,
                             matchPersons, personId, onPersonCardClick,
                             markId, onMarkIdChange, moreClick, onAlarmConfirmClick
                           }) => {
  const { face, person, personFace, page, faceList } = data;
  return (
    <Modal
      visible={visible}
      title=""
      footer=""
      closable={false}
      onCancel={() => onClosed()}
      width={936}
      bodyStyle={{ padding: 0, height: 751 }}
      zIndex={1100}
      className={css(styles.body)}
      key={key}
    >
      <div className={css(styles.header)}>
        <span className={css(styles.title)}>报警记录详情</span>
        <div className={modalFaceView.closeBtn} onClick={() => onClosed()}/>
      </div>
      <div className={css(styles.container)}>
        <div className={css(styles.sort)}>
          <div className={css(styles.header)}>
            <span className={css(styles.title)}>抓拍序列</span>
          </div>
          {face && face.imgs ? face.imgs.map((value, i) =>
            <div key={i} className={css(styles.imgList)}>
              <img
                src={value}
                style={{ width: '100%', borderRadius: 6 }}
                alt=""
              />
            </div>) : null}

        </div>
        <div className={css(styles.contrast)}>
          <div className={css(styles.comparison)}>
            <div className={css(styles.header)}>
              <span className={css(styles.title)}>对比结果</span>
            </div>

            {person ?
              <div className={css(styles.wrap)}>
                <img className={css(styles.contrastImg)} src={person.imgs[0]} alt=""/>
                <div className={css(styles.contrastSpan)}>
                  <p><span style={{ color: 'red' }}>相似度: {parseFloat((face.percent * 100).toFixed(2))}</span></p>
                  <p><span style={{ color: '#fff' }}>姓名: {person.name} </span></p>
                  <p><span style={{ color: '#fff' }}>性别: {person.gender} </span></p>
                  {/*<p style={{ color: '#fff' }}>所属分组：*/}
                      {/*{person.groups ? person.groups.map(value => <span>{`${value.name};`}</span>) : null}*/}
                  {/*</p>*/}
                  <p style={{ color: '#fff' }}>所属分组:&nbsp;
                    {person.groups && person.groups.length > 0 ?
                      filterGroupNames(person.groups) : (<span>{face.alarmInfo.groupName}</span>)}
                  </p>
                  <p><span style={{ color: '#fff' }}>身份证号:&nbsp;{person.identityCard} </span></p>
                  <p><span style={{ color: '#fff' }}>备注:&nbsp;{person.memo} </span></p>
                </div>
              </div>
              : null
            }
          </div>

          <div className={css(styles.scene)}>
            <div className={css(styles.header)}>
              <span className={css(styles.title)}>现场图片</span>
            </div>
            <div className={css(styles.snapImgWrap)}>
              <img
                className={css(styles.sceneImg)}
                src={face && face.snapImg ? face.snapImg : null}
                alt=""
              />
            </div>
          </div>
        </div>

      </div>


      <iframe
        src="about:blank" frameBorder="0"
        filter="progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=1)"
        className={css(styles.iframe)}
      />


    </Modal>
  );
};

export default ViewDetailsModule;
