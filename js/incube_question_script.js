function DTextQuestionManager()
{
	this.length = 0;
	this.listQuestion = new Array();
	
	this.getQuestion = function(questionId) {
		if(questionId == null)
			return null;
			
		var i;
		for(i=0; i < this.listQuestion.length; i++)
		{
			if(this.listQuestion[i].question_id == questionId) {
				return this.listQuestion[i];
			}
		}
		
		return null;
	}
	
	this.addQuestion = function(objQuestion) {
		if( objQuestion.question_id == undefined 
			|| objQuestion.getUserAnswer == undefined 
			|| objQuestion.setUserAnswer == undefined )
			return false;
			
		this.listQuestion.push(objQuestion);
		
		return true;
	}
	
	this.initUserAnswer = function(objParam){
		var objAnswerList = objParam.answer_list;
		
		var i;
		for(i=0; i < objAnswerList.length; i++)
		{
			var objAnswer = objAnswerList[i];
			
			var objQuestion = this.getQuestion(objAnswer.question_id);
			if( objQuestion != null )
				objQuestion.setUserAnswer(objAnswer);
		}
	}
	
	this.getUserAnswers = function(){
		var aryResult = {answer_list: new Array()};
		
		var i;
		for(i=0; i < this.listQuestion.length; i++)
		{
			var objQuestion = this.listQuestion[i];
			if( objQuestion != null )
			{
				var objAnswer = objQuestion.getUserAnswer();
				if( objAnswer != null )
					aryResult.answer_list.push( objAnswer );
			}
		}
		
		
		return aryResult;
	}
}

DTextQuestionManager.getInstance = function()
{
	if( window.incubeDtextQuestionManager == undefined 
		|| window.incubeDtextQuestionManager == null )
	{
		window.incubeDtextQuestionManager = new DTextQuestionManager();
	}
	
	return window.incubeDtextQuestionManager;
}


var QuizTextInput = function(param){
/*
 * 텍스트 입력(단답형, 서술형) 형태의 문제를 위한 위한 객체
 * 뷰어에서 사용자가 입력한 문자열을 저장하기 위해서만 사용됨.
 * 정답 확인 기능 없음. 
 * 
 * param.tag_list //사용자 입력값을 표시할 tag의 ID
 * 
 * setUserAnswer() : 사용자가 선택한 답으로 문항을 초기화한다. 
 * getUserAnswer() : 사용자가 선택한 답을 저장할 수 있는 형태의 객체로 변환한다. 
 * 
 * var qz1 = new QuizTextInput({tag_list:["p114_15_1", "p114_15_2"]});
 */
	this.question_id = null;
	this.answer_tag_list = null;
	
	if(param){
		(param.tag_list)?this.answer_tag_list=param.tag_list:null;
	}
	
	
	/**
	 *	setUserAnswer() : 사용자가 선택한 답으로 문항을 초기화한다. 
	 *
	 *	answer.question_id: Question id
	 *	answer.question_type: "QTYPE_TEXT"
	 *	answer.answer_list: 사용자가 입력한 텍스트. [{tag_id:"tag_id_value", answer:"사용자 입력 데이터"}, {tag_id:"tag_id_value", answer:"사용자 입력 데이터"}]
	 */
	this.setUserAnswer = function(answer)
	{
		if(answer.question_id == undefined || answer.question_id == null)
			return false;

		if(answer.question_type == undefined || answer.question_type == null || answer.question_type != "QTYPE_TEXT")
			return false;
			
		if(answer.answer_list == undefined || answer.answer_list == null || answer.answer_list.length == 0)
			return false;

		var i=0;
		for(i=0; i < answer.answer_list.length; i++)
		{
			var answerItem = answer.answer_list[i];
			
			var eAnswerItem = document.getElementById(answerItem.tag_id);
			if( eAnswerItem == null )
				continue;
				
			if(eAnswerItem.value != undefined)
			{
				eAnswerItem.value = answerItem.answer;
			}
			else if(eAnswerItem.innerText != undefined)
			{
				eAnswerItem.innerText = answerItem.answer;
			}
		}
	}
	
	/**
	 *	getUserAnswer() : 사용자가 선택한 답으로 문항을 초기화한다. 
	 *
	 *	return.question_id: Question id
	 *	return.question_type: "QTYPE_TEXT"
	 *	return.answer: 사용자가 입력한 텍스트
	 */
	this.getUserAnswer = function()
	{
		var result = {question_id: this.question_id, question_type:"QTYPE_TEXT", answer_list:new Array()};

		var i=0;
		for(i=0; i < this.answer_tag_list.length; i++)
		{
			var tagId = this.answer_tag_list[i];
			var eAnswerItem = document.getElementById(tagId);
			if( eAnswerItem == null )
				continue;

			var answerValue = "";
			if(eAnswerItem.value != undefined)
			{
				answerValue = eAnswerItem.value;
			}
			else if(eAnswerItem.innerText != undefined)
			{
				answerValue = eAnswerItem.innerText;
			}
			
			result.answer_list.push( {tag_id:tagId, answer:answerValue} );
		}
		return result;
	}
	
}

