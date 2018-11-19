
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
    infor_list: true,
    // 无信息
    no_infor: false,
    // 类型数量
    collect_num: 0,
    // 类型
    type: [
      {
        id: 0,
        title: "全部"
      },
      {
        id: 1,
        title: "广告销售"
      },
      {
        id: 2,
        title: "媒介商务"
      },
      {
        id: 3,
        title: "新媒体运营"
      },
      {
        id: 4,
        title: "活动策划"
      },
      {
        id: 5,
        title: "用户增长"
      },
      {
        id: 6,
        title: "销量渠道"
      },
      {
        id: 7,
        title: "教学运营"
      },
      {
        id: 8,
        title: "游戏买量"
      },
      {
        id: 9,
        title: "小程序相关"
      },
      {
        id: 10,
        title: "社群运营"
      },
      {
        id: 11,
        title: "换量需求"
      },
      {
        id: 12,
        title: "技术外包"
      },
      {
        id: 13,
        title: "项目投融资"
      },
      {
        id: 14,
        title: "其他"
      },
    ],
    id: 0,
    now_type: "全部",
    // 技能遮罩
    type_shade: true,
    // 群伙伴信息列表
    partner_list: [],
    openGid:'',
    page:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that =this;
    var id = options.id;
    this.setData({
      openGid:id
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
    var page = that.data.page;
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
              // 获取当前群下所有用户
              wx.request({
                url: config.service.get_group_user_list,
                header: header,
                data: {
                  openGid: that.data.openGid,
                  page:page
                },
                dataType: 'json',
                method: 'post',
                success(result) {
                  console.log(result);
                  if(result.data.info.code == 1){//该群内有商务伙伴
                    that.setData({
                      partner_list: result.data.info.data,
                      collect_num:result.data.info.num,
                      infor_list: false,
                      no_infor: true
                    })
                  } else{//该群内没有商务伙伴
                    that.setData({
                      infor_list: true,
                      no_infor: false
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
                                partner_list: res.data.info.data,
                                collect_num: res.data.info.num,
                                openGid: res.data.info.openGid,
                                infor_list: false,
                                no_infor: true
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
    var oldData = that.data.partner_list;
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
                    url: config.service.get_group_user_list,
                    header: header,
                    data: {
                      page: newPage,
                    },
                    dataType: 'json',
                    method: 'post',
                    success(result) {
                      console.log(that.data.partner_list);
                      console.log('1111111111');
                      console.log(result.data.info.data);
                      that.setData({
                        partner_list: that.data.partner_list.concat(result.data.info.data),
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
    
  },
  // 类型选择
  selective_type: function() {
    this.setData({
      type_shade: false,
    })
  },
  // 关闭技能选项
  close_shade: function() {
    this.setData({
      type_shade: true,
    })
  },
  // 切换技能
  click_choose: function(e) {
    var that = this;
    var ids = e.currentTarget.dataset.id;
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
              wx.request({
                url: config.service.choose_user_list,
                header: header,
                data: {
                  openGid: that.data.openGid,
                  search_skill_id: ids
                },
                dataType: 'json',
                method: 'post',
                success(result) {
                  that.setData({
                    partner_list: result.data.info.data,
                    collect_num: result.data.info.num
                  });
                },
              });
            },
          })
        },
      })
    }
    this.setData({
      id: ids, //把获取的自定义id赋给当前组件的id(即获取当前组件)  
      now_type: this.data.type[ids].title,
      type_shade: true,
    })
  },
  // 查看伙伴详情信息
  go_detail: function (e) {
    var id = e.currentTarget.dataset.id;
    
    wx.navigateTo({
      url: '../detail/detail?id='+ id,
    })
  }
})