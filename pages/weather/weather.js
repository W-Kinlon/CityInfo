// pages/weather/weather.js
let city = '成都'; //城市名
let cityID = '101270101'; //城市ID

Page({
data:{
  city:'',
  date:'',
  time:'',
  temp:'',
  text:'',
  txt:'',
  category:'',
  catetext:'',
  car:'',
  cartext:''

},
//获取用户输入的城市名字
cityName:function(res){
  console.log(res.detail.value);
  city=res.detail.value;

},
search:function(res){
  let _this = this 
   //获取城市ID
  wx.request({
    url: "https://geoapi.heweather.net/v2/city/lookup?location="+city+"&range=cn&key=52e16023309f4f189f46f7a3369436a2",
    success:function(res){
      console.log(res.data.location[0].id)
      cityID=res.data.location[0].id;
      //获取天气信息
      wx.request({
        url: "https://devapi.heweather.net/v7/weather/now?location="+cityID+"&key=52e16023309f4f189f46f7a3369436a2",
        success(res){
          console.log(res)
          _this.setData({
            city:city,
            temp:res.data.now.temp,
            text:res.data.now.text,
            obsTime:res.data.now.obsTime
          })
        }
      })
      wx.request({
        url: "https://devapi.heweather.net/v7/indices/1d?location="+cityID+"&key=52e16023309f4f189f46f7a3369436a2&type=1,15",
        success(res){
          console.log(res)
         _this.setData({
           date:res.data.daily[0].date,
           category:res.data.daily[0].category,
           catetext:res.data.daily[0].text,
           car:res.data.daily[1].category,
           cartext:res.data.daily[1].text
         })
        }
      })


    }
  })
},

//页面第一次加载的时候完成 显示成都的天气
onReady: function () {
  let _this = this 
  wx.request({
    url: "https://geoapi.heweather.net/v2/city/lookup?location="+city+"&range=cn&key=52e16023309f4f189f46f7a3369436a2",
    success:function(res){
      console.log(res.data.location[0].id)
      cityID=res.data.location[0].id;
      wx.request({
        url: "https://devapi.heweather.net/v7/weather/now?location="+cityID+"&key=52e16023309f4f189f46f7a3369436a2",
        success(res){
          console.log(res)
          _this.setData({
            city:city,
            temp:res.data.now.temp,
            text:res.data.now.text,
            obsTime:res.data.now.obsTime
          })
        }
      })
      wx.request({
        url: "https://devapi.heweather.net/v7/indices/1d?location="+cityID+"&key=52e16023309f4f189f46f7a3369436a2&type=1,15",
        success(res){
          console.log(res)
         _this.setData({
           date:res.data.daily[0].date,
           category:res.data.daily[0].category,
           catetext:res.data.daily[0].text,
           car:res.data.daily[1].category,
           cartext:res.data.daily[1].text
         })
        }
      })


    }
  })
},



})