var QuizSingleChoice = function(tagId){
/*
 * 다지선다형(단일 선택) 문제를 위한 위한 객체
 * 뷰어에서 사용자가 선택한 답을 저장하기 위해서만 사용됨.
 * 정답 확인 기능 없음. 
 * 
 * tagId //사용자가 선택한 값을 표시할 tag의 ID
 * 
 * setUserAnswer() : 사용자가 선택한 답으로 문항을 초기화한다. 
 * getUserAnswer() : 사용자가 선택한 답을 저장할 수 있는 형태의 객체로 변환한다. 
 * 
 * var qz1 = new QuizSingleChoice("p114_15_1");
 */
	this.question_id = null;
	this.tag_id = "";
	
	if(tagId){
		this.tag_id = tagId;
	}
	
	
	/**
	 *	setUserAnswer() : 사용자가 선택한 답으로 문항을 초기화한다. 
	 *
	 *	answer.question_id: Question id
	 *	answer.question_type: "QTYPE_CHOICE"
	 *	answer.answer: 사용자가 선택한 아이템. 
	 */
	this.setUserAnswer = function(answer)
	{
		if(answer.question_id == undefined || answer.question_id == null)
			return false;

		if(answer.question_type == undefined || answer.question_type == null || answer.question_type != "QTYPE_CHOICE")
			return false;
			
		if(answer.answer == undefined || answer.answer == null)
			return false;

		var eAnswerItem = document.getElementById(this.tag_id);
		if(eAnswerItem.value != undefined)
		{
			eAnswerItem.value = answer.answer;
		}
		else if(eAnswerItem.innerText != undefined)
		{
			eAnswerItem.innerText = answer.answer;
		}
	}
	
	/**
	 *	getUserAnswer() : 사용자가 선택한 답으로 문항을 초기화한다. 
	 *
	 *	return.question_id: Question id
	 *	return.question_type: "QTYPE_CHOICE"
	 *	return.answer: 사용자가 선택한 아이템
	 */
	this.getUserAnswer = function()
	{
		var eAnswerItem = document.getElementById(this.tag_id);
		if( eAnswerItem == null )
			return null;

		var answerValue = "";
		if(eAnswerItem.value != undefined)
		{
			answerValue = eAnswerItem.value;
		}
		else if(eAnswerItem.innerText != undefined)
		{
			answerValue = eAnswerItem.innerText;
		}

		return {question_id: this.question_id, question_type:"QTYPE_CHOICE", answer:answerValue};
	}
}

