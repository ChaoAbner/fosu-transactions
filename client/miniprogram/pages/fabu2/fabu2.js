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

Page({
    data: {
        auth: -1,
        messageid: "",
        nickName: "",
        avatarUrl: "",
        openid: "",
        token: "",
        class: 2,
        taskImages: [],
        tempFilePath: "",
        bool: !0,
        isAgree: 1,
        hidden: !1
    },
    onLoad: function() {
        this.setData({
            openid: a.globalData.openid,
            token: a.globalData.token,
            auth: a.globalData.auth,
            nickName: a.globalData.userInfo.nickName,
            avatarUrl: a.globalData.userInfo.avatarUrl
        });
    },
    formSubmit: function(s) {
        var i = this, n = s.detail.value, o = i.data.nickName, r = i.data.avatarUrl, c = i.data.openid, u = i.data.token;
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
        if ("" == n.contact) return t("请填写联系人", i), setTimeout(function() {
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
        wx.request({
            url: a.globalData.urlHeader + "/message/issue",
            data: {
                openid: c,
                token: u,
                class: 2,
                title: n.title,
                detail: n.detail,
                tag: 200,
                contact: n.contact,
                wechat: n.wechat,
                phone: n.phone,
                name: o,
                icon: r
            },
            method: "POST",
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                if (console.log(t.data), 0 === t.data.code) {
                    i.setData({
                        messageid: t.data.data.messageid
                    });
                    for (var e = i.data.taskImages, s = (i.data.imgs, i.data.messageid), n = 0; n < e.length && n < 9; n++) wx.uploadFile({
                        url: a.globalData.urlHeader + "/upload",
                        filePath: e[n],
                        name: "file",
                        formData: {
                            messageid: s,
                            openid: c,
                            token: u,
                            type: "img",
                            no: n
                        },
                        success: function(t) {
                            console.log("img上传结果", t.data);
                        }
                    });
                } else wx.showToast({
                    title: "发布失败",
                    mask: !0,
                    duration: 1e3
                });
            }
        }), wx.showToast({
            title: "发布成功",
            icon: "success",
            duration: 2e3
        }), setTimeout(function() {
            wx.switchTab({
                url: "../my/my"
            });
        }, 2e3);
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