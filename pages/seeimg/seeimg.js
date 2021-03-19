
let token='';
let img='';

Page({
  data:{
    imgUrl:'',
    name:'',
    score:'',
    description:''
  },
get_image:function(){
  let _this = this
  wx.request({
    url: 'https://aip.baidubce.com/oauth/2.0/token',
    data:{
      grant_type:'client_credentials',
      client_id:'EUGjLXp6WRjfqIqBX3wH6XV3',
      client_secret:'sDVYtG9wDIcHskt7wPqISx408ieYt93g'
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
recognition_image:function(res){
 let _this = this
 //加载小转盘
  wx.showLoading({
    title: '识别中',
  })
  
  setTimeout(function () {
    wx.hideLoading()
  }, 550)



  wx.request({
    url: 'https://aip.baidubce.com/rest/2.0/image-classify/v1/car?access_token='+token,
    method:'POST',
    data:{
      image:img,
      baike_num:1
    },
    header:{
      'Content-Type':'application/x-www-form-urlencoded'
    },
    success (res) {
      console.log(res)
    _this.setData({
      name:res.data.result[0].name,
      score:(res.data.result[0].score)*100+'%',
      description:res.data.result[0].baike_info.description
   })
    }
  })
}

})