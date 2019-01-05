//index.js
//获取应用实例
//const app = getApp()
/*
Page({
  data: {
    tabIndex: 0,
    // 统计商品数量和价格
    orderCount: {
      num: 0,
      money: 0
    },
    bottomFlag: false,
    // 提交的订单
    orders: true,
    menus: [{
      id: 1,
      menu: '菜单一'
    }, {
      id: 1,
      menu: '菜单一'
    }, {
      id: 1,
      menu: '菜单一'
    }, {
      id: 1,
      menu: '菜单二'
    }, {
      id: 1,
      menu: '菜单三'
    }, {
      id: 1,
      menu: '菜单四'
    }, {
      id: 1,
      menu: '菜单五'
    }, {
      id: 1,
      menu: '菜单五'
    }, {
      id: 1,
      menu: '菜单五'
    }, {
      id: 1,
      menu: '菜单五'
    }, {
      id: 1,
      menu: '菜单五'
    }, {
      id: 1,
      menu: '菜单五'
    }, {
      id: 1,
      menu: '菜单五'
    }, {
      id: 1,
      menu: '菜单五'
    }, {
      id: 1,
      menu: '菜单五'
    }, {
      id: 1,
      menu: '菜单五'
    }],
    // 商品列表
    items: [{
      id: 1,
      title: '湖南辣椒小炒肉1',
      price: 12,
      active: false,
      num: 1
    }, {
      id: 2,
      title: '湖南辣椒小炒肉2',
      price: 13,
      active: false,
      num: 1
    }, {
      id: 3,
      title: '湖南辣椒小炒肉3',
      price: 14,
      active: false,
      num: 1
    }, {
      id: 4,
      title: '湖南辣椒小炒肉4',
      price: 15,
      active: false,
      num: 1
    }, {
      id: 5,
      title: '湖南辣椒小炒肉5',
      price: 16,
      active: false,
      num: 1
    }, {
      id: 6,
      title: '湖南辣椒小炒肉5',
      price: 17,
      active: false,
      num: 1
    }, {
      id: 7,
      title: '湖南辣椒小炒肉5',
      price: 18,
      active: false,
      num: 1
    }]
  },
  // 下拉刷新
  onPullDownRefresh: function () {
    setTimeout(() => {
      wx.showToast({
        title: '成功加载数据',
        icon: 'success',
        duration: 500
      });
      wx.stopPullDownRefresh()
    }, 500);
  },
  tabMenu: function (event) {
    let index = event.target.dataset.index;
    this.setData({
      tabIndex: index
    });
  },
  // 点击去购物车结账
  card: function () {
    let that = this;
    // 判断是否有选中商品
    if (that.data.orderCount.num !== 0) {
      // 跳转到购物车订单也
      console.log("begin")
      wx.switchTab({
        url: '../submit-order/submit-order',
      })
      console.log("end")
    } else {
      wx.showToast({
        title: '您未选中任何商品',
        icon: 'none',
        duration: 2000
      })
    }
  },
  addOrder: function (event) {
    let that = this;
    let id = event.target.dataset.id;
    let index = event.target.dataset.index;
    let param = this.data.items[index];
    let subOrders = []; // 购物单列表存储数据
    param.active ? param.active = false : param.active = true;
    // 改变添加按钮的状态
    this.data.items.splice(index, 1, param);
    that.setData({
      items: this.data.items
    });
    // 将已经确定的菜单添加到购物单列表
    this.data.items.forEach(item => {
      if (item.active) {
        subOrders.push(item);
      }
    });
    // 判断底部提交菜单显示隐藏
    if (subOrders.length == 0) {
      that.setData({
        bottomFlag: false
      });
    } else {
      that.setData({
        bottomFlag: true
      });
    }
    let money = 0;
    let num = subOrders.length;
    subOrders.forEach(item => {
      money += item.price; // 总价格求和
    });
    let orderCount = {
      num,
      money
    }
    // 设置显示对应的总数和全部价钱
    this.setData({
      orderCount
    });
    // 将选中的商品存储在本地
    wx.setStorage({
      key: "orders",
      data: subOrders
    });
  },
  onLoad: function () {

  }
})
*/

