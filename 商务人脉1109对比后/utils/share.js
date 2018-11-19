const app = getApp();
function onShareAppMessage(res) {
    var arr = app.globalData.verbalTrick;
    var value = arr[Math.round(Math.random() * (arr.length - 1))];
    var shareImg = app.globalData.shareImg;
    var shareValue = shareImg[Math.round(Math.random() * (shareImg.length - 1))];
    if(res.from === 'button'){
      return {
        title: value,
        path: '/pages/index/index',
        imageUrl: shareValue,
        success: function (res) {
        }
      }
    }else{
      return {
        title: value,
        path: '/pages/index/index',
        imageUrl: shareValue,
        success: function (res) {
        }
      }
    }
}
module.exports = {
  onShareAppMessage: onShareAppMessage
}
