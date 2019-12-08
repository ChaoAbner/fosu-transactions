// pages/me/support/support.js
const app = getApp()
Page({

  data: {

  },

  go_reward:function(){
    wx.navigateToMiniProgram({
      appId: 'wx18a2ac992306a5a4',
      path: 'pages/apps/largess/detail?id=SLSmuK3oLXU%3D',
      success: res=>{
        console.log(res)
      }
    })
  }
 
})