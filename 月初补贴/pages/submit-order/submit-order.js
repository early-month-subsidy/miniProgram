//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // 统计商品数量和价格
    orderCount: 1,
    // 提交的订单
    //orders: true,
    submit_order: []
  },
  // 点击结账按钮
  pay: function() {
    let that = this;
    let str = '选中' + that.data.orderCount + '件商品，是否要支付？'
    wx.showModal({
      title: '提示',
      content: str,
      success: function (res) {
        // 至少选中一个商品才能支付
        if (that.data.orderCount !== 0){
          if (res.confirm) {
            // 取出订单传过来的数据
            var access_token = (wx.getStorageSync('access_token') || []);
            var orders_id = (wx.getStorageSync('orders_id') || []);
            wx.request({
              url: 'https://api.leo-lee.cn/api/orders/' + orders_id,
              method: 'PUT',
              header: {
                'Authorization': 'Bearer ' + access_token
              },
              success: function (res) {
                wx.navigateTo({
                  url: '../pay/pay',
                })
              },
              fail: function (res) {
                console.log(res)
              },
            })
            /*
            // 打开扫码功能
            wx.scanCode({
              onlyFromCamera: true,
              success: (res) => {
                wx.redirectTo({
                  url: '../pay/pay'
                });
              }
            });
            */
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        } else {
          wx.showToast({
            title: '您未选中任何商品',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },
  onLoad: function() {
    console.log("等待付款")
    let that = this;
    var orders_submit = [];
    // 取出订单传过来的数据
    var access_token = (wx.getStorageSync('access_token') || []);
    var orders_id = (wx.getStorageSync('orders_id') || []);
    wx.request({
      url: 'https://api.leo-lee.cn/api/orders/' + orders_id,
      method: 'GET',
      header: {
        'Authorization': 'Bearer ' + access_token
      },
      success: function(res) {
        that.setData({
          submit_order: res.data
        })
        orders_submit = res.data.order.items
        console.log(res.data.order.items)
        // 价格统计汇总
        console.log("价格统计汇总")
        let orderCount = 0;
        orders_submit.forEach(item => {
          console.log(item.quantity)
          orderCount += item.quantity;// 总商品数量求和
        })
        that.setData({
          orderCount: orderCount
        })
      },
      fail: function(res) {
        console.log(res) 
      },     
    })
  }
})