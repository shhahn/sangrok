
/*
	create date : 2016-05-19
	creator : saltgamer
*/
'use strict';


var FORTEACHERCD = FORTEACHERCD || {};

FORTEACHERCD.responsive = (function () {

	var responsive = {
		baseContainerSize : {		
			width : 1000,
			height : 600			
		}, 
		currentContainerSize : {
			containerWidth : window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
			containerHeight : window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight	
		},
		setScaleElement : function (targetElement, adjust) {			
		    var bgContainer = document.querySelector('#bgContainer'),
		   		zoomVertical = this.currentContainerSize.containerHeight / targetElement.clientHeight,
				zoomHorizontal = this.currentContainerSize.containerWidth / targetElement.clientWidth,
				zoomVerticalBg = (this.currentContainerSize.containerHeight / bgContainer.clientHeight) * (bgContainer.clientHeight / targetElement.clientHeight),
				zoomHorizontalBg = (this.currentContainerSize.containerWidth / bgContainer.clientWidth) * (bgContainer.clientWidth / targetElement.clientWidth);

			if (targetElement.clientWidth * zoomVertical > this.currentContainerSize.containerWidth) {
				this.setTransformCSS(targetElement, zoomHorizontal);
				this.setTransformBGCSS(bgContainer, 1, zoomHorizontalBg);

			} else {
				this.setTransformCSS(targetElement, zoomVertical);
				targetElement.style.left = ((this.currentContainerSize.containerWidth - (targetElement.clientWidth * zoomVertical)) / 2)  + 'px';				
				// this.setTransformCSS(bgContainer, zoomVertical);
				this.setTransformBGCSS(bgContainer, 1, zoomVerticalBg);
				// bgContainer.style.left = ((this.currentContainerSize.containerWidth - (bgContainer.clientWidth * zoomVerticalBg)) / 2)  + 'px';
			}			
		},
		setTransformCSS : function (targetElement, zoomRate) {
			GameManager.event.zoomRate = zoomRate;
			targetElement.setAttribute('style', '-ms-transform: scale(' + zoomRate + ',' + zoomRate + ');' 
				+ '-webkit-transform: scale(' + zoomRate + ',' + zoomRate + ');' + 'transform: scale(' + zoomRate + ',' + zoomRate + ');' 
				+ 'transform-origin: 0% 0%; -webkit-transform-origin: 0% 0%; -ms-transform-origin: 0% 0%;');	
				GameManager.event.zoomRate = zoomRate;	
		},
		setTransformBGCSS : function (targetElement, zoomRate1, zoomRate2) {
			targetElement.setAttribute('style', '-ms-transform: scale(' + zoomRate1 + ',' + zoomRate2 + ');' 
				+ '-webkit-transform: scale(' + zoomRate1 + ',' + zoomRate2 + ');' + 'transform: scale(' + zoomRate1 + ',' + zoomRate2 + ');' 
				+ 'transform-origin: 0% 0%; -webkit-transform-origin: 0% 0%; -ms-transform-origin: 0% 0%;');		
		}
	};

	return responsive;	
})();
