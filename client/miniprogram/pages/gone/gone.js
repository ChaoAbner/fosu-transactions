var o = getApp();

Page({
    data: {
        content: {}
    },
    onLoad: function(t) {
        this.setData({
            content: o.globalData.contentBus
        });
    },
    removeFav: function() {
        var t = this;
        wx.request({
            url: o.globalData.urlHeader + "/fav/remove",
            data: {
                openid: o.globalData.openid,
                token: o.globalData.token,
                messageid: t.data.content.messageid
            },
            method: "POST",
            header: {
                "content-type": "application/json"
            },
            success: function(o) {
                0 === o.data.code ? (console.log("删除收藏成功"), wx.showToast({
                    title: "收藏已删除",
                    icon: "success",
                    mask: !0,
                    duration: 1e3
                }), setTimeout(function() {
                    wx.switchTab({
                        url: "../my/my"
                    });
                }, 1e3)) : console.log(o.data.error);
            }
        });
    },
    onShareAppMessage: function() {
        return {
            title: "校园二手物品交易信息",
            desc: "分享个小程序，希望你喜欢☺️~",
            path: "pages/index/index",
            success: function(o) {
                wx.showToast({
                    title: "分享成功",
                    duration: 1e3,
                    icon: "success"
                });
            }
        };
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});