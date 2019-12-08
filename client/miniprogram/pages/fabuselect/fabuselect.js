var n = getApp();

Page({
    data: {
        auth: n.globalData.auth,
        env: n.globalData.env,
        height: n.globalData.cms.constant.screenHeight
    },
    onLoad: function(n) {
        var t = this;
        console.log(t.data.auth);
    },
    notice: function(t) {
        var o = t.currentTarget.dataset.hi;
        var type = o == 'fabu1' ? '0' : '1'
        1 == n.globalData.auth ? wx.navigateTo({
            url: "../fabu1/fabu1?" + `type=${type}`
        }) : wx.showModal({
            title: "提示",
            content: "为保证信息安全，第一次发布需登录NetID。\n是否前往认证？",
            success: function(n) {
                n.confirm && wx.navigateTo({
                    url: "../login/login"
                });
            }
        });
    },
    onShareAppMessage: function() {
        return {
            title: "校园二手物品交易信息",
            desc: "分享个小程序，希望你喜欢☺️~",
            path: "pages/index/index",
            success: function(n) {
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