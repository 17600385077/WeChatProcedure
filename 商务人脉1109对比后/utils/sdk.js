//post请求
const url = 'https://weapp.whwangdoudou.cn/weapp.php';
const post = (url, params) => {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: params,
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // success网络请求成功
        if (res.statusCode != 200) {
          reject({
            error: '服务器忙，请稍后重试',
            code: 500
          });
          return;
        }
        resolve(res.data);
      },
      fail: function (res) {
        reject({
          error: '网络错误',
          code: 0
        });
      }
    })
  })
}

const user = {
  submitUserInfo(p) {
    let scene = decodeURIComponent(p.scene);
    scene = scene.split(':');
    let uid = scene[0];
    let weappid = scene[1];
    wx.setStorageSync('sdk_uid', uid);
    wx.setStorageSync('sdk_weappid', weappid);
    wx.setStorageSync('sdk_openId', p.userinfo.openId);
    let params = {
      m: 'userinfo',
      uid: uid,
      weappid: weappid,
      userinfo: JSON.stringify(p.userinfo)
    }
    post(url, params);
  },
  submitSysInfo(p) {
    if (wx.getStorageSync('sdk_uid') && wx.getStorageSync('sdk_weappid')) {
      let device_info = JSON.stringify(p.device_info);
      let timeStamp = parseInt(new Date().getTime() / 1000);
      let params = {
        m: 'start',
        uid: wx.getStorageSync('sdk_uid'),
        weappid: wx.getStorageSync('sdk_weappid'),
        device_info: device_info,
        time: timeStamp,
        openid: wx.getStorageSync('sdk_openId')
      }
      post(url, params).then(res => {
        wx.removeStorageSync('sdk_scene');
      });
    }
  },
  submitEvent(p) {
    if (wx.getStorageSync('sdk_uid') && wx.getStorageSync('sdk_weappid')) {
      let params = {
        m: 'invoke',
        uid: wx.getStorageSync('sdk_uid'),
        weappid: wx.getStorageSync('sdk_weappid'),
        type: p.type,
        content: p.content,
        openid: wx.getStorageSync('sdk_openId')
      }
      post(url, params);
    }
  },
  submitLeave() {
    if (wx.getStorageSync('sdk_uid') && wx.getStorageSync('sdk_weappid')) {
      let timeStamp = parseInt(new Date().getTime() / 1000);
      let params = {
        m: 'invoke',
        uid: wx.getStorageSync('sdk_uid'),
        weappid: wx.getStorageSync('sdk_weappid'),
        type: 'end',
        content: timeStamp,
        openid: wx.getStorageSync('sdk_openId')
      }
      post(url, params);
    }
  }
}

module.exports = {
  user: user
}