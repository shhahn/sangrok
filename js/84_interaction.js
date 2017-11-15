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

    
    var zoom;
    function viewport(){
        if (parent.ZOOMVALUE == undefined) {
            parent.ZOOMVALUE = 1;
        }
        zoom = parent.ZOOMVALUE;
    }
    
    viewport();
    $(window).resize(function(){
        viewport();
    });

    // css selector "block"
    var sBlock = ".img_block";
    
    // css selector "container"
    var sContainer = ".container";


    var curBlock = undefined;
    var arrBlock = [];


    var seesaw_deg = 0; // 시소 기울기


    var touchOffsetLeft = 0;
    var touchOffsetTop = 0;

    /**
     * get touch position 
     */
    function getPos(e, box) {

        //pos.left-box.offset().left/zoom

        


        var left = e.pageX;
        var top = e.pageY;

        
        if (typeof(e.pageX) === 'undefined') {
            left = e.originalEvent.changedTouches[0].pageX;
            top = e.originalEvent.changedTouches[0].pageY;
        }


        left = left / zoom;
        top = top / zoom;

        if (typeof(box) !== 'undefined') {
            touchOffsetTop = top - box.offset().top/zoom;
            touchOffsetLeft = left - box.offset().left/zoom;
        }
 

        left = left / zoom - touchOffsetLeft;
        top = top / zoom - touchOffsetTop;

        console.log(touchOffsetLeft);
        console.log(left);

        return {
            left : left,
            top : top
        };
    }

    /**
     * touch block event
     */
    function onTouchStartBlock(e) {

        //console.log(e.originalEvent.touches[0].pageX);

        // var clone = $(this).clone();

        // clone 아님...
        var clone = $(this);

        //var left = $(this).offset().left;
        //var top = $(this).offset().top;

        
        
        //touchOffsetTop = clone.offset().top/zoom;
        //touchOffsetLeft = clone.offset().left/zoom;

        var pos = getPos(e, clone);


        //alert(clone.offset().left/zoom);
        //alert(pos.left);
        //alert(pos.left-clone.offset().left/zoom);


        clone.css({left:pos.left, top:pos.top});
        clone.on(touchmove, onTouchMoveContainer);

        
        if (!GameManager.event.isTouchDevice) {
            clone.on(touchend, onTouchEndContainer);
        }
        

        curBlock = clone;
        $("body").append(clone);
        
        
    }

    /**
     *  
     */
    function onTouchMoveContainer(e) {

        if (typeof(curBlock) !== 'undefined') {
            var pos = getPos(e);
            curBlock.css({left:pos.left, top:pos.top});
        }
        

        


        //$(this).css({left:left, top:top});

        //console.log(e);
    }


    /**
     * touch end box 
     */
    function onTouchEndContainer(e) {

        var pos = getPos(e);
        var boxBinder = checkArea(pos);

        if (typeof(curBlock) !== 'undefined') {
            
            // 영역밖에 놓으면 지움
            if (typeof(boxBinder) === 'undefined') {
                //curBlock.remove();
            } else {

                var top = 750;
                var weight = 1;
                if (curBlock.hasClass("img_block_double")) {
                    top = 725;
                    weight = 2;
                }

                // 이미 올라가있는 블럭이 있으면 안올림
                if (typeof(arrBlock[boxBinder.index]) !== 'undefined') {
                    curBlock.remove();
                } else {
                    curBlock.css({left:boxBinder.left, top:top});
                    curBlock.data("weight", weight);
                    curBlock.data("left", boxBinder.left);
                    curBlock.data("top", top);
                    arrBlock[boxBinder.index] = curBlock;

                    // 어디가 무거운지 판정
                    decision();
                }
                
            }
            


            curBlock = undefined;
        }        
    }

    /**
     *  
     */
    function checkArea(pos) {
        // x start 180, y start 730
        // x end 630, y end 830


        // 195, 610, 38

        var offsetX = 37.72;
        var standardX = 195;
        
        // 세로축 안으로 들어옴
        if (pos.top >= 730 && pos.top <= 830) {

            // 가로축 안으로 들어옴
            if (pos.left >= 180 && pos.left <= 630) {
                for (var i = 0; i < 11; i++) {
                    
                    var right = standardX + ((i+1)*offsetX);

                    // 시소의 어느 위치에 있는지 찾음
                    if (pos.left < right) {
                        //alert(i);
                        return {
                            index : i,
                            left : right-offsetX
                        }

                        break;
                    }

                }
            }
        }

        return undefined;
    }



    /**
     * 
     */
    function decision() {

        var left_weight = 0;
        var right_weight = 0;

        if (arrBlock[0]) left_weight += arrBlock[0].data("weight") * 5
        if (arrBlock[1]) left_weight += arrBlock[1].data("weight") * 4
        if (arrBlock[2]) left_weight += arrBlock[2].data("weight") * 3
        if (arrBlock[3]) left_weight += arrBlock[3].data("weight") * 2
        if (arrBlock[4]) left_weight += arrBlock[4].data("weight") * 1

        if (arrBlock[6]) right_weight += arrBlock[6].data("weight") * 1
        if (arrBlock[7]) right_weight += arrBlock[7].data("weight") * 2
        if (arrBlock[8]) right_weight += arrBlock[8].data("weight") * 3
        if (arrBlock[9]) right_weight += arrBlock[9].data("weight") * 4
        if (arrBlock[10]) right_weight += arrBlock[10].data("weight") * 5


        var deg;
        if (left_weight < right_weight) {
            deg = 5;
        } else if (left_weight > right_weight) {
            deg = -5;
        } else {
            deg = 0;
        }

        animate(deg);

        //console.log(left_weight);
        //console.log(right_weight);

    }


    /**
     * animation
     */
    function animate(deg) {

        function correct(block, level, deg) {
            //var left = block.data("left");

            if (!block) return;

            var top = block.data("top");

           
            if (deg < 0) {
                

                //console.log(top);
                top -= level;
            } else if (deg > 0) {
                top += level;
            } else {

            }

            
            block.css({top:top});
        }


        if (deg != seesaw_deg) {
            seesaw_deg = deg;
            
            $(".img04").rotate({
                angle: 0,
                animateTo:seesaw_deg,
                easing : function(x, t, b, c, d) { 
                    //console.log("easing");
                    return b+(t/d)*c ; 
                }
            });

            
        }

        var step = -15.5/zoom;
        for (var i = 0; i < 11; i++) {
            correct(arrBlock[i], step, deg);

            step += 3.0/zoom;
        }
   
    }


    /**
     * reset
     */
    function reset() {
        
        for (var i = 0; i < 11; i++) {
            if (arrBlock[i]) {
                arrBlock[i].remove();
                arrBlock[i] = undefined;
            }
        }

        seesaw_deg = 0;
        $(".img04").rotate(seesaw_deg);

    }



    /**
     * initialize
     */
    function init() {

        $(sBlock).on(touchstart, onTouchStartBlock);
        $(sContainer).on(touchmove, onTouchMoveContainer);

        $(".btnReset").on(touchstart,reset);

        if (GameManager.event.isTouchDevice) {
            console.log("ASdfsadfsd");
            $(sContainer).on(touchend, onTouchEndContainer);    
        }
        
        for (var i = 0; i < 11; i++) {
            arrBlock[i] = undefined;
        }


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