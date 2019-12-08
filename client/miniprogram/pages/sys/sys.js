Page({
    data: {},
    onLoad: function(n) {},
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
    feedback: function() {
        wx.navigateTo({
            url: "../feedback/feedback"
        });
    },
   support: function() {
        wx.navigateTo({
            url: "../support/support"
        });
    },    
    login: function() {
        wx.navigateTo({
            url: "../login/login"
        });
    },

    zhinan: function() {
        wx.navigateTo({
            url: "../zhinan/zhinan"
        });
    },

    about: function() {
        wx.navigateTo({
            url: "../contact/contact"
        });
    },

    info: function() {
        wx.navigateTo({
            url: "../info/info"
        });
    },
});