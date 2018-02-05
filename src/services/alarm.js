/**
 * Created by Riky on 2017/3/27.
 */
import request from '../utils/request';
import {API_PREFIX, toQueryString} from '../utils/constant';

export async function alarmList(params) {
  return request(API_PREFIX + '/alarmhistory/list.do?'+toQueryString(params))
}


