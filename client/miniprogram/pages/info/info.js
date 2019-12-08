// pages/info/info.js
// 

var app = getApp(), cms = app.globalData.cms;
 function t(t, e) {
    e.setData({
        showTopTips: !0,
        errorMsg: t
    });
}

function e(t) {
    t.setData({
        showTopTips: !1,
        errorMsg: ""
    });
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    UserInfo: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initUserInfo();
  },

 
  formSubmit: function(s) {
    var i = this, 
    n = s.detail.value;

    if ("" == n.contact) return t("请填写联系人", i), setTimeout(function() {
        e(i);
    }, 2e3), !1;

    if ("" == n.wechat) return t("请填写微信号码", i), setTimeout(function() {
        e(i);
    }, 2e3), !1;
    if (!/^[0-9a-zA-Z-_]+$/.test(n.wechat)) return t("微信号码错误", i), setTimeout(function() {
        e(i);
    }, 2e3), !1;
    if ("" == n.phone) ; else if (!/^1[34578]\d{9}$/.test(n.phone)) return t("手机号码错误", i), 
    setTimeout(function() {
        e(i);
    }, 2e3), !1;

    let userInfo = cms.storage.get("userInfo")
    userInfo.wechat = n.wechat
    userInfo.contactName = n.contact
    userInfo.phone = n.phone
    cms.storage.set("userInfo", userInfo)
    cms.toast("保存成功")
    cms.updateUserinfoToServer()
    setTimeout(function(){
      cms.back()
    }, 500)
},


initUserInfo: function(){
  let self = this,
    userInfo = cms.storage.get("userInfo")

    self.setData({
      UserInfo: userInfo
    })
  },
})