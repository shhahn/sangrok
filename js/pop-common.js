/*
std : 기본문제
add : 보충문제
deep : 심화문제
note-exp : 실험관찰 탐구활동
addDeep: 보충심화
*/

/*
quiz : 마무리퀴즈
try : 스스로해보기
note : 실험관찰
ico : 심화학습
think : 생각해보기
*/

/*신규 문제풀이
s_accept : 도전 맞혀보기
s_quiz : 시작퀴즈
e_quiz : 마무리퀴즈
e_finish : 단원마무리
*/


/* monitor */
consoleLog=function(msg){
	console.log(msg);
}


var timing=100;
var tab_index=0;
var tmpSelector="normal";


// Process //
//$(document).ready(function(){
$(document).ready(function(){
	
	
	
	$(".ui-resizable-handle").remove();
	$(".ui-icon-closethick").remove();

	//$(".pop-dialog,.pop-dialog-sub-add,.pop-dialog-sub-deep").dialog({
	$(".pop-dialog").dialog({
		
		autoOpen: false,
		resizable: false,
		modal: true,
		draggable:false,
		position: [0,0],
		//position: [12,12],
		width: 664,
		height: 853,
		/*
		autoOpen: false,
		modal: true,
		width: 768,
		height: 1024,
		draggable:false,
		position: [0,0],
		hide:"fade",
		*/
		// beforeClose: function(event, ui) {
		// 	$(this).fadeOut(1000);
		// }
		// buttons: {
		// 	"Dismiss": function() {
		// 		$(this).dialog("close");
		// 	}
		// }
		open:function(event, ui){
			//_trigger_setValue();
			
			//일반팝업 닫기
			$(".ui-dialog-titlebar-close").on("click",function () {
				//add user answer Save
				//_Call_User_answer_save();
				//$(".pop-dialog,.pop-dialog-sub-add,.pop-dialog-sub-deep").dialog('close');
				$(".pop-dialog").dialog('close'); //일반팝업 닫기
				$(".pop-container").remove();
				AllOff();
				var type="";
				var mode="";
				var URL="";
				var tabs="";
				var pageTitle="";
				_setBasePopPage(type,mode,URL,tabs,pageTitle);
			});

			//대단원 마무리 닫기
			$(document).on("click",".wrap.final .p-right",function () {
				//add user answer Save
				//_Call_User_answer_save();
				//$(".pop-dialog,.pop-dialog-sub-add,.pop-dialog-sub-deep").dialog('close');
				$(".pop-dialog").dialog('close');
				$(".pop-container").remove();
				AllOff();
				var type="";
				var mode="";
				var URL="";
				var tabs="";
				var pageTitle="";
				_setBasePopPage(type,mode,URL,tabs,pageTitle);
			});
		}
	});




	_callQuestionFin=function(type,mode,URL,tabs,pageTitle){
		$(".ui-resizable-handle").remove();
		$(".ui-icon-closethick").remove();
		$(".ui-dialog-titlebar-close").html("<img src=\"images/pop-common/pop_top_close_g.png\" alt=\"문제닫기\" />");
		//$(".pop-dialog,.pop-dialog-sub-add,.pop-dialog-sub-deep").html("");


  		$title="<img src=\"images/pop-common/pop-doc-title-final.png\" alt=\"마무리퀴즈\" />";
  		$setClass=".pop-dialog";
  		//$docType=obj.attr("data-docType");
  		$docType=type;
		$mode=mode;
  		if($docType=="quiz"){
  			$title="<img src=\"images/pop-common/pop-doc-title-final.png\" alt=\"마무리퀴즈\" />";
  		}else if($docType=="try"){
  			$title="<img src=\"images/pop-common/pop-doc-title-self.png\" alt=\"스스로 해보기\" />";
  		}else if($docType=="note"){
  			if(mode=="std"){
  				$title="<img src=\"images/pop-common/pop-doc-title-note.png\" alt=\"실험관찰\" />";
  			}else if(mode=="note-exp"){
  				$title="<img src=\"images/pop-common/pop-doc-title-note-exp.png\" alt=\"실험관찰 : 탐구활동\" />";
  			}
  		}else if($docType=="wonder"){
  			$title="<img src=\"images/pop-common/pop-doc-title-question.png\" alt=\"궁금해요\" />";
  		}else if($docType=="ico"){
  			$title="<img src=\"images/pop-common/pop-doc-title-ico.png\" alt=\"심화학습\" />";
  		
		//신규문제풀이 추가
		}else if($docType=="s_accept"){
  			$title="<img src=\"images/pop-common/pop-doc-title-ico.png\" alt=\"도전 맞혀보기\" />";
		}else if($docType=="s_quiz"){
  			$title="<img src=\"images/pop-common/pop-doc-title-ico.png\" alt=\"시작퀴즈\" />";
		}else if($docType=="e_quiz"){
  			$title="<img src=\"images/pop-common/pop-doc-title-ico.png\" alt=\"마무리퀴즈\" />";
		}else if($docType=="e_finish"){
  			$title="<img src=\"images/pop-common/pop-doc-title-ico.png\" alt=\"단원마무리\" />";
		}else{
  			//return;
  		}


  		if(pageTitle){
  			$title+="<span class=\"pageTitle\">"+pageTitle+"</span>";
  		}


		// if(mode=="std"){ //기본문제
		// 	$setClass=".pop-dialog";
		// }else if(mode=="add"){ //보충문제
		// 	$setClass=".pop-dialog-sub-add";
		// }else if(mode=="deep"){ //심화문제
		// 	$setClass=".pop-dialog-sub-deep";
		// }
		$setClass=".pop-dialog";

		$($setClass).dialog("open");

		//윈도우 10
		if(WindowsTenOS){
			var opt = { autoOpen:false, resizable:false, modal:true, draggable:false, position:[0,0], width:664, height:853 }; $($setClass).dialog(opt).dialog("open"); //$($setClass).dialog("open");
		}else{
			$($setClass).dialog("open");
		}
		$objURL=URL;

		//$($setClass).fadeOut(0,function(){
			$($setClass).load($objURL, function() {
				//$(this).dialog("option", "title", $title);
				$(this).dialog({
					"title":$title
				});
				$($setClass).fadeIn(timing,function(){});


				finButtonSet();
				
				_trigger_setValue();

			});
		//});
		$(".ui-resizable-handle").remove();
		$(".ui-icon-closethick").remove();
		$(".ui-widget-header").hide();
		_setBasePopPage(type,mode,URL,tabs,pageTitle);
	}


	//팝업 페이지
	_callQuestionManual=function(type,mode,URL,tabs,pageTitle){

		if(type=="think" || type=="challenge"){
			tmpSelector="special";
		}else{
			tmpSelector="normal";
		}

		/* blur 20140115 //input 이벤트가 아님에도 , focus 가 올라오는 경우 제거해야됨 */
		$("textarea").blur();
		$("input").blur();
		//_Call_User_answer_save();
		tab_index=tabs;

		$(".ui-resizable-handle").remove();
		$(".ui-icon-closethick").remove();
		//$(".ui-dialog-titlebar-close").html("<img src=\"images/pop-common/pop_top_close_g.png\" alt=\"문제닫기\" />");
		//$(".pop-dialog,.pop-dialog-sub-add,.pop-dialog-sub-deep").html("");


  		$title="<img src=\"images/pop-common/pop_tit_quiz_finish.png\" alt=\"마무리퀴즈\" />";
  		$setClass=".pop-dialog";
  		//$docType=obj.attr("data-docType");
  		$docType=type;
		$mode=mode;
  		if($docType=="quiz"){
  			$(".ui-dialog").css("background","url(images/pop-common/bg_wrap_quiz_start.png)");
			$title="<img src=\"images/pop-common/pop_tit_quiz_start.png\" alt=\"마무리퀴즈\" />";
			$(".ui-dialog-titlebar-close").html("<img src=\"images/pop-common/pop_top_close_o.png\" alt=\"문제닫기\" />");
			
  		}else if($docType=="try"){
  			$(".ui-dialog").css("background","url(images/pop-common/bg_wrap_cre_up.png)");
			$title="<img src=\"images/pop-common/pop_tit_inq_atv.png\" alt=\"혼자 해보기\" />";
			$(".ui-dialog-titlebar-close").html("<img src=\"images/pop-common/pop_top_close_g.png\" alt=\"문제닫기\" />");
		
		}else if($docType=="note"){
  			$(".ui-dialog").css("background","url(images/pop-common/bg_wrap_cre_up.png)");
			if(mode=="std"){
  				$title="<img src=\"images/pop-common/pop_tit_inq_atv.png\" alt=\"탐구활동\" />";
  			}else if(mode=="note-exp"){
  				$title="<img src=\"images/pop-common/pop_tit_inq_atv.png\" alt=\"탐구활동\" />";
  			}
			$(".ui-dialog-titlebar-close").html("<img src=\"images/pop-common/pop_top_close_g.png\" alt=\"문제닫기\" />");
		}else if($docType=="note2"){
  			$(".ui-dialog").css("background","url(images/pop-common/bg_wrap_cre_up.png)");
			if(mode=="std"){
  				$title="<img src=\"images/pop-common/pop_tit_inq_atv.png\" alt=\"탐구활동\" />";
  			}else if(mode=="note-exp"){
  				$title="<img src=\"images/pop-common/pop_tit_inq_atv.png\" alt=\"탐구활동\" />";
  			}
			$(".ui-dialog-titlebar-close").html("<img src=\"images/pop-common/pop_top_close_g.png\" alt=\"문제닫기\" />");
		}else if($docType=="note3"){
  			$(".ui-dialog").css("background","url(images/pop-common/bg_wrap_cre_up.png)");
			if(mode=="std"){
  				$title="<img src=\"images/pop-common/pop_tit_inq_atv.png\" alt=\"탐구활동\" />";
  			}else if(mode=="note-exp"){
  				$title="<img src=\"images/pop-common/pop_tit_inq_atv.png\" alt=\"탐구활동\" />";
  			}
			$(".ui-dialog-titlebar-close").html("<img src=\"images/pop-common/pop_top_close_g.png\" alt=\"문제닫기\" />");
  		}else if($docType=="wonder"){
  			$(".ui-dialog").css("background","url(images/pop-common/bg_wrap_cre_up.png)");
			$title="<img src=\"images/pop-common/pop_tit_inq_atv.png\" alt=\"궁금해요\" />";
			$(".ui-dialog-titlebar-close").html("<img src=\"images/pop-common/pop-common/pop_top_close_g.png\" alt=\"문제닫기\" />");
  		}else if($docType=="ico"){
  			$(".ui-dialog").css("background","url(images/pop-common/bg_wrap_cre_up.png)");
			$title="<img src=\"images/pop-common/pop_tit_inq_atv.png\" alt=\"심화학습\" />";
			$(".ui-dialog-titlebar-close").html("<img src=\"images/pop-common/pop_top_close_g.png\" alt=\"문제닫기\" />");

  		}else if($docType=="think"){
  			$(".ui-dialog").css("background","url(images/pop-common/bg_wrap_think_open.png)");
			$title="<img src=\"images/pop-common/pop_tit_think_open.png\" alt=\"생각열기\" />";
			$(".ui-dialog-titlebar-close").html("<img src=\"images/pop-common/pop_top_close_g.png\" alt=\"문제닫기\" />");
		
		}else if($docType=="thinkfin"){
  			$(".ui-dialog").css("background","url(images/pop-common/bg_wrap_think_finish.png)");
			$title="<img src=\"images/pop-common/pop_tit_think_finish.png\" alt=\"생각마무리\" />";
			$(".ui-dialog-titlebar-close").html("<img src=\"images/pop-common/pop_top_close_p.png\" alt=\"문제닫기\" />");
				
  		}else if($docType=="challenge"){
  			$(".ui-dialog").css("background","url(images/pop-common/bg_wrap_challenge.png)");
			$title="<img src=\"images/pop-common/pop_tit_challenge.png\" alt=\"도전 맞춰보기\" />";
			$(".ui-dialog-titlebar-close").html("<img src=\"images/pop-common/pop_top_close_g.png\" alt=\"문제닫기\" />");
		
		}else if($docType=="creup"){
  			$(".ui-dialog").css("background","url(images/pop-common/bg_wrap_cre_up.png)");
			$title="<img src=\"images/pop-common/pop_tit_cre_up.png\" alt=\"창의력 UP!\" />";
			$(".ui-dialog-titlebar-close").html("<img src=\"images/pop-common/pop_top_close_p.png\" alt=\"문제닫기\" />");
			
		}else if($docType=="inquiry"){
  			$(".ui-dialog").css("background","url(images/pop-common/bg_wrap_inq_free.png)");
			$title="<img src=\"images/pop-common/pop_tit_inq_free.png\" alt=\"자유탐구\" />";
			$(".ui-dialog-titlebar-close").html("<img src=\"images/pop-common/pop_top_close_o.png\" alt=\"문제닫기\" />");
		
		}else if($docType=="cretwn"){
  			$(".ui-dialog").css("background","url(images/pop-common/bg_wrap_cre_twn.png)");
			$title="<img src=\"images/pop-common/pop_tit_cre_twn.png\" alt=\"창의가 반짝\" />";
			$(".ui-dialog-titlebar-close").html("<img src=\"images/pop-common/pop_top_close_o.png\" alt=\"문제닫기\" />");
			
		}else if($docType=="inqsuksuk"){
  			$(".ui-dialog").css("background","url(images/pop-common/bg_wrap_inq_suk.png)");
			$title="<img src=\"images/pop-common/pop_tit_inq_suk.png\" alt=\"탐구가 쑥쑥\" />";
			$(".ui-dialog-titlebar-close").html("<img src=\"images/pop-common/pop_top_close_g.png\" alt=\"문제닫기\" />");
			
		}else if($docType=="speed"){
  			$(".ui-dialog").css("background","url(images/pop-common/bg_wrap_cre_up.png)");
			$title="<img src=\"images/pop-common/pop_tit_inq_atv.png\" alt=\"속력비교\" />";
			$(".ui-dialog-titlebar-close").html("<img src=\"images/pop-common/pop_top_close_g.png\" alt=\"문제닫기\" />");
			
		}else if($docType=="car"){
  			$(".ui-dialog").css("background","url(images/pop-common/bg_wrap_cre_up.png)");
			$title="<img src=\"images/pop-common/pop_tit_inq_atv.png\" alt=\"자동차경주\" />";
			$(".ui-dialog-titlebar-close").html("<img src=\"images/pop-common/pop_top_close_g.png\" alt=\"문제닫기\" />");
			
		}else if($docType=="chapter"){
  			$(".ui-dialog").css("background","url(images/pop-common/bg_wrap_unit_finish.png)");
			$title="<img src=\"images/pop-common/pop_tit_unit_finish.png\" alt=\"단원마무리\" />";
			$(".ui-dialog-titlebar-close").html("<img src=\"images/pop-common/pop_top_close_o.png\" alt=\"문제닫기\" />");
		
		}else if($docType=="do"){
  			$(".ui-dialog").css("background","url(images/pop-common/bg_wrap_plus.png) no-repeat 0 0");
			$title="<img src=\"images/pop-common/pop_tit_plus.png\" alt=\"더 알아보기\" />";
			$(".ui-dialog-titlebar-close").html("<img src=\"images/pop-common/pop_top_close_g.png\" alt=\"문제닫기\" />");
			
  		
//신규문제풀이 추가
		}else if($docType=="s_accept"){
  			//팝업배경
			$(".ui-dialog").css("background","url(images/pop-common/bg_wrap_challenge.png)");
			
			$title="<img src=\"images/pop-common/pop_tit_challenge.png\" alt=\"도전 맞혀보기\" />";
			$(".ui-dialog-titlebar-close").html("<img src=\"images/pop-common/pop_top_close_g.png\" alt=\"문제닫기\" />");
		}else if($docType=="s_quiz"){
  			$(".ui-dialog").css("background","url(images/pop-common/bg_wrap_quiz_start.png)");
			$title="<img src=\"images/pop-common/pop_tit_quiz_start.png\" alt=\"시작퀴즈\" />";
			$(".ui-dialog-titlebar-close").html("<img src=\"images/pop-common/pop_top_close_o.png\" alt=\"문제닫기\" />");
		}else if($docType=="e_quiz"){
  			$(".ui-dialog").css("background","url(images/pop-common/bg_wrap_quiz_finish.png) no-repeat");
			$title="<img src=\"images/pop-common/pop_tit_quiz_finish.png\" alt=\"마무리퀴즈\" />";
			$(".ui-dialog-titlebar-close").html("<img src=\"images/pop-common/pop_top_close_p.png\" alt=\"문제닫기\" />");		
		}else if($docType=="e_finish"){
  			$(".ui-dialog").css("background","url(images/pop-common/bg_wrap_unit_finish.png)");
			$title="<img src=\"images/pop-common/pop_tit_unit_finish.png\" alt=\"단원마무리\" />";
			$(".ui-dialog-titlebar-close").html("<img src=\"images/pop-common/pop_top_close_o.png\" alt=\"문제닫기\" />");
		}else if($docType=="basics"){
  			$(".ui-dialog").css("background","url(images/pop-common/bg_wrap_inq_suk.png)");
			$title="";
			$(".ui-dialog-titlebar-close").html("<img src=\"images/pop-common/pop_top_close_g.png\" alt=\"문제닫기\" />");
  		}else{
  			//return;
  		}


  		if(pageTitle){
  			if($docType=="basics"){
				$('.ui-dialog-title').attr('style','text-align:center;width:650px');
				$title+="<span class=\"pageTitle\">"+pageTitle+"</span>";
				
			}else{
				$title+="<span class=\"pageTitle\">"+pageTitle+"</span>";
			}
  		}


		// if(mode=="std"){ //기본문제
		// 	$setClass=".pop-dialog";
		// }else if(mode=="add"){ //보충문제
		// 	$setClass=".pop-dialog-sub-add";
		// }else if(mode=="deep"){ //심화문제
		// 	$setClass=".pop-dialog-sub-deep";
		// }
		$setClass=".pop-dialog";

		$($setClass).dialog("open");

	
		//윈도우 10
		if(WindowsTenOS){
			var opt = { autoOpen:false, resizable:false, modal:true, draggable:false, position:[0,0], width:664, height:853 }; $($setClass).dialog(opt).dialog("open"); //$($setClass).dialog("open");
		}else{
			$($setClass).dialog("open");
		}

		$objURL=URL;

		//$($setClass).fadeOut(0,function(){
			$($setClass).load($objURL, function() {
				//$(this).dialog("option", "title", $title);
				$(this).dialog({
					"title":$title
				});
				$($setClass).fadeIn(timing,function(){});

				/* blur 20140115 //input 이벤트가 아님에도 , focus 가 올라오는 경우 제거해야됨 */
				/*빈값저장이 안되서 삭제함*/
				
				//$("textarea").blur();
				//$("input").blur();

				_trigger_setValue();


			});
		//});
		$(".ui-widget-header").fadeIn(1);
		$(".ui-resizable-handle").remove();
		$(".ui-icon-closethick").remove();

		_setBasePopPage(type,mode,URL,tabs,pageTitle);
	}

	//process 정답체크
	_pop_process_answer=function(){
		$(".question").each(function(idx){
			$objQuestion=$(this);
			if(ansArr[idx]){
				var K = ansArr[idx].split(";;");
				var KC = K[0]; //코드
				var KA = K[1]; //정답

				if(KC=="CS"){ //객관식 단항형일 때
					$(".ans",$objQuestion).each(function(){
						if($(this).hasClass(KA)){
							$(this).prepend("<img src='images/list_right.png' class='ans-img' />");
						}

						if($(this).hasClass("userSelected")){
							//console.log($(this).get(0).tagName);
						}else{
							//console.log("empty");

						}
					});
				}else if(KC=="CM"){ //객관식 다항형일 때
					var KAA = KA.split(",");
					$(KAA).each(function(key){
						$(".ans",$objQuestion).each(function(idx){
							if($(this).hasClass(KAA[key])){
								$(this).prepend("<img src='images/list_right.png' class='ans-img' />");
							}
						});
					});
				}else if(KC=="SS"){ //주관식 단항일 때
					$this=$(".ans",$objQuestion);
					var ap = $this.position();
					var ax = ap.left;
					var ay = ap.top;
					var ow = $this.width();
					var oh = $this.height();
					$objQuestion.append("<span class='abs' style='left:"+(ax+ow)+"px;top:"+(ay)+"px'>"+KA+"</span>");
				}else if(KC=="SM"){ //주관식 다항형 때
					var KAA = KA.split(",");
					$(".ans",$objQuestion).each(function(idx){
						var ap = $(this).position();
						var ax = ap.left;
						var ay = ap.top;
						var ow = $(this).width();
						var oh = $(this).height();
						$objQuestion.append("<span class='abs' style='left:"+ax+"px;top:"+(ay+oh)+"px'>"+KAA[idx]+"</span>");
					});
				}
			}
			$(".abs,.ans-img").fadeIn(timing);
			$(".pop-suggest").fadeIn(timing);
		});
	}
	//_monitor("load : pop-common.js");
	fn_ans_correct=function(){  //도전...
		/* 정답체크 루틴 시작 */
		var isCorrect=false;
		$(".question").each(function(){
			if($(this).hasClass("CS")){
				$this=$(".user-answer",this);
				$thisID=$this.attr("id");
				$thisVal=$this.val();
				$isValue=correctObj[$thisID];
				if($thisID in correctObj){
					isCorrect=true;
				}
			}else if($(this).hasClass("CM")){
				isCorrect=true;

				$ct=$(this);
				$parent	=	$ct.closest('.question');
				$parent.find(".ans").each(function(){
					var tmpObj=$(this);
					var thisPar=tmpObj.parent();

					var tmpID=tmpObj.attr("id");
					var tmpVal=correctObj[tmpID];

					$.each( correctObj, function( key, value ) {
						if(key==tmpID){
							$(tmpObj).prepend("<span class=\"pop-correct-answer\"><img src=\"images/common/sign-choice-correct.png\" /></span>");
						}
					});
				});

				$parent.find(".ans.user-answer").each(function(){
					var tmpObj=$(this);
					var thisPar=tmpObj.parent();
					var tmpID=tmpObj.attr("id");
					var tmpVal=correctObj[tmpID];

					if(!(tmpID in correctObj)){
						isCorrect=false;
					};
				});

				var selCnt=$parent.find(".ans.user-answer").length;
				if(selCnt < 2){
					isCorrect=false;
				}


				// $.each( correctObj, function( key, value ) {
				// 	var tmpID="#"+key;
				// });
			}else if($(this).hasClass("SS")){
				$this=$(".user-answer",this);
				$thisID=$this.attr("id");
				$thisVal=$this.val();
				$isValue=correctObj[$thisID];

				if($thisVal==$isValue){
					isCorrect=true;
				}

			}else if($(this).hasClass("SM")){
				$.each( correctObj, function( key, value ) {
					var tmpID="#"+key;
				});
			}else if($(this).hasClass("ES")){
				$.each( correctObj, function( key, value ) {
					var tmpID="#"+key;
				});
			}else if($(this).hasClass("EM")){
				$.each( correctObj, function( key, value ) {
					var tmpID="#"+key;
				});
			}else{
			}
		});
		/* 정답체크 루틴 끝 */
		var tryCorrect=$(".now.step"+tab_index);
		if(isCorrect){
			$(".pop-challange-msg.correct").fadeIn(timing);
			$(".pop-challange-msg.wrong").fadeOut(timing);
			$(".pop-challenge-next-btn").fadeIn(timing);
			tryCorrect.children(".orange").remove();
			tryCorrect.append(" <span class=\"orange\">OK!!</span>");
			if(tab_index==3){
				$("#pop-022-challenge-03 .border-box-challenge img").attr("src","images/pop-content/p022_challenge_02_04.png");
			}
		}else{
			$(".pop-challange-msg.correct").fadeOut(timing);
			$(".pop-challange-msg.wrong").fadeIn(timing);
			$(".pop-challenge-next-btn").fadeOut(timing);
			$(".now.step"+tab_index+" span.orange").remove();
		}
		//$(".pop-challange-msg.wrong").fadeIn(timing);
	}
});



