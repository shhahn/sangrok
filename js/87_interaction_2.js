(function($){

    $(function(){


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