function a(a, e, t) {
    return e in a ? Object.defineProperty(a, e, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[e] = t, a;
}

var e, t = getApp();
let cms = t.globalData.cms;
let test = require('../../utils/data')

Page((e = {
    data: {
        fabu0: 1,
        collect0: 1,
        auth: -1,
        latestRefresh: 0,
        latestLoadMore: 0,
        scrollable: !1,
        windowHeight: 0,
        currentTab: 0,
        motto: "Hello World",
        userInfo: null,
        fabuMessage: [],
        collectMessage: [],
        hasMore: !1,
        hasRefresh: !1,
        beg: 0,
        publish_page: 1,
        collect_page: 1,
        category: {
                1:"手机",
                2:"美妆",
                3:"出行",
                4: "家电",
                5: "书籍",
                6: "数码电子",
                7:"鞋类箱包",
                8: "男装女装",
                9:"钟表首饰",
                10: "体育器材",
               11: "其它"
            },
    },

    onLoad: function() {
        console.log("onLoad");

        this.setData({
            userInfo: t.globalData.userInfo,
        })

        this.initData();

    },

    onShow: function(){
        console.log(t.globalData.campusUserInfo)
        this.initData();
        this.setData({
            // fabuMessage: t.globalData.userPublishData,
            // collectMessage: t.globalData.userCollectData,
            // fabu0: t.globalData.userPublishData.length ? 0 : 1,
            // collect0: t.globalData.userCollectData.length ? 0 : 1,
            userInfo: t.globalData.userInfo,
            hasRefresh: 0,
            auth: t.globalData.campusUserInfo.isAuth ? t.globalData.campusUserInfo.isAuth : false
        })
    },

    goContentDetail: function(e){
        let self = this, 
            item = e.currentTarget.dataset.item;
        // if(item.status){
            if(e.currentTarget.dataset.type == 'collect'){
                item.category = self.data.category[item.categoryId]
            }
            t.globalData.viewContentData = item
            cms.go_url({
                url: '/pages/content/content',
                type: 'navigateTo',
                param: {fromMy: 1, index: e.currentTarget.dataset.index,type: e.currentTarget.dataset.type}
            })
        // } else {
            // cms.go_url({
                // url: '/pages/gone/gone',
                // type: 'navigateTo'
            // })
        // }  
    },

    initData: function(){
        this.setData({
            fabuMessage: [],
            collectMessage: [],
            publish_page: 1,
            collect_page: 1
        })
        this.netstart();
        this.getPublishData({refresh: false});
        this.getCollectData({refresh: false});
    },

    getPublishData: function(e){
        let self = this,
            data = {
                uid: t.globalData.campusUserInfo.uid,
                num: cms.constant.pageNum,
                page: self.data.publish_page
            }

        cms.ajax('get', cms.api.publish, data, function(res){
            if(cms.isDefine(res) && !cms.isNullArray(res) && res.code != 40404){
                res = cms.ArrayFriendlyDate(res, ["createdTime", "lastUpdateTime"])
                self.setData({
                    fabuMessage: e.refresh ? res : self.data.fabuMessage.concat(res),
                    publish_page: self.data.publish_page + 1,
                    fabu0: 0,
                })
                t.globalData.userPublishData = t.globalData.userPublishData.concat(self.data.fabuMessage)
            }
            wx.stopPullDownRefresh()
            console.log("publishData")
            console.log(self.data.fabuMessage)
        })
    },

    getCollectData: function(e){
        let self = this,
            data = {
                uid: t.globalData.campusUserInfo.uid,
                num: cms.constant.pageNum,
                page: self.data.collect_page
            }

        cms.ajax('get', cms.api.collect, data, function(res){
            if(cms.isDefine(res) && !cms.isNullArray(res) && res.code != 40404){
                console.log(res)
                res = cms.ArrayFriendlyDate(res, ["createdTime", "lastUpdateTime"])
                self.setData({
                    collectMessage: e.refresh ? res : self.data.collectMessage.concat(res),
                    collect_page: self.data.collect_page + 1,
                    collect0: 0
                })
                t.globalData.userCollectData = t.globalData.userCollectData.concat(self.data.collectMessage)
            }
            wx.stopPullDownRefresh()
            console.log("collectData")
            console.log(self.data.collectMessage)
        })
    },



    bindGetUserInfo: function(e){
        let self = this
        this.setData({
            userInfo: e.detail.userInfo
        })
        t.globalData.userInfo = e.detail.userInfo
        console.log(t.globalData.campusUserInfo)
        // if(!cms.isDefine(t.globalData.campusUserInfo) || !t.globalData.campusUserInfo.uid){
            cms.ajax("get", cms.api.info, {uid: t.globalData.uid}, function(res){
                if(res.code != 30404 && cms.isDefine(res.uid)){
                    t.globalData.campusUserInfo = res
                    auth: t.globalData.campusUserInfo.isAuth ? t.globalData.campusUserInfo.isAuth : false
                    cms.storage.set("userInfo", res)
                } else {
                    console.log("regist")
                    self.registerUser();
                }
            })
        // }
    },

    registerUser: function(){
        let self = this,
            data = {
                uid: t.globalData.uid,
                isAuth: false,
                username: t.globalData.userInfo.nickName,
                location: t.globalData.userInfo.city + " " + t.globalData.userInfo.province ,
                avatar: t.globalData.userInfo.avatarUrl,
                wechat: "",
            };
        cms.registerUserToServer(data, function(res){
            t.globalData.campusUserInfo = res
        })
    },
                
    netstart: function() {
        var a = this;
        console.log("正在查询网络状态"), wx.getNetworkType({
            success: function(e) {
                console.log(e.networkType), "none" == e.networkType ? a.setData({
                    networkType: !1
                }) : a.setData({
                    networkType: !0
                });
            }
        });
    },

    bindChange: function(a) {
        this.setData({
            currentTab: a.detail.current
        });
    },

    swichNav: function(a) {
        var e = this, s = a.target.dataset.current;
        if (this.data.currentTab === s) return !1;
        e.setData({
            hasMore: !1,
            hasRefresh: !1,
            currentTab: s,
            // collect_page: 1,
            // publish_page: 1,
            // collectMessage: [],
            // fabuMessage: []
        })


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

    onReachBottom: function(a) {
        console.log(a)
        var e = this, s = new Date().getTime();
        if (s - e.data.latestLoadMore < 500) return console.log("refresh locked"), !1;
        console.log("loadmore")
        e.setData({
            hasMore: !0,
            beg: e.data.beg + 10,
            latestLoadMore: s,
            latestRefresh: s
        })

        0 == e.data.currentTab ? this.getPublishData({refresh: true}) : this.getCollectData({refresh: true});
    },

    onPullDownRefresh: function(a) {
        var e = this, s = new Date().getTime();
        console.log("refresh"), e.setData({
            beg: 0,
            hasRefresh: !0,
            latestRefresh: s,
            latestLoadMore: s
        })

        this.initData();
    },

    addContentBus: function(a) {
        t.globalData.contentBus = a.currentTarget.dataset.hi;
    },

    sysConf: function() {
        wx.navigateTo({
            url: "../sys/sys"
        });
    },

    removeIssue: function(a) {
        var e = this;
        console.log(a.currentTarget.dataset.hi);
        var s = parseInt(a.currentTarget.dataset.hi), index = a.currentTarget.dataset.index;
        wx.showActionSheet({
            itemList: [ "删除" ],
            success: function(a) {
                console.log(a.tapIndex), 0 === a.tapIndex && wx.showModal({
                    title: "提示",
                    content: "确定要删除此条信息吗？",
                    success: function(a) {
                        if (a.confirm) wx.showLoading({
                            title: "努力删除中"
                        })

                        cms.ajax("delete", `${cms.api.delete}?brand_id=${s}`, {},
                      function(res){
                            e.data.fabuMessage.splice(index ,1)
                            e.setData({
                                fabuMessage: e.data.fabuMessage
                            })

                            wx.hideLoading();
                            cms.toast("删除成功");

                        })

                    }
                });
            },
            fail: function(a) {
                console.log(a.errMsg);
            }
        });
    },
    
    removeFav: function(a) {
        var e = this;
        console.log(a.currentTarget.dataset.hi);
        var s = parseInt(a.currentTarget.dataset.hi), index = a.currentTarget.dataset.index;
        wx.showActionSheet({
            itemList: [ "删除收藏" ],
            success: function(a) {
                console.log(a.tapIndex), 0 === a.tapIndex && wx.showModal({
                    title: "提示",
                    content: "确定要删除此条收藏吗？",
                    success: function(a) {
                        if (a.confirm) wx.showLoading({
                            title: "努力删除中"
                        });

                        let data = cms.storage.get("favList").favList;

                        data.splice(cms.storage.get("favList").favList.indexOf(s), 1)

                        cms.storage.set("favList", {favList: data});
                        cms.ajax("delete", `${cms.api.doCollect}?uid=${t.globalData.uid}&brand_id=${s}`, {}, function(res){
                            console.log(res)
                            e.data.collectMessage.splice(index ,1)
                            e.setData({
                                collectMessage: e.data.collectMessage
                            })
                            wx.hideLoading();
                            cms.toast("成功删除")
                        });

                    }
                });
            },
            fail: function(a) {
                console.log(a.errMsg);
            }
        });
    }
}, a(e, "onReachBottom", function() {
    this.setData({
        scrollable: !0
    });
}), a(e, "login", function() {
    wx.navigateTo({
        url: "../login/login"
    });
}), e));