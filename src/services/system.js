/**
 * Created by Riky on 2017/3/29.
 */
import request from '../utils/request';
import {API_PREFIX, toQueryString} from '../utils/constant';
//分组管理
export async function groupList(params) {
  return request(API_PREFIX + '/group/list.do?' + toQueryString(params))
}
export async function MatchLocus(params) {
  return request(API_PREFIX+'/group/listAll.do')
}
export async function ougunitListAll(params) {
  return request(API_PREFIX+'/orgunit/ougunitListAll.do')
}
export async function ougunitList(params) {
  return request(API_PREFIX + '/orgunit/getAllOrgunitAndMapping.do?' + toQueryString(params))
}
export async function addGroup(params) {
  return request(API_PREFIX + '/group/add.do', {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    },
    credentials: "include",
    body: toQueryString(params)
  })
}
export async function modifyGroup(params) {
  return request(API_PREFIX + '/group/modify.do', {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    },
    credentials: "include",
    body: toQueryString(params)
  })
}
export async function deleteGroup(params) {
  return request(API_PREFIX + '/group/delete.do', {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    },
    credentials: "include",
    body: toQueryString(params)
  })
}
//组员管理
export async function memberList(params) {
  return request(API_PREFIX + '/group/memberList.do?' + toQueryString(params))
}
export async function notMemberList(params) {
  return request(API_PREFIX + '/group/notMemberList.do?' + toQueryString(params))
}
export async function groupDetail(params) {
  return request(API_PREFIX + '/group/detail.do?' + toQueryString(params))
}
export async function addGroupMember(params) {
  return request(API_PREFIX + '/group/addGroupMember.do', {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    },
    credentials: "include",
    body: toQueryString(params)
  })
}
export async function deleteMember(params) {
  return request(API_PREFIX + '/group/deleteMember.do', {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    },
    credentials: "include",
    body: toQueryString(params)
  })
}
//报警管理
export async function alarmConfigList(params) {
  return request(API_PREFIX + '/alarmConfig/list.do?' + toQueryString(params))
}
export async function deleteAlarmConfig(params) {
  return request(API_PREFIX + '/alarmConfig/delete.do', {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    },
    credentials: "include",
    body: toQueryString(params)
  })
}
export async function modifyAlarmConfig(params) {
  return request(API_PREFIX + '/alarmConfig/modify.do', {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    },
    credentials: "include",
    body: toQueryString(params)
  })
}
export async function addAlarmConfig(params) {
  return request(API_PREFIX + '/alarmConfig/add.do', {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    },
    credentials: "include",
    body: toQueryString(params)
  })
}

