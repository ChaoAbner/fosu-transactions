var n = require("md5.js")
var qiniuUploader = require('qiniuUploader')

var s = function() {
    // var r = "https://api.myWebsite.com/",
    var r = "https://campus.fosuchao.com/",
    // var r = "http://127.0.0.1:8899/",
        c = {
        constant: {
            appName: "佛大二手交易",
            version: "1.0.0",
            imgUrl: "http://img.zhifoukeji.com/",
            isMain: !0,
            pageNum: 10,
            ImgMaxChooseNum: 3,
            mainAppid: "wxa4cb8e3bc8f30055",
            qiniuDomain: 'http://img.fosuchao.com/',
            qiniuUploadURL: 'https://up-z2.qiniup.com/',
            qiniuRegion: 'SCN',
            platform: wx.getSystemInfoSync().platform,
            statusBarHeight: wx.getSystemInfoSync().statusBarHeight,
            screenHeight: wx.getSystemInfoSync().windowHeight,
            screenWidth: wx.getSystemInfoSync().windowWidth,
            category: {
                "手机": 1,
                "美妆": 2,
                "出行": 3,
                "家电": 4,
                "书籍": 5,
                "数码电子": 6,
                "鞋类箱包": 7,
                "男装女装": 8,
                "钟表首饰": 9,
                "体育器材":10,
                "其它": 11
            },
        },
        api: {
            // 用户
            login: r + "user/login/",
            regist: r + "user/add",
            refreshToken: r + "user/token/refresh",
            config: r + "user/app/config/",
            publish: r + "user/get/publish",
            collect: r + "user/get/collect",
            info: r + "user/get/info",
            update: r + "user/update",
            // 物品
            all: r + "content/findAll",
            search: r + "content/search",
            delete: r + "content/delete",
            doCollect: r + "content/collect",
            free: r + "content/free",
            categoryDetail: r + "content/category/detail",
            notify: r + "notify/all",
            hot: r + "content/hot",
            lastest: r + "content/lastest",
            addCharge: r + "content/add/charge",
            addFree: r + "content/add/free",
            feedback: r + "content/feedback/add/",
            // 评论
            comment: r + "comment"
        },

        // 初始化七牛相关参数
        initQiniu: function(token) {
            var self = this,
                options = {
                    region: self.constant.qiniuRegion, // 华南
                    uptoken: token,
                    domain:  self.constant.qiniuDomain,
                    uploadURL: self.constant.qiniuUploadURL,
                };
          qiniuUploader.init(options); 
        },

        chooseImage: function(callback){
            var self = this
            // 微信 API 选文件
            wx.chooseImage({
                count: self.constant.ImgMaxChooseNum,
                success(e){
                    callback(e.tempFilePaths)
                }
            })
        },

        goAuth: function(){
            let self = this;
            wx.showModal({
              title: '提示',
              content: '请先进行学生认证',
              success (res) {
                if (res.confirm) {
                  self.go_url({
                    url: '/pages/login/login',
                    type: 'navigateTo'
                  })
                } else if (res.cancel) {
                  self.toast("无法使用功能", "none", 500)
                }
              }
            })
        },
        

        updateUserinfoToServer: function(){
            let self = this 
            let userInfo = this.storage.get("userInfo");
            console.log("userInfo")
            console.log(userInfo)
            let data = {
                uid: userInfo.uid,
                id: userInfo.id,
                username: userInfo.username,
                avatar: userInfo.avatar,
                location: userInfo.location,
                isAuth: userInfo.isAuth,
                contactName: userInfo.contactName,
                phone: userInfo.phone,
                wechat: userInfo.wechat
            }
            console.log("data")
            console.log(data)
          this.ajax("put", self.api.update, data, function(res){
            console.log("更新用户")
                console.log(res)
                self.storage.set("userInfo", res)
          })
        },

        registerUserToServer: function(userInfo, callback){
            let self = this
           this.ajax("post", self.api.regist, userInfo, function(res){
            self.storage.set("userInfo", res)
            callback(res)
          }) 
        },

        getImgUrl: function(tempUrls, callback) {
            var self = this, promiseList = [], imgs = []
            this.ajax('get', 'https://www.fosuchao.com/api/qiniu/uptoken',{}, function(e){
                self.initQiniu(e.uptoken);
                tempUrls.forEach((item) =>{
                    // 交给七牛上传
                    promiseList.push(new Promise(function(resolve, reject){
                        qiniuUploader.upload(item, (res) => {
                            resolve(imgs.push(res.imageURL))
                        }, (error) => {
                                console.error('error: ' + JSON.stringify(error));
                        });
                    }))

                })
                Promise.all(promiseList).then(function(result){
                    callback(imgs);
                }).catch((e)=>{
                    console.log(e)
                })
            })
            
        },

        // e为method i为url o为data r为
        ajax: function(e, i, o, r, c, u) {
            var l = this, a = l.constant.appName;
            wx.showNavigationBarLoading(),
            "string" == typeof c && this.progress.show(c), this.isDefine(r) || (r = function() {});
            var d = new Date().getTime(),   // 时间戳
                p = this.getUser().token, 
                g = {
                    "Content-Type": "application/json;charset=utf-8",
                    token: p,
                    timestamp: d,
                },
                m = null, w = {};
            // s.isDefine(o) && ("post" == e.toLowerCase() || "put" == e.toLowerCase() ? w.body = JSON.stringify(o) : "form" == e.toLowerCase() ? (m = o.file, 
            // delete o.file, w = o) : w = o),
                // w.url = i,
                w.token = p,
                w.timestamp = d; 

            var y = this.sortByJson(w);
            var v = "";
            // for (var b in y) v += b + "=" + y[b] + "&";
            // for (var b in y) v += y[b] + "&";
            //n为md5加密方法
            v = n(d + "&secret=@_@Fosuhub@_2019"),
            // console.log(v)
            //添加签名
            g.sign = v,
            // console.log(v)
             "form" == e.toLowerCase() ? wx.uploadFile({
                header: g,
                url: i,
                filePath: m,
                name: "file",
                formData: o,
                success: function(e) {
                    var t = JSON.parse(e.data);
                    200 == e.statusCode ? r(t) : wx.showModal({
                        title: "提示",
                        content: t.errorMsg,
                        showCancel: !1
                    });
                },
                fail: function(e) {
                    console.log("error", e);
                },
                complete: function() {
                    wx.hideNavigationBarLoading(), "string" == typeof c && l.progress.hide();
                }
            }) : wx.request({
                url: i,
                method: e,
                data: o,
                header: g,
                success: function(e) {
                    if (200 == e.statusCode) {
                        var n = e.data, i = {};

                        "403001" == i.code ? l.toast("请先登录") : r(n);    // 返回数据

                    } else wx.showModal({
                        title: "提示",
                        content: e.data.errorMsg,
                        showCancel: !1
                    });
                },
                fail: function(e) {
                    console.log("error", e);
                },
                complete: function() {
                    wx.hideNavigationBarLoading(), "string" == typeof c && l.progress.hide();
                }
            });
        },
        setWatch: function(t) {
            function n(t, i, a, o, r) {
                var s = t[i];
                o && null != s && "object" === (void 0 === s ? "undefined" : e(s)) && Object.keys(s).forEach(function(e) {
                    n(s, e, a, o, r);
                }), Object.defineProperty(t, i, {
                    configurable: !0,
                    enumerable: !0,
                    set: function(e) {
                        a.call(r, e, s), s = e, o && n(t, i, a, o, r);
                    },
                    get: function() {
                        return s;
                    }
                });
            }
            var i = t.data, a = t.watch;
            Object.keys(a).forEach(function(e) {
                for (var o = e.split("."), r = i, s = 0; s < o.length - 1; s++) r = r[o[s]];
                n(r, o[o.length - 1], a[e].handler || a[e], a[e].deep, t);
            });
        },
        open: function(t, n) {
            var i = t.url;
            if (this.isDefine(t.pageParam)) {
                i += "?";
                for (var a in t.pageParam) {
                    var o = t.pageParam[a];
                    "object" == (void 0 === o ? "undefined" : e(o)) && (o = JSON.stringify(o)), i += a + "=" + o + "&";
                }
                i += "1=1";
            }
            wx.navigateTo({
                url: i
            }), this.isDefine(n) && n();
        },
        back: function(e, t) {
            wx.navigateBack({
                delta: "1"
            }), this.isDefine(t) && t();
        },
        go_url: function(data, func){
            var url = data.url;
            if(this.isDefine(data.param)){
                url += "?";
                var p_url = "";
                for(var i in data.param){
                        p_url += `${i}=${data.param[i]}&`
                    }
                url += p_url
            }
            switch(data.type){
                case "redirect":  wx.redirectTo({url: url, success: func}); break;
                case "reLaunch":  wx.reLaunch({url: url, success: func}); break;
                case "switchTab":  wx.switchTab({url: url, success: func}); break;
                case "navigateTo":  wx.navigateTo({url: url, success: func}); break;
                }
        },
           
        login: function() {
            this.open({
                name: "login",
                url: "/pages/my/login",
                pagePath: "my-login"
            });
        },
        getInitConfig: function() {
            var e = this.storage.get("initConfig");
            return this.isDefine(e) ? e : {
                vipDiscount: .6,
                ad: {
                    preference: "tencent",
                    miniprogram: {
                        shareDialogProbability: 0,
                        minTime: 0,
                        maxTime: 0
                    }
                },
            };
        },
        getUser: function() {
            var e = this.storage.get("userInfo");
            return this.isDefine(e) ? e : false
        },
        refreshToken: function(e) {
            var t = this, n = this.getUser();
            this.ajax("GET", this.api.refreshToken + n.token, {}, function(i) {
                "0" == i.code ? (n.token = i.data.token, n.vip = i.data.vip, n.vipEndTime = i.data.vipEndTime, 
                n.newUser = i.data.newUser) : (n.token = "", n.vip = !1, n.vipEndTime = "", n.newUser = !1), 
                t.storage.set("userInfo", n), e && e(n);
            });
        },
        isShowAd: function(e) {
            var t = this.getInitConfig(), n = 0, i = 0;
            if (1 == this.getUser().vip) e(!0); else {
                try {
                    n = t.ad.miniprogram.minTime, i = t.ad.miniprogram.maxTime;
                } catch (e) {}
                setTimeout(function() {
                    e(!0);
                }, this.randomNum(n, i));
            }
        },
        progress: {
            show: function(e, t, n) {
                wx.showLoading({
                    title: null == e ? "" : e || "加载中",
                    mask: 0 != n
                });
            },
            hide: function() {
                wx.hideLoading();
            }
        },
        toast: function(e, n, t ) {
            // setTimeout(function() {
            wx.showToast({
                title: e || "请稍后...",
                icon: n || "none",
                duration: t || 300
            });
            // }, 100);
        },

        storage: {
            set: function(e, t, n) {
                if (c.isDefine(t)) {
                    var i = {
                        data: t
                    };
                    n > 0 && (i = {
                        data: t,
                        startTime: new Date().getTime(),
                        timeStamp: n
                    });
                    try {
                        wx.setStorageSync(e, JSON.stringify(i));
                    } catch (e) {
                        console.log("储存出错了");
                    }
                } else console.log("储存内容不能为空");
            },
            get: function(e) {
                var t = {};
                try {
                    var n = wx.getStorageSync(e);
                    if (c.isDefine(n)) if ((n = JSON.parse(n)).hasOwnProperty("timeStamp")) {
                        var i = n.startTime, a = n.timeStamp;
                        new Date().getTime() - i <= a && (t = n.data);
                    } else t = n.data;
                } catch (e) {
                    console.log("获取数据出错了");
                }
                return t;
            },
            del: function(t) {
                if ("string" == typeof t) try {
                    wx.removeStorageSync(t);
                } catch (e) {
                    console.log("删除数据出错了");
                } else if ("object" == (void 0 === t ? "undefined" : e(t))) for (var n in t) try {
                    wx.removeStorageSync(t[n]);
                } catch (e) {
                    console.log("删除数据出错了");
                } else try {
                    wx.clearStorageSync();
                } catch (e) {
                    console.log("删除数据出错了");
                }
            }
        },

        getFriendlyDate: function(e){
            let time = e;
            if(e.indexOf("T") >= 0){
                time = e.split("T")[0] + " " + e.split("T")[1].split(".")[0]
            }
            return time
        },

        ArrayFriendlyDate: function(list, fields){
            let self = this;
            list.forEach(item =>{
                fields.forEach(field =>{
                    item[field] = self.getFriendlyDate(item[field])
                })
            })
            return list;
        },

        friendlyDate: function(e) {
            e = this.parseDate(e, "ymdhis", "-");
            var t = this.parseDate(new Date(), "ymdhis", "-"), n = this.diffDate(t, e);
            return this.parseDate(e, "y") == this.parseDate(t, "y") ? 0 == n.days ? n.hours < 1 ? parseInt(n.minutes) + "分钟前" : n.hours + "小时前" : 1 == n.days ? "昨天" : n.days + "天前" : this.parseDate(e, "ymd", "-");
        },

        diffDate: function(e, t) {
            var n, i, a, o, r;
            return e = this.parseDate(e, "ymdhis", "/"), t = this.parseDate(t, "ymdhis", "/"), 
            n = new Date(e), i = new Date(t), o = parseInt(Math.abs(n - i) / 1e3 / 60 / 60), 
            a = parseInt(o / 24), r = parseInt(Math.abs(n - i) / 1e3 / 60), {
                days: a,
                hours: o,
                minutes: r
            };
        },

        parseDate: function(e, t, n) {
            e = this.trim(e.toString()), this.isDefine(n) || (n = "");
            var i;
            if (e.indexOf("年") > 0) {
                a = e.replace(/日/g, "");
                i = new Date(Date.parse(a.replace(/年|月/g, "/")));
            } else if (e.indexOf("-") > 0 || e.indexOf("/") > 0) i = new Date(Date.parse(e.replace(/-/g, "/"))); else if (10 == e.length) i = new Date(1e3 * e); else if (13 == e.length) i = new Date(1 * e); else if (8 == e.length || 17 == e.length) {
                var a = e.substring(0, 4) + "/" + e.substring(4, 6) + "/" + e.substring(6, 8) + " " + e.substring(8);
                i = new Date(Date.parse(a));
            } else i = new Date(e);
            var o = i.getFullYear(), r = i.getMonth() + 1, s = i.getDate(), c = i.getHours(), u = i.getMinutes(), l = i.getSeconds();
            return r = r < 10 ? "0" + r : r, s = s < 10 ? "0" + s : s, c = c < 10 ? "0" + c : c, 
            u = u < 10 ? "0" + u : u, l = l < 10 ? "0" + l : l, "y" == t ? o : "m" == t ? r : "d" == t ? s : "md" == t ? "ch" == n ? r + "月" + s + "日" : r + n + s : "ymd" == t ? "ch" == n ? o + "年" + r + "月" + s + "日" : o + n + r + n + s : "ymdhi" == t ? "ch" == n ? o + "年" + r + "月" + s + "日" + c + "时" + u + "分" : o + n + r + n + s + " " + c + ":" + u : "ymdhis" == t ? "ch" == n ? o + "年" + r + "月" + s + "日" + c + "时" + u + "分" + l + "秒" : o + n + r + n + s + " " + c + ":" + u + ":" + l : "h" == t ? "ch" == n ? c + "时" : c : "i" == t ? "ch" == n ? u + "分" : u : "hi" == t ? "ch" == n ? c + "时" + u + "分" : c + ":" + u : "his" == t ? "ch" == n ? c + "时" + u + "分" + l + "秒" : c + ":" + u + ":" + l : "ch" == n ? o + "年" + r + "月" + s + "日 " + c + "时" + u + "分" + l + "秒" : o + n + r + n + s + " " + c + ":" + u + ":" + l;
        },

        escapeHtmlEntities: function(e) {
            var t = {
                "'": "&apos;",
                '"': "&quot;",
                "<": "&lt;",
                ">": "&gt;"
            };
            return e = e.replace(/(['")-><&\\\/\.])/g, function(e) {
                return t[e] || e;
            });
        },

        trim: function(e) {
            var t = (e = e.toString()).length, n = 0, i = t - 1;
            if ("" == e) return e;
            for (;n < t && " " == e.charAt(n); ) n++;
            for (;i > n && " " == e.charAt(i); ) i--;
            return e.substring(n, i + 1);
        },

        trimAll: function(e) {
            return e.replace(/\s+/g, "");
        },

        getJsonLength: function(e) {
            var t = 0;
            for (var n in e) t++;
            return t;
        },

        isDefine: function(e) {
            return "number" == typeof e || null != e && "" != e && "undefined" != e && void 0 != e && "null" != e && "(null)" != e && "NULL" != e && "false" != e && void 0 !== e && "{}" != JSON.stringify(e) && (e += "", 
            "" != (e = e.replace(/\s/g, "")));
        },

        isNullArray: function(e){
            return e.length == 0;
        },

        getUrlParams: function(e) {
            for (var e = this.isDefine(e) ? e : window.location.href, t = {}, n = (e = decodeURI(e)).split("?")[1].split("&"), i = 0; i < n.length; i++) {
                var a = n[i].split("=");
                i == n.length - 1 ? t[a[0]] = a[1].split("#")[0] : t[a[0]] = a[1];
            }
            return t;
        },
        verify: {
            email: function(e) {
                return !!/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.exec(e.trim());
            }
        },
        parseNumberToWan: function(e) {
            return e > 9999 ? e = (e / 1e4).toFixed(1) + "万" : this.isDefine(e) || (e = 0), 
            e;
        },
        randomNum: function(e, t) {
            switch (arguments.length) {
              case 1:
                return e = e >= 0 ? e : 0, parseInt(Math.random() * e + 1, 10);

              case 2:
                return e = e >= 0 ? e : 0, t = t >= 0 ? t : 0, parseInt(Math.random() * (t - e + 1) + e, 10);

              default:
                return 0;
            }
        },
        sortByJson: function(e, t) {
            var n = this, i = {};
            return Object.getOwnPropertyNames(e).sort().forEach(function(t) {
                n.isDefine(e[t]) && (i[t] = e[t]);
            }), i;
        },
        scrollToTop: function(e) {
            wx.pageScrollTo({
                scrollTop: 0,
                duration: e ? 300 : 0
            });
        },
        getElementPosition: function(e, t) {
            var n = wx.createSelectorQuery();
            n.select("#" + e).boundingClientRect(), n.selectViewport().scrollOffset(), n.exec(function(e) {
                t(e);
            });
        },
        strWrap: function(e) {
            if (!this.isDefine(e)) return e;
            try {
                return e.replace(/\r\n/g, "<br/>").replace(/\n/g, "<br/>").replace(/\s/g, " ");
            } catch (t) {
                return e;
            }
        },
        getPageCount: function(e, t) {
            return e <= t ? 1 : e % t ? parseInt(e / t) + 1 : e / t;
        },
        openDetail: function(e) {
            this.isDefine(e.icon) || (e.icon = ""), this.isDefine(e.url) ? this.open({
                name: "web",
                url: "/pages/common/web",
                pagePath: "common-web",
                pageParam: {
                    url: e.url,
                    title: e.title,
                    intro: e.intro
                }
            }) : e.data_type == i.contentType.book ? this.open({
                name: "book",
                url: "/pages/book/book",
                pagePath: "book-book",
                pageParam: {
                    book: e
                }
            }) : e.data_type == i.contentType.bookChapter ? this.open({
                name: "book-read",
                url: "/pages/book/read",
                pagePath: "book-read",
                pageParam: {
                    uuid: e.uuid,
                    title: e.title
                }
            }) : e.data_type == i.contentType.thesis ? this.open({
                name: "thesis-read",
                url: "/pages/thesis/read",
                pagePath: "book-book",
                pageParam: {
                    uuid: e.uuid,
                    title: e.title
                }
            }) : e.data_type == i.contentType.novel ? (e.intro = "", this.open({
                name: "reading_book",
                url: "/pages/reading/book",
                pagePath: "reading-book",
                pageParam: {
                    book: e
                }
            })) : e.data_type == i.contentType.article ? this.open({
                name: "article",
                url: "/pages/article/read",
                pagePath: "article-read",
                pageParam: {
                    uuid: e.uuid,
                    title: e.title
                }
            }) : e.data_type == i.contentType.doc && this.open({
                name: "doc",
                url: "/pages/doc/read",
                pagePath: "doc-read",
                pageParam: {
                    uuid: e.uuid,
                    title: e.title
                }
            });
        },
        
        clipBoard: function(e, t) {
            var n = this;
            wx.setClipboardData({
                data: e,
                success: function(e) {
                    wx.getClipboardData({
                        success: function(e) {
                            e.data ? (wx.showToast({
                                title: "复制成功",
                                icon: "success",
                                duration: 2e3
                            }), n.isDefine(t) && t(!0)) : (wx.showToast({
                                title: "复制失败",
                                icon: "none",
                                duration: 2e3
                            }), n.isDefine(t) && t(!1));
                        }
                    });
                }
            });
        },
        copyMSG: function(e) {
            var t, n, i;
            1 == e ? (t = "复制APP下载地址", n = "部分功能受小程序限制只能在APP中使用。复制APP下载链接，粘贴到微信打开", i = "http://android.myapp.com/myapp/detail.htm?apkName=com.wu7zhi.www") : 2 == e && (t = "复制APPID", 
            n = "1、登录微信公众平台；\n 2、打开小程管理 > 关联小程序；\n 3、输入小程序AppId；\n 4、提交后24小内完成审核。\n（如果24小时后未接到通知，则不能通过审核）。", 
            i = "wxa4cb8e3bc8f30055"), wx.showModal({
                title: t,
                content: n,
                confirmText: "复制",
                success: function(e) {
                    e.confirm && wx.setClipboardData({
                        data: i,
                        success: function(e) {
                            wx.getClipboardData({
                                success: function(e) {
                                    e.data == i ? wx.showToast({
                                        title: "复制成功",
                                        icon: "success",
                                        duration: 2e3
                                    }) : wx.showToast({
                                        title: "复制失败",
                                        icon: "none",
                                        duration: 2e3
                                    });
                                }
                            });
                        }
                    });
                }
            });
        },
        share: function(e) {
            var t, n, i, a = this.getInitConfig(), o = this.getUser();
            try {
                t = e.title ? e.title : a.share.title, n = e.path ? e.path : "/pages/index/index", 
                i = e.imageUrl ? e.imageUrl : "";
            } catch (e) {
                t = a.share.title, n = "/pages/index/index", i = "";
            }
            return s.isDefine(o.token) && (n.indexOf("?") >= 0 ? n += "&uid=" + o.uid : n += "?uid=" + o.uid), 
            {
                title: t,
                path: n,
                imageUrl: i
            };
        },
        init: function(e) {}
    };
    return c;
}();

module.exports = s;