import React from 'react';
import {Router, Route, IndexRoute} from 'dva/router';

import IndexPage from './routes/index/IndexPage';
import shadowPage from './routes/index2.0/IndexPage';

import ContrastPage from './routes/face/ContrastPage';
import FaceRecordPage from './routes/face/FaceRecordPage';
import FaceRecordTablePage from './routes/face/FaceRecordTablePage';
import NewPersonByFacePage from './routes/face/NewPersonPage';


import SearchIndexPage from './routes/search/IndexPage';
import MapTestPage from './routes/search/MapTest';


import SearchByNewIndexPage from './routes/search/new/IndexPage';
import SearchByNewPoiMatchFacePage from './routes/search/new/PoiMatchFacePage';
import SearchByNewPoiTrackPage from './routes/search/new/PoiTrackPage';

import SearchByFaceIndexPage from './routes/search/face/IndexPage';
import SearchByFaceIndexTablePage from './routes/search/face/IndexTablePage';
import SearchByFaceFaceMatchPoiPage from './routes/search/face/FaceMatchPoiPage';
import SearchByFaceMatchFacePage from './routes/search/face/PoiMatchFacePage';
import SearchByFacePoiTrackPage from './routes/search/face/PoiTrackPage';

import SearchByPoiIndexPage from './routes/search/poi/IndexPage';
import SearchByPoiIndexTablePage from './routes/search/poi/IndexTablePage';
import SearchByPoiMatchFacePage from './routes/search/poi/PoiMatchFacePage';
import SearchByPoiPoiTrackPage from './routes/search/poi/PoiTrackPage';

import AlarmRecordPage from './routes/alarm/AlarmRecordPage';
import AlarmRecordTablePage from './routes/alarm/AlarmRecordTablePage';
import AlarmRecordActualPage from './routes/alarm/AlarmRecordActualPage';


import AnalysisIndexPage from './routes/analysis/IndexPage';
import AnalysisCamera from './routes/analysis/CameraPage';

import Historical from './routes/historical/IndexPage';


import PersonPage from './routes/system/aims/person/PersonPage';
import PersonTablePage from './routes/system/aims/person/PersonTablePage';
import EditPersonPage from './routes/system/aims/person/EditPersonPage';
import NewPoiPage from './routes/system/aims/person/NewPoiPage';


import GroupPage from './routes/system/aims/group/GroupPage';
import MemberPage from './routes/system/aims/group/MemberPage';
import ImportPage from './routes/system/aims/ImportPage';
import PhotoMatchPage from './routes/system/aims/PhotoMatchPage';
import PhotoMatchResultPage from './routes/system/aims/MatchResultPage';

import FacilityGroupPage from './routes/system/facility/GroupPage';
import CameraPage from './routes/system/facility/CameraPage';
import NewCameraPage from './routes/system/facility/NewCameraPage';

import SystemCfgPage from './routes/system/Config';
import MyPage from './routes/system/MyPage';
import AlarmConfigPage from './routes/system/AlarmConfigPage';

function RouterConfig({history}) {
  return (
    <Router history={history}>
      <Route path="/">
        <IndexRoute component={IndexPage}/>
        <Router path="shadow">
          <IndexRoute component={shadowPage}/>
        </Router>
        <Route path="face">
          <IndexRoute component={FaceRecordPage}/>
          <Route path='table' component={FaceRecordTablePage}/>
          <Route path='new' component={NewPersonByFacePage}/>
          <Route path='contrast/:faceId/:personId' component={ContrastPage}/>
        </Route>

        <Route path='search'>
          <IndexRoute components={SearchIndexPage}/>
          <Route path='new'>
            <IndexRoute components={SearchByNewIndexPage}/>
            <Route path="person2face/:personId" components={SearchByNewPoiMatchFacePage}/>
            <Route path="track/:personId" components={SearchByNewPoiTrackPage}/>
          </Route>

          <Route path='face'>
            <IndexRoute components={SearchByFaceIndexPage}/>
            <Route path='table' components={SearchByFaceIndexTablePage}/>
            <Route path='face2Person/:faceTrackId' components={SearchByFaceFaceMatchPoiPage}/>
            <Route path="person2face/:personId" components  ={SearchByFaceMatchFacePage}/>
            <Route path="track/:personId" components={SearchByFacePoiTrackPage}/>
          </Route>

          <Route path='poi'>
            <IndexRoute components={SearchByPoiIndexPage}/>
            <Route path="table" components={SearchByPoiIndexTablePage}/>
            <Route path="person2face/:personId" components={SearchByPoiMatchFacePage}/>
            <Route path="track/:personId" components={SearchByPoiPoiTrackPage}/>
          </Route>
          <Route path='map' components={MapTestPage}/>

        </Route>

        <Route path='alarm'>
          <IndexRoute component={AlarmRecordPage}/>
          <Route path='table' component={AlarmRecordTablePage}/>
          <Route path='actual' component={AlarmRecordActualPage}/>
        </Route>

        <Route path='analysis'>
          <IndexRoute components={AnalysisIndexPage}/>
        </Route>
        <Route path='historical'>
          <IndexRoute components={Historical}/>
        </Route>
        <Route path='system'>
          <IndexRoute components={PersonPage}/>
          <Route path='aims'>
            <Route path='person'>
              <IndexRoute components={PersonTablePage}/>
              <Route path='edit/:personId' components={EditPersonPage}/>
              <Route path='new' components={NewPoiPage}/>
            </Route>
            <Route path='group'>
              <IndexRoute components={GroupPage}/>
              <Route path=':groupId' components={MemberPage}/>
            </Route>
            <Route path='import' components={ImportPage}/>
            <Route path='photoMatch'>
              <IndexRoute components={PhotoMatchPage}/>
              <Route path=':factrackId' components={PhotoMatchResultPage}/>
            </Route>
          </Route>
          <Route path='facility'>
            <Route path='camera'>
              <IndexRoute components={CameraPage}/>
              <Route path='new' components={NewCameraPage}/>
            </Route>
            <Route path='fGroup' components={FacilityGroupPage}/>
          </Route>
          <Route path='config' components={SystemCfgPage}/>
          <Route path='alarmCfg' components={AlarmConfigPage}/>
          <Route path='my' components={MyPage}/>
        </Route>
      </Route>


    </Router>
  );
}

export default RouterConfig;
