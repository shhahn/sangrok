(function($){
    
    var dv = {
        log : function(txt) {

            if (typeof($("#_debugView")[0]) === 'undefined'){
                var view = "<div id='_debugView'></div>";
                var $view = $(view);

                $view.css({
                    'position' : 'absolute',
                    'display' : 'block',
                    'left' : 0,
                    'top' : 0,
                    'z-index' : 10000,
                    'width' : 600,
                    'height' : 600
                });

                $('body').append($view);
            }


            $("#_debugView").html(txt);

        }
    };


    window.debugView = dv;
})(jQuery);