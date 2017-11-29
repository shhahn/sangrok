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

    });

})(jQuery);