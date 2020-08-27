// pages/sweetapple/sweetapple.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img:'',
    suggest:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options && options == 1){
      this.readimg(this.data.img);
    }
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
  copayData: function () {
    wx.setClipboardData({
      data: this.data.name + '\n' + this.data.year + '\n' + this.data.color + '\n' + this.data.baikedes,
      success(res) {
        wx.showToast({
          title: '已复制',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  chooseImage: function () {
    wx.navigateTo({
      url: '/pages/cropper/cropper?oper=read_car',
    })
  },
  imgCallBack(oper, filePath) {
    this.setData({
      img: filePath,
    })

  },
  readimg(filePath) {
    var that = this
    that.setData({
      name: '',
      baikedes: ''
    })
    wx.showLoading({
      title: '识别中',
    })
    
    wx.uploadFile({
      url: getApp().globalData.url+'/ocr/readcar.do',
      filePath: filePath,
      name: 'file',
      success: function (res) {
        if (res.statusCode == 200 && JSON.parse(res.data).data){
          var data = JSON.parse(res.data).data;
          that.setData({
            name: data.name,
            baikedes: data.baikedes
          })
        }
        
      },
      complete: function () {
        wx.hideLoading();
      }
    })
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