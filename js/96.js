$(document).ready(function(){

	/* 버튼 컨트롤 */
	$(document).off().on("click",".btn",function(){
		var idx = $(this).index();
		//console.log(idx);

		if( idx == 0 ){			//보충심화
			layer_open('study',0);

		}
	});

	var imgIdx = 0;
	$(".earth").off().on("click",function(){
		var idx = $(this).index();
		idx = idx + 1;
		console.log(idx);
		if($(this).children("img").length<=0){
			$(this).html("<img src='' />");
		}	

		if(imgIdx <= 3){
			imgIdx = imgIdx + 1;		
			$(this).children("img").attr("src","./images/p96/p96_"+ idx +"_0"+ imgIdx +".jpg");

		} else {			
			$(this).html("");
			imgIdx = 0;
		}

		console.log(imgIdx);
		
	});

});

