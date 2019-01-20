//order.js

Page({
  data: {
    goods:[],
    boardID: 0,
    img_url: "",
    orders_submit:[],
    toView: '', // 设置为空值，设置为数字或者'#'会报错‘id属性不能以数字开头’
    scrollTop: 100,
    fold: true,
    selectFoods: [],
    cartShow: 'none',
    status: 0,
    url: "",
    showPopup: false,
    restaurant_id: 0,
  },
  onLoad: function (options) {
    let that = this;
    // 页面初始化 options为页面跳转所带来的参数
    var boards = (wx.getStorageSync('boards') || []).boards
    console.log("order-food")
    wx.request({
      url: 'https://api.leo-lee.cn/api/restaurants/' + boards.restaurant_id,
      method: 'GET',
      success: function (res) {
        // 查询成功
        if (res.statusCode === 200) {
          console.log(res.data)
          that.setData({
            img_url: res.data.restaurant.images[1].image_url,
            goods: res.data.restaurant.categories,
            boardID: boards.id,
            restaurant_id: res.data.restaurant.id,
          })
        }
      },
      fail: function (res) {
        console.log(res)
      }
    });
  },
  // 添加到购物车
  addShopCart: function (e) {
    
    let that = this;
    var order_item_id = e.currentTarget.dataset.item.id;
    
    var board_id = that.data.boardID;
    var access_token = (wx.getStorageSync('access_token') || [])

    console.log("购物车中添加");
    wx.request({
      url: 'https://api.leo-lee.cn/api/order_items/' + order_item_id,
      method: 'PUT',
      header: {
        'Authorization': 'Bearer ' + access_token
      },
      data: {
        "action": "increment"
      },
      success: function (res) {
        // 查询成功
        //console.log(res)
        if (res.statusCode === 200) {
          wx.request({
            url: 'https://api.leo-lee.cn/api/boards/' + board_id + '/order_items',
            method: 'GET',
            header: {
              'Authorization': 'Bearer ' + access_token
            },
            success: function (res1) {
              console.log("更新购物车")
              console.log(res1)
              that.setData({
                orders_submit: res1.data.order_items
              })
            }
          })
          for (var i in that.data.goods) {
            for (var j in that.data.goods[i].foods) {
              if (that.data.goods[i].foods[j].id === e.currentTarget.dataset.item.food.id) {
                that.data.goods[i].foods[j].likes = res.data.order_item.quantity
              }
            }
          }
        }
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  //添加到购物车
  addCart(e) {
    //console.log(e.currentTarget.dataset);
    console.log("添加到购物车")
    let that = this;
    var index = e.currentTarget.dataset.itemIndex;
    var parentIndex = e.currentTarget.dataset.parentindex;
    this.data.goods[parentIndex].foods[index].likes++;
    var data_item = {
      "quantity": this.data.goods[parentIndex].foods[index].likes,
      "food_id": this.data.goods[parentIndex].foods[index].id
    }
    var board_id = that.data.boardID;
    var access_token = (wx.getStorageSync('access_token') || [])

    wx.request({
      url: 'https://api.leo-lee.cn/api/boards/' + board_id + '/order_items',
      method: 'POST',
      header: {
        'Authorization': 'Bearer ' + access_token
      },
      data: data_item,
      success: function (res) {
        // 查询成功
        //console.log(res)
        if (res.statusCode === 200) {
          wx.request({
            url: 'https://api.leo-lee.cn/api/boards/' + board_id + '/order_items',
            method: 'GET',
            header: {
              'Authorization': 'Bearer ' + access_token
            },
            success: function (res1) {
              console.log("更新购物车")
              //console.log(res1)
              that.setData({
                orders_submit: res1.data.order_items
              })
            }
          })
        }
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  //移除商品
  decreaseCart: function (e) {
    console.log("从购物车中删除")
    let that = this;
    var index = e.currentTarget.dataset.itemIndex;
    var parentIndex = e.currentTarget.dataset.parentindex;
    this.data.goods[parentIndex].foods[index].likes--;
    var order_item_id = 0;
    console.log(this.data.orders_submit[i].food.id)
    console.log(this.data.goods[parentIndex].foods[index].id)
    for (var i in this.data.orders_submit) {
      console.log(this.data.orders_submit[i].food.id)
      if (this.data.orders_submit[i].food.id === this.data.goods[parentIndex].foods[index].id) {
        order_item_id = this.data.orders_submit[i].id
        break;
      }
    }
    if (order_item_id === 0) {
      return;
    }
    var board_id = that.data.boardID;
    var access_token = (wx.getStorageSync('access_token') || [])
    wx.request({
      url: 'https://api.leo-lee.cn/api/order_items/' + order_item_id,
      method: 'PUT',
      header: {
        'Authorization': 'Bearer ' + access_token
      },
      data: {
        "action": "decrement"
      },
      success: function (res) {
        // 查询成功
        //console.log(res)
        if (res.statusCode === 200) {
          wx.request({
            url: 'https://api.leo-lee.cn/api/boards/' + board_id + '/order_items',
            method: 'GET',
            header: {
              'Authorization': 'Bearer ' + access_token
            },
            success: function (res1) {
              console.log("更新购物车")
              //console.log(res1)
              that.setData({
                orders_submit: res1.data.order_items
              })
            }

          })
        }
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  decreaseShopCart: function (e) {
    console.log(e.currentTarget.dataset);
    let that = this;
    var order_item_id = e.currentTarget.dataset.item.id;
    var board_id = that.data.boardID;
    var access_token = (wx.getStorageSync('access_token') || [])

    console.log("购物车中删除");
    wx.request({
      url: 'https://api.leo-lee.cn/api/order_items/' + order_item_id,
      method: 'PUT',
      header: {
        'Authorization': 'Bearer ' + access_token
      },
      data: {
        "action": "decrement"
      },
      success: function (res) {
        // 查询成功
        //console.log(res)
        if (res.statusCode === 200) {
          wx.request({
            url: 'https://api.leo-lee.cn/api/boards/' + board_id + '/order_items',
            method: 'GET',
            header: {
              'Authorization': 'Bearer ' + access_token
            },
            success: function (res1) {
              console.log("更新删除后的购物车")
              //console.log(res1)
              that.setData({
                orders_submit: res1.data.order_items
              })
            }

          })
          for (var i in that.data.goods) {
            for (var j in that.data.goods[i].foods) {
              if (that.data.goods[i].foods[j].id === e.currentTarget.dataset.item.food.id) {
                that.data.goods[i].foods[j].likes = res.data.order_item.quantity
              }
            }
          }
        }
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },


  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },

  onHide: function (e) {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  empty: function (e) {},

  selectMenu: function (e) {
    var index = e.currentTarget.dataset.itemIndex;
    this.setData({
      toView: 'order' + index.toString()
    })
  },
  
  // pay, 提交订单
  pay: function() {
    let that = this
    if (!this.data.orders_submit) {
      return;
    }
    var access_token = (wx.getStorageSync('access_token') || []);
    var orderitemID = [];
    console.log(this.data.orders_submit)
    for (var i in this.data.orders_submit) {
      if (this.data.orders_submit[i].quantity !==0) {
        orderitemID.push(this.data.orders_submit[i].id)
      }
    }
    console.log(orderitemID)
    // 提交订单数据
    wx.request({
      url: 'https://api.leo-lee.cn/api/orders',
      method: 'POST',
      header: {
        'Authorization': 'Bearer ' + access_token
      },
      data: {
        "remark": "少盐少油",
        "restaurant_id": this.data.restaurant_id,
        "items": orderitemID
      },
      success: function (res) {
        // 查询成功
        //console.log(res)
        var orders_id = res.data.order.id;
        console.log(res);
        if (res.statusCode === 200) {
          wx.showModal({
            title: '商家接单成功',
            content: "已提交订单，是否需要买单？",
            success: function (res1) {
              if (res1.confirm) {
                wx.setStorageSync("orders_id", orders_id)
                wx.switchTab({
                  url: '../submit-order/submit-order',
                })
              } else if (res1.cancel) {
                console.log('用户点击取消')
                wx.showToast({
                  title: '你可以继续加菜',
                  icon: 'none',
                  duration: 2000
                })
              }
            }
          })

        }
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  //购物车图标点击事件
  toggleList: function () {
    if (!this.data.orders_submit) {
      return;
    }
    this.setData({
      fold: !this.data.fold,
    })
    var fold = this.data.fold
    //console.log(this.data.fold);
    this.cartShow(fold)
  },
  cartShow: function (fold) {
    console.log(fold);
    if (fold == false) {
      this.setData({
        cartShow: 'block',
      })
    } else {
      this.setData({
        cartShow: 'none',
      })
    }
    console.log(this.data.cartShow);
  },
  /**   

  * 预览图片  

  */

  togglePopup: function (event) {
    var image_path = event.currentTarget.dataset.id;
    this.setData({
      url: image_path,
      showPopup: !this.data.showPopup
    });
  },
  tabChange: function (e) {
    var showtype = e.target.dataset.type;
    this.setData({
      status: showtype,
    });
  }
})
