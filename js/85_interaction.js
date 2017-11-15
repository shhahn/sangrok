/**
 * 클릭으로 시소위 사람 옮기기 조작부분
 */
(function($){

    "use strict";

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
        setpos();
    });



    /*
    var pos_btnleft_outer = 180 * zoom;
    var pos_btnleft_inner = 240 * zoom;
    var pos_btnright_inner = 430 * zoom;
    var pos_btnright_outer = 490 * zoom;

    var pos_btn1_top_outer = 305 * zoom;
    var pos_btn1_top_inner = 310 * zoom;
    var pos_btn1_middle = 330 / zoom;
    var pos_btn1_bottom_inner = 345 * zoom;
    var pos_btn1_bottom_outer = 355 * zoom;

    var pos_btn3_top_outer = 530 * zoom;
    var pos_btn3_top_inner = 535 * zoom;
    var pos_btn3_middle = 555 * zoom;
    var pos_btn3_bottom_inner = 570 * zoom;
    var pos_btn3_bottom_outer = 575 * zoom;
    */


    var pos_btnleft_outer = 0;
    var pos_btnleft_inner = 0;
    var pos_btnright_inner = 0;
    var pos_btnright_outer = 0;

    var pos_btn1_top_outer = 0;
    var pos_btn1_top_inner = 0;
    var pos_btn1_middle = 0;
    var pos_btn1_bottom_inner = 0;
    var pos_btn1_bottom_outer = 0;

    var pos_btn3_top_outer = 0;
    var pos_btn3_top_inner = 0;
    var pos_btn3_middle = 0;
    var pos_btn3_bottom_inner = 0;
    var pos_btn3_bottom_outer = 0;


    /**
     * 같은 몸무게 이미지
     */
    function changeImage1() {

        // 170, 240, 430, 490
        // case1 (기본) images/85/b85_01_01.png, 1_inner (245), 2_inner  


        var curImgSrc = $(".img01").attr("src");
        alert(curImgSrc);

    }

    function onClickBtn1(e) {

        var img = $(".img01").find("img");
        var curImgSrc = img.attr("src");

        console.log(e);


        switch (curImgSrc) {
            case "images/85/b85_01_01.png": 
                img.attr("src", "images/85/b85_01_03.png"); 
                btn1.offset({left:pos_btnleft_outer, top:pos_btn1_top_outer}); 
                btn2.offset({top:pos_btn1_bottom_inner}); 
                break;
            case "images/85/b85_01_02.png":
                img.attr("src", "images/85/b85_01_04.png");
                btn1.offset({left:pos_btnleft_outer, top:pos_btn1_middle}); 
                btn2.offset({top:pos_btn1_middle}); 
                break;
            case "images/85/b85_01_03.png":
                img.attr("src", "images/85/b85_01_01.png");
                btn1.offset({left:pos_btnleft_inner, top:pos_btn1_middle}); 
                btn2.offset({top:pos_btn1_middle}); 
                break;
            case "images/85/b85_01_04.png":
                img.attr("src", "images/85/b85_01_02.png");
                btn1.offset({left:pos_btnleft_inner, top:pos_btn1_bottom_inner}); 
                btn2.offset({top:pos_btn1_top_outer}); 
                break;
        }

        
    }

    function onClickBtn2() {

        var img = $(".img01").find("img");
        var curImgSrc = img.attr("src");

        switch (curImgSrc) {
            case "images/85/b85_01_01.png": 
                img.attr("src", "images/85/b85_01_02.png"); 
                btn2.offset({left:pos_btnright_outer, top:pos_btn1_top_outer}); 
                btn1.offset({top:pos_btn1_bottom_inner}); 
                break;
            case "images/85/b85_01_02.png":
                img.attr("src", "images/85/b85_01_01.png");
                btn2.offset({left:pos_btnright_inner, top:pos_btn1_middle}); 
                btn1.offset({top:pos_btn1_middle}); 
                break;
            case "images/85/b85_01_03.png":
                img.attr("src", "images/85/b85_01_04.png");
                btn2.offset({left:pos_btnright_outer, top:pos_btn1_middle}); 
                btn1.offset({top:pos_btn1_middle}); 
                break;
            case "images/85/b85_01_04.png":
                img.attr("src", "images/85/b85_01_03.png");
                btn2.offset({left:pos_btnright_inner, top:pos_btn1_bottom_inner}); 
                btn1.offset({top:pos_btn1_top_outer}); 
                break;
        }

    }




    function onClickBtn3(e) {

        var img = $(".img02").find("img");
        var curImgSrc = img.attr("src");

        switch (curImgSrc) {
            case "images/85/b85_02_01.png": 
                img.attr("src", "images/85/b85_02_02.png"); 
                btn3.offset({left:pos_btnleft_outer, top:pos_btn3_top_outer}); 
                btn4.offset({top:pos_btn3_bottom_outer}); 
                break;
            case "images/85/b85_02_02.png":
                img.attr("src", "images/85/b85_02_01.png");
                btn3.offset({left:pos_btnleft_inner, top:pos_btn3_middle}); 
                btn4.offset({top:pos_btn3_middle}); 
                break;
            case "images/85/b85_02_03.png":
                img.attr("src", "images/85/b85_02_04.png");
                btn3.offset({left:pos_btnleft_inner, top:pos_btn3_top_inner}); 
                //btn4.css({top:pos_btn1_middle}); 
                break;
            case "images/85/b85_02_04.png":
                img.attr("src", "images/85/b85_02_03.png");
                btn3.offset({left:pos_btnleft_outer, top:pos_btn3_top_outer}); 
                //btn4.css({top:pos_btn3_top_outer}); 
                break;
        }

        
    }
    
    function onClickBtn4() {

        var img = $(".img02").find("img");
        var curImgSrc = img.attr("src");

        switch (curImgSrc) {
            case "images/85/b85_02_01.png": 
                img.attr("src", "images/85/b85_02_04.png"); 
                btn4.offset({left:pos_btnright_inner, top:pos_btn3_bottom_inner}); 
                btn3.offset({top:pos_btn3_top_inner}); 
                break;
            case "images/85/b85_02_02.png":
                img.attr("src", "images/85/b85_02_03.png");
                btn4.offset({left:pos_btnright_inner, top:pos_btn3_bottom_inner}); 
                //btn1.css({top:pos_btn1_middle}); 
                break;
            case "images/85/b85_02_03.png":
                img.attr("src", "images/85/b85_02_02.png");
                btn4.offset({left:pos_btnright_outer, top:pos_btn3_bottom_outer}); 
                //btn1.css({top:pos_btn1_middle}); 
                break;
            case "images/85/b85_02_04.png":
                img.attr("src", "images/85/b85_02_01.png");
                btn4.offset({left:pos_btnright_outer, top:pos_btn3_middle}); 
                btn3.offset({top:pos_btn3_middle}); 
                break;
        }

    }




    var btn1;
    var btn2;
    var btn3;
    var btn4;


    function setpos() {

   

        var btn1Left = 246 * zoom; // btn1.offset().left; //240
        var btn1Top = 330 * zoom; //btn1.offset().top; // 330
        var btn3Top = 554 * zoom; // btn3.offset().top; // 555

        
        
        pos_btnleft_outer = btn1Left - 70 * zoom;
        pos_btnleft_inner = btn1Left;
        pos_btnright_inner = btn1Left + 180 * zoom;
        pos_btnright_outer = btn1Left + 250 * zoom;
    
        pos_btn1_top_outer = btn1Top - 25 * zoom;
        pos_btn1_top_inner = btn1Top - 20 * zoom;
        pos_btn1_middle = btn1Top;
        pos_btn1_bottom_inner = btn1Top + 15 * zoom;
        pos_btn1_bottom_outer = btn1Top + 25 * zoom;

        pos_btn3_top_outer = btn3Top - 25 * zoom;
        pos_btn3_top_inner = btn3Top - 20 * zoom;
        pos_btn3_middle = btn3Top;
        pos_btn3_bottom_inner = btn3Top + 15 * zoom;
        pos_btn3_bottom_outer = btn3Top + 25 * zoom;



        //alert("zoom " + zoom);
        //alert("btn1Left " + btn1Left);
        //alert("btn1Top " + btn1Top);
        //alert("pos_btnleft_outer " + pos_btnleft_outer);
    }

    $(function(){

        var btns = $(".btn_wrap").find(".btnClick");
        btn1 = btns.eq(0);
        btn2 = btns.eq(1);
        btn3 = btns.eq(2);
        btn4 = btns.eq(3);

        btn1.on("click", onClickBtn1);
        btn2.on("click", onClickBtn2);

        btn3.on("click", onClickBtn3);
        btn4.on("click", onClickBtn4);

        console.log(btn1);

        setpos();

        //var btn1Left = btn1[0].offsetLeft; //240
        //var btn1Top = btn1[0].offsetTop; // 330
        //var btn3Top = btn3[0].offsetTop; // 555

        

        /*
        var pos_btn1_top_outer = 305 * zoom;
        var pos_btn1_top_inner = 310 * zoom;
        var pos_btn1_middle = 330 / zoom;
        var pos_btn1_bottom_inner = 345 * zoom;
        var pos_btn1_bottom_outer = 355 * zoom;
    
        var pos_btn3_top_outer = 530 * zoom;
        var pos_btn3_top_inner = 535 * zoom;
        var pos_btn3_middle = 555 * zoom;
        var pos_btn3_bottom_inner = 570 * zoom;
        var pos_btn3_bottom_outer = 575 * zoom;
        */



        /*
        btn1.css({left:pos_btnleft_inner, top:pos_btn1_middle});
        btn2.css({left:pos_btnright_inner, top:pos_btn1_middle});

        btn3.css({left:pos_btnleft_inner, top:pos_btn3_middle});
        btn4.css({left:pos_btnright_outer, top:pos_btn3_middle});
        */
        $(".img02").on("click", function(e) {
            console.log(e);
        });

    });

})(jQuery);





