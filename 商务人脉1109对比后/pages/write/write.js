// pages/write/write.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 性别
    sex: [{
        id: 0,
        people: '男'
      },
      {
        id: 1,
        people: '女'
      }
    ],
    sex_name: '',
    // 就业
    job: [{
        id: 0,
        yes: '已就业'
      },
      {
        id: 1,
        yes: '未就业'
      }
    ],
    job_stu: '',
    // 年份
    date: 2018,
    // 省份
    region: ['北京市', '北京市', '东城区'],
    // 值
    receiverName: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    var that=this;
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
              // 请求是否 有数据
              wx.request({
                url: config.service.get_card,
                header: header,
                data: {},
                dataType: 'json',
                method: 'post',
                success(result) {
                  if (result.data.code == 1) {
                    var res = result.data.data;

                    var province = that.data.region[0];
                    var city = that.data.region[1];
                    var district = that.data.region[2];
                    that.setData({
                      receiverName: res.user_name,
                      receiverMobile: res.phone_num,
                      sex_id: res.gender,
                      job_id: res.job_status,
                      date: res.job_year,
                      companyName: res.company_name,
                      workName: res.take_office,
                      province: res.province_name,
                      city: res.city_name,
                      district: res.district_name,
                      help: res.info_provide,
                      myWeChat: res.wechat_id
                    });
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
  //点击切换性别
  chooes_sex: function(e) {
    var ids = e.currentTarget.dataset.id; //获取自定义的id   
    this.setData({
      sex_id: ids //把获取的自定义id赋给当前组件的id(即获取当前组件)  
    })
    var sex = this.data.sex;
    var sex_name = sex[ids].people;
    this.setData({
      sex_name: sex_name
    })
  },
  //点击切换就业
  chooes_job: function(e) {
    var ids = e.currentTarget.dataset.id; //获取自定义的id   
    this.setData({
      job_id: ids //把获取的自定义id赋给当前组件的id(即获取当前组件)  
    })
    var job = this.data.job;
    var job_stu = job[ids].yes;
    this.setData({
      job_stu: job_stu
    })
  },
  // 年份
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  // 省份
  bindRegionChange: function(e) {
    this.setData({
      region: e.detail.value
    })
  },
  // 资料帮助
  bindTextAreaBlur: function(e) {

  },
  // 表单信息
  formSubmit: function(e) {
    var that = this;
    var receiverName = e.detail.value.inputName;
    var myWeChat = e.detail.value.myWeChat;
    var receiverMobile = e.detail.value.inputMobile;
    var date = e.detail.value.dateName;
    var companyName = e.detail.value.companyName;
    var workName = e.detail.value.workName;
    var region = that.data.region;
    var help = e.detail.value.helpName;
    if (!receiverName) {
      wx.showModal({
        content: '姓名不能为空',
        showCancel: false
      })
      return
    }
    if (!myWeChat) {
      wx.showModal({
        content: '微信号不能为空',
        showCancel: false
      })
      return
    }
    if (!receiverMobile) {
      wx.showModal({
        content: '手机号不能为空',
        showCancel: false
      })
      return
    }
    if (!receiverMobile.match(/^1[3-9][0-9]\d{8}$/)) {
      wx.showModal({
        content: '手机号格式不正确',
        showCancel: false
      })
      return
    }
    if (!companyName) {
      wx.showModal({
        content: '请填写公司',
        showCancel: false
      })
      return
    }
    if (!workName) {
      wx.showModal({
        content: '请填写职位',
        showCancel: false
      })
      return
    }
    if (!help) {
      wx.showModal({
        content: '请填写可以提供内容',
        showCancel: false
      })
      return
    } else {

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
                // 请求是否 有数据
                wx.request({
                  url: config.service.get_card,
                  header: header,
                  data: {},
                  dataType: 'json',
                  method: 'post',
                  success(result) {
                    if (result.data.code != 1) {
                      // 请求从未填写过数数据 创建卡片
                      wx.request({
                        url: config.service.card_add,
                        header: header,
                        data: {
                          region: that.data.region,
                          user_name: e.detail.value.inputName,
                          phone_num: e.detail.value.inputMobile,
                          gender: that.data.sex_name,
                          job_status: that.data.job_stu,
                          job_year: e.detail.value.dateName,
                          take_office: e.detail.value.workName,
                          company_name: e.detail.value.companyName,
                          info_provide: e.detail.value.helpName,
                          wechat_id: e.detail.value.myWeChat
                        },
                        dataType: 'json',
                        method: 'post',
                        success(result) {
                        },
                        fail(err) {
                          console.error('登录失败，可能是网络错误或者服务器发生异常')

                        }
                      });
                    }else{
                      

                      // 请求填写过数数据 修改卡片
                      wx.request({
                        url: config.service.update_card,
                        header: header,
                        data: {
                          region: that.data.region,
                          user_name: e.detail.value.inputName,
                          phone_num: e.detail.value.inputMobile,
                          gender: that.data.sex_name,
                          job_status: that.data.job_stu,
                          job_year: e.detail.value.dateName,
                          take_office: e.detail.value.workName,
                          company_name: e.detail.value.companyName,
                          info_provide: e.detail.value.helpName,
                          wechat_id: e.detail.value.myWeChat
                        },
                        dataType: 'json',
                        method: 'post',
                        success(result) {
                        },
                        fail(err) {
                          console.error('登录失败，可能是网络错误或者服务器发生异常')

                        }
                      });



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


      wx.reLaunch({
        url: '../my/my',
      })
    }
  },

})