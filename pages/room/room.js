// pages/room/room.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg:'',
    chatlists:[
      {img:'../img/a2.jpg',nickname:'二妹',msg:'好兄弟，你好',tap:'ai'}
    ]
   
  },
  bindKeyInput:function (e) {
    this.setData({msg:e.detail.value
    });
    
  },
  sendMsg:function () {

    let msg = this.data.msg;
    let data = {img:app.globalData.userInfo.avatarUrl,nickname:app.globalData.userInfo.nickName,msg:msg,tap:'speaker'};
    let chatlist = this.data.chatlists;
    chatlist.push(data);
    this.setData({chatlists:chatlist,
                  msg:''
    });
    var _this = this;
 
     //需要对内容进行AI分析 
    wx.request({
      url: 'http://127.0.0.1:7001/chat', //仅为示例，并非真实的接口地址
      data: {
        msg:msg
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method:'GET',//请求的方法,方法值要大写
      success:function (res) {
        console.log(res)
        //再组装一个聊天内容加到chatlists中
        let data = {img:'../img/a2.jpg',nickname:'二妹',msg:res.data.Reply,tap:'ai'};
        let chatlist = _this.data.chatlists;
        chatlist.push(data);
        _this.setData({
          chatlists:chatlist        
        },
        function(){
          _this.bottom();
        }
        
        )     
      }
//聊天消息始终显示最底端

  ,

 fail:function(err){//请求成功的回调函数
        console.log(err)
        }
    })
  }
,
//聊天消息始终显示最底端
bottom: function () {
  wx.pageScrollTo({
  scrollTop: 1000000000
  })
},


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
console.log(app.globalData);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})