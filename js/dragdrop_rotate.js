
function CRotateDragDrop(info) {

    var self = this;

    // drop area 셀렉터
    this.dropArea = info.dropArea;

    // drag 오브젝트 셀렉터
    this.dragBox = info.dragBox;

    this.btnReset = info.btnReset;

    this.wrap = info.wrap;
    
    this.orgDragBoxPos = new Array();
    this.curDragBoxPos = new Array();
    this.containerPos = new Array();

    this.curDragBoxIdx = -1;
    this.curPos = undefined;
    this.curDragBox = undefined;

    this.curDeg = 0;

    $(this.dropArea).off('click');

    /*
    info = {
            magnetic: true
        };

        info.orgItem = new Array;
        info.curItem = new Array;
        info.itembox = new Array;
        info.contain = new Array;
    */

    $(this.dragBox).each(function (i, e) {
        //console.log($(e).position());
        self.orgDragBoxPos.push($(e).position()); // 좌표 복원용 (원래 있던자리)
        self.curDragBoxPos.push($(e).position()); // 좌표 비교용 (현재 item 이 있는곳
    });

    this.resetContainerPos();
    
    var touchstart = GameManager.event.eventSelector("eventDown");
	var touchmove = GameManager.event.eventSelector("eventMove");
	var touchend = GameManager.event.eventSelector("eventUp");
        

    $(this.dragBox).on(touchstart, function(e){ self.onTouchStart(e); });
    $(this.dragBox).on(touchmove, function(e){ self.onTouchMove(e); });
    $(this.dragBox).on(touchend, function(e){ self.onTouchEnd(e); });
    $(this.btnReset).on(touchstart, function(e){ self.reset(e) });

    $(this.wrap).on(touchmove, function(e){ self.onTouchMove(e); });

}


/**
 * 
 * @param {*} e 
 */
CRotateDragDrop.prototype.reset = function(e) {

    console.log("reset");

    var container = $(this.dropArea).find(".drop_container");
    for (var i = 0; i < container.length; i++) {
        var c = $(container[i]);

        var bidx = c.data("bind-box-idx");
        if (typeof(bidx) != 'undefined') {
            c.removeData("bind-box-idx");
            
            var box = $(this.dragBox).eq(bidx);
            box.removeData("bind-container-idx");
    
            this.curDragBoxPos[bidx].left = this.orgDragBoxPos[bidx].left;
            this.curDragBoxPos[bidx].top = this.orgDragBoxPos[bidx].top;
    
            box.rotate(0);
            box.css({
                left: this.orgDragBoxPos[bidx].left / zoom,
                top: this.orgDragBoxPos[bidx].top / zoom,
            });
            
        }
        
        
    }

    this.resetContainerPos();
    this.decision();
    this.curDragBoxIdx = -1;
};


/**
 * 컨테이너 좌표 리셋 (기울기 조정 될때마다 호출 되어야함.)
 */
CRotateDragDrop.prototype.resetContainerPos = function() {
    var self = this;
    self.containerPos = [];
    $(this.dropArea).find('.drop_container').each(function (i, e) {
        self.containerPos.push($(e).position());
        var bidx = $(e).data("bind-box-idx");
        if (typeof(bidx) != 'undefined') {
            self.curDragBox[bidx] = $(e).position();
        }
    });
};


/**
 * 
 * @param {*} tg 
 * @param {*} x 
 * @param {*} y 
 * @param {*} type 
 */
CRotateDragDrop.prototype.moveDragBox = function(el,x,y,type){

    //var debug = "zoomViews : " + zoom;
    //debug += "<br /> x : "+ x ;
    //debug += "<br /> y : "+ y;
    //debug += "<br /> el.position().left : "+ el.position().left;
    //debug += "<br /> el.position().top : "+ el.position().top;
    //debugView.log(debug);

    switch (type) {
        case 'ani':
            el.stop().animate({
                left: (x - el.width() / 2) / zoom,
                top: (y - el.height() / 2) / zoom
            }, 100)
            break;
    
        default:
            el.stop().css({
                left: (x - el.width() / 2) / zoom,
                top: (y - el.height() / 2) / zoom
            }, 500)
            break;
    }

    this.curPos = {
        left : el.position().left / zoom,
        top : el.position().top / zoom
    };
    
};


function boxArea(tg,area){
    info.itembox[0] = $(tg).position().left / zoomViews;
    info.itembox[1] = $(tg).position().top / zoomViews;
    
}




/**
 * 드래그 시작
 */
