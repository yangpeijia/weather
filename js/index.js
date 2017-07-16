// jsonp('https://api.map.baidu.com/api?v=2.0&ak=AuLp6Pu1tGgzSFRHdgtBY4VMhmmaQrfT&s=1&callback=getCity');

// 查询当天天气（默认佛山）
jsonp(createUrl()[0])
  // 查询当天天气生活指数（默认佛山）
jsonp(createUrl()[1])
  // 查询未来几天天气指数（默认佛山）
jsonp(createUrl()[2])

window.onload = function() {
  //文本框输入事件监听
  var inputText = document.getElementById("text");
  var placeHolder = inputText.placeholder
  inputText.onfocus = function() {
    this.placeholder = ""
  }
  inputText.onblur = function() {
      this.placeholder = placeHolder
    }
    // 监听查询天气按钮
  var btn = document.getElementById("btn")
  btn.onclick = function() {
      var queryText = inputText.value;
      //字符串为空弹出警告框
      if (queryText === "") {
        alert(placeHolder)
      } else { //否则查询城市天气
        // 查询当天天气
        jsonp(createUrl(queryText)[0])
          // 查询当天天气生活指数
        jsonp(createUrl(queryText)[1])
          // 查询未来几天天气指数
        jsonp(createUrl(queryText)[2])
      }
    }
    //监听键盘事件
  inputText.onkeydown = function(e) {
    if (e.keyCode == 13) {
      var queryText = inputText.value;
      //字符串为空弹出警告框
      if (queryText === "") {
        alert(placeHolder)
      } else { //否则查询城市天气
        // 查询当天天气
        jsonp(createUrl(queryText)[0])
          // 查询当天天气生活指数
        jsonp(createUrl(queryText)[1])
          // 查询未来几天天气指数
        jsonp(createUrl(queryText)[2])
      }
    }
  }
}

function jsonp(url) {
  var script = document.createElement('script');
  script.src = url
  document.body.insertBefore(script, document.body.firstChild)
  document.body.removeChild(script)
}

// function getCity() {
//   function city(result) {
//     // 去掉城市名后的“市”
//     var city = result.name.substring(0, result.name.length - 1);
//     //请求当前城市的天气数据
//     jsonp(createUrl(city)[0]);
//     jsonp(createUrl(city)[1]);
//   }
//   var cityName = new.Bmap.LocalCity();
//   cityName.get(city)
// }

function createUrl(cityName = "佛山") {
  var urls = []
  urls[0] = "http://api.k780.com/?app=weather.today&weaid=" + encodeURI(cityName) + "&appkey=26822&sign=c8395b7c31418e84aa5e8f4d207c749e&format=json&jsoncallback=getTodayWeather"
  urls[1] = "http://api.k780.com/?app=weather.lifeindex&weaid=" + encodeURI(cityName) + "&appkey=26822&sign=c8395b7c31418e84aa5e8f4d207c749e&format=json&jsoncallback=getTodayLifeIndex"
  urls[2] = "http://api.k780.com/?app=weather.future&weaid=" + encodeURI(cityName) + "&appkey=26822&sign=c8395b7c31418e84aa5e8f4d207c749e&format=json&jsoncallback=getFutureWeather"
  return urls
}
var infos = document.getElementsByClassName("info");
var firstImg = document.getElementById("nowImg")

function getTodayWeather(res) {
  // console.log(res)
  if (res.success != '1') {
    alert(res.msgid + ' ' + res.msg)
    return
  } else {
    var data = res.result
    infos[0].innerHTML = data.citynm
    infos[1].innerHTML = data.days
    infos[2].innerHTML = data.week
    infos[3].innerHTML = data.weather
    infos[4].innerHTML = data.temperature
    infos[5].innerHTML = data.temperature_curr
    infos[6].innerHTML = data.wind + " " + data.winp
  }
  changeImg(data.weatid, firstImg)
}

function getTodayLifeIndex(res) {
  // console.log(res)
  // if (res.success != '1') {
  //   alert(res.msgid + ' ' + res.msg)
  //   return
  // } else {
  var date = new Date()
  var dateCur = date.getFullYear() + '-' + padLeftZero(date.getMonth() + 1 + '') + '-' + padLeftZero(date.getDate() + '')
  var data = res.result[dateCur]
  infos[7].innerHTML = data.lifeindex_uv_attr
  infos[8].innerHTML = data.lifeindex_xc_attr
  infos[9].innerHTML = data.lifeindex_kq_attr
  infos[10].innerHTML = data.lifeindex_ct_dese

}


var futureBoxes = document.getElementsByClassName("future-box")
var b_Len = futureBoxes.length
var futureImgs = document.getElementsByClassName("future-img")

function getFutureWeather(res) {
  // console.log(res)
  // if (res.success != '1') {
  //   alert(res.msgid + ' ' + res.msg)
  //   return
  // } else {
  var data = res.result
  for (var i = 0; i < b_Len; i++) {
    var futureInfos = futureBoxes[i].getElementsByClassName("future-info")
    futureInfos[0].innerHTML = res.result[i + 1].days
    futureInfos[1].innerHTML = res.result[i + 1].week
    futureInfos[2].innerHTML = res.result[i + 1].weather
    futureInfos[3].innerHTML = res.result[i + 1].temperature
    changeImg(res.result[i + 1].weatid, futureImgs[i])
  }
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length)

}
// 根据id选择图片
function changeImg(id, index) {
  switch (id) {
    case '1':
      index.src = 'images/weather_icon/1.png';
      break;
    case '2':
      index.src = 'images/weather_icon/2.png';
      break;
    case '3':
      index.src = 'images/weather_icon/3.png';
      break;
    case '4':
    case '5':
    case '6':
    case '8':
    case '9':
    case '10':
    case '11':
    case '12':
    case '13':
    case '20':
    case '22':
    case '23':
    case '24':
    case '25':
    case '26':
      index.src = 'images/weather_icon/4.png';
      break;
    case '7':
      index.src = 'images/weather_icon/6.png';
      break;
    case '14':
    case '15':
    case '16':
    case '17':
    case '18':
    case '27':
    case '28':
    case '29':
      index.src = 'images/weather_icon/5.png';
      break;
    case '19':
    case '21':
    case '30':
    case '31':
    case '32':
    case '33':
      index.src = 'images/weather_icon/7.png';
      break;
    default:
      index.src = 'images/weather_icon/8.png';
  }
}