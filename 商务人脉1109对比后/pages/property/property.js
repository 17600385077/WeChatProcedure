var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
// var sdk = require("../../utils/sdk.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    location: {},
    userInfo: {},
    adds:[],
    auth: true,
    load: 1,
    openId: "",
    appId: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    const session = qcloud.Session.get()
    if (session) {
      wx.switchTab({
        url: '../my/my'
        });
    }
  },
  // formSubmit: function (e) {
  //   var id = e.detail.value.houseId;
  //   var that = this;
  //   const session = qcloud.Session.get()
  //   wx.login({
  //     success(loginResult) {
  //       wx.getUserInfo({
  //         success(userResult) {
  //           const header = {
  //             'X-WX-Code': loginResult.code,
  //             'X-WX-Encrypted-Data': userResult.encryptedData,
  //             'X-WX-IV': userResult.iv,
  //             'X-WX-Skey': session.userinfo.openId,
  //             'content-type': "application/x-www-form-urlencoded"
  //           }
  //           // 请求服务器登录地址，获得会话信息
  //           wx.request({
  //             url: config.service.bind_property,
  //             header: header,
  //             data: {
  //               code: loginResult.code,
  //               skey: session.skey,
  //               property_id: id
  //             },
  //             dataType: 'json',
  //             method: 'post',
  //             success(result) {
  //               wx.switchTab({
  //                 url: '../home_page/home_page'
  //               });

  //             },
  //             fail(err) {
  //               console.error('登录失败，可能是网络错误或者服务器发生异常')

  //             }
  //           });
  //         },
  //         fail(userError) {
  //           cb(new Error('获取微信用户信息失败，请检查网络状态'), null)
  //         }
  //       });
  //     },
  //     fail(loginError) {
  //       cb(new Error('微信登录失败，请检查网络状态'), null)
  //     }
  //   })
  // },
  bindGetUserInfo: function () {
    var that = this;
    qcloud.login({
      success: res => {
        wx.switchTab({
          url: '../index/index'
        });
      },
      fail: err => {
        console.error(err)
        util.showModel('登录错误', err.message)
      }
    })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})