//클릭 포커스
$(document).on("click","textarea,input",function(){
	$(this).focus();
});


//대단원 마무리 : 정답체크 및 리셋 사용안함------------------------------
finButtonSet=function(){
	$(".wrap.final .p-problem").each(function(index){
		$pl=$(this);
		$Final_problem = $(this).closest('.p-problem');

		// 정답체크


		$pl.find(".p-control a.btn_p_check").click(function(e){
			e.preventDefault();

			$ct=$(this);
			$parent	=	$('.question:eq('+index+')');

				if($parent.hasClass("CS")){
					var isCorrect=true;
					$parent.find(".ans").each(function(){
						var tmpObj=$(this);
						var thisPar=tmpObj.parent();
						var tmpID=tmpObj.attr("id");
						var tmpVal=correctObj[tmpID];

						$.each( correctObj, function( key, value ) {
							if(key==tmpID){
								$(tmpObj).prepend("<span class=\"pop-correct-answer\"><img src=\"images/common/sign-choice-correct.png\" /></span>");
							}
						});
					});

					$parent.find(".ans.user-answer").each(function(){
						var tmpObj=$(this);
						var thisPar=tmpObj.parent();
						var tmpID=tmpObj.attr("id");
						var tmpVal=correctObj[tmpID];

						if(!(tmpID in correctObj)){
							isCorrect=false;
						};
					});

					if(isCorrect){
						$(".question-text",$Final_problem).addClass("active");
					}

				}else if($parent.hasClass("CM")){
					var isCorrect=true;
					$parent.find(".ans").each(function(){
						var tmpObj=$(this);
						var thisPar=tmpObj.parent();

						var tmpID=tmpObj.attr("id");
						var tmpVal=correctObj[tmpID];

						$.each( correctObj, function( key, value ) {
							if(key==tmpID){
								$(tmpObj).prepend("<span class=\"pop-correct-answer\"><img src=\"images/common/sign-choice-correct.png\" /></span>");
							}
						});
					});
					$parent.find(".ans.user-answer").each(function(){
						var tmpObj=$(this);
						var thisPar=tmpObj.parent();
						var tmpID=tmpObj.attr("id");
						var tmpVal=correctObj[tmpID];

						if(!(tmpID in correctObj)){
							isCorrect=false;
						};
					});

					if(isCorrect){
						$(".question-text",$Final_problem).addClass("active");
					}


				}else if($parent.hasClass("SS")){
					var ShowValue="";
					$parent.find(".ans").each(function(){
						var tmpObj=$(this);
						var thisPar=tmpObj.parent();

						var tmpID=tmpObj.attr("id");
						var tmpVal=correctObj[tmpID];
						ShowValue+="<span>"+tmpVal+"</span>";

						if(tmpVal==tmpObj.val()){
							$(".question-text",$Final_problem).addClass("active");
						}

						var offset		=	tmpObj.position();
						var objHeight	=	tmpObj.height();

						var setLeft=offset.left;
						var setTop=offset.top;
						var setBottom=setTop+objHeight;

						if(tmpObj.hasClass("a-bottom")){
							$parent.append("<div class='finAns' style='left:"+setLeft+"px;top:"+setBottom+"px'>"+ShowValue+"</div>");
						}else{
							$parent.append("<div class='finAns objEach'>"+ShowValue+"</div>");
						}
					});

				}else if($parent.hasClass("SM")){
					var isCorrect=true;
					var ShowValue="";
					$parent.find(".ans").each(function(){
						var tmpObj=$(this);
						var thisPar=tmpObj.parent();

						var tmpID=tmpObj.attr("id");
						var tmpVal=correctObj[tmpID];
						ShowValue="<span>"+tmpVal+"</span>";

						if(tmpVal!=tmpObj.val()){
							isCorrect=false;
						}


						if(tmpObj.hasClass("a-bottom")){
							var offset		=	tmpObj.position();
							var objHeight	=	tmpObj.height();
							var setLeft=offset.left;
							var setTop=offset.top;

							var setBottom=0;
							setBottom=setTop+objHeight;
							$parent.append("<div class='finAns' style='left:"+setLeft+"px;top:"+setBottom+"px'>"+ShowValue+"</div>");
						}else if(tmpObj.hasClass("a-top")){
							var offset		=	tmpObj.position();
							var objHeight	=	tmpObj.height();
							var setLeft=offset.left;
							var setTop=offset.top;

							var setBottom=0;
							setBottom=setTop-objHeight;
							$parent.append("<div class='finAns01' style='left:"+setLeft+"px;top:"+setBottom+"px'>"+ShowValue+"</div>");
						}else if(tmpObj.hasClass("a-top1")){
							var offset		=	tmpObj.position();
							var objHeight	=	tmpObj.height();
							var setLeft=offset.left;
							var setTop=offset.top;

							var setBottom=0;
							setBottom=setTop-objHeight;
							$parent.append("<div class='finAns02' style='left:"+setLeft+"px;top:"+setBottom+"px'>"+ShowValue+"</div>");
						}else{


							var offset		=	tmpObj.offset();
							var objHeight	=	tmpObj.height();
							var setLeft=offset.left;
							var setTop=offset.top;

							var setBottom=0;
							//setBottom=setTop-100;
							//alert(tmpID);//A01_EX01_q01   ~7
								 if(tmpID == "A01_EX01_q01") {setBottom=setTop=35;	}	// 대단원 마무리 1-1
							else if(tmpID == "A01_EX01_q02") {setBottom=setTop=67;	}	// 대단원 마무리 1-2

							else if(tmpID == "A01_EX01_q03") {setBottom=setTop=130;	}	// 대단원 마무리 2-1
							else if(tmpID == "A01_EX01_q04") {setBottom=setTop=304;	}	// 대단원 마무리 2-2

							else if(tmpID == "A01_EX01_q05") {setBottom=setTop=48;	}	// 대단원 마무리 3-1
							else if(tmpID == "A01_EX01_q06") {setBottom=setTop=123;	}	// 대단원 마무리 3-2
							else if(tmpID == "A01_EX01_q07") {setBottom=setTop=224;	}	// 대단원 마무리 3-3
							else							 {setBottom=setTop=100;	}

							$parent.append("<div class='finAns' style='top:"+setBottom+"px'>"+ShowValue+"</div>");
						}
					});
					if(isCorrect){
						$(".question-text",$Final_problem).addClass("active");
					}

				}else if($parent.hasClass("ES")){
					var ShowValue="";
					$parent.find(".ans").each(function(){
						var tmpObj=$(this);
						var thisPar=tmpObj.parent();

						var tmpID=tmpObj.attr("id");
						var tmpVal=correctObj[tmpID];
						ShowValue+="<span>"+tmpVal+"</span>";

						var offset	=	tmpObj.position();
						var objHeight=tmpObj.height();

						var setTop=offset.top+objHeight+20;

						$parent.append("<div class='finAns objEE' style='left:100px;top:"+setTop+"px'>"+ShowValue+"</div>");
					});

				}else if($parent.hasClass("EM")){
					var ShowValue="";
					$parent.find(".ans").each(function(){
						var tmpObj=$(this);
						var thisPar=tmpObj.parent();

						var tmpID=tmpObj.attr("id");
						var tmpVal=correctObj[tmpID];
						ShowValue+="<span>"+tmpVal+"</span>";
					});
					$parent.append("<div class='finAns'>"+ShowValue+"</div>");

				}

		});

		// 리셋
		$pl.find(".p-control a.btn_p_recycle").click(function(e){
			e.preventDefault();

			$ct=$(this);
			//$parent	=	$ct.closest('.question');
			$parent	=	$('.question:eq('+index+')');


				$parent.find(".finAns").remove();
				$parent.find(".finAns01").remove();
				$parent.find(".finAns02").remove();
				$parent.find(".pop-correct-answer").remove();


				$(".question-text",$Final_problem).removeClass("active");

				if($parent.hasClass("CS")){
					$parent.find(".ans").removeClass("user-answer");
					$parent.find(".pop-user-answer").remove();

				}else if($parent.hasClass("CM")){
					$parent.find(".ans").removeClass("user-answer");
					$parent.find(".pop-user-answer").remove();

				}else if($parent.hasClass("SS")){
					$this.removeClass("user-answer");

					$parent.find(".ans").each(function(){
						$(this).val("");
					});
				}else if($parent.hasClass("SM")){
					$this.removeClass("user-answer");

					$parent.find(".ans").each(function(){
						$(this).val("");
					});
				}else if($parent.hasClass("ES")){
					$this.removeClass("user-answer");
					$this.val('');
					$(".ctl.btn.confirm").fadeOut(timing);

				}else if($parent.hasClass("EM")){
					$parent.find(".ans").each(function(){
						$(this).val("");
					});
				}

				$(".p-control:eq("+index+")").fadeOut(timing);

		});


	});


}


