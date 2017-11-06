
var true_false_quiz = {
	
	content : null,
	init : function(a){
		//a : button layer셀렉터
		var button = a.children;		
		var index = parseInt(a.getAttribute('id').split('true')[1]);		
		button[0].addEventListener('mousedown',this.check,false);
		button[1].addEventListener('mousedown',this.check,false);			
		
		var input0 = document.createElement('input');
		input0.type = 'hidden';
		input0.id = 'true'+index+'_0';
		input0.className = 'tmpSave';
		input0.value = 'F';
		button[0].appendChild(input0);
		
		var input1 = document.createElement('input');
		input1.type = 'hidden';
		input1.id = 'true'+index+'_1';
		input1.className = 'tmpSave';
		input1.value = 'F';
		button[1].appendChild(input1);

		a.parentNode.parentNode.getElementsByClassName('hint')[0].addEventListener('mousedown',this.showHint,false);
		a.parentNode.parentNode.getElementsByClassName('answer_check')[0].addEventListener('mousedown',this.answerCheck,false);
		var hint_layer = a.parentNode.parentNode.getElementsByClassName('hint_layer')[0];
		var hint = document.createElement('p');
		hint.innerHTML = true_quiz_data[index][0];
		hint_layer.appendChild(hint);
		var correctResponse_layer = a.parentNode.parentNode.getElementsByTagName('correctResponse')[0];
		var correctResponse = document.createElement('span');
		correctResponse.innerHTML = true_quiz_data[index][2];
		correctResponse_layer.appendChild(correctResponse);
		setTimeout(function () {
			true_false_quiz.loading(a);
		}, 1000);
	},
	loading : function(a){//저장값 loading
		var button = a.children;
		//console.error(button);		
		for(i=0;i < button.length; i++){
			if(button[i].querySelector('input').value === 'T'){
				button[i].classList.add('check_on');
			}
		}		
	},
	check : function(){
		var check_on = this.parentNode.getElementsByClassName('check_on');
		if(this.getAttribute('class').indexOf('check_on')>-1) return false;
		else {
			if(check_on.length!=0){ 
				check_on[0].classList.remove('check_on');
				console.error(this.parentNode.querySelectorAll('input'));
				this.parentNode.querySelectorAll('input')[0].value = 'F';
				this.parentNode.querySelectorAll('input')[1].value = 'F';
			}else{
				this.classList.add('check_on');
				this.querySelector('input').value = 'T';
			}
		}
	},
	showHint : function(){
		var hint_layer = this.parentNode.getElementsByClassName('hint_layer')[0];
		if(hint_layer.getAttribute('class').indexOf('show_hint')>-1){
			hint_layer.classList.remove('show_hint');
			this.innerHTML = '힌트 보기';
		}else{
			hint_layer.classList.add('show_hint');
			this.innerHTML = '힌트 닫기';
		}
	},
	answerCheck : function(){
		var content = this.parentNode;
		var index = parseInt(content.getElementsByClassName('true_false_layer')[0].getAttribute('id').split('true')[1]);
		
		var answer = true_quiz_data[index][1];		
		var check_option = content.getElementsByClassName('check_on');
		var answer_option = content.getElementsByClassName('answer');
		var hint_layer = content.getElementsByClassName('show_hint');
		var isCorrect = null, useAnswer = [];

		if(answer_option.length===0){			
			//content.getElementsByClassName('true_false_layer')[0].children[answer].classList.add('answer');	
			for(i=0;i<content.getElementsByClassName('true_false_layer').length;i++){
				content.getElementsByClassName('true_false_layer')[i].children[true_quiz_data[i+index][1]].classList.add('answer');	
				//console.error(content.getElementsByClassName('true_false_layer')[i].children[true_quiz_data[i+index][1]].classList.contains('check_on'));				
				useAnswer.push(true_quiz_data[i+index][1]);
			}

			//하나라도 틀리면 false
			for(i=0;i<content.getElementsByClassName('true_false_layer').length;i++){				
				if(content.getElementsByClassName('true_false_layer')[i].children[true_quiz_data[i+index][1]].classList.contains('check_on')){
					isCorrect = true;
				}else{
					isCorrect = false;
					break;
				}
			}
						
			DTCaliperSensor.fire({
				correct: isCorrect, // 정답 여부입력 [true, false] 중에서 택일 
				itemObject: this.parentNode.parentNode, // 해당 문항 객체 
				value: useAnswer // 실제 정답 데이터 입력 <correctResponse>에 입력된 값이랑 동일
			});
			
			/*
			if(check_option.length!=0) {
				for(var i=0,j=check_option.length; i<j; i++){
					check_option[0].classList.remove('check_on');
				}
			}
			*/
			
			//this.innerHTML = "초기화";
			this.childNodes[1].childNodes[1].setAttribute('src','./images/common/cancel_btn.png');
			this.childNodes[1].children[1].innerHTML = "다시 풀기";
			
		}else{		
			for(i=0;i<content.getElementsByClassName('true_false_layer').length;i++){
				answer_option[0].classList.remove('answer');						
			}
			
			//this.innerHTML = "정답확인";
			this.childNodes[1].childNodes[1].setAttribute('src','./images/common/answer_btn.png');
			this.childNodes[1].children[1].innerHTML = this.childNodes[1].children[1].getAttribute('alt');
			if(hint_layer.length!=0) {
				hint_layer[0].classList.remove('show_hint');
				this.parentNode.getElementsByClassName('hint')[0].innerHTML = "힌트 보기";
			}
			var check_option = content.getElementsByClassName('check_on');
			for(i=0;i<content.getElementsByClassName('true_false_layer').length;i++){
				if(check_option.length!=0) check_option[0].classList.remove('check_on');
			}	
				
			//console.error(content.querySelectorAll('input'));
			//저장값 초기화
			for(i=0;i < content.querySelectorAll('input').length; i++){
				content.querySelectorAll('input')[i].value='F';
			}
		}	
	}
}

