import request from '../../src/utils/request';

const api = CF_API_PREFIX;

const toQueryString = (obj) => {
  return obj ? Object.keys(obj).sort().map(function (key) {
    let val = obj[key];
    if (Array.isArray(val)) {
      return val.sort().map(function (val2) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
      }).join('&');
    }

    return encodeURIComponent(key) + '=' + encodeURIComponent(val);
  }).join('&') : '';
};


export async function login(params) {

  return request(api + '/logon.do', {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    },
    credentials: "include",
    body: toQueryString(params)
  })
}



