var a = getApp();

Page({
    data: {
        latestRefresh: 0,
        latestLoadMore: 0,
        hotMessage: [],
        hasMore: !0,
        hasRefresh: !1,
        beg: 0,
        tag: {
            1: "电子产品",
            2: "体育用品",
            3: "生活用品",
            4: "其他",
            120: "其他",
            101: "电信学院",
            102: "机械学院",
            103: "电气学院",
            104: "能动学院",
            105: "理学院",
            106: "数学学院",
            107: "软件学院",
            108: "材料学院",
            109: "人居学院",
            110: "生命学院",
            111: "航天学院",
            112: "化工学院",
            113: "医学部",
            114: "经金学院",
            115: "管理学院",
            116: "公管学院",
            117: "人文学院",
            118: "法学院",
            119: "外国语学院",
            200: "免费物品"
        }
    },
    onLoad: function() {
        var e = this;
        
    },

    onPullDownRefresh: function(e) {
        var t = this, s = new Date().getTime();
        console.log("refresh"),
        t.setData({
            beg: 0,
            hasRefresh: !0,
            latestRefresh: s,
            hotMessage: []
        })
    },
    onShareAppMessage: function() {
        return {
            title: "佛大二手交易",
            desc: "分享个小程序，希望你喜欢☺️~",
            path: "pages/index/index",
            success: function(a) {
                wx.showToast({
                    title: "分享成功",
                    duration: 1e3,
                    icon: "success"
                });
            }
        };
    }
});