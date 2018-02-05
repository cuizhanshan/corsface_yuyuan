/**
 * Created by Jason on 2017/7/20.
 */
import request from '../utils/request';
import {API_PREFIX, toQueryString} from '../utils/constant';

export async function allTrafficStatistics(params) {
  return request(API_PREFIX + '/analysis/count.do?'+toQueryString(params))
}
export async function getCamerCaptureFtCount(params) {
  return request(API_PREFIX + '/analysis/getCamerCaptureFtCount.do?'+toQueryString(params))
}
export async function getCamerCaptureAmCount(params) {
  return request(API_PREFIX + '/analysis/getCamerCaptureAmCount.do?'+toQueryString(params))
}

export async function ygGetTitleCount(params) {
  return request(API_PREFIX + '/analysis/ygGetTitleCount.do?'+toQueryString(params))
}

export async function ygGetCount(params) {
  return request(API_PREFIX + '/analysis/ygGetCount.do?'+toQueryString(params))
}
export async function ygGetPeriodCount (params) {
  return request(API_PREFIX + '/analysis/ygGetPeriodCount.do?'+toQueryString(params))
}
export async function ygGetStayCount (params) {
  return request(API_PREFIX + '/analysis/ygGetStayCount.do?'+toQueryString(params))
}

