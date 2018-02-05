/**
 * Created by Riky on 2017/3/8.
 */

/**
 *  websocket 请求，socket.on('event',function(data){})  事件不能多次订阅，不然会出现多条重复数据
 */

import io from 'socket.io-client';

let socket;

export function watchList(url, cb) {
  if (!socket) {
    socket = io(url,{transports: ['polling', 'websocket']});
    socket.on('connect', function () {
      console.log('websocket已经链接上');
    });
    socket.on('ftmsg', (data) => {
      cb(data);
    });
    socket.on('disconnect', function () {
      console.log('与服务其断开');
    });
    socket.on('reconnect', function() {
      console.log('重新连接到服务器');
    });
  } else {
    console.log('already watchList! 155')
  }
}
