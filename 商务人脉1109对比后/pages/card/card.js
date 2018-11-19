// pages/card/card.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgUrl:[],
        id: 19,
        staff_number:"",
    },

    /**
     * 生命周期函数--监听页面加载
     */
  onLoad: function (options) {
    var id = parseInt(options.id) ? parseInt(options.id):"";
        this.setData({
            id: id
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
                            // 请求服务器登录地址，获得会话信息
                            wx.request({
                                url: config.service.get_card_by_id,
                                header: header,
                                data: {
                                    id: that.data.id,
                                },
                                dataType: 'json',
                                method: 'post',
                                success(res) {
                                    if(res.data.code == 1){
                                        that.setData({
                                            imgUrl: res.data.data.share_img,
                                            staff_number: res.data.data.staff_number
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
        }
    },

    /**
     * 长按保存图片
     */
    previewImage: function(e){
        wx.previewImage({
            current: this.data.imgUrl, // 当前显示图片的http链接   
            urls: this.data.imgUrl // 需要预览的图片http链接列表   
        })
        // wx.getImageInfo({// 获取图片信息（此处可不要）
        //     src: 'https://www.yxice.com/images/final_share_img/1541228178_28482.jpg',
        //     success: function (res) {
        //         console.log(res.width)
        //         console.log(res.height)
        //     }
        // })
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
    onShareAppMessage: function (res) {
        var id = this.data.id;
        return {
            title: "商务人脉",
            // imageUrl: share_image,
            path: 'pages/card/card?id=' + id,
            success: function (res) {
            }
        }
    }
})