/*
################################################################
trigger
################################################################
*/
$(document).on("click",".p-problem .p-control a",function(e){
	//finButtonSet();
});

//다시풀기 - 리셋  //라인리셋추가 클래스 .line
$(document).on("click",".ctl.again",function(e){
	e.preventDefault();
	$(".pop-suggest").fadeOut(timing,function(){});
	$(".pop-explain").fadeOut(timing,function(){});
	$(".ctl.btn.again").fadeOut(timing,function(){$(".ctl.btn.confirm").fadeOut(timing);});
	$(".abs").fadeOut(timing,function(){$(this).remove();});
	//객관식 리셋
	$(".ans").removeClass("user-answer");
	$(".pop-user-answer").remove();
	$(".pop-correct-answer").remove();
	//주관식 리셋
	$("input.ans,textarea.ans").val("");

	//메세지 제거
	$(".pop-challange-msg").hide();

	//라인리셋
	if($(this).hasClass("line")){
		clearLine();
	}
});

/*
################################################################
trigger
################################################################
*/
$(document).on("click",".p-problem .p-control a",function(e){
	//finButtonSet();
});

//다시풀기 - 리셋  //라인리셋추가 클래스 .line
$(document).on("click",".ctl.again",function(e){
	e.preventDefault();
	$(".pop-suggest").fadeOut(timing,function(){});
	$(".pop-explain").fadeOut(timing,function(){});
	$(".ctl.btn.again").fadeOut(timing,function(){$(".ctl.btn.confirm").fadeOut(timing);});
	$(".abs").fadeOut(timing,function(){$(this).remove();});
	//객관식 리셋
	$(".ans").removeClass("user-answer");
	$(".pop-user-answer").remove();
	$(".pop-correct-answer").remove();
	//주관식 리셋
	$("input.ans,textarea.ans").val("");

	//메세지 제거
	$(".pop-challange-msg").hide();

	//강석우 추가
/*
	$(".pop-o").fadeOut(100);
	$(".pop-x").fadeOut(100);
*/
	//라인리셋
	if($(this).hasClass("line")){
		clearLine();
	}
});

/*
확인 시 정답을 표시 : 정답체크
*/
var correctObj={
	
	//단원마무리
	"P055_TB01_i01":"공간"
	,"P055_TB01_i02":"태양계"
	,"P055_TB01_i03":"행성"
	,"P055_TB03_i01":"images/55/small_planet_01.png"
	,"P055_TB03_i02":"images/55/small_planet_02.png"
	,"P055_TB03_i03":"images/55/small_planet_03.png"
	,"P055_TB03_i04":"images/55/small_planet_04.png"
	,"P055_TB03_i05":"images/55/small_planet_05.png"
	,"P055_TB03_i06":"images/55/small_planet_06.png"
	,"P055_TB03_i07":"images/55/small_planet_07.png"
	,"P055_TB03_i08":"images/55/small_planet_08.png"
	,"P055_TB05_i01":"거리"
	,"P055_TB05_i02":"images/55/55_e_06.png"
	,"P055_TB05_i03":"images/55/55_e_01.png"
	,"P055_TB05_i04":"images/55/55_e_03.png"
	,"P055_TB05_i05":"images/55/55_e_04.png"
	,"P055_TB05_i06":"images/55/55_e_05.png"
	,"P055_TB05_i07":"images/55/55_e_07.png"
	,"P055_TB05_i08":"images/55/55_e_08.png"
	,"P057_TB01_i01":"목성"
	,"P057_TB01_i02":"수성"
	,"P057_TB02_i01":"수성"
	,"P057_TB02_i02":"화성"
	,"P057_TB02_i03":"금성"
	
	

	,"P057_TB03_i01":"images/57/57_e_03_05.png"
	,"P057_TB03_i02":"images/57/57_e_03_06.png"
	,"P057_TB03_i03":"images/57/57_e_03_07.png"
	,"P057_TB03_i04":"images/57/57_e_03_08.png"
	,"P057_TB03_i05":"images/57/57_e_03_03.png"
	,"P057_TB03_i06":"images/57/57_e_03_02.png"
	,"P057_TB03_i07":"images/57/57_e_03_04.png"
	,"P057_TB03_i08":"images/57/57_e_03_01.png"
	,"P057_TB04_i01":"11"
	,"P059_TB01_i01":"수성"
	,"P059_TB01_i02":"금성"
	,"P059_TB01_i03":"지구"
	,"P059_TB01_i04":"화성"
	,"P059_TB01_i05":"목성"
	,"P059_TB01_i06":"토성"
	,"P059_TB01_i07":"천왕성"
	,"P059_TB01_i08":"해왕성"
	,"P059_TB01_i09":"명왕성"
	,"P059_TB02_i01":"60"
	,"P059_TB05_i01":"29"
	,"P061_TB02_i01":"관측 위성"
	,"P061_TB02_i02":"탐사 로봇"
	,"P061_TB03_i01":"images/61/61_e_01.jpg"
	,"P061_TB03_i02":"images/61/61_e_02.jpg"
	,"P061_TB03_i03":"images/61/61_e_03.jpg"
	,"P061_TB03_i04":"images/61/61_e_04.jpg"
	
	,"P061_TB04_i01":"탐사할 행성"
	,"P061_TB04_i02":"탐사 장비"
	,"P061_TB04_i03":"탐사 목적"
	,"P061_TB04_i04":"탐사할 행성에 대해 알고 있는 것"
	,"P061_TB04_i05":"탐사 방법"
	
	,"P065_TB01_i01":"별"
	,"P065_TB01_i02":"별자리"
	,"P065_EX01_q03_01":"images/65/65_pop_02_4_on.png"
	,"P065_EX01_q03_02":"images/65/65_pop_02_3_on.png"
	,"P065_EX01_q03_03":"images/65/65_pop_02_2_on.png"
	,"P065_EX01_q03_04":"images/65/65_pop_02_1_on.png"
	,"P065_TB04_i01":"물고기,염소,전갈,황소,독수리"
	,"P065_TB04_i02":"물고기,염소,전갈,황소,독수리"
	,"P065_TB04_i03":"물고기,염소,전갈,황소,독수리"
	,"P065_TB04_i04":"물고기,염소,전갈,황소,독수리"
	,"P065_TB04_i05":"물고기,염소,전갈,황소,독수리"
	,"P065_TB04_i06":"카시오페이아,오리온,궁수"
	,"P065_TB04_i07":"카시오페이아,오리온,궁수"
	,"P065_TB04_i08":"카시오페이아,오리온,궁수"
	,"P065_TB04_i09":"물병,천칭"
	,"P065_TB04_i10":"물병,천칭"
	,"P069_TB01_i01":"북극성"
	,"P097_TB02_i01":"행성"
	,"P097_TB02_i02":"반사"
	,"P097_TB06_i01":"목성"
	,"P097_TB06_i02":"태양"
	,"P075_EX01_q05_01":"별자리"
	
	
	
	
	
	


	
	
}

//여러 문제씩 정답체크일 경우
fn_ans_check=function(){
	
	$(".pop-correct-answer").remove();
	

	$(".question").each(function(){	
	
		if($(this).hasClass("CS")){
		
			$.each( correctObj, function( key, value ) {
				
				var tmpID="#"+key;
				
				$parent	= $(tmpID).closest('.pop-quiz-ox');
				//console.log($parent.attr('class'));
				if($parent.length > 0){
					
					$(tmpID).prepend("<span class=\"pop-correct-answer large\"><img src=\"images/common/sign-choice-large-red-correct.png\" /></span>");
				}else{
					
					$(tmpID).prepend("<span class=\"pop-correct-answer\"><img src=\"images/common/sign-choice-correct.png\" /></span>");
					//강석우 추가
					//$(tmpID).addClass("o-answer");
				}

			});
		}else if($(this).hasClass("CM")){
			$.each( correctObj, function( key, value ) {
				var tmpID="#"+key;
				$parent	= $(tmpID).closest('.pop-quiz-ox');
				if($parent.length > 0){
					$(tmpID).prepend("<span class=\"pop-correct-answer large\"><img src=\"images/common/sign-choice-large-red-correct.png\" /></span>");
				}else{
					$(tmpID).prepend("<span class=\"pop-correct-answer\"><img src=\"images/common/sign-choice-correct.png\" /></span>");
				}
			});
		}else if($(this).hasClass("SS")){
			$.each( correctObj, function( key, value ) {
				var tmpID	=	"#"+key;
				var offset	=	$(tmpID).position();
				var objHeight=	parseInt($(tmpID).outerHeight());
				var objPositionTop=0;
				var objPositionLeft=0;
				if(offset){
					$(tmpID).after("<span class=\"pop-correct-answer\" style=\"top:"+objHeight+"px;left:10px\">"+value+"</span>");
				}
			});
		}else if($(this).hasClass("SM")){
			$.each( correctObj, function( key, value ) {
				var tmpID="#"+key;
				var offset	=	$(tmpID).position();
				var objHeight=	parseInt($(tmpID).outerHeight());
				var objPositionTop=0;
				var objPositionLeft=0;
				if(offset){
					objPositionTop=offset.top+objHeight;
					objPositionLeft=offset.left;
					if($(tmpID).width() < 400){
						$(tmpID).after("<span class=\"pop-correct-answer\" style=\"position:relative;top:"+objPositionTop+"px;left:"+objPositionLeft+"px\">"+value+"</span>");
					}else{
						$(tmpID).after("<span class=\"pop-correct-answer\" style=\"top:"+objPositionTop+"px;left:"+objPositionLeft+"px\">"+value+"</span>");
					}
				}

			});
		}else if($(this).hasClass("ES")){
			$.each( correctObj, function( key, value ) {
				var tmpID="#"+key;
				var offset	=	$(tmpID).position();
				var objHeight=	parseInt($(tmpID).outerHeight());
				var objPositionTop=0;
				var objPositionLeft=0;
				if(offset){
					objPositionTop=offset.top+objHeight;
					objPositionLeft=offset.left;
					$(tmpID).after("<span class=\"pop-correct-answer\" style=\"top:"+objPositionTop+"px;left:"+objPositionLeft+"px\">"+value+"</span>");
				}

			});
		}else if($(this).hasClass("EM")){
			$.each( correctObj, function( key, value ) {
				var tmpID="#"+key;
				var offset	=	$(tmpID).position();
				var objHeight=	parseInt($(tmpID).outerHeight());
				var objPositionTop=0;
				var objPositionLeft=0;

				if(offset){
					objPositionTop=offset.top+objHeight;
					objPositionLeft=offset.left;
					if($(tmpID).width() < 400){
						$(tmpID).after("<span class=\"pop-correct-answer\" style=\"position:relative;top:0px;left:10px\">"+value+"</span>");
					}else{
						$(tmpID).after("<span class=\"pop-correct-answer\" style=\"top:"+objPositionTop+"px;left:10px\">"+value+"</span>");
					}
				}

			});
		}else{
		}

	});

}

//한 문제씩 정답체크일 경우
fn_ans_check2=function(qindex){
	//$(".pop-correct-answer").remove();
	

	$(".question:eq("+qindex+")").each(function(){

	//console.log($('li').attr('ans'));
		if($(this).hasClass("CS")){
			
			$(this).find(".ans").each(function(){
				//console.log($(this).attr('id'));
				var tmpObj=$(this);
				var thisPar=tmpObj.parent();
				var tmpID=tmpObj.attr("id");
				var tmpVal=correctObj[tmpID];
			
				$.each( correctObj, function( key, value ) {
					if(key==tmpID){
						$(tmpObj).prepend("<span class=\"pop-correct-answer\"><img src=\"images/common/sign-choice-correct.png\" /></span>");
					}
				});
				
			});
		}else if($(this).hasClass("CM")){	
			$ct=$(this);
			$parent	=	$ct.closest('.question');
			$parent.find(".ans").each(function(){
				var tmpObj=$(this);
				var thisPar=tmpObj.parent();

				var tmpID=tmpObj.attr("id");
				var tmpVal=correctObj[tmpID];

				$.each( correctObj, function( key, value ) {
					if(key==tmpID){
						$(tmpObj).prepend("<span class=\"pop-correct-answer\"><img src=\"images/common/sign-choice-correct.png\" /></span>");
					}
				});
			});
		}else if($(this).hasClass("SS")){	
			$this=$(".user-answer",this);
			$thisID=$this.attr("id");
			$thisVal=$this.val();
			$isValue=correctObj[$thisID];

			if($thisVal==$isValue){
				isCorrect=true;
			}
			
		}else if($(this).hasClass("SM")){
			$.each( correctObj, function( key, value ) {
			var tmpID="#"+key;
			});
		}else if($(this).hasClass("ES")){
			$.each( correctObj, function( key, value ) {
				var tmpID="#"+key;
			});
		}else if($(this).hasClass("EM")){
			$.each( correctObj, function( key, value ) {
				var tmpID="#"+key;
			});
	
		}else{
		}

	});

}




/* 확인 */
$tmpAcceptStr ="";
$tmpAcceptStr0 ="";
$tmpAcceptStr1 ="";
$tmpAcceptStr2 ="";
$tmpAcceptArr = new Array("","","","","","","");


$ox_countChk1="F";
$ox_countChk2="F";
$ox_countChk3="F";
$ox_countChk4="F";
$ox_countChk5="F";
$ox_countChk6="F";
$ox_count1 = 0;
$ox_count2 = 0;
$ox_count3 = 0;
$ox_count4 = 0;
$ox_count5 = 0;
$ox_count6 = 0;

