/**
 * Created by yunshitu on 2017/4/30.
 */


import request from '../utils/request';
import {API_PREFIX, toQueryString} from '../utils/constant';
export async function cameraList(params) {
  return request(API_PREFIX + '/camera/list.do?'+toQueryString(params))
}
export async function cameraListAll(params) {
  return request(API_PREFIX+'/camera/listAll.do?'+toQueryString(params))
}
//
export async function listAllRunning(params) {
  return request(API_PREFIX+'/camera/listAllRunning.do?'+toQueryString(params))
}
export async function cameraScreenList(params) {
  return request(API_PREFIX+'/camera/cameraScreenList.do?'+toQueryString(params))
}
export async function getDevices() {
  return request(API_PREFIX + '/camera/getDevices.do')
}
// 豫园获取所有门区
export async function ygGetAccess() {
  return request(API_PREFIX + '/analysis/ygGetAccess.do')
}
export async function addCamera(params) {
  return request(API_PREFIX+'/camera/add.do',{
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    },
    credentials: "include",
    body: toQueryString(params)
  })
}
export async function modifyCamera(params) {
  return request(API_PREFIX+'/camera/modify.do',{
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    },
    credentials: "include",
    body: toQueryString(params)
  })
}
export async function deleteCamera(params) {
  return request(API_PREFIX+'/camera/delete.do',{
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    },
    credentials: "include",
    body: toQueryString(params)
  })
}
export async function changeCameraStatus(params) {
  return request(API_PREFIX+'/camera/changeCameraStatus.do',{
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    },
    credentials: "include",
    body: toQueryString(params)
  })
}
