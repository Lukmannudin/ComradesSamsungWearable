
(function() {
	initializeAlarm();
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


function paging(page) {
    var selectedPage = page.getAttribute('data-page-id');
    var currentPage = document.getElementsByClassName("ui-page-active");
    currentPage[0].className = currentPage[0].className.replace(" ui-page-active", "");
var pageBind;
    switch (selectedPage) {
        case "event":
            pageBind = document.getElementById("eventPage");
            pageBind.classList.add("ui-page-active");
            break;
        case "news":
            pageBind = document.getElementById("newsPage");
            pageBind.classList.add("ui-page-active");
            break;
        case "reminder":
            pageBind = document.getElementById("reminderPage");
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



function alarmDetail(index){
	console.log(dataReminder[index]);
	
	if (dataReminder[index].waktu_reminder === "8") {
		three_alarm_perday(index);
	} else {
		alert('Belum Dibuat cuk');
	}
	

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
            
            pageid = page ? page.id : "";
            if (pageid === "main-page") {
                try {
                    tizen.application.getCurrentApplication().exit();
                } catch (ignore) {}
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





