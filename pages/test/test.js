// audio.js
Page({
  onReady: function (e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
  },
  data: {
   
    name: '你的姑娘',
    author: '隔壁老樊',
    src:"http://m10.music.126.net/20200716202930/bab0a0bb30a60b5d3ce793d063bbaf4c/ymusic/515c/055b/0f59/f61ada634321a4312f7283ffae1ad528.mp3",
  },
  audioPlay: function () {
    this.audioCtx.play()
  },
  audioPause: function () {
    this.audioCtx.pause()
  }
})

