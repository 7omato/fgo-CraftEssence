const app = getApp()
const imgUrl = app.globalData.cloudImagesUrl

Page({
 
  data: {
    imgUrls: [],
    indexmenu:[],
    pageHeight: 600,
  },

  onLoad: function() {
    var imgShowQty=3;//一次选几个图
    this.indexImages(imgShowQty);  
    this.indexIrons();
  },

  //获取x个随机数，拼凑swiper 的图片地址
  indexImages: function(many) {
    var that = this;
    var imgUrls = [];
    // 调用云函数
    wx.cloud.callFunction({
      name: 'rd47',
      data: {
        qty: many
      },
      success: res => {
        var imgList = res.result.rdNum;
        var imgUrls = [];
        imgList.forEach(function(url) {
          imgUrls.push(imgUrl + url + "A.png");
        })
        that.setData({
          imgUrls: imgUrls
        })
      },
      fail: err => {
        console.error('[云函数] [rd47] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  //主界面图标
  indexIrons: function () {
    var that = this;
    var indexmenu = [];
    indexmenu.push({
      'id': 1,
      'icon': '../../images/icon/0.png',
      'text': '画师',
      'url': 'Illustrator/Illustrator'
    });
    indexmenu.push({
      'id': 2,
      'icon': '../../images/icon/1.png',
      'text': '人物',
      'url': 'person/person'
    });
    indexmenu.push({
      'id': 3,
      'icon': '../../images/icon/2.png',
      'text': '活动',
      'url': 'event/event'
    });
    indexmenu.push({
      'id': 4,
      'icon': '../../images/icon/3.png',
      'text': '随机',
      'url': 'randomWatch/randomWatch'
    });
    that.setData({
      indexmenu: indexmenu
    })
  },


  onReady: function() {
    //生命周期函数--监听页面初次渲染完成
    // console.log('onReady');
  },
  onShow: function() {

  },
  onHide: function() {
    //生命周期函数--监听页面隐藏
    // console.log('onHide');
  },
  onUnload: function() {
    //生命周期函数--监听页面卸载
    // console.log('onUnload');
  },
  onPullDownRefresh: function() {
    //页面相关事件处理函数--监听用户下拉动作
    // console.log('onPullDownRefresh');
  },
  onReachBottom: function() {
    //页面上拉触底事件的处理函数
    // console.log('onReachBottom');
  },
 onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
    var imgShowQty = 3;//一次选几个图
    var that = this; 
    that.indexImages(imgShowQty); 
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh()
  },
})