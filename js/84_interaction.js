(function($){

    'use strict';

    var GameManager = {
        event: {
            isTouchDevice: 'ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch,
            eventSelector: function (eventType) { // 현재 디바이스에 맞는 이벤트 문자열을 리턴
                var selectedEvent;
                switch (eventType) {
                    case 'eventDown': selectedEvent = this.isTouchDevice ? 'touchstart' : 'mousedown'; break;
                    case 'eventMove': selectedEvent = this.isTouchDevice ? 'touchmove' : 'mousemove'; break;
                    case 'eventUp': selectedEvent = this.isTouchDevice ? 'touchend' : 'mouseup'; break;
                    case 'eventOut': selectedEvent = this.isTouchDevice ? 'touchleave' : 'mouseout'; break;
                }
                return selectedEvent;
            }
        }
    };


    // get event string
    var touchstart = GameManager.event.eventSelector("eventDown");
	var touchmove = GameManager.event.eventSelector("eventMove");
	var touchend = GameManager.event.eventSelector("eventUp");

    // set zoom value
    if (parent.ZOOMVALUE == undefined) {
		parent.ZOOMVALUE = 1;
	}

	var zoom = parent.ZOOMVALUE;


    // css selector "block"
    var sBlock = ".img_block";
    
    // css selector "container"
    var sContainer = ".container";


    var curBlock = undefined;

    /**
     * touch block event
     */
    function onTouchStartBlock(e) {

        //console.log(e.originalEvent.touches[0].pageX);

        var clone = $(this).clone();

        //var left = $(this).offset().left;
        //var top = $(this).offset().top;

        var left = e.pageX-10;
        var top = e.pageY-10;

        
        if (typeof(e.pageX) === 'undefined') {
            left = e.originalEvent.touches[0].pageX-20;
            top = e.originalEvent.touches[0].pageY-20;
        }
        

        
    

        clone.css({left:left, top:top});
        clone.on(touchmove, onTouchMoveContainer);
        clone.on(touchend, onTouchEndContainer);

        curBlock = clone;
        $("body").append(clone);
        
        
    }

    /**
     *  
     */
    function onTouchMoveContainer(e) {

        //var left = e.pageX-10;
        //var top = e.pageY-10;



        if (typeof(curBlock) !== 'undefined') {
            
            console.log(e);
            
            var left = e.pageX-10;
            var top = e.pageY-10;
    
            if (typeof(e.pageX) === 'undefined') {
                left = e.originalEvent.touches[0].pageX-20;
                top = e.originalEvent.touches[0].pageY-20;
            }


            curBlock.css({left:left, top:top});
        }
        

        


        //$(this).css({left:left, top:top});

        //console.log(e);
    }


    /**
     * touch end box 
     */
    function onTouchEndContainer(e) {

        console.log(e);

        if (typeof(curBlock) !== 'undefined') {
            curBlock.remove();
            curBlock = undefined;
        }        
    }



    /**
     * initialize
     */
    function init() {
        $(sBlock).on(touchstart, onTouchStartBlock);
        $(sContainer).on(touchmove, onTouchMoveContainer);
        $(sContainer).on(touchend, onTouchEndContainer);


        //$(".img04").on(touchend, onTouchEndBox);

        /*
        $(".container").on(touchmove, function(e){

            console.log("container move");
            
        });

        $(".container").on(touchend, function(e){
            
            console.log("container end");
            
        });
        */


    }

    /**
     * document load event
     */
    $(function(){

        init();
        //alert("test");
        //$(".img04").rotate(-10);
        //$(".img08").draggable({ revert: true, helper: "clone" });

    });


})(jQuery);