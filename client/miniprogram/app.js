var e = "production", t = (require("./vendor/wafer2-client-sdk/index"), require("./config")), a = t.prodconf;
var api = require("./utils/api.js");
var md5 = require("./utils/md5.js");
var test = require("./utils/data")

App({
    onLaunch: function() {
      let self = this
      if (!wx.cloud) {
        console.error('请使用 2.2.3 或以上的基础库以使用云能力')
      } else {
        wx.cloud.init({
          traceUser: true,
        })
      }

      // 获取用户信息
      this.getUserInfo();
     
    },

    getUserInfo: function(){
        let self = this;
        // 查看是否授权
        wx.getSetting({
          success (res){
            if (res.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称
              wx.getUserInfo({
                success: function(res) {
                  // console.log(res)
                  self.globalData.userInfo = res.userInfo
                  // 获取用户校园信息
                  self.getCampusUserInfo();
                }
              })
            }else{
                self.getCampusUserInfo();
            }
          }
        })
    },

    setCampusUserInfo: function(){
        // 查找缓存
        let campusUserInfo = api.getUser(),
          self = this;
        if(campusUserInfo.uid){
          self.globalData.campusUserInfo = campusUserInfo;
        } else {
          self.getCampusUserInfo();
        }
    },

    getOpenid: function(callback){
        wx.cloud.callFunction({
         name: 'login',
         success: res=>{
            callback(res.result.openid)
          },
      })
    },

    getUid: function(callback){
      let self = this;
      this.getOpenid(function(res){
        // console.log(res)
        self.globalData.uid = md5(res);
        callback(md5(res))
      })
    },

    getCampusUserInfo: function(){
      let self = this,
          campusUserInfo = api.getUser();

      if(api.isDefine(campusUserInfo)){
        this.getUid(function(res){
          self.globalData.campusUserInfo = campusUserInfo;
        })
      } else {
          this.getUid(function(res){
          let data = {
              uid: res
            }
            console.log(data)
          api.ajax('get', api.api.info, data, function(res){
            if(api.isDefine(res) && res.code != 30404){
              api.storage.set("userInfo", res)
              self.setCampusUserInfo();
            } else {
              self.globalData.campusUserInfo = {
                uid: self.globalData.uid,
                isAuth: false,
                username: api.isDefine(self.globalData.userInfo) ? self.globalData.userInfo.nickName : "",
                location: api.isDefine(self.globalData.userInfo) ? self.globalData.userInfo.city: "" 
                          + " " + 
                          (api.isDefine(self.globalData.userInfo) ?  self.globalData.userInfo.province : ""),
                avatar: api.isDefine(self.globalData.userInfo) ? self.globalData.userInfo.avatarUrl : "",
                wechat: "",
               }
               // api.registerUserToServer(self.globalData.campusUserInfo, function(res){
               //  self.globalData.campusUserInfo = res
               // })
            }
          })
        })
      }
      console.log("campusUserInfo")
      console.log(self.globalData.campusUserInfo)
    },


    globalData: {
        env: e,
        userInfo: null,
        campusUserInfo: {},
        uid: null,
        openid: "",
        token: "",
        auth: 1,
        defaultCity: "",
        defaultCounty: "",
        weatherData: "",
        air: "",
        day: "",
        g_isPlayingMusic: !1,
        g_currentMusicPostId: null,
        heWeatherBase: "https://free-api.heweather.com",
        tencentMapKey: "7L3BZ-DLSKD-QLU4E-HQVUP-3QZN6-UTBVB",
        heWeatherKey: "27d8a6ccdf8b49d4a64261e864e6b63d",
        curBook: "",
        urlHeader: a.host,
        urlzhoujie: "http://img1.3lian.com/2015/w7/85/d/101.jpg",
        latestMessage: [],
        allMessage: [],
        contentBus: {},
        cms: api,
        viewContentData: null,
        userPublishData:[],
        userCollectData: [],
        notifyMessage: []
    }
});

// app.json原配置

  // {
  //   "pagePath": "pages/books/books",
  //   "text": "旧书"
  // },
  // 
  //       {
      //   "pagePath": "pages/things/things",
      //   "text": "旧物"
      // },