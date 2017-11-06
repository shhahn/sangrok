
/*
	create date : 2016-05-19
	creator : saltgamer
*/
'use strict';

function loadScriptFile (scriptSrc, callBack) {	
	var script = document.createElement('script');
	script.src = scriptSrc;
	if (callBack) {
		script.onload = function () {
			callBack();
		};
	}
	document.head.appendChild(script);
}

function runTextBook (callBack) {
	if(window.document) {     
        if ( window.document.readyState === "complete" ) {
            setTimeout( run );
        } else {
            // window.document.addEventListener( "DOMContentLoaded", completed, false );
            window.addEventListener("load", completed, false );
        }
    }
    function completed() {
        // window.document.removeEventListener( "DOMContentLoaded", completed, false );
        window.removeEventListener( "load", completed, false );
        callBack();
    }
}


loadScriptFile('../js/responsive.js', function () { console.log('□ responsive.js loaded...')});

runTextBook(function () {
	FORTEACHERCD.responsive.setScaleElement(document.querySelector('.wayContent'));	
	window.addEventListener('resize', function () {		
		FORTEACHERCD.responsive.currentContainerSize.containerWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		FORTEACHERCD.responsive.currentContainerSize.containerHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		FORTEACHERCD.responsive.setScaleElement(document.querySelector('.wayContent'));			
	}, false);		
});