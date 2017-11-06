//OS 분기처리
var ipadOS = false;
if (navigator.appVersion.indexOf("iPad")!=-1) ipadOS = true;

var AndroidOS = false;
if ( navigator.userAgent.toLowerCase().indexOf("android") != -1 ) AndroidOS = true;

var isPc = (AndroidOS == false && ipadOS ) ? true : false;

var WindowsTenOS = false;
if ( navigator.userAgent.toLowerCase().indexOf("webview") != -1 ) WindowsTenOS = true;

//윈도우10
init_js=function(src_name){
	var scriptUI=document.createElement('script');
	var urlUI = src_name;
	scriptUI.type='text/javascript';
	scriptUI.language='javascript';
	scriptUI.src=urlUI + '?d=' + new Date().getTime();
	//윈도우 10
	if(WindowsTenOS){
		window.external.notify(scriptUI.src);
	}else{
		$("body").append(scriptUI);
	}
}

$(document).ready(function(){

	//학습목표 레이어
	$('.ibtn.study').click(function(){
		$(this).parent().next('.popup-type2').toggle();
	});

	$('.popup-type1-close').click(function(){
		$('.popup-type2').hide();
	});

	// 정답 확인 버튼 클릭시 정답 보이는 레이어
	$(".answer_check").click(function(){
		var index = $(this).index();

		if($(this).hasClass('active')){
			$(this).removeClass('active');
			$(this).children().next().css('display','none');
			$(" :input").each(function(){
				//$(this).val('');
			});
		}else{
			$('.answer_check').each(function(idx){
				//if(index === idx){

				//}else{
					$(this).removeClass('active');
					$(this).children().next().css('display','none');
				//}
			});

			$(this).addClass('active');
			$(this).children().next().css('display','block');
		}
	});


	//용어정리 레이어
	$(".term").each(function(){
		$(this).on("click", function(){
			$this = $(this);
			$(".term_layer").each(function(){
				$(this).remove();
			});
			//layerAclose();
			terms($this);

		});
	});

    function terms($this){
        var termTop = $this.offset().top;
        var termLeft = $this.offset().left;
        var termWidth = $this.width();

        if (parent.ZOOMVALUE == undefined) {
            parent.ZOOMVALUE = 1;
        }
        var zoom = parent.ZOOMVALUE;

        termTop = termTop / zoom;
        termLeft = termLeft / zoom;

        /*화살표의 위치*/
        if (termTop > 400 && termTop < 900){
            posY = "b";
        }else{
            posY = "t";
        }

        if (termLeft > 400){
            posX = "r";
        }else{
            posX = "l";
        }

        posArrow = posY + posX;

        termId = $this.attr("data-term");

        $.ajax({
            type: "GET",
            url: "term_list.xml",
            dataType: "xml",
            success: function(xml) {
                $(xml).find('term_list').each(function(){
                    $("term", $(this)).each(function(){
                        term = $(this).attr("sid");
                        if (termId == term )
                        {
                            tit = $(this).attr("title");
                            des = "<div style='padding-right:9px; line-height:22px;text-align:justify;'>"+$(this).attr("des")+"</div>";
                            asrc = $(this).attr("src");
                            if (asrc != ""){
                                src_str = "<div style='padding:5px'><img id='eee' width='280' /></div>";
                            }else{
                                src_str = "";
                            }

                            $termLayer = $("<div class='term_layer' style='width:300px;display:none;'>" +
                                "<div style='position:absolute;top:0px;left:0px;width:100%;height:30px;background-color:rgb(248, 216, 56);border-radius:3px 3px 0px 0px;'>"+
                                "<div style='position:absolute;top:4px;left:0px;font-size:16px;height:20px;padding:3px 10px; color:#fff;'>"+tit+"</div>"+
                                "<div style='position:absolute;top:-2px;right:5px;'><img class='termclose' src='images/common/close.png'/></div>"+
                                "</div>" +
                                "<span class='" + posArrow +"'></span>" + des +
                                src_str	+
                                "</div>").appendTo("body");

                            $('#eee').attr('src',asrc);

                            setTimeout(function(){
                                termLayerHeight = $termLayer.height();

                                if (posY == 'b'){
                                    termLayerTop = termTop - termLayerHeight - 50-17;
                                }else {
                                    termLayerTop = termTop + 29;
                                }

                                if (posX == 'r'){
                                    termLayerLeft = termLeft + termWidth -345 +37;
                                }else {
                                    termLayerLeft = termLeft - 6 ;
                                }

                                $termLayer.css({
                                    top:termLayerTop,
                                    left:termLayerLeft,
                                    display:'block'
                                });

                                $(".term_layer").each(function(){
                                    $(this).on("click", function(){
                                        $(this).remove();
                                    });
                                });
                            },100);
                        }
                    });
                });
            }
        });
    }

	//별도 팝업(새창 1536 x 1024)
	$('.pop_wrap .pop_close').on('click',function(){
		window.close();
	});

	//레이어 팝업(768 x 1024)
	$('.layer_wrap .layer_close').on('click',function(){
		AllOff();
		$('.layer_wrap').hide();
	});

	//type : study 보충심화, view 실험관찰
	//레이어 OPEN 개별 js에서 함수를 호출 layer_open('study',0);
	layer_open = function(type,tab){
		$('.layer_wrap.'+ type).fadeIn(100);
		//$('.layer_wrap.'+ type).css('visibility','visible');
		$('.layer_wrap.'+ type).find('.tabs > span').removeClass('on').eq(tab).addClass('on');
		$('.layer_wrap.'+ type).find('.layer_body ul.tab_layer> li').hide().eq(tab).css('display','block');
	}
	//레이어 tab 체인지
	$('.tabs > span').on('click',function(){
		var idx = $(this).index();
		var tabObj = $(this).closest('.layer_wrap');
		$(this).parent().find('.tabs > span').removeClass('on').eq(idx).addClass('on');
		tabObj.find('ul.tab_layer> li').hide().eq(idx).css('display','block');

		//tab 체인지시 예시답안 닫기 및 버튼 name
		// if(tabObj.find('.ex_anwser')){
		// 	tabObj.find('.ex_anwser').each(function(){
		// 		$(this).removeClass('active');
		// 	});
		// 	tabObj.find('.answer_check').each(function(){

		// 		if(tabObj.hasClass('s_t') || tabObj.hasClass('m_t') || tabObj.hasClass('s_p') || tabObj.hasClass('dr_f')){
		// 			$(this).html('예시답안');
		// 		}
		// 	});
		// }
	});



	//내용핵심정리
	$('.summarize_wrap .summarize_btn').on('click',function(){
		layerAclose();
		if($(this).hasClass('active')){
			$(this).removeClass('active');
			$('.summarize_pop').hide();
		}else{
			$(this).addClass('active');
			$('.summarize_pop').show();
		}
	});
	//내용핵심정리 본문 클릭 닫기
	$('.summarize_wrap .summarize_pop').on('click',function(){
		$('.summarize_wrap .summarize_btn').removeClass('active');
		$('.summarize_pop').hide();
	});



	//ref 참조사항
	$('.ref .title').on('click',function(){
		//학습목표닫기
		if($('.learning_goal .learning_goal_title')){
			$('.learning_goal .learning_goal_title').removeClass('active').parent().children('.learning_goal_text').hide();
		}
		//용어설명 닫기
		//$(".term_layer").each(function(){
		//	$(this).remove();
		//});

		//ref 여러개 있을 경우 닫기
		var index = $(this).parent().index();//부모 index 값
		$('.ref .title').each(function(){
			var idx = $(this).parent().index();//부모 index 값
			if(idx !== index){
				$(this).removeClass('active');
				$(this).parent().children('.text').hide();
			}
		});

		if($(this).hasClass('active')){
			$(this).removeClass('active');
			$(this).parent().children('.text').hide();
		}else{
			$(this).addClass('active');
			$(this).parent().children('.text').show();
		}

	});
	//ref 참조사항 본문 클릭 닫기
	$('.ref .text').on('click',function(){
		$(this).prev().removeClass('active');
		$(this).hide();
	});

	//학습목표
	$('.learning_goal .learning_goal_title').on('click',function(){
		//ref 참조사항
		if($('.ref .title')){
			$('.ref .title').removeClass('active').parent().children('.text').hide();
		}
		//용어설명 닫기
		//$(".term_layer").each(function(){
		//	$(this).remove();
		//});

		if($(this).hasClass('active')){
			$(this).removeClass('active');
			$(this).parent().children('.learning_goal_text').hide();
		}else{
			$(this).addClass('active');
			$(this).parent().children('.learning_goal_text').show();
		}

	});
	//학습목표 본문 클릭 닫기
	$('.learning_goal .learning_goal_text').on('click',function(){
		$('.learning_goal .learning_goal_img').removeClass('active');
		$('.learning_goal .learning_goal_text').hide();
	});


});

