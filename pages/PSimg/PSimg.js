// pages/img/img.js
let token='';
let img=''; //存图片的base64
let sytle='';//图片风格
Page({
  data:{
    imgUrl:'',
    meitu:''
  },
  radioChange:function(e){
    console.log(e.detail.value)
    sytle=e.detail.value;
  },
 /* 
get_access_token:function(){
  wx.request({
    url: 'https://aip.baidubce.com/oauth/2.0/token',
    data:{
      grant_type:'client_credentials',
      client_id:'QjGowAvoN8U6Me8SEarL3voY',
      client_secret:'myw80HrtO8uid49iQaZmHNe6wnACPwnt'
    },
    success (res) {
      console.log(res.data)
      token=res.data.access_token;
    }
  })
},
  */
get_image:function(){
  let _this = this
  wx.request({
    url: 'https://aip.baidubce.com/oauth/2.0/token',
    data:{
      grant_type:'client_credentials',
      client_id:'QjGowAvoN8U6Me8SEarL3voY',
      client_secret:'myw80HrtO8uid49iQaZmHNe6wnACPwnt'
    },
    success (res) {
      console.log(res.data)
      token=res.data.access_token;
    }
  })
  wx.chooseImage({
    count: 1,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success (res) {
      // tempFilePath可以作为img标签的src属性显示图片
      const tempFilePaths = res.tempFilePaths
      //console.log("图片地址："+tempFilePaths);
      _this.setData({
        imgUrl:tempFilePaths
      })
      wx.getFileSystemManager().readFile({
        filePath:res.tempFilePaths[0],
        encoding:'base64',
        success(res){
          console.log(res.data)
          img=res.data;
        }
      })
    }
  })

},
img_meitu:function(res){
  let _this = this
  //加载图标
  wx.showLoading({
    title: '美化中',
  })
  
  setTimeout(function () {
    wx.hideLoading()
  }, 550)

  wx.request({
    url: 'https://aip.baidubce.com/rest/2.0/image-process/v1/style_trans?access_token='+token,
    method:'POST',
    data:{
      image:img,
      option:sytle
    },
    header:{
      'Content-Type':'application/x-www-form-urlencoded'
    },
    success (res) {
      console.log(res.data.image)
      _this.setData({
       meitu:'data:image/jpg;base64,'+res.data.image
      })
    }
  })
}



})