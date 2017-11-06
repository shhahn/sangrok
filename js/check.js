
//단일선택형
var quiz_check = {
	content : null,
	optionList : null,
	hintButton : null,
	hintLayer : null,
	resetButton : null,
	go : function(){
		var check = document.getElementsByClassName('quiz_check');
		for(var i=0,j=check.length; i<j; i++){
			quiz_check.init(check[i]);			
		}
		//
		setTimeout(function () {
			for(var i=0,j=check.length; i<j; i++){				
				quiz_check.loading(check[i]);
			}
		}, 1000);
	},
	
	init : function(a){
		//a: ul 셀렉터
		quiz_check.optionList = a;
		var index = parseInt(a.getAttribute('id').split('check')[1]);
		var data = check_quiz_data[index];
		for(var i=0,j=data[0].length; i<j; i++){
			var li = document.createElement('li');
						
			li.innerHTML = "<span>"+(i+1)+"</span><input id='check"+index+"_"+i+"' class='tmpSave' type='text' value='F'/><p>"+data[0][i]+"</p>"
			li.addEventListener('mousedown', quiz_check.check, false);			
			a.appendChild(li)			
		}
		
		var hint_button = a.parentNode.parentNode.getElementsByClassName('hint')[0];
		hint_button.addEventListener('mousedown',quiz_check.showHint,false);
		var answer_check_button = a.parentNode.parentNode.getElementsByClassName('answer_check')[0];
		answer_check_button.addEventListener('mousedown',quiz_check.checkAnswer,false);
		
		var hint_layer = a.parentNode.parentNode.getElementsByClassName('hint_layer')[0];
		var hint_paragraph = document.createElement('p');
		hint_paragraph.innerHTML = data[1];
		hint_layer.appendChild(hint_paragraph);
		
		var correctResponse_layer = a.parentNode.parentNode.getElementsByTagName('correctResponse')[0];
		correctResponse_layer.innerHTML = data[2];
	},
	loading : function(a){//저장값 loading
		quiz_check.optionList = a;
		var index = parseInt(a.getAttribute('id').split('check')[1]);
		var data = check_quiz_data[index];
		for(i=0;i<quiz_check.optionList.querySelectorAll('input').length;i++){
			if(quiz_check.optionList.querySelectorAll('input')[i].value === 'T'){
				//console.error(quiz_check.optionList.childNode.querySelector('li'));
				quiz_check.optionList.querySelectorAll('input')[i].parentNode.classList.add('check_on');
			}
		}
	},
	check : function(){
		
		quiz_check.optionList = this.parentNode;
		quiz_check.hintButton = quiz_check.optionList.parentNode.getElementsByClassName('hint')[0];
		quiz_check.resetButton = quiz_check.optionList.parentNode.getElementsByClassName('answer_check')[0];
		quiz_check.hintLayer = quiz_check.optionList.parentNode.getElementsByClassName('hint_layer')[0];
		var choice_on = quiz_check.optionList.getElementsByClassName('check_on');
		if(choice_on.length>0)	choice_on[0].classList.remove('check_on');
		
		//input F
		for(i=0;i<quiz_check.optionList.querySelectorAll('input').length;i++){
			quiz_check.optionList.querySelectorAll('input')[i].value='F';
		}

		this.classList.add('check_on');
				
		this.querySelector('input').value='T';//선택 T
		
	},
	
	
	showHint : function(){
		quiz_check.hintLayer = this.parentNode.getElementsByClassName('hint_layer')[0];
		
		if(quiz_check.hintLayer.getAttribute('class').indexOf('show_hint')>-1){
			quiz_check.hintLayer.classList.remove('show_hint');
			this.innerHTML = '힌트 보기';
		}else{
			quiz_check.hintLayer.classList.add('show_hint');
			this.innerHTML = '힌트 닫기';
		}
	},	
	
	checkAnswer : function(){
		quiz_check.optionList = this.parentNode.getElementsByClassName('quiz_check')[0]
		var index = parseInt(quiz_check.optionList.getAttribute('id').split('check')[1]);
		var answer = (check_quiz_data[index][2])-1;
		var check_option = quiz_check.optionList.getElementsByClassName('check_on');
		var answer_option = quiz_check.optionList.getElementsByClassName('answer');
		var hint_layer = this.parentNode.getElementsByClassName('show_hint');
		var isCorrect = null, useAnswer = 0;
		if(answer_option.length===0){
			quiz_check.optionList.children[answer].classList.add('answer');	
			//quiz_check.optionList.children[answer].getElementsByTagName('img')[0].src = "images/common/check_answer.png";
			//if(check_option.length!=0) check_option[0].classList.remove('check_on');
						
			isCorrect = quiz_check.optionList.children[answer].classList.contains('check_on')
			//console.error(quiz_check.optionList.children.length);
			if(check_option.length!=0) {
				for(var i=0,j=quiz_check.optionList.children.length; i<j; i++){					
					if(quiz_check.optionList.children[i].classList.contains('check_on')){
						useAnswer = i;
						break;
					}
				}
			}

			//useAnswer
			DTCaliperSensor.fire({
				correct: isCorrect, // 정답 여부입력 [true, false] 중에서 택일 
				itemObject: this.parentNode.parentNode, // 해당 문항 객체 
				value: answer // 실제 정답 데이터 입력 <correctResponse>에 입력된 값이랑 동일
			});
			
			//this.innerHTML = "초기화";
			this.childNodes[1].childNodes[1].setAttribute('src','./images/common/cancel_btn.png');
			this.childNodes[1].children[1].innerHTML = "다시 풀기";
		}else{
			//answer_option[0].getElementsByTagName('img')[0].src = "images/pop-common/check.png";
			answer_option[0].classList.remove('answer');
			//this.innerHTML = "정답확인";
			this.childNodes[1].childNodes[1].setAttribute('src','./images/common/answer_btn.png');						
			this.childNodes[1].children[1].innerHTML = this.childNodes[1].children[1].getAttribute('alt');

			var check_option = quiz_check.optionList.getElementsByClassName('check_on');
			if(check_option.length!=0) check_option[0].classList.remove('check_on');
			if(hint_layer.length!=0) {
				hint_layer[0].classList.remove('show_hint');
				this.parentNode.getElementsByClassName('hint')[0].innerHTML = "힌트 보기";
			}
			
			//저장값 초기화
			for(i=0;i<quiz_check.optionList.querySelectorAll('input').length;i++){
				if(quiz_check.optionList.querySelectorAll('input')[i].value === 'T'){
					quiz_check.optionList.querySelectorAll('input')[i].value='F';
					quiz_check.optionList.querySelectorAll('input')[i].parentNode.classList.remove('check_on');
				}
			}
			//if (parent.API_ANNOTATION_INPUT_DELETE) parent.API_ANNOTATION_INPUT_DELETE("choiceBox01", "choiceBox02", "choiceBox03", "choiceBox04");
		}	
		
	}
}


quiz_check.go();