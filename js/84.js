$(document).ready(function(){

	/* 버튼 컨트롤 */
	$(document).off().on("click",".btn",function(){
		var idx = $(this).index();
		//console.log(idx);

		if( idx == 0 ){			//실험관찰
			layer_open('view',0);

		} else if( idx == 1 ){	//실험관찰
			layer_open('view',1);

		} else if( idx == 2 ){	//실험관찰
			layer_open('view',2);

		}
	});


});