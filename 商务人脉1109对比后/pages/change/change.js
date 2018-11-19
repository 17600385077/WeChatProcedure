// pages/change/change.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var user_id = options.id;
    that.setData({
      user_id: options.id
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

  },
  change_infor:function(){
    var that = this;
    var id = that.data.user_id;
    wx.navigateTo({
      url: '../write/write?id='+id
    })
  },
  change_skill: function () {
    var that = this;
    var id = that.data.user_id;
    wx.navigateTo({
      url: '../add/add?id='+id
    })
  }
})