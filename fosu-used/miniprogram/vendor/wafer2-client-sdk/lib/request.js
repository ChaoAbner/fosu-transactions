var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, o = require("./constants"), t = require("./utils"), n = require("./session"), r = require("./login"), u = function() {}, i = function(e) {
    var t = {};
    return e && (t[o.WX_HEADER_SKEY] = e), t;
}, l = function() {
    function e(e, o) {
        Error.call(this, o), this.type = e, this.message = o;
    }
    return e.prototype = new Error(), e.prototype.constructor = e, e;
}();

module.exports = {
    RequestError: l,
    request: function(c) {
        function s() {
            r.login({
                success: f,
                fail: q
            });
        }
        function f() {
            var e = i(n.get());
            wx.request(t.extend({}, c, {
                header: t.extend({}, v, e),
                success: function(e) {
                    var o, t, r = e.data;
                    if (r && -1 === r.code) return n.clear(), E ? (t = "登录态已过期", o = new l(r.error, t), 
                    void q(o)) : (E = !0, void s());
                    b.apply(null, arguments);
                },
                fail: q,
                complete: u
            }));
        }
        if ("object" !== (void 0 === c ? "undefined" : e(c))) {
            var a = "请求传参应为 object 类型，但实际传了 " + (void 0 === c ? "undefined" : e(c)) + " 类型";
            throw new l(o.ERR_INVALID_PARAMS, a);
        }
        var p = c.login, y = c.success || u, d = c.fail || u, m = c.complete || u, v = c.header || {}, b = function() {
            y.apply(null, arguments), m.apply(null, arguments);
        }, q = function(e) {
            d.call(null, e), m.call(null, e);
        }, E = !1;
        p ? s() : f();
    }
};