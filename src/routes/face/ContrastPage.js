/**
 * Created by Riky on 2017/2/24.
 */

import React from 'react';
import {connect} from 'dva';


import MayLayout from '../../components/common/MainLayout';
import ContrastPhotoView from '../../components/common/ContrastPhotoView';

const ContrastPage = ({dispatch, face, location}) => {

  const ContrastPhotoViewProps={
    selectRow(value){
      dispatch({
        type:'face/contrastRowSelect',
        payload:value
      })
    },
    pageTranslate(value){
      dispatch({
        type:'face/contrastPageTranslate',
        payload:value
      })
    },
    onClosed(){
      dispatch({
        type:'face/contrastClosed'
      })
    }
  };
  return (
    <MayLayout location={location}>
      {face.contrast?<ContrastPhotoView data={face.contrast} {...ContrastPhotoViewProps}/>:null}
    </MayLayout>
  )
};

function mapStateToProps({face}) {
  return {face}
}

export  default connect(mapStateToProps)(ContrastPage);






