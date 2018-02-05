/**
 * Created by Riky on 2017/3/3.
 */
import React from 'react';

import {Button, DatePicker, Row, Col, Select, InputNumber} from 'antd';

const {RangePicker} = DatePicker;
import ModalPersonTableView from './ModalPersonTableView';


import styles from './SearchBarView.css';


/**
 *
 *
 * props 传入的属性
 *
 * className
 * showModalCameraTree
 * closeModalCameraTree
 * showModalPersonTable
 * closeModalPersonTable
 * modalCameraTreeVisible
 * modalPersonTableVisible
 *
 *
 */


class SearchBarView extends React.Component {
  constructor(props) {
    super(props);
    this.onSearchBtnClick = this.onSearchBtnClick.bind(this);
    this.onTimeChange = this.onTimeChange.bind(this);
    this.onCameraClick = this.onCameraClick.bind(this);
    this.onGroupClick = this.onGroupClick.bind(this);
    this.state = {
      startPercent: 0,
      endPercent: 1
    }

  }
   onSearchBtnClick() {
    let payload;
    if (this.state) {
      payload = {
        srcId: this.state.srcId ? this.state.srcId : '',
        startTime: this.state.startTime ? this.state.startTime : '',
        endTime: this.state.endTime ? this.state.endTime : '',
        startPercent: this.state.startPercent,
        endPercent: this.state.endPercent,
        groupId: this.state.groupId ? this.state.groupId : ''
      }
    } else {
      payload = {};
    }
    this.props.onSubmit(payload);
  }

  onTimeChange = (data, dateString) => {
    this.setState({
      startTime: dateString[0],
      endTime: dateString[1]
    });
  };

  onCameraClick = (value) => {
    this.setState({
      srcId: value
    });
  };
  onGroupClick = (value) => {
    this.setState({
      groupId: value
    });
  };

  onStartPercentChange = (value) => {
    this.setState({
      startPercent: parseFloat(value / 100)
    });
  };

  onEndPercentChange = (value) => {
    this.setState({
      endPercent: parseFloat(value / 100)
    });
  };


  renderThreshold = () => {

    return (<Col span={6} className={styles.condition}>
      <div className={styles.conditionTitle}>识别率:</div>
      <InputNumber className={styles.inputNumber} defaultValue={0} formatter={value => `${value}%`}
                   parser={value => value.replace('%', '')} size="large" min={0} max={99} onChange={this.onStartPercentChange}/>
      <span className={styles.split}>~</span>
      <InputNumber className={styles.inputNumber} defaultValue={100} formatter={value => `${value}%`}
                   parser={value => value.replace('%', '')} size="large" min={1} max={100} onChange={this.onEndPercentChange}/>
    </Col>)
  };

  renderGrouping = () => {
    return (
      <Col span={6} className={styles.condition}>
        <div className={styles.conditionTitle}>分组:</div>
        <Select className={styles.prefixInput} size="large" allowClear onChange={this.onGroupClick}>
          { this.props.groupList ? this.props.groupList.map((value, i) => <Select.Option key={i}
                                                                                         value={value.id + ''}>{value.name}</Select.Option>) : null}
        </Select>
      </Col>

    )
  };

  render() {

    return (
      <Row className={this.props.className ? `${this.props.className} ${styles.main}` : styles.main}>

        <Col span={6} className={styles.condition}>
          <div className={styles.conditionTitle}>摄像头:</div>
          <Select className={styles.prefixInput} size="large" allowClear onChange={this.onCameraClick}>
            { this.props.cameraList ? this.props.cameraList.map((value, i) => <Select.Option key={i}
                                                                                             value={value.srcId + ''}>{value.name}</Select.Option>) : null}
          </Select>
        </Col>

        <Col span={6} className={styles.condition}>
          <div className={styles.conditionTitle2}>时间:</div>
            <RangePicker className={styles.prefixInput2} showTime format="YYYY-MM-DD HH:mm:ss" size="large"
                        style={{width: 342}}
                        onChange={this.onTimeChange}/>
        </Col>


        {this.props.showThreshold ? this.renderThreshold() : null}

        {this.props.showGrouping ? this.renderGrouping() : null}


        <Col span={5} className={styles.condition}>
          <Button onClick={this.onSearchBtnClick}>查询</Button>
        </Col>


        {/* <ModalPersonTableView modalVisible={this.props.modalPersonTableVisible}
         onCancel={this.onModalCanceled} onSelect={this.onModalSelected}/>*/}

      </Row>
    )

  }
}

export default SearchBarView;






