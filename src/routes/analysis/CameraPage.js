
/**
 * Created by Ethan on 2017/7/19.
 */
import React from 'react';
import { connect } from 'dva';
import { StyleSheet, css } from 'aphrodite';
import ReactEcharts from 'echarts-for-react';
import { Radio, DatePicker } from 'antd';
import moment from 'moment';
import AnalysisLayout from './AnalysisLayout';

const { MonthPicker, RangePicker } = DatePicker;
const styles = StyleSheet.create({
  select: {
    marginLeft: '40px'
  },
  statistics: {
    paddingLeft: '120px'
  },
  radio: {
    paddingRight: '30px'
  }

});
const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';
const Ydata = [];
const Xdata = [];
const X2data = [];
for (let i = 0; i < 30; i++) {
  const arr = `摄像头${i + 1}`;
  const arr2 = Math.round(Math.random() * 100 + 20);
  Ydata.push(arr);
  Xdata.push(arr2);
  X2data.push(arr2 + 30);
}
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
class CameraPage extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch({
      type: 'analysis/getCamerCaptureFtCount',
      payload: {
        type: 0
      }
    });
    this.props.dispatch({
      type: 'analysis/getCamerCaptureAmCount',
      payload: {
        type: 0
      }
    });
  }

  onChange = (e) => {
    this.props.dispatch({
      type: 'analysis/success',
      payload: {
        cameraStatisticsType: e.target.value
      }
    })
    this.props.dispatch({
      type: 'analysis/getCamerCaptureFtCount',
      payload: {
        type: e.target.value
      }
    });
    this.props.dispatch({
      type: 'analysis/getCamerCaptureAmCount',
      payload: {
        type: e.target.value
      }
    });
  }
  onClick = (data) => {
    this.props.dispatch({
      type: 'analysis/success',
      payload: {
        cameraStatisticsType: 3
      }
    })
    const startTime = moment(data[0]).format('YYYY-MM-DD hh:mm:ss');
    const endTime = moment(data[1]).format('YYYY-MM-DD hh:mm:ss');
    this.props.dispatch({
      type: 'analysis/getCamerCaptureFtCount',
      payload: {
        type: 3,
        startTime,
        endTime
      }
    });
    this.props.dispatch({
      type: 'analysis/getCamerCaptureAmCount',
      payload: {
        type: 3,
        startTime,
        endTime
      }
    });
  }
  getTrafficStatistics = () => ({
    tooltip: {
      trigger: 'item'
    },
    legend: {
      data: ['人员流动统计', '报警统计'],
      textStyle: {
        color: '#fff'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    textStyle: {
      color: '#ccc'
    },
    xAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#fff'
        }
      }
    },
    yAxis: {
      type: 'category',
      data: this.props.analysis.cameraCameraData?
            this.props.analysis.cameraCameraData.map((item) => item.camerName):null,
      axisLine: {
        lineStyle: {
          color: '#fff'
        }
      }
    },
    dataZoom: [{
      type: 'slider',
      yAxisIndex: [0],
      start: 0,
      end: 100
    }
    ],
    series: [
      {
        name: '人员流动统计',
        type: 'bar',
        stack: '人流统计',
        itemStyle: {
          normal: {
            color: 'rgba(145,199,174,1)'
          }
        },
        label: {
          normal: {
            show: true,
            position: 'insideRight',
            textStyle: {
              color: '#000'
            }
          }
        },
        data: this.props.analysis.cameraFaceData?
          this.props.analysis.cameraFaceData.map((item) => item.count):null
      },
      {
        name: '报警统计',
        type: 'bar',
        stack: '报警统计',
        itemStyle: {
          normal: {
            color: 'rgba(214,95,97,1) '
          }
        },
        label: {
          normal: {
            show: true,
            position: 'insideRight',
            textStyle: {
              color: '#fff'
            }
          }
        },
        data: this.props.analysis.cameraCameraData?
          this.props.analysis.cameraCameraData.map((item) => item.count):null
      }
    ]
  })

  render() {
    return (
      <AnalysisLayout location={this.props.location} dispatch={this.props.dispatch}>
        <div className={css(styles.select)}>
          <RadioGroup onChange={this.onChange} value={this.props.analysis.cameraStatisticsType || '0'} size="large" className={css(styles.radio)}>
            <RadioButton value="0">周统计</RadioButton>
            <RadioButton value="1">月统计</RadioButton>
            <RadioButton value="2">年统计</RadioButton>
          </RadioGroup>
          <RangePicker
            showTime
            format="YYYY-MM-DD HH:mm"
            onOk={this.onClick}
          />

        </div>
        {/* 表格一*/}
        <div className={css(styles.statistics)}>
          <ReactEcharts
            option={this.getTrafficStatistics()}
            style={{ width: 1300, height: 800 }}
            notMerge
            lazyUpdate
          />
        </div>


      </AnalysisLayout>
    );
  }
}
function mapStateToProps({ analysis }) {
  return { analysis };
}

export default connect(mapStateToProps)(CameraPage);
