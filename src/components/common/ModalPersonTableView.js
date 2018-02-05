/**
 * Created by Riky on 2017/3/3.
 */
import React from 'react';
import {Modal, Row, Button, Table, Radio, Input, DatePicker, message} from 'antd';
const {RangePicker} = DatePicker;
import styles from './ModalPersonTableView.css';

const RadioGroup = Radio.Group;


class ModalPersonTableView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pageSize: 5,
      pageNo: 1
    };

    this.onCloseBtnClick = this.onCloseBtnClick.bind(this);
    this.onSelectBtnClick = this.onSelectBtnClick.bind(this);
    this.onSearchBtnClick = this.onSearchBtnClick.bind(this);
  }


  onCloseBtnClick() {
    this.props.onCancel();
  }

  onSelectBtnClick() {
    if (this.state.person) {
      this.props.onSelect(this.state.person);
    } else {
      message.info('请选择一个识别人');
    }
  }


  /**
   *  查询按钮点击事件
   *
   *
   *  1、从this.state 中获取所有查询参数
   *
   *  2、调用查询方法查询数据
   *
   *  3、同步this.state数据 (需在model 中定义字段)
   */
  onSearchBtnClick() {


  }

  /**
   * 组件渲染前   先调用接口初始化数据
   *
   *
   * 1、获取state中默认的查询参数
   * 2、调用查询方法查询数据
   * 3、同步this.state数据 (需在model 中定义字段)
   *
   *
   */
  componentWillMount() {

  }

  render() {

    const tableProps = {
      onRowClick(record, index) {
        console.log("index " + index + ' is clicked');
        console.log(record);
      },
      pagination: {
        simple: true,
        pageSize: this.state.pageSize,
      },
      columns: [{
        title: '序号',
        dataIndex: 'id',
      }, {
        title: '照片',
        dataIndex: 'imgs',
      }, {
        title: '姓名',
        dataIndex: 'name',
      }, {
        title: '性别',
        dataIndex: 'gender',
      }, {
        title: '身份证号',
        dataIndex: 'identityCard',
      }, {
        title: '识别率',
        dataIndex: 'alarmThreshold',
      }]
    };


    return (
      <Modal visible={this.props.modalVisible}
             title="选择识别人"
             onOk={this.onSelectBtnClick}
             onCancel={this.onCloseBtnClick}
             width={760}
             bodyStyle={{padding: 0, height: 600, overflow: 'auto'}}
      >

        <Row className={styles.searchFilter}>

          <div className={styles.filterRow}>
            <div className={styles.filterName}>
              <div className={styles.filterNameText}>姓名:</div>
              <Input className={styles.filterNameTextInput}/>
            </div>


            <div className={styles.filterTime}>
              <div className={styles.filterTimeText}>收入时间:</div>
              <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{width: '300px', height: '40px'}}/>
            </div>

          </div>
          <div className={styles.filterRow}>
            <div className={styles.filterName}>
              <div className={styles.filterNameText}>分组:</div>
              <Input className={styles.filterNameTextInput}/>
            </div>

            <div className={styles.filterIdCard}>
              <div className={styles.filterTimeText}>身份证号:</div>
              <Input className={styles.filterNameTextInput}/>
            </div>

            <RadioGroup className={styles.filterGender}>
              <Radio value={1} className={styles.filterRadio}>男</Radio>
              <Radio value={0} className={styles.filterRadio}>女</Radio>
            </RadioGroup>

          </div>
          <div className={styles.filterRow}>
            <div className={styles.filterName}>
              <div className={styles.filterNameText}>标签:</div>
              <Input className={styles.filterNameTextInput}/>
            </div>

            <div className={styles.filterBtn}>
              <Button style={{fontSize: 16, width: 100, height: 36, marginTop: 1, marginRight: 16}} onClick={this.onSearchBtnClick}>查询</Button>
            </div>

          </div>
        </Row>


        <Row className={styles.searchResult}>

          <Table rowKey={record => record.id} {...tableProps}/>

        </Row>

      </Modal>
    )
  }

}


export default ModalPersonTableView;


