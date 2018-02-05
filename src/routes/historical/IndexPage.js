/**
 * Created by Jason on 2017/7/20.
 */

import React from 'react';
import { connect } from 'dva';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Radio, Icon } from 'antd';
import ReactEcharts from 'echarts-for-react';
import MayLayout from '../../components/common/MainLayout';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
let timer;



const styles = StyleSheet.create({

});


class Historical extends React.Component {


  render() {
    return (
    <MayLayout location={this.props.location}>
        <div></div>
        <div></div>
        <div></div>
    </MayLayout>
    );
  }
}
function mapStateToProps({historical}) {
  return {historical}
}

export default connect(mapStateToProps)(Historical);
