var t = require("../../utils/util.js"), e = getApp();

Page({
    data: {
        searchLetter: [],
        showLetter: "",
        winHeight: 0,
        cityList: [],
        isShowLetter: !1,
        scrollTop: 0,
        scrollTopId: "",
        city: "定位中",
        currentCityCode: "",
        hotcityList: [ {
            cityCode: 11e4,
            city: "北京市"
        }, {
            cityCode: 31e4,
            city: "上海市"
        }, {
            cityCode: 440100,
            city: "广州市"
        }, {
            cityCode: 440300,
            city: "深圳市"
        }, {
            cityCode: 330100,
            city: "杭州市"
        }, {
            cityCode: 320100,
            city: "南京市"
        }, {
            cityCode: 420100,
            city: "武汉市"
        }, {
            cityCode: 12e4,
            city: "天津市"
        }, {
            cityCode: 610100,
            city: "西安市"
        } ],
        commonCityList: [ {
            cityCode: 11e4,
            city: "北京市"
        }, {
            cityCode: 31e4,
            city: "上海市"
        } ],
        countyList: [ {
            cityCode: 11e4,
            county: "A区"
        }, {
            cityCode: 31e4,
            county: "B区"
        }, {
            cityCode: 440100,
            county: "C区"
        }, {
            cityCode: 440300,
            county: "D区"
        }, {
            cityCode: 330100,
            county: "E县"
        }, {
            cityCode: 320100,
            county: "F县"
        }, {
            cityCode: 420100,
            county: "G县"
        } ],
        inputName: "",
        completeList: [],
        county: "",
        condition: !1
    },
    bindCity: function(t) {
        this.setData({
            condition: !0,
            city: t.currentTarget.dataset.city,
            currentCityCode: t.currentTarget.dataset.code,
            scrollTop: 0,
            completeList: []
        }), this.selectCounty(), e.globalData.defaultCity = this.data.city, e.globalData.defaultCounty = "";
    },
    bindCounty: function(t) {
        this.setData({
            county: t.currentTarget.dataset.city
        }), e.globalData.defaultCounty = this.data.county, wx.switchTab({
            url: "../index/index"
        });
    },
    onLoad: function(e) {
        var i = t.searchLetter, c = t.cityList(), o = wx.getSystemInfoSync().windowHeight, a = o / i.length, n = [];
        i.map(function(t, e) {
            var i = {};
            i.name = t, i.tHeight = e * a, i.bHeight = (e + 1) * a, n.push(i);
        }), this.setData({
            winHeight: o,
            itemH: a,
            searchLetter: n,
            cityList: c
        }), this.getLocation();
    },
    getLocation: function() {
        this.setData({
            county: ""
        });
        var t = this;
        wx.getLocation({
            type: "wgs84",
            success: function(i) {
                var c = i.latitude, o = i.longitude;
                wx.request({
                    url: "https://apis.map.qq.com/ws/geocoder/v1/?location=" + c + "," + o + "&key=" + e.globalData.tencentMapKey,
                    success: function(e) {
                        t.setData({
                            city: e.data.result.ad_info.city,
                            currentCityCode: e.data.result.ad_info.adcode,
                            county: e.data.result.ad_info.district
                        });
                    }
                });
            }
        });
    },
    selectCounty: function() {
        var t = this.data.currentCityCode, i = this;
        wx.request({
            url: "https://apis.map.qq.com/ws/district/v1/getchildren?&id=" + t + "&key=" + e.globalData.tencentMapKey,
            success: function(t) {
                i.setData({
                    countyList: t.data.result[0]
                });
            },
            fail: function() {
                console.log("请求区县失败，请重试");
            }
        });
    },
    reGetLocation: function() {
        e.globalData.defaultCity = this.data.city, e.globalData.defaultCounty = this.data.county, 
        wx.switchTab({
            url: "../index/index"
        });
    },
    hotCity: function() {
        this.setData({
            scrollTop: 0
        });
    },
    bindBlur: function(t) {
        this.setData({
            inputName: ""
        });
    },
    bindKeyInput: function(t) {
        this.setData({
            inputName: t.detail.value
        }), this.auto();
    },
    auto: function() {
        var e = this.data.inputName.trim().toLowerCase(), i = e.length, c = t.cityObjs, o = [], a = c.filter(function(t) {
            var c = t.short.slice(0, i).toLowerCase();
            return c && c == e;
        }), n = c.filter(function(t) {
            if (t.shorter) {
                var c = t.shorter.slice(0, i).toLowerCase();
                return c && c == e;
            }
        }), s = c.filter(function(t) {
            var c = t.city.slice(0, i);
            return c && c == e;
        });
        if (a[0]) a.map(function(t) {
            var e = {};
            e.city = t.city, e.code = t.code, o.push(e);
        }), this.setData({
            completeList: o
        }); else if (n[0]) n.map(function(t) {
            var e = {};
            e.city = t.city, e.code = t.code, o.push(e);
        }), this.setData({
            completeList: o
        }); else {
            if (!s[0]) return;
            s.map(function(t) {
                var e = {};
                e.city = t.city, e.code = t.code, o.push(e);
            }), this.setData({
                completeList: o
            });
        }
    },
    onShareAppMessage: function() {
        return {
            title: "很赞的全国城市切换器~",
            desc: "分享个小程序，希望你喜欢☺️~",
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