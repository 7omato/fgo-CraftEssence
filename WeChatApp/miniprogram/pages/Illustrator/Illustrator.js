// pages/Illustrator/Illustrator.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nameList:[],
    pageHeight:400,
    showList:[], 
    imgCounts:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getIllusNameList();
    this.getShowList();
  },

  getShowList:function(){
    var that = this;
    var imgInfo=[];
    var counts  =  wx.getStorageInfoSync("imgListCounts")
    console.log(counts);
    for (var i = counts;i>=0;i--)
    {
      var Noi = ('00' + i).slice(-3);
      imgInfo.push({
        'id': i,
        'imgPath': 'cloud://tomato-cloud.746f-tomato-cloud/MINIICONS/礼装' + Noi+'.jpg', 
      });
    }
    console.log(imgInfo);
    this.setData(
      { 
        showList: imgInfo,
      }
    )
  },
 getIllusNameList:function()
 {
   var that=this;
   // 调用云函数 
   wx.cloud.callFunction({
     name: 'getNameList',
     data: {},
     success: res => {   
       that.setData({ 
         nameList: res.result.data, 
       })
       wx.setStorageSync("imgListsCount", res.result.data)
     },
     fail: err => {
       console.error('[云函数] [rd47] 调用失败', err)
       wx.navigateTo({
         url: '../deployFunctions/deployFunctions',
       })
     }
   })
 },

  setFilterPanel: function (e) { //展开筛选面板
    const d = this.data;
    const i = e.currentTarget.dataset.findex;
    if (d.showfilterindex == i) {
      this.setData({
        showfilter: false,
        showfilterindex: null
      })
    } else {
      this.setData({
        showfilter: true,
        showfilterindex: i,
      })
    }
  },
  hideFilter: function () { //关闭筛选面板
    this.setData({
      showfilter: false,
      showfilterindex: null
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

  }
})