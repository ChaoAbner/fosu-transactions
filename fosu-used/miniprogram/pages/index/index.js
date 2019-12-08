var a = getApp(), cms = a.globalData.cms, constant = cms.constant

require("../../utils/util.js"), require("../../config.js");

var test = require('../../utils/data')

Page({
    data: {
        isread: !0,
        opacity: 1,
        logined: !0,
        sort: "time",
        nosearch: !0,
        hideAll: !1,
        search: "",
        searchMessage: [],
        latestRefresh: 0,
        latestLoadMore: 0,
        scrollable: !1,
        windowHeight: 0,
        hidden: !1,
        location: "",
        county: "",
        sliderList: [ a.globalData.urlHeader + "/public/lunbo1.jpg", a.globalData.urlHeader + "/public/lunbo2.jpg", a.globalData.urlHeader + "/public/lunbo3.jpg" ],
        today: "",
        containerShow: !0,
        currentTab: 0,
        currentnum: 0,
        hotMessage: [],
        latestMessage: [],
        freeMessage: [],
        hasMore: !0,            // 到底部是否显示加载更多
        hasRefresh: !1,         // 到顶部是否显示加载中
        beg: 0,
        neg: 0,
        lastest_page: 1,
        free_page: 1,
        search_page: 1,
        hot_page: 1,
        notifyMessage: []
    },
    
    onLoad: function(e) {
        var t = e.shareid;
        var s = this;

        // this.setData({
        //     latestMessage: test.index,
        //     freeMessage: test.index
        // })
        // console.log(this.data.latestMessage)
        this.initData();
    },

    jump: function() {
        wx.reLaunch({
            url: "../switchcity/switchcity"
        });
    },

    gotoWeather: function() {
        wx.navigateTo({
            url: "../weather/weather"
        });
    },

    goContentDetail: function(e){
        let self = this, 
            item = e.currentTarget.dataset.item;
        console.log(e)
        console.log(item)
        a.globalData.viewContentData = item
        cms.go_url({
            url: '/pages/content/content',
            type: 'navigateTo'
        })
    },

    switchTab: function(a) {
        var e, t, s = this.data.sliderList;
        for (e = 0; t = s[e]; ++e) t.selected = a.detail.current == e;
        this.setData({
            sliderList: s
        });
    },

    initData: function(){
        console.log('init')
        this.setData({
            latestMessage: [],
            freeMessage: [],
            searchMessage: [],
            hotMessage: [],
            lastest_page: 1,
            free_page: 1,
            search_page: 1,
        })
        if(this.data.hideAll){
            this.searchConfirm();
        } else {
            this.getLastestData();
            this.getFreeData();
            // this.getHotData();
            this.getNotify();
        }
    },

    getHotData: function(e){
        let self = this
        var data = {
            num: constant.pageNum,
            page: this.data.hot_page
        }

        cms.ajax('get', cms.api.hot, data, function(res){
            if(!cms.isNullArray(res) && res.code != 40404){
                console.log("hot")
                console.log(res)
                res = cms.ArrayFriendlyDate(res, ["createdTime", "lastUpdateTime"])
                self.setData({
                    hotMessage: res,
                    hot_page: self.data.hot_page + 1,
                    hasRefresh: 0,
                    hasMore: 0
                })
            }
        })
    },

    getLastestData: function(e){
        let self = this,
            old_data = self.data.latestMessage
        var data = {
            num: constant.pageNum,
            page: self.data.lastest_page
        }

        cms.ajax('get', cms.api.lastest, data, function(res){
            if( cms.isDefine(res.items) && !cms.isNullArray(res.items) && res.code != 40404){
                console.log("lastest")
                console.log(res.items)
                res.items = cms.ArrayFriendlyDate(res.items, ["createdTime", "lastUpdateTime"])
                self.setData({
                    latestMessage: old_data.concat(res.items),
                    lastest_page: self.data.lastest_page + 1,
                }) 
            }
             else{
                cms.toast("加载完毕")
            }
            self.setData({hasRefresh: !1, hasMore: 0})
            wx.stopPullDownRefresh()
        })
    },

    getNotify: function(e){
        let self = this,
            data = {};
        cms.ajax('get', cms.api.notify, data, function(res){
            if( cms.isDefine(res) && !cms.isNullArray(res) && res.code != 40404){
                console.log("noitify")
                console.log(res)
                self.setData({
                    notifyMessage: res,
                    hasRefresh: 0,
                    hasMore: 0
                })
                let num = cms.storage.get("notifyNum")
                if(num != res.length){
                    self.setData({
                        isread: 0
                    })
                }
            }
        })
    },

    getFreeData: function(e){
        let self = this,
            old_data = self.data.freeMessage
        var data = {
            num: constant.pageNum,
            page: self.data.free_page
        }

        cms.ajax('get', cms.api.free, data, function(res){
            if(cms.isDefine(res.items) && !cms.isNullArray(res.items) && res.code != 40404){
                res.items = cms.ArrayFriendlyDate(res.items, ["createdTime", "lastUpdateTime"])
                self.setData({
                    freeMessage: old_data.concat(res.items),
                    free_page: self.data.free_page + 1,
                })
            }
             else{
                cms.toast("加载完毕")
            }
            self.setData({hasRefresh: !1, hasMore: 0})
        })
    },

    getSearchData: function(e){
        let self = this,
            old_data = self.data.searchMessage;
        var data = {
            num: constant.pageNum,
            page: self.data.search_page,
            query: self.data.search,
        }

        cms.ajax('get', cms.api.search, data, function(res){
            if(cms.isDefine(res.items) && !cms.isNullArray(res.items)){
                res.items = cms.ArrayFriendlyDate(res.items, ["createdTime", "lastUpdateTime"])
                self.setData({
                    searchMessage: old_data.concat(res.items),
                    search_page: self.data.search_page + 1,
                })
            } else{
                cms.toast("加载完毕")
            }
            self.setData({hasRefresh: !1, hasMore: 0})
        })
    },

    // 搜索
    searchConfirm: function() {
        var e = this, t = new Date().getTime();
        e.setData({
            hasRefresh: !0,
            latestRefresh: t,
            latestLoadMore: t,
            hideAll: 1,
            search_page: 1,
            searchMessage: []
        })
        this.getSearchData();
    },

    searchClear: function() {
        this.setData({
            search: "",
            hideAll: !1
        });
    },


    // getNotify: function(e){
    //     let self = this
    //     var data = {}

    //     cms.ajax('get', cms.api.notify, data, function(res){
    //         console.log(res)

    //     })   
    // },

    swichNav: function(e) {
        var t = this, s = e.target.dataset.current;
        if (this.data.currentTab === s) return !1;
        t.setData({
            beg: 0,
            hasMore: !0,
            hasRefresh: !1
        })
        t.setData({
            currentTab: s
        })

        console.log(t.data.currentTab);
    },

    message: function() {
        a.globalData.notifyMessage = this.data.notifyMessage;
        cms.storage.set("notifyNum", a.globalData.notifyMessage.length);

        this.setData({
            isread: !0
        });
        wx.navigateTo({
            url: "../message/message",
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

        // 搜索页面
        1 == t.data.hideAll ? (console.log("searchloadmore"), t.setData({
            hasMore: !0,
            latestLoadMore: s,
            latestRefresh: s
        }), this.getSearchData())

         // 普通页面
        : (console.log("loadmore"), t.setData({
            hasMore: !0,
            latestLoadMore: s,
            latestRefresh: s
        }), 
        // 最新消息
        0 == t.data.currentTab ? this.getLastestData()
        // 免费消息
         : this.getFreeData())
    },

    onPullDownRefresh: function(e) {
        var t = this, s = new Date().getTime();
        console.log("refresh"), t.setData({
            beg: 0,
            hasRefresh: !0,
            latestRefresh: s,
            latestLoadMore: s,
            latestMessage: [],
            freeMessage: [],
            hideAll: !1,
            search: "",
            isread: !0
        })

        this.initData();

    },

    addContentBus: function(e) {
        a.globalData.contentBus = e.currentTarget.dataset.hi;
    },

    bindKeyInput: function(a) {
        this.setData({
            search: a.detail.value
        });
    },

    
    swichnum: function(e) {
        var t = this, s = e.target.dataset.current;
        if (this.data.currentnum == s) return !1;
        if (0 == s) {
            o = (d = new Date()).getTime();
            t.setData({
                beg: 0,
                hasRefresh: !0,
                latestRefresh: o,
                latestLoadMore: o
            }), console.log(t.data.search), wx.request({
                url: a.globalData.urlHeader + "/message/search",
                data: {
                    openid: a.globalData.openid,
                    token: a.globalData.token,
                    keyword: t.data.search,
                    sort: t.data.sort,
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
                            searchMessage: e.data.data.message,
                            hideAll: !0,
                            hasRefresh: !1
                        }), console.log(t.data.searchMessage);
                    } else console.log("获取列表失败！" + e.data.error);
                }
            });
        }
        if (1 == s) {
            o = (d = new Date()).getTime();
            t.setData({
                beg: 0,
                hasRefresh: !0,
                latestRefresh: o,
                latestLoadMore: o
            }), console.log(t.data.search), wx.request({
                url: a.globalData.urlHeader + "/message/search",
                data: {
                    openid: a.globalData.openid,
                    token: a.globalData.token,
                    keyword: t.data.search,
                    sort: "viewed",
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
                            searchMessage: e.data.data.message,
                            hideAll: !0,
                            hasRefresh: !1
                        }), console.log(t.data.searchMessage);
                    } else console.log("获取列表失败！" + e.data.error);
                }
            });
        }
        if (2 == s) {
            var d = new Date(), o = d.getTime();
            t.setData({
                beg: 0,
                hasRefresh: !0,
                latestRefresh: o,
                latestLoadMore: o
            }), console.log(t.data.search), wx.request({
                url: a.globalData.urlHeader + "/message/search",
                data: {
                    openid: a.globalData.openid,
                    token: a.globalData.token,
                    keyword: t.data.search,
                    sort: "viewed_in_week",
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
                            e.data.data.message[s].img.sort(), "NA" !== e.data.data.message[s].video ? e.data.data.message[s].video = a.globalData.urlHeader + "/uploads/" + e.data.data.message[s].video : e.data.data.message[s].video = !1;
                        }
                        t.setData({
                            searchMessage: e.data.data.message,
                            hideAll: !0,
                            hasRefresh: !1
                        }), console.log(t.data.searchMessage);
                    } else console.log("获取列表失败！" + e.data.error);
                }
            });
        }
        t.setData({
            currentnum: s
        });
    },
    zhezhaoTap: function() {
        wx.navigateTo({
            url: "../hot/hot"
        });
    },
    tozhinan: function() {
        wx.navigateTo({
            url: "../zhinan/zhinan"
        });
    }
});