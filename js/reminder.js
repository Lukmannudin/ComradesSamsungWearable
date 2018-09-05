
tizen.alarm.removeAll();

var reminderURL = "http://comrades-api.azurewebsites.net/v2/reminder/user/21";
console.log("Reminder called");

function initializeAlarm() {
	var xhttp = new XMLHttpRequest();
	  xhttp.open("GET", reminderURL, true);
	  xhttp.send(null);
	  xhttp.onreadystatechange = function() {
	    if (this.readyState === 4 && this.status === 200) {
	      var dataReminder =  JSON.parse(xhttp.responseText);
	      for (var int = 0; int < dataReminder.result.length; int++) {
	    	  createAlarmReminder(dataReminder.result[int]);
	      }
	    }
	  }
}


function createAlarmReminder(data){
	var dataReminder = data;
	var alarmTimes = AlarmGenerate(dataReminder);
	
	for (var i = 0; i < alarmTimes.length; i++) {
		var time = '';
		var alarm = '';
		 time = new Date(alarmTimes[i]);
		 alarm = new tizen.AlarmAbsolute(time,1 * tizen.alarm.PERIOD_DAY);
		tizen.alarm.add(alarm, 'tizen.internet');
	}
		
}

function AlarmGenerate(data) {
	function getToday() {
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();
	
		if(dd<10) {
		    dd = '0'+dd
		} 
	
		if(mm<10) {
		    mm = '0'+mm
		} 
	
		today = yyyy + '-' + mm + '-' + dd;
		return today;
	}
	
	if (data.waktu_reminder == 8) {
		var now = getToday() +" "+data.jam_mulai;
		var add2 = moment(now).add(data.waktu_reminder, 'hours').format('YYYY-MM-DD HH:mm:ss');
		var add3 = moment(add2).add(data.waktu_reminder, 'hours').format('YYYY-MM-DD HH:mm:ss');
		return times = [now,add2,add3];
	} else if(data.waktu_reminder == 12) {
		var now = getToday() +" "+data.jam_mulai;
		var add2 = moment(now).add(data.waktu_reminder, 'hours').format('YYYY-MM-DD HH:mm:ss');
		return times = [now,add2];
	} else {
		return times = [];
	}

}


function getReminder(){
	  var xhttp = new XMLHttpRequest();
	  xhttp.open("GET", reminderURL, true);
	  xhttp.send(null);
	  xhttp.onreadystatechange = function() {
	    if (this.readyState === 4 && this.status === 200) {
	      var dataReminder =  JSON.parse(xhttp.responseText);
	      createMainPageReminder(dataReminder.result);
	    }
	  }
}



//
function createMainPageReminder(data) {
	var createAlarmUI = document.getElementById('ui-listview');
	var dataList = '';
	for (var i = 0; i < data.length; i++) {
		
		var dataAlarmDetails = '';
		var alarmTimes = AlarmGenerate(data[i]);
		for (var j = 0; j < alarmTimes.length; j++) {
			var times = new Date(alarmTimes[j]);
			var minutes = times.getMinutes();
			minutes = minutes > 9 ? minutes : '0'+ minutes;
			var hourDataAlarm = times.getHours() + ':'+minutes;
			dataAlarmDetails += 
				"  <span style='color:#dedede;'>"+ hourDataAlarm +"</span>  ";
		}
		
		dataList += "<li class='li-has-multiline li-has-toggle' data-id='"+i+"' style='margin-top:30px !important;text-align:center !important;' onclick='alarmDetail("+i+")'>"+
					    "<label class='menu-obat' style='height: 10px !important;text-align:center !important;'>" +
					    "<div class='alarm-list' style='width:300px !important;text-align:center !important;'>"+
					        "<div class='time-container' style='text-align:center !important;width:290px !important;'>"+
					        	"<center><span style='font-size:50px;' >"+data[i].obat.merek+"</span></center>" +
					        "</div>" +
					        " <div class='li-text-sub ui-li-sub-text date-container'>"+
					        dataAlarmDetails +
					        " </div>"+
					    "</div>"+
					"</label>"+
					"</li>";
		console.log(dataList);
	}
	
	createAlarmUI.innerHTML = dataList;
	
}

function getAllAlarm(){
	var alarms = tizen.alarm.getAll();	
	return alarms;
}
//
//function three_alarm_perday(index){
//	
////	createAlarmUI.innerHTML = '';
////	var alarmExist = false;
////	
////	for (var i = 0; i <localStorage.length; i++) {
////		if (localStorage.key(i) == dataReminder[index].id_reminder) {
////			alarmExist = true;
////			break;
////		}
////	}
////	
////	if (alarmExist === false) {
////		var now = getToday() +" "+dataReminder[index].jam_mulai;
////		var add2 = moment(now).add(dataReminder[index].waktu_reminder, 'hours').format('YYYY-MM-DD hh:mm:ss');
////		var add3 = moment(add2).add(dataReminder[index].waktu_reminder, 'hours').format('YYYY-MM-DD hh:mm:ss');
////		
////		var time1 = new Date(now);
////		var time2 = new Date(add2);
////		var time3 = new Date(add3);
////		var alarm1 = new tizen.AlarmAbsolute(time1,1 * tizen.alarm.PERIOD_DAY);
////		var alarm2 = new tizen.AlarmAbsolute(time2,1 * tizen.alarm.PERIOD_DAY);
////		var alarm3 = new tizen.AlarmAbsolute(time3,1 * tizen.alarm.PERIOD_DAY);
////		tizen.alarm.add(alarm1, 'tizen.internet');
////		tizen.alarm.add(alarm2, 'tizen.internet');
////		tizen.alarm.add(alarm3, 'tizen.internet');
////	} 
////	
////	var dataAllAlarm = getAllAlarm();
////	
////	var minutes = time1.getMinutes();
////	minutes = minutes > 9 ? minutes : '0'+ minutes;
////	//reinitialize data
////	var dataAlarmDetails = '';
////	
////	var hourDataAlarm;
////	for (var int = 0; int < dataAllAlarm.length; int++) {
////		hourDataAlarm = dataAllAlarm[int].date.getHours() + ':'+minutes;
////		dataAlarmDetails += 
////			"<span>"+hourDataAlarm+"</span>";
////	}
////	
////	return dataAlarmDetails;
////	createAlarmUI.innerHTML = dataAlarmDetails;
//	return dataReminder[index];
////}

