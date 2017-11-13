(function($){

    "use strict";

    /**
     * 같은 몸무게 이미지
     */
    function changeImage1() {

        // case1 (기본)   

    }

    function onClickBtn1() {
        
    }

    function onClickBtn2() {

    }

    $(function(){

        var btns = $(".btn_wrap").find(".btnClick");
        var btn1 = btns.eq(0);
        var btn2 = btns.eq(1);
        var btn3 = btns.eq(2);
        var btn4 = btns.eq(3);

        btn1.on("click", onClickBtn1);

    });

})(jQuery);