//학습목표, 참조사항, 각종레이어 닫기
//레이어를 공통으로 닫기를 할 경우 이곳에 추가한다.
function layerAclose(){
	if($('.summarize_pop'))$('.summarize_pop').hide();
	if($('.ref .title'))$('.ref .title').removeClass('active').parent().children('.text').hide();
	if($('.learning_goal .learning_goal_img'))$('.learning_goal .learning_goal_img').removeClass('active').parent().children('.learning_goal_text').hide();
	if($('.a_ps'))$('.a_ps').hide();
	if($('.b_ps')){$('.b_ps').hide()};
	if($('.s_p_answer')){$('.s_p_answer').hide();};
	//if($('.ex_answer')){$('.ex_answer').hide().parent().removeClass('active');};
}

//슬라이더 js
var imageSlide = {

	init : function(){
		var slide_content = document.getElementsByClassName('slider_content');
		for(var i=0,j=slide_content.length; i<j; i++){
			var slider_image = slide_content[i].getElementsByClassName('slider_image')[0];
			var image = slider_image.children;
			var thumbnail = slide_content[i].getElementsByClassName('slider_thumbnail')[0];
			var prev_button = slide_content[i].getElementsByClassName('slide_prev_button')[0];
			var next_button = slide_content[i].getElementsByClassName('slide_next_button')[0];
			var thumbnail_list = thumbnail.children;
			slider_image.firstElementChild.classList.add('on')
			for(var m=0,n=thumbnail_list.length; m<n; m++){
				if(m===0) thumbnail_list[m].classList.add('on');
				thumbnail_list[m].addEventListener('mousedown',imageSlide.showImg,false);
				image[m].addEventListener('touchstart', imageSlide.swipe.swiper, false);
				image[m].addEventListener('touchmove', imageSlide.swipe.swiper, false);
				image[m].addEventListener('touchend',imageSlide.swipe.swiper, false);
			}

			prev_button.style.opacity = "0.3";
			prev_button.style.pointerEvents = 'none';
			prev_button.addEventListener('mousedown',function(){
				imageSlide.buttonAction.prevImageShow.call(this.parentNode);
			});
			next_button.addEventListener('mousedown',function(){
				imageSlide.buttonAction.nextImageShow.call(this.parentNode);
			});
		}
	},
	showImg  : function(){
		var content =  this.parentNode.parentNode.parentNode;
		var index = parseInt(this.getAttribute('data-num'));
		var slide = content.getElementsByClassName('slider_image')[0];
		var prevButton = content.getElementsByClassName('slide_prev_button')[0];
		var nextButton = content.getElementsByClassName('slide_next_button')[0];
		this.parentNode.getElementsByClassName('on')[0].classList.remove('on');
		this.classList.add('on');
		slide.getElementsByClassName('on')[0].classList.remove('on');
		slide.children[index-1].classList.add('on');
		if(index===slide.children.length) {
			nextButton.style.opacity = "0.3";
			nextButton.style.pointerEvents = 'none';
			prevButton.style.opacity = "1";
			prevButton.style.pointerEvents = 'auto';
		}else if(index===1){
			prevButton.style.opacity = "0.3";
			prevButton.style.pointerEvents = 'none';
			nextButton.style.opacity = "1";
			nextButton.style.pointerEvents = 'auto';
		}else {
			nextButton.style.opacity = "1";
			nextButton.style.pointerEvents = 'auto';
			prevButton.style.opacity = "1";
			prevButton.style.pointerEvents = 'auto';
		}
	},
	buttonAction : {

		prevImageShow : function(){
			console.log(this)
			var slide = this.getElementsByClassName('slider_image')[0];
			var thumbnail = this.getElementsByClassName('slider_thumbnail')[0];
			var index = parseInt(thumbnail.getElementsByClassName('on')[0].getAttribute('data-num'));
			var prevButton = this.getElementsByClassName('slide_prev_button')[0];
			var nextButton = this.getElementsByClassName('slide_next_button')[0];
			if(index === 1) {
				return false;
			}else{
				slide.getElementsByClassName('on')[0].classList.remove('on');
				slide.children[index-2].classList.add('on');
				thumbnail.getElementsByClassName('on')[0].classList.remove('on');
				thumbnail.children[index-2].classList.add('on');
				if(index === 2) {
					prevButton.style.opacity = "0.3";
					prevButton.style.pointerEvents = 'none';
					nextButton.style.opacity = "1";
					nextButton.style.pointerEvents = 'auto';
				}else{
					nextButton.style.opacity = "1";
					nextButton.style.pointerEvents = 'auto';
					prevButton.style.opacity = "1";
					prevButton.style.pointerEvents = 'auto';
				}
			}
		},
		nextImageShow : function(){
			var slide = this.getElementsByClassName('slider_image')[0];
			var thumbnail = this.getElementsByClassName('slider_thumbnail')[0];
			var index = parseInt(thumbnail.getElementsByClassName('on')[0].getAttribute('data-num'));
			var prevButton = this.getElementsByClassName('slide_prev_button')[0];
			var nextButton = this.getElementsByClassName('slide_next_button')[0];

			if(index === slide.children.length) {
				return false;
			}
			else {
				slide.getElementsByClassName('on')[0].classList.remove('on');
				slide.children[index].classList.add('on');
				thumbnail.getElementsByClassName('on')[0].classList.remove('on');
				thumbnail.children[index].classList.add('on');
				if(index === slide.children.length-1) {
					nextButton.style.opacity = "0.3";
					nextButton.style.pointerEvents = 'none';
					prevButton.style.opacity = "1";
					prevButton.style.pointerEvents = 'auto';
				}else{
					nextButton.style.opacity = "1";
					nextButton.style.pointerEvents = 'auto';
					prevButton.style.opacity = "1";
					prevButton.style.pointerEvents = 'auto';
				}
			}
		}
	},
	swipe : {
		touch : null,
		start_x : null,
		start_y : null,
		end_x : null,
		end_y : null,
		move : false,
		swiper : function(event){
			if (typeof event !== 'undefined') {
				if (typeof event.touches !== 'undefined') {
					imageSlide.swipe.touch = event.touches[0];
					if(event.type === 'touchstart'){
						imageSlide.swipe.start_x = Math.floor(imageSlide.swipe.touch.pageX);
						imageSlide.swipe.start_y = Math.floor(imageSlide.swipe.touch.pageY);
						imageSlide.swipe.move = false;
					}else if(event.type === 'touchmove'){
						imageSlide.swipe.move = true;
						imageSlide.swipe.end_x = Math.floor(imageSlide.swipe.touch.pageX);
						imageSlide.swipe.end_y = Math.floor(imageSlide.swipe.touch.pageY);
					}else if(event.type === 'touchend'){
						if(imageSlide.swipe.move) imageSlide.swipe.start_x - imageSlide.swipe.end_x > 0 ? imageSlide.buttonAction.prevImageShow.call(this.parentNode.parentNode.parentNode.parentNode) : imageSlide.buttonAction.nextImageShow.call(this.parentNode.parentNode.parentNode.parentNode)

					}
				}
			}
		}
	}
}

