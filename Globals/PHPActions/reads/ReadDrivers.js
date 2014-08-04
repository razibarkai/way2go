(function(windows){
  function ReadDrivers(){
  }
  ReadDrivers.start=function(value){
   var data = ReadUtils.parseXML(value);
  var items=[];
    $(data).find('classes class').each(function(){
	var id = String($(this).find('id').text());
	var user = String($(this).find('user').text());
	var password = String($(this).find('password').text());
	var drivername = String($(this).find('drivername').text());
	var routeno = String($(this).find('routeno').text());
	var duration = String($(this).find('duration').text());
	var minimumdistance = String($(this).find('minimumdistance').text());
	  obj={
	    id: id,
	    user: user,
	    password: password,
	    drivername: drivername,
	    routeno: routeno,
	    duration: duration,
	    minimumdistance: minimumdistance
	  }
	  items.push(obj);
	      })
	    Main.prototype.finishReadDrivers(items);
}
window.ReadDrivers=ReadDrivers;
}(window)
)

