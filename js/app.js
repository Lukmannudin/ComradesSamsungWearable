(function() {
    window.addEventListener('tizenhwkey', function(ev) {
        if (ev.keyName === 'back') {
            var page = document.getElementsByClassName('ui-page-active')[0],
                pageid = page ? page.id : '';

            if (pageid === 'main') {
                try {
                    tizen.application.getCurrentApplication().exit();
                } catch (ignore) {}
            } else {
                window.history.back();
            }
        }
    });
}());

(function() {
    var page = document.getElementById('sectionChangerPage'),
        sectionChanger = document.getElementById('sectionChanger');

    page.addEventListener('pagebeforeshow', function() {
        tau.widget.SectionChanger(sectionChanger, {
            orientation: 'horizontal',
            fillContent: false
        });
    });
})();
var addArticleButton = document.getElementById('add-article-image');

function eventGetPage() {
    console.log("terklik");
    var element = document.getElementById("sectionChangerPage");
    element.classList.remove("ui-page-active");

    var element2 = document.getElementById("eventPage");
    element2.classList.add("ui-page-active");
}

addArticleButton.addEventListener('click', eventGetPage);




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
            'imagePath': 'images/image2.jpg',
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
    	bodyCom  = document.getElementById("bodyCom");
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
                    //element.src = data.event[0].imagePath;
                    console.log('Kanan');
                } else {
                    index = maxDataEvent - 1;
                    //						element.innerHTML = data.event[index].title;
                }
            } else if (direction === 'CCW') {
                if (index > minDataEvent) {
                    index = index - 1;
                    //						element.innerHTML = data.event[index].title;
                    console.log('kiri');
                } else {
                    index = minDataEvent;
                    //                		element.innerHTML = data.event[index].title;
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