// 디바이 터치 등록
var GameManager = {
	event: {
		isTouchDevice: 'ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch,
		eventSelector: function (eventType) {
            // console.log('□ this.isTouchDevice :', this.isTouchDevice);
            var selectedEvent;
            switch (eventType) {
            	case 'eventDown':
            	selectedEvent = this.isTouchDevice ? 'touchstart' : 'mousedown';
            	break;
            	case 'eventMove':
            	selectedEvent = this.isTouchDevice ? 'touchmove' : 'mousemove';
            	break;
            	case 'eventUp':
            	selectedEvent = this.isTouchDevice ? 'touchend' : 'mouseup';
            	break;
            	case 'eventOut':
            	selectedEvent = this.isTouchDevice ? 'touchleave' : 'mouseout';
            	break;
            }
            return selectedEvent;
        }
    }
};

// createElement 초기 설정
function QSAll (target) {return document.querySelectorAll(target);}

function createElement (type, targetElement, className, width, height) {
	var createObject = document.createElement(type);

	if (className !== undefined) createObject.className = className;
	if (width !== undefined) 	 createObject.style.width = width + 'px';
	if (height !== undefined) 	 createObject.style.height = height + 'px';

	targetElement.appendChild(createObject);
	return createObject;
}


// 디바이 터치 등록
var GameManager = {
	event: {
		isTouchDevice: 'ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch,
		eventSelector: function (eventType) {
            // console.log('□ this.isTouchDevice :', this.isTouchDevice);
            var selectedEvent;
            switch (eventType) {
            	case 'eventDown':
            	selectedEvent = this.isTouchDevice ? 'touchstart' : 'mousedown';
            	break;
            	case 'eventMove':
            	selectedEvent = this.isTouchDevice ? 'touchmove' : 'mousemove';
            	break;
            	case 'eventUp':
            	selectedEvent = this.isTouchDevice ? 'touchend' : 'mouseup';
            	break;
            	case 'eventOut':
            	selectedEvent = this.isTouchDevice ? 'touchleave' : 'mouseout';
            	break;
            }
            return selectedEvent;
        }
    }
};