//名单管理
export async function poiList(params) {
  return request(API_PREFIX + '/poi/list.do?' + toQueryString(params))
}
export async function poiDetail(params) {
  return request(API_PREFIX + '/poi/detail.do?' + toQueryString(params))
}
export async function addByFaceTrack(params) {
  return request(API_PREFIX + '/poi/addByFacetrack.do', {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    },
    credentials: "include",
    body: toQueryString(params)
  })
}
export async function bindFaceTrack(params) {
  return request(API_PREFIX + '/poi/bindFacetrack.do', {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    },
    credentials: "include",
    body: toQueryString(params)
  })
}
export async function bindFaceTracks(params) {
  return request(API_PREFIX + '/poi/bindFacetracks.do', {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    },
    credentials: "include",
    body: toQueryString(params)
  })
}
export async function uploadFace(params) {
  return request(API_PREFIX + '/poi/uploadFace.do', {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    },
    credentials: "include",
    body: toQueryString(params)
  })
}
export async function addByUpload(params) {
  return request(API_PREFIX + '/poi/addByUpload.do', {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    },
    credentials: "include",
    body: toQueryString(params)
  })
}
export async function deletePoi(params) {
  return request(API_PREFIX + '/poi/delete.do', {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    },
    credentials: "include",
    body: toQueryString(params)
  })
}
export async function removeFaceTrack(params) {
  return request(API_PREFIX + '/poi/removeFacetracks.do', {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    },
    credentials: "include",
    body: toQueryString(params)
  })
}
export async function deletePersonImg(params) {
  return request(API_PREFIX + '/poi/deletePersonImg.do', {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    },
    credentials: "include",
    body: toQueryString(params)
  })
}
export async function modify(params) {
  return request(API_PREFIX + '/poi/modify.do', {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    },
    credentials: "include",
    body: toQueryString(params)
  })
}
export async function addOrgunit(params) {
  return request(API_PREFIX + '/orgunit/add.do', {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    },
    credentials: "include",
    body: toQueryString(params)
  })
}
export async function modifeOrgunit(params) {
  return request(API_PREFIX + '/orgunit/modife.do', {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    },
    credentials: "include",
    body: toQueryString(params)
  })
}
export async function deleteOrgunit(params) {
  return request(API_PREFIX + '/orgunit/delete.do', {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    },
    credentials: "include",
    body: toQueryString(params)
  })
}
export async function addCameraGroup(params) {
  return request(API_PREFIX + '/cameraGroup/add.do', {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    },
    credentials: "include",
    body: toQueryString(params)
  })
}
export async function deleteCameraGroup(params) {
  return request(API_PREFIX + '/cameraGroup/delete.do', {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    },
    credentials: "include",
    body: toQueryString(params)
  })
}
export async function modifeCameraGroup(params) {
  return request(API_PREFIX + '/cameraGroup/modife.do', {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    },
    credentials: "include",
    body: toQueryString(params)
  })
}


export async function faceDetail(params) {
  return request(API_PREFIX + '/facetrackHistory/detail.do?' + toQueryString(params))
}
export async function matchPerson2Facetrack(params) {
  return request(API_PREFIX + '/poi/matchPerson2Facetrack.do?' + toQueryString(params))
}
export async function getMatchedFacetrackByTransId(params) {
  return request(API_PREFIX + '/poi/getMatchedFacetrackByTransId.do?' + toQueryString(params))
}
export async function matchFacetrack2Person(params) {
  return request(API_PREFIX + '/poi/matchFacetrack2Person.do?' + toQueryString(params))
}
export async function getMatchedPersonByTransId(params) {
  return request(API_PREFIX + '/poi/getMatchedPersonByTransId.do?' + toQueryString(params))
}

export async function getFacetrackInfo(params) {
  return request(API_PREFIX + '/facetrackHistory/getFacetrackInfo.do?' + toQueryString(params))
}
export async function matchFacetrack2PersonForPhoto(params) {
  return request(API_PREFIX + '/poi/matchFacetrack2PersonForPhoto.do?' + toQueryString(params))
}
export async function getCatagoryListAll(params) {
  return request(API_PREFIX + '/cameraGroup/getCatagoryListAll.do?' + toQueryString(params))
}
export async function list(params) {
  return request(API_PREFIX + '/cameraGroup/list.do?' + toQueryString(params))
}

// config 页面接口
export async function dictoryList(params) {
    return request(API_PREFIX + '/dictory/list.do?' + toQueryString(params))
}
export async function getDictoryByTag(params) {
    return request(API_PREFIX + '/dictory/getDictoryByTag.do?' + toQueryString(params))
}
export async function dictoryAdd(params) {
    return request(API_PREFIX + '/dictory/add.do', {
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        },
        credentials: "include",
        body: toQueryString(params)
    })
}
export async function dictoryModify(params) {
    return request(API_PREFIX + '/dictory/modify.do', {
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        },
        credentials: "include",
        body: toQueryString(params)
    })
}
export async function dictoryDelete(params) {
    return request(API_PREFIX + '/dictory/delete.do', {
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        },
        credentials: "include",
        body: toQueryString(params)
    })
}
