// miniprogram/pages/CraftEssence/CraftEssence.js
 

var olddistance = 0;  //这个是上一次两个手指的距离
var newdistance;      //本次两手指之间的距离，两个一减咱们就知道了滑动了多少，以及放大还是缩小（正负嘛）
var oldscale = 1;     //这个是上一次动作留下的比例
var diffdistance;     //这个是新的比例，新的比例一定是建立在旧的比例上面的，给人一种连续的假象
var baseHeight;       //上一次触摸完之后的高
var baseWidth;        //上一次触摸完之后的宽
var windowWidth = 0;  //咱们屏幕的宽
var windowHeight = 0; //咱们屏幕的高 
var lastXY_X=0;
var lastXY_Y=0;
var timeLast=0;   //长按持续时间/时间戳相减

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mainImg_Url:"",  
    imgWidth:"",
    imgHeight:"", 
    scrWidth:"",
    scrHeight:""
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
  //这里是图片加载完毕之后的信息，因为滑动手指距离会变，我们要跟着图片的长宽进行缩放，不能跟着屏幕的长宽进行缩放
  imgload: function (e) {
    var originalWidth = e.detail.width;//图片原始宽
    var originalHeight = e.detail.height;//图片原始高
    var originalScale = originalHeight / originalWidth;//图片高宽比
    var windowscale = windowHeight / windowWidth;//屏幕高宽比
    if (originalScale < windowscale) {//图片高宽比小于屏幕高宽比
      //图片缩放后的宽为屏幕宽
      baseWidth = windowWidth;

      baseHeight = (windowWidth * originalHeight) / originalWidth;
    } else {//图片高宽比大于屏幕高宽比
      //图片缩放后的高为屏幕高
      baseHeight = windowHeight;
      baseWidth = (windowHeight * originalWidth) / originalHeight;
    }
  }, 
 
  endtap: function (event)
  {
    var e=event;
    console.log("endtap");
    console.log(e);
    console.log(e.timeStamp);
    timeLast=e.timeStamp-timeLast;
    if(timeLast>2000)
    {
      console.log("长按");
      wx.previewImage({
  current: this.data.mainImg_Url, // 当前显示图片的http链接
  urls: [this.data.mainImg_Url] // 需要预览的图片http链接列表
})
    }
    var nowXY_X = e.changedTouches[0].clientX;
    var nowXY_Y = e.changedTouches[0].clientY;
    var moveX  = nowXY_X-lastXY_X;
    var moveY =  nowXY_Y - lastXY_Y;
    if (Math.abs(moveX) > Math.abs(moveY)) {
      if (moveX < 0) {
        console.log("左移");
        var idNum = parseInt(options.id) - 1;
        if (idNum > 0) {
          this.setData({
            mainImg_Url: app.globalData.cloudFullImgUrl + idNum + "A.png",
          })
      }

    } else {
      console.log("右移");
      var idNum = parseInt(options.id) + 1;
      if (idNum<  parseInt(wx.getStorageSync("version_local")))
    {  this.setData({
            mainImg_Url: app.globalData.cloudFullImgUrl + idNum + "A.png",
          })}
    }
  } else
    {
      if (moveY> 0) {
        console.log("下移");
      }
      else {
        console.log("上移");
      }

    }

    if (event.touches.length == 2) {
      olddistance = 0;
    } 
  },
   //catchtouchmove=

  //两手指进行拖动了
  movetap: function (event) {

    var e = event;
    timeLast=e.timeStamp;
    if (e.touches.length == 2) {
      var xMove = e.touches[1].clientX - e.touches[0].clientX;
      var yMove = e.touches[1].clientY - e.touches[0].clientY;
      var distance = Math.sqrt(xMove * xMove + yMove * yMove);//两手指之间的距离 
      if (olddistance == 0) {
        olddistance = distance; //要是第一次就给他弄上值，什么都不操作
        console.log(olddistance);
      }
      else {
        newdistance = distance; //第二次就可以计算它们的差值了
        diffdistance = newdistance - olddistance;
        olddistance = newdistance; //计算之后更新
        console.log(diffdistance);
        var newScale = oldscale + 0.005 * diffdistance;  //比例
        console.log(newScale);
        //刷新.wxml
        this.setData({
          imgHeight: newScale * baseHeight,
          imgWidth: newScale * baseWidth

        })
        oldscale = newScale;
        //更新比例

      }
    }
    else if (e.touches.length ==1)
    {
     
    
    }
  }, 
  
  starttap:function(event){
    var e = event;
    lastXY_X = e.touches[0].clientX;
    lastXY_Y = e.touches[0].clientY;
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