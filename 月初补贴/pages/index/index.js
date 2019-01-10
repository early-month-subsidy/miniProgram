//index.js
//获取应用实例
var WxSearch = require('../../wxSearch/wxSearch.js')
var app = getApp()
Page({
  data: {
    /*
    restaurants: [{
      id: 1, restaurant: '一点点', active: false, url: '/image/restaurants/yidiandian.jpg', introduce:'年轻人逛街喜欢喝奶茶放松心情，他们在奶茶饮品消费上更愿意选择环境优雅、饮品清新的奶茶店铺落座消费。而一点点奶茶加盟品牌，采用台湾奶茶饮品的制作服务理'
    }, {
        id: 2, restaurant: '杨国福', active: false, url: '/image/restaurants/yangguofu.jpg', introduce:'杨国福麻辣烫风味独特富含多种健康的绿色蔬菜、藻类、菌类、豆制品。麻、辣、鲜、香。让您回味无穷，流连忘返。'
    }, {
        id: 3, restaurant: '江湖火锅', active: false, url: '/image/restaurants/jianghuhuoguo.jpg', introduce: '火锅'
    }, {
        id: 4, restaurant: '牛大学', active: false, url: '/image/restaurants/niudaxue.jpg', introduce: '牛肉火锅'
    }, {
        id: 5, restaurant: '益禾堂', active: false, url: '/image/restaurants/yihetang.jpg', introduce: '益禾堂, 原叶手作茶专门店!打造高校全饮品人气品牌'
    }, {
        id: 6, restaurant: '那碗粉', active: false, url: '/image/restaurants/nawanfen.jpg', introduce: '各种特色米粉'
    }]
    */
    restaurants:[]
    /*
    restaurants: [{
      "id": 1,
      "name": "Happy Day",
      "introduction": "A restaurant in china.",
      "opening_time": "周一至周五，11：00am-10:00pm",
      "address": "大学城北xxx路",
      "images": [
        {
          "id": 1,
          "order_id": 1,
          "image_url": "/image/restaurants/yidiandian.jpg",
          "restaurant_id": 1
        }
      ],
      "boards": [
        {
          "id": 1,
          "occupation": false,
          "name": "A1",
          "seat_num": 2,
          "qr_code": "https://example.com/static/images/DNIDJDIFXC1454DF892DF.jpg",
          "restaurant_id": 1
        }
      ],
      "categories": [
        {
          "id": 1,
          "name": "主食",
          "priority": 1,
          "restaurant_id": 1,
          "food": [
            {
              "id": 1,
              "name": "米饭",
              "description": "中国人最爱",
              "price": 1.00,
              "image": "https://example.com/static/images/DNIDJDIFXC1454DF892DF.jpg",
              "likes": 1,
              "sales": 1,
              "category_id": 1
            }
          ]
        }
      ],
    }]
    */

  },
/*
  // 返回单个餐厅信息
  Getrestaurant: [{
    
    "id": 1,
    "name": "Happy Day",
    "introduction": "A restaurant in china.",
    "opening_time": "周一至周五，11：00am-10:00pm",
    "address": "大学城北xxx路",
    "images": [
      {
        "id": 1,
        "order_id": 1,
        "image_url": "https://example.com/static/images/DNIDJDIFXC1454DF892DF.jpg",
        "restaurant_id": 1
      }],
    "boards": [
      {
        "id": 1,
        "occupation": False,
        "name": "A1",
        "seat_num": 2,
        "qr_code": "https://example.com/static/images/DNIDJDIFXC1454DF892DF.jpg",
        "restaurant_id": 1
      }],
    "categories": [
      {
        "id": 1,
        "name": "主食",
        "priority": 1,
        "restaurant_id": 1,
        "food": [
          {
            "id": 1,
            "name": "米饭",
            "description": "中国人最爱",
            "price": 1.00,
            "image": "https://example.com/static/images/DNIDJDIFXC1454DF892DF.jpg",
            "likes": 1,
            "sales": 1,
            "category_id": 1
          }]
      }]
  }],
*/
  

  onLoad: function () {
    console.log('onLoad')
    var that = this
    //初始化的时候渲染wxSearchdata
    WxSearch.init(that,43,['一点点','杨国福','牛大学','炉火鱼香','泰莱']);
    //WxSearch.initMindKeys(['weappdev.com','微信小程序开发','微信开发','微信小程序']);

    wx.request({
      url: 'http://api.leo-lee.cn/api/restaurants',
      method: 'GET',
      success: function (res) {
        // 查询成功
        if (res.statusCode === 200) {
          console.log(res.data)
          that.setData({
            restaurants: res.data
          });//和页面进行绑定可以动态的渲染到页面

        }

      },
      fail: function (res) {
        console.log(res)
      }
    });
  },

  // 扫码点餐
  scan2restaurant: function(){
    wx.scanCode({
      onlyFromCamera: false,
      scanType: ['qrCode', 'barCode'],
      success: function (suc) {
        //
        // 添加扫码获取链接地址
        //
        wx.redirectTo({
          url: '../order-food/order-food',
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
        /*
        //api.leo - lee.cn/api/restaurants / <int: restaurant_id>/boards/<int: board_id>
        var that = this
        wx.request({
          url: 'https://api.leo-lee.cn/api/restaurants/1/boards/1',
        })
        */
      },
      fail: function (err) {
      },
      complete: function (com) {
      }
    })
  },

  // 搜索框
  wxSearchFn: function(e){
    var that = this
    WxSearch.wxSearchAddHisKey(that);
    // 服务器Search
    
    let text = that.data.wxSearchData.value;
    //let text = parseInt(that.data.wxSearchData.value);
    wx.request({
      //url: 'http://api.leo-lee.cn/api/restaurants/'+text,
      url: 'http://api.leo-lee.cn/api/restaurants/query?name='+text,
      method: 'GET',
      success: function(res) {
        // 查询成功
        if (res.statusCode === 200) {
          //console.log(res.data)
          that.setData({
            restaurants: res.data
          });//和页面进行绑定可以动态的渲染到页面
          //console.log(res.data)
        }
        
      },
      fail: function(res) {
        console.log(res)
      }
    });
    

  },
  wxSearchInput: function(e){
    var that = this
    WxSearch.wxSearchInput(e,that);
  },
  wxSerchFocus: function(e){
    var that = this
    WxSearch.wxSearchFocus(e,that);
  },
  wxSearchBlur: function(e){
    var that = this
    WxSearch.wxSearchBlur(e,that);
  },
  wxSearchKeyTap:function(e){
    var that = this
    WxSearch.wxSearchKeyTap(e,that);
  },
  wxSearchDeleteKey: function(e){
    var that = this
    WxSearch.wxSearchDeleteKey(e,that);
  },
  wxSearchDeleteAll: function(e){
    var that = this;
    WxSearch.wxSearchDeleteAll(that);
  },
  wxSearchTap: function(e){
    var that = this
    WxSearch.wxSearchHiddenPancel(that);
  },
  selectRestaurant: function(e) {
    wx.navigateTo ({
      url: '../order-food/order-food',
    })
  }
})
