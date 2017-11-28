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


    function resetBtnPos(el) {
        el.removeClass("btn1_inner_mid");
        el.removeClass("btn1_inner_bottom");
        el.removeClass("btn1_outer_top");
        el.removeClass("btn1_outer_top");

        el.removeClass("btn2_inner_mid");
        el.removeClass("btn2_inner_bottom");
        el.removeClass("btn2_outer_mid");
        el.removeClass("btn2_outer_top");

        el.removeClass("btn3_inner_mid");
        el.removeClass("btn3_inner_top");
        el.removeClass("btn3_outer_top");

        el.removeClass("btn4_inner_bottom");
        el.removeClass("btn4_outer_mid");
        el.removeClass("btn4_outer_bottom");

        return el;
    }

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
                resetBtnPos(btn1).addClass("btn1_outer_top");
                resetBtnPos(btn2).addClass("btn2_inner_bottom");
                //btn1.offset({left:pos_btnleft_outer, top:pos_btn1_top_outer}); 
                //btn2.offset({top:pos_btn1_bottom_inner}); 
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


            if (typeof(rdd) == 'undefined') {
                rdd = new CRotateDragDrop({
                    dropArea : '.drop_area',
                    dragBox : '.drag_box',
                    btnReset : '.btnReset',
                    wrap : '.layer_wrap'
                });
            } else {
                rdd.reset();
            }

            //initBlockPos($(sBlock));
        }

    
        var rdd;

        /**
         * initialize
         */
        function init() {

            // 안내문구, 확인버튼 최초 감추기
            $(".finger").hide();
            $(".btn_ok_area").hide();

            $(".txt_answer").on("keydown", checkTextArea);
            $(".btn_ok_area").on("click", onClickOk);

            
            
    
        }
    
        /**
         * document load event
         */
        $(function(){
    
            init();
            
    
        });
    
    
    })(jQuery);