function QS (target) { return document.querySelector(target); }
function eventSelector (eventType, e) {
	var eventMaster;

	if (eventType === 'eventDown') {
		switch (GameManager.event.eventSelector('eventDown')) {
			case "mousedown":
			eventMaster = e;
			break;
			case "touchstart":
			e.preventDefault();
			eventMaster = e.touches.item(0);
			break;
		}
	} else if (eventType === 'eventMove') {
		switch (GameManager.event.eventSelector('eventMove')) {
			case "mousemove":
			eventMaster = e;
			break;
			case "touchmove":
			eventMaster = e.touches.item(0);
			break;
		}
	} else if (eventType === 'eventUp') {
		switch (GameManager.event.eventSelector('eventUp')) {
			case "mouseup":
			eventMaster = e;
			break;
			case "touchend":
			eventMaster = e.changedTouches[0];
			break;
		}
	} else if (eventType === 'eventOut') {
		switch (GameManager.event.eventSelector('eventOut')) {
			case "mouseout":
			eventMaster = e;
			break;
			case "touchleave":
			eventMaster = e.touches.item(0);
			break;
		}
	}
	return eventMaster;
}


// 이벤트(설정) 추가 : mousedown, mousemove, mouseup, mouseout
function addEvent (target, eType, fnc) {
	var eventType;
	switch(eType){
		case 'mousedown': eventType = GameManager.event.eventSelector('eventDown'); break;
		case 'mousemove': eventType = GameManager.event.eventSelector('eventMove'); break;
		case 'mouseup':   eventType = GameManager.event.eventSelector('eventUp'); break;
		case 'mouseout':  eventType = GameManager.event.eventSelector('eventOut'); break;
	}
	return target.addEventListener(eventType, fnc, false);
}

