
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
    // 有信息
    group_info: true,
    // 无信息
    no_group: false,
    //群ID
    openGid: "",
    // 群列表
    group_gid: [],
    page: 1,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var shareTicket = wx.getStorageSync('shareTicket');
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    var page = that.data.page;
    const session = qcloud.Session.get();
    if (session) {
      wx.login({
        success(loginResult) {
          var code = loginResult.code;
          var shareTicket = wx.getStorageSync('shareTicket') || "";
          wx.getUserInfo({
            success(userResult) {
              const header = {
                'X-WX-Code': code,
                'X-WX-Encrypted-Data': userResult.encryptedData,
                'X-WX-IV': userResult.iv,
                'X-WX-Skey': session.userinfo.openId,
                'content-type': "application/x-www-form-urlencoded"
              }
              // 获取所有群
              wx.request({
                url: config.service.get_user_all_gruop,
                header: header,
                data: {
                  paeg: page,
                },
                dataType: 'json',
                method: 'post',
                success(result) {
                  if (result.data.info.code == 1) {
                    that.setData({
                      // 有信息
                      group_info: false,
                      // 无信息
                      no_group: true,
                      group_gid: result.data.info.data
                    })
                  } else {
                    that.setData({
                      // 有信息
                      group_info: true,
                      // 无信息
                      no_group: false
                    })
                  }
                },
                fail(err) {
                  console.error('登录失败，可能是网络错误或者服务器发生异常')
                }
              });
              if (shareTicket != "") {
                wx.getShareInfo({
                  shareTicket: shareTicket,
                  success: function(res) {
                    var encryptedData = res.encryptedData;
                    var iv = res.iv;
                    // 绑定群di
                    wx.request({
                      url: config.service.binding_flock_user,
                      header: header,
                      data: {
                        'code': code,
                        'encryptedData': encryptedData,
                        "iv": iv
                      },
                      dataType: 'json',
                      method: 'post',
                      success: function (result) {
                        
                        if (result.data.info.code == 1) {
                          that.setData({
                            openGid: result.data.info.openGid,
                            group_info:false,
                            no_group:true,
                          });
                        }else{
                          that.setData({
                            group_info: true,
                            no_group: false
                          })
                        }
                        //绑定成功清空缓存shareTicket
                        // wx.removeStorageSync("shareTicket");
                      }
                    })

                    
                    
                  }
                })
              }
            }
          })
        }
      })
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

  //授权
  bindGetUserInfo: function() {
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
                      success: function(res) {
                        var encryptedData = res.encryptedData;
                        var iv = res.iv;
                        const header = {
                          'X-WX-Code': code,
                          'X-WX-Encrypted-Data': userResult.encryptedData,
                          'X-WX-IV': userResult.iv,
                          'X-WX-Skey': session.userinfo.openId,
                          'content-type': "application/x-www-form-urlencoded"
                        }
                        wx.request({
                          url: config.service.binding_flock_user,
                          header: header,
                          data: {
                            'code': code,
                            'encryptedData': encryptedData,
                            "iv": iv
                          },
                          dataType: 'json',
                          method: 'post',
                          success: function(res) {
                            if (res.data.info.code == 1) {
                              that.setData({
                                group_info: false,
                                no_group: true
                              });
                            }
                            //绑定成功清空缓存shareTicket
                            // wx.removeStorageSync("shareTicket");
                          }
                        })
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
          group_info: true,
          no_group: false
        })
      },
      fail: err => {
        console.error(err)
      }
    })

  },

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
    var that = this;
    var page = that.data.page;
    var oldData = that.data.group_gid;
    this.setData({
      page: page - 0 + 1,
    })
    var newPage = that.data.page;
    const session = qcloud.Session.get();
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

              wx.showToast({
                title: '拼命加载中',
                icon: 'loading',
                duration: 200,
                success() {
                  wx.request({
                    url: config.service.get_user_all_gruop,
                    header: header,
                    data: {
                      page: newPage,
                    },
                    dataType: 'json',
                    method: 'post',
                    success(result) {
                      that.setData({
                        group_gid: that.data.group_gid.concat(result.data.info.data),
                      })
                    },
                    fail(err) {
                      console.error('登录失败，可能是网络错误或者服务器发生异常')

                    }
                  });
                }
              })
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function(result) {
    wx.showShareMenu({
      withShareTicket: true
    })
    return {
      title: '快来看看本群的小伙伴都是谁~',
      path: '/pages/index/index',
      imageUrl: 'https://naserviceoss.oss-cn-beijing.aliyuncs.com/mp/circle/circle/share_img.jpg'
    }
  },
  go_memberList:function(e){
    var openGid = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/memberList/memberList?id='+ openGid,
    })
  }

})