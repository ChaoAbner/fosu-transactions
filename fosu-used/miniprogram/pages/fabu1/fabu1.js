function t(t, e) {
    e.setData({
        showTopTips: !0,
        errorMsg: t
    });
}

function e(t) {
    t.setData({
        showTopTips: !1,
        errorMsg: ""
    });
}

var a = getApp();
var cms = a.globalData.cms
Page({
    data: {
        auth: 1,
        messageid: "",
        nickName: "",
        avatarUrl: "",
        openid: "",
        token: "",
        class: 0,
        taskImages: [],         // 图片临时连接
        tempFilePath: "",
        bool: !0,
        tag: 0,
        isAgree: 1,
        publish_type: 0,        // 0为收费，1为免费
        imgUrls: [],            // 图片真实链接
        campusUserInfo: {},
        array: [ 
                "请选择类型",
                "手机",
                "数码电子",
                "出行",
                "家电",
                "书籍",
                "美妆",
                "鞋类箱包",
                "男装女装",
                "钟表首饰",
                "其它"
            ],
        index: 0,
        hidden: !1
    },
    onShow(){
        this.setData({
            campusUserInfo: a.globalData.campusUserInfo,
        })
    },
    onLoad: function(e) {
        console.log(e)
        this.setData({
            openid: a.globalData.openid,
            auth: a.globalData.auth,
            campusUserInfo: a.globalData.campusUserInfo,
            publish_type: parseInt(e.type)
        });

        if(!this.data.campusUserInfo.isAuth){
            cms.goAuth()
        }
    },

    bindPickerChange: function(t) {
        console.log("picker发送选择改变，携带值为", t.detail.value), this.setData({
            index: t.detail.value
        }), this.setData({
            tag: t.detail.value
        });
    },

    formSubmit: function(s) {
        if(!this.data.campusUserInfo.isAuth && !cms.isDefine(a.globalData.userInfo)) {cms.goAuth(); return;}
        var i = this, 
        n = s.detail.value, 
        o = i.data.tag, 
        u = i.data.nickName, 
        r = i.data.avatarUrl, 
        c = i.data.openid, 
        l = i.data.token;
        

        if ("" == n.title) return t("请输入标题", i), setTimeout(function() {
            e(i);
        }, 2e3), !1;
        if (0 === i.data.taskImages.length && i.data.taskImages.length < 1) return t("请添加图片", i), 
        setTimeout(function() {
            e(i);
        }, 2e3), !1;
        if ("" == n.detail) return t("请填写详细描述", i), setTimeout(function() {
            e(i);
        }, 2e3), !1;
        if (0 == n.xueyuan) return t("请选择类型", i), setTimeout(function() {
            e(i);
        }, 2e3), !1;
        if ("" == n.contact) return t("请填写联系人", i), setTimeout(function() {
            e(i);
        }, 2e3), !1;
        if ("" == n.price) return t("请填写期望价格", i), setTimeout(function() {
            e(i);
        }, 2e3), !1;
        if ("" == n.wechat) return t("请填写微信号码", i), setTimeout(function() {
            e(i);
        }, 2e3), !1;
        if (!/^[0-9a-zA-Z-_]+$/.test(n.wechat)) return t("微信号码错误", i), setTimeout(function() {
            e(i);
        }, 2e3), !1;
        if ("" == n.phone) ; else if (!/^1[34578]\d{9}$/.test(n.phone)) return t("手机号码错误", i), 
        setTimeout(function() {
            e(i);
        }, 2e3), !1;
        if (!n.isAgree[0]) return t("请阅读并同意条款", i), setTimeout(function() {
            e(i);
        }, 2e3), !1;

        // 上传代码
        // 获取图片urls
        cms.progress.show('发布中')
        cms.getImgUrl(i.data.taskImages, function(res){
            console.log(res)
            let data = {
                title: n.title,
                categoryId: cms.constant.category[i.data.array[i.data.index]],
                description: n.detail,
                contactName: n.contact,
                uid: a.globalData.uid,
                price: i.data.publish_type ? 0 : n.price,
                // wechat: n.wechat,
                // phone: n.phone,
                image: res,
                viewing: 0
            }
            console.log(data)
            // 上传商品消息至服务器
            cms.ajax('post', cms.api.addCharge, data, function(res){
                console.log(res)
                cms.progress.hide()
                cms.toast('发布成功' ,'success')
                a.globalData.userPublishData.unshift(res)
                
                setTimeout(function() {
                    cms.go_url({
                        url: '/pages/my/my',
                        type: 'switchTab'
                    })
                }, 2e3);
            })

            a.globalData.campusUserInfo.wechat = n.wechat;
            a.globalData.campusUserInfo.phone = n.phone;
            a.globalData.campusUserInfo.contactName = n.contact
            cms.storage.set("userInfo", a.globalData.campusUserInfo)
            cms.updateUserinfoToServer();

        })
        
    },

    getSetting: function() {
        var t = this;
        wx.getSetting({
            success: function(e) {
                e.authSetting["scope.record"] && (t.data.bool ? (wx.startRecord({
                    success: function(e) {
                        var a = e.tempFilePath;
                        t.setData({
                            tempFilePath: a
                        });
                    }
                }), t.setData({
                    bool: !1
                })) : (wx.stopRecord(), t.setData({
                    bool: !0
                })));
            }
        });
    },
    addAttach: function(t) {
        var e = this;
        wx.chooseImage({
            sizeType: [ "compressed" ],
            success: function(t) {
                for (var a = e.data.taskImages, s = 0; s < t.tempFilePaths.length; s++) a.push(t.tempFilePaths[s]);
                e.setData({
                    taskImages: a
                });
            }
        });
    },
    clearImage: function(t) {
        var e = this, a = t.target.dataset.num, s = e.data.taskImages, i = s;
        i.splice(a, 1), s = i, e.setData({
            taskImages: s
        });
    },
    previewImage: function(t) {
        var e = this, a = (t.target.dataset, t.target.dataset.num), s = e.data.taskImages;
        wx.previewImage({
            current: s[a],
            urls: s
        });
    },
    bindAgreeChange: function(t) {
        this.setData({
            isAgree: !!t.detail.value.length
        });
    },
    onShareAppMessage: function() {
        return {
            title: "校园二手物品交易信息",
            desc: "分享个小程序，希望你喜欢☺️~",
            path: "pages/index/index",
            success: function(t) {
                wx.showToast({
                    title: "分享成功",
                    duration: 1e3,
                    icon: "success"
                });
            }
        };
    }
});