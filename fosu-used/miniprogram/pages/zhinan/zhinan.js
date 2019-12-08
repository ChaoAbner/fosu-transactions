var a = getApp();

Page({
    data: {
        currentTab: 0,
        publicSource: [ a.globalData.urlHeader + "/public/1.jpg", a.globalData.urlHeader + "/public/2.jpg", a.globalData.urlHeader + "/public/3.jpg", a.globalData.urlHeader + "/public/4.jpg", a.globalData.urlHeader + "/public/5.jpg", a.globalData.urlHeader + "/public/6.jpg", a.globalData.urlHeader + "/public/7.jpg", a.globalData.urlHeader + "/public/8.jpg", a.globalData.urlHeader + "/public/9.jpg" ]
    },
    onLoad: function(a) {},
    swichNav: function(a) {
        var t = this, n = a.target.dataset.current;
        if (this.data.currentTab === n) return !1;
        t.setData({
            currentTab: n
        });
    },
    swichNav1: function(a) {
        var t = this, n = a.target.dataset.current;
        if (this.data.currentTab === n) return !1;
        t.setData({
            currentTab: n
        }), wx.showModal({
            title: "关于",
            content: "“西交二手交易信息”是由团委挑战网开发的公益项目，旨在为同学提供更多便利。联系邮箱：\n挑战网 contact@tiaozhan.com\n周洁 1601584358@qq.com\n是文博 63091158@qq.com",
            showCancel: !1,
            confirmText: "知道啦",
            confirmColor: "#2a579a",
            success: function(a) {
                a.confirm || a.cancel;
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});