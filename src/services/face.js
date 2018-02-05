/**
 * Created by Riky on 2017/3/14.
 */
import request from '../utils/request';
import {API_PREFIX, toQueryString} from '../utils/constant';
export async function faceList(params) {
  return request(API_PREFIX + '/facetrackHistory/list.do?'+toQueryString(params))
}
export async function groupList() {
  return request(API_PREFIX+'/group/listAll.do')
}
export async function newPerson(params) {
  return request(API_PREFIX+'/poi/addByFacetrack.do',{
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    },
    credentials: "include",
    body: toQueryString(params)
  })
}
export async function ftVsPoi(params) {
  return request(API_PREFIX+'/facetrackHistory/ftVsPoi.do?'+toQueryString(params))
}



export async function refreshMatch(params) {
  return request(API_PREFIX+'/facetrackHistory/refreshMatch.do',{
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    },
    credentials: "include",
    body: toQueryString(params)
  })
}

export async function deleteFacetrack(params) {
  return request(API_PREFIX+'/facetrackHistory/delete.do',{
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    },
    credentials: "include",
    body: toQueryString(params)
  })
}

export async function createFacetrackByImg(params) {
  return request(API_PREFIX+'/facetrackHistory/createFacetrackByImg.do',{
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    },
    credentials: "include",
    body: toQueryString(params)
  })
}