CRotateDragDrop.prototype.onTouchStart = function(e) {
    //console.log("touch start");
    console.log(e);

    var x = e.pageX || e.originalEvent.changedTouches[0].pageX;
    var y = e.pageY || e.originalEvent.changedTouches[0].pageY;
    var el = $(e.target); //.parents(".drag_box");
    
    if (!el.hasClass("drag_box")) el = el.parents(".drag_box");

    //console.log(el[0]);

    //var debug = "zoomViews : " + zoom;
    //debug += "<br /> x : "+ x ;
    //debug += "<br /> y : "+ y;
    //debug += "<br /> el.position().left : "+ el.position().left;
    //debug += "<br /> el.position().top : "+ el.position().top;
    //debugView.log(debug);

    //console.log(this.curDragBoxPos);
    //console.log(x+el.width());
    for (var i = 0; i < this.curDragBoxPos.length; i++) {

        var pos = this.curDragBoxPos[i];
        console.log(pos);
        if (x > pos.left && x < pos.left + el.width() && y > pos.top && y < pos.top + el.height()){
            
            this.curDragBoxIdx = i;
            this.curDragBox = el;

            var cidx = el.data("bind-container-idx");
            //console.log("cidx : "+cidx);
            el.removeData("bind-container-idx");
            //console.log("cidxx : "+el.data("bind-container-idx"));
            $(this.dropArea).find(".drop_container").eq(cidx).removeData("bind-box-idx");

            break;
        }
    }


    if (this.curDragBoxIdx == -1) return;

    this.moveDragBox(el, x, y, 'ani');

    // console.log(mouseX + " " + mouseY);

    //mouseX = mouseX - tg.offset().left;
    //mouseY = mouseY - tg.offset().top;
    this.resetContainerPos();
    e.preventDefault();
    e.stopPropagation();
};

/**
 * 드래그 이동
 */
CRotateDragDrop.prototype.onTouchMove = function(e) {
    //console.log("touch move");
    //console.log(e);

    var x = e.pageX || e.originalEvent.changedTouches[0].pageX;
    var y = e.pageY || e.originalEvent.changedTouches[0].pageY;
    var el = $(e.target);

    if (this.curDragBoxIdx == -1) return;

    this.moveDragBox(this.curDragBox, x, y);
    
    //console.log(mouseX + " " + mouseY);

    e.preventDefault();
    e.stopPropagation();
};

/**
 * 드래그 끝
 */
CRotateDragDrop.prototype.onTouchEnd = function(event) {
    //console.log("touch end");
    //console.log(e);

    var self = this;

    var dropArea = $(this.dropArea);

    // 컨테이너 클릭시 동작 방지
    if (this.curDragBoxIdx == -1) return;
    
    var isMagnetic = false;
    var containers = dropArea.find('.drop_container');

    for (var i = 0; i < containers.length; i++) {

        var magneticX = false;
        var magneticY = false;

        var e = containers[i];

        var offsetX = $(this.dropArea).data("offset-x");
        if (typeof(offsetX) == 'undefined') offsetX = 0 ;

        var offsetY = $(this.dropArea).data("offset-y");
        if (typeof(offsetY) == 'undefined') offsetY = 0;

        var cLeft_org = $(e).position().left + $(this.dropArea).position().left;
        var cTop_org = $(e).position().top + $(this.dropArea).position().top;
        var cLeft = cLeft_org /zoom + offsetX; 
        var cTop = cTop_org /zoom + offsetY; 
        //var cTop = $(e).position().top/zoom;

        var dLeft = this.curPos.left;
        var dTop = this.curPos.top;


        //var debug = "zoomViews : " + zoom;
        //debug += "<br /> cLeft : "+ cLeft ;
        //debug += "<br /> cTop : "+ cTop;
        //debug += "<br /> dLeft : "+ dLeft;
        //debug += "<br /> dTop : "+ dTop;
        //debugView.log(debug);
        //$("#debugView").html(debug);


        //console.log("$(e).position().top : " + $(e).position().top + ", $(this.dropArea).position().top : " + $(this.dropArea).position().top);

        if (dLeft > cLeft && dLeft < cLeft + $(e).width()) magneticX = true;
        if (dLeft + this.curDragBox.width() > cLeft && dLeft + this.curDragBox.width() < cLeft + $(e).width()) magneticX = true;
        if (dTop > cTop && dTop < cTop + $(e).height()) magneticY = true;
        if (dTop + this.curDragBox.height() > cTop && dTop + this.curDragBox.height() < cTop + $(e).height()) magneticY = true;

        //console.log(dLeft);
        //console.log(dTop);

        if (magneticX && magneticY) {

            // 이미 들어가있는 item 이 있으면 out
            var j = 0;
            for (; j < this.curDragBoxPos.length; j++) {
                if (cLeft == this.curDragBoxPos[j].left && cTop == this.curDragBoxPos[j].top) break;
            }

            if (j == this.curDragBoxPos.length) {
                this.curDragBoxPos[this.curDragBoxIdx].left = cLeft;
                this.curDragBoxPos[this.curDragBoxIdx].top = cTop;

                var boxOffsetY = this.curDragBox.data("offset-y");
                if (typeof(boxOffsetY) == 'undefined') boxOffsetY = 0;

                $(e).data("bind-box-idx", self.curDragBoxIdx);
                this.curDragBox.data("bind-container-idx", i);

                this.curDragBox.animate({
                    left: cLeft,
                    top: cTop + boxOffsetY,
                }, function(){
                    //self.curDragBox.css({left:$(e).position().left, top:$(e).position().top + boxOffsetY/zoom});
                    //$(e).append(self.curDragBox);
                    self.decision();
                });

                isMagnetic = true;
                break;
            }


        }

    }

    // 붙은게 없으면 원복
    if (!isMagnetic) {

        this.curDragBoxPos[this.curDragBoxIdx].left = this.orgDragBoxPos[this.curDragBoxIdx].left;
        this.curDragBoxPos[this.curDragBoxIdx].top = this.orgDragBoxPos[this.curDragBoxIdx].top;

        this.curDragBox.rotate(0);
        this.curDragBox.animate({
            left: this.orgDragBoxPos[this.curDragBoxIdx].left / zoom,
            top: this.orgDragBoxPos[this.curDragBoxIdx].top / zoom,
        });

        this.decision();
    }

    magneticX = false;
    magneticY = false;

    this.curDragBoxIdx = -1;
    this.resetContainerPos();
    event.preventDefault();
    event.stopPropagation();


};

