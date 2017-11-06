

// 선긋기*************************************************************************
// svg : 생성
function CESVG (target, type) {
    var svgContainer = document.createElementNS('http://www.w3.org/2000/svg', type);
    target.appendChild(svgContainer);	
	return svgContainer;
}



// 효과음 기본 설정
function efSound (src) {
    var efAudio = new Audio;
    var efPlay = function () {
        efAudio.removeEventListener('loadeddata', efPlay);
        efAudio.play();
    };
    efAudio.src = src;
    efAudio.addEventListener('loadeddata', efPlay);
    efAudio.load();
}


// 드래그&드랍 : 설정
function DragDrop (param) {
    this.element = param.element;
    this.parentElment = window;
    this.createDragDrop(param);
}

// 드래그&드랍 : 위치 이동 
DragDrop.prototype.createDragDrop = function (param) {
    var dragObj = this,
        left = param.left + param.width,
        top = param.top + param.height,
        answerLine = (param.quizName !== 'dragLine') ? null : CESVG(QS('.quiz_'+ param.quizNum +' .svgContainer'), 'path'),
        startDrag = function (e) {
        	
			e.preventDefault();
            var eventMaster = eventSelector('eventDown', e);            
            dragObj.element.style.zIndex = 3;            
            
            dragObj.offY = eventMaster.clientY - (dragObj.element.offsetTop * GameManager.event.zoomRate);
            dragObj.offX = eventMaster.clientX - (dragObj.element.offsetLeft * GameManager.event.zoomRate);            

            dragObj.element.addEventListener(GameManager.event.eventSelector('eventMove'), drag, true);
            dragObj.element.addEventListener(GameManager.event.eventSelector('eventOut'), endDrag, true);            
        },

        drag = function (e) {
        	e.preventDefault();
            var eventMaster = eventSelector('eventMove', e);

            dragObj.newY = eventMaster.clientY - dragObj.offY;
            dragObj.newX = eventMaster.clientX - dragObj.offX;

            dragObj.element.style.left = (dragObj.newX / GameManager.event.zoomRate) + 'px';
            dragObj.element.style.top = (dragObj.newY / GameManager.event.zoomRate) + 'px';            

            var newLeft = (dragObj.newX + param.width * GameManager.event.zoomRate) / GameManager.event.zoomRate;
            var newTop = (dragObj.newY + param.height * GameManager.event.zoomRate) / GameManager.event.zoomRate;

            if (answerLine !== null) {
                answerLine.setAttribute('d', 'M '+ left +' '+ top + ' L '+ newLeft +' '+ newTop);                
            }
        },

        endDrag = function (e) {
        	e.preventDefault();
            var eventMaster = eventSelector('eventUp', e);

            dragObj.element.removeEventListener(GameManager.event.eventSelector('eventMove'), drag, true);            
            dragObj.element.style.zIndex = 3;                                    
            param.callBack(e, param);
        }

    dragObj.element.addEventListener(GameManager.event.eventSelector('eventDown'), startDrag, true);
    dragObj.element.addEventListener(GameManager.event.eventSelector('eventUp'), endDrag, true);
};




// ********************************************************************************

// 퀴즈 : 기본 설정
var QUIZ = QUIZ || {};
QUIZ = (function(){
	var quizObj = {		
		objCount: null,
		totalCount: 0,
		quizNameArray: [],
		aniArray: [],
		aniId: null,
		init: function () {
			var quiz = QSAll('.quiz'),
				popupQuiz = QSAll('.popupPageContainer .quiz');

			this.objCount = new Array(quiz.length);

			for (var i = 0; i < quiz.length; i++) {
				var quizNameArray = quiz[i].getAttribute('quiz'),
					quizNum = i + 1;

				this.objCount[i] = 0;

				quiz[i].classList.add('quiz_' + quizNum);
				quiz[i].setAttribute('idx', quizNum);

				if (quizNameArray !== null) {
					quizNameArray = (new String(quizNameArray).indexOf(',') > -1) ? quizNameArray.split(',') : [quizNameArray];					
					this.start(quizNum, quizNameArray);
				}
				else { 
					console.log('noQuiz');
				}
			}
		},		

		start: function (quizNum, quizName) {
			this.quizNameArray.push(quizName);
			for (var i = 0; i < quizName.length; i++) this[quizName[i]]['init'](quizNum);
		}			
	}
	return quizObj;
})();


