Page({
  data: {
    restaurant: []
  },
  onLoad: function () {
    //console.log('onLoad')
    let that = this
    var restaurant_id = (wx.getStorageSync('restaurant_id') || []).res_id
    //console.log(restaurant_id)
    wx.request({
      url: 'http://api.leo-lee.cn/api/restaurants/' + restaurant_id,
      method: 'GET',
      success: function (res) {
        // 查询成功
        if (res.statusCode === 200) {
          //console.log(res.data)
          that.setData({
            restaurant: res.data
          });//和页面进行绑定可以动态的渲染到页面
        }
      },
      fail: function (res) {
        console.log(res)
      }
    });
  },
  select_seat:function(e) {
    var boards = e.currentTarget.dataset;
    console.log(boards)
    //console.log(boards.boards.occupation)
    wx.setStorageSync("boards", boards)
    wx.navigateTo({
      url: '../order-food/order-food',
    })
    if (!boards.boards.occupation) {
      
      console.log("成功入座，跳转到点餐界面")
    }
    
  },
  seat_full: function() {

  }
})