var QuizSingleChoiceWithoutAnswerPlace = function(tagId){
/*
 * 다지선다형(단일 선택) 문제를 위한 위한 객체
 * QuizSingleChoice는 답을 클릭하는 빈칸이 있지만, 
 * QuizSingleChoiceWithoutAnswerPlace는 답을 클릭하는 빈칸이 없는 대신 
 * 정답을 선택하기 위해 답목록을 클릭해야한다는 것이 다름
 * 뷰어에서 사용자가 선택한 답을 저장하기 위해서만 사용됨.
 * 정답 확인 기능 없음. 
 * 
 * tagId //사용자가 선택한 값을 표시할 tag의 ID
 * 
 * setUserAnswer() : 사용자가 선택한 답으로 문항을 초기화한다. 
 * getUserAnswer() : 사용자가 선택한 답을 저장할 수 있는 형태의 객체로 변환한다. 
 * 
 * var qz1 = new QuizSingleChoice("p114_15_1");
 */
	this.question_id = null;
	this.tag_id = "";
	
	if(tagId){
		this.tag_id = tagId;
	}

	
	/**
	 *	setUserAnswer() : 사용자가 선택한 답으로 문항을 초기화한다. 
	 *
	 *	answer.question_id: Question id
	 *	answer.question_type: "QTYPE_CHOICE"
	 *	answer.answer: 사용자가 선택한 아이템. 
	 */
	this.setUserAnswer = function(answer)
	{
		if(answer.question_id == undefined || answer.question_id == null)
			return false;

		if(answer.question_type == undefined || answer.question_type == null || answer.question_type != "QTYPE_CHOICE")
			return false;
			
		if(answer.answer == undefined || answer.answer == null)
			return false;

		var eAnswerItem = $(document.getElementById(this.tag_id)),
				jqAnswerCandidates = eAnswerItem.children();

		for(var i = 0; i < jqAnswerCandidates.length; i++) {
			var answerCandidate = jqAnswerCandidates.find("span").text()[i];
		
			if(answer.answer == answerCandidate) {
				$(jqAnswerCandidates[i]).css("color", "rgb(11, 113, 239)");
				$(jqAnswerCandidates[i]).children().css("color", "rgb(11, 113, 239)");
			}
		}


	}
	
	/**
	 *	getUserAnswer() : 사용자가 선택한 답으로 문항을 초기화한다. 
	 *
	 *	return.question_id: Question id
	 *	return.question_type: "QTYPE_CHOICE"
	 *	return.answer: 사용자가 선택한 아이템
	 */
	this.getUserAnswer = function()
	{
		var eAnswerItem = document.getElementById(this.tag_id);
		if( eAnswerItem == null )
			return null;

		var answerValue = "";
		if(eAnswerItem.value != undefined)
		{
			answerValue = eAnswerItem.value;
		}
		else if(eAnswerItem.innerText != undefined)
		{
			answerValue = eAnswerItem.innerText;
		}

		return {question_id: this.question_id, question_type:"QTYPE_CHOICE", answer:answerValue};
	}
}

var QuizMultipleChoice = function(param){
/*
 * 다지선다형(다중 선택 ) 문제를 위한 위한 객체
 * 뷰어에서 사용자가 선택한 답을 저장하기 위해서만 사용됨.
 * 정답 확인 기능 없음. 
 * 
 * param.tag_list //사용자가 선택한 값을 표시할 tag의 ID
 * 
 * setUserAnswer() : 사용자가 선택한 답으로 문항을 초기화한다. 
 * getUserAnswer() : 사용자가 선택한 답을 저장할 수 있는 형태의 객체로 변환한다. 
 * 
 * var qz1 = new QuizMultipleChoice({tag_list:["p114_15_1", "p114_15_2"]});
 */
	this.question_id = null;
	this.answer_tag_list = null;
	
	if(param){
		(param.tag_list)?this.answer_tag_list=param.tag_list:null;
	}

	
	
	/**
	 *	setUserAnswer() : 사용자가 선택한 답으로 문항을 초기화한다. 
	 *
	 *	answer.question_id: Question id
	 *	answer.question_type: "QTYPE_MULTICHOICE"
	 *	answer.answer_list: 사용자가 선택한 아이템. 
	 */
	this.setUserAnswer = function(answer)
	{
		if(answer.question_id == undefined || answer.question_id == null)
			return false;

		if(answer.question_type == undefined || answer.question_type == null || answer.question_type != "QTYPE_MULTICHOICE")
			return false;
			
		if(answer.answer_list == undefined || answer.answer_list == null || answer.answer_list.length == 0)
			return false;

		var i=0;
		for(i=0; i < answer.answer_list.length; i++)
		{
			var answerItem = answer.answer_list[i];
			
			var eAnswerItem = document.getElementById(answerItem.tag_id);
			if( eAnswerItem == null )
				continue;
				
			if(eAnswerItem.value != undefined)
			{
				eAnswerItem.value = answerItem.answer;
			}
			else if(eAnswerItem.innerText != undefined)
			{
				eAnswerItem.innerText = answerItem.answer;
			}
		}
	}
	
	/**
	 *	getUserAnswer() : 사용자가 선택한 답으로 문항을 초기화한다. 
	 *
	 *	return.question_id: Question id
	 *	return.question_type: "QTYPE_MULTICHOICE"
	 *	return.answer: 사용자가 선택한 아이템
	 */
	this.getUserAnswer = function()
	{
		var result = {question_id: this.question_id, question_type:"QTYPE_MULTICHOICE", answer_list:new Array()};

		var i=0;
		for(i=0; i < this.answer_tag_list.length; i++)
		{
			var tagId = this.answer_tag_list[i];
			var eAnswerItem = document.getElementById(tagId);
			if( eAnswerItem == null )
				continue;

			var answerValue = "";
			if(eAnswerItem.value != undefined)
			{
				answerValue = eAnswerItem.value;
			}
			else if(eAnswerItem.innerText != undefined)
			{
				answerValue = eAnswerItem.innerText;
			}
			
			result.answer_list.push( {tag_id:tagId, answer:answerValue} );
		}
		return result;
	}
}


