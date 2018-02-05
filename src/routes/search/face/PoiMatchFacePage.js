/**
 * Created by Riky on 2017/4/21.
 */

import React from 'react';
import {connect} from 'dva';
import MayLayout from '../../../components/common/MainLayout';
import FilterProcessFaceView from '../../../components/search/FilterProcessFaceView';
import pathToRegexp from  'path-to-regexp';
import {StyleSheet, css} from 'aphrodite';
import MatchedFaceView from '../../../components/search/MatchedFaceView';
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
    left: 366,
  }
});

class PoiMatchFacePage extends React.Component {

  constructor(props) {
    super(props);

    this.fetchPerson2face = this.fetchPerson2face.bind(this);
    this.previousStep = this.previousStep.bind(this);
    this.relateFace = this.relateFace.bind(this);
    this.resolveResult = this.resolveResult.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }

  componentWillMount() {
    const match = pathToRegexp('/search/face/person2face/:personId').exec(this.props.location.pathname);
    if (match && match[1] && match[1]) {
      this.props.dispatch({type: 'search/poi', payload: {personId: match[1]}});
      this.setState({personId: match[1]});
      this.props.dispatch({type:'search/spinLoading'});
      this.props.dispatch({type:'search/clearErrorMsg'});
      this.props.dispatch({type:'search/resetMatch'});
      this.props.dispatch({type:'search/cameraList'});
    }
  }

  componentDidMount(){
    this.fetchPerson2face({personId:this.state.personId});
  }


  componentWillUnmount(){
    this.props.dispatch({type:'search/clearMatch'});
    this.props.dispatch({type:'search/clearErrorMsg'});
    this.props.dispatch({type:'search/cancelMatch'})
  }

  fetchPerson2face = (query) => {
    this.props.dispatch({type: 'search/matchPerson2Facetrack', payload: query});
    this.props.dispatch({type:'search/spinLoading'});
  };

  previousStep = () => {
    this.props.dispatch(routerRedux.goBack());
  };

  relateFace = (value) => {
    this.props.dispatch({type: 'search/relateFace', payload: value})
  };

  resolveResult = () => {
    if (this.props.search.poi && this.props.search.poi.personId) {
      this.props.dispatch(routerRedux.push(`/search/face/track/${this.props.search.poi.personId}`))
    }
  };

  closedConfirmModal = () => {
    this.props.dispatch({type: 'search/closedConfirmModal'})
  };

  showConfirmModal = () => {
    this.props.dispatch({type: 'search/showConfirmModal'})
  };

  onSearchSubmit =(value)=>{

    let query = {
      personId:this.state.personId,
      srcIds:value.srcIds
    };
    this.props.dispatch({type:'search/spinLoading'});
    this.props.dispatch({type:'search/resetMatch'});
    this.fetchPerson2face(query);

  };
  render() {
    return (
      <MayLayout location={this.props.location}>
        <FilterProcessFaceView current={2} className={css(styles.process)}/>
        <MatchedFaceView className={css(styles.container)} poi={this.props.search.poi ? this.props.search.poi : null}
                         matchedFaceList={this.props.search.matchedFaceList ? this.props.search.matchedFaceList : null}
                         cameraList={this.props.search.cameraList ? this.props.search.cameraList : null}
                         previousStep={this.previousStep}
                         relateFace={this.relateFace}
                         resolveResult={this.resolveResult}
                         closedConfirmModal={this.closedConfirmModal}
                         showConfirmModal={this.showConfirmModal}
                         confirmModalVisible={this.props.search.confirmModalVisible}
                         spinLoading={this.props.search.loading}
                         onQuerySubmit={this.onSearchSubmit}
                         noDateRemind={this.props.search.remindControl}

        />
      </MayLayout>
    )
  }
}
function mapStateToProps({search}) {
  return {search}
}
export default connect(mapStateToProps)(PoiMatchFacePage)