$(document).on("click",".ctl.btn.confirm",function(e){

	e.preventDefault();
	
	if($("div").hasClass("e_finish")){
		$parent			=	$(this).closest('.container');
	}else{
		$parent			=	$(this).closest('.pop-container');
	}
	
	$userAnswerCnt 	= 	$parent.find(".user-answer").length;  //사용자가 선택/입력한 답변.
	
/*
	if($userAnswerCnt < 1){
		return;
	}
*/

	if(tmpSelector=="normal"){
		
	
		//강석우 추가
		var user_index = $(this).parent().parent().find(".user-answer").index();
		var o_index = $(this).parent().parent().find(".o-answer").index();
		
		//alert($(this).parent().parent().index());
		$qindex = $(this).parent().parent().index() -1;
		$e_qindex = $(this).parent().parent().index();
		//$tmpAcceptStr = "";
		//다시풀기 버튼 생성 강석우	
		if($("div").hasClass("s_accept")){
			
			//fn_ans_check2($qindex);   //팝업 정답 체크
			//fn_ans_check();   //팝업 정답 체크
			
			
			if($(this).parent().parent().hasClass("pop-tab-01")){
				
				if(user_index == o_index){
					
					$('#pop-ox2 img').attr('src','images/pop-common/chll2.gif');
					play_sound_rocket('o');
					$tmpAcceptStr0="True";
				}else{
					$('#pop-ox2 img').attr('src','images/pop-common/chll3.gif');
					play_sound_rocket('x');
					$tmpAcceptStr0="False";
				}
				//$("#again2").fadeIn(timing);
				$("#confirm2").hide();
				
				$("#tab_but2").css('margin-left','0px');
				$("#tab_but2").fadeIn(timing);
			}else if($(this).parent().parent().hasClass("pop-tab-02")){
				
				if(user_index == o_index){
					$('#pop-ox3 img').attr('src','images/pop-common/chll2.gif');
					play_sound_rocket('o');
					$tmpAcceptStr1= "True";
				}else{
					$('#pop-ox3 img').attr('src','images/pop-common/chll3.gif');
					play_sound_rocket('x');
					$tmpAcceptStr1="False";
				}
				//$("#again3").fadeIn(timing);
				$("#confirm3").hide();
				$("#tab_but3").css('margin-left','0px');
				$("#tab_but3").fadeIn(timing);
			}else if($(this).parent().parent().hasClass("pop-tab-03")){
				
				if($(this).parent().parent().find('.CS').hasClass("CS")){
					
					
					if(user_index == o_index){
						$('#pop-ox4 img').attr('src','images/pop-common/chll2.gif');
						play_sound_rocket('o');
						$tmpAcceptStr2= "True";
					}else{
						$('#pop-ox4 img').attr('src','images/pop-common/chll3.gif');
						play_sound_rocket('x');
						$("#pop-x4").fadeIn(1);
						$tmpAcceptStr2= "False";
					}
				}else if($(this).parent().parent().find('.SS').hasClass("SS")){
					thisParent = $(this).parent().parent().find(".table_left").children();
					var tmpChk = 0;
					var countChk = 0;
					//console.log(thisParent.html());
					thisParent.find('.ans').each(function(){
						$thisID =$(this).attr("id");
						//console.log($thisID);
						$thisVal=$(this).val();
						$isValue=correctObj[$thisID];
						//console.log($thisVal +"^^"+$isValue);
						if($thisVal == $isValue){
							tmpChk++;
						}else{
							$isValue2=correctObj[$thisID+"A"];
							if($thisVal == $isValue2){
								tmpChk++;
							}
						}
						countChk++;
					});
					//console.log(countChk +"^^"+tmpChk);
					if (countChk == tmpChk){
						$tmpAcceptStr2 ="True";
						$('#pop-ox4 img').attr('src','images/pop-common/rocket3.gif');
						play_sound_rocket('o');
						

					}else{
						$tmpAcceptStr2 ="False";
						$('#pop-ox4 img').attr('src','images/pop-common/rocket2.gif');
						play_sound_rocket('x');
						$("#pop-x4").fadeIn(1);
						
						
					}
				}
				
				
				
				//$("#again4").fadeIn(timing);
				$("#confirm4").hide();
				$("#tab_but4").css('margin-left','0px');
				$("#tab_but4").fadeIn(timing);
				
			}
			
			
			//정답결과 변수에 담음
			
				$tmpAcceptStr = $tmpAcceptStr0+"^;^"+$tmpAcceptStr1+"^;^"+$tmpAcceptStr2;
				//console.log($tmpAcceptStr);
			
			
			/*
			if(($tmpAcceptStr0 != "")&&($tmpAcceptStr1 != "")&&($tmpAcceptStr2 != "")){
				$tmpAcceptStr = $tmpAcceptStr0+"^;^"+$tmpAcceptStr1+"^;^"+$tmpAcceptStr2;
				//console.log($tmpAcceptStr);
			}
			*/
		}else if($("div").hasClass("s_quiz")){		
			
			//fn_ans_check();   //팝업 정답 체크
			$(".pop-explain").fadeIn(1);
			$(".confirm").hide();
			//return false;
		
		}else if($("div").hasClass("e_quiz")){			
			//fn_ans_check2($e_qindex);   //팝업 정답 체크
			//정답 확인
			//console.log($(this).parent().parent().find('.CS').attr('class'));
			
			//해설 힌트에 닫기버튼 추가
			$parent.find('.pop-explain-desc').each(function(){
				if($(this).children().hasClass('e_quiz_doc_close')){
					
				}else{
					$(this).prepend("<img class=\"e_quiz_doc_close\" src=\"images/pop-common/pop_top_close_g.png\" alt=\"힌트닫기\" />");
				}
			});
			
			if($(this).parent().parent().find('.CS').hasClass("CS")){
				//선택
				var tmpChk = 0;
				$(this).parent().parent().find('.ans').each(function(){
					
					if ($(this).attr("class").indexOf("user-answer") > -1){
						if ($(this).attr("class").indexOf("o-answer") > -1){
							tmpChk = tmpChk + 1;
							//console.log($(this).index());
						}else{
							tmpChk = -1;
						}
					}
				});
				
				if ($(this).parent().parent().find(".o-answer").length == tmpChk){
					$tmpAcceptStr = "True";
				}else{
					$tmpAcceptStr = "False";
				}
			}else if($(this).parent().parent().find('.ST').hasClass("ST")){
				
				thisParent = $(this).parent().parent().find(".ST").children().children();
				var tmpChk = 0;
				var countChk = 0;
				
				thisParent.find('.ans').each(function(){
					$thisID =$(this).attr("id");
					//console.log($thisID);
					$thisVal=$(this).val();
					$isValue=correctObj[$thisID];
					//console.log($thisVal +"^^"+$isValue);
					//상호 교차 정답인 경우 추가
					if($isValue.indexOf(',') > -1 && $thisVal !=''){
							if($isValue.indexOf($thisVal)>-1){
								tmpChk++;
							}
					}else{
						if($thisVal == $isValue){
							tmpChk++;
						}
					}
					countChk++;
				});
				
				console.log(countChk+ '==' +tmpChk);
				if (countChk == tmpChk){
					$tmpAcceptStr ="True";
				}else{
					$tmpAcceptStr ="False";
					
				}
			}else if($(this).parent().parent().find('.CM').hasClass("CM")){
				//console.log($(this).parent().parent().html());
				var tmpChk = 0;
				$(this).parent().parent().find('.ans').each(function(){
					//console.log($(this).attr("class"));
					//console.log($(this).attr("class").indexOf("user-answer"));
					
					if ($(this).attr("class").indexOf("user-answer") > -1){
						if ($(this).attr("class").indexOf("o-answer") > -1){
							tmpChk = tmpChk + 1;
							//console.log($(this).index());
						}else{
							tmpChk = -1;
						}
					}
				});
				
				if ($(this).parent().parent().find(".o-answer").length == tmpChk){
					$tmpAcceptStr = "True";
				}else{
					$tmpAcceptStr = "False";
				}
			}else if($(this).parent().parent().find('.SS').hasClass("SS")){
				//드레그 후 값비교
				//thisParent = $parent_tab.find(".tab-01").find(".SS").children().children().children().children();
				thisParent = $(this).parent().parent().find(".SS").children().children();
				var tmpChk = 0;
				var countChk = 0;
				//console.log(thisParent.html());
				thisParent.find('.ans').each(function(){
					$thisID =$(this).attr("id");
					//console.log($thisID);
					$thisVal=$(this).val();
					$isValue=correctObj[$thisID];
					//console.log($thisVal +"^^"+$isValue);
					//상호 교차 정답인 경우 추가
					
					if($isValue.indexOf(',') > -1 && $thisVal !=''){
							if($isValue.indexOf($thisVal)>-1){
								tmpChk++;
							}
					}else{
						if($thisVal == $isValue){
							tmpChk++;
						}
					}
					countChk++;
				});
				//console.log(countChk +'=='+ tmpChk);
				if (countChk == tmpChk){
					$tmpAcceptStr ="True";
				}else{
					$tmpAcceptStr ="False";
					
				}
			}else if($(this).parent().parent().find('.SSimg').hasClass("SSimg")){
				//드레그 후 값비교
				//thisParent = $parent_tab.find(".tab-01").find(".SS").children().children().children().children();
				thisParent = $(this).parent().parent().find(".SSimg").children().children();
				var tmpChk = 0;
				var countChk = 0;
				//console.log(thisParent.html());
				thisParent.find('.ans').each(function(){
					$thisID =$(this).attr("id");
					
					
					$thisVal=$(this).find('img').attr('src');
					//$thisVal=$thisVal.replace('.jpg','');
					
					$isValue=correctObj[$thisID];
					//console.log($thisVal +"^^"+$isValue);
					if($thisVal == $isValue){
						
						tmpChk++;
					}
					countChk++;
				});
				//console.log(countChk +"^^"+tmpChk);

				if (countChk == tmpChk){
					$tmpAcceptStr ="True";
				}else{
					$tmpAcceptStr ="False";
					
				}
				
				//console.log($tmpAcceptStr);	
			}else if($(this).parent().parent().find('.LL').hasClass("LL")){
				
				thisParent = $(this).parent().parent().find(".LL");
				
				if (thisParent.hasClass("L_True")){
					$tmpAcceptStr ="True";
				}else{
					$tmpAcceptStr ="False";
				}	
				//console.log(thisParent.html());

			}
//console.log(countChk+"^^"+tmpChk);
//console.log($tmpAcceptStr);

			if($(this).parent().parent().hasClass("pop-tab-01")){
				
				$(this).parent().parent().find(".confirm").hide();
				
				
				if($tmpAcceptStr=="True"){
					//정답을 맞추면 카운트를 멈춘다.
					$ox_countChk1 = "T";
					
					play_sound_o();
					if($ox_count1==0){
						$(".tabs_e_quiz span:eq(0)").removeClass('bm_y');
						$(".tabs_e_quiz span:eq(0)").addClass('bm_1');
						//$(".tabs_e_quiz span:eq(0)").html("금");
						_triggerSaveBalloon('Balloon',0,'bm_1');
					
					}else if($ox_count1==1){
						$(".tabs_e_quiz span:eq(0)").removeClass('bm_y');
						$(".tabs_e_quiz span:eq(0)").addClass('bm_2');
						//$(".tabs_e_quiz span:eq(0)").html("은");
						_triggerSaveBalloon('Balloon',0,'bm_2');
					}else if($ox_count1 >=2){
						$(".tabs_e_quiz span:eq(0)").removeClass('bm_y');
						$(".tabs_e_quiz span:eq(0)").addClass('bm_3');
						//$(".tabs_e_quiz span:eq(0)").html("동");
						_triggerSaveBalloon('Balloon',0,'bm_3');
					}
					//$ox_count1 = 0;
					$(this).parent().parent().find(".pop-x1").hide();
					$(this).parent().parent().find(".pop-x2").hide();
					$(this).parent().parent().find(".pop-o").css("background","url('images/pop-common/o1.png') no-repeat");
					$(this).parent().parent().find(".pop-o").fadeIn(1);
					$(this).parent().parent().find(".pop-o").fadeOut(4000);
					$(this).parent().parent().find(".q_doc").fadeIn(1);
					$(this).parent().parent().find(".pop-explain").hide();
					$(this).parent().parent().find(".hint").hide();
					//$(this).parent().parent().find('.reagain').hide();
					$(this).parent().parent().find(".pop-explain-hint").hide();
					$(".q_doc").on("click",function(){
							$(this).parent().parent().find(".pop-explain").fadeIn(1);
							$(this).parent().parent().find(".q_doc").hide();
							$(this).parent().parent().find(".pop-o").hide();
							$(this).parent().parent().find('.reagain').hide();
					});
				}else{
					//오답일 경우 오답카운트 증가
					play_sound_x();
					if($ox_countChk1 == "F"){
						if ($ox_count1 ==0){
							$ox_count1 = 1;
						}else{
							$ox_count1++;
						}
					}
					
					//오답카운트가 2보다 작을때
					if($ox_count1 < 2){
						$(this).parent().parent().find(".pop-o").hide();
						$(this).parent().parent().find(".pop-x2").hide();
						$(this).parent().parent().find(".pop-x1").fadeIn(1);
						$(this).parent().parent().find(".pop-x1").fadeOut(4000);
						$(this).parent().parent().find(".q_doc").hide();
						$(this).parent().parent().find(".pop-explain").hide();
						$(this).parent().parent().find(".hint").fadeIn(1);
						//$(this).parent().parent().find('.reagain').hide();
						$(".hint").on("click",function(){
							$(this).parent().parent().find(".pop-explain-hint").fadeIn(1);
							$(this).parent().parent().find(".hint").hide();
							$(this).parent().parent().find(".pop-x1").hide();
							$(this).parent().parent().find('.reagain').hide();
						});
					}else{
						$(this).parent().parent().find(".pop-o").hide();
						$(this).parent().parent().find(".pop-x1").hide();
						$(this).parent().parent().find(".pop-x2").fadeIn(1);
						$(this).parent().parent().find(".pop-x2").fadeOut(4000);
						$(this).parent().parent().find(".hint").hide();
						$(this).parent().parent().find(".pop-explain-hint").hide();
						$(this).parent().parent().find(".q_doc").fadeIn(1);
						//$(this).parent().parent().find('.reagain').hide();
						$(".q_doc").on("click",function(){
							$(this).parent().parent().find(".pop-explain").fadeIn(1);
							$(this).parent().parent().find(".q_doc").hide();
							$(this).parent().parent().find(".pop-x2").hide();
							$(this).parent().parent().find('.reagain').hide();
						});
						
					}
				}
			}else if($(this).parent().parent().hasClass("pop-tab-02")){
				$(this).parent().parent().find(".confirm").hide();
				if($tmpAcceptStr=="True"){
					//정답을 맞추면 카운트를 멈춘다.
					$ox_countChk2 = "T";
					play_sound_o();
					if($ox_count2==0){
						$(".tabs_e_quiz span:eq(1)").removeClass('bm_y');
						$(".tabs_e_quiz span:eq(1)").addClass('bm_1');
						//$(".tabs_e_quiz span:eq(1)").html("금메달");
						_triggerSaveBalloon('Balloon',1,'bm_1');
					}else if($ox_count2==1){
						$(".tabs_e_quiz span:eq(1)").removeClass('bm_y');
						$(".tabs_e_quiz span:eq(1)").addClass('bm_2');
						//$(".tabs_e_quiz span:eq(1)").html("은메달");
						_triggerSaveBalloon('Balloon',1,'bm_2');
					}else if($ox_count2 >=2){
						$(".tabs_e_quiz span:eq(1)").removeClass('bm_y');
						$(".tabs_e_quiz span:eq(1)").addClass('bm_3');
						//$(".tabs_e_quiz span:eq(1)").html("동메달");
						_triggerSaveBalloon('Balloon',1,'bm_3');
					}
					//$ox_count1 = 0;
					$(this).parent().parent().find(".pop-x1").hide();
					$(this).parent().parent().find(".pop-x2").hide();
					$(this).parent().parent().find(".pop-o").css("background","url('images/pop-common/o2.png') no-repeat");
					$(this).parent().parent().find(".pop-o").fadeIn(1);
					$(this).parent().parent().find(".pop-o").fadeOut(4000);
					
					//console.log($(this).parent().parent().find(".pop-o").html());
					
					$(this).parent().parent().find(".q_doc").fadeIn(1);
					$(this).parent().parent().find(".pop-explain").hide();
					$(this).parent().parent().find(".hint").hide();
					
					$(this).parent().parent().find(".pop-explain-hint").hide();
					$(".q_doc").on("click",function(){
							$(this).parent().parent().find(".pop-explain").fadeIn(1);
							$(this).parent().parent().find(".q_doc").hide();
							$(this).parent().parent().find(".pop-o").hide();
							$(this).parent().parent().find('.reagain').hide();
					});
				}else{
					play_sound_x();
					//오답일 경우 오답카운트 증가
					if($ox_countChk2 == "F"){
						if ($ox_count2 ==0){
							$ox_count2 = 1;
						}else{
							$ox_count2++;
						}
					}
					//오답카운트가 2보다 작을때
					if($ox_count2 < 2){
						$(this).parent().parent().find(".pop-o").hide();
						$(this).parent().parent().find(".pop-x2").hide();
						$(this).parent().parent().find(".pop-x1").fadeIn(1);
						$(this).parent().parent().find(".pop-x1").fadeOut(4000);
						$(this).parent().parent().find(".q_doc").hide();
						$(this).parent().parent().find(".pop-explain").hide();
						$(this).parent().parent().find(".hint").fadeIn(1);
						
						$(".hint").on("click",function(){
							$(this).parent().parent().find(".pop-explain-hint").fadeIn(1);
							$(this).parent().parent().find(".hint").hide();
							$(this).parent().parent().find(".pop-x1").hide();
							$(this).parent().parent().find('.reagain').hide();
						});
					}else{
						$(this).parent().parent().find(".pop-o").hide();
						$(this).parent().parent().find(".pop-x1").hide();
						$(this).parent().parent().find(".pop-x2").fadeIn(1);
						$(this).parent().parent().find(".pop-x2").fadeOut(4000);
						$(this).parent().parent().find(".hint").hide();
						$(this).parent().parent().find(".pop-explain-hint").hide();
						$(this).parent().parent().find(".q_doc").fadeIn(1);
						
						$(".q_doc").on("click",function(){
							$(this).parent().parent().find(".pop-explain").fadeIn(1);
							$(this).parent().parent().find(".q_doc").hide();
							$(this).parent().parent().find(".pop-x2").hide();
							$(this).parent().parent().find('.reagain').hide();
						});
						
					}
				}
			}else if($(this).parent().parent().hasClass("pop-tab-03")){
				$(this).parent().parent().find(".confirm").hide();
				if($tmpAcceptStr=="True"){
					play_sound_o();
					//정답을 맞추면 카운트를 멈춘다.
					$ox_countChk3 = "T";
					
					if($ox_count3==0){
						$(".tabs_e_quiz span:eq(2)").removeClass('bm_b');
						$(".tabs_e_quiz span:eq(2)").addClass('bm_1');
						//$(".tabs_e_quiz span:eq(2)").html("금메달");
						_triggerSaveBalloon('Balloon',2,'bm_1');
					}else if($ox_count3==1){
						$(".tabs_e_quiz span:eq(2)").removeClass('bm_b');
						$(".tabs_e_quiz span:eq(2)").addClass('bm_2');
						//$(".tabs_e_quiz span:eq(2)").html("은메달");
						_triggerSaveBalloon('Balloon',2,'bm_2');
					}else if($ox_count3 >=2){
						$(".tabs_e_quiz span:eq(2)").removeClass('bm_b');
						$(".tabs_e_quiz span:eq(2)").addClass('bm_3');
						//$(".tabs_e_quiz span:eq(2)").html("동메달");
						_triggerSaveBalloon('Balloon',2,'bm_3');
					}
					//$ox_count1 = 0;
					$(this).parent().parent().find(".pop-x1").hide();
					$(this).parent().parent().find(".pop-x2").hide();
					$(this).parent().parent().find(".pop-o").css("background","url('images/pop-common/o3.png') no-repeat");
					$(this).parent().parent().find(".pop-o").fadeIn(1);
					$(this).parent().parent().find(".pop-o").fadeOut(4000);
					$(this).parent().parent().find(".q_doc").fadeIn(1);
					$(this).parent().parent().find(".pop-explain").hide();
					$(this).parent().parent().find(".hint").hide();
					
					$(this).parent().parent().find(".pop-explain-hint").hide();
					$(".q_doc").on("click",function(){
							$(this).parent().parent().find(".pop-explain").fadeIn(1);
							$(this).parent().parent().find(".q_doc").hide();
							$(this).parent().parent().find(".pop-o").hide();
							$(this).parent().parent().find('.reagain').hide();
					});
				}else{
					play_sound_x();
					//오답일 경우 오답카운트 증가
					if($ox_countChk3 == "F"){
						if ($ox_count3 ==0){
							$ox_count3 = 1;
						}else{
							$ox_count3++;
						}
					}
					//오답카운트가 2보다 작을때
					if($ox_count3 < 2){
						$(this).parent().parent().find(".pop-o").hide();
						$(this).parent().parent().find(".pop-x2").hide();
						$(this).parent().parent().find(".pop-x1").fadeIn(1);
						$(this).parent().parent().find(".pop-x1").fadeOut(4000);
						$(this).parent().parent().find(".q_doc").hide();
						$(this).parent().parent().find(".pop-explain").hide();
						$(this).parent().parent().find(".hint").fadeIn(1);
						
						$(".hint").on("click",function(){
							$(this).parent().parent().find(".pop-explain-hint").fadeIn(1);
							$(this).parent().parent().find(".hint").hide();
							$(this).parent().parent().find(".pop-x1").hide();
							$(this).parent().parent().find('.reagain').hide();
						});
					}else{
						$(this).parent().parent().find(".pop-o").hide();
						$(this).parent().parent().find(".pop-x1").hide();
						$(this).parent().parent().find(".pop-x2").fadeIn(1);
						$(this).parent().parent().find(".pop-x2").fadeOut(4000);
						$(this).parent().parent().find(".hint").hide();
						$(this).parent().parent().find(".pop-explain-hint").hide();
						$(this).parent().parent().find(".q_doc").fadeIn(1);
						
						$(".q_doc").on("click",function(){
							$(this).parent().parent().find(".pop-explain").fadeIn(1);
							$(this).parent().parent().find(".q_doc").hide();
							$(this).parent().parent().find(".pop-x2").hide();
							$(this).parent().parent().find('.reagain').hide();
						});
						
					}
				}
			}else if($(this).parent().parent().hasClass("pop-tab-04")){
				$(this).parent().parent().find(".confirm").hide();
				if($tmpAcceptStr=="True"){
					play_sound_o();
					//정답을 맞추면 카운트를 멈춘다.
					$ox_countChk4 = "T";
					
					if($ox_count4==0){
						$(".tabs_e_quiz span:eq(3)").removeClass('bm_b');
						$(".tabs_e_quiz span:eq(3)").addClass('bm_1');
						//$(".tabs_e_quiz span:eq(3)").html("금메달");
						_triggerSaveBalloon('Balloon',3,'bm_1');
					}else if($ox_count4==1){
						$(".tabs_e_quiz span:eq(3)").removeClass('bm_b');
						$(".tabs_e_quiz span:eq(3)").addClass('bm_2');
						//$(".tabs_e_quiz span:eq(3)").html("은메달");
						_triggerSaveBalloon('Balloon',3,'bm_2');
					}else if($ox_count4 >=2){
						$(".tabs_e_quiz span:eq(3)").removeClass('bm_b');
						$(".tabs_e_quiz span:eq(3)").addClass('bm_3');
						//$(".tabs_e_quiz span:eq(3)").html("동메달");
						_triggerSaveBalloon('Balloon',3,'bm_3');
					}
					//$ox_count1 = 0;
					$(this).parent().parent().find(".pop-x1").hide();
					$(this).parent().parent().find(".pop-x2").hide();
					$(this).parent().parent().find(".pop-o").css("background","url('images/pop-common/o4.png') no-repeat");
					$(this).parent().parent().find(".pop-o").fadeIn(1);
					$(this).parent().parent().find(".pop-o").fadeOut(4000);
					$(this).parent().parent().find(".q_doc").fadeIn(1);
					$(this).parent().parent().find(".pop-explain").hide();
					$(this).parent().parent().find(".hint").hide();
					
					$(this).parent().parent().find(".pop-explain-hint").hide();
					$(".q_doc").on("click",function(){
							$(this).parent().parent().find(".pop-explain").fadeIn(1);
							$(this).parent().parent().find(".q_doc").hide();
							$(this).parent().parent().find(".pop-o").hide();
							$(this).parent().parent().find('.reagain').hide();
					});
				}else{
					play_sound_x();
					//오답일 경우 오답카운트 증가
					if($ox_countChk4 == "F"){
						if ($ox_count4 ==0){
							$ox_count4 = 1;
						}else{
							$ox_count4++;
						}
					}
					//오답카운트가 2보다 작을때
					if($ox_count4 < 2){
						$(this).parent().parent().find(".pop-o").hide();
						$(this).parent().parent().find(".pop-x2").hide();
						$(this).parent().parent().find(".pop-x1").fadeIn(1);
						$(this).parent().parent().find(".pop-x1").fadeOut(4000);
						$(this).parent().parent().find(".q_doc").hide();
						$(this).parent().parent().find(".pop-explain").hide();
						
						$(this).parent().parent().find(".hint").fadeIn(1);
						$(".hint").on("click",function(){
							$(this).parent().parent().find(".pop-explain-hint").fadeIn(1);
							$(this).parent().parent().find(".hint").hide();
							$(this).parent().parent().find(".pop-x1").hide();
							$(this).parent().parent().find('.reagain').hide();
						});
					}else{
						$(this).parent().parent().find(".pop-o").hide();
						$(this).parent().parent().find(".pop-x1").hide();
						$(this).parent().parent().find(".pop-x2").fadeIn(1);
						$(this).parent().parent().find(".pop-x2").fadeOut(4000);
						$(this).parent().parent().find(".hint").hide();
						$(this).parent().parent().find(".pop-explain-hint").hide();
						
						$(this).parent().parent().find(".q_doc").fadeIn(1);
						$(".q_doc").on("click",function(){
							$(this).parent().parent().find(".pop-explain").fadeIn(1);
							$(this).parent().parent().find(".q_doc").hide();
							$(this).parent().parent().find(".pop-x2").hide();
							$(this).parent().parent().find('.reagain').hide();
						});
						
					}
				}
			}else if($(this).parent().parent().hasClass("pop-tab-05")){
				$(this).parent().parent().find(".confirm").hide();
				if($tmpAcceptStr=="True"){
					play_sound_o();
					//정답을 맞추면 카운트를 멈춘다.
					$ox_countChk5 = "T";
					
					if($ox_count5==0){
						$(".tabs_e_quiz span:eq(4)").removeClass('bm_r');
						$(".tabs_e_quiz span:eq(4)").addClass('bm_1');
						//$(".tabs_e_quiz span:eq(4)").html("금메달");
						_triggerSaveBalloon('Balloon',4,'bm_1');
					}else if($ox_count5==1){
						$(".tabs_e_quiz span:eq(4)").removeClass('bm_r');
						$(".tabs_e_quiz span:eq(4)").addClass('bm_2');
						//$(".tabs_e_quiz span:eq(4)").html("은메달");
						_triggerSaveBalloon('Balloon',4,'bm_2');
					}else if($ox_count5 >=2){
						$(".tabs_e_quiz span:eq(4)").removeClass('bm_r');
						$(".tabs_e_quiz span:eq(4)").addClass('bm_3');
						//$(".tabs_e_quiz span:eq(4)").html("동메달");
						_triggerSaveBalloon('Balloon',4,'bm_3');
					}
					//$ox_count1 = 0;
					$(this).parent().parent().find(".pop-x1").hide();
					$(this).parent().parent().find(".pop-x2").hide();
					$(this).parent().parent().find(".pop-o").css("background","url('images/pop-common/o5.png') no-repeat");
					$(this).parent().parent().find(".pop-o").fadeIn(1);
					$(this).parent().parent().find(".pop-o").fadeOut(4000);
					$(this).parent().parent().find(".q_doc").fadeIn(1);
					$(this).parent().parent().find(".pop-explain").hide();
					$(this).parent().parent().find(".hint").hide();
					
					$(this).parent().parent().find(".pop-explain-hint").hide();
					$(".q_doc").on("click",function(){
							$(this).parent().parent().find(".pop-explain").fadeIn(1);
							$(this).parent().parent().find(".q_doc").hide();
							$(this).parent().parent().find(".pop-o").hide();
							$(this).parent().parent().find('.reagain').hide();
					});
				}else{
					play_sound_x();
					//오답일 경우 오답카운트 증가
					if($ox_countChk5 == "F"){
						if ($ox_count5 ==0){
							$ox_count5 = 1;
						}else{
							$ox_count5++;
						}
					}
					//오답카운트가 2보다 작을때
					if($ox_count5 < 2){
						$(this).parent().parent().find(".pop-o").hide();
						$(this).parent().parent().find(".pop-x2").hide();
						$(this).parent().parent().find(".pop-x1").fadeIn(1);
						$(this).parent().parent().find(".pop-x1").fadeOut(4000);
						$(this).parent().parent().find(".q_doc").hide();
						$(this).parent().parent().find(".pop-explain").hide();
						$(this).parent().parent().find(".hint").fadeIn(1);
						
						$(".hint").on("click",function(){
							$(this).parent().parent().find(".pop-explain-hint").fadeIn(1);
							$(this).parent().parent().find(".hint").hide();
							$(this).parent().parent().find(".pop-x1").hide();
							$(this).parent().parent().find('.reagain').hide();
						});
					}else{
						$(this).parent().parent().find(".pop-o").hide();
						$(this).parent().parent().find(".pop-x1").hide();
						$(this).parent().parent().find(".pop-x2").fadeIn(1);
						$(this).parent().parent().find(".pop-x2").fadeOut(4000);
						$(this).parent().parent().find(".hint").hide();
						$(this).parent().parent().find(".pop-explain-hint").hide();
						$(this).parent().parent().find(".q_doc").fadeIn(1);
						
						$(".q_doc").on("click",function(){
							$(this).parent().parent().find(".pop-explain").fadeIn(1);
							$(this).parent().parent().find(".q_doc").hide();
							$(this).parent().parent().find(".pop-x2").hide();
							$(this).parent().parent().find('.reagain').hide();
						});
						
					}
				}
			}else if($(this).parent().parent().hasClass("pop-tab-06")){
				$(this).parent().parent().find(".confirm").hide();
				if($tmpAcceptStr=="True"){
					play_sound_o();
					//정답을 맞추면 카운트를 멈춘다.
					$ox_countChk6 = "T";
					
					if($ox_count6==0){
						$(".tabs_e_quiz span:eq(5)").removeClass('bm_r');
						$(".tabs_e_quiz span:eq(5)").addClass('bm_1');
						//$(".tabs_e_quiz span:eq(5)").html("금메달");
						_triggerSaveBalloon('Balloon',5,'bm_1');
					}else if($ox_count6==1){
						$(".tabs_e_quiz span:eq(5)").removeClass('bm_r');
						$(".tabs_e_quiz span:eq(5)").addClass('bm_2');
						//$(".tabs_e_quiz span:eq(5)").html("은메달");
						_triggerSaveBalloon('Balloon',5,'bm_2');
					}else if($ox_count6 >=2){
						$(".tabs_e_quiz span:eq(5)").removeClass('bm_r');
						$(".tabs_e_quiz span:eq(5)").addClass('bm_3');
						//$(".tabs_e_quiz span:eq(5)").html("동메달");
						_triggerSaveBalloon('Balloon',5,'bm_3');
					}
					//$ox_count1 = 0;
					$(this).parent().parent().find(".pop-x1").hide();
					$(this).parent().parent().find(".pop-x2").hide();
					$(this).parent().parent().find(".pop-o").css("background","url('images/pop-common/o6.png') no-repeat");
					$(this).parent().parent().find(".pop-o").fadeIn(1);
					$(this).parent().parent().find(".pop-o").fadeOut(4000);
					$(this).parent().parent().find(".q_doc").fadeIn(1);
					$(this).parent().parent().find(".pop-explain").hide();
					$(this).parent().parent().find(".hint").hide();
					
					$(this).parent().parent().find(".pop-explain-hint").hide();
					$(".q_doc").on("click",function(){
							$(this).parent().parent().find(".pop-explain").fadeIn(1);
							$(this).parent().parent().find(".q_doc").hide();
							$(this).parent().parent().find(".pop-o").hide();
							$(this).parent().parent().find('.reagain').hide();
					});
				}else{
					play_sound_x();
					//오답일 경우 오답카운트 증가
					if($ox_countChk6 == "F"){
						if ($ox_count6 ==0){
							$ox_count6 = 1;
						}else{
							$ox_count6++;
						}
					}
					//오답카운트가 2보다 작을때
					if($ox_count6 < 2){
						$(this).parent().parent().find(".pop-o").hide();
						$(this).parent().parent().find(".pop-x2").hide();
						$(this).parent().parent().find(".pop-x1").fadeIn(1);
						$(this).parent().parent().find(".pop-x1").fadeOut(4000);
						$(this).parent().parent().find(".q_doc").hide();
						$(this).parent().parent().find(".pop-explain").hide();
						
						
						$(this).parent().parent().find(".hint").fadeIn(1);
						$(".hint").on("click",function(){
							$(this).parent().parent().find(".pop-explain-hint").fadeIn(1);
							$(this).parent().parent().find(".hint").hide();
							$(this).parent().parent().find(".pop-x1").hide();
							$(this).parent().parent().find('.reagain').hide();
						});
					}else{
						$(this).parent().parent().find(".pop-o").hide();
						$(this).parent().parent().find(".pop-x1").hide();
						$(this).parent().parent().find(".pop-x2").fadeIn(1);
						$(this).parent().parent().find(".pop-x2").fadeOut(4000);
						$(this).parent().parent().find(".hint").hide();
						$(this).parent().parent().find(".pop-explain-hint").hide();
						
						
						$(this).parent().parent().find(".q_doc").fadeIn(1);
						$(".q_doc").on("click",function(){
							$(this).parent().parent().find(".pop-explain").fadeIn(1);
							$(this).parent().parent().find(".q_doc").hide();
							$(this).parent().parent().find(".pop-x2").hide();
							$(this).parent().parent().find('.reagain').hide();
						});
						
					}
				}
			}
			
			//console.log($(this).parent().parent().find(".ox-img").html());
			
			//정답 이미지 닫기
			$(this).parent().parent().find(".pop-o,.pop-x1,.pop-x2").on('click',function(){
				$(this).hide();
			});
			
			//return false;
		
		}else if($("div").hasClass("e_finish")){	
			//단원 마무리
			//$parent_tab = $(this).closest('.container');
			$('.pop-question .pop-o-choice').remove();
			$('.pop-question .pop-x-choice').remove();
			
			$parent_tab = $parent.find(".conts");
			//console.log($parent_tab.html());
		//CS 객관식 단항
		//CM 객관식 다항
		//SS 주관식 단항
		//SM 주관식 다항	
			$count_ox =0;
			if($parent_tab.find(".tab-01").hasClass("tab-01")){				
				if($parent_tab.find(".tab-01").find(".CS").hasClass("CS")){
					var ep_user_index = $parent_tab.find(".tab-01").find(".user-answer").index();
					var ep_o_index = $parent_tab.find(".tab-01").find(".o-answer").index();
					//console.log(ep_user_index+"^"+ep_o_index);
					if(ep_user_index == ep_o_index){
						$tmpAcceptArr[0] ="True";
						$count_ox++;
					}else{
						$tmpAcceptArr[0] ="False";
					}
				}else if($parent_tab.find(".tab-01").find(".CM").hasClass("CM")){
					var tmpChk = 0;
					$parent_tab.find(".tab-01").find(".ans").each(function(){
						//var ep_user_index = $(".user-answer").index();
						//console.log($(this).attr("class") + " < $(this)");
						if ($(this).attr("class").indexOf("user-answer") > -1){
							if ($(this).attr("class").indexOf("o-answer") > -1){
								tmpChk = tmpChk + 1;
								//console.log($(this).index());
							}else{
								tmpChk = -1;
							}
						}
					});
					if ($parent_tab.find(".tab-01").find(".o-answer").length == tmpChk){
						$tmpAcceptArr[0] ="True";
						$count_ox++;
					}else{
						$tmpAcceptArr[0] ="False";
					}
				}else if($parent_tab.find(".tab-01").find(".SS").hasClass("SS")){
					
					//thisParent = $parent_tab.find(".tab-01").find(".SS").children().children().children().children();
					thisParent = $parent_tab.find(".tab-01").find(".SS").children().children().children();
					$thisID =thisParent.attr("id");
					$thisVal=thisParent.val();
					$isValue=correctObj[$thisID];
					//alert(thisParent.html());
					
					if($thisVal == $isValue){
						$tmpAcceptArr[0] ="True";
						$count_ox++;
					}else{
						$tmpAcceptArr[0] ="False";
					}
				}else if($parent_tab.find(".tab-01").find(".SM").hasClass("SM")){
					//정답을 체크안함
					$tmpAcceptArr[0] ="F";
				}

			}
			if($parent_tab.find(".tab-02").hasClass("tab-02")){
				if($parent_tab.find(".tab-02").find(".CS").hasClass("CS")){
					var ep_user_index = $parent_tab.find(".tab-02").find(".user-answer").index();
					var ep_o_index = $parent_tab.find(".tab-02").find(".o-answer").index();
					if(ep_user_index == ep_o_index){
						$tmpAcceptArr[1] ="True";
						$count_ox++;
					}else{
						$tmpAcceptArr[1] ="False";
					}
				}else if($parent_tab.find(".tab-02").find(".CM").hasClass("CM")){
					var tmpChk = 0;
					$parent_tab.find(".tab-02").find(".ans").each(function(){
						if ($(this).attr("class").indexOf("user-answer") > -1){
							if ($(this).attr("class").indexOf("o-answer") > -1){
								tmpChk = tmpChk + 1;
							}else{
								tmpChk = -1;
							}
						}
					});
					if ($parent_tab.find(".tab-02").find(".o-answer").length == tmpChk){
						$tmpAcceptArr[1] ="True";
						$count_ox++;
					}else{
						$tmpAcceptArr[1] ="False";
					}
				}else if($parent_tab.find(".tab-02").find(".SS").hasClass("SS")){
					thisParent = $parent_tab.find(".tab-02").find(".SS").children().children().children().children();
					$thisID =thisParent.attr("id");
					$thisVal=thisParent.val();
					$isValue=correctObj[$thisID];
					if($thisVal == $isValue){
						$tmpAcceptArr[1] ="True";
						$count_ox++;
					}else{
						$tmpAcceptArr[1] ="False";
					}
				}else if($parent_tab.find(".tab-02").find(".SM").hasClass("SM")){
					//정답을 체크안함
					$tmpAcceptArr[1] ="F";
				}
			}
			if($parent_tab.find(".tab-03").hasClass("tab-03")){
				if($parent_tab.find(".tab-03").find(".CS").hasClass("CS")){
					var ep_user_index = $parent_tab.find(".tab-03").find(".user-answer").index();
					var ep_o_index = $parent_tab.find(".tab-03").find(".o-answer").index();
					if(ep_user_index == ep_o_index){
						$tmpAcceptArr[2] ="True";
						$count_ox++;
					}else{
						$tmpAcceptArr[2] ="False";
					}
				}else if($parent_tab.find(".tab-03").find(".CM").hasClass("CM")){
					var tmpChk = 0;
					$parent_tab.find(".tab-03").find(".ans").each(function(){
						if ($(this).attr("class").indexOf("user-answer") > -1){
							if ($(this).attr("class").indexOf("o-answer") > -1){
								tmpChk = tmpChk + 1;
							}else{
								tmpChk = -1;
							}
						}
					});
					if ($parent_tab.find(".tab-03").find(".o-answer").length == tmpChk){
						$tmpAcceptArr[2] ="True";
						$count_ox++;
					}else{
						$tmpAcceptArr[2] ="False";
					}
				}else if($parent_tab.find(".tab-03").find(".SS").hasClass("SS")){
					//thisParent = $parent_tab.find(".tab-03").find(".SS").children().children().children().children();
					thisParent = $parent_tab.find(".tab-03").find(".answer_text").children();
					$thisID =thisParent.attr("id");
					$thisVal=thisParent.val();
					$isValue=correctObj[$thisID];
					//alert(thisParent.html());
					//alert($thisVal+'^^'+$isValue);
					if($thisVal == $isValue){
						$tmpAcceptArr[2] ="True";
						$count_ox++;
					}else{
						$tmpAcceptArr[2] ="False";
					}
				}else if($parent_tab.find(".tab-03").find(".SM").hasClass("SM")){
					//정답을 체크안함
					$tmpAcceptArr[2] ="F";
				}
			}
			if($parent_tab.find(".tab-04").hasClass("tab-04")){
				if($parent_tab.find(".tab-04").find(".CS").hasClass("CS")){
					var ep_user_index = $parent_tab.find(".tab-04").find(".user-answer").index();
					var ep_o_index = $parent_tab.find(".tab-04").find(".o-answer").index();
					if(ep_user_index == ep_o_index){
						$tmpAcceptArr[3] ="True";
						$count_ox++;
					}else{
						$tmpAcceptArr[3] ="False";
					}
				}else if($parent_tab.find(".tab-04").find(".CM").hasClass("CM")){
					var tmpChk = 0;
					$parent_tab.find(".tab-04").find(".ans").each(function(){
						if ($(this).attr("class").indexOf("user-answer") > -1){
							if ($(this).attr("class").indexOf("o-answer") > -1){
								tmpChk = tmpChk + 1;
							}else{
								tmpChk = -1;
							}
						}
					});
					if ($parent_tab.find(".tab-04").find(".o-answer").length == tmpChk){
						$tmpAcceptArr[3] ="True";
						$count_ox++;
					}else{
						$tmpAcceptArr[3] ="False";
					}
				}else if($parent_tab.find(".tab-04").find(".SS").hasClass("SS")){
					thisParent = $parent_tab.find(".tab-04").find(".SS").children().children().children().children();
					$thisID =thisParent.attr("id");
					$thisVal=thisParent.val();
					$isValue=correctObj[$thisID];
					
					if($thisVal == $isValue){
						$tmpAcceptArr[3] ="True";
						$count_ox++;
					}else{
						$tmpAcceptArr[3] ="False";
					}
				}else if($parent_tab.find(".tab-04").find(".SM").hasClass("SM")){
					//정답을 체크안함
					$tmpAcceptArr[3] ="F";
				}
			}
			if($parent_tab.find(".tab-05").hasClass("tab-05")){
				if($parent_tab.find(".tab-05").find(".CS").hasClass("CS")){
					var ep_user_index = $parent_tab.find(".tab-05").find(".user-answer").index();
					var ep_o_index = $parent_tab.find(".tab-05").find(".o-answer").index();
					if(ep_user_index == ep_o_index){
						$tmpAcceptArr[4] ="True";
						$count_ox++;
					}else{
						$tmpAcceptArr[4] ="False";
					}
				}else if($parent_tab.find(".tab-05").find(".CM").hasClass("CM")){
					var tmpChk = 0;
					$parent_tab.find(".tab-05").find(".ans").each(function(){
						if ($(this).attr("class").indexOf("user-answer") > -1){
							if ($(this).attr("class").indexOf("o-answer") > -1){
								tmpChk = tmpChk + 1;
								$count_ox++;
							}else{
								tmpChk = -1;
							}
						}
					});
					if ($parent_tab.find(".tab-05").find(".o-answer").length == tmpChk){
						$tmpAcceptArr[4] ="True";
					}else{
						$tmpAcceptArr[4] ="False";
					}
				}else if($parent_tab.find(".tab-05").find(".SS").hasClass("SS")){
					thisParent = $parent_tab.find(".tab-05").find(".SS").children().children().children();
						console.log(thisParent.html());
					$thisID =thisParent.attr("id");
					$thisVal=thisParent.val();
					$isValue=correctObj[$thisID];
					if($thisVal == $isValue){
						$tmpAcceptArr[4] ="True";
						$count_ox++;
					}else{
						$tmpAcceptArr[4] ="False";
					}
				}else if($parent_tab.find(".tab-05").find(".SM").hasClass("SM")){
					//정답을 체크안함
					$tmpAcceptArr[4] ="F";
				}
			}
			if($parent_tab.find(".tab-06").hasClass("tab-06")){
				if($parent_tab.find(".tab-06").find(".CS").hasClass("CS")){
					var ep_user_index = $parent_tab.find(".tab-06").find(".user-answer").index();
					var ep_o_index = $parent_tab.find(".tab-06").find(".o-answer").index();
					if(ep_user_index == ep_o_index){
						$tmpAcceptArr[5] ="True";
						$count_ox++;
					}else{
						$tmpAcceptArr[5] ="False";
					}
				}else if($parent_tab.find(".tab-06").find(".CM").hasClass("CM")){
					var tmpChk = 0;
					$parent_tab.find(".tab-06").find(".ans").each(function(){
						if ($(this).attr("class").indexOf("user-answer") > -1){
							if ($(this).attr("class").indexOf("o-answer") > -1){
								tmpChk = tmpChk + 1;
							}else{
								tmpChk = -1;
							}
						}
					});
					if ($parent_tab.find(".tab-06").find(".o-answer").length == tmpChk){
						$tmpAcceptArr[5] ="True";
						$count_ox++;
					}else{
						$tmpAcceptArr[5] ="False";
					}
				}else if($parent_tab.find(".tab-06").find(".SS").hasClass("SS")){
					thisParent = $parent_tab.find(".tab-06").find(".SS").children().children().children().children();
					$thisID =thisParent.attr("id");
					$thisVal=thisParent.val();
					$isValue=correctObj[$thisID];
					if($thisVal == $isValue){
						$tmpAcceptArr[5] ="True";
						$count_ox++;
					}else{
						$tmpAcceptArr[5] ="False";
					}
				}else if($parent_tab.find(".tab-06").find(".SM").hasClass("SM")){
					//정답을 체크안함
					$tmpAcceptArr[5] ="F";
				}
			}
			if($parent_tab.find(".tab-07").hasClass("tab-07")){
				if($parent_tab.find(".tab-07").find(".CS").hasClass("CS")){
					var ep_user_index = $parent_tab.find(".tab-07").find(".user-answer").index();
					var ep_o_index = $parent_tab.find(".tab-07").find(".o-answer").index();
					if(ep_user_index == ep_o_index){
						$tmpAcceptArr[6] ="True";
						$count_ox++;
					}else{
						$tmpAcceptArr[6] ="False";
					}
				}else if($parent_tab.find(".tab-07").find(".CM").hasClass("CM")){
					var tmpChk = 0;
					$parent_tab.find(".tab-07").find(".ans").each(function(){
						if ($(this).attr("class").indexOf("user-answer") > -1){
							if ($(this).attr("class").indexOf("o-answer") > -1){
								tmpChk = tmpChk + 1;
							}else{
								tmpChk = -1;
							}
						}
					});
					if ($parent_tab.find(".tab-07").find(".o-answer").length == tmpChk){
						$tmpAcceptArr[6] ="True";
						$count_ox++;
					}else{
						$tmpAcceptArr[6] ="False";
					}
				}else if($parent_tab.find(".tab-07").find(".SS").hasClass("SS")){
					thisParent = $parent_tab.find(".tab-07").find(".SS").children().children().children().children();
					$thisID =thisParent.attr("id");
					$thisVal=thisParent.val();
					$isValue=correctObj[$thisID];
					if($thisVal == $isValue){
						$tmpAcceptArr[6] ="True";
						$count_ox++;
					}else{
						$tmpAcceptArr[6] ="False";
					}
				}else if($parent_tab.find(".tab-07").find(".SM").hasClass("SM")){
					//정답을 체크안함
					$tmpAcceptArr[6] ="F";
				}
			}
			
			
			if(($tmpAcceptArr[0] != "")&&($tmpAcceptArr[1] != "")&&($tmpAcceptArr[2] != "")&&($tmpAcceptArr[3] != "")&&($tmpAcceptArr[4] != "")&&($tmpAcceptArr[5] != "")&&($tmpAcceptArr[6] != "")){
				$tmpAcceptStr = $tmpAcceptArr[0]+"^;^"+$tmpAcceptArr[1]+"^;^"+$tmpAcceptArr[2]+"^;^"+$tmpAcceptArr[3]+"^;^"+$tmpAcceptArr[4]+"^;^"+$tmpAcceptArr[5]+"^;^"+$tmpAcceptArr[6];
				//console.log($tmpAcceptStr);
				
				//채점이미지
				var fo_choice = "<em class=\"pop-o-choice\"><img src=\"images/pop-common/quiz_type_ox_o.png\" width=\"50\"/></em>";
				var fx_choice = "<em class=\"pop-x-choice\"><img src=\"images/pop-common/quiz_type_ox_x.png\"  width=\"50\"/></em>";
				var oxTmp="";
				for (ii=0; ii<7 ;ii++){			
					//console.log($tmpAcceptArr[ii]);
					$('.finish_question:eq('+ii+')').find('em').remove();
					
					if($tmpAcceptArr[ii]=="True"){
						$('.finish_question:eq('+ii+')').find('span').prepend(fo_choice);
					}else if($tmpAcceptArr[ii]=="False"){
						$('.finish_question:eq('+ii+')').find('span').prepend(fx_choice);
					}else if($tmpAcceptArr[ii]=="F"){
						
					}
					//단원마무리 채점저장변수
					if (oxTmp != ""){
						var gubn=":";
					}else{
						var gubn="";
					}
					oxTmp = oxTmp+gubn+$tmpAcceptArr[ii];
				}
				
				//단원마무리 채점저장
				_triggerSaveOX('e_finish',oxTmp);

				$(".finish_txt span:eq(1)").html($count_ox);
				$(".finish_txt2 span").html($('.SM').length);



				//채점 OX 표시
				$(".confirm").hide(); // 확인 버튼
				$(".pop-explain").fadeIn(1); //해설
				$(".finish_view").fadeIn(1); //채점 text
				$(".e_finish_reset").fadeIn(1); //전체리셋
				$('.e_finish').mCustomScrollbar("update");
			}else{
				$(".confirm").fadeIn(1);
				$(".reagain").hide();
				
				
				console.log("풀지않은 문제가 있습니다.");
			}

			
		
		}else{
			
			//return false;
		}
		
		
		//alert($tmpAcceptStr);
		//alert($(this).parent().parent().find(".user-answer").index());
		//alert($(this).parent().parent().find(".o-answer").index());	
		
	}else if(tmpSelector=="special"){
		fn_ans_correct(); //도전,어떤 정답 체크
	}

	
	/*
	$(".pop-explain").fadeIn(timing,function(){
		//$(".pop-suggest").fadeIn(timing);
	});
	*/
});

