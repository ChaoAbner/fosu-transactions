var e = require("./utils"), n = require("./constants"), t = require("./session"), i = function() {
    function e(e, n) {
        Error.call(this, n), this.type = e, this.message = n;
    }
    return e.prototype = new Error(), e.prototype.constructor = e, e;
}(), r = function(e) {
    wx.login({
        success: function(t) {
            wx.getUserInfo({
                success: function(n) {
                    e(null, {
                        code: t.code,
                        encryptedData: n.encryptedData,
                        iv: n.iv,
                        userInfo: n.userInfo
                    });
                },
                fail: function(t) {
                    var r = new i(n.ERR_WX_GET_USER_INFO, "获取微信用户信息失败，请检查网络状态");
                    r.detail = t, e(r, null);
                }
            });
        },
        fail: function(t) {
            var r = new i(n.ERR_WX_LOGIN_FAILED, "微信登录失败，请检查网络状态");
            r.detail = t, e(r, null);
        }
    });
}, s = function() {}, o = {
    method: "GET",
    success: s,
    fail: s,
    loginUrl: null
};

module.exports = {
    LoginError: i,
    login: function(s) {
        if (s = e.extend({}, o, s), o.loginUrl) {
            var c = function() {
                return r(function(e, r) {
                    if (e) s.fail(e); else {
                        var o = r.userInfo, c = r.code, a = r.encryptedData, u = r.iv, l = {};
                        l[n.WX_HEADER_CODE] = c, l[n.WX_HEADER_ENCRYPTED_DATA] = a, l[n.WX_HEADER_IV] = u, 
                        wx.request({
                            url: s.loginUrl,
                            header: l,
                            method: s.method,
                            data: s.data,
                            success: function(e) {
                                var r = e.data;
                                if (r && 0 === r.code && r.data.skey) {
                                    var c = r.data;
                                    if (c.userinfo) t.set(c.skey), s.success(o); else {
                                        var a = "登录失败(" + r.error + ")：" + (r.message || "未知错误"), u = new i(n.ERR_LOGIN_SESSION_NOT_RECEIVED, a);
                                        s.fail(u);
                                    }
                                } else u = new i(n.ERR_LOGIN_SESSION_NOT_RECEIVED, JSON.stringify(r)), s.fail(u);
                            },
                            fail: function(e) {
                                var t = new i(n.ERR_LOGIN_FAILED, "登录失败，可能是网络错误或者服务器发生异常");
                                s.fail(t);
                            }
                        });
                    }
                });
            }, a = t.get();
            a ? wx.checkSession({
                success: function() {
                    s.success(a.userInfo);
                },
                fail: function() {
                    t.clear(), c();
                }
            }) : c();
        } else s.fail(new i(n.ERR_INVALID_PARAMS, "登录错误：缺少登录地址，请通过 setLoginUrl() 方法设置登录地址"));
    },
    setLoginUrl: function(e) {
        o.loginUrl = e;
    }
};