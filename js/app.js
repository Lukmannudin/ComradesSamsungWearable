
(function() {
    var page = document.getElementById('mainPage'),
        sectionChanger = document.getElementById('mainPage');

    page.addEventListener('pagebeforeshow', function() {
        tau.widget.SectionChanger(sectionChanger, {
            orientation: 'horizontal',
            fillContent: false
        });
    });
})();

var main = document.getElementById("scroller");
var pages = main.getElementsByClassName("paging");

//var pages = main.getElementsByClassName("ui-page");


function paging(page) {
    var selectedPage = page.getAttribute('data-page-id');
    var currentPage = document.getElementsByClassName("ui-page-active");
    currentPage[0].className = currentPage[0].className.replace(" ui-page-active", "");
    var nowPage;
    switch (selectedPage) {
        case "event":
            var pageBind = document.getElementById("eventPage");
            pageBind.classList.add("ui-page-active");
            break;
        case "news":
            var pageBind = document.getElementById("newsPage");
            pageBind.classList.add("ui-page-active");
            break;
        case "reminder":
            var pageBind = document.getElementById("reminderPage");
            pageBind.classList.add("ui-page-active");
            getReminder();	
            break;
        
    }
}

(function() {
    var data = {
        event: [{
            'title': 'EU Hints It May Stop Speaking English To Spite UK',
            'imagePath': 'images/image1.jpg',
            'body': 'It has now become abundantly clear that the bureaucrats at the EU are doing everything they can to punish the UK for voting to leave the EU.',
            'category': 'NEWS',
            'cp': 'Mises institute',
            'uploadDay': '2016/06/28',
            'uploadTime': '1005'
        }, {
            'title': 'Hundreds arrested in protests over shootings by police',
            'imagePath': 'images/image2.png',
            'body': 'After another night of intense, and sometimes violent, protests against the police shootings of black men, hundreds of demonstrators were either in jail or waiting to get out Sunday.',
            'category': 'NEWS',
            'cp': 'CNN',
            'uploadDay': '2016/06/28',
            'uploadTime': '1010'
        }, {
            'title': 'Dallas mother thanks police for shielding her and her son',
            'imagePath': 'images/image3.jpg',
            'body': 'When the bullet struck her leg during the protest in downtown Dallas, Shetamia Taylor\'s first thoughts were for her four sons.',
            'category': 'NEWS',
            'cp': 'Returns',
            'uploadDay': '2016/06/28',
            'uploadTime': '1015'
        }, {
            'title': 'U.S. transfers Yemeni from Guantanamo to Italy, 78 left',
            'imagePath': 'images/image4.jpg',
            'body': 'The United States said on Sunday it has transferred a Yemeni inmate from the Guantanamo Bay prison to Italy, bringing the number of detainees at the U.S. naval base in Cuba to 78.',
            'category': 'NEWS',
            'cp': 'Returns',
            'uploadDay': '2016/06/28',
            'uploadTime': '1020'
        }, ]
    };

    var maxDataEvent = data.event.length,
        minDataEvent = 0,
        index = 0;

    var imageCom = document.getElementById("imageCom"),
        titleCom = document.getElementById("titleCom"),
        bodyCom = document.getElementById("bodyCom");

    imageCom.src = data.event[0].imagePath;
    titleCom.innerHTML = data.event[0].title;
    bodyCom.innerHTML = data.event[0].body;

    var direction,
        rotaryDetentHandler = function(e) {
            /* Get rotary direction */
            direction = e.detail.direction;

            if (direction === 'CW') {
                if (index < maxDataEvent) {
                    index = index + 1;
                } else {
                    index = maxDataEvent - 1;
                }
            } else if (direction === 'CCW') {
                if (index > minDataEvent) {
                    index = index - 1;
                } else {
                    index = minDataEvent;
                }
            }
            imageCom.src = data.event[index].imagePath;
            titleCom.innerHTML = data.event[index].title;
            bodyCom.innerHTML = data.event[index].body;
        };

    document.addEventListener('pagebeforeshow', function() {
        resultDiv = document.getElementById('result');

        /* Add rotarydetent handler to document */
        document.addEventListener('rotarydetent', rotaryDetentHandler);
    });

    document.addEventListener('pagehide', function() {
        document.removeEventListener('rotarydetent', rotaryDetentHandler);
    });
}());


function getReminder(){
	var dataReminder;
	  var xhttp = new XMLHttpRequest();
	  xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	      var data = this.responseText;
	      var jsonResponse = JSON.parse(data);
	      dataReminder =  jsonResponse.result;
	      createMainPageReminder(dataReminder);
	    }
	  };
	  
	  xhttp.open("GET", "http://comrades-api.azurewebsites.net/v2/reminder/user/21", true);
	  xhttp.send();
	
}