/*
$(document).on("click",".pop-explain",function(e){

	$(".pop-explain").fadeOut(timing);	
});	
*/
$(document).on("click",".pop-o",function(e){
	$(".pop-o").fadeOut(100);
});

$(document).on("click",".pop-x",function(e){
	$(".pop-x").fadeOut(100);
});


/*
$(document).on("click",".ox-img",function(e){
		$('.ox-img').hide();
	});
*/
/*
########################################################
사용자가 선택한 답변
유형		-	객관식 : CS,CM
			주관식 : SS,SM
			서술형 : ES,EM
유형에 따라 객관식은 선택 제한.
########################################################
*/

// 객관식
$(document).on("click","li.ans,span.ans,p.ans",function(){
	$this	=	$(this);
	$parent	=	$(this).closest('.question');
	$fin 	=	$(this).closest('.wrap.final').attr("class");
	$parentOX=	$(this).closest('.pop-quiz-ox');
	//$par = $(this).siblings(".question");
	//$par = $(this).parent().find(".question");

	if($fin){
			
		/* ###################### 대다원 마무리 #####################.S */
		$Final_problem = $(this).closest('.p-problem');
		
		if($parent.hasClass("CS")){
			$parent.find(".ans").removeClass("user-answer");
			$parent.find(".pop-user-answer").remove();
			$this.addClass("user-answer");
			if($parentOX.length > 0){
				$this.prepend("<span class=\"pop-user-answer largeCheck\"><img src=\"images/common/sign-choice-large-black-wrong.png\" /></span>");
			}else{
				$this.prepend("<span class=\"pop-user-answer\"><img src=\"images/common/sign-choice-wrong.png\" /></span>");
			}
			
			$(".p-control",$Final_problem).fadeIn(timing);
		}else if($parent.hasClass("CM")){


			/* 20140115 .S*/
			// 지문에 답이 여러개일경우  선택문제의 v 표시가 토글되지 않음
			if($this.hasClass("user-answer")){
				$this.find("span.pop-user-answer").remove();
				$this.removeClass("user-answer");
			}else{
				$this.addClass("user-answer");

				// 지문에 O,X 표시하는 문제일때
				if($parentOX.length > 0){
					$this.prepend("<span class=\"pop-user-answer largeCheck\"><img src=\"images/common/sign-choice-large-black-wrong.png\" /></span>");
				}else{
					$this.prepend("<span class=\"pop-user-answer\"><img src=\"images/common/sign-choice-wrong.png\" /></span>");
				}

			}

			if($parent.find(".user-answer").length < 1){
			// 지문에 선택되어 있는것이 하나도 없는경우에는 '확인하기' 버튼을 사라지게함
			$(".p-control",$Final_problem).fadeOut(timing);
			}else{
			$(".p-control",$Final_problem).fadeIn(timing);
			}


			/* 20140115 .E*/
			// 2014-01-15  backup
			//$this.addClass("user-answer");
			//if($parentOX.length > 0){
			//	$this.prepend("<span class=\"pop-user-answer largeCheck\"><img src=\"images/common/sign-choice-large-black-wrong.png\" /></span>");
			//}else{
			//	$this.prepend("<span class=\"pop-user-answer\"><img src=\"images/common/sign-choice-wrong.png\" /></span>");
			//}
			//$(".p-control",$Final_problem).fadeIn(timing);



		}else{
			return;
		}
		/* ###################### 대다원 마무리 #####################.E */
	}else{
		
		/* ###################### 일반 팝업| #####################.S */
		
		//console.log($parent.attr('class'));
		if($parent.hasClass("CS")){
			
			play_sound_click();
			$parent.find(".ans").removeClass("user-answer");
			$parent.find(".pop-user-answer").remove();
			$this.addClass("user-answer");
			if($parentOX.length > 0){
				$this.prepend("<span class=\"pop-user-answer largeCheck\"><img src=\"images/common/sign-choice-large-black-wrong.png\" /></span>");
			}else{
				$this.prepend("<span class=\"pop-user-answer\"><img src=\"images/common/sign-choice-wrong.png\" /></span>");
			}
			//s_accept 도전 맞춰보기 강석우
			if($("div").hasClass("s_accept")){
				
				//alert($parent.parent().attr('class'));
				$(".btn_qsnext").hide();
				$('.next').hide();
				$('.btn_result').hide();
				if($parent.parent().hasClass("pop-tab-01")){
					$("#pop-none2").fadeIn(1);
					$("#confirm2").fadeIn(1);
				}else if($parent.parent().hasClass("pop-tab-02")){
					
					$("#pop-none3").fadeIn(1);
					$("#confirm3").fadeIn(1);
				}else if($parent.parent().hasClass("pop-tab-03")){
					$("#pop-none4").fadeIn(1);
					$("#confirm4").fadeIn(1);
				}
				
			}else if($("div").hasClass("s_quiz")){	
				$(".pop-explain").hide();
				$(".confirm").fadeIn(1);
			}else if($("div").hasClass("e_quiz")){
				$parent.parent().find(".pop-explain").hide();
				$parent.parent().find(".pop-explain-hint").hide();
				$parent.parent().find(".hint").hide();
				$parent.parent().find(".q_doc").hide();
				$parent.parent().find('.reagain').fadeIn(1);
				$parent.parent().find(".confirm").fadeIn(1);
				
				//$("#confirm").fadeIn(1);
			}else if($("div").hasClass("e_finish")){
				//단원 마무리
				$(".confirm").fadeIn(1);
				 $('.e_finish').mCustomScrollbar("update");
				//console.log($parent.parent().html());
			}else{
			}

			
		}else if($parent.hasClass("CM")){

			/* 20140115 .S*/
			// 지문에 답이 여러개일경우  선택문제의 v 표시가 토글되지 않음
			if($this.hasClass("user-answer")){
				$this.find("span.pop-user-answer").remove();
				$this.removeClass("user-answer");
			}else{
				$this.addClass("user-answer");

				// 지문에 O,X 표시하는 문제일때
				if($parentOX.length > 0){
					$this.prepend("<span class=\"pop-user-answer largeCheck\"><img src=\"images/common/sign-choice-large-black-wrong.png\" /></span>");
				}else{
					$this.prepend("<span class=\"pop-user-answer\"><img src=\"images/common/sign-choice-wrong.png\" /></span>");
				}
			}

			if($("div").hasClass("e_quiz")){
				$parent.parent().find(".pop-explain").hide();
				$parent.parent().find(".pop-explain-hint").hide();
				$parent.parent().find(".hint").hide();
				$parent.parent().find(".q_doc").hide();
				$parent.parent().find('.reagain').fadeIn(1);
				$parent.parent().find(".confirm").fadeIn(1);
			}else{
				if($parent.find(".user-answer").length < 1){
				// 지문에 선택되어 있는것이 하나도 없는경우에는 '확인하기' 버튼을 사라지게함
					$(".ctl.btn.confirm").fadeOut(timing);
				}else{
					
					$(".ctl.btn.confirm").fadeIn(timing);
				}
			}
		}else if($parent.hasClass("SS")){
			
			if($("div").hasClass("s_quiz")){	
				$(".pop-explain").hide();
				
				$(".confirm").fadeIn(1);
			}else if($("div").hasClass("e_finish")){
				
				//단원 마무리
				$(".confirm").fadeIn(1);
				
				//console.log($parent.parent().html());
			}
		
		}else if($parent.hasClass("SM")){
			
			if($("div").hasClass("s_quiz")){	
				$(".pop-explain").hide();

				$(".confirm").fadeIn(1);
			}else if($("div").hasClass("e_finish")){
				//단원 마무리
				$(".confirm").fadeIn(1);
				//console.log($parent.parent().html());
			}
		}else if($parent.hasClass("togle_chk")){
			
			play_sound_click();
			//console.log($this.html());
			
			if($this.children().hasClass("pop-user-answer")){
				$parent.find(".ans").removeClass("user-answer");
				$parent.find(".pop-user-answer").remove();
				
			}else{
				$this.addClass("user-answer");
				$this.prepend("<span class=\"pop-user-answer\"><img src=\"images/common/sign-choice-wrong.png\" /></span>");
			}
		
		
		}else{
			return;
		}
		/* ###################### 일반 팝업| #####################.E */
	}

	//강석우 추가
	//$(".pop-o").fadeOut(100);
	//$(".pop-x").fadeOut(100);

	//사용자 저장
	_triggerSaveSelect($this);
});

