(function($){


    /**
     * 지연 초기화
     */
    function init_delay() {

        //$(".card_image > ul > li").eq(0).css({ perspective: 100, rotateX: 30 }); // Webkit 3d rotation

        var ttt = $(".card_image > ul > li").eq(0);

        //ttt.rotate(10);
        //ttt.flip();
        ttt.trigger("click");
        //ttt.animate({rotate: '120'}, 2000);
    }

    /**
     * 초기화
     */
    function init() {
        setTimeout(init_delay, 1000);

        // 축하 메세지 감추기
        $(".img_cong").hide();

        var ttt = $(".card_image > ul > li").eq(0);
        ttt.flip();

    }

    $(function(){
        //init();

        $(".btn_open_layer").click(function(){

            init();
        });

    });

})(jQuery);