function createMainPageReminder(data) {
		var createAlarmUI = document.getElementById('ui-listview');
		var dataList = '';
		var dataObat = data;
		
		for(var i=0;i < data.length;i++){
			var merek = data[i].obat.merek;
			console.log(data[i]);
			dataList += "<li class='li-has-multiline li-has-toggle menu-obat' data-id='"+i+"' style='margin-top:30px !important;text-align:center !important;'"+
			    "<label style='height: 10px !important;text-align:center !important;'>" +
				    "<div class='alarm-list' style='width:360px !important;text-align:center !important;'>"+
				        "<div class='time-container' style='text-align:center !important;width:290px !important;'>"+
				        	"<center><span style='font-size:50px;' >"+merek+"</span></center>" +
				        "</div>" +
				    "</div>"+
				"</label>"+
			"</li>";
			
		}
		
		createAlarmUI.innerHTML = dataList;
		
		
//		var menu_obat =document.getElementById('menu-obat');
	
	
//		function dataReminder()
		
//		menu_obat.addEventListener('click', function(){
//			var dataId = document.getElementById('')
//			console.log(this);
//			var sekarang = moment().format(dataObat[i].jam_mulai+' hh:mm:ss');
//			var add2 = moment(sekarang).add(dataObat[i].waktu_reminder, 'hours').format('YYYY-MM-DD hh:mm:ss');;
//			var add3 = moment(add2).add(2, 'hours').format('YYYY-MM-DD hh:mm:ss');;
//			console.log(dataObat[i].jam_mulai);
//			console.log(sekarang);
//			console.log(add2);
//			console.log(add3);
//			var dataList = '';		
//			dataList = 
//			"<li class='li-has-multiline li-has-toggle'>"+
//            "<label>"+
//                "<div class='alarm-list'>"+
//                    "<div class='time-container'>"+
//                     "   <span class='time'>7:45</span>"+
//                      "  <span class='ampm'>AM</span>"+
//                   " </div>"+
//                   " <div class='li-text-sub ui-li-sub-text date-container'>"+
//                   "     <span class='normal'>Wed, 6 May</span>"+
//                   " </div>"+
//                "</div>"+
//               " <div class='ui-toggleswitch'>"+
//               "     <input type='checkbox' class='ui-switch-input'>"+
//               "     <div class='ui-switch-button'></div>"+
//               " </div>"+
//            "</label>"+
//        "</li>";
//			createAlarmUI.innerHTML = dataList;
//		});
		
		
}



(function() {
    /**
     * Event handler for tizenhwkey
     * Terminates the 'alarm' application when the tizenhwkey event triggered and triggered key was a back key.
     * @param {Object} event - tizenhwkey event object
     */
    function keyEventHandler(event) {
        if (event.keyName === "back") {
            var page = document.getElementsByClassName('ui-page-active')[0],
                pageid;
            var menuObat = document.getElementById('menu-obat');
            
            pageid = page ? page.id : "";
            if (pageid === "main-page") {
                try {
                    tizen.application.getCurrentApplication().exit();
                } catch (ignore) {}
            }else if(menuObat == null){
            	getReminder();
            } else {
            	page.className = page.className.replace(" ui-page-active", "");
                var mainPage = document.getElementById('mainPage');
                mainPage.classList.add("ui-page-active");
            }
        }
    }

    /**
     * Click event handler for 'add-alarm-button'
     * Change as 'alarm-set-page' when the 'add-alarm-button' is clicked.
     */
    function clickAddAlarmButtonHandler() {
        tau.changePage("#alarm-set-page");
    }

    /**
     * Click event handler for 'repeat' button in alarm-set-page
     * State for alarm on / off is toggled when 'repeat' button is clicked.
     * @param {Object} event - click event object
     */
    function toggleRepeatButtonHandler(event) {
        if (event.target.getAttribute("data-status") === "0") {
            event.target.setAttribute("data-status", "1");
            event.target.style.backgroundColor = "rgba(18,180,255,100)";
            event.target.style.backgroundImage = "none";
        } else {
            event.target.setAttribute("data-status", "0");
            event.target.style.backgroundColor = "transparent";
            event.target.style.backgroundImage = "url('./image/alarm_repeat_bg.png')";
        }
    }

    /**
     * Initiate function for binding event listener
     * If you execute 'alarm' application, this function will be called at first.
     */
    function init() {
        var addAlarmButton = document.querySelector("#add-alarm-button"),
            i,
            repeatToggle;

        window.addEventListener("tizenhwkey", keyEventHandler);


        // Bind event for toggling repeat button in 'alarm-set-page'
        // There are 7 toggle buttons for Monday, Tuesday, Wednesday,Thursday, Friday, and Saturday.
        for (i = 1; i <= 7; i++) {
            repeatToggle = document.querySelector("#repeat" + i);
        }
    }

    // When page will be loaded, call 'init' function
    window.onload = init();
}());





