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
    });


    var pos_btnleft_outer = 180 / zoom;
    var pos_btnleft_inner = 240 / zoom;
    var pos_btnright_inner = 430 / zoom;
    var pos_btnright_outer = 490 / zoom;

    var pos_btn1_top_outer = 305 / zoom;
    var pos_btn1_top_inner = 310 / zoom;
    var pos_btn1_middle = 330 / zoom;
    var pos_btn1_bottom_inner = 345 / zoom;
    var pos_btn1_bottom_outer = 355 / zoom;


    var pos_btn3_top_outer = 530 / zoom;
    var pos_btn3_top_inner = 535 / zoom;
    var pos_btn3_middle = 555 / zoom;
    var pos_btn3_bottom_inner = 570 / zoom;
    var pos_btn3_bottom_outer = 575 / zoom;

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

        switch (curImgSrc) {
            case "images/85/b85_01_01.png": 
                img.attr("src", "images/85/b85_01_03.png"); 
                btn1.css({left:pos_btnleft_outer, top:pos_btn1_top_outer}); 
                btn2.css({top:pos_btn1_bottom_inner}); 
                break;
            case "images/85/b85_01_02.png":
                img.attr("src", "images/85/b85_01_04.png");
                btn1.css({left:pos_btnleft_outer, top:pos_btn1_middle}); 
                btn2.css({top:pos_btn1_middle}); 
                break;
            case "images/85/b85_01_03.png":
                img.attr("src", "images/85/b85_01_01.png");
                btn1.css({left:pos_btnleft_inner, top:pos_btn1_middle}); 
                btn2.css({top:pos_btn1_middle}); 
                break;
            case "images/85/b85_01_04.png":
                img.attr("src", "images/85/b85_01_02.png");
                btn1.css({left:pos_btnleft_inner, top:pos_btn1_bottom_inner}); 
                btn2.css({top:pos_btn1_top_outer}); 
                break;
        }

        
    }

    function onClickBtn2() {

        var img = $(".img01").find("img");
        var curImgSrc = img.attr("src");

        switch (curImgSrc) {
            case "images/85/b85_01_01.png": 
                img.attr("src", "images/85/b85_01_02.png"); 
                btn2.css({left:pos_btnright_outer, top:pos_btn1_top_outer}); 
                btn1.css({top:pos_btn1_bottom_inner}); 
                break;
            case "images/85/b85_01_02.png":
                img.attr("src", "images/85/b85_01_01.png");
                btn2.css({left:pos_btnright_inner, top:pos_btn1_middle}); 
                btn1.css({top:pos_btn1_middle}); 
                break;
            case "images/85/b85_01_03.png":
                img.attr("src", "images/85/b85_01_04.png");
                btn2.css({left:pos_btnright_outer, top:pos_btn1_middle}); 
                btn1.css({top:pos_btn1_middle}); 
                break;
            case "images/85/b85_01_04.png":
                img.attr("src", "images/85/b85_01_03.png");
                btn2.css({left:pos_btnright_inner, top:pos_btn1_bottom_inner}); 
                btn1.css({top:pos_btn1_top_outer}); 
                break;
        }

    }




    function onClickBtn3(e) {
        
            var img = $(".img02").find("img");
            var curImgSrc = img.attr("src");
    
            switch (curImgSrc) {
                case "images/85/b85_02_01.png": 
                    img.attr("src", "images/85/b85_02_02.png"); 
                    btn3.css({left:pos_btnleft_outer, top:pos_btn3_top_outer}); 
                    btn4.css({top:pos_btn3_bottom_outer}); 
                    break;
                case "images/85/b85_02_02.png":
                    img.attr("src", "images/85/b85_02_01.png");
                    btn3.css({left:pos_btnleft_inner, top:pos_btn3_middle}); 
                    btn4.css({top:pos_btn3_middle}); 
                    break;
                case "images/85/b85_02_03.png":
                    img.attr("src", "images/85/b85_02_04.png");
                    btn3.css({left:pos_btnleft_inner, top:pos_btn3_top_inner}); 
                    //btn4.css({top:pos_btn1_middle}); 
                    break;
                case "images/85/b85_02_04.png":
                    img.attr("src", "images/85/b85_02_03.png");
                    btn3.css({left:pos_btnleft_outer, top:pos_btn3_top_outer}); 
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
                    btn4.css({left:pos_btnright_inner, top:pos_btn3_bottom_inner}); 
                    btn3.css({top:pos_btn3_top_inner}); 
                    break;
                case "images/85/b85_02_02.png":
                    img.attr("src", "images/85/b85_02_03.png");
                    btn4.css({left:pos_btnright_inner, top:pos_btn3_bottom_inner}); 
                    //btn1.css({top:pos_btn1_middle}); 
                    break;
                case "images/85/b85_02_03.png":
                    img.attr("src", "images/85/b85_02_02.png");
                    btn4.css({left:pos_btnright_outer, top:pos_btn3_bottom_outer}); 
                    //btn1.css({top:pos_btn1_middle}); 
                    break;
                case "images/85/b85_02_04.png":
                    img.attr("src", "images/85/b85_02_01.png");
                    btn4.css({left:pos_btnright_outer, top:pos_btn3_middle}); 
                    btn3.css({top:pos_btn3_middle}); 
                    break;
            }
    
        }




    var btn1;
    var btn2;
    var btn3;
    var btn4;

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


        btn1.css({left:pos_btnleft_inner, top:pos_btn1_middle});
        btn2.css({left:pos_btnright_inner, top:pos_btn1_middle});

        btn3.css({left:pos_btnleft_inner, top:pos_btn3_middle});
        btn4.css({left:pos_btnright_outer, top:pos_btn3_middle});

        $(".img02").on("click", function(e) {
            console.log(e);
        });

    });

})(jQuery);