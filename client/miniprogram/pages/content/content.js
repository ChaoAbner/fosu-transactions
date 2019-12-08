var a = getApp();
let cms = a.globalData.cms

Page({
    data: {
        jinyong: !1,
        liuyan0: !1,
        copyTip: !1,
        focusLabel: !1,
        message: {},
        comments: [],
        comment: {},
        isAdded: 0,
        auth: -1,
        fromMy: 0,
        commentInput: "",
        placeholderText: "有什么想了解的写下来吧",
        isReply: !1,
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
        },
        viewIndex: 0,
        type: "publish",
    },
    OnShow(){
        this.setData({
            campusUserInfo: a.globalData.campusUserInfo,
        })
    },
    onLoad: function(e) {
        var t = this, o = 1 != a.globalData.auth;
        if (t.setData({
            jinyong: o
        }), "fromMy" in e) n = e.fromMy; else var n = 0;

        a.globalData.viewContentData.comments = cms.ArrayFriendlyDate(a.globalData.viewContentData.comments, ['createdTime'])
        t.setData({
            auth: a.globalData.campusUserInfo.isAuth,
            fromMy: n,
            message: a.globalData.viewContentData,
            viewIndex: cms.isDefine(e.index) ? e.index : 0,
            type: cms.isDefine(e.type) ? e.type : "publish",
        });

        if(cms.isDefine(cms.storage.get("favList").favList)){
            t.setData({
                isAdded: cms.storage.get("favList").favList.indexOf(t.data.message.id) !== -1
            })
        } else {
            let data = {
                uid: a.globalData.uid,
                num: 100,
                page: 1
            }
            cms.ajax("get", cms.api.collect, data, function(res){
                if(cms.isDefine(res) && res.code != 40404){
                    let favList = []
                    res.forEach(item=>{
                        favList.push(item.id)
                    })
                    t.setData({
                        isAdded: favList.indexOf(t.data.message.id) !== -1
                    })
                    cms.storage.set("favList", {favList: favList});

                } else {
                    cms.storage.set("favList", {favList: []});
                }
            })
        }


        // console.log(this.data.message)

    },
    addToFav: function() {
        var e = this;
        if(a.globalData.campusUserInfo.isAuth){
            e.setData({
                isAdded: 1
            })
            let data = cms.isDefine(cms.storage.get("favList").favList) ? cms.storage.get("favList").favList :[];
                data.push(e.data.message.id)
            cms.storage.set("favList", {favList: data});

            let post = {
                uid: a.globalData.uid,
                // brand_id: e.data.message.id
            };
            cms.ajax("post", `${cms.api.doCollect}?uid=${a.globalData.uid}&brand_id=${e.data.message.id}`, {}, function(res){
                console.log(res)
            }) 
        } else {
             cms.goAuth()
        }
        
    },

    removeFav: function() {

        var e = this;
        if(a.globalData.campusUserInfo.isAuth){
            e.setData({
                isAdded: 0
            }) 
            let data = cms.storage.get("favList").favList;
                data.splice(cms.storage.get("favList").favList.indexOf(e.data.message.id), 1)

            cms.storage.set("favList", {favList: data});

            cms.ajax("delete", `${cms.api.doCollect}?uid=${a.globalData.uid}&brand_id=${e.data.message.id}`, {}, function(res){
                console.log(res)
            })
        } else {
             cms.goAuth()
        }
        
    },

    copy: function(a) {
        var e = this;
        e.data.auth ?
        wx.setClipboardData({
            data: e.data.message.user.wechat,
            success: function(a) {
                e.setData({
                    copyTip: !0
                }), wx.showToast({
                    title: "成功",
                    icon: "success",
                    duration: 2e3,
                    success: function(a) {
                        a.confirm ? console.log("确定") : a.cancel && console.log("取消");
                    }
                });
            }
        }) : cms.goAuth()
    },

    deleteMessage: function() {
        var e = this;
        wx.showModal({
            title: "提示",
            content: "确定要删除此条信息吗？",
            success: function(t) {
                t.confirm && (wx.showLoading({
                    title: "努力删除中"
                }),

                cms.ajax("delete", e.data.type == "publish" ? 
                 `${cms.api.delete}?brand_id=${e.data.message.id}` : 
                 `${cms.api.doCollect}?brand_id=${e.data.message.id}&uid=${a.globalData.campusUserInfo.uid}`,
                    {},
                  function(res){
                        wx.hideLoading();
                        cms.toast("删除成功");
                        var pages = getCurrentPages();
                        //var Page = pages[pages.length - 1];//当前页
                        var prevPage = pages[pages.length - 2];  //上一个页面
                        var info = prevPage.data //取上页data里的数据也可以修改
                        if(e.data.type == "publish"){
                            info.fabuMessage.splice(e.data.index, 1)
                            prevPage.setData({fabuMessage: info.fabuMessage})//设置数据
                        } else {
                            info.collectMessage.splice(e.data.index, 1)
                            prevPage.setData({collectMessage: info.collectMessage})//设置数据
                        }

                        setTimeout(function(){
                            cms.back()  
                        }, 300)
                    })
                )
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        var a = this;
        return console.log("share" + a.data.message.messageid), {
            title: "西交二手交易信息",
            path: "pages/index/index?shareid=" + a.data.message.messageid,
            success: function(a) {
                wx.showToast({
                    title: "分享成功",
                    duration: 1e3,
                    icon: "success"
                });
            }
        };
    },

    previewImage: function(a) {
        var e = this, t = a.target.dataset.num, o = e.data.message.image;
        wx.previewImage({
            current: o[t],
            urls: o
        });
    },

    bindCommentInput: function(a) {
        this.setData({
            commentInput: a.detail.value
        });
    },


    addCommentToServer: function(){
        let self = this,
            data = {
                brandId: self.data.message.id,
                uid: a.globalData.uid,
                content: self.data.commentInput
            };
            console.log(data);
        cms.ajax("post", cms.api.comment, data, function(res){
            console.log(res)
            cms.toast("评论成功")
            self.data.message.comments.push(res)
            self.data.message.comments = cms.ArrayFriendlyDate(self.data.message.comments, ['createdTime'])
            // data.user = a.globalData.campusUserInfo
            // self.data.message.comments.push(data)
            setTimeout(function(){
                self.setData({
                    commentInput: "",
                    message: self.data.message
                }) 
            },300)
           
        }, function(res){
            cms.toast("评论失败: "+res)
        })
    },


    sendComment: function(e) {
        let self = this;
        if(a.globalData.campusUserInfo.isAuth){
            self.addCommentToServer();
        } else {
           wx.showModal({
              title: '提示',
              content: '请先进行学生认证',
              success (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                  cms.go_url({
                    url: "/pages/login/login",
                    type: "navigateTo"
                  })
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
        }
    },
    focusReply: function(e) {
        var t = this, o = e.currentTarget.dataset.hi;
        console.log(o);
        for (var n = 0; n < t.data.comments.length; n++) if (t.data.comments[n].commentid == o && t.data.comments[n].openid != a.globalData.openid) {
            t.setData({
                comment: t.data.comments[n],
                placeholderText: "回复@" + t.data.comments[n].name,
                isReply: !0,
                focusLabel: !0
            });
            break;
        }
    },
    torefabu: function() {
        wx.navigateTo({
            url: "../refabu/refabu"
        });
    }
});