/**
 * 수평잡기 팝업 조작부분
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
     
    
            left = left - touchOffsetLeft;
            top = top - touchOffsetTop;
    
            //alert(touchOffsetLeft);
            //alert(left);
    
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
    
    
            console.log(pos);
            
            //alert(clone.offset().left/zoom);
            //alert(pos.left);
            //alert(pos.left-clone.offset().left/zoom);
    
    
            clone.css({left:pos.left, top:pos.top});
            
            
    
            curBlock = clone;
            //$("body").append(clone);
            
            
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
            curBlock.rotate(0);
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
    
                    var top = 750;
                    var weight = 1;
                    if (curBlock.hasClass("img_block_double")) {
                        top = 725;
                        weight = 2;
                    }
    
                    // 이미 올라가있는 블럭이 있으면 안올림
                    if (typeof(arrBlock[boxBinder.index]) !== 'undefined') {
                        //curBlock.remove();
                        backToHome();
    
                    } else {
    
                        backToHome();
    
                        curBlock.css({left:boxBinder.left, top:top});
                        curBlock.data("weight", weight);
                        curBlock.data("left", boxBinder.left);
                        curBlock.data("top", top);
                        curBlock.data("index", boxBinder.index);
                        arrBlock[boxBinder.index] = curBlock;
    
                        
                        
                    }
                    
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
            // x start 180, y start 730
            // x end 630, y end 830
    
    
            // 195, 610, 38
    
            var offsetX = 37.72 / 1;
            var standardX = 195 / 1;
            
            // 세로축 안으로 들어옴
            if (pos.top >= 730/1 && pos.top <= 830/1) {
    
                // 가로축 안으로 들어옴
                if (pos.left >= 180/1 && pos.left <= 630/1) {
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
    
            function correct(block, level, deg, degDiff) {
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
    
                if (degDiff) {
                    block.animate({top:top}, 1000);
                } else {
                    block.css({top:top});
                }
                
            }
    
    
            var degDiff = deg != seesaw_deg;
            if (degDiff) {
                seesaw_deg = deg;
                
                $(".img04").rotate({
                    angle: 0,
                    animateTo:seesaw_deg,
                    easing : function(x, t, b, c, d) { 
                        //console.log("easing");
                        return b+(t/d)*c ; 
                    }
                });
    
    
                // box 돌리기
                for (var i = 0; i < 11; i++) {
                    if (arrBlock[i]) {
                        arrBlock[i].rotate({animateTo:seesaw_deg});
                    }
                }
                
            }
    
            var step = -15.5/zoom;
            for (var i = 0; i < 11; i++) {
                correct(arrBlock[i], step, deg, degDiff);
    
                step += 3.0/zoom;
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
            $(".img04").rotate(seesaw_deg);
    
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
        }

    
        /**
         * initialize
         */
        function init() {


/*
.imgbox.img06{position:absolute;top:447px;left:172px;}
.imgbox.img06 img{width:50px;height:71px;}
.imgbox.img07{position:absolute;top:449px;left:552px;}
.imgbox.img07 img{width:35px;height:71px;}
*/

    
            // 안내문구, 확인버튼 최초 감추기
            $(".finger").hide();
            $(".btn_ok_area").hide();

            $(".txt_answer").on("keydown", checkTextArea);
            $(".btn_ok_area").on(touchstart, onClickOk);

            var objBlocks = $(sBlock);
            initBlockPos(objBlocks);
    
            objBlocks.on(touchstart, onTouchStartBlock);
            $(sContainer).on(touchmove, onTouchMoveContainer);
    
            $(".btnReset").on(touchstart,reset);
    
            objBlocks.on(touchmove, onTouchMoveContainer);
            objBlocks.on(touchend, onTouchEndContainer);    
            if (!GameManager.event.isTouchDevice) {
                //clone.on(touchend, onTouchEndContainer);
            }
    
    
            if (GameManager.event.isTouchDevice) {
                
                //$(sContainer).on(touchend, onTouchEndContainer);    
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