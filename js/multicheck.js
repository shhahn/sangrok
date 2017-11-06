

var multi_check = {
	content : null,
	optionList : null,
	hintButton : null,
	hintLayer : null,
	resetButton : null,

	go : function(){
		var check = document.getElementsByClassName('quiz_multi');
		for(var i=0,j=check.length; i<j; i++){
			multi_check.init(check[i])
		}
		setTimeout(function () {
			for(var i=0,j=check.length; i<j; i++){				
				multi_check.loading(check[i]);
			}
		}, 1000);
	},

	init : function(a){
		//a: ul 셀렉터
		multi_check.optionList = a;
		var index = parseInt(a.getAttribute('id').split('multi')[1]);
		var data = multi_quiz_data[index];
		for(var i=0,j=data[0].length; i<j; i++){
			var li = document.createElement('li');
			//li.innerHTML = "<span>"+(i+1)+"</span><p>"+data[0][i]+"</p><img src='images/pop-common/check.png' alt='선택' />"
			//li.innerHTML = "<span>"+(i+1)+"</span><p>"+data[0][i]+"</p>"
			li.innerHTML = "<span>"+(i+1)+"</span><input id='multi"+index+"_"+i+"' class='tmpSave' type='text' value='F'/><p>"+data[0][i]+"</p>"
			li.addEventListener('mousedown', multi_check.check, false);
			a.appendChild(li)
		}

		var hint_button = a.parentNode.parentNode.getElementsByClassName('hint')[0];
		hint_button.addEventListener('mousedown',multi_check.showHint,false);
		var answer_check_button = a.parentNode.parentNode.getElementsByClassName('answer_check')[0];
		answer_check_button.addEventListener('mousedown',multi_check.checkAnswer,false);

		var hint_layer = a.parentNode.parentNode.getElementsByClassName('hint_layer')[0];
		var hint_paragraph = document.createElement('p');
		hint_paragraph.innerHTML = data[1];
		hint_layer.appendChild(hint_paragraph);
		var correctResponse_layer = a.parentNode.parentNode.getElementsByTagName('correctResponse')[0];
		correctResponse_layer.innerHTML = data[2];

	},
	loading : function(a){//저장값 loading
		multi_check.optionList = a;
		var index = parseInt(a.getAttribute('id').split('check')[1]);
		var data = check_quiz_data[index];
		for(i=0;i<multi_check.optionList.querySelectorAll('input').length;i++){
			if(multi_check.optionList.querySelectorAll('input')[i].value === 'T'){
				multi_check.optionList.querySelectorAll('input')[i].parentNode.classList.add('check_on');
			}
		}
	},
	check : function(){
		multi_check.optionList = this.parentNode;
		
		if(this.getAttribute('class').indexOf('check_on')>-1){
			this.querySelector('input').value='F';//선택 F
		}else{
			this.querySelector('input').value='T';//선택 T
		}
		this.classList.toggle('check_on');
		
	},


	showHint : function(){
		multi_check.hintLayer = this.parentNode.getElementsByClassName('hint_layer')[0];

		if(multi_check.hintLayer.getAttribute('class').indexOf('show_hint')>-1){
			multi_check.hintLayer.classList.remove('show_hint');
			this.innerHTML = '힌트 보기';
		}else{
			multi_check.hintLayer.classList.add('show_hint');
			this.innerHTML = '힌트 닫기';
		}
	},

	checkAnswer : function(){
		multi_check.optionList = this.parentNode.getElementsByClassName('option_list')[0]
		var index = parseInt(multi_check.optionList.getAttribute('id').split('multi')[1]);
		var answer = multi_quiz_data[index][2];
		var check_option = multi_check.optionList.getElementsByClassName('check_on');
		var answer_option = multi_check.optionList.getElementsByClassName('answer');
		var hint_layer = this.parentNode.getElementsByClassName('show_hint');
		var isCorrect = null, oAnswer = 0, useAnswer = 0;
		if(answer_option.length===0){
			for(var i=0,j=answer.length; i<j; i++){
				multi_check.optionList.children[answer[i]-1].classList.add('answer');
				//multi_check.optionList.children[answer[i]-1].getElementsByTagName('img')[0].src = "images/common/check_answer.png";
				//console.error(multi_check.optionList.children[answer[i]-1].classList.contains('check_on'));
				//정답합산
				oAnswer += answer[i];
			}


			//console.error(multi_check.optionList.children.length);
			//사용자 체크 값 합산
			if(check_option.length!=0) {
				for(var i=0,j=multi_check.optionList.children.length; i<j; i++){
					//console.error(multi_check.optionList.children[i].classList.contains('check_on'));
					if(multi_check.optionList.children[i].classList.contains('check_on')){
						useAnswer += i;
					}
				}
			}


			//console.error(oAnswer);
			//console.error(useAnswer);

			if ((oAnswer-answer.length) === useAnswer) isCorrect = true;
			else isCorrect = false;
			
			DTCaliperSensor.fire({
				correct: isCorrect, // 정답 여부입력 [true, false] 중에서 택일
				itemObject: this.parentNode, // 해당 문항 객체 parentNode 한개 삭제함.
				value: oAnswer // 실제 정답 데이터 입력 <correctResponse>에 입력된 값이랑 동일
			});


			/*
			if(check_option.length!=0) {
				for(var i=0,j=check_option.length; i<j; i++){
					console.error(i);
					//check_option[0].classList.remove('check_on');
				}
			}
			*/


			//this.innerHTML = "초기화";
			this.childNodes[1].childNodes[1].setAttribute('src','./images/common/cancel_btn.png');
			this.childNodes[1].children[1].innerHTML = "다시 풀기";
		}else{

			for(var i=0,j=answer_option.length; i<j; i++){
				//answer_option[0].getElementsByTagName('img')[0].src = "images/pop-common/check.png";
				answer_option[0].classList.remove('answer');
			}
			//this.innerHTML = "정답확인";
			this.childNodes[1].childNodes[1].setAttribute('src','./images/common/answer_btn.png');						
			this.childNodes[1].children[1].innerHTML = this.childNodes[1].children[1].getAttribute('alt');

			if(hint_layer.length!=0) {
				hint_layer[0].classList.remove('show_hint');
				this.parentNode.getElementsByClassName('hint')[0].innerHTML = "힌트 보기";
			}
			var check_option = multi_check.optionList.getElementsByClassName('check_on');
			if(check_option.length!=0) {
				for(var i=0,j=check_option.length; i<j; i++){
					check_option[0].classList.remove('check_on');
				}
			}
			//저장값 초기화
			for(i=0;i<multi_check.optionList.querySelectorAll('input').length;i++){
				if(multi_check.optionList.querySelectorAll('input')[i].value === 'T'){
					multi_check.optionList.querySelectorAll('input')[i].value='F';
					multi_check.optionList.querySelectorAll('input')[i].parentNode.classList.remove('check_on');
				}
			}

		}

	}
}

multi_check.go();
