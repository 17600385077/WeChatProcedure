// pages/my/my.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 未填写个人信息
    no_write: false,
    // 已填写信息
    already_write: true,
    regin:["北京市", "北京市", "东城区"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    const session = qcloud.Session.get()
    if (session) {
      console.log(12312);
    }else{
      wx.navigateTo({
        url: '/pages/property/property',
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onShow: function () {
    var that = this;
    var thatis = [];
    var then = {};
    const session = qcloud.Session.get()
    if (session) {
      wx.login({
        success(loginResult) {
          wx.getUserInfo({
            success(userResult) {
              const header = {
                'X-WX-Code': loginResult.code,
                'X-WX-Encrypted-Data': userResult.encryptedData,
                'X-WX-IV': userResult.iv,
                'X-WX-Skey': session.userinfo.openId,
                'content-type': "application/x-www-form-urlencoded"
              }
              // 请求服务器登录地址，获得会话信息
              var region = that.data.regin;
              var user_name = '余翔';
              var phone_num = '18612412941';
              var gender = 1;
              var job_status = 1;
              var job_year = 2018; 
              var school = '北京大学';
              var take_office = '小兵蛋子';
              var company_name = '力美';
              var info_provide = 'asdasdasd';
              wx.request({
                url: config.service.card_add,
                header: header,
                data: {
                  region: region,
                  user_name:user_name,
                  phone_num: phone_num,
                  gender: gender,
                  job_status: job_status,
                  job_year: job_year,
                  take_office: take_office,
                  company_name: company_name,
                  info_provide: info_provide
                },
                dataType: 'json',
                method: 'post',
                success(result) {
                  // that.setData({ userInfo: result.data.data, logged: true, adds: result.data.info, load: 0 })
                },
                fail(err) {
                  console.error('登录失败，可能是网络错误或者服务器发生异常')

                }
              });
            },
            fail(userError) {
              cb(new Error('获取微信用户信息失败，请检查网络状态'), null)
            }
          });
        },
        fail(loginError) {
          cb(new Error('微信登录失败，请检查网络状态'), null)
        }
      })
    } else {
      wx.navigateTo({
        url: '../property/property'
      })
    }
  },


  /**
   * 生命周期函数--监听页面显示
   */
 
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

  },
  // 去编辑资料
  go_write:function(){
    wx.navigateTo({
      url: '../write/write',
    })
  },
  // 去添加技能
  go_add:function(){
    wx.navigateTo({
      url: '../add/add',
    })
  },
  // 去选择修改
  go_change:function(){
    wx.navigateTo({
      url: '../change/change',
    })
  }
})