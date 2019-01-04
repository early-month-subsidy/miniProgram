//index.js
//获取应用实例
var WxSearch = require('../../wxSearch/wxSearch.js')
var app = getApp()
Page({
  data: {
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
    }],
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //初始化的时候渲染wxSearchdata
    WxSearch.init(that,43,['一点点','杨国福','牛大学','炉火鱼香','泰莱']);
    //WxSearch.initMindKeys(['weappdev.com','微信小程序开发','微信开发','微信小程序']);
  },

  // 扫码点餐
  scan2restaurant: function(){
    //wx.navigateTo({
      //url: '../scan/scan',
    //})
    wx.scanCode({
      onlyFromCamera: false,
      scanType: ['qrCode', 'barCode'],
      success: function (suc) {
        wx.navigateTo({
          url: '../order-food/order-food',
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
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
  }
})
