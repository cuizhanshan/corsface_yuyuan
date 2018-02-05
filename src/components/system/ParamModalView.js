/**
 * Created by yunshitu on 2017/4/29.
 */
import React from 'react';
import {StyleSheet, css} from 'aphrodite/no-important';
import {Modal, Input, Button} from 'antd';
import styles from './ParamModalView.css'



class ParamModalView extends React.Component {
  constructor(props) {
    super(props);
  }

  onClosed = () => {
    this.props.onClosed();
  };

  render() {
    return (
      <Modal visible={this.props.visible}
             title=''
             footer=''
             closable={false}
             onOk={this.onClosed}
             onCancel={this.onClosed}
             width={1400}
             bodyStyle={{padding: 0, height: 780}}
             className={styles.body}
      >
        <div className={styles.container}>
          <div className={styles.header}>
            <span className={styles.title}>参数设置</span>
            <div className={styles.closeBtn} onClick={this.onClosed}/>
          </div>
          <div className={styles.content}>
            <div className={styles.caption}>
              <span className={styles.subTitle}>FaceMethods</span>
              <span className={styles.chinese}>中文</span>
              <div className={styles.underline}></div>
              <div className={styles.faceInfo}>

                <div className={styles.item}>
                  <label className={styles.text}>detector</label>
                  <Input size="large" className={styles.input}/>
                  <span className={styles.chinaText}>中文</span>
                </div>
                <div className={styles.item}>
                  <label className={styles.text}>detectorCheck</label>
                  <Input size="large" className={styles.input}/>
                  <span className={styles.chinaText}>中文</span>
                </div>
                <div className={styles.item}>
                  <label className={styles.text}>alignment</label>
                  <Input size="large" className={styles.input}/>
                  <span className={styles.chinaText}>中文</span>
                </div>

              </div>


            </div>
            <div className={styles.caption}>
              <span className={styles.subTitle}>PykoParam</span>
              <span className={styles.chinese}>中文</span>
              <div className={styles.underline}></div>
              <div className={styles.pykoInfo}>

                <div className={styles.item}>
                  <label className={styles.text}>minsize</label>
                  <Input size="large" className={styles.input}/>
                  <span className={styles.chinaText}>中文</span>
                </div>
                <div className={styles.item}>
                  <label className={styles.text}>maxsize</label>
                  <Input size="large" className={styles.input}/>
                  <span className={styles.chinaText}>中文</span>
                </div>
                <div className={styles.item}>
                  <label className={styles.text}>scalefactor</label>
                  <Input size="large" className={styles.input}/>
                  <span className={styles.chinaText}>中文</span>
                </div>
                <div className={styles.item}>
                  <label className={styles.text}>stridefactor</label>
                  <Input size="large" className={styles.input}/>
                  <span className={styles.chinaText}>中文</span>
                </div>
                <div className={styles.item}>
                  <label className={styles.text}>qthreshold</label>
                  <Input size="large" className={styles.input}/>
                  <span className={styles.chinaText}>中文</span>
                </div>

              </div>


            </div>
            <div className={styles.caption}>
              <span className={styles.subTitle}>PykoParam</span>
              <span className={styles.chinese}>中文</span>
              <div className={styles.underline}></div>
              <div className={styles.pykoInfo}>

                <div className={styles.item}>
                  <label className={styles.text}>minsize</label>
                  <Input size="large" className={styles.input}/>
                  <span className={styles.chinaText}>中文</span>
                </div>
                <div className={styles.item}>
                  <label className={styles.text}>maxsize</label>
                  <Input size="large" className={styles.input}/>
                  <span className={styles.chinaText}>中文</span>
                </div>
                <div className={styles.item}>
                  <label className={styles.text}>scalefactor</label>
                  <Input size="large" className={styles.input}/>
                  <span className={styles.chinaText}>中文</span>
                </div>
                <div className={styles.item}>
                  <label className={styles.text}>stridefactor</label>
                  <Input size="large" className={styles.input}/>
                  <span className={styles.chinaText}>中文</span>
                </div>
                <div className={styles.item}>
                  <label className={styles.text}>qthreshold</label>
                  <Input size="large" className={styles.input}/>
                  <span className={styles.chinaText}>中文</span>
                </div>

              </div>


            </div>
          </div>
          <Button type="primary" className={styles.greenbtn}>回复默认</Button>
          <div className={styles.btnWarp}>
            <Button type="primary" className={styles.btn}>添加</Button>
            <Button type="primary" className={styles.btn}>取消</Button>
          </div>
        </div>
      </Modal>
    )
  }

}
export default ParamModalView;
