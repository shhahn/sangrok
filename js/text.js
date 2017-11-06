
//단답형
var text_quiz = {
	go : function(){
		var text = document.getElementsByClassName('text_quiz_input');
		for(var i=0, j=text.length ; i<j; i++){
			text_quiz.init(text[i])
		}

	},
	init : function(a){
		var index = parseInt(a.getAttribute('id').split('text')[1]);
		var content = a.parentNode.parentNode.parentNode;
		var hint_button = content.getElementsByClassName('hint')[0];
		var answer_button = content.getElementsByClassName('answer_check')[0];
		var hint_layer = content.getElementsByClassName('hint_layer')[0];
		hint_button.addEventListener('mousedown',this.showHint,false);
		answer_button.addEventListener('mousedown',this.answerCheck,false);
		var hint = document.createElement('p');
		hint.innerHTML = text_quiz_data[index][0];
		hint_layer.appendChild(hint);
		var correctResponse_layer = content.getElementsByTagName('correctResponse')[0];
		var correctResponse = document.createElement('span');
		correctResponse.innerHTML = text_quiz_data[index][1];
		correctResponse_layer.appendChild(correctResponse);


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

		var index = parseInt(this.parentNode.getElementsByClassName('text_quiz_input')[0].getAttribute('id').split('text')[1]);
		var answer_area = this.parentNode.getElementsByClassName('answer_area');
		var hint_layer = this.parentNode.getElementsByClassName('show_hint');
		var isCorrect = null, useAnswer = "";

		//console.error(content.childNodes[1].children[1].innerHTML);
		if(answer_area.length!=0){
			answer_area[0].parentNode.removeChild(answer_area[0]);
			if(hint_layer.length != 0) {
				hint_layer[0].classList.remove('show_hint');
				this.parentNode.getElementsByClassName('hint')[0].innerHTML = "힌트 보기";
			}

			this.childNodes[1].childNodes[1].setAttribute('src','./images/common/answer_btn.png');

			this.childNodes[1].children[1].innerHTML = this.childNodes[1].children[1].getAttribute('alt');

			//this.innerHTML = "정답 확인";
			//여러개 inputbox 초기화
			for(i=0;i<this.parentNode.getElementsByClassName('text_quiz_input').length;i++){
				this.parentNode.getElementsByClassName('text_quiz_input')[i].value = "";
				 //input 삭제
				 if (parent.API_ANNOTATION_INPUT_DELETE) parent.API_ANNOTATION_INPUT_DELETE(this.parentNode.getElementsByClassName('text_quiz_input')[i].getAttribute('id'));
			}
			
		}else{
			var answer = document.createElement('div');
			answer.setAttribute('class','answer_area');
			var answer_comatext = "";

			var answerVal = "";
			var coma = "";
			for(i=0;i<this.parentNode.getElementsByClassName('text_quiz_input').length;i++){
				i < this.parentNode.getElementsByClassName('text_quiz_input').length-1 ? coma=", " : coma="";
				if(text_quiz_data[index][1].indexOf('||') > -1){
					var answer_temp = text_quiz_data[i+index][1].split('||');
					answer_comatext = answer_temp[0];
					
				}else{
					answer_comatext = text_quiz_data[i+index][1];
				}
				answerVal = answerVal + answer_comatext+coma;
				//answerVal = answerVal + text_quiz_data[i+index][1]+coma;
				//console.error(this.parentNode.getElementsByClassName('text_quiz_input')[i].value);
				//useAnswer= useAnswer + this.parentNode.getElementsByClassName('text_quiz_input')[i].value+coma;
			}
			if(this.parentNode.parentNode.getAttribute('class').indexOf('essay') > -1){
				answer.innerHTML = "<span>예시 답안:  </span><p>"+answerVal+"</p>"
			}else{
				answer.innerHTML = "<span>정답:  </span><p>"+answerVal+"</p>"
			}
			this.parentNode.firstElementChild.appendChild(answer);
			//this.innerHTML = "초기화";
			this.childNodes[1].childNodes[1].setAttribute('src','./images/common/cancel_btn.png');
			this.childNodes[1].children[1].innerHTML = "다시 풀기";
			DTCaliperSensor.fire({
                correct: isCorrect, // 정답 여부입력 [true, false] 중에서 택일
                itemObject: this.parentNode, // 해당 문항 객체
                value: answerVal // 실제 정답 데이터 입력 correctResponse에 입력된 값이랑 동일
            });
		}
	}
}

text_quiz.go();