/**
 * jquery shuffle
 */
(function(d){d.fn.shuffle=function(c){c=[];return this.each(function(){c.push(d(this).clone(true))}).each(function(a,b){d(b).replaceWith(c[a=Math.floor(Math.random()*c.length)]);c.splice(a,1)})};d.shuffle=function(a){return d(a).shuffle()}})(jQuery);

(function($){



    var curCardImage;
    var curCardTxt;

    var doingGame = false;

    var msTimeMax = 3 * 60 * 1000;
    var msTime = msTimeMax;

    var timeObj;


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
     * 
     */
    function checkClear() {

        if (!doingGame) return;


        var answer = $(".card_image > ul > li.true");

        if (answer.length == 9) {
            // 소리?
            $(".img_cong").fadeIn();
            doingGame = false;
        }


        if (msTime <= 0) {
            alert("실패");
            doingGame = false;
            //reset();
            return;
        }

        var sTime = msTime / 1000;
        var second = sTime % 60;
        var minute = (sTime - second) / 60;

        //console.log(sTime);

        second += "";
        minute += "";

        if (second.length == 1) second = "0" + second;
        if (minute.length == 1) minute = "0" + minute;

        var timeBox = $(".num").find("span");

        $(timeBox[0]).text(minute);
        $(timeBox[1]).text(second);

    }

    /**
     * 지연 초기화
     */
    function init_delay() {

        $(".card_image > ul > li").flip(true);
        $(".card_txt > ul > li").flip(true, function(){
            doingGame = true;

            if (timeObj) clearInterval(timeObj);
            msTime = msTimeMax;
            checkClear();
            timeObj = setInterval(function(){
                msTime -= 1000;
                checkClear();
            }, 1000);

        });

        //$(".screen").fadeIn();
        

        //console.log("init delay");
        
    }

    /**
     * 리셋
     */
    function reset() {
        
        if (timeObj) clearInterval(timeObj);
        msTime = msTimeMax;
        checkClear();

        doingGame = false;
        $(".img_cong").hide();

        $(".card_image > ul > li").remove();
        $(".card_txt > ul > li").remove();

        $(".card_image > ul").append(cardImageClone.clone());
        $(".card_txt > ul").append(cardtxtClone.clone());

        $(".card_image > ul > li").shuffle();
        $(".card_txt > ul > li").shuffle();
        $(".card_image > ul > li").off(".flip").flip({trigger:'manual'});
        $(".card_txt > ul > li").off(".flip").flip({trigger:'manual'});

        $(".card_image > ul > li").flip(false);

        $(".card_image > ul > li").on("click", onClickImage);
        $(".card_txt > ul > li").on("click", onClickTxt);

        curCardImage = undefined;
        curCardTxt = undefined;

        //console.log("reset");

        setTimeout(init_delay, 3000);
    }

    var cardImageClone;
    var cardtxtClone;

    /**
     * 초기화
     */
    function init() {
        
        cardImageClone = $(".card_image > ul > li").clone();
        cardtxtClone = $(".card_txt > ul > li").clone();

        

        

        $(".btnReset").on("click", reset);
        

        //reset();

    }

    $(function(){
        init();

        

        $(".btn_open_layer").click(function(){

            reset();
        });

    });

})(jQuery);