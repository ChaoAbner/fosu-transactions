var a = getApp();
var cms = a.globalData.cms
var m = [{
    name: "wefhsdjkfd",
    comment: 'nihao',
    time: '2019 12 1',
},
{
    name: "wefhsdjkfd",
    comment: 'nihao',
    time: '2019 12 1',
},{
    name: "wefhsdjkfd",
    comment: 'nihao',
    time: '2019 12 1',
}]

Page({
    data: {
        liuyan0: !1,
        username: "",
        comments: [],
        commentNum: 0,
        latestLoadMore: 0,
        beg: 0,
        num: 10,
        hide: !1
    },

    onLoad: function(t) {
        var e = this;
        e.setData({
            username: a.globalData.userInfo.nickName,
            comments: a.globalData.notifyMessage
        })
    },

    pullNotify: function(){
        cms.ajax('get', cms.api.notify, {}, function(e){
            console.log(e)
        })
    },

    dianji: function() {
        var t = this;
        wx.showLoading({
            title: "加载中"
        }), wx.request({
            url: a.globalData.urlHeader + "/comment/displayMy",
            data: {
                openid: a.globalData.openid,
                token: a.globalData.token,
                beg: 0,
                num: 100,
                is_read: 1
            },
            method: "POST",
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                if (0 === e.data.code) {
                    for (var o = 0; o < e.data.data.comments.length; o++) e.data.data.comments[o].icon = a.globalData.urlHeader + "/uploads/avatars/" + e.data.data.comments[o].icon;
                    t.setData({
                        comments: e.data.data.comments,
                        commentNum: e.data.data.comments.length,
                        hide: !0
                    }), console.log(t.data.comments), wx.hideLoading();
                } else wx.showToast({
                    title: "加载失败",
                    icon: "none",
                    duration: 1500
                });
                wx.hideLoading();
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