// 이벤트(설정) 삭제 : mousedown, mousemove, mouseup, mouseout
function removeEvent (target, eType, fnc) {
	var eventType;
	switch(eType) {
		case 'mousedown': eventType = GameManager.event.eventSelector('eventDown'); break;
		case 'mousemove': eventType = GameManager.event.eventSelector('eventMove'); break;
		case 'mouseup':   eventType = GameManager.event.eventSelector('eventUp'); break;
		case 'mouseout':  eventType = GameManager.event.eventSelector('eventOut'); break;
	}
	return target.removeEventListener(eventType, fnc, false);
}

// 선택 사운드 (mousedown, touchstart)
function soundEvent (target, src) {
	target.addEventListener(GameManager.event.eventSelector('eventDown'), function(){
		efSound(src);
	}, false);
}



function initScale(id) {
	//var wrap = document.getElementById('container');
	var wrap = document.getElementById(id);

	GameManager.event.clientWidth = document.body.clientWidth;
	GameManager.event.clientHeight = document.body.clientHeight;

	GameManager.event.wrapWidth = wrap.clientWidth;
	GameManager.event.wrapHeight = wrap.clientHeight;

	GameManager.event.zoomVertical = (GameManager.event.clientHeight / GameManager.event.wrapHeight) * 1.0;
	GameManager.event.zoomHorizontal = (GameManager.event.clientWidth / GameManager.event.wrapWidth) * 1.0;

	if(parent.ZOOMVALUE == undefined) {
		parent.ZOOMVALUE = 1;
	}
	if (GameManager.event.clientHeight < GameManager.event.clientWidth) {
		GameManager.event.zoomRate = parent.ZOOMVALUE;
	} else {
		GameManager.event.zoomRate = GameManager.event.zoomHorizontal;
	}

    // alert(GameManager.event.zoomRate);
}


