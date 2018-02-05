/**
 * Created by Riky on 2017/4/26.
 */

/**
 * Created by Riky on 2017/4/21.
 */

import React from 'react';
import {connect} from 'dva';
import MayLayout from '../../../components/common/MainLayout';
import pathToRegexp from  'path-to-regexp';
import {StyleSheet, css} from 'aphrodite';
import FilterProcessNewView from '../../../components/search/FilterProcessNewView';
import HistoryTrackView from '../../../components/search/HistoryTrackView';
import {routerRedux} from 'dva/router';
const styles = StyleSheet.create({
  process: {
    position: 'absolute',
    top: 100,
    left: 50
  },
  container: {
    position: 'absolute',
    top: 14,
    left: 366
  }

});

class PoiTrackPage extends React.Component {

  constructor(props) {
    super(props);
    this.previousStep = this.previousStep.bind(this);
  }

  componentWillMount() {
    const match = pathToRegexp('/search/new/track/:personId').exec(this.props.location.pathname);
    if (match && match[1] && match[1]) {
      this.props.dispatch({type: 'search/poi', payload: {personId: match[1]}});
      this.setState({personId: match[1]});
    }
  }

  componentWillUnmount(){
    this.props.dispatch({type:'search/clearMatch'});
    this.props.dispatch({type:'search/clearErrorMsg'});
  }


  previousStep = () => {
    this.props.dispatch(routerRedux.goBack());
  };


  render() {
    return (
      <MayLayout location={this.props.location}>
        <FilterProcessNewView current={2} className={css(styles.process)}/>
        <HistoryTrackView className={css(styles.container)} poi={this.props.search.poi ? this.props.search.poi : null}
                          previousStep={this.previousStep}
        />
      </MayLayout>
    )
  }
}
function mapStateToProps({search}) {
  return {search}
}
export default connect(mapStateToProps)(PoiTrackPage)





