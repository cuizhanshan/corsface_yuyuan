/**
 * Created by Jason on 2017/7/20.
 */

import React from 'react';
import { connect } from 'dva';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Radio, Icon } from 'antd';
import ReactEcharts from 'echarts-for-react';
import AnalysisLayout from './AnalysisLayout';
import MayLayout from '../../components/common/MainLayout';
import layoutStyles from '../../components/common/MainLayout.css'

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
let timer;



const styles = StyleSheet.create({
    wapper: {
      boxSizing: 'border-box',
        padding: '0px 80px'
    },
  select:{
    marginBottom: '80px',
    marginLeft: '40px'
  },
    flowStatistics: {
    textAlign: 'center',
        height: '100px',
        lineHeight: '100px',
        fontSize: 22,
        color: '#01ABE3',
        fontWeight: 'bold'
    },
    statistics: {
    backgroundColor: '#152737',
        marginBottom:'4vh'
    },
    statisticsTwo: {
      width: '48%',
    backgroundColor:'#152737',
        float: 'left'
    },
    statisticsThree: {
        width: '48%',
      backgroundColor: '#152737',
        float: 'right'
    },
    fullScreen: {
        position:'absolute',
        right: 20,
        top: 3,
        color: '#B0BDC3',
        width: 25,
        height: 25,
        fontSize:25,
        ':hover': {
            cursor: 'pointer'
        }
    }

});


