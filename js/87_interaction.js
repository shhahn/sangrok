
/**
 * 
 */
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
            initBlockPos($(sBlock));
        });
    

        // 딱풀 무게
        var wGstick = 30;
        // 작은 추 무게 
        var wSblock = 10;
        // 중간 추 무게 
        var wMblock = 20;
        // 큰 추 무게 
        var wBblock = 30;

        // 무게 차이의 / 8.75 만큼 기움 (최대 8도)
        var rVar = 8.75;

        // css selector "block"
        var sBlock = ".img_block";
        
        // css selector "container"
        var sContainer = ".container";
    
    
        var curBlock = undefined;
        var arrBlock = [];
    
    
        var seesaw_deg = 0; // 시소 기울기
    
    
        var touchOffsetLeft = 0;
        var touchOffsetTop = 0;



        // 박스 옮기기 활성화 
        var isActive = false;
    
        /**
         * get touch position 
         */
        function getPos(e, box) {

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
     
    
            left = left - touchOffsetLeft;
            top = top - touchOffsetTop;

            return {
                left : left,
                top : top
            };
        }
    
        /**
         * touch block event
         */
        function onTouchStartBlock(e) {

            var block = $(this);
            var pos = getPos(e, block);
    
            block.css({left:pos.left, top:pos.top});
            
            curBlock = block;
            
        }
    
        /**
         *  
         */
        function onTouchMoveContainer(e) {
    
            if (typeof(curBlock) !== 'undefined') {
                var pos = getPos(e);
                curBlock.css({left:pos.left, top:pos.top});
            }

        }
    
    
    
        function backToHome() {
            //curBlock.remove();
            var orgLeft = curBlock.data("orgLeft");
            var orgTop = curBlock.data("orgTop");
            var index = curBlock.data("index");
    
            if (typeof(index) !== 'undefined') {
                arrBlock[index] = undefined;
                curBlock.data("index", undefined);
            }
         
            curBlock.css({left:orgLeft, top:orgTop});
        }
    
    
        /**
         * touch end box 
         */
        function onTouchEndContainer(e) {
    
            var pos = getPos(e);
            var boxBinder = checkArea(pos);
    
            if (typeof(curBlock) !== 'undefined') {
                
                // 영역밖에 놓으면 원래 위치로 보내기
                if (typeof(boxBinder) === 'undefined') {
                    backToHome();
                } else {
    
                    //backToHome();

                    var i;
                    var left;
                    var top;
                    var weight;

                    if (curBlock.hasClass("img_block_small")) {

                        for (i=0; i < 3; i++) {
                            if (typeof(arrBlock[i]) == 'undefined') {
                                break;
                            }
                        }

                        left = boxBinder.left + 10;
                        top = (boxBinder.bottom - 10) - ((curBlock.height()-1) * (i+1));
                        weight = wSblock;

                    } else if (curBlock.hasClass("img_block_mid")) {

                        for (i=3; i < 5; i++) {
                            if (typeof(arrBlock[i]) == 'undefined') {
                                break;
                            }
                        }

                        left = boxBinder.left + 25;
                        top = (boxBinder.bottom - 10) - ((curBlock.height()-1) * (i-2));
                        weight = wMblock;

                    } else if (curBlock.hasClass("img_block_big")) {

                        for (i=5; i < 6; i++) {
                            if (typeof(arrBlock[i]) == 'undefined') {
                                break;
                            }
                        }

                        left = boxBinder.left + 43;
                        top = (boxBinder.bottom - 10) - ((curBlock.height()-1) * (i-4));
                        weight = wBblock;
                    }

                    top += (seesaw_deg*1.5/zoom);
                    curBlock.css({left:left, top:top});
                    curBlock.data("weight", weight);
                    curBlock.data("left", left);
                    curBlock.data("top", top);
                    curBlock.data("index", i);
                    arrBlock[i] = curBlock;

                }
                
                // 어디가 무거운지 판정
                decision();
    
                curBlock = undefined;
            }        
        }
    
        /**
         *  
         */
        function checkArea(pos) {

            var scale = $(".img_scale_right");

            scale.offset();

            console.log(scale.offset());
            console.log(scale.width());

            var top = scale.offset().top;
            var left = scale.offset().left;
            var right = scale.width()+left;
            var bottom = scale.height()+top;
            
            // 세로축 안으로 들어옴
            if (pos.top >= top && pos.top <= bottom) {
                // 가로축 안으로 들어옴
                if (pos.left >= left && pos.left <= right) {
                    return {
                        top : top,
                        left : left,
                        right : right,
                        bottom : bottom
                    };
                }
            }
    
            return undefined;
        }
    
    
    
        /**
         * 
         */
        function decision() {
    
            var left_weight = wGstick;
            var right_weight = 0;
    
            for (var i = 0; i < 6; i++) {
                if (arrBlock[i]) right_weight += arrBlock[i].data("weight")
            }

            var deg = (right_weight-left_weight)/rVar;


    
            animate(deg);
    
        }
    
    
        /**
         * animation
         */
        function animate(deg) {
    
            function correct(block, level, deg, degDiff) {
                //var left = block.data("left");
    
                if (!block) return;
    
                var top = block.data("top");
    
               
                if (deg < 0) {
                    
    
                    //console.log(top);
                    top += level;
                } else if (deg > 0) {
                    top -= level;
                } else {
    
                }
    
                if (degDiff) {
                    block.animate({top:top}, 1000);
                } else {
                    block.css({top:top});
                }
                
            }
 
            var degDiff = deg != seesaw_deg;
            if (degDiff) {
                
                
                $(".img_bar").rotate({
                    angle: 0,
                    animateTo:seesaw_deg,
                    easing : function(x, t, b, c, d) { 
                        //console.log("easing");
                        return b+(t/d)*c ; 
                    }
                });
    
    
                var posLeftScale = 90; //$(".img04").offset().top/zoom;
                var posRightScale = 90; //$(".img05").offset().top/zoom;
    
                posLeftScale -= (deg*1.5/zoom);
                posRightScale += (deg*1.5/zoom);

                $(".img_scale_left").animate({top:posLeftScale}, 1000);
                $(".img_scale_right").animate({top:posRightScale}, 1000);
                

                if (arrBlock[0]) {
                    var rtop = arrBlock[0].offset().top + (deg*1.5/zoom);
                    arrBlock[0].animate({top:rtop}, 1000);

                    if (arrBlock[1]) {
                        var rtop2 = rtop - (arrBlock[0].height()-1)
                        arrBlock[1].animate({top:rtop2}, 1000);
                    }

                    if (arrBlock[2]) {
                        var rtop3 = rtop - (arrBlock[1].height()-1) 
                        arrBlock[2].animate({top:rtop3}, 1000);
                    }

                }

                if (arrBlock[3]) {


                    var rtop = arrBlock[3].offset().top + (deg*1.5/zoom);
                    arrBlock[3].animate({top:rtop}, 1000);

                    if (arrBlock[4]) {
                        var rtop2 = rtop - (arrBlock[3].height()-1)
                        arrBlock[4].animate({top:rtop2}, 1000);
                    }
                }

                if (arrBlock[5]) {
                    
                    var rtop = arrBlock[5].offset().top + (deg*1.5/zoom);
                    arrBlock[5].animate({top:rtop}, 1000);

                }


                for (var i = 0; i < 6; i++) {
                    if (arrBlock[i]) {

                    }
                }
                seesaw_deg = deg;
  
            }
    
        }
    
    
        /**
         * reset
         */
        function reset() {
            
            for (var i = 0; i < 11; i++) {
                if (arrBlock[i]) {
                    curBlock = arrBlock[i];
                    backToHome();
                }
            }
    
            curBlock = undefined;
    
            seesaw_deg = 0;
            $(".img_bar").rotate(seesaw_deg);
    
        }
    
    
    
        function initBlockPos(objBlocks) {
                        
            for (var i = 0; i < objBlocks.length; i++) {
                var orgLeft = $(objBlocks[i]).offset().left/zoom;
                var orgTop = $(objBlocks[i]).offset().top/zoom;

                $(objBlocks[i]).data("orgLeft", orgLeft);
                $(objBlocks[i]).data("orgTop", orgTop);
            }
        }



        /**
         * 텍스트 박스 글자 체크
         */
        function checkTextArea(e) {
            // console.log(e);
            var txt = $(this).val();
            if (txt.length >= 10) {
                //$(".finger").show();
                $(".btn_ok_area").show();
            } else {

            }
        }

        /**
         * 확인 버튼 클릭
         */
        function onClickOk() {
            $(".finger").show();
            isActive = true;
            initBlockPos($(sBlock));
        }

    
        /**
         * initialize
         */
        function init() {

            // 최초 저울이 기울어 지도록 
            var slope = wGstick/rVar;
            $(".img_bar").rotate(-(slope));
            var posLeftScale = 90; //$(".img04").offset().top/zoom;
            var posRightScale = 90; //$(".img05").offset().top/zoom;

            posLeftScale += (slope*1.5/zoom);
            posRightScale -= (slope*1.5/zoom);

            $(".img_scale_left").offset({top:posLeftScale});
            $(".img_scale_right").offset({top:posRightScale});

            seesaw_deg = slope;

            var objBlocks = $(sBlock);
            initBlockPos(objBlocks);

            objBlocks.on(touchstart, onTouchStartBlock);
            $(sContainer).on(touchmove, onTouchMoveContainer);
            objBlocks.on(touchend, onTouchEndContainer);
    
        }
    
        /**
         * document load event
         */
        $(function(){
    
            init();
            
            //$(".layer_wrap").on(touchstart, function(e){
            //    console.log(e);
            //});
    
        });
    
    
    })(jQuery);




