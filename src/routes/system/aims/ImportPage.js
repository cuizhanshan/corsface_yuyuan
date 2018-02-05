/**
 * Created by Riky on 2017/2/24.
 */

import React from 'react';
import {connect} from 'dva';

import SystemLayout from './../SystemLayout';

const ImportPage = ({dispatch, system, location}) => {

  return (
    <SystemLayout location={location} dispatch={dispatch}>

    </SystemLayout>
  )

};

function mapStateToProps({system}) {
  return {system}
}

export  default connect(mapStateToProps)(ImportPage);






