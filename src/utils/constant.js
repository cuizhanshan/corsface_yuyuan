/**
 * Created by Riky on 2017/3/8.
 */

// API  请求地址
export const API_PREFIX = CF_API_PREFIX;
// export const API_PREFIX = 'http://192.168.1.71:8090/cfAdmin';
// export const API_PREFIX = 'http://10.1.205.169:8090/cfAdmin';
// export const API_PREFIX = 'http://192.168.1.206:8090/cfAdmin';

// websocket 请求地址
export const WEBSOCKET_URL = CF_WEBSOCKET;
// export const WEBSOCKET_URL = 'http://192.168.1.71:9192/ftmsg';
// export const WEBSOCKET_URL = 'http://10.1.205.169:9192/ftmsg';

// 版本号
export const BASE_VERSION = DF_VERSION;
export const API_VERSION = CF_API_VERSION;
// export const WEB_VERSION = CF_WEB_VERSION;
export const WEB_VERSION = '2.4.5';


export const INDEX_ALARM_SIZE = 100;
export const INDEX_FACE_SIZE = 300;

export const ACTUAL_ALARM_SIZE = 12;

// export const FACE_PAGE_SIZE = 33;
export const FACE_PAGE_SIZE = 40;

export const ALARM_PAGE_SIZE = 12;

export const EXPAND_IMG_SIZE = 18;

export const NEW_PERSON_FACE_IMG_SIZE = 10;

export const CONTRAST_FACE_PAGE_SIZE = 8;

export const SYSTEM_TARGET_GROUP_SIZE = 11;

export const SYSTEM_TARGET_PERSON_IMAGE_UPLOAD_SIZE = 10;

export const SEARCH_FACE_PAGE_SIZE = 20;
export const SEARCH_POI_PAGE_SIZE = 21;

export const ALARM_TYPE = ['白名单', '黑名单'];

export const SYSTEM_TARGET_PERSON_SIZE = 32;

export const CAMERA_PAGE_SIZE = 11;


export const CAMERA_CONFIG = '{\n' +
  '    "FaceMethods": {\n' +
  '        "detector": "4", \n' +
  '        "detectorCheck": "4", \n' +
  '        "alignment": "0", \n' +
  '        "tracker": "1"\n' +
  '    }, \n' +
  '    "PykoParam": {\n' +
  '        "scalefactor": 1.08, \n' +
  '        "stridefactor": 0.1, \n' +
  '        "qthreshold": 0\n' +
  '    }, \n' +
  '    "ThetaParam": {\n' +
  '        "scalefactor": 0.75, \n' +
  '        "xstep": 0.0125, \n' +
  '        "ystep": 0.0125\n' +
  '    }, \n' +
  '    "IntraParam": {\n' +
  '        "threshold": 0.75\n' +
  '    }, \n' +
  '    "FaceFeatureParam": {\n' +
  '        "gpu_threads": 1, \n' +
  '        "gpudevice": 0\n' +
  '    }, \n' +
  '    "FaceTrackParam": {\n' +
  '        "face_minsize": 0.05, \n' +
  '        "face_maxsize": 0.8, \n' +
  '        "track_facenum": 30, \n' +
  '        "gap": 3, \n' +
  '        "detect_gap": 5, \n' +
  '        "track_gap": 1, \n' +
  '        "margin": 0.5, \n' +
  '        "edge_remove": true, \n' +
  '        "minsize": 50, \n' +
  '        "duration_unvalid": 1.5, \n' +
  '        "duration_valid": 3.5, \n' +
  '        "freq_threshold": 0.35, \n' +
  '        "update_valid_times": 6, \n' +
  '        "face2face_threshold": 0.55, \n' +
  '        "bufferframes": 100, \n' +
  '        "second_removed_live": 2, \n' +
  '        "second_live": 5, \n' +
  '        "faces_live": 15\n' +
  '    }, \n' +
  '    "VideoParam": {\n' +
  '        "area_left": 0.05, \n' +
  '        "area_top": 0.05, \n' +
  '        "area_width": 0.9, \n' +
  '        "area_height": 0.9, \n' +
  '        "det_only": true, \n' +
  '        "track_size_w": 500, \n' +
  '        "det_size_w": 400, \n' +
  '        "orig_size_w": 0, \n' +
  '        "orig_aspect": -1.3333, \n' +
  '        "rotate_angle": 0, \n' +
  '        "check_frontface": true\n' +
  '    }, \n' +
  '    "BgParam": {\n' +
  '        "width": 400, \n' +
  '        "height": 226, \n' +
  '        "submitted": true, \n' +
  '        "submit_orig": true, \n' +
  '        "width_orig": 400, \n' +
  '        "count_orig": 4\n' +
  '    }, \n' +
  '    "IPCameraParam": {\n' +
  '        "url": "http://fms.cntv.lxdns.com/live/flv/channel63.flv", \n' +
  '        "dynamic_background": false, \n' +
  '        "vlc_option": "net-caching=300", \n' +
  '        "video_player": 0, \n' +
  '        "live_port": 8554, \n' +
  '        "live_width": 480, \n' +
  '        "live_buffer": 10\n' +
  '    }\n' +
  '}';


export const toQueryString = obj => obj ? `${Object.keys(obj).sort().map(key => {
  const val = obj[key];
  if (Array.isArray(val)) {
    return val.sort().map(val2 => `${encodeURIComponent(key)}=${ encodeURIComponent(val2)}`).join('&');
  }

  return `${encodeURIComponent(key)}=${ encodeURIComponent(val)}`;
}).join('&')}&ts=${new Date().getTime()}` : '';
