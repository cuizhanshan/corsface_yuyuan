/**
 * Created by Ethan on 2017/10/23.
 */
import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Icon } from 'antd';
import styles from './AlarmRecordActualPage.css';
import AlarmActualCard from './AlarmActualCard';
import ViewDetailsModule from './ViewDetailsModule';

class AlarmRecordActualPage extends React.Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'index/initAlarmHistory',
      payload: {
        pageSize: 12,
        pageNo: 1
      }
    });
  }
  onAlarmFaceViewClick = value => {
    this.props.dispatch({
      type: 'index/fetchContrast',
      payload: value
    });
  };
  closeViewDetailsModule = () => {
    this.props.dispatch({
      type: 'index/closeViewDetailsModule'
    });
  };

  render() {
    return (
      <div className={styles.wrap}>
        <div className={styles.header}>
          <div className={styles.logo} />
          <span className={styles.text}>实时报警</span>
          <Link to="/alarm" >
            <Icon type="desktop" className={styles.screen} style={{ fontSize: 30 }} />
          </Link>
        </div>
        <div className={styles.pad}>
          {this.props.index && this.props.index.alarmList ? this.props.index.alarmList.map((value, i) =>
            <AlarmActualCard
              data={value}
              key={i}
              onClick={this.onAlarmFaceViewClick}
            />) : null}

        </div>
        {this.props.index.contrast ?
          <ViewDetailsModule
            data={this.props.index.contrast}
            visible={this.props.index.actualDetailsVisible}
            onClosed={this.closeViewDetailsModule}
          /> : null}

      </div>
    );
  }
}


function mapStateToProps({ index }) {
  return { index };
}


export default connect(mapStateToProps)(AlarmRecordActualPage);
