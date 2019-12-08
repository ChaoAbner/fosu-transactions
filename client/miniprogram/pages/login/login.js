var t = getApp();
let cms = t.globalData.cms

Page({
    data: {
        netid: "",
        pwd: "",
        isAuth: 0,
        showBtn: 0,
    },
    bindNetidInput: function(t) {
        this.setData({
            netid: t.detail.value
        });
    },
    bindPwdInput: function(t) {
        this.setData({
            pwd: t.detail.value
        });
    },
    bindGetUserInfo: function(e){
        console.log(e)
        let self = this;
        if(e.detail.errMsg != "getUserInfo:fail auth deny"){
            self.setData({showBtn: 0})
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
        } else{
            cms.toast("授权失败")
        }
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
    auth: function() {
        var n = this;
        if(this.data.showBtn){
            cms.toast("请先授权登录")
            return;
        }
        let studyNum = /^201[5-9]\d{7}$/;
        if(studyNum.test(this.data.netid)){
            this.authUser();
            cms.updateUserinfoToServer();
            cms.toast("认证成功")
            cms.storage.set("studyNum", {studyNum: n.data.netid})
            setTimeout(function(){
                cms.back()
            }, 300)
        } else {
            cms.toast("认证错误")
        }
    },

    authUser: function(){
        t.globalData.campusUserInfo.isAuth = true;
        console.log("campusUserInfo")
        console.log(t.globalData.campusUserInfo)
        cms.storage.set("userInfo", t.globalData.campusUserInfo)
    },


    onLoad: function() {
        this.setData({
            netid: cms.isDefine(cms.storage.get("studyNum")) ? cms.storage.get("studyNum").studyNum : "",
            isAuth: t.globalData.campusUserInfo.isAuth,
            showBtn: cms.isDefine(t.globalData.userInfo) ? 0 : 1
        })
        console.log( t.globalData.campusUserInfo.isAuth)
    },

    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},

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