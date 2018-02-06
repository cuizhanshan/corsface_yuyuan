/**
 * Created by Jason on 2018/2/6.
 */
import request from '../utils/request';
import { API_PREFIX, toQueryString } from '../utils/constant';

export async function ygGetDefaultHistory(params) {
  return request(`${API_PREFIX}/analysis/ygGetDefaultHistory.do?${toQueryString(params)}`);
}
export async function ygGetHistory(params) {
  return request(`${API_PREFIX}/analysis/ygGetHistory.do?${toQueryString(params)}`);
}
export async function ygGetWeekHistory(params) {
  return request(`${API_PREFIX}/analysis/ygGetWeekHistory.do?${toQueryString(params)}`);
}
