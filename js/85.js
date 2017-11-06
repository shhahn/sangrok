$(document).ready(function(){

	/* 버튼 컨트롤 */
	$(document).off().on("click",".btn",function(){
		var idx = $(this).index();
		//console.log(idx);

		if( idx == 4 ){			//실험관찰
			layer_open('view',0);

		}
	});


});