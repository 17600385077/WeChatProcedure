// pages/my/my.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    accredit: false,
    outerState: false,
    // 未填写个人信息
    no_write: false,
    // 已填写信息
    already_write: true,
    // 未选择标签
    go_add: false,
    // 已经选择了标签
    choosed_skill:true,
    // 选中的技能标签
    skill_list: [],
    name: '',
    serial: '',
    city: '',
    info_provide: '',
    user_id:'',
    id:'',
    company_name:'',
    take_office:'',
    my_img:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    const session = qcloud.Session.get()
    if (session) {

    } else {
      // wx.navigateTo({
      //   url: '/pages/property/property',
      // })
      that.setData({
        accredit: true,
        outerState: true,
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onShow: function() {
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
              wx.request({
                url: config.service.get_card,
                header: header,
                data: {},
                dataType: 'json',
                method: 'post',
                success(result) {
                  if (result.data.code != 1) {
                    that.setData({
                      already_write: true,
                      no_write: false,
                    });
                  } else {
                    var uesr_id = that.data.user_id;
                    that.setData({
                      already_write: false,
                      no_write: true,
                      name: result.data.data.user_name,
                      serial: result.data.data.staff_number,
                      city: result.data.data.city_name,
                      info_provide: result.data.data.info_provide,
                      user_id: result.data.data.user_id,
                      id: result.data.data.id,
                      company_name: result.data.data.company_name,
                      take_office: result.data.data.take_office,
                      wechat: result.data.data.wechat_id
                    })
                  
                  }
                  // 标签
                  wx.request({
                    url: config.service.get_user_skill_info,
                    header: header,
                    data: {
                      search_user_id: that.data.user_id,
                    },
                    dataType: 'json',
                    method: 'post',
                    success(result) {
                      that.setData({
                        my_img : result.data.data.avatarUrl,
                      })
                      if (result.data.info.code == 1) {
                        that.setData({
                          // 未选择标签
                          go_add: true,
                          // 已经选择了标签
                          choosed_skill: false,
                          skill_list: result.data.info.data,
                        })
                      }else{
                        that.setData({
                          // 未选择标签
                          go_add: false,
                          // 已经选择了标签
                          choosed_skill: true
                        })
                      }

                    },
                    fail(err) {
                      console.error('登录失败，可能是网络错误或者服务器发生异常')

                    }
                  });
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
      that.setData({
        accredit: true,
        outerState: true,
      })
      // wx.navigateTo({
      //   url: '../property/property'
      // })
    }
  },
  //授权
  bindGetUserInfo: function () {
    var that = this;
    var shareTicket = wx.getStorageSync('shareTicket') || "";
    qcloud.login({
      success: res => {
        const session = qcloud.Session.get();
        if (session) {
          wx.login({
            success(loginResult) {
              var code = loginResult.code;
              wx.getUserInfo({
                success(userResult) {
                  //如果shareTicket不为空添加群和用户关联
                  if (shareTicket != "") {
                    wx.getShareInfo({
                      shareTicket: shareTicket,
                      success: function (res) {
                        var encryptedData = res.encryptedData;
                        var iv = res.iv;
                        const header = {
                          'X-WX-Code': code,
                          'X-WX-Encrypted-Data': userResult.encryptedData,
                          'X-WX-IV': userResult.iv,
                          'X-WX-Skey': session.userinfo.openId,
                          'content-type': "application/x-www-form-urlencoded"
                        }
                      }
                    })
                  }
                },
                fail(userError) {
                  console.error(new Error('获取微信用户信息失败，请检查网络状态'), null)
                }
              });
            },
            fail(loginError) {
              console.error(new Error('微信登录失败，请检查网络状态'), null)
            }
          })
        }
        that.setData({
          accredit: false,
          outerState: false,
          infor_list: true,
          no_infor: false
        })
      },
      fail: err => {
        console.error(err)
      }
    })

  },

  /**
   * 生命周期函数--监听页面显示
   */

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    var that = this;
    wx.showShareMenu({
      withShareTicket: true
    })
    return {
      title: '大家好，我是' + that.data.name+',是'+ that.data.company_name +'公司的'+ that.data.take_office + '交个朋友吧~',
      path: '/pages/detail/detail?id='+that.data.user_id
    }
  },



  // 去编辑资料
  go_write: function() {
    wx.navigateTo({
      url: '../write/write',
    })
  },
  // 去添加技能
  go_add: function() {
    var that= this;
    var id = that.data.user_id;
    wx.navigateTo({
      url: '../add/add?id='+ id
    })
  },
  // 去选择修改
  go_change: function() {
    var that = this;
    var id = that.data.user_id;
    wx.navigateTo({
      url: '../change/change?id='+id
    })
  },
  // 跳转保存图片
  go_card:function(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/card/card?id='+id,
      success: function(res) {},
    })
  },
})