/* 웹뷰 Scale 조정치 */
currentScale=function()
{
	if( typeof WebKitCSSMatrix == "undefined" )
		return 1;

	if( window.getComputedStyle(document.body).webkitTransform == "none" )
		return 1;

	var curTransform = new WebKitCSSMatrix(window.getComputedStyle(document.body).webkitTransform);

	return curTransform.d;
}

function AllOff(){
	$("video, audio").each(function(){
		$(this).get(0).pause();
		$(this).parent().find('.play_pause_button').removeClass('pause');
		$(this).parent().find('.play_pause_button').addClass('play');
		$(this).parent().find('.play_pause_button').html('재생');

	});
}

function AllStop(){
	$("video, audio").each(function(){
		$(this).get(0).load();
		$('.video-btn-close').hide();
		$(".btn.btnPlay").show();
		$(this).removeAttr('controls');
	});
}


//문제 클릭시 사운드
function play_sound_click(){
	if( $('audio#player-audio-click').length < 1){
		var audioStr_click='';
		audioStr_click=audioStr_click+'<audio id="player-audio-click">';
		audioStr_click=audioStr_click+'<source src="" />';
		audioStr_click=audioStr_click+'</audio>';
		$('body').append(audioStr_click);
	}
	var audioFix_click=$('audio#player-audio-click')[0];
	var aSrc_click='media/click.mp3';
	audioFix_click.src=aSrc_click;
	audioFix_click.load();
	audioFix_click.play();
}
//정답 사운드
function play_sound_o(){
	if( $('audio#player-audio-o').length < 1){
		var audioStr_click='';
		audioStr_click=audioStr_click+'<audio id="player-audio-o">';
		audioStr_click=audioStr_click+'<source src="" />';
		audioStr_click=audioStr_click+'</audio>';
		$('body').append(audioStr_click);
	}
	var audioFix_click=$('audio#player-audio-o')[0];
	var aSrc_click='media/eff_ok.mp3';
	audioFix_click.src=aSrc_click;
	audioFix_click.load();
	audioFix_click.play();
}
//오답 사운드
function play_sound_x(){
	if( $('audio#player-audio-x').length < 1){
		var audioStr_click='';
		audioStr_click=audioStr_click+'<audio id="player-audio-x">';
		audioStr_click=audioStr_click+'<source src="" />';
		audioStr_click=audioStr_click+'</audio>';
		$('body').append(audioStr_click);
	}
	var audioFix_click=$('audio#player-audio-x')[0];
	var aSrc_click='media/eff_fail.mp3';
	audioFix_click.src=aSrc_click;
	audioFix_click.load();
	audioFix_click.play();
}


//안드로이드 4.0 4.1 체크
function chkAndroid(){
	var uAgent = navigator.userAgent.toLowerCase();
	var mobilePhones = new Array('android 4.0','android 4.1');
	var isAndroid = false;
	for(var i=0;i < mobilePhones.length; i++){
		if(uAgent.indexOf(mobilePhones[i]) > -1)
		{
			isAndroid = true;
			break;
		}
	}
	return isAndroid;
}











