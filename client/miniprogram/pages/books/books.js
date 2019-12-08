var a = getApp();
var cms = a.globalData.cms

Page({
    data: {
        latestRefresh: 0,
        latestLoadMore: 0,
        windowHeight: 0,
        currentTab: 0,
        topbookheight: "45px",
        allMessage: [],
        otherMessage: [],
        cname: "",
        hasMore: !1,
        hasRefresh: !1,
        beg: 0,
        categoryOrginList: ['手机', '美妆', '出行','家电', '书籍'],
        categoryAddList: [
            '数码电子',
            '鞋类箱包',
            '男装女装',
            '钟表首饰',
            '体育器材',
            '其它'
        ],
        all_page: 1,
        other_page: 1,
    },

    onLoad: function() {
        var e = this, t = wx.getSystemInfoSync();
        e.setData({
            windowHeight: t.windowHeight
        })
        this.getAllData({refresh: false});
    },

    getAllData: function(type){
        let self = this,
            data = {
                num: cms.constant.pageNum,
                page: self.data.all_page
            }
        cms.ajax('get', cms.api.lastest, data, function(res){

            if(cms.isDefine(res.items) && !cms.isNullArray(res.items)){
                res.items.forEach(function(item){
                    item.createdTime = cms.getFriendlyDate(item.createdTime)
                })
                self.setData({
                    allMessage: type.refresh ? self.data.allMessage.concat(res.items) : res.items,
                    all_page: self.data.all_page + 1,
                })
            } else{
                cms.toast("加载完毕")
            }
            self.setData({hasRefresh: !1, hasMore: 0})
            wx.stopPullDownRefresh();
        })
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

    getCategoryData: function(type){
        let self = this,
            cname = self.data.cname,
            data = {
                num: cms.constant.pageNum,
                page: self.data.other_page,
                category_id: cms.constant.category[cname]
            }
        cms.ajax('get', cms.api.categoryDetail, data, function(res){
            if(cms.isDefine(res.items) && !cms.isNullArray(res.items)){
                res.items.forEach(function(item){
                    item.createdTime = cms.getFriendlyDate(item.createdTime)
                })
                self.setData({
                    otherMessage: type.refresh ? self.data.otherMessage.concat(res.items) : res.items,
                    other_page: self.data.other_page + 1,
                })
            } else{
                cms.toast("加载完毕")
            }
            self.setData({hasRefresh: !1, hasMore: 0})
            wx.stopPullDownRefresh()
        })
    },

    swichNav: function(e) {
        var t = this, s = e.target.dataset.current, cname = e.target.dataset.item
        console.log(cname)
        console.log(s)
        // if (this.data.currentTab == s) return !1;
        t.setData({
            beg: 0,
            hasMore: !0,
            hasRefresh: !1,
            cname: cname,
            other_page: 1,
            all_page: 1,
            currentTab: s,
            otherMessage: [],
            allMessage: [],
        })
        cname == 'all' ? this.getAllData({refresh: false}) : this.getCategoryData({refresh: false});
        this.setData({
            hasMore: 0,
            hasRefresh: 1,
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
    onReachBottom: function(e) {
        var t = this, s = new Date().getTime();
        if (s - t.data.latestLoadMore < 500) return console.log("refresh locked"), !1;
        console.log("loadmore"), t.setData({
            hasMore: !0,
            beg: t.data.beg + 10,
            latestLoadMore: s,
            latestRefresh: s
        })

        t.data.currentTab == 0 ? this.getAllData({refresh: true}) : this.getCategoryData({refresh: true});
    },


    xiala: function(a) {
        var e = this;
        "100%" == e.data.topbookheight ? e.setData({
            topbookheight: "45px"
        }) : e.setData({
            topbookheight: "100%"
        });
    },
    topbookChange: function(a) {
        var e = this;
        e.setData({
            topbookheight: a.detail.topbookheight
        }), freshData(a.detail.topbookheight, e);
    },

    onPullDownRefresh: function(e) {
        let self = this;
        this.swichNav({
            target:{
                dataset: {
                    current: self.data.currentTab,
                    item: self.data.currentTab == 0 ? "all" : self.data.cname
                }
            }
        })
    },
    addContentBus: function(e) {
        a.globalData.contentBus = e.currentTarget.dataset.hi;
    }
});