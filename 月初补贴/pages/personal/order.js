// pages/personal/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    history_order:"历史订单",
    login:"登录",
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // user_info:{message:"", access_token:"", refresh_token:""},
    user_info:{},
    userNickName:'',
    historyOrder: [{created_time: '2000-2-3 349' }, {created_time: '2099sdgsrts-2-3 349' }],
    order_created_time:'',
    restaurant_name:'',
    total_cost:"",
    items_details:"",
        dot:''
  },
  loginandup:function(e) {
    console.log('userInfo is', this.data.userInfo);
    var that = this;
    wx.login({
      success:function(res) {
        console.log(res.code);
        console.log('userNickName is', that.data.userNickName);
        if (typeof that.data.userNickName == 'string') {
          console.log('nick name is string')
        } else {
          console.log('nick name is not string')
        }
        
        wx.request({
          url: 'https://api.leo-lee.cn/wxlogin',
          data:{code:res.code,
                nickname:that.data.userNickName},
          method:"POST",
          success:function(res) {
            console.log(res.data);
            that.setData({
              user_info:res.data
            })
            
            wx.setStorage({
              key:'userInfo',
              data:res.data,
            })
          }
        })
      }
    })
  },
  getHistoryOrder:function(e) {
    console.log("user_info is ", this.data.user_info)
    if (this.data.user_info == NULL) {
      
    }
    var that = this;
    wx.request({
      url: 'https://api.leo-lee.cn/api/orders',
      method:'GET',
      header: {
        'Authorization':'Bearer' + ' '+this.data.user_info.access_token
      },
      success:function(res) {
        console.log(res.data);
        that.setData({
          historyOrder:res.data.orders,
          order_created_time:"订单创建时间：",
          restaurant_name:"店铺名称: ",
          total_cost:"花费总计：",
          items_details:"订单详情：",
          dot:'-'
        });
        console.log(that.data.historyOrder)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              console.log(res.userInfo)
              that.setData({
                userNickName:res.userInfo.nickName,
              });
            }
          })
        }
      }
    })
  },
  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
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