// ----------------------------------------------------------------------------------------------------------------------
//
//
// 나누기 영역
// 
//
// ----------------------------------------------------------------------------------------------------------------------





    
/**
 * 
 */
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
        initBlockPos($(sBlock));
    });


    // 딱풀 무게
    var wGstick = 30;
    // 작은 추 무게 
    var wSblock = 10;
    // 중간 추 무게 
    var wMblock = 20;
    // 큰 추 무게 
    var wBblock = 30;

    // 무게 차이의 / 8.75 만큼 기움 (최대 8도)
    var rVar = 8.75;

    // css selector "block"
    var sBlock = ".img_block2";
    
    // css selector "container"
    var sContainer = ".layer_wrap";


    var curBlock = undefined;
    var arrBlock = [];


    var seesaw_deg = 0; // 시소 기울기


    var touchOffsetLeft = 0;
    var touchOffsetTop = 0;



    // 박스 옮기기 활성화 
    var isActive = false;

    /**
     * get touch position 
     */
    function getPos(e, box) {

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
    

        left = left - touchOffsetLeft;
        top = top - touchOffsetTop;

        return {
            left : left,
            top : top
        };
    }

    /**
     * touch block event
     */
    function onTouchStartBlock(e) {

        var block = $(this);
        var pos = getPos(e, block);

        block.css({left:pos.left, top:pos.top});
        
        curBlock = block;
        
    }

    /**
     *  
     */
    function onTouchMoveContainer(e) {

        if (typeof(curBlock) !== 'undefined') {
            var pos = getPos(e);
            curBlock.css({left:pos.left, top:pos.top});
        }

    }



    function backToHome() {
        //curBlock.remove();
        var orgLeft = curBlock.data("orgLeft");
        var orgTop = curBlock.data("orgTop");
        var index = curBlock.data("index");

        //console.log("backToHome");
        //console.log(orgTop);

        if (typeof(index) !== 'undefined') {
            arrBlock[index] = undefined;
            curBlock.data("index", undefined);
        }
        
        curBlock.css({left:orgLeft, top:orgTop});
    }


    /**
     * touch end box 
     */
    function onTouchEndContainer(e) {

        var pos = getPos(e);
        var boxBinder = checkArea(pos);

        if (typeof(curBlock) !== 'undefined') {
            
            // 영역밖에 놓으면 원래 위치로 보내기
            if (typeof(boxBinder) === 'undefined') {
                backToHome();
            } else {

                //backToHome();

                var i;
                var left;
                var top;
                var weight;

                if (curBlock.hasClass("img_block_small")) {

                    for (i=0; i < 3; i++) {
                        if (typeof(arrBlock[i]) == 'undefined') {
                            break;
                        }
                    }

                    left = boxBinder.left + 10;
                    top = (boxBinder.bottom - 10) - ((curBlock.height()-1) * (i+1));
                    weight = wSblock;

                } else if (curBlock.hasClass("img_block_mid")) {

                    for (i=3; i < 5; i++) {
                        if (typeof(arrBlock[i]) == 'undefined') {
                            break;
                        }
                    }

                    left = boxBinder.left + 25;
                    top = (boxBinder.bottom - 10) - ((curBlock.height()-1) * (i-2));
                    weight = wMblock;

                } else if (curBlock.hasClass("img_block_big")) {

                    for (i=5; i < 6; i++) {
                        if (typeof(arrBlock[i]) == 'undefined') {
                            break;
                        }
                    }

                    left = boxBinder.left + 43;
                    top = (boxBinder.bottom - 10) - ((curBlock.height()-1) * (i-4));
                    weight = wBblock;
                }

                top += (seesaw_deg*1.5/zoom);
                curBlock.css({left:left, top:top});
                curBlock.data("weight", weight);
                curBlock.data("left", left);
                curBlock.data("top", top);
                curBlock.data("index", i);
                arrBlock[i] = curBlock;

            }
            
            // 어디가 무거운지 판정
            decision();

            curBlock = undefined;
        }        
    }

    /**
     *  
     */
    function checkArea(pos) {

        var scale = $(".img_scale_right");

        scale.offset();

        //console.log(scale.offset());
        //console.log(scale.width());

        var top = scale.offset().top;
        var left = scale.offset().left;
        var right = scale.width()+left;
        var bottom = scale.height()+top;
        
        // 세로축 안으로 들어옴
        if (pos.top >= top && pos.top <= bottom) {
            // 가로축 안으로 들어옴
            if (pos.left >= left && pos.left <= right) {
                return {
                    top : top,
                    left : left,
                    right : right,
                    bottom : bottom
                };
            }
        }

        return undefined;
    }



    /**
     * 
     */
    function decision() {

        var left_weight = wGstick;
        var right_weight = 0;

        for (var i = 0; i < 6; i++) {
            if (arrBlock[i]) right_weight += arrBlock[i].data("weight")
        }

        var deg = (right_weight-left_weight)/rVar;



        animate(deg);

    }


    /**
     * animation
     */
    function animate(deg) {

        function correct(block, level, deg, degDiff) {
            //var left = block.data("left");

            if (!block) return;

            var top = block.data("top");

            
            if (deg < 0) {
                

                //console.log(top);
                top += level;
            } else if (deg > 0) {
                top -= level;
            } else {

            }

            if (degDiff) {
                block.animate({top:top}, 1000);
            } else {
                block.css({top:top});
            }
            
        }

        var degDiff = deg != seesaw_deg;
        if (degDiff) {
            
            
            $(".img_bar").rotate({
                angle: 0,
                animateTo:seesaw_deg,
                easing : function(x, t, b, c, d) { 
                    //console.log("easing");
                    return b+(t/d)*c ; 
                }
            });


            var posLeftScale = 90; //$(".img04").offset().top/zoom;
            var posRightScale = 90; //$(".img05").offset().top/zoom;

            posLeftScale -= (deg*1.5/zoom);
            posRightScale += (deg*1.5/zoom);

            $(".img_scale_left").animate({top:posLeftScale}, 1000);
            $(".img_scale_right").animate({top:posRightScale}, 1000);
            

            if (arrBlock[0]) {
                var rtop = arrBlock[0].offset().top + (deg*1.5/zoom);
                arrBlock[0].animate({top:rtop}, 1000);

                if (arrBlock[1]) {
                    var rtop2 = rtop - (arrBlock[0].height()-1)
                    arrBlock[1].animate({top:rtop2}, 1000);
                }

                if (arrBlock[2]) {
                    var rtop3 = rtop - (arrBlock[1].height()-1) 
                    arrBlock[2].animate({top:rtop3}, 1000);
                }

            }

            if (arrBlock[3]) {


                var rtop = arrBlock[3].offset().top + (deg*1.5/zoom);
                arrBlock[3].animate({top:rtop}, 1000);

                if (arrBlock[4]) {
                    var rtop2 = rtop - (arrBlock[3].height()-1)
                    arrBlock[4].animate({top:rtop2}, 1000);
                }
            }

            if (arrBlock[5]) {
                
                var rtop = arrBlock[5].offset().top + (deg*1.5/zoom);
                arrBlock[5].animate({top:rtop}, 1000);

            }


            for (var i = 0; i < 6; i++) {
                if (arrBlock[i]) {

                }
            }
            seesaw_deg = deg;

        }

    }


    /**
     * reset
     */
    function reset() {
        
        for (var i = 0; i < 11; i++) {
            if (arrBlock[i]) {
                curBlock = arrBlock[i];
                backToHome();
            }
        }

        curBlock = undefined;

        seesaw_deg = 0;
        $(".img_bar").rotate(seesaw_deg);

    }



    function initBlockPos(objBlocks) {
                    
        for (var i = 0; i < objBlocks.length; i++) {
            var orgLeft = $(objBlocks[i]).offset().left/zoom;
            var orgTop = $(objBlocks[i]).offset().top/zoom;

            $(objBlocks[i]).data("orgLeft", orgLeft);
            $(objBlocks[i]).data("orgTop", orgTop);
        }
    }


    /**
     * initialize
     */
    function init() {

        

        var objBlocks = $(sBlock);
        initBlockPos(objBlocks);

        objBlocks.on(touchstart, onTouchStartBlock);
        $(sContainer).on(touchmove, onTouchMoveContainer);
        objBlocks.on(touchend, onTouchEndContainer);

        // 최초 저울이 기울어 지도록 
        /*
        var slope = wGstick/rVar;
        $(".img_bar").rotate(-(slope));
        var posLeftScale = 90; //$(".img04").offset().top/zoom;
        var posRightScale = 90; //$(".img05").offset().top/zoom;

        posLeftScale += (slope*1.5/zoom);
        posRightScale -= (slope*1.5/zoom);

        $(".img_scale_left").offset({top:posLeftScale});
        $(".img_scale_right").offset({top:posRightScale});

        seesaw_deg = slope;

        
        */
    }

    /**
     * document load event
     */
    $(function(){

        //init();

        $(".img_cong").hide();

        // 지연시작 (좌표 결정 될때까지 대기)
        $(".btn_open_layer").on(touchend, function(){
            setTimeout(init, 1000);
        });
        
        //$(".layer_wrap").on(touchstart, function(e){
        //    console.log(e);
        //});

    });


})(jQuery);