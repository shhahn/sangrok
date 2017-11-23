(function($){

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


    $(function(){

        


        $(".img_block").draggable({

            start : function (e, ui) {

                ui.position.top /= zoom;
                ui.position.left /= zoom;

            },

            drag : function (e, ui) {
                ui.position.top /= zoom;
                ui.position.left /= zoom;
            },

            stop : function (e, ui) {
                ui.position.top /= zoom;
                ui.position.left /= zoom;

            }

        });


        $( ".drop_area" ).droppable({
            drop: function( event, ui ) {

                console.log("drop!!");
                debugView.log("dropt!!");
                $( this )
                    .addClass( "ui-state-highlight" )
                    .find( "p" )
                    .html( "Dropped!" );
            }
        });


    });

})(jQuery);