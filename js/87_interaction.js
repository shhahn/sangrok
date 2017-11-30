(function($){
    
        $(function(){
    
            $(".btn_ok").on("click", function(){
    
                var bidx1 = $(".drop_container_dummy1").find(".drop_space").data("bind-box-idx");
                var bidx2 = $(".drop_container_dummy2").find(".drop_space").data("bind-box-idx");
                var bidx3 = $(".drop_container_dummy3").find(".drop_space").data("bind-box-idx");
    
                console.log(bidx1);
                console.log(bidx2);
                console.log(bidx3);
    
                if (typeof(bidx1) != 'undefined' && typeof(bidx2) != 'undefined' && typeof(bidx3) != 'undefined') {
    
                    if (bidx1 == 1 && bidx2 == 2 && bidx3 == 0) {
                        $(".img_cong").fadeIn();
                    } else {
                        alert("틀렸습니다.");
                    }
    
                } else {
                    alert("물체를 모두 넣어주세요");
                }
    
            });
    
            //$(".drop_area").rotate(8);
    
            setTimeout(function(){
                var rdd = new CRotateDragDrop({
                    dropArea : '.drop_area',
                    dragBox : '.drag_box',
                    btnReset : '.btnReset',
                    wrap : '.container'
                });
    
                rdd.decision();
    
    
                
    
                
    
                //console.log(rdd);
    
            }, 500);
    
    
    
            var to = setInterval(function(){
                
                //console.log($(".study").css("display") );
                if ($(".study").css("display") == 'block') {
    
                    //console.log("dddd");
                    setTimeout(function(){
                        var rdd2 = new CRotateDragDrop({
                            dropArea : '.drop_area2',
                            dragBox : '.drag_box2',
                            btnReset : '.btnReset',
                            wrap : '.layer_wrap'
                        });
                    }, 500);
                    
    
                    clearInterval(to);
                }
    
            }, 500);
    
        });
    
    })(jQuery);