/* 동영상 슬라이드 2017-09-21 */
function movieSlider(sidx,movieIdx) {
	var ww = 640;
	var hh = 360;
	var videoUrl;
	var sidx = sidx;
	var currentIdx = "0" + (sidx + 1);
	var movieIdx; //동영상 인덱스

	if ( movieIdx == null || movieIdx == "" ){ movieIdx = 0; };
	videoUrl = videoSlideUrl[sidx][movieIdx] + ".mp4";

	var videoSlide = new videoPlayer({container : "videoSlide_"+ currentIdx , src : videoUrl, width : ww, height : hh});
	//$(".movie_slider_content.s"+ currentIdx +" .videoSrc").load();
	//$(".movie_slider_content.s"+ currentIdx +" .videoSrc").get(0).play();
	videoSlide.video.load();
	videoSlide.play();

	//썸네일 토글
	var thumbnailToggle = function(){
		$(".movie_slider_content.s"+ currentIdx +" .slider_thumbnail_area ul li").removeClass("on");
		$(".movie_slider_content.s"+ currentIdx +" .slider_thumbnail_area ul li:eq("+ movieIdx +")").addClass("on");
	};
	thumbnailToggle();

	//썸네일
	$(".movie_slider_content.s"+ currentIdx +" .slider_thumbnail_area ul li").off().on("click",function(){
		movieIdx = $(this).index();
		movieSlider(sidx,movieIdx);
		thumbnailToggle();
	});

	//좌우버튼
	var thumbnailCnt = $(".movie_slider_content.s"+ currentIdx +" .slider_thumbnail li").length;
	$(".movie_slider_content.s"+ currentIdx +" .slide_prev_button").off().on("click",function(){
		if( movieIdx > 0 ) {
			movieIdx = movieIdx - 1;
			movieSlider(sidx,movieIdx);
		};
		thumbnailToggle();
	});
	$(".movie_slider_content.s"+ currentIdx +" .slide_next_button").off().on("click",function(){
		if( movieIdx < thumbnailCnt-1 ) {
			movieIdx = movieIdx + 1;
			movieSlider(sidx,movieIdx);
		};
		thumbnailToggle();
	});

	//버튼 활성화/비활성화
	if ( movieIdx == 0 ) {
		$(".movie_slider_content.s"+ currentIdx +" .slide_prev_button").css({"opacity":"0.3","pointer-events":"none"});
		$(".movie_slider_content.s"+ currentIdx +" .slide_next_button").css({"opacity":"1","pointer-events":"auto"});
	} else if ( movieIdx == thumbnailCnt-1 ) {
		$(".movie_slider_content.s"+ currentIdx +" .slide_prev_button").css({"opacity":"1","pointer-events":"auto"});
		$(".movie_slider_content.s"+ currentIdx +" .slide_next_button").css({"opacity":"0.3","pointer-events":"none"});
	} else {
		$(".movie_slider_content.s"+ currentIdx +" .slide_prev_button").css({"opacity":"1","pointer-events":"auto"});
		$(".movie_slider_content.s"+ currentIdx +" .slide_next_button").css({"opacity":"1","pointer-events":"auto"});
	};
};

/* 동영상 슬라이드 실행 2017-09-21 */
function movieSliderInit(){
    $(".movie_slider_content").each(function(sidx){
        movieSlider(sidx,0);
    });
};

/* TD영역 클릭 시 input focus */
$(document).ready(function(){
//(function(){
	$("th,td").off().on("click",function(){
		if($(this).children("input")){
			$(this).children("input").focus();
		}
	});
//})();
});

/* 임시 : 동영상 포스터 제거 */
// $(document).ready(function(){
// 	$("video").each(function(){
// 		//$(this).attr("poster","images/common/movie.png");
// 		//$(this).removeAttr("poster");
// 	});
// });

/* 비디오src 에서 poster 정보 추출 */
$(document).ready(function(){
	$("video").each(function(){
		var posterVal = $(this).children("source").attr("src");
		posterVal = posterVal.replace("mp4","jpg");
		$(this).attr("poster",posterVal);
	});
});

$(document).ready(function(){
	$('.vclose').on('click',function(){
		AllOff();
		$('.zoom_img_wrap').hide();
	});
});










