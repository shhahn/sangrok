//var video1 =  new videoPlayer( { container : "video_01", src : "", width : "", height : "", autoPlay : false } );
videoPlayer = function( param )
{
	$(".video-bottom").hide();
	this.container = null;
	this.video = null;
	this.src = "";
	this.width = "";
	this.height = "";
	this.autoPlay = "";
	this.togglePlayPauseBtn = null;
	this.stopBtn = null;
	this.scriptBtn = null;
	this.bar = null;
	this.progressBar = null;
	this.progressBarEnd = null;
	this.centerPlayBtn = null;
	this.fullscreenBtn = null;
	this.scriptBtn = null;
	this.scriptObj = null;
	this.curTime = "00:00";
	this.muteBtn = null;
	this.soundBar = null;
	this.soundProgressBar = null;
	this.videobottom = null;

	if( param ){
		var THIS = this;
		(param.container)?this.container = $( "#" + param.container ):"";
		(param.src)?this.src = param.src:"";
		(param.width)?this.width = param.width:"";
		(param.height)?this.height = param.height:"";
		(param.autoPlay)?this.autoPlay = param.autoPlay:"";
	}

	this.states = {
		state : "stop",
		isDrag : false,
		isSoundDrag :false,
		isLoaded : false,
	};

	this.togglePlayPaluse = function()
	{
		if( THIS.video.paused ){ // 재생중일때
			THIS.play();
		}else{ // 일시 정지일때
			THIS.pause();
		}
	}

	this.play = function()
	{
/*
		THIS.container.css("outline" ,"solid 0px #c00");//이게 없으면, 왕버튼,현재시간등..오류
		THIS.container.parent().css("outline" ,"solid 0px #c00");//이게 없으면, 왕버튼,현재시간등..오류
		THIS.container.parent().parent().css("outline" ,"solid 0px #c00");//이게 없으면, 왕버튼,현재시간등..오류
		THIS.container.parent().parent().parent().css("outline" ,"solid 0px #c00");//이게 없으면, 왕버튼,현재시간등..오류
		THIS.container.parent().parent().parent().parent().css("outline" ,"solid 0px #c00");//이게 없으면, 왕버튼,현재시간등..오류
*/
		THIS.container.find(".poster_class").hide();
/*
		$(".pop-content").each(function(){
			if( $(this).find("video").length != 0 ){
				THIS.container.parent().css("outline" ,"solid 0px #c00");//이게 없으면, 왕버튼,현재시간등..오류  팝업일때 필요
				$(this).css("outline" ,"solid 0px #c00");//이게 없으면, 왕버튼,현재시간등..오류 팝업일때 필요
			}
		})
*/
		if (THIS.container.hasClass('del_control')){
			THIS.container.find('video').removeAttr('controls');
			$(".btn_layer_stop").show();
		}else if (THIS.container.hasClass('autoposter_script')){
			THIS.container.find('video').attr('controls','controls');
			//THIS.scriptBtn.attr('style','opacity:1');
		}else{
			THIS.container.find('video').attr('controls','controls');
		}

		THIS.centerPlayBtn.hide();
		THIS.togglePlayPauseBtn.attr("src", "images/common/embedded_video_pause.png");
		THIS.video.play();
	}

	this.pause = function()
	{
		THIS.togglePlayPauseBtn.attr("src", "images/common/embedded_video_play.png");
		THIS.video.pause();
	}

	this.stop = function()
	{
		//THIS.find(".video-bottom").hide();
		if( THIS.video.currentTime != 0 ){
			THIS.centerPlayBtn.show();
			THIS.pause();
			THIS.video.currentTime = 0.1;
		}
	}

	this.gotoPlay = function( $sec )
	{
		THIS.video.currentTime = $sec;
	}

	var updateCurTime = function( $sec )
	{
		if( THIS.curTime != getSecToTime( $sec ) ){
			THIS.curTime = getSecToTime( $sec );
			THIS.container.find( ".video-control-curTime" ).text( THIS.curTime  + " /");
		}
	}

	var updateVideoState = function() //영상이 재생되고 있을때 처리
	{
		if( !THIS.states.isLoaded ){
			return;
		}

		updateCurTime( THIS.video.currentTime );

		var w = Math.round(( THIS.video.currentTime / THIS.video.duration ) * 100 );

		updateProgressPos( w );

		if( !THIS.states.isSoundDrag ){
			updateSoundProgressPos( THIS.video.volume * 100 );
		}
	}

	var updateProgressPos = function( $per )
	{
		THIS.progressBar.css( "width", $per + "%" );

		var pbwidth = THIS.bar.parent().css("width");
		pbwidth = eval(pbwidth.replace('px','')-10)/100;

		THIS.progressBarEnd.css( "left", $per*(pbwidth) + "px" );
	}

	var updateDragControl = function( $posX )
	{
		var pos = $posX - THIS.bar.offset().left;

		pos = dp2lp( pos );

		var sec = pos / THIS.bar.width() * THIS.video.duration;

		var per = pos /  THIS.bar.width() * 100;

		if( per < 0 ){
			per = 0;
		}else if( per > 100 ){
			per = 100;
		}

		updateProgressPos( per );

		THIS.gotoPlay( sec );
	}


	var updateSoundProgressPos = function( $per )
	{
		THIS.soundProgressBar.css( "width", $per + "%" );
		THIS.video.volume = $per / 100;
	}

	var updateSoundDragControl = function( $posX )
	{
		var pos = $posX - THIS.soundBar.offset().left;

		pos = dp2lp( pos );

		var per = pos /  THIS.soundBar.width() * 100;

		if( per < 0 ){
			per = 0;
		}else if( per > 100 ){
			per = 100;
		}

		updateSoundProgressPos( per );
	}

	var mute = function( $bool )
	{
		if( $bool ){
			THIS.video.muted = true;
			THIS.muteBtn.css( "opacity", 0.5 );
			$( ".video-sound-barset" ).hide();
		}else{
			THIS.video.muted = false;
			THIS.muteBtn.css( "opacity", 1 );
			$( ".video-sound-barset" ).show();
		}
	}

	var loadedMetadata = function() // 영상 처음 로드시 처리
	{
		THIS.states.isLoaded = true;

		THIS.bar.off("mousedown").on("mousedown",function( $e ){

			if( THIS.video.paused ){
				play();
			}else{
				THIS.states.isDrag = true;
				updateDragControl( $e.pageX );
				/*
				THIS.bar.find('.video-control-barbtn span').bind("touchmove",function( e ){
					//alert(e.pageX);
					updateDragControl( e.pageX );
					//alert($e.pageX);
					if( THIS.states.isDrag ){
						updateDragControl( e.pageX );
					}
				});
				*/
				THIS.container.off("mousemove").on("mousemove",function( $e ){

					if( THIS.states.isDrag ){
						updateDragControl( $e.pageX );
					}
				});

				THIS.container.off("mouseup").on("mouseup",function( $e ){
					THIS.states.isDrag = false;
					THIS.container.off("mousemove");
					THIS.container.off("mouseup");
				});
			}
		});

		THIS.bar.off("mouseup").on("mouseup",function( $e ){
			THIS.states.isDrag = false;
			THIS.container.off("mousemove");
			THIS.container.off("mouseup");
		});

		//음성 처리
		THIS.soundBar.off("mousedown").on("mousedown",function( $e ){
			THIS.states.isSoundDrag = true;
			updateSoundDragControl( $e.pageX );

			THIS.container.off("mousemove").on("mousemove",function( $e ){
				if( THIS.states.isSoundDrag ){
					updateSoundDragControl( $e.pageX );
				}
			});

			THIS.container.off("mouseup").on("mouseup",function( $e ){
				THIS.states.isSoundDrag = false;
				THIS.container.off("mousemove");
				THIS.container.off("mouseup");
			});
		});

		THIS.soundBar.off("mouseup").on("mouseup",function( $e ){
			THIS.states.isSoundDrag = false;
			THIS.container.off("mousemove");
			THIS.container.off("mouseup");
		});

		// 전체 시간 처리  안드로이드에서는 전체 시간이 안잡혀서 직접 넣어놨음
		//THIS.container.find( ".video-control-totalTime" ).text( getSecToTime( THIS.video.duration ));
		//console.log( "THIS.video.duration : " + getSecToTime( THIS.video.duration ) );

		updateSoundProgressPos( 50 );
	}

	var dp2lp = function( $dp )
	{
		if( typeof WebKitCSSMatrix == "undefined" )
			return $dp;

		if( window.getComputedStyle(document.body).webkitTransform == "none" )
			return $dp;

		var curTransform = new WebKitCSSMatrix(window.getComputedStyle(document.body).webkitTransform);
		return parseInt( $dp / curTransform.d );
	}

	var getSecToTime = function( $sec )
	{
		var minute = 0;
		var second = Math.floor( $sec );

		minute = Math.floor( second / 60 );
		second = Math.floor( second % 60 );

		return iToStr( minute ) + ":" + iToStr( second );
	}

	var iToStr = function( $num )
	{
		var tmpStr = ($num < 10) ? tmpStr = "0" + String( $num ) : tmpStr = String( $num );
		return tmpStr;
	}

	var init = function() // video 시작
	{
		$("video").each(function(){
			$(this).click(function(){
				return;
			})
		})

		THIS.container.find('video').removeAttr('controls');

		THIS.video = THIS.container.find("video")[0];
		THIS.togglePlayPauseBtn = THIS.container.find( ".video-btn-play" );
		THIS.stopBtn = THIS.container.find( ".video-btn-stop" );
		THIS.bar = THIS.container.find( ".video-control-barline" );
		THIS.progressBar = THIS.container.find( ".video-control-barbtn" );
		THIS.progressBarEnd = THIS.container.find( ".video-control-barbtn >span" );
		THIS.muteBtn = THIS.container.find( ".video-btn-mute" );
		THIS.soundBar = THIS.container.find( ".video-sound-barline" );
		THIS.soundProgressBar = THIS.container.find( ".video-sound-barbtn" );

		THIS.centerPlayBtn = THIS.container.find( ".video-default" );
		THIS.fullscreenBtn = THIS.container.find( ".video-btn-full" );
		THIS.scriptBtn = THIS.container.find( ".video-btn-script" );

		THIS.closeBtn = THIS.container.find( ".video-btn-close" );

		THIS.closeBtn.css('left',THIS.container.find('video').attr('width')-15+"px");

		THIS.scriptBtn.css('left',THIS.width-45+"px");

		THIS.scriptObj = $( "#" + THIS.scriptBtn.attr( "data-pop" ) );

		if( THIS.scriptObj.length > 0 ){
			var scriptPosX = THIS.scriptObj.attr( "data-position" ).split( "," )[1].split( " " ).join( "" );
			var scriptPosY = THIS.scriptObj.attr( "data-position" ).split( "," )[0].split( " " ).join( "" );
			//console.log( scriptPosX );
			//console.log( scriptPosY );

			THIS.scriptObj.css( "top", scriptPosY + "px" );
			THIS.scriptObj.css( "left", parseInt(scriptPosX)+4 + "px" );
			THIS.scriptObj.css('width',THIS.width-4 + "px");
			$('.script-popup .script-close').css('left',+THIS.width-18+"px")
		}

		// 위치 잡기
		THIS.bar.parent().css( "width",( THIS.width - 330 ) + "px"); // 타임라인 사이즈 조절
		THIS.centerPlayBtn.css( "left", ((THIS.width/2) - 40) + "px" );
		THIS.centerPlayBtn.css( "top", ((THIS.height/2) - 40) + "px" );

		THIS.video.src = THIS.src;
		THIS.video.poster = THIS.container.find('video').attr('poster');
		THIS.video.load();

		//IOS 동영상 썸네일 오디오 클릭시 오류
		if(THIS.container.find(".poster_class").hasClass("poster_class")){
			var videoWidth = parseInt(THIS.container.find("video").attr("width"));
			var videoWidthBorder = parseFloat(THIS.container.find("video").css("width").replace('px',''));
			//var videoWidthBorder = parseInt(THIS.container.outerWidth());

			//if (videoWidth == videoWidthBorder){
			if (THIS.container.find(".poster_class").hasClass("borderNone")){
				var l_t= 0;
				videoWidth = videoWidth+2;
			}else{
				var l_t = 4;
			}
			console.log(THIS.container.find("video").attr("width"));
			console.log(videoWidthBorder);

			THIS.container.find(".poster_class").attr("style","position:absolute;left:"+l_t+"px;top:"+l_t+"px;width:"+videoWidth+"px");
		}

		//THIS.video.poster = THIS.video.poster;
		//THIS.container.find('video')
		//console.log(THIS.container.find('video').attr('poster'));
		//console.log(THIS.video.poster);

		THIS.video.width = THIS.width;
		THIS.video.height = THIS.height;
		THIS.container.find( ".video-bottom" ).css( "width", THIS.width );

		//THIS.video.addEventListener("loadedmetadata", loadedMetadata );
		//THIS.video.addEventListener("timeupdate", updateVideoState );
		//THIS.video.addEventListener("ended", stop );

		THIS.video.addEventListener("play", function() {
			THIS.centerPlayBtn.hide();
			THIS.container.find(".poster_class").hide();
			THIS.closeBtn.css('left',THIS.container.find('video').attr('width')-15+"px");
			//console.log(THIS.container.find('video').attr('width'));

			if (THIS.container.hasClass('autoposter_script')){
				//썸네일로 초기화
				//THIS.container.find('video').removeAttr('controls');
				//THIS.scriptObj.hide();
				//THIS.scriptBtn.attr('style','opacity:1');
			}
		});

		//비디오 종료 이벤트
		THIS.video.addEventListener("ended", function() {
			//THIS.container.find(".poster_class").show();
			//THIS.container.find(".poster").show();

			THIS.centerPlayBtn.css( "left", ((THIS.container.find('video').attr('width')/2) - 40) + "px" );
			THIS.centerPlayBtn.css( "top", ((THIS.container.find('video').attr('height')/2) - 40) + "px" );

			//THIS.video.currentTime = 0;
			THIS.pause();

			//if( ipadOS || AndroidOS) {}

			if (THIS.container.hasClass('autoposter1')){
				//썸네일로 초기화
				//THIS.container.find('video').attr('src',THIS.container.find('video').attr('src'));
				//if(!AndroidOS) {THIS.centerPlayBtn.show();}
				//THIS.container.find('video').removeAttr('controls');
				//THIS.container.find('video').hide();

			}else if (THIS.container.hasClass('del_control')){
				THIS.centerPlayBtn.show();
				THIS.container.find('video').removeAttr('controls');
				$(".btn_layer_stop").hide();

			}else if (THIS.container.hasClass('autoposter_script')){
				//썸네일로 초기화
				//if(!AndroidOS) {THIS.centerPlayBtn.show();}
				//THIS.container.find('video').removeAttr('controls');
				//THIS.scriptObj.hide();
				//THIS.scriptBtn.attr('style','opacity:0');
				//$('.script-popup').hide();
				//THIS.container.find('video').attr('src',THIS.container.find('video').attr('src'));

			}else{
				//THIS.container.find('video').show();
				//if(!AndroidOS) {THIS.centerPlayBtn.show();}
				//THIS.container.find('video').removeAttr('controls');

			}
			/*
			if (THIS.container.hasClass('del_control')){
				$(".btn_layer_stop").hide();
			}
			*/
		}, true);
/*
		THIS.container.bind('webkitfullscreenchange mozfullscreenchange fullscreenchange', function(e) {
			var state = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
			var event = state ? 'FullscreenOn' : 'FullscreenOff';

			if (event =='FullscreenOff'){
				//팝업 닫기 및 스크립트 버튼 고정 전체화면에서 본문으로 돌아올때
				THIS.closeBtn.attr('style','right:-17px');
				THIS.scriptBtn.attr('style','float:right');
				console.log('Event: ' + event);
			}
			// Now do something interesting
			//console.log('Event: ' + event);
			//alert('Event: ' + event);
		});
*/

		// 이벤트 주기
		THIS.togglePlayPauseBtn.off("click").on("click",function(){
			THIS.togglePlayPaluse();
		});
		THIS.stopBtn.off("click").on("click",function(){
			THIS.stop();
		});
		THIS.centerPlayBtn.off("click").on("click",function(){
			/*
			if (THIS.container.hasClass('autoposter1')){
				THIS.container.find('video').show();
			}else if (THIS.container.hasClass('autoposter_script')){
				THIS.container.find('video').show();
			}
			*/
			THIS.play();
		});

		THIS.fullscreenBtn.off("click").on("click",function(){
			THIS.video.webkitEnterFullscreen();
		});

		THIS.scriptBtn.off("click").on("click",function(){
			//console.log(THIS.scriptObj.html());
			THIS.scriptBtn.css('left',THIS.width-45+"px");
			//THIS.scriptBtn.hide();
			THIS.scriptObj.show();
		});

		THIS.scriptObj.find(".script-close" ).off("click").on("click",function(){
			//THIS.scriptBtn.show();
			THIS.scriptBtn.attr('style','opacity:1');
			THIS.scriptBtn.css('left',THIS.width-45+"px");
			THIS.scriptObj.hide();
		});

		THIS.muteBtn.toggle( function(){
			mute( true );
		}, function(){
			mute( false );
		});
	}
	init();
}