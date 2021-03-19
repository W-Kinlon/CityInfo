var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;
var startlat;
var startlng;
let city = '';
let cityID = '';
 
Page({
 data: {
   city:'',
 perimeter:[]
 },

//获取用户输入的城市名字
cityName:function(res){
  console.log(res.detail.value);
  city=res.detail.value;
},

 Sea:function(res){
  let _this = this 
  wx.request({
    url: "https://geoapi.heweather.net/v2/city/lookup?location="+city+"&range=cn&key=52e16023309f4f189f46f7a3369436a2",
    success:function(res){
      console.log(res)
      console.log(res.data.location[0].lat)
      console.log(res.data.location[0].lon)
      cityID=res.data.location[0].id;
      var latitude = res.data.location[0].lat;
      var longitude = res.data.location[0].lon;
      _this.setData({
        markers:[{
        id:0,
        latitude:latitude,
        longitude:longitude,
        iconPath:'../img/iconPath.jpg',
        width:20,
        height:20
        }],
        poi:{
        latitude:latitude,
        longitude:longitude
        },
        startlat:latitude,
        startlng:longitude
       });
    }
  })
},

 onLoad: function (options) {
 var address = options.address;

 // 实例化API核心类
 qqmapsdk = new QQMapWX({
  key: 'N7LBZ-NMRLP-SZ5D7-LONGE-AXWK5-WMFQ4'
 });
 this.addressGeocoder(address);
 },

 search:function(e){
 var _this = this;
 var a = e.target.dataset.type;
 _this.nearby_search(a);
 },


 //周边地点搜索
 nearby_search:function(keyword){
 var _this = this;
 qqmapsdk.search({
  keyword:keyword,
  location:_this.data.poi,
  success:function(res){
  var obj = JSON.stringify(res);
  console.log("obj="+obj);
  var mks = [];
  for(var i = 0; i <res.data.length; i++){
   mks.push({
   title:res.data[i].location.lat,
   id:res.data[i].id,
   latitude:res.data[i].location.lat,
   longitude:res.data[i].location.lng,
   iconPath:"../img/iconPath.jpg",
   width:20,
   height:20,
   callout:{
    content: res.data[i].title,
    color:'#000',
    display:'ALWAYS'
   }
   })
  }
  _this.setData({
   //markers:mks
   markers:mks,
   perimeter:res.data
  })
  },
 });
 },

 onShow: function () {

 }
})