class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        navVisiable: true,
        fullIcon: true
    }
  }
  componentWillMount(){
      this.props.dispatch({
          type: 'analysis/ygGetAllState'
      })
  }

  onChange = (e) => {
  this.props.dispatch({
    type: 'analysis/allTrafficStatistics',
    payload: {
      type: e.target.value
    }
  })
}
    onFullClick = () => {
      this.setState({
          fullIcon: false,
          navVisiable: false
      })
        const full = document.documentElement
        if(full.requestFullscreen){
            full.RequestFullscreen()
        }else if(full.msRequestFullscreen){
            full.msRequestFullscreen()
        }else if(full.mozRequestFullscreen){
            full.mozRequestFullscreen()
        }else if(full.webkitRequestFullscreen){
            full.webkitRequestFullscreen()
        }else{
            return
        }
    }

  getTrafficStatistics = () => ({
    title: {
      text: '各出入口的进出人流数据',
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
              fontWeight:'bold'
          },
          orient: 'vertical',
          left: '57%',
          top: 3

      },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
        data: this.props.analysis.ygCount ? this.props.analysis.ygCount.map((item) => item.name) : null,
      axisLine: {
        lineStyle: {
          color: '#B7B6B6'
        }
      },

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
          color: "#34938D"
        }
      },
      data: this.props.analysis.ygCount ? this.props.analysis.ygCount.map((item) => item.intoCount) : null

    },{
        name: '出口',
        type: 'bar',
        itemStyle: {
            normal: {
                color: "#9B4343"
            }
        },
        data: this.props.analysis.ygCount ? this.props.analysis.ygCount.map((item) => item.outCount) : null
    }]
  })
    getStatistics = () => ({
        title: {
            text: '不同时段的总人流数据',
            textStyle: {
                color: '#A4A2A4'
            },
            left: 'center',
            top: '10'

        },
        tooltip : {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.props.analysis.ygPeriodCount ? this.props.analysis.ygPeriodCount.map((item) => item.date) : null,
            axisLine: {
                lineStyle: {
                    color: '#B7B6B6'
                }
            },
        },
        yAxis: {
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: '#B7B6B6'
                }
            }
        },
        series: [{
            data: this.props.analysis.ygPeriodCount ? this.props.analysis.ygPeriodCount.map((item) => item.total) : null,
            type: 'line',
            smooth: true,
            itemStyle: {
              normal: {
                opacity: 0
              }
            },
            lineStyle: {
              normal: {
                  color: '#01ACE4'
              }
            },
            areaStyle: {
             normal:{
               color: {
                   type: 'linear',
                   x: 0,
                   y: 0,
                   x2: 0,
                   y2: 1,
                   colorStops: [{
                       offset: 0, color: '#1E617E' // 0% 处的颜色
                   }, {
                       offset: 1, color: '#2A3D4C' // 100% 处的颜色
                   }],
                   globalCoord: false // 缺省为 false
               }
             }
            }
        }]
    })
    getStayStatistics = () => ({
        title: {
            text: '不同时段的驻留人流数据',
            textStyle: {
                color: '#A4A2A4'
            },
            left: 'center',
            top: '10'

        },
        tooltip : {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.props.analysis.ygStayCount ? this.props.analysis.ygStayCount.map((item) => item.date) : null,
            axisLine: {
                lineStyle: {
                    color: '#B7B6B6'
                }
            },
        },
        yAxis: {
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: '#B7B6B6'
                }
            }
        },
        series: [{
            data: this.props.analysis.ygStayCount ? this.props.analysis.ygStayCount.map((item) => item.total) : null,
            type: 'line',
            smooth: true,
            itemStyle: {
                normal: {
                    opacity: 0
                }
            },
            lineStyle: {
                normal: {
                    color: '#01ACE4'
                }
            },
            areaStyle: {
                normal:{
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: '#1E617E' // 0% 处的颜色
                        }, {
                            offset: 1, color: '#2A3D4C' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    }
                }
            }
        }]
    })
    onEscFullClick = () => {
    this.setState({
        fullIcon: true,
        navVisiable: true
    })

    const canselFull = document;
    if (canselFull.exitFullscreen) {
        canselFull.exitFullscreen();
    } else if (canselFull.msExitFullscreen) {
        canselFull.msExitFullscreen();
    } else if (canselFull.mozCancelFullScreen) {
        canselFull.mozCancelFullScreen();
    } else if (canselFull.webkitCancelFullScreen) {
        canselFull.webkitCancelFullScreen();
    } else {
        // 暂不处理
    }
}

  render() {
    return (

    <MayLayout location={this.props.location} navVisiable={this.state.navVisiable}>
        { this.state.fullIcon ?<div className={css(styles.fullScreen)}>
           <Icon title="点击全屏" type="arrows-alt" onClick={this.onFullClick}/></div> :
                    <div className={layoutStyles.header} style={{paddingLeft: '50px'}}>
                        <div className={layoutStyles.logo}></div>
                        <div className={css(styles.fullScreen)}>
                        <Icon title="退出全屏" type="video-camera" onClick={this.onEscFullClick}/>
                        </div>
                    </div> }

        {/* 表格一*/}
        <div className={css(styles.wapper)}>
        <div className={css(styles.flowStatistics)}>
            <span>当前游客驻留人数：<i style={{color: '#EA9926'}}>{this.props.analysis.ygTitleCount.stayCount}</i></span>
            <span style={{ marginLeft:'30px' }}> 今日游客累计总人数：<i style={{color: '#EA9926'}}>{this.props.analysis.ygTitleCount.intoCount}</i></span>
        </div>
        <div className={css(styles.statistics)}>
          <ReactEcharts
            option={this.getTrafficStatistics()}
            style={{ width: '100%', height: 365 }}
            notMerge
            lazyUpdate
          />
        </div>
        {/* 表格二*/}
        <div className={css(styles.statisticsTwo)}>
          <ReactEcharts
            option={this.getStatistics()}
            style={{ width:850, height: 365 }}
            notMerge
            lazyUpdate
          />
        </div>
          <div className={css(styles.statisticsThree)}>
            <ReactEcharts
                    option={this.getStayStatistics()}
                    style={{ width:850, height: 365 }}
                    notMerge
                    lazyUpdate
            />
          </div>


        </div>

    </MayLayout>
    );
  }
}
function mapStateToProps({analysis}) {
  return {analysis}
}

export  default connect(mapStateToProps)(IndexPage);