// 퀴즈 : dragLine 이벤트
QUIZ.dragLine = {
	name: 'dragLine',
	dragLineObj: null,
	dropArea: null,
	path: null,
	objSize: {width: null, height: null},
	dropSize: {width: null, height: null},
	dropPosition: [],
	objPosition: [],
	
	// 초기 설정
	init: function (quizNum) { console.log('>>>>>> dragLine');

		var svgContainer = CESVG(QS('.quiz_'+ quizNum), 'svg');
		svgContainer.setAttribute('class', 'svgContainer');

	// $('.svgContainer').insertBefore($('.questionDotWrap'));

		this.append(quizNum);
		QUIZ.objCount[quizNum-1] += this.dragLineObj.length;

		for (var i = 0; i < this.dragLineObj.length; i++) {
			this.dragLineObj[i].style.cursor = 'pointer';
			this.dragLineObj[i].setAttribute('value', i + 1);
			new DragDrop({
				quizNum: quizNum,
				quizName: this.name,
				element: this.dragLineObj[i], 
				top: this.objPosition[i].top,
				left: this.objPosition[i].left,
				width: this.objSize.width, 
				height: this.objSize.height, 
				callBack: function (e, param) {
					var eventMaster = eventSelector('eventUp', e),
						dropArea = QSAll('.quiz_'+ param.quizNum +' .lineDropArea'), 
						answerCount = 0;

					if (eventMaster !== undefined && QUIZ.dragLine.dropCompare(param.quizNum, this, dropArea, eventMaster.clientX, eventMaster.clientY)) {						
						QUIZ.dragLine.setDragObjPosition(param.quizNum, this, param, true);
					} else {						
						QUIZ.dragLine.setDragObjPosition(param.quizNum, this, param, false);
					}
				}
			});			
		}

		this.path = QSAll('.quiz_'+ quizNum +' .svgContainer > path');

		for (var i = 0; i < this.path.length; i++) {
			this.path[i].setAttribute('class', 'answerLine');
			this.path[i].setAttribute('value', this.dragLineObj[i].getAttribute('value'));
		}
	},


	// 각 요소 위치 저장
	append: function (quizNum) {
		var svgContainer = QS('.quiz_'+ quizNum + ' .svgContainer');

		this.dragLineObj = QSAll('.quiz_'+ quizNum +' .dragLineObj');
		this.dropArea = QSAll('.quiz_'+ quizNum +' .lineDropArea');
		//this.objSize.width = QS('.quiz_'+ quizNum +' .dragLineObj').offsetWidth / 2;
		//this.objSize.height = QS('.quiz_'+ quizNum +' .dragLineObj').offsetHeight / 2;
		this.objSize.width = dlo[quizNum-1].width[0] / 2;
		this.objSize.height = dlo[quizNum-1].height[0] / 2;
		this.dropSize.width = QS('.quiz_'+ quizNum +' .lineDropArea').offsetWidth / 2;
		this.dropSize.height = QS('.quiz_'+ quizNum +' .lineDropArea').offsetHeight / 2;
		this.dropPosition = [];
		this.objPosition = [];

		for (var i = 0; i < this.dropArea.length; i++) {
			this.dropPosition.push({top: this.dropArea[i].offsetTop, left: this.dropArea[i].offsetLeft});
		}		
		
		for (var i = 0; i < this.dragLineObj.length; i++) {			
			this.objPosition.push({top: dlo[quizNum-1].top[i], left: dlo[quizNum-1].left[i]});			
			//this.objPosition.push({top: this.dragLineObj[i].offsetTop, left: this.dragLineObj[i].offsetLeft});			
		}
	},


	// 드랍 영역 체크
	dropCompare: function (quizNum, dragObj, dropArea, x, y) {

		var dragObjValue = dragObj.element !== undefined ? dragObj.element.getAttribute('value') : dragObj.getAttribute('value'),
			allDap = false,
			result;
				
		//변수처리함 .
		var dotLeft = dragObj.element.parentNode.parentNode.getElementsByClassName('dLeft');
		var dotRight = dragObj.element.parentNode.parentNode.getElementsByClassName('dRight');
		
		for (var i = 0; i < dropArea.length; i++) {
			var dropValue = dropArea[i].getAttribute('value').indexOf(',') > -1 ? dropArea[i].getAttribute('value').split(',') : [dropArea[i].getAttribute('value')],
				dropAreaCss = dropArea[i].getBoundingClientRect();

			if (x === undefined && y === undefined) allDap = true;

			var comparePosition = x >= dropAreaCss.left &&
								  x <= (dropAreaCss.left + dropAreaCss.width) &&
								  y >= dropAreaCss.top &&
								  y <= dropAreaCss.top + dropAreaCss.height;

			if (comparePosition || allDap) {
				for (var j = 0; j < dropValue.length; j++) {
					if (dragObjValue == dropValue[j]) {												

						//var dLeft = QSAll('.dLeft');	
						//var dRight = QSAll('.dRight');	
						var dLeft = dotLeft;//신규추가
						var dRight = dotRight;//신규추가
												
						dLeft[dragObjValue-1].childNodes[0].style.backgroundColor = '#000';
						dRight[dragObjValue-1].childNodes[0].style.backgroundColor = '#000';

						result = true;
					}
				}
				if (result === undefined) result = false;
			}
		}
		return result;
	},
	
	setDragObjPosition: function (quizNum, dragObj, param, type) { 
		console.log('setDragObjPosition')
		var obj = dragObj.element !== undefined ? dragObj.element : dragObj,
			idx = obj.getAttribute('value') - 1,
			top, left, targetPath, value, dropTop, dropLeft;

		QUIZ.dragLine.append(quizNum);

		this.path = QSAll('.quiz_' + quizNum +' .svgContainer > path');

		for (var i = 0; i < this.path.length; i++) {
			if (obj.getAttribute('value') == this.path[i].getAttribute('value')) {
				targetPath = this.path[i];				
			}
		}

		value = targetPath.getAttribute('value');
		for (var i = 0; i < this.dropArea.length; i++) {
			if (obj.getAttribute('value') == this.dropArea[i].getAttribute('value')) {
				dropTop = this.dropArea[i].offsetTop + this.dropSize.width;
				dropLeft = this.dropArea[i].offsetLeft + this.dropSize.height;
			}
		}

		obj.style.left = param.left + 'px';
		obj.style.top = param.top + 'px';

		left = param.left + param.width;
		top = param.top + param.height;

		if (type) {
			obj.style.pointerEvents = 'none';
			obj.classList.add(this.name + 'Complete');
			targetPath.setAttribute('d', 'M '+ left +' '+ top + ' L '+ dropLeft +' '+ dropTop); 
		} else {
			targetPath.setAttribute('d', 'M '+ 0 +' '+ 0 + ' L '+ 0 +' '+ 0);
		}
		      
        //console.error(obj.parentNode.parentNode.parentNode.parentNode.getAttribute('data-qid'));
        var dataQid = obj.parentNode.parentNode.parentNode.parentNode.getAttribute('data-qid');
		DTCaliperSensor.fire({
            correct: null, // 정답 여부입력 [true, false] 중에서 택일 
            itemObject: document.querySelector('[data-qid='+dataQid+']'), // 해당 문항 객체 
            value: '' // 실제 정답 데이터 입력 <correctResponse>에 입력된 값이랑 동일
        });
	},


	// 드래그&드랍 성공
	COMPLETE: function (correct, quizNum) {
		QUIZ.dragLine.append(quizNum);
		this.path = QSAll('.quiz_' + quizNum +' .svgContainer > path');

		if (correct) {
			for (var i = 0, path, value, left1, top1, left2, top2; i < this.path.length; i++) {
				path = this.path[i]; 
				value = this.dropArea[i].getAttribute('value') - 1;
				left1 = this.objPosition[i].left + this.objSize.width;
				top1 = this.objPosition[i].top + this.objSize.height;
				left2 = this.dropPosition[value].left + this.dropSize.width;
				top2 = this.dropPosition[value].top + this.dropSize.height;

				path.setAttribute('d', 'M '+ left1 +' '+ top1 + ' L '+ left2 +' '+ top2);
			}

			for (var i = 0; i < this.dragLineObj.length; i++) {
				this.dragLineObj[i].style.pointerEvents = 'none';
				this.dragLineObj[i].classList.add(this.name + 'Complete');
			}
		} 
		else {
			for (var i = 0; i < this.path.length; i++) {
				this.path[i].setAttribute('d', 'M '+ 0 +' '+ 0 + ' L '+ 0 +' '+ 0);
			}
			for (var i = 0; i < this.dragLineObj.length; i++) {
				this.dragLineObj[i].style.pointerEvents = 'auto';
				this.dragLineObj[i].classList.remove(this.name + 'Complete');
			}
		}
		
	},
	resetAll:function(obj){//전체 리셋 신규추가
		
		var len = obj.find('.svgContainer').children().length;
		
		for(i=0;i<len;i++){
			obj.find('.svgContainer').children()[i].setAttribute('d', 'M '+ 0 +' '+ 0 + ' L '+ 0 +' '+ 0);			
		}
		
		obj.find('.drawBox').each(function(){
			$(this).removeClass('dragLineComplete');
			//var style_txt = $(this).attr('style').replace('z-index: 3; pointer-events: none;','');						
			//$(this).attr('style',style_txt);
			$(this).css({'z-index':'3','pointer-events':'initial'});
		});
		obj.find('.dLeft').each(function(){
			$(this).children().attr('style','');
		});
		obj.find('.dRight').each(function(index){
			$(this).children().attr('style','');
		});
		//obj.find('.hold').prop('style','');		
	},
	reset:function(obj,idx){//개별리셋 신규추가 		
		var len = obj.find('.svgContainer').children().length;		
		obj.find('.svgContainer').children()[idx].setAttribute('d', 'M '+ 0 +' '+ 0 + ' L '+ 0 +' '+ 0);			
		obj.find('.drawBox').each(function(index){
			if(idx===index){
				$(this).removeClass('dragLineComplete');
				//var style_txt = $(this).attr('style').replace('z-index: 3; pointer-events: none;','');						
				//$(this).attr('style',style_txt);
				$(this).css({'z-index':'3','pointer-events':'initial'});
			}
		});
		obj.find('.dLeft').each(function(index){
			if(idx===index){
				$(this).children().attr('style','');
			}
		});
		obj.find('.dRight').each(function(index){
			if(idx===index){
				$(this).children().attr('style','');
			}
		});
	}
}

//console.error('test',QUIZ.dragLine.reset);
//QS('.dRight');
//전체 리셋버튼
$('.answer_cancel').on('click',function(){	
	var obj = $(this).parent();	
	QUIZ.dragLine.resetAll(obj);
});

//개별 리셋
$('.dot.dLeft').on('click',function(){
	var idx = $(this).index();
	var obj = $(this).parent().parent();
	QUIZ.dragLine.reset(obj,idx);
});

