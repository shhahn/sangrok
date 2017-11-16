/**
 * jquery shuffle
 */
(function(d){d.fn.shuffle=function(c){c=[];return this.each(function(){c.push(d(this).clone(true))}).each(function(a,b){d(b).replaceWith(c[a=Math.floor(Math.random()*c.length)]);c.splice(a,1)})};d.shuffle=function(a){return d(a).shuffle()}})(jQuery);

(function($){



    var curCardImage;
    var curCardTxt;

    var doingGame = false;


    function matching() {

        if (!doingGame) return;
        if (typeof(curCardImage) === 'undefined') return;
        if (typeof(curCardTxt) === 'undefined') return;

        for (var i = 1; i < 10; i++) {
            var cardImageClass = "card_image"+i;
            var cardTxtClass = "card_txt"+i;
            if (curCardImage.find(".front").hasClass(cardImageClass)) {
                if (curCardTxt.find(".front").hasClass(cardTxtClass)) {
                    // 정답 처리 
                    curCardImage.find(".screen").fadeIn(function(){
                        curCardImage.addClass("true");
                        curCardImage = undefined;
                    });

                    curCardTxt.find(".screen").fadeIn(function(){
                        curCardTxt.addClass("true");
                        curCardTxt = undefined;
                    });

                    return;
                }
                break;
            }
        }

        // 원복
        setTimeout(function(){
            curCardImage.flip(true, function(){
                curCardImage = undefined;
            });
            curCardTxt.flip(true, function(){
                curCardTxt = undefined;
            });
        },1000);
        
        

    }

    /**
     * 이미지 클릭
     */
    function onClickImage () {

        // 게임 중 이 아니면 종료 
        if (!doingGame) return;

        var cardImage = $(this);
        
        // 이미 돌아간 이미지면 종료 
        if (cardImage.hasClass("true")) return;

        // 현재 뒤집힌 카드가 있으면 다시 뒤집기
        if (typeof(curCardImage) !== 'undefined') {
            if (typeof(curCardTxt) !== 'undefined') {
                return;
            }
            curCardImage.flip(true);
        }

        curCardImage = cardImage;
        curCardImage.flip(false, function(){
            matching();
        });

        
        
    }

    function onClickTxt() {

        // 게임 중 이 아니면 종료 
        if (!doingGame) return;
        
        var cardTxt = $(this);
        
        // 이미 돌아간 이미지면 종료 
        if (cardTxt.hasClass("true")) return;

        // 현재 뒤집힌 카드가 있으면 다시 뒤집기
        if (typeof(curCardTxt) !== 'undefined') {
            if (typeof(curCardImage) !== 'undefined') {
                return;
            }
            curCardTxt.flip(true);
        }

        curCardTxt = cardTxt;
        curCardTxt.flip(false, function(){
            matching();
        });
    }

    /**
     * 지연 초기화
     */
    function init_delay() {

        $(".card_image > ul > li").flip(true);
        $(".card_txt > ul > li").flip(true, function(){doingGame = true;});

        //$(".screen").fadeIn();
        
    }

    /**
     * 초기화
     */
    function init() {
        setTimeout(init_delay, 3000);

        // 축하 메세지 감추기
        $(".img_cong").hide();

        $(".card_image > ul > li").shuffle();
        $(".card_txt > ul > li").shuffle();
        $(".card_image > ul > li").flip({trigger:'manual'});
        $(".card_txt > ul > li").flip({trigger:'manual'});

        $(".card_image > ul > li").on("click", onClickImage);
        $(".card_txt > ul > li").on("click", onClickTxt);

    }

    $(function(){
        //init();

        $(".btn_open_layer").click(function(){

            init();
        });

    });

})(jQuery);