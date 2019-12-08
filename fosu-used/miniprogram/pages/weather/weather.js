var a = getApp();

Page({
    data: {
        weekday: [ "周日", "周一", "周二", "周三", "周四", "周五", "周六" ],
        showday: [ "今天", "明天", "" ],
        city: "",
        district: "",
        now: "",
        forecast: "",
        quality: ""
    },
    onLoad: function() {
        var a = this, t = new Date();
        a.setData({
            "showday[2]": this.data.weekday[(t.getDay() + 2) % 7]
        });
    },
    onShow: function() {
        var t = this, e = a.globalData.defaultCity.slice(0, 2);
        t.setData({
            city: a.globalData.defaultCity,
            district: a.globalData.defaultCounty
        }), t.getWeather(e);
    },
    getWeather: function(t) {
        this.setData({
            now: a.globalData.weatherData.now,
            forecast: a.globalData.weatherData.daily_forecast,
            quality: a.globalData.air
        });
    },
    bindCity: function(a) {
        wx.reLaunch({
            url: "../switchcity/switchcity"
        });
    }
});