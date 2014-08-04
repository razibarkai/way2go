(function(window){
function  Main(){
  
}
var state="stop";
var userName="";
var password="";
var routeNo="";
var str="";
var latitude="";
var longitude="";
var drivers;
var url;
var currentDriver;
var watchID;
var no;
var oldLatitude=0;
var oldLongitude=0;
Main.prototype.init=function(){
    jQuery( $("#firstpage" ).on("pagecreate",function(event){readDrivers()}))  ; 
    $("#confirm").click(function(){
    if(state=="stop"){
    userName=$("#username").val();
    password=$("#password").val();
    if(checkValidation(userName,password)==true){
    localStorage.userName=userName;
    localStorage.password=password;
    state="transferPosition";
    $("#footer #message").text(currentDriver.drivername);
    $("#footer #confirm").text("Stop");
    getLocation();
    }
    else{
    localStorage.clear();
    $("#footer #message").text("Missing Data");
    }
    }else{
    state="stop";
    $("#footer #confirm").text("Login");
    $("#footer #message").text("Stop recieve");
    navigator.geolocation.clearWatch(watchID);
   clearTimeout(no);
    }
    })
}
function getLocation(){
      clearTimeout(no);
      $("#footer #message").text("before");
      if(navigator.geolocation){
      $("#footer #message").text("after1");
       navigator.geolocation.clearWatch(watchID);
      watchID=navigator.geolocation.watchPosition(showLocation, errorHandler);
      }
      else{
      alert("Sorry, browser does not support geolocation!");
      }
}
function showLocation(position) {
      navigator.geolocation.clearWatch(watchID);
      latitude=position.coords.latitude;
      longitude=position.coords.longitude;
      $("#footer #message").text("Latitude "+latitude+" Longitude "+longitude);
      setLocation();
}
function errorHandler(err) {
  if(err.code == 1) {
    alert("Error: Access is denied!");
  }else if( err.code == 2) {
    alert("Error: Position is unavailable!");
  }
}
function setLocation(){
  var data;
  if(setDistance(oldLatitude,oldLongitude,latitude,longitude)> Number(0.005*Number(currentDriver.minimumdistance))){
    oldLatitude=latitude;
    oldLongitude=longitude;
    data={user:userName,latitude:latitude,longitude:longitude,date:getMySQLDateTime(new Date())};
      $.ajax({
      type: 'POST',
      data:data,
      url:"http://www.deorbest.com/mobile/phps/creates/location.php",
      success: function(result){
      $("#footer #message").text("succ "+result);
       clearTimeout(no);
      no = setTimeout(getLocation,Number(60000*Number(currentDriver.duration)));
      console.log("succ "+result);
      }, error: function(result){
      console.log("er "+result);
      }
      })
  }else{
    clearTimeout(no);
      no = setTimeout(getLocation,Number(60000*Number(currentDriver.duration)));
  }
}
function getMySQLDateTime(date) {
    var year, month, day, hours, minutes, seconds;
    year = String(date.getFullYear());
    month = String(date.getMonth() + 1);
    if (month.length == 1) {
    month = "0" + month;
    }
    day = String(date.getDate());
    if (day.length == 1) {
    day = "0" + day;
    }
    hours = String(date.getHours());
    if (hours.length == 1) {
    hours = "0" + hours;
    }
    minutes = String(date.getMinutes());
    if (minutes.length == 1) {
    minutes = "0" + minutes;
    }
    seconds = String(date.getSeconds());
    if (seconds.length == 1) {
    seconds = "0" + seconds;
    }
    return year + "-" + month + "-" + day + ' ' + hours + ':' + minutes + ':' + seconds;
}
function readDrivers(){
    if(localStorage.userName&&localStorage.password){
    $("#username").val(String(localStorage.userName));
    $("#password").val(String(localStorage.password));
    }
    url="http://www.deorbest.com/mobile/phps/reads/drivers.php";
    $.post(url,{local:true}, 
    function (value)
    {
    ReadDrivers.start(value);
    })
    }
    Main.prototype.finishReadDrivers=function(value){
    drivers=value;
    }
    function checkValidation(user,password){
    var i,length=drivers.length,b=false;
    for(i=0;i<length;i++){
    if(String(drivers[i].user)==user&&String(drivers[i].password)==password){
    b=true;
    currentDriver=drivers[i];
    break;
    }
    }
    return b;
}
 function setDistance(oldLatitude,oldLongitude,newLatitude,newLongitude){
      return Math.abs(Math.sqrt(Math.pow(Math.abs( oldLatitude-newLatitude),2)+Math.pow(Math.abs( oldLongitude-newLongitude),2)));
      
    }
window.Main=Main;
}(window)
)
