// pages/detail/detail.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 点赞数
    endorse_num: 0,
    label: 'label',
    head_img: '',
    name: '',
    nickname: '',
    phone:'',
    company: "",
    work: "",
    time: '',
    city: '',
    help: '',
    // 技能列表
    all_skill_list: [],
    user_id: '',
    collect: 'collect',
    no_collect_: false,
    ok_collect_: true,
    collect_status: 0,

    passive_click_user_id: '',
    passive_click_skill_id: '',
    // addStatus:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var id = options.id;
    that.setData({
      user_id: id
    })
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
    var thatis = [];
    var then = {};
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
              wx.request({
                url: config.service.get_user_info,
                header: header,
                data: {
                  get_user_id: that.data.user_id,
                },
                dataType: 'json',
                method: 'post',
                success(result) {
                  var info = result.data.info.data;
                  that.setData({
                    head_img: info[0].avatar_url,
                    name: info[0].user_name,
                    nickname: info[0].nick_name,
                    phone: info[0].phone_num,
                    company: info[0].company_name,
                    work: info[0].take_office,
                    time: info[0].jobYear,
                    city: info[0].city_name,
                    help: info[0].info_provide,
                    collect_status: info[0].collect_status,
                    myWeChat: info[0].wechat_id
                  })
                  if (that.data.collect_status == 0) {
                    that.setData({
                      collect: 'collect',
                      no_collect_: false,
                      ok_collect_: true,
                    })
                  } else if (that.data.collect_status == 1) {
                    that.setData({
                      collect: 'cancel_collect',
                      no_collect_: true,
                      ok_collect_: false,
                    })
                  }
                },
                fail(err) {
                  console.error('登录失败，可能是网络错误或者服务器发生异常')

                }
              });

              //获取点赞数量 get_user_skill_number
              wx.request({
                url: config.service.get_user_skill_number,
                header: header,
                data: {
                  search_user_id: that.data.user_id,
                },
                dataType: 'json',
                method: 'post',
                success(result) {
                  console.log(result.data.info.data);
                  that.setData({
                    all_skill_list: result.data.info.data,
                  })
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

  },

  // 点赞
  add_endorse: function(e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    var user_id = that.data.user_id;

    // if (that.data.passive_click_user_id != user_id && that.data.passive_click_skill_id != id && that.data.addStatus == true) {

    // }
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
                  url: config.service.support_skill,
                  header: header,
                  data: {
                    support_user_id: that.data.user_id,
                    skill_id: id,
                  },
                  dataType: 'json',
                  method: 'post',
                  success(result) {
                    if(result.data.info.code == 1){
                      var message = that.data.all_skill_list;
                      for (let i in message) {
                        var i = parseInt(i);
                        if (i == index) {
                          var collectedStatus = false
                          if (message[i].collected == 0) {//没点赞
                            collectedStatus = true
                            message[i].collected = parseInt(message[i].collected) + 1;
                            message[i].support_num = parseInt(message[i].support_num) + 1;
                          } else {
                            collectedStatus = false
                            message[i].collected = parseInt(message[i].collected) - 1;
                            message[i].support_num = parseInt(message[i].support_num) - 1;
                          }
                          wx.showToast({
                            title: collectedStatus ? '点赞成功' : '点赞取消',
                          })
                        }
                      }
                      that.setData({
                        all_skill_list: message
                      }) 
                    }
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
  // 认识更多小伙伴
  go_circle: function() {
    wx.reLaunch({
      url: '../index/index',
    })
  },
  // 收藏
  collect: function() {
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
                url: config.service.collection_user,
                header: header,
                data: {
                  collect_user_id: that.data.user_id
                },
                dataType: 'json',
                method: 'post',
                success(result) {
                  wx.showModal({
                    content: '收藏成功',
                    showCancel: false
                  })
                  that.setData({
                    collect: 'cancel_collect',
                    no_collect_: true,
                    ok_collect_: false
                  })
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
  // 取消 收藏
  cancel_collect: function() {
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
                url: config.service.cancel_collection_user,
                header: header,
                data: {
                  collect_user_id: that.data.user_id
                },
                dataType: 'json',
                method: 'post',
                success(result) {
                  wx.showModal({
                    content: '已取消收藏',
                    showCancel: false,
                  })
                  that.setData({
                    collect: 'collect',
                    no_collect_: false,
                    ok_collect_: true
                  })
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
})