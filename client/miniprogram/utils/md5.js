var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

!function() {
    function Md5(t) {
        if (t) blocks[0] = blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0, 
        this.blocks = blocks, this.buffer8 = buffer8; else if (ARRAY_BUFFER) {
            var e = new ArrayBuffer(68);
            this.buffer8 = new Uint8Array(e), this.blocks = new Uint32Array(e);
        } else this.blocks = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
        this.h0 = this.h1 = this.h2 = this.h3 = this.start = this.bytes = 0, this.finalized = this.hashed = !1, 
        this.first = !0;
    }
    var ERROR = "input is invalid type", WINDOW = "object" === ("undefined" == typeof window ? "undefined" : _typeof(window)), root = WINDOW ? window : {};
    root.JS_MD5_NO_WINDOW && (WINDOW = !1);
    var WEB_WORKER = !WINDOW && "object" === ("undefined" == typeof self ? "undefined" : _typeof(self)), NODE_JS = !root.JS_MD5_NO_NODE_JS && "object" === ("undefined" == typeof process ? "undefined" : _typeof(process)) && process.versions && process.versions.node;
    NODE_JS ? root = global : WEB_WORKER && (root = self);
    var COMMON_JS = !root.JS_MD5_NO_COMMON_JS && "object" === ("undefined" == typeof module ? "undefined" : _typeof(module)) && module.exports, AMD = "function" == typeof define && define.amd, ARRAY_BUFFER = !root.JS_MD5_NO_ARRAY_BUFFER && "undefined" != typeof ArrayBuffer, HEX_CHARS = "0123456789abcdef".split(""), EXTRA = [ 128, 32768, 8388608, -2147483648 ], SHIFT = [ 0, 8, 16, 24 ], OUTPUT_TYPES = [ "hex", "array", "digest", "buffer", "arrayBuffer", "base64" ], BASE64_ENCODE_CHAR = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""), blocks = [], buffer8;
    if (ARRAY_BUFFER) {
        var buffer = new ArrayBuffer(68);
        buffer8 = new Uint8Array(buffer), blocks = new Uint32Array(buffer);
    }
    !root.JS_MD5_NO_NODE_JS && Array.isArray || (Array.isArray = function(t) {
        return "[object Array]" === Object.prototype.toString.call(t);
    });
    var createOutputMethod = function(t) {
        return function(e) {
            return new Md5(!0).update(e)[t]();
        };
    }, createMethod = function() {
        var t = createOutputMethod("hex");
        NODE_JS && (t = nodeWrap(t)), t.create = function() {
            return new Md5();
        }, t.update = function(e) {
            return t.create().update(e);
        };
        for (var e = 0; e < OUTPUT_TYPES.length; ++e) {
            var r = OUTPUT_TYPES[e];
            t[r] = createOutputMethod(r);
        }
        return t;
    }, nodeWrap = function nodeWrap(method) {
        var crypto = eval("require('crypto')"), Buffer = eval("require('buffer').Buffer"), nodeMethod = function(t) {
            if ("string" == typeof t) return crypto.createHash("md5").update(t, "utf8").digest("hex");
            if (null === t || void 0 === t) throw ERROR;
            return t.constructor === ArrayBuffer && (t = new Uint8Array(t)), Array.isArray(t) || ArrayBuffer.isView(t) || t.constructor === Buffer ? crypto.createHash("md5").update(new Buffer(t)).digest("hex") : method(t);
        };
        return nodeMethod;
    };
    Md5.prototype.update = function(t) {
        if (!this.finalized) {
            var e = "string" != typeof t;
            if (e) {
                if (null === t || void 0 === t) throw ERROR;
                t.constructor === root.ArrayBuffer && (t = new Uint8Array(t));
            }
            var r = t.length;
            if (e && ("number" != typeof r || !Array.isArray(t) && (!ARRAY_BUFFER || !ArrayBuffer.isView(t)))) throw ERROR;
            for (var o, i, s = 0, h = this.blocks, f = this.buffer8; s < r; ) {
                if (this.hashed && (this.hashed = !1, h[0] = h[16], h[16] = h[1] = h[2] = h[3] = h[4] = h[5] = h[6] = h[7] = h[8] = h[9] = h[10] = h[11] = h[12] = h[13] = h[14] = h[15] = 0), 
                e) if (ARRAY_BUFFER) for (i = this.start; s < r && i < 64; ++s) f[i++] = t[s]; else for (i = this.start; s < r && i < 64; ++s) h[i >> 2] |= t[s] << SHIFT[3 & i++]; else if (ARRAY_BUFFER) for (i = this.start; s < r && i < 64; ++s) (o = t.charCodeAt(s)) < 128 ? f[i++] = o : o < 2048 ? (f[i++] = 192 | o >> 6, 
                f[i++] = 128 | 63 & o) : o < 55296 || o >= 57344 ? (f[i++] = 224 | o >> 12, f[i++] = 128 | o >> 6 & 63, 
                f[i++] = 128 | 63 & o) : (o = 65536 + ((1023 & o) << 10 | 1023 & t.charCodeAt(++s)), 
                f[i++] = 240 | o >> 18, f[i++] = 128 | o >> 12 & 63, f[i++] = 128 | o >> 6 & 63, 
                f[i++] = 128 | 63 & o); else for (i = this.start; s < r && i < 64; ++s) (o = t.charCodeAt(s)) < 128 ? h[i >> 2] |= o << SHIFT[3 & i++] : o < 2048 ? (h[i >> 2] |= (192 | o >> 6) << SHIFT[3 & i++], 
                h[i >> 2] |= (128 | 63 & o) << SHIFT[3 & i++]) : o < 55296 || o >= 57344 ? (h[i >> 2] |= (224 | o >> 12) << SHIFT[3 & i++], 
                h[i >> 2] |= (128 | o >> 6 & 63) << SHIFT[3 & i++], h[i >> 2] |= (128 | 63 & o) << SHIFT[3 & i++]) : (o = 65536 + ((1023 & o) << 10 | 1023 & t.charCodeAt(++s)), 
                h[i >> 2] |= (240 | o >> 18) << SHIFT[3 & i++], h[i >> 2] |= (128 | o >> 12 & 63) << SHIFT[3 & i++], 
                h[i >> 2] |= (128 | o >> 6 & 63) << SHIFT[3 & i++], h[i >> 2] |= (128 | 63 & o) << SHIFT[3 & i++]);
                this.lastByteIndex = i, this.bytes += i - this.start, i >= 64 ? (this.start = i - 64, 
                this.hash(), this.hashed = !0) : this.start = i;
            }
            return this;
        }
    }, Md5.prototype.finalize = function() {
        if (!this.finalized) {
            this.finalized = !0;
            var t = this.blocks, e = this.lastByteIndex;
            t[e >> 2] |= EXTRA[3 & e], e >= 56 && (this.hashed || this.hash(), t[0] = t[16], 
            t[16] = t[1] = t[2] = t[3] = t[4] = t[5] = t[6] = t[7] = t[8] = t[9] = t[10] = t[11] = t[12] = t[13] = t[14] = t[15] = 0), 
            t[14] = this.bytes << 3, this.hash();
        }
    }, Md5.prototype.hash = function() {
        var t, e, r, o, i, s, h = this.blocks;
        this.first ? e = ((e = ((t = ((t = h[0] - 680876937) << 7 | t >>> 25) - 271733879 << 0) ^ (r = ((r = (-271733879 ^ (o = ((o = (-1732584194 ^ 2004318071 & t) + h[1] - 117830708) << 12 | o >>> 20) + t << 0) & (-271733879 ^ t)) + h[2] - 1126478375) << 17 | r >>> 15) + o << 0) & (o ^ t)) + h[3] - 1316259209) << 22 | e >>> 10) + r << 0 : (t = this.h0, 
        e = this.h1, r = this.h2, e = ((e += ((t = ((t += ((o = this.h3) ^ e & (r ^ o)) + h[0] - 680876936) << 7 | t >>> 25) + e << 0) ^ (r = ((r += (e ^ (o = ((o += (r ^ t & (e ^ r)) + h[1] - 389564586) << 12 | o >>> 20) + t << 0) & (t ^ e)) + h[2] + 606105819) << 17 | r >>> 15) + o << 0) & (o ^ t)) + h[3] - 1044525330) << 22 | e >>> 10) + r << 0), 
        e = ((e += ((t = ((t += (o ^ e & (r ^ o)) + h[4] - 176418897) << 7 | t >>> 25) + e << 0) ^ (r = ((r += (e ^ (o = ((o += (r ^ t & (e ^ r)) + h[5] + 1200080426) << 12 | o >>> 20) + t << 0) & (t ^ e)) + h[6] - 1473231341) << 17 | r >>> 15) + o << 0) & (o ^ t)) + h[7] - 45705983) << 22 | e >>> 10) + r << 0, 
        e = ((e += ((t = ((t += (o ^ e & (r ^ o)) + h[8] + 1770035416) << 7 | t >>> 25) + e << 0) ^ (r = ((r += (e ^ (o = ((o += (r ^ t & (e ^ r)) + h[9] - 1958414417) << 12 | o >>> 20) + t << 0) & (t ^ e)) + h[10] - 42063) << 17 | r >>> 15) + o << 0) & (o ^ t)) + h[11] - 1990404162) << 22 | e >>> 10) + r << 0, 
        e = ((e += ((t = ((t += (o ^ e & (r ^ o)) + h[12] + 1804603682) << 7 | t >>> 25) + e << 0) ^ (r = ((r += (e ^ (o = ((o += (r ^ t & (e ^ r)) + h[13] - 40341101) << 12 | o >>> 20) + t << 0) & (t ^ e)) + h[14] - 1502002290) << 17 | r >>> 15) + o << 0) & (o ^ t)) + h[15] + 1236535329) << 22 | e >>> 10) + r << 0, 
        e = ((e += ((o = ((o += (e ^ r & ((t = ((t += (r ^ o & (e ^ r)) + h[1] - 165796510) << 5 | t >>> 27) + e << 0) ^ e)) + h[6] - 1069501632) << 9 | o >>> 23) + t << 0) ^ t & ((r = ((r += (t ^ e & (o ^ t)) + h[11] + 643717713) << 14 | r >>> 18) + o << 0) ^ o)) + h[0] - 373897302) << 20 | e >>> 12) + r << 0, 
        e = ((e += ((o = ((o += (e ^ r & ((t = ((t += (r ^ o & (e ^ r)) + h[5] - 701558691) << 5 | t >>> 27) + e << 0) ^ e)) + h[10] + 38016083) << 9 | o >>> 23) + t << 0) ^ t & ((r = ((r += (t ^ e & (o ^ t)) + h[15] - 660478335) << 14 | r >>> 18) + o << 0) ^ o)) + h[4] - 405537848) << 20 | e >>> 12) + r << 0, 
        e = ((e += ((o = ((o += (e ^ r & ((t = ((t += (r ^ o & (e ^ r)) + h[9] + 568446438) << 5 | t >>> 27) + e << 0) ^ e)) + h[14] - 1019803690) << 9 | o >>> 23) + t << 0) ^ t & ((r = ((r += (t ^ e & (o ^ t)) + h[3] - 187363961) << 14 | r >>> 18) + o << 0) ^ o)) + h[8] + 1163531501) << 20 | e >>> 12) + r << 0, 
        e = ((e += ((o = ((o += (e ^ r & ((t = ((t += (r ^ o & (e ^ r)) + h[13] - 1444681467) << 5 | t >>> 27) + e << 0) ^ e)) + h[2] - 51403784) << 9 | o >>> 23) + t << 0) ^ t & ((r = ((r += (t ^ e & (o ^ t)) + h[7] + 1735328473) << 14 | r >>> 18) + o << 0) ^ o)) + h[12] - 1926607734) << 20 | e >>> 12) + r << 0, 
        e = ((e += ((s = (o = ((o += ((i = e ^ r) ^ (t = ((t += (i ^ o) + h[5] - 378558) << 4 | t >>> 28) + e << 0)) + h[8] - 2022574463) << 11 | o >>> 21) + t << 0) ^ t) ^ (r = ((r += (s ^ e) + h[11] + 1839030562) << 16 | r >>> 16) + o << 0)) + h[14] - 35309556) << 23 | e >>> 9) + r << 0, 
        e = ((e += ((s = (o = ((o += ((i = e ^ r) ^ (t = ((t += (i ^ o) + h[1] - 1530992060) << 4 | t >>> 28) + e << 0)) + h[4] + 1272893353) << 11 | o >>> 21) + t << 0) ^ t) ^ (r = ((r += (s ^ e) + h[7] - 155497632) << 16 | r >>> 16) + o << 0)) + h[10] - 1094730640) << 23 | e >>> 9) + r << 0, 
        e = ((e += ((s = (o = ((o += ((i = e ^ r) ^ (t = ((t += (i ^ o) + h[13] + 681279174) << 4 | t >>> 28) + e << 0)) + h[0] - 358537222) << 11 | o >>> 21) + t << 0) ^ t) ^ (r = ((r += (s ^ e) + h[3] - 722521979) << 16 | r >>> 16) + o << 0)) + h[6] + 76029189) << 23 | e >>> 9) + r << 0, 
        e = ((e += ((s = (o = ((o += ((i = e ^ r) ^ (t = ((t += (i ^ o) + h[9] - 640364487) << 4 | t >>> 28) + e << 0)) + h[12] - 421815835) << 11 | o >>> 21) + t << 0) ^ t) ^ (r = ((r += (s ^ e) + h[15] + 530742520) << 16 | r >>> 16) + o << 0)) + h[2] - 995338651) << 23 | e >>> 9) + r << 0, 
        e = ((e += ((o = ((o += (e ^ ((t = ((t += (r ^ (e | ~o)) + h[0] - 198630844) << 6 | t >>> 26) + e << 0) | ~r)) + h[7] + 1126891415) << 10 | o >>> 22) + t << 0) ^ ((r = ((r += (t ^ (o | ~e)) + h[14] - 1416354905) << 15 | r >>> 17) + o << 0) | ~t)) + h[5] - 57434055) << 21 | e >>> 11) + r << 0, 
        e = ((e += ((o = ((o += (e ^ ((t = ((t += (r ^ (e | ~o)) + h[12] + 1700485571) << 6 | t >>> 26) + e << 0) | ~r)) + h[3] - 1894986606) << 10 | o >>> 22) + t << 0) ^ ((r = ((r += (t ^ (o | ~e)) + h[10] - 1051523) << 15 | r >>> 17) + o << 0) | ~t)) + h[1] - 2054922799) << 21 | e >>> 11) + r << 0, 
        e = ((e += ((o = ((o += (e ^ ((t = ((t += (r ^ (e | ~o)) + h[8] + 1873313359) << 6 | t >>> 26) + e << 0) | ~r)) + h[15] - 30611744) << 10 | o >>> 22) + t << 0) ^ ((r = ((r += (t ^ (o | ~e)) + h[6] - 1560198380) << 15 | r >>> 17) + o << 0) | ~t)) + h[13] + 1309151649) << 21 | e >>> 11) + r << 0, 
        e = ((e += ((o = ((o += (e ^ ((t = ((t += (r ^ (e | ~o)) + h[4] - 145523070) << 6 | t >>> 26) + e << 0) | ~r)) + h[11] - 1120210379) << 10 | o >>> 22) + t << 0) ^ ((r = ((r += (t ^ (o | ~e)) + h[2] + 718787259) << 15 | r >>> 17) + o << 0) | ~t)) + h[9] - 343485551) << 21 | e >>> 11) + r << 0, 
        this.first ? (this.h0 = t + 1732584193 << 0, this.h1 = e - 271733879 << 0, this.h2 = r - 1732584194 << 0, 
        this.h3 = o + 271733878 << 0, this.first = !1) : (this.h0 = this.h0 + t << 0, this.h1 = this.h1 + e << 0, 
        this.h2 = this.h2 + r << 0, this.h3 = this.h3 + o << 0);
    }, Md5.prototype.hex = function() {
        this.finalize();
        var t = this.h0, e = this.h1, r = this.h2, o = this.h3;
        return HEX_CHARS[t >> 4 & 15] + HEX_CHARS[15 & t] + HEX_CHARS[t >> 12 & 15] + HEX_CHARS[t >> 8 & 15] + HEX_CHARS[t >> 20 & 15] + HEX_CHARS[t >> 16 & 15] + HEX_CHARS[t >> 28 & 15] + HEX_CHARS[t >> 24 & 15] + HEX_CHARS[e >> 4 & 15] + HEX_CHARS[15 & e] + HEX_CHARS[e >> 12 & 15] + HEX_CHARS[e >> 8 & 15] + HEX_CHARS[e >> 20 & 15] + HEX_CHARS[e >> 16 & 15] + HEX_CHARS[e >> 28 & 15] + HEX_CHARS[e >> 24 & 15] + HEX_CHARS[r >> 4 & 15] + HEX_CHARS[15 & r] + HEX_CHARS[r >> 12 & 15] + HEX_CHARS[r >> 8 & 15] + HEX_CHARS[r >> 20 & 15] + HEX_CHARS[r >> 16 & 15] + HEX_CHARS[r >> 28 & 15] + HEX_CHARS[r >> 24 & 15] + HEX_CHARS[o >> 4 & 15] + HEX_CHARS[15 & o] + HEX_CHARS[o >> 12 & 15] + HEX_CHARS[o >> 8 & 15] + HEX_CHARS[o >> 20 & 15] + HEX_CHARS[o >> 16 & 15] + HEX_CHARS[o >> 28 & 15] + HEX_CHARS[o >> 24 & 15];
    }, Md5.prototype.toString = Md5.prototype.hex, Md5.prototype.digest = function() {
        this.finalize();
        var t = this.h0, e = this.h1, r = this.h2, o = this.h3;
        return [ 255 & t, t >> 8 & 255, t >> 16 & 255, t >> 24 & 255, 255 & e, e >> 8 & 255, e >> 16 & 255, e >> 24 & 255, 255 & r, r >> 8 & 255, r >> 16 & 255, r >> 24 & 255, 255 & o, o >> 8 & 255, o >> 16 & 255, o >> 24 & 255 ];
    }, Md5.prototype.array = Md5.prototype.digest, Md5.prototype.arrayBuffer = function() {
        this.finalize();
        var t = new ArrayBuffer(16), e = new Uint32Array(t);
        return e[0] = this.h0, e[1] = this.h1, e[2] = this.h2, e[3] = this.h3, t;
    }, Md5.prototype.buffer = Md5.prototype.arrayBuffer, Md5.prototype.base64 = function() {
        for (var t, e, r, o = "", i = this.array(), s = 0; s < 15; ) t = i[s++], e = i[s++], 
        r = i[s++], o += BASE64_ENCODE_CHAR[t >>> 2] + BASE64_ENCODE_CHAR[63 & (t << 4 | e >>> 4)] + BASE64_ENCODE_CHAR[63 & (e << 2 | r >>> 6)] + BASE64_ENCODE_CHAR[63 & r];
        return t = i[s], o += BASE64_ENCODE_CHAR[t >>> 2] + BASE64_ENCODE_CHAR[t << 4 & 63] + "==";
    };
    var exports = createMethod();
    COMMON_JS ? module.exports = exports : (root.md5 = exports, AMD && define(function() {
        return exports;
    }));
}();