Page({
  data: {
    goods: [
      {
        "name": "马达",
        "type": -1,
        "foods": [
          {
            "name": "马达起动机",
            "price": 10,
            "brand": "亿资",
            "Count": 0,
            "type": "1315C",
            "icon": "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1495904945,1470333066&fm=27&gp=0.jpg",
          },
        ]
      },
      {
        "name": "充电机",
        "type": 2,
        "foods": [
          {
            "name": "电子充电机",
            "price": 60.5,
            "brand": "台电",
            "Count": 0,
            "type": "60A",
            "icon": "http://img3.imgtn.bdimg.com/it/u=527088292,3980765409&fm=27&gp=0.jpg",
          }
        ]
      },
    ],
    toView: '0',
    scrollTop: 100,
    foodCounts: 0,
    totalPrice: 0,// 总价格
    totalCount: 0, // 总商品数
    carArray: [],
    minPrice: 10,//起送價格
    payDesc: '',
    fold: true,
    selectFoods: [{ price: 20, count: 2 }],
    cartShow: 'none',
    status: 0,
    url: "",
    showPopup: false,
  },
  selectMenu: function (e) {
    var index = e.currentTarget.dataset.itemIndex;
    this.setData({
      toView: 'order' + index.toString()
    })
    console.log(this.data.toView);
  },
  //移除商品
  decreaseCart: function (e) {
    var index = e.currentTarget.dataset.itemIndex;
    var parentIndex = e.currentTarget.dataset.parentindex;
    this.data.goods[parentIndex].foods[index].Count--
    var name = this.data.goods[parentIndex].foods[index].name;
    var num = this.data.goods[parentIndex].foods[index].Count;
    var mark = 'a' + index + 'b' + parentIndex
    var price = this.data.goods[parentIndex].foods[index].price;
    var obj = { price: price, num: num, mark: mark, name: name, index: index, parentIndex: parentIndex };
    var carArray1 = this.data.carArray.filter(item => item.mark != mark);
    carArray1.push(obj);
    console.log(carArray1);
    for (var m = 0; m < carArray1.length; m++) {
      if (carArray1[m].num == 0) {
        carArray1.splice(m, 1);  // splice(a,b); a需要删除的位置,b删除几个
      }
    }
    this.setData({
      carArray: carArray1,
      goods: this.data.goods
    })
    this.calTotalPrice()
    this.setData({
      payDesc: this.payDesc(),
    })
    //关闭弹起
    var count1 = 0
    for (let i = 0; i < carArray1.length; i++) {
      if (carArray1[i].num == 0) {
        count1++;
      }
    }
    //console.log(count1)
    if (count1 == carArray1.length) {
      if (num == 0) {
        this.setData({
          cartShow: 'none'
        })
      }
    }
  },
  decreaseShopCart: function (e) {
    console.log('1');
    this.decreaseCart(e);
  },
  //添加到购物车
  addCart(e) {
    var index = e.currentTarget.dataset.itemIndex;
    var parentIndex = e.currentTarget.dataset.parentindex;
    this.data.goods[parentIndex].foods[index].Count++;
    var mark = 'a' + index + 'b' + parentIndex
    var price = this.data.goods[parentIndex].foods[index].price;
    var num = this.data.goods[parentIndex].foods[index].Count;
    var name = this.data.goods[parentIndex].foods[index].name;
    var obj = { price: price, num: num, mark: mark, name: name, index: index, parentIndex: parentIndex };
    var carArray1 = this.data.carArray.filter(item => item.mark != mark)
    carArray1.push(obj)
    console.log(carArray1);
    this.setData({
      carArray: carArray1,
      goods: this.data.goods
    })
    this.calTotalPrice();
    this.setData({
      payDesc: this.payDesc()
    })
  },
  addShopCart: function (e) {
    this.addCart(e);
  },
  //计算总价
  calTotalPrice: function () {
    var carArray = this.data.carArray;
    var totalPrice = 0;
    var totalCount = 0;
    for (var i = 0; i < carArray.length; i++) {
      totalPrice += carArray[i].price * carArray[i].num;
      totalCount += carArray[i].num
    }
    this.setData({
      totalPrice: totalPrice,
      totalCount: totalCount,
      //payDesc: this.payDesc()
    });
  },
  //差几元起送
  payDesc() {
    if (this.data.totalPrice === 0) {
      return `￥${this.data.minPrice}元起送`;
    } else if (this.data.totalPrice < this.data.minPrice) {
      let diff = this.data.minPrice - this.data.totalPrice;
      return '还差' + diff + '元起送';
    } else {
      return '去结算';
    }
  },
  //购物车
  toggleList: function () {
    if (!this.data.totalCount) {
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
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      payDesc: this.payDesc()
    });
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },

  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})
