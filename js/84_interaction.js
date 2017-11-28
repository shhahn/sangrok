(function($){

    /*
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
    */

    $(function(){

        setTimeout(function(){
            var rdd = new CRotateDragDrop({
                dropArea : '.drop_area',
                dragBox : '.drag_box',
                btnReset : '.btnReset',
                wrap : '.container'
            });
        }, 500);
        


        


    });

})(jQuery);