var QuizOrdering = function(param){
/*
 * 순서 배열 형태의 문제를 위한 위한 객체
 * 뷰어에서 사용자가 입력한 순서를 저장하기 위해서만 사용됨.
 * 정답 확인 기능 없음. 
 * 
 * param.tag_list //사용자 입력값을 표시할 tag의 ID
 * 
 * setUserAnswer() : 사용자가 선택한 답으로 문항을 초기화한다. 
 * getUserAnswer() : 사용자가 선택한 답을 저장할 수 있는 형태의 객체로 변환한다. 
 * 
 * var qz1 = new QuizOrdering({tag_list:["p114_15_1", "p114_15_2"]});
 */
	this.question_id = null;
	this.answer_tag_list = null;
	
	if(param){
		(param.tag_list)?this.answer_tag_list=param.tag_list:null;
	}
	
	
	/**
	 *	setUserAnswer() : 사용자가 선택한 답으로 문항을 초기화한다. 
	 *
	 *	answer.question_id: Question id
	 *	answer.question_type: "QTYPE_ORDERING"
	 *	answer.answer_list: 사용자가 입력한 텍스트. [{tag_id:"tag_id_value", answer:"1"}, {tag_id:"tag_id_value", answer:"2"}]
	 */
	this.setUserAnswer = function(answer)
	{
		if(answer.question_id == undefined || answer.question_id == null)
			return false;

		if(answer.question_type == undefined || answer.question_type == null || answer.question_type != "QTYPE_ORDERING")
			return false;
			
		if(answer.answer_list == undefined || answer.answer_list == null || answer.answer_list.length == 0)
			return false;

		var i=0;
		for(i=0; i < answer.answer_list.length; i++)
		{
			var answerItem = answer.answer_list[i];
			
			var eAnswerItem = document.getElementById(answerItem.tag_id);
			if( eAnswerItem == null )
				continue;
				
			if(eAnswerItem.value != undefined)
			{
				eAnswerItem.value = answerItem.answer;
			}
			else if(eAnswerItem.innerText != undefined)
			{
				eAnswerItem.innerText = answerItem.answer;
			}
		}
	}
	
	/**
	 *	getUserAnswer() : 사용자가 선택한 답으로 문항을 초기화한다. 
	 *
	 *	return.question_id: Question id
	 *	return.question_type: "QTYPE_ORDERING"
	 *	return.answer: 사용자가 선택한 답.
	 */
	this.getUserAnswer = function()
	{
		var result = {question_id: this.question_id, question_type:"QTYPE_ORDERING", answer_list:new Array()};

		var i=0;
		for(i=0; i < this.answer_tag_list.length; i++)
		{
			var tagId = this.answer_tag_list[i];
			var eAnswerItem = document.getElementById(tagId);
			if( eAnswerItem == null )
				continue;

			var answerValue = "";
			if(eAnswerItem.value != undefined)
			{
				answerValue = eAnswerItem.value;
			}
			else if(eAnswerItem.innerText != undefined)
			{
				answerValue = eAnswerItem.innerText;
			}
			
			result.answer_list.push( {tag_id:tagId, answer:answerValue} );
		}
		return result;
	}
	
}
