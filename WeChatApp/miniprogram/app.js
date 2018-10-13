//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
//全局变量
    this.globalData = {
      //英灵正装地址
      cloudImagesUrl:'cloud://tomato-cloud.746f-tomato-cloud/MINIICONS/FullPicture/',
      //迷你图标地址
      cloudMiniImgUrl:'cloud://tomato-cloud.746f-tomato-cloud/MINIICONS/',
      //大图地址
      cloudFullImgUrl: 'cloud://tomato-cloud.746f-tomato-cloud/MINIICONS/FullPicture/'
    }
    
  }
})
