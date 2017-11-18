(function($){



    $(function(){

        $(".img_block").draggable({

            start : function (e, ui) {


                console.log(e);
                console.log(ui);

                ui.position.top -= 200;
            },

            drag : function (e, ui) {
                ui.position.top -= 200;
            },

            stop : function (e, ui) {
                ui.position.top -= 200;

            }

        });


        $( ".drop_area" ).droppable({
            drop: function( event, ui ) {

                console.log("drop!!");
                $( this )
                    .addClass( "ui-state-highlight" )
                    .find( "p" )
                    .html( "Dropped!" );
            }
        });


    });

})(jQuery);