// miniprogram/pages/CraftEssence/CraftEssence.js

var windowHeight=0; 
var windowWidth = 0;

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mainImg_Url:"",  
    imgWidth:"",
    imgHeight:"",
    scrWidth: "",
   scrHeight:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    var res= wx.getSystemInfoSync(); 
    console.log(options);
    console.log(res);
    this.setData({
      mainImg_Url: app.globalData.cloudFullImgUrl + options.id+"A.png",
      imgWidth: res.windowWidth,
      imgHeight:res.windowHeight,
      scrWidth: res.windowWidth,
      scrHeight: res.windowHeight,
     }) 
  },
  // //这里是图片加载完毕之后的信息，因为滑动手指距离会变，我们要跟着图片的长宽进行缩放，不能跟着屏幕的长宽进行缩放
  // imgload: function (e) {
  //   var originalWidth = e.detail.width;//图片原始宽
  //   var originalHeight = e.detail.height;//图片原始高
  //   var originalScale = originalHeight / originalWidth;//图片高宽比
  //   var windowscale = windowHeight / windowWidth;//屏幕高宽比
  //   if (originalScale < windowscale) {//图片高宽比小于屏幕高宽比
  //     //图片缩放后的宽为屏幕宽
  //     baseWidth = windowWidth;

  //     baseHeight = (windowWidth * originalHeight) / originalWidth;
  //   } else {//图片高宽比大于屏幕高宽比
  //     //图片缩放后的高为屏幕高
  //     baseHeight = windowHeight;
  //     baseWidth = (windowHeight * originalWidth) / originalHeight;
  //   }
  // }, 
  //catchtouchend=
  endtap:function()
  {
    console.log("endtap");
  },
   //catchtouchmove=

   movetap:function(){
     console.log("movetap");
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