/**
 * 
 */
CRotateDragDrop.prototype.decision = function() {

    var sumLeft = 0;
    var sumRight = 0;

    var cL = $(this.dropArea).find(".drop_container_left");
    for (var i = 0; i < cL.length; i++) {

        var container = $(cL[i]);
        var boxIdx = container.data("bind-box-idx");
        if (typeof(boxIdx) != 'undefined') {
            
            var cw = container.data("weight");
            var bw = $(this.dragBox).eq(boxIdx).data("weight");

            sumLeft += cw*bw;

        }

    }


    var cR = $(this.dropArea).find(".drop_container_right");
    for (var i = 0; i < cR.length; i++) {

        var container = $(cR[i]);
        var boxIdx = container.data("bind-box-idx");
        if (typeof(boxIdx) != 'undefined') {
            
            var cw = container.data("weight");
            var bw = $(this.dragBox).eq(boxIdx).data("weight");

            sumRight += cw*bw;

        }

    }


    var deg;
    if (sumLeft < sumRight) {
        deg = 5;
    } else if (sumLeft > sumRight) {
        deg = -5;
    } else {
        deg = 0;
    }

    this.rotate(deg);
    this.correct(deg);
    
    //console.log(sumLeft);

};

/**
 * 
 * @param {*} deg 
 */
CRotateDragDrop.prototype.rotate = function(deg) {

    var self = this;
    var degDiff = deg != this.curDeg;
    if (degDiff) {
        
        this.resetContainerPos();
        
        $(this.dropArea).rotate({
            angle: this.curDeg,
            animateTo:deg,
            easing : function(x, t, b, c, d) { 
                var r = b+(t/d)*c;
                self.correct(r);
                return r; 
            }
        });

        this.curDeg = deg;

        /*
        // box 돌리기
        for (var i = 0; i < 11; i++) {
            if (arrBlock[i]) {
                arrBlock[i].rotate({animateTo:seesaw_deg});
            }
        }
        */
        
    }

};

CRotateDragDrop.prototype.correct = function(deg) {

    var container = $(this.dropArea).find(".drop_container");
    for (var i = 0; i < container.length; i++) {
        var c = $(container[i]);
        var boxIdx = c.data("bind-box-idx");
        if (typeof(boxIdx) != 'undefined') {
            var b = $(this.dragBox).eq(boxIdx);

            var offsetY = $(this.dropArea).data("offset-y");
            if (typeof(offsetY) == 'undefined') offsetY = 0;

            var boxOffsetY = b.data("offset-y");
            if (typeof(boxOffsetY) == 'undefined') boxOffsetY = 0;

            b.css({
                left : (c.position().left + $(this.dropArea).position().left)/zoom,
                top : (c.position().top + $(this.dropArea).position().top)/zoom + boxOffsetY + offsetY
            });

            b.rotate(deg);

        }
    }

};

(function($){

    window.GameManager = {
        event: {
            isTouchDevice: 'ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch,
            eventSelector: function (eventType) { // 현재 디바이스에 맞는 이벤트 문자열을 리턴
                var selectedEvent;
                switch (eventType) {
                    case 'eventDown': selectedEvent = this.isTouchDevice ? 'touchstart' : 'mousedown'; break;
                    case 'eventMove': selectedEvent = this.isTouchDevice ? 'touchmove' : 'mousemove'; break;
                    case 'eventUp': selectedEvent = this.isTouchDevice ? 'touchend' : 'mouseup'; break;
                    case 'eventOut': selectedEvent = this.isTouchDevice ? 'touchleave' : 'mouseout'; break;
                }
                return selectedEvent;
            }
        }
    };


    function viewport() {
        if (parent.ZOOMVALUE == undefined) {
            parent.ZOOMVALUE = 1;
        }
        window.zoom = parent.ZOOMVALUE;
        //console.log(CRotateDragDrop.zoom);
    }

    $(function(){
        $(window).resize(function () {
            viewport();
        });
        viewport();
    });

})(jQuery);