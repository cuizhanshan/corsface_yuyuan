/**
 * Created by Jason on 2017/7/20.
 */

import React from 'react';
import { connect } from 'dva';
import { Cascader, Radio } from 'antd';
import { StyleSheet, css } from 'aphrodite/no-important';
import ReactEcharts from 'echarts-for-react';
import MayLayout from '../../components/common/MainLayout';
import styles from './IndexPage.css';

import { getWeekInMonth, createDatePicker } from '../../utils/utils';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;


class Historical extends React.Component {

  componentWillMount() {
    const initDatePicker = createDatePicker();
    this.props.dispatch({
      type: 'historical/success',
      payload: {
        initDatePicker
      }
    });
    this.props.dispatch({
      type: 'historical/ygDefaultHistory'
    });
  }
  onChange = value => {
    let time = '';
    const week = value[2];
    if (value[1] < 10) {
      time = `${value[0]}-0${value[1]}`;
    } else {
      time = `${value[0]}-${value[1]}`;
    }
    this.props.dispatch({
      type: 'historical/success',
      payload: {
        cascaderSelect: value,
        ygGetHistoryParams: {
          time,
          week
        },
        ygDefaultHistoryParams: {
          type: ''
        }
      }
    });
    this.props.dispatch({
      type: 'historical/ygGetHistory'
    });
  };
  loadData = selectedOptions => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

        // load options lazily
    setTimeout(() => {
      const date = { year: selectedOptions[0].value, month: selectedOptions[1].value };
      targetOption.loading = false;
      targetOption.children = getWeekInMonth(date);
      this.props.dispatch({
        type: 'historical/success',
        payload: {
          initDatePicker: [...this.props.historical.initDatePicker]
        }
      });
    }, 1000);
  };
  onRadioChange = e => {
    this.props.dispatch({
      type: 'historical/success',
      payload: {
        ygDefaultHistoryParams: {
          type: e.target.value
        },
        cascaderSelect: []
      }
    });
    this.props.dispatch({
      type: 'historical/ygDefaultHistory'
    });
  };
  getTrafficStatistics = () => ({
    title: {
      textStyle: {
        color: '#A4A2A4'
      },
      left: 'center',
      top: '10'

    },
    legend: {
      data: ['入口', '出口'],
      textStyle: {
        color: '#A4A2A4',
        fontWeight: 'bold'
      },
      left: 'center',
      top: 3

    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      data: this.props.historical.ygCount ? this.props.historical.ygCount.map(item => item.weekName) : null,
      axisLine: {
        lineStyle: {
          color: '#B7B6B6'
        }
      }

    },
    yAxis: {
      axisLine: {
        lineStyle: {
          color: '#B7B6B6'
        }
      },
      splitLine: {
        show: false
      }
    },
    series: [{
      name: '入口',
      type: 'bar',
      itemStyle: {
        normal: {
          color: '#91C7AE'
        }
      },
      data: this.props.historical.ygCount ? this.props.historical.ygCount.map(item => item.intoCount) : null

    }, {
      name: '出口',
      type: 'bar',
      itemStyle: {
        normal: {
          color: '#61A0A8'
        }
      },
      data: this.props.historical.ygCount ? this.props.historical.ygCount.map(item => item.outCount) : null
    }]
  });
  onEchartsClick =(e) => {
    console.log(e)
  };
  render() {
    const historical = this.props.historical;
    const onEvents = {
      'click': this.onEchartsClick
    };
    return (
      <MayLayout location={this.props.location}>
        <div className={styles.searchBar}>
          <span>选择时间：</span>
          <RadioGroup onChange={this.onRadioChange} value={historical.ygDefaultHistoryParams.type}>
            <RadioButton value={0}>本周</RadioButton>
            <RadioButton value={1}>上周</RadioButton>
            <RadioButton value={2}>上月</RadioButton>
          </RadioGroup>
          <Cascader
            options={this.props.historical.initDatePicker ?
                    this.props.historical.initDatePicker : []}
            loadData={this.loadData}
            style={{ marginLeft: '50px', width: '300px', color: '#000' }}
            value={historical.cascaderSelect}
            onChange={this.onChange}
            placeholder="请选择时间查询"
          />
        </div>
        <div className={styles.flowStatistics}>
          <span>({historical.titleCount.startTime}~{historical.titleCount.endTime})</span>
          <span style={{ marginLeft: '20px' }}>游客累计总人数：<i style={{ color: '#EA9926' }}>{historical.titleCount.count}</i></span>
        </div>
        <div className={styles.statisticsThree}>
          <ReactEcharts
            option={this.getTrafficStatistics()}
            style={{ width: '100%', minHeight: 650, maxHeight: 700 }}
            onEvents={onEvents}
            notMerge
            lazyUpdate
          />
        </div>
      </MayLayout>
    );
  }
}
function mapStateToProps({ historical}) {
  return { historical};
}

export default connect(mapStateToProps)(Historical);
