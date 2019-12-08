var a = getApp();

Page({
    data: {
        latestRefresh: 0,
        latestLoadMore: 0,
        windowHeight: 0,
        currentTab: 0,
        allMessage: [],
        dianziMessage: [],
        tiyuMessage: [],
        lifeMessage: [],
        otherMessage: [],
        hasMore: !1,
        hasRefresh: !1,
        beg: 0,
        tag: {
            1: "电子产品",
            2: "体育用品",
            3: "生活用品",
            4: "其他"
        }
    },
    onLoad: function() {
        var e = this, t = wx.getSystemInfoSync();
        e.setData({
            windowHeight: t.windowHeight
        }), wx.request({
            url: a.globalData.urlHeader + "/message/msglist",
            data: {
                openid: a.globalData.openid,
                token: a.globalData.token,
                class: 0,
                tag: -1,
                beg: 0,
                num: 10
            },
            method: "POST",
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                if (0 === t.data.code) {
                    for (var s = 0; s < t.data.data.message.length; s++) {
                        t.data.data.message[s].tag = e.data.tag[t.data.data.message[s].tag], t.data.data.message[s].img = t.data.data.message[s].img.split(","), 
                        t.data.data.message[s].img.splice(0, 1);
                        for (var d = 0; d < t.data.data.message[s].img.length; d++) t.data.data.message[s].img[d] = a.globalData.urlHeader + "/uploads/" + t.data.data.message[s].img[d];
                        t.data.data.message[s].icon = a.globalData.urlHeader + "/uploads/avatars/" + t.data.data.message[s].icon, 
                        t.data.data.message[s].img.sort();
                    }
                    e.setData({
                        allMessage: t.data.data.message,
                        hasMore: !1
                    }), console.log(e.data.allMessage);
                } else console.log("获取列表失败！" + t.data.error);
            }
        });
    },
    bindChange: function(a) {
        this.setData({
            currentTab: a.detail.current
        });
    },
    swichNav: function(e) {
        var t = this, s = e.target.dataset.current;
        if (this.data.currentTab == s) return !1;
        t.setData({
            beg: 0,
            hasMore: !1,
            hasRefresh: !1
        }), 0 == s && wx.request({
            url: a.globalData.urlHeader + "/message/msglist",
            data: {
                openid: a.globalData.openid,
                token: a.globalData.token,
                class: 0,
                tag: -1,
                beg: 0,
                num: 10
            },
            method: "POST",
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                if (0 === e.data.code) {
                    for (var s = 0; s < e.data.data.message.length; s++) {
                        e.data.data.message[s].tag = t.data.tag[e.data.data.message[s].tag], e.data.data.message[s].img = e.data.data.message[s].img.split(","), 
                        e.data.data.message[s].img.splice(0, 1);
                        for (var d = 0; d < e.data.data.message[s].img.length; d++) e.data.data.message[s].img[d] = a.globalData.urlHeader + "/uploads/" + e.data.data.message[s].img[d];
                        e.data.data.message[s].icon = a.globalData.urlHeader + "/uploads/avatars/" + e.data.data.message[s].icon, 
                        e.data.data.message[s].img.sort();
                    }
                    t.setData({
                        allMessage: e.data.data.message,
                        hasMore: !1
                    }), console.log(t.data.allMessage);
                } else console.log("获取列表失败！" + e.data.error);
            }
        }), 1 == s && wx.request({
            url: a.globalData.urlHeader + "/message/msglist",
            data: {
                openid: a.globalData.openid,
                token: a.globalData.token,
                class: 0,
                tag: 1,
                beg: 0,
                num: 10
            },
            method: "POST",
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                if (0 === e.data.code) {
                    for (var s = 0; s < e.data.data.message.length; s++) {
                        e.data.data.message[s].tag = t.data.tag[e.data.data.message[s].tag], e.data.data.message[s].img = e.data.data.message[s].img.split(","), 
                        e.data.data.message[s].img.splice(0, 1);
                        for (var d = 0; d < e.data.data.message[s].img.length; d++) e.data.data.message[s].img[d] = a.globalData.urlHeader + "/uploads/" + e.data.data.message[s].img[d];
                        e.data.data.message[s].icon = a.globalData.urlHeader + "/uploads/avatars/" + e.data.data.message[s].icon, 
                        e.data.data.message[s].img.sort();
                    }
                    t.setData({
                        dianziMessage: e.data.data.message,
                        hasMore: !1
                    }), console.log(t.data.dianziMessage);
                } else console.log("获取列表失败！" + e.data.error);
            }
        }), 2 == s && wx.request({
            url: a.globalData.urlHeader + "/message/msglist",
            data: {
                openid: a.globalData.openid,
                token: a.globalData.token,
                class: 0,
                tag: 2,
                beg: 0,
                num: 10
            },
            method: "POST",
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                if (0 === e.data.code) {
                    for (var s = 0; s < e.data.data.message.length; s++) {
                        e.data.data.message[s].tag = t.data.tag[e.data.data.message[s].tag], e.data.data.message[s].img = e.data.data.message[s].img.split(","), 
                        e.data.data.message[s].img.splice(0, 1);
                        for (var d = 0; d < e.data.data.message[s].img.length; d++) e.data.data.message[s].img[d] = a.globalData.urlHeader + "/uploads/" + e.data.data.message[s].img[d];
                        e.data.data.message[s].icon = a.globalData.urlHeader + "/uploads/avatars/" + e.data.data.message[s].icon, 
                        e.data.data.message[s].img.sort();
                    }
                    t.setData({
                        tiyuMessage: e.data.data.message,
                        hasMore: !1
                    }), console.log(t.data.tiyuMessage);
                } else console.log("获取列表失败！" + e.data.error);
            }
        }), 3 == s && wx.request({
            url: a.globalData.urlHeader + "/message/msglist",
            data: {
                openid: a.globalData.openid,
                token: a.globalData.token,
                class: 0,
                tag: 3,
                beg: 0,
                num: 10
            },
            method: "POST",
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                if (0 === e.data.code) {
                    for (var s = 0; s < e.data.data.message.length; s++) {
                        e.data.data.message[s].tag = t.data.tag[e.data.data.message[s].tag], e.data.data.message[s].img = e.data.data.message[s].img.split(","), 
                        e.data.data.message[s].img.splice(0, 1);
                        for (var d = 0; d < e.data.data.message[s].img.length; d++) e.data.data.message[s].img[d] = a.globalData.urlHeader + "/uploads/" + e.data.data.message[s].img[d];
                        e.data.data.message[s].icon = a.globalData.urlHeader + "/uploads/avatars/" + e.data.data.message[s].icon, 
                        e.data.data.message[s].img.sort();
                    }
                    t.setData({
                        lifeMessage: e.data.data.message,
                        hasMore: !1
                    }), console.log(t.data.lifeMessage);
                } else console.log("获取列表失败！" + e.data.error);
            }
        }), 3 == t.data.currentTab && wx.request({
            url: a.globalData.urlHeader + "/message/msglist",
            data: {
                openid: a.globalData.openid,
                token: a.globalData.token,
                class: 0,
                tag: 4,
                beg: 0,
                num: 10
            },
            method: "POST",
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                if (0 === e.data.code) {
                    for (var s = 0; s < e.data.data.message.length; s++) {
                        e.data.data.message[s].tag = t.data.tag[e.data.data.message[s].tag], e.data.data.message[s].img = e.data.data.message[s].img.split(","), 
                        e.data.data.message[s].img.splice(0, 1);
                        for (var d = 0; d < e.data.data.message[s].img.length; d++) e.data.data.message[s].img[d] = a.globalData.urlHeader + "/uploads/" + e.data.data.message[s].img[d];
                        e.data.data.message[s].icon = a.globalData.urlHeader + "/uploads/avatars/" + e.data.data.message[s].icon, 
                        e.data.data.message[s].img.sort();
                    }
                    t.setData({
                        otherMessage: e.data.data.message,
                        hasMore: !1
                    }), console.log(t.data.otherMessage);
                } else console.log("获取列表失败！" + e.data.error);
            }
        }), t.setData({
            currentTab: s
        });
    },
    onShareAppMessage: function() {
        return {
            title: "校园二手物品交易信息",
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
    },
    onReachBottom: function(e) {
        var t = this, s = new Date().getTime();
        if (s - t.data.latestLoadMore < 500) return console.log("refresh locked"), !1;
        console.log("loadmore"), t.setData({
            hasMore: !0,
            beg: t.data.beg + 10,
            latestLoadMore: s,
            latestRefresh: s
        }), 0 == t.data.currentTab && wx.request({
            url: a.globalData.urlHeader + "/message/msglist",
            data: {
                openid: a.globalData.openid,
                token: a.globalData.token,
                class: 0,
                tag: -1,
                beg: t.data.beg,
                num: 10
            },
            method: "POST",
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                if (0 === e.data.code) {
                    for (var s = 0; s < e.data.data.message.length; s++) {
                        e.data.data.message[s].tag = t.data.tag[e.data.data.message[s].tag], e.data.data.message[s].img = e.data.data.message[s].img.split(","), 
                        e.data.data.message[s].img.splice(0, 1);
                        for (var d = 0; d < e.data.data.message[s].img.length; d++) e.data.data.message[s].img[d] = a.globalData.urlHeader + "/uploads/" + e.data.data.message[s].img[d];
                        e.data.data.message[s].icon = a.globalData.urlHeader + "/uploads/avatars/" + e.data.data.message[s].icon, 
                        e.data.data.message[s].img.sort(), t.data.allMessage.push(e.data.data.message[s]);
                    }
                    t.setData({
                        allMessage: t.data.allMessage,
                        hasMore: !1
                    }), console.log(t.data.allMessage);
                } else console.log("获取列表失败！" + e.data.error);
            }
        }), 1 == t.data.currentTab && wx.request({
            url: a.globalData.urlHeader + "/message/msglist",
            data: {
                openid: a.globalData.openid,
                token: a.globalData.token,
                class: 0,
                tag: 1,
                beg: t.data.beg,
                num: 10
            },
            method: "POST",
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                if (0 === e.data.code) {
                    for (var s = 0; s < e.data.data.message.length; s++) {
                        e.data.data.message[s].tag = t.data.tag[e.data.data.message[s].tag], e.data.data.message[s].img = e.data.data.message[s].img.split(","), 
                        e.data.data.message[s].img.splice(0, 1);
                        for (var d = 0; d < e.data.data.message[s].img.length; d++) e.data.data.message[s].img[d] = a.globalData.urlHeader + "/uploads/" + e.data.data.message[s].img[d];
                        e.data.data.message[s].icon = a.globalData.urlHeader + "/uploads/avatars/" + e.data.data.message[s].icon, 
                        e.data.data.message[s].img.sort(), t.data.dianziMessage.push(e.data.data.message[s]);
                    }
                    t.setData({
                        dianziMessage: t.data.dianziMessage,
                        hasMore: !1
                    }), console.log(t.data.dianziMessage);
                } else console.log("获取列表失败！" + e.data.error);
            }
        }), 2 == t.data.currentTab && wx.request({
            url: a.globalData.urlHeader + "/message/msglist",
            data: {
                openid: a.globalData.openid,
                token: a.globalData.token,
                class: 0,
                tag: 2,
                beg: t.data.beg,
                num: 10
            },
            method: "POST",
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                if (0 === e.data.code) {
                    for (var s = 0; s < e.data.data.message.length; s++) {
                        e.data.data.message[s].tag = t.data.tag[e.data.data.message[s].tag], e.data.data.message[s].img = e.data.data.message[s].img.split(","), 
                        e.data.data.message[s].img.splice(0, 1);
                        for (var d = 0; d < e.data.data.message[s].img.length; d++) e.data.data.message[s].img[d] = a.globalData.urlHeader + "/uploads/" + e.data.data.message[s].img[d];
                        e.data.data.message[s].icon = a.globalData.urlHeader + "/uploads/avatars/" + e.data.data.message[s].icon, 
                        e.data.data.message[s].img.sort(), t.data.tiyuMessage.push(e.data.data.message[s]);
                    }
                    t.setData({
                        tiyuMessage: t.data.tiyuMessage,
                        hasMore: !1
                    }), console.log(t.data.tiyuMessage);
                } else console.log("获取列表失败！" + e.data.error);
            }
        }), 3 == t.data.currentTab && wx.request({
            url: a.globalData.urlHeader + "/message/msglist",
            data: {
                openid: a.globalData.openid,
                token: a.globalData.token,
                class: 0,
                tag: 3,
                beg: t.data.beg,
                num: 10
            },
            method: "POST",
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                if (0 === e.data.code) {
                    for (var s = 0; s < e.data.data.message.length; s++) {
                        e.data.data.message[s].tag = t.data.tag[e.data.data.message[s].tag], e.data.data.message[s].img = e.data.data.message[s].img.split(","), 
                        e.data.data.message[s].img.splice(0, 1);
                        for (var d = 0; d < e.data.data.message[s].img.length; d++) e.data.data.message[s].img[d] = a.globalData.urlHeader + "/uploads/" + e.data.data.message[s].img[d];
                        e.data.data.message[s].icon = a.globalData.urlHeader + "/uploads/avatars/" + e.data.data.message[s].icon, 
                        e.data.data.message[s].img.sort(), t.data.lifeMessage.push(e.data.data.message[s]);
                    }
                    t.setData({
                        lifeMessage: t.data.lifeMessage,
                        hasMore: !1
                    }), console.log(t.data.lifeMessage);
                } else console.log("获取列表失败！" + e.data.error);
            }
        }), 4 == t.data.currentTab && wx.request({
            url: a.globalData.urlHeader + "/message/msglist",
            data: {
                openid: a.globalData.openid,
                token: a.globalData.token,
                class: 0,
                tag: 4,
                beg: t.data.beg,
                num: 10
            },
            method: "POST",
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                if (0 === e.data.code) {
                    for (var s = 0; s < e.data.data.message.length; s++) {
                        e.data.data.message[s].tag = t.data.tag[e.data.data.message[s].tag], e.data.data.message[s].img = e.data.data.message[s].img.split(","), 
                        e.data.data.message[s].img.splice(0, 1);
                        for (var d = 0; d < e.data.data.message[s].img.length; d++) e.data.data.message[s].img[d] = a.globalData.urlHeader + "/uploads/" + e.data.data.message[s].img[d];
                        e.data.data.message[s].icon = a.globalData.urlHeader + "/uploads/avatars/" + e.data.data.message[s].icon, 
                        e.data.data.message[s].img.sort(), t.data.otherMessage.push(e.data.data.message[s]);
                    }
                    t.setData({
                        otherMessage: t.data.otherMessage,
                        hasMore: !1
                    }), console.log(t.data.otherMessage);
                } else console.log("获取列表失败！" + e.data.error);
            }
        });
    },
    onPullDownRefresh: function(e) {
        var t = this, s = new Date().getTime();
        console.log("refresh"), t.setData({
            beg: 0,
            hasRefresh: !0,
            latestRefresh: s,
            latestLoadMore: s
        }), 0 == t.data.currentTab && wx.request({
            url: a.globalData.urlHeader + "/message/msglist",
            data: {
                openid: a.globalData.openid,
                token: a.globalData.token,
                class: 0,
                tag: -1,
                beg: 0,
                num: 10
            },
            method: "POST",
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                if (0 === e.data.code) {
                    for (var s = 0; s < e.data.data.message.length; s++) {
                        e.data.data.message[s].tag = t.data.tag[e.data.data.message[s].tag], e.data.data.message[s].img = e.data.data.message[s].img.split(","), 
                        e.data.data.message[s].img.splice(0, 1);
                        for (var d = 0; d < e.data.data.message[s].img.length; d++) e.data.data.message[s].img[d] = a.globalData.urlHeader + "/uploads/" + e.data.data.message[s].img[d];
                        e.data.data.message[s].icon = a.globalData.urlHeader + "/uploads/avatars/" + e.data.data.message[s].icon, 
                        e.data.data.message[s].img.sort();
                    }
                    t.setData({
                        allMessage: e.data.data.message,
                        hasRefresh: !1
                    }), console.log(t.data.allMessage), wx.stopPullDownRefresh();
                } else console.log("获取列表失败！" + e.data.error), wx.stopPullDownRefresh();
            }
        }), 1 == t.data.currentTab && wx.request({
            url: a.globalData.urlHeader + "/message/msglist",
            data: {
                openid: a.globalData.openid,
                token: a.globalData.token,
                class: 0,
                tag: 1,
                beg: 0,
                num: 10
            },
            method: "POST",
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                if (0 === e.data.code) {
                    for (var s = 0; s < e.data.data.message.length; s++) {
                        e.data.data.message[s].tag = t.data.tag[e.data.data.message[s].tag], e.data.data.message[s].img = e.data.data.message[s].img.split(","), 
                        e.data.data.message[s].img.splice(0, 1);
                        for (var d = 0; d < e.data.data.message[s].img.length; d++) e.data.data.message[s].img[d] = a.globalData.urlHeader + "/uploads/" + e.data.data.message[s].img[d];
                        e.data.data.message[s].icon = a.globalData.urlHeader + "/uploads/avatars/" + e.data.data.message[s].icon, 
                        e.data.data.message[s].img.sort();
                    }
                    t.setData({
                        dianziMessage: e.data.data.message,
                        hasRefresh: !1
                    }), console.log(t.data.dianziMessage), wx.stopPullDownRefresh();
                } else console.log("获取列表失败！" + e.data.error), wx.stopPullDownRefresh();
            }
        }), 2 == t.data.currentTab && wx.request({
            url: a.globalData.urlHeader + "/message/msglist",
            data: {
                openid: a.globalData.openid,
                token: a.globalData.token,
                class: 0,
                tag: 2,
                beg: 0,
                num: 10
            },
            method: "POST",
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                if (0 === e.data.code) {
                    for (var s = 0; s < e.data.data.message.length; s++) {
                        e.data.data.message[s].tag = t.data.tag[e.data.data.message[s].tag], e.data.data.message[s].img = e.data.data.message[s].img.split(","), 
                        e.data.data.message[s].img.splice(0, 1);
                        for (var d = 0; d < e.data.data.message[s].img.length; d++) e.data.data.message[s].img[d] = a.globalData.urlHeader + "/uploads/" + e.data.data.message[s].img[d];
                        e.data.data.message[s].icon = a.globalData.urlHeader + "/uploads/avatars/" + e.data.data.message[s].icon, 
                        e.data.data.message[s].img.sort();
                    }
                    t.setData({
                        tiyuMessage: e.data.data.message,
                        hasRefresh: !1
                    }), console.log(t.data.tiyuMessage), wx.stopPullDownRefresh();
                } else console.log("获取列表失败！" + e.data.error), wx.stopPullDownRefresh();
            }
        }), 3 == t.data.currentTab && wx.request({
            url: a.globalData.urlHeader + "/message/msglist",
            data: {
                openid: a.globalData.openid,
                token: a.globalData.token,
                class: 0,
                tag: 3,
                beg: 0,
                num: 10
            },
            method: "POST",
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                if (0 === e.data.code) {
                    for (var s = 0; s < e.data.data.message.length; s++) {
                        e.data.data.message[s].tag = t.data.tag[e.data.data.message[s].tag], e.data.data.message[s].img = e.data.data.message[s].img.split(","), 
                        e.data.data.message[s].img.splice(0, 1);
                        for (var d = 0; d < e.data.data.message[s].img.length; d++) e.data.data.message[s].img[d] = a.globalData.urlHeader + "/uploads/" + e.data.data.message[s].img[d];
                        e.data.data.message[s].icon = a.globalData.urlHeader + "/uploads/avatars/" + e.data.data.message[s].icon, 
                        e.data.data.message[s].img.sort();
                    }
                    t.setData({
                        lifeMessage: e.data.data.message,
                        hasRefresh: !1
                    }), console.log(t.data.lifeMessage), wx.stopPullDownRefresh();
                } else console.log("获取列表失败！" + e.data.error), wx.stopPullDownRefresh();
            }
        }), 3 == t.data.currentTab && wx.request({
            url: a.globalData.urlHeader + "/message/msglist",
            data: {
                openid: a.globalData.openid,
                token: a.globalData.token,
                class: 0,
                tag: 4,
                beg: 0,
                num: 10
            },
            method: "POST",
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                if (0 === e.data.code) {
                    for (var s = 0; s < e.data.data.message.length; s++) {
                        e.data.data.message[s].tag = t.data.tag[e.data.data.message[s].tag], e.data.data.message[s].img = e.data.data.message[s].img.split(","), 
                        e.data.data.message[s].img.splice(0, 1);
                        for (var d = 0; d < e.data.data.message[s].img.length; d++) e.data.data.message[s].img[d] = a.globalData.urlHeader + "/uploads/" + e.data.data.message[s].img[d];
                        e.data.data.message[s].icon = a.globalData.urlHeader + "/uploads/avatars/" + e.data.data.message[s].icon, 
                        e.data.data.message[s].img.sort();
                    }
                    t.setData({
                        otherMessage: e.data.data.message,
                        hasRefresh: !1
                    }), console.log(t.data.otherMessage), wx.stopPullDownRefresh();
                } else console.log("获取列表失败！" + e.data.error), wx.stopPullDownRefresh();
            }
        });
    },
    addContentBus: function(e) {
        a.globalData.contentBus = e.currentTarget.dataset.hi;
    }
});