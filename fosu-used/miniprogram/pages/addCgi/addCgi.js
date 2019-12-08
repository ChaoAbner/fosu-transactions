var e = require("../../vendor/wafer2-client-sdk/index"), t = require("../../config"), s = require("../../utils/util.js");

Page({
    data: {
        requestResult: "",
        canIUseClipboard: wx.canIUse("setClipboardData")
    },
    testCgi: function() {
        s.showBusy("请求中...");
        var o = this;
        e.request({
            url: t.service.host + "/weapp/demo",
            login: !1,
            success: function(e) {
                s.showSuccess("请求成功完成"), o.setData({
                    requestResult: JSON.stringify(e.data)
                });
            },
            fail: function(e) {
                s.showModel("请求失败", e), console.log("request fail", e);
            }
        });
    },
    copyCode: function(e) {
        var t = e.target.dataset.codeId;
        wx.setClipboardData({
            data: o[t - 1],
            success: function() {
                s.showSuccess("复制成功");
            }
        });
    }
});

var o = [ "router.get('/demo', controllers.demo)", "module.exports = ctx => {\n    ctx.state.data = {\n        msg: 'Hello World'\n    }\n}" ];