//TEXTAREA ENTER DISABLED
/*
$(document).on("keydown","textarea",function(e){


	var clickCode = (e.keyCode ? e.keyCode : e.which);
	if(clickCode==13){
		event.returnValue=false;
	}
});
*/
$(document).on('keydown','textarea, input[type="text"]',function(e){

	var code = e.keyCode ? e.keyCode : e.which;

	if(code==13 || code==9 || code==10){
		event.returnValue=false;
		$(this).blur();
		return false;
	}

});



//주관식, 서술형
$(document).on("keyup","input.ans,textarea.ans",function(){

	$this	=	$(this);
	//$parent	=	$(this).closest('.question');
	$parent	=	$(this).closest('.question');
	$fin 	=	$(this).closest('.wrap.final').attr("class");

	if($fin){
		$Final_problem = $(this).closest('.p-problem');
		/* ###################### 대다원 마무리 #####################.S */
		if($parent.hasClass("SS")){
			if($this.val().length < 1){
				$this.removeClass("user-answer");
				$(".p-control",$Final_problem).fadeOut(timing);
				return;
			}else{
				$this.addClass("user-answer");
				$(".p-control",$Final_problem).fadeIn(timing);
			}
		}else if($parent.hasClass("SM")){
			var tmpCheck=true;
			$parent.find(".ans").each(function(){
				if($(this).val().length < 1){
					tmpCheck=false;
				}
			});
			if(tmpCheck){
				$this.addClass("user-answer");
				$(".p-control",$Final_problem).fadeIn(timing);
				return;
			}else{
				$this.removeClass("user-answer");
				$(".p-control",$Final_problem).fadeOut(timing);
				return;

			}

		}else if($parent.hasClass("ES")){

			if($this.val().length < 1){
				$this.removeClass("user-answer");
				//$(".ctl.btn.confirm").fadeOut(timing);
				$(".p-control",$Final_problem).fadeOut(timing);
				return;
			}else{
				$this.addClass("user-answer");
				//$(".ctl.btn.confirm").fadeIn(timing);
				$(".p-control",$Final_problem).fadeIn(timing);
				
				if($(".pop-btn-grp",$Final_problem)){
					$(".ctl.btn.again, .ctl.btn.confirm").fadeIn(timing);
				}
			}
		}else if($parent.hasClass("EM")){
			var tmpCheck=true;
			$parent.find(".ans").each(function(){
				if($(this).val().length < 1){
					tmpCheck=false;
				}
			});
			if(tmpCheck){
				$this.addClass("user-answer");
				//$(".ctl.btn.confirm").fadeIn(timing);
				$(".p-control",$Final_problem).fadeIn(timing);
				return;
			}else{
				$this.removeClass("user-answer");
				//$(".ctl.btn.confirm").fadeOut(timing);
				$(".p-control",$Final_problem).fadeOut(timing);
				return;

			}
		}
		/* ###################### 대다원 마무리 #####################.E */
	}else{
		/* ###################### 일반 팝업| #####################.S */
		
		if($parent.hasClass("SS")){
			
			if($("div").hasClass("e_finish")){
				if($this.val().length < 1){
					$this.removeClass("user-answer");
					$(".ctl.btn.confirm").fadeOut(timing);
					return;
				}else{
					$this.addClass("user-answer");
					$(".ctl.btn.confirm").fadeIn(1);
					$('.e_finish').mCustomScrollbar("update");
					
				}
			}else{
				if($this.val().length < 1){
					$this.removeClass("user-answer");
					$parent.parent().find(".ctl.btn.confirm").fadeOut(timing);
					return;
				}else{
					$this.addClass("user-answer");
					$parent.parent().find(".ctl.btn.confirm").fadeIn(1);
					$parent.parent().find(".pop-explain").fadeOut(timing);
					$parent.parent().find(".hint").hide();
					$parent.parent().find(".q_doc").hide();
				}
			}
		}else if($parent.hasClass("SM")){
			var tmpCheck=true;
			$parent.find(".ans").each(function(){
				if($(this).val().length < 1){
					tmpCheck=false;
				}
			});
			
			if($("div").hasClass("e_finish")){
				if(tmpCheck){
					$this.addClass("user-answer");
					$(".ctl.btn.confirm").fadeIn(timing);
					$('.e_finish').mCustomScrollbar("update");
					return;
				}else{
					$this.removeClass("user-answer");
					$(".ctl.btn.confirm").fadeOut(timing);
					return;
				}
			}else{
				if(tmpCheck){
					$this.addClass("user-answer");
					$parent.parent().find(".ctl.btn.confirm").fadeIn(timing);
					return;
				}else{
					$this.removeClass("user-answer");
					$parent.parent().find(".ctl.btn.confirm").fadeOut(timing);
					return;
				}
			}
		}else if($parent.hasClass("ES")){
			if($this.val().length < 1){
				$this.removeClass("user-answer");
				$parent.parent().find(".ctl.btn.confirm").fadeOut(timing);
				return;
			}else{
				$this.addClass("user-answer");
				$parent.parent().find(".ctl.btn.confirm").fadeIn(timing);
			}
		}else if($parent.hasClass("EM")){
			var tmpCheck=true;
			$parent.find(".ans").each(function(){
				if($(this).val().length < 1){
					tmpCheck=false;
				}
			});
			if(tmpCheck){
				$this.addClass("user-answer");
				$parent.parent().find(".ctl.btn.confirm").fadeIn(timing);
				return;
			}else{
				$this.removeClass("user-answer");
				$parent.parent().find(".ctl.btn.confirm").fadeOut(timing);
				return;

			}
		}
		
		/* ###################### 일반 팝업 #####################.E */
	}
});


//힌트 해설 닫기 확인버튼 다시풀기버튼 활성화
$(document).on('click','.e_quiz_doc_close',function(){
	//console.log($(this).parent().parent().parent().parent().html());
	$(this).parent().parent().parent().parent().find(".ctl.btn.confirm").fadeIn(1);
	$(this).parent().parent().parent().parent().find(".ctl.btn.reagain").fadeIn(1);

	$(this).parent().parent().parent().parent().find('.pop-explain-hint').hide();
	$(this).parent().parent().parent().parent().find('.pop-explain').hide();
});

	
// ##################################################### 영상,소리 .S#####################################################
function AllOff(){
	$("video, audio").each(function(){
		$(this).get(0).pause();
		
		//console.log($("div").find('.s1').attr('src'));
		
		//오디오 버튼 초기화
		if($("div").find('.s1').attr('src')=="images/common/sound_02.png"){
			$("div").find('.s1').attr('src','images/common/sound_01.png');
			$("div").find('.s1').removeClass('active');
			$("div").find('.s1').removeClass('btn-pause');
		}
		$(".soundCloseBg").hide();
		
		//비디오 버튼 초기화
		//$(this).parent().parent().find('.video-default').fadeIn(1);
		//$(this).get(0).load();
		//$(".btn_videoPlay").fadeIn(1);
	});
}

/*video single*/
function videoPlay(){
	$(".video_area").each(function(){

		$(".btn_videoPlay", $(this)).on("click", function(){
			AllOff();
			$("video", $(this).parent()).get(0).play();
			$(this).parents(".popLayer").hide().fadeIn(1);
			$(this).parents(".popLayer_bg").hide().fadeIn(1);
			$(this).hide();
		});

		$("video", $(this)).on('pause ended', function (){
		  $(".btn_videoPlay", $(this).parent()).fadeIn(1);
		});

		$("video", $(this)).on('play', function (){
		  $(".btn_videoPlay", $(this).parent()).hide();
		});

	});
}

$(document).on("click",".doc_close",function(){
	$('.pop-explain.squiz').hide();
});


// ##################################################### 영상,소리 .E#####################################################
/* 웹뷰 Scale 조정치 */
currentScale=function()
{
	if( typeof WebKitCSSMatrix == "undefined" )
		return 1;

	if( window.getComputedStyle(document.body).webkitTransform == "none" )
		return 1;


	var curTransform = new WebKitCSSMatrix(window.getComputedStyle(document.body).webkitTransform);

	return curTransform.d;
}


_setBasePopPage=function(type,mode,URL,tabs,pageTitle){
	var tmpPopBasePageValue="";
	if(type=="" && mode=="" && URL==""){
		tmpPopBasePageValue="";
	}else{
		tmpPopBasePageValue=type+"^:^"+mode+"^:^"+URL+"^:^"+tabs+"^:^"+pageTitle;
	}
	$("#popOpenedPage").val(tmpPopBasePageValue);
	//_setBasePopPage();

	_trigger_setValue();
}

//윈도우10
init_js=function(src_name){
	var scriptUI=document.createElement('script');
	var urlUI = src_name;
	scriptUI.type='text/javascript';
	scriptUI.language='javascript';
	scriptUI.src=urlUI + '?d=' + new Date().getTime();	
	//윈도우 10
	if(WindowsTenOS){
		window.external.notify(scriptUI.src);
	}else{
		$("body").append(scriptUI);
	}
}
//윈도우10
function init_popup_close()
{
			if($docType=="quiz"){
  			$(".ui-dialog").css("background","url(images/pop-common/bg_wrap_quiz_start.png)");
			$(".ui-dialog-title").html("<img src=\"images/pop-common/pop_tit_quiz_start.png\" alt=\"마무리퀴즈\" />");
			
			$(".ui-dialog-titlebar-close").html("<img src=\"images/pop-common/pop_top_close_o.png\" alt=\"문제닫기\" />");
			
  		}else if($docType=="try"){
  			$(".ui-dialog").css("background","url(images/pop-common/bg_wrap_cre_up.png)");
			$(".ui-dialog-title").html("<img src=\"images/pop-common/pop_tit_inq_atv.png\" alt=\"혼자 해보기\" />");
			
			$(".ui-dialog-titlebar-close").html("<img src=\"images/pop-common/pop_top_close_g.png\" alt=\"문제닫기\" />");
		
		}else if($docType=="note"){
  			$(".ui-dialog").css("background","url(images/pop-common/bg_wrap_cre_up.png)");
			if($mode=="std"){
  				$(".ui-dialog-title").html("<img src=\"images/pop-common/pop_tit_inq_atv.png\" alt=\"탐구활동\" />");
				
  			}else if($mode=="note-exp"){
  				$(".ui-dialog-title").html("<img src=\"images/pop-common/pop_tit_inq_atv.png\" alt=\"탐구활동\" />");
				
  			}
			$(".ui-dialog-titlebar-close").html("<img src=\"images/pop-common/pop_top_close_g.png\" alt=\"문제닫기\" />");
		}else if($docType=="note2"){
  			$(".ui-dialog").css("background","url(images/pop-common/bg_wrap_cre_up.png)");
			if($mode=="std"){
  				$(".ui-dialog-title").html("<img src=\"images/pop-common/pop_tit_inq_atv.png\" alt=\"탐구활동\" />");
				
  			}else if($mode=="note-exp"){
  				$(".ui-dialog-title").html("<img src=\"images/pop-common/pop_tit_inq_atv.png\" alt=\"탐구활동\" />");
				
  			}
			$(".ui-dialog-titlebar-close").html("<img src=\"images/pop-common/pop_top_close_g.png\" alt=\"문제닫기\" />");
		}else if($docType=="note3"){
  			$(".ui-dialog").css("background","url(images/pop-common/bg_wrap_cre_up.png)");
			if($mode=="std"){
  				$(".ui-dialog-title").html("<img src=\"images/pop-common/pop_tit_inq_atv.png\" alt=\"탐구활동\" />");
				
  			}else if($mode=="note-exp"){
  				$(".ui-dialog-title").html("<img src=\"images/pop-common/pop_tit_inq_atv.png\" alt=\"탐구활동\" />");
				
  			}
			$(".ui-dialog-titlebar-close").html("<img src=\"images/pop-common/pop_top_close_g.png\" alt=\"문제닫기\" />");
  		}else if($docType=="wonder"){
  			$(".ui-dialog").css("background","url(images/pop-common/bg_wrap_cre_up.png)");
			$(".ui-dialog-title").html("<img src=\"images/pop-common/pop_tit_inq_atv.png\" alt=\"궁금해요\" />");
			
			$(".ui-dialog-titlebar-close").html("<img src=\"images/pop-common/pop-common/pop_top_close_g.png\" alt=\"문제닫기\" />");
  		}else if($docType=="ico"){
  			$(".ui-dialog").css("background","url(images/pop-common/bg_wrap_cre_up.png)");
			$(".ui-dialog-title").html("<img src=\"images/pop-common/pop_tit_inq_atv.png\" alt=\"심화학습\" />");
			
			$(".ui-dialog-titlebar-close").html("<img src=\"images/pop-common/pop_top_close_g.png\" alt=\"문제닫기\" />");

  		}else if($docType=="think"){
  			$(".ui-dialog").css("background","url(images/pop-common/bg_wrap_think_open.png)");
			$(".ui-dialog-title").html("<img src=\"images/pop-common/pop_tit_think_open.png\" alt=\"생각열기\" />");
			
			$(".ui-dialog-titlebar-close").html("<img src=\"images/pop-common/pop_top_close_g.png\" alt=\"문제닫기\" />");
		
		}else if($docType=="thinkfin"){
  			$(".ui-dialog").css("background","url(images/pop-common/bg_wrap_think_finish.png)");
			$(".ui-dialog-title").html("<img src=\"images/pop-common/pop_tit_think_finish.png\" alt=\"생각마무리\" />");
			
			$(".ui-dialog-titlebar-close").html("<img src=\"images/pop-common/pop_top_close_p.png\" alt=\"문제닫기\" />");
				
  		}else if($docType=="challenge"){
  			$(".ui-dialog").css("background","url(images/pop-common/bg_wrap_challenge.png)");
			$(".ui-dialog-title").html("<img src=\"images/pop-common/pop_tit_challenge.png\" alt=\"도전 맞춰보기\" />");
			
			$(".ui-dialog-titlebar-close").html("<img src=\"images/pop-common/pop_top_close_g.png\" alt=\"문제닫기\" />");
		
		}else if($docType=="creup"){
  			$(".ui-dialog").css("background","url(images/pop-common/bg_wrap_cre_up.png)");
			$(".ui-dialog-title").html("<img src=\"images/pop-common/pop_tit_cre_up.png\" alt=\"창의력 UP!\" />");
			
			$(".ui-dialog-titlebar-close").html("<img src=\"images/pop-common/pop_top_close_p.png\" alt=\"문제닫기\" />");
			
		}else if($docType=="inquiry"){
  			$(".ui-dialog").css("background","url(images/pop-common/bg_wrap_inq_free.png)");
			$(".ui-dialog-title").html("<img src=\"images/pop-common/pop_tit_inq_free.png\" alt=\"자유탐구\" />");
			
			$(".ui-dialog-titlebar-close").html("<img src=\"images/pop-common/pop_top_close_o.png\" alt=\"문제닫기\" />");
		
		}else if($docType=="cretwn"){
  			$(".ui-dialog").css("background","url(images/pop-common/bg_wrap_cre_twn.png)");
			$(".ui-dialog-title").html("<img src=\"images/pop-common/pop_tit_cre_twn.png\" alt=\"창의가 반짝\" />");
			
			$(".ui-dialog-titlebar-close").html("<img src=\"images/pop-common/pop_top_close_o.png\" alt=\"문제닫기\" />");
			
		}else if($docType=="inqsuksuk"){
  			$(".ui-dialog").css("background","url(images/pop-common/bg_wrap_inq_suk.png)");
			$(".ui-dialog-title").html("<img src=\"images/pop-common/pop_tit_inq_suk.png\" alt=\"탐구가 쑥쑥\" />");
			
			$(".ui-dialog-titlebar-close").html("<img src=\"images/pop-common/pop_top_close_g.png\" alt=\"문제닫기\" />");
			
		}else if($docType=="speed"){
  			$(".ui-dialog").css("background","url(images/pop-common/bg_wrap_cre_up.png)");
			$(".ui-dialog-title").html("<img src=\"images/pop-common/pop_tit_inq_atv.png\" alt=\"속력비교\" />");
			
			$(".ui-dialog-titlebar-close").html("<img src=\"images/pop-common/pop_top_close_g.png\" alt=\"문제닫기\" />");
			
		}else if($docType=="car"){
  			$(".ui-dialog").css("background","url(images/pop-common/bg_wrap_cre_up.png)");
			$(".ui-dialog-title").html("<img src=\"images/pop-common/pop_tit_inq_atv.png\" alt=\"자동차경주\" />");
			
			$(".ui-dialog-titlebar-close").html("<img src=\"images/pop-common/pop_top_close_g.png\" alt=\"문제닫기\" />");
			
		}else if($docType=="chapter"){
  			$(".ui-dialog").css("background","url(images/pop-common/bg_wrap_unit_finish.png)");
			$(".ui-dialog-title").html("<img src=\"images/pop-common/pop_tit_unit_finish.png\" alt=\"단원마무리\" />");
			
			$(".ui-dialog-titlebar-close").html("<img src=\"images/pop-common/pop_top_close_o.png\" alt=\"문제닫기\" />");
		
		}else if($docType=="do"){
  			$(".ui-dialog").css("background","url(images/pop-common/bg_wrap_plus.png)  no-repeat -1px 0");
			$(".ui-dialog-title").html("<img src=\"images/pop-common/pop_tit_plus.png\" alt=\"더 알아보기\" />");
			
			$(".ui-dialog-titlebar-close").html("<img src=\"images/pop-common/pop_top_close_g.png\" alt=\"문제닫기\" />");
			
  		
//신규문제풀이 추가
		}else if($docType=="s_accept"){
  			//팝업배경
			$(".ui-dialog").css("background","url(images/pop-common/bg_wrap_challenge.png)");
			$(".ui-dialog-title").html("<img src=\"images/pop-common/pop_tit_challenge.png\" alt=\"도전 맞혀보기\" />");
			
			$(".ui-dialog-titlebar-close").html("<img src=\"images/pop-common/pop_top_close_g.png\" alt=\"문제닫기\" />");
		}else if($docType=="s_quiz"){
  			$(".ui-dialog").css("background","url(images/pop-common/bg_wrap_quiz_start.png)");
			$(".ui-dialog-title").html("<img src=\"images/pop-common/pop_tit_quiz_start.png\" alt=\"시작퀴즈\" />");
			
			$(".ui-dialog-titlebar-close").html("<img src=\"images/pop-common/pop_top_close_o.png\" alt=\"문제닫기\" />");
		}else if($docType=="e_quiz"){
  			$(".ui-dialog").css("background","url(images/pop-common/bg_wrap_quiz_finish.png) no-repeat");
			$(".ui-dialog-title").html("<img src=\"images/pop-common/pop_tit_quiz_finish.png\" alt=\"마무리퀴즈\" />");
			
			$(".ui-dialog-titlebar-close").html("<img src=\"images/pop-common/pop_top_close_p.png\" alt=\"문제닫기\" />");
		
		}else if($docType=="e_finish"){
  			$(".ui-dialog").css("background","url(images/pop-common/bg_wrap_unit_finish.png)");
			$(".ui-dialog-title").html("<img src=\"images/pop-common/pop_tit_unit_finish.png\" alt=\"단원마무리\" />");
			
			$(".ui-dialog-titlebar-close").html("<img src=\"images/pop-common/pop_top_close_o.png\" alt=\"문제닫기\" />");

  		}
}
//윈도우10
$(document).on("click", ".ui-dialog-titlebar-close", function () {
    $('.ui-dialog-content').html('');
    //add user answer Save
    //_Call_User_answer_save();
    //$(".pop-dialog,.pop-dialog-sub-add,.pop-dialog-sub-deep").dialog('close');
    $(".pop-dialog").dialog('close'); //일반팝업 닫기
    //상록영상 추가
    $(".pop-container").remove();
    AllOff();
    var type = "";
    var mode = "";
    var URL = "";
    var tabs = "";
    var pageTitle = "";
    _setBasePopPage(type, mode, URL, tabs, pageTitle);
});
//윈도우10
$(document).on("click", ".wrap.final .p-right", function () {
    //add user answer Save
    //_Call_User_answer_save();
    //$(".pop-dialog,.pop-dialog-sub-add,.pop-dialog-sub-deep").dialog('close');
    $(".pop-dialog").dialog('close');
    //상록영상 추가
    $(".wrap.final").remove();
    AllOff();
    var type = "";
    var mode = "";
    var URL = "";
    var tabs = "";
    var pageTitle = "";
    _setBasePopPage(type, mode, URL, tabs, pageTitle);
});