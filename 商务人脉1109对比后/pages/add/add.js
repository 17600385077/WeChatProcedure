// pages/add/add.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 类型
    skill_list: [
      {
        id: '1',
        skill_name: "广告销售",
        isSelected: 0
      },
      {
        id: '2',
        skill_name: "媒介商务",
        isSelected: 0
      },
      {
        id: '3',
        skill_name: "新媒体运营",
        isSelected: 0
      },
      {
        id: '4',
        skill_name: "活动策划",
        isSelected: 0
      },
      {
        id: '5',
        skill_name: "用户增长",
        isSelected: 0
      },
      {
        id: '6',
        skill_name: "销售渠道",
        isSelected: 0
      },
      {
        id: '7',
        skill_name: "游戏买量",
        isSelected: 0
      },
      {
        id: '8',
        skill_name: "小程序相关",
        isSelected: 0
      },
      {
        id: '9',
        skill_name: "社群运营",
        isSelected: 0
      },
      {
        id: '10',
        skill_name: "换量需求",
        isSelected: 0
      },
      {
        id: '11',
        skill_name: "技术外包",
        isSelected: 0
      },
      {
        id: '12',
        skill_name: "项目投融资",
        isSelected: 0
      },
      {
        id: '13',
        skill_name: "其他",
        isSelected: 0
      },
    ],
    // 标签id数组
    group_id:[],
    // user_id
    user_id:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var user_id = options.id;
    that.setData({
      user_id: user_id
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
              // 添加标签
              wx.request({
                url: config.service.get_user_skill_info,
                header: header,
                data: {
                  search_user_id:that.data.user_id,
                },
                dataType: 'json',
                method: 'post',
                success(result) {
                  if(result.data.info.code == 1){
                    that.setData({
                      skill_list:result.data.info.data,
                      group_id: result.data.info.group_id,
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
  // 选择技能
  click_choose: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var item = this.data.skill_list[index];
    var id = this.data.skill_list[index].id;
    var group_id = that.data.group_id;
    item.isSelected = !item.isSelected;
    if (item.isSelected){
      group_id.push(id);
    } else if (!item.isSelected) {
      group_id.pop(id);
    }
    that.setData({
      skill_list: this.data.skill_list,
    });
  },
  // 确认 返回我的
  go_my: function() {
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
              // 添加标签
              wx.request({
                url: config.service.add_user_skill,
                header: header,
                data: {
                  skill_ids: that.data.group_id,
                },
                dataType: 'json',
                method: 'post',
                success(result) {
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

    wx.reLaunch({
      url: '../my/my',
    })
  }
})