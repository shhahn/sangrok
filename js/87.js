$(document).ready(function(){

	/* 버튼 컨트롤 */
	$(document).off().on("click",".btn",function(){
		var idx = $(this).index();
		//console.log(idx);

		if( idx == 0 ){			//실험관찰
			layer_open('view',0);

		} else if( idx == 1 ){	//실험관찰
			layer_open('view',1);

		} else if( idx == 3 ){	//보충심화
			layer_open('study',0);

		} else if( idx == 4 ){	//실행
			layerAclose();
			$('.zoom_img_wrap.a').show();
			mediaInit(0);

		}
	});

});