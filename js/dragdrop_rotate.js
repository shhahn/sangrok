
function CRotateDragDrop(info) {

    var self = this;

    // drop area 셀렉터
    this.dropArea = info.dropArea;

    // drag 오브젝트 셀렉터
    this.dragBox = info.dragBox;

    this.btnReset = info.btnReset;

    this.wrap = info.wrap;

    this.dropType = $(this.dropArea).data("drop-type");
    if (typeof(this.dropType) == 'undefined') this.dropType = 'default';
    
    this.orgDragBoxPos = new Array();
    this.curDragBoxPos = new Array();
    this.containerPos = new Array();

    this.curDragBoxIdx = -1;
    this.curPos = undefined;
    this.curDragBox = undefined;

    this.curDeg = 0;

    $(this.dropArea).off('click');

    if (this.dropType == 'scale') {
        var sl = $(this.dropArea).find(".scale_left");
        var sr = $(this.dropArea).find(".scale_right");
        sl.data("org-top",sl.position().top);
        sr.data("org-top",sr.position().top);
    }
    

    $(this.dragBox).each(function (i, e) {
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
    $(this.wrap).on(touchend, function(e){ self.onTouchEnd(e); });

}


/**
 * 
 * @param {*} e 
 */
CRotateDragDrop.prototype.reset = function(e) {

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
            self.curDragBoxPos[bidx] = $(e).position();
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

    if (!el.hasClass("drag_box")) el = el.parents(".drag_box");
    if (!el.hasClass("drag_box")) return;

    switch (type) {
        case 'ani':
            el.stop().animate({
                left: (x - el.width() / 2) / zoom,
                top: (y - el.height() / 2) / zoom
            }, 100)
            break;
    
        default:
            el.css({
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

    var x = e.pageX || e.originalEvent.changedTouches[0].pageX;
    var y = e.pageY || e.originalEvent.changedTouches[0].pageY;
    var el = $(e.target); //.parents(".drag_box");
    
    if (!el.hasClass("drag_box")) el = el.parents(".drag_box");
    if (!el.hasClass("drag_box")) return;

    //el.rotate(0);
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
        if (x > pos.left && x < pos.left + el.width() && y > pos.top && y < pos.top + el.height()){
            
            this.curDragBoxIdx = i;
            this.curDragBox = el;

            var cidx = el.data("bind-container-idx");
            el.removeData("bind-container-idx");
            $(this.dropArea).find(".drop_container").eq(cidx).removeData("bind-box-idx");

            break;
        }
    }


    if (this.curDragBoxIdx == -1) return;

    this.moveDragBox(el, x, y, 'ani');

    // console.log(mouseX + " " + mouseY);

    //mouseX = mouseX - tg.offset().left;
    //mouseY = mouseY - tg.offset().top;
    //this.resetContainerPos();
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
    //console.log(event);

    var self = this;

    var dropArea = $(this.dropArea);

    // 컨테이너 클릭시 동작 방지
    if (this.curDragBoxIdx == -1) return;
    
    var isMagnetic = false;
    var magnaticPos = new Array();
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

        
        if (typeof(this.curDragBox) == 'undefined') return;


        // 충돌 영역 
        var crashLeft = dLeft;
        var crashTop = dTop;
        var crashRight = dLeft + this.curDragBox.width();
        var crashBottom = dTop + this.curDragBox.height();

        // 임의의 충돌영역 설정
        if (typeof(this.curDragBox.data("crash-area"))!='undefined') {
            var crashArea = this.curDragBox.find(".drag_box_crash");
            
            crashLeft += crashArea.position().left;
            crashTop += crashArea.position().top;
            crashRight = crashLeft + crashArea.width();
            crashBottom = crashTop + crashArea.height();
            //console.log(crashArea.position().left);
            //console.log(dLeft);
        }




        //console.log("$(e).position().top : " + $(e).position().top + ", $(this.dropArea).position().top : " + $(this.dropArea).position().top);

        if (crashLeft > cLeft && crashLeft < cLeft + $(e).width()) magneticX = true;
        if (crashRight > cLeft && crashRight < cLeft + $(e).width()) magneticX = true;
        if (crashTop > cTop && crashTop < cTop + $(e).height()) magneticY = true;
        if (crashBottom > cTop && crashBottom < cTop + $(e).height()) magneticY = true;

        //console.log(dLeft);
        //console.log(dTop);

        if (magneticX && magneticY) {


            if (this.dropType == 'scale') {
            
                var dw = this.curDragBox.data("weight");
                var ds = $(e).find(".drop_space");

                for (var j = 0; j < ds.length; j++) {
                    var sw = $(ds[j]).data("weight");
                    var boxidx = $(ds[j]).data("bind-box-idx");

                    if (typeof(boxidx) == 'undefined' && sw == dw) {

                        cLeft_org = $(ds[j]).position().left + $(this.dropArea).position().left + $(this.dropArea).find(".drop_container_right").position().left - 10/zoom;
                        cTop_org = $(ds[j]).position().top + $(this.dropArea).position().top + $(this.dropArea).find(".drop_container_right").position().top + 10/zoom;
                        cLeft = cLeft_org /zoom + offsetX; 
                        cTop = cTop_org /zoom + offsetY; 


                        $(ds[j]).data("bind-box-idx", this.curDragBoxIdx);

                        isMagnetic = true;
                        break;
                    }

                }


            } else {
                // 이미 들어가있는 item 이 있으면 out
                var j = 0;
                for (; j < this.curDragBoxPos.length; j++) {
                    if (cLeft == this.curDragBoxPos[j].left && cTop == this.curDragBoxPos[j].top) {
                        break;
                    }
                }

                // 박스는 들어갈수있는 컨테이너에만 들어갈수있음 
                var isLeft = this.curDragBox.hasClass("drag_box_left") && $(e).hasClass("drop_container_left");
                var isRight = this.curDragBox.hasClass("drag_box_right") && $(e).hasClass("drop_container_right");

                if (j == this.curDragBoxPos.length && (isLeft || isRight)) {
                    isMagnetic = true
                }

                
                
            }

            if (isMagnetic) {
                
                var boxOffsetY = this.curDragBox.data("offset-y");
                if (typeof(boxOffsetY) == 'undefined') boxOffsetY = 0;

                magnaticPos.push({
                    left : cLeft,
                    top : cTop + boxOffsetY,
                    idx : i,
                    container : e
                });

                
                //break;
            }


        }

    }


    if (isMagnetic) {

  
        var posidx = 0;

        // 매칭된 컨테이너가 2개 이상이면 좌우 어디에 넣을지 정함
        if (magnaticPos.length > 1) {
            var dcenter = dLeft; // 이미 중앙값 보정 된듯?
            
            var leftMagnetic = dcenter - magnaticPos[0].left;
            var rightMagnetic = magnaticPos[1].left - dcenter;

            //console.log(dcenter + " " + magnaticPos[0].left + " " +  magnaticPos[1].left + " " + leftMagnetic + " " + rightMagnetic);
            if (rightMagnetic < leftMagnetic) {
                posidx = 1;
            }
        }

        

        var mleft = magnaticPos[posidx].left;
        var mtop = magnaticPos[posidx].top;
        var midx = magnaticPos[posidx].idx;
        var c = magnaticPos[posidx].container;

        this.curDragBoxPos[this.curDragBoxIdx].left = mleft;
        this.curDragBoxPos[this.curDragBoxIdx].top = mtop;

        $(c).data("bind-box-idx", self.curDragBoxIdx);
        this.curDragBox.data("bind-container-idx", midx);

        this.curDragBox.animate({
            left: mleft,
            top: mtop,
        }, function(){
            //self.curDragBox.css({left:$(e).position().left, top:$(e).position().top + boxOffsetY/zoom});
            //$(e).append(self.curDragBox);
            self.decision();
        });
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

        if (this.dropType == 'scale') {

            var cw = container.find(".drop_dummy").data("weight");
            sumLeft += cw;
        } else {
            var boxIdx = container.data("bind-box-idx");
            if (typeof(boxIdx) != 'undefined') {
                
                var cw = container.data("weight");
                var bw = $(this.dragBox).eq(boxIdx).data("weight");
    
                sumLeft += cw*bw;
    
            }
        }

        

    }


    var cR = $(this.dropArea).find(".drop_container_right");
    for (var i = 0; i < cR.length; i++) {

        var container = $(cR[i]);

        if (this.dropType == 'scale') {
            var ds = container.find(".drop_space");
            for (var j = 0; j < ds.length; j++) {
                var bidx = $(ds[j]).data("bind-box-idx");
                if (typeof(bidx) != 'undefined') {
                    var sw = $(ds[j]).data("weight");
                    sumRight += sw;
                }
            }

        } else {
            var boxIdx = container.data("bind-box-idx");
            if (typeof(boxIdx) != 'undefined') {
                
                var cw = container.data("weight");
                var bw = $(this.dragBox).eq(boxIdx).data("weight");
    
                sumRight += cw*bw;
    
            }
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
  
        if (this.dropType == 'scale') {
            $(this.dropArea).find(".scale_bar").rotate({
                angle: this.curDeg,
                animateTo:deg,
                easing : function(x, t, b, c, d) { 
                    var r = b+(t/d)*c;
                    self.correct(r);
                    return r; 
                }
            });
        } else {
            $(this.dropArea).rotate({
                angle: this.curDeg,
                animateTo:deg,
                easing : function(x, t, b, c, d) { 
                    var r = b+(t/d)*c;
                    self.correct(r);
                    return r; 
                }
            });
        }
        

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


        if (this.dropType == 'scale') {

            var degToPx = 2.3; // 각도에 의한 임의의 보정치

            var sl = $(this.dropArea).find(".scale_left");
            var sr = $(this.dropArea).find(".scale_right");

            var slOrg = sl.data("org-top");
            var srOrg = sr.data("org-top");

            var sb = $(this.dropArea).find(".scale_bar");
            var angle = sb.getRotateAngle();
            
            var fix = angle[0]*degToPx*zoom;
            

            var sltop = slOrg - fix;
            var srtop = srOrg + fix;

            //console.log(angle[0]);
            //console.log(fix + " " + sltop + " " + srtop);

            sl.css({top:sltop});
            sr.css({top:srtop});

            var ds = c.find(".drop_space");
            for (var j = 0; j < ds.length; j++) {
                var boxIdx = $(ds[j]).data("bind-box-idx");
                var b = $(this.dragBox).eq(boxIdx);
                var offsetY = $(this.dropArea).data("offset-y");
                if (typeof(offsetY) == 'undefined') offsetY = 0;
    
                var boxOffsetY = b.data("offset-y");
                if (typeof(boxOffsetY) == 'undefined') boxOffsetY = 0;

                var cLeft_org = $(ds[j]).position().left + $(this.dropArea).position().left + $(this.dropArea).find(".drop_container_right").position().left - 10*zoom;
                var cTop_org = $(ds[j]).position().top + $(this.dropArea).position().top + $(this.dropArea).find(".drop_container_right").position().top + 10*zoom;
                var cLeft = cLeft_org /zoom; 
                var cTop = cTop_org /zoom + offsetY;

                //$(ds[j]).data("bind-box-idx");

                
                if (typeof(boxIdx) != 'undefined') {
                    
                    b.css({
                        left : cLeft,
                        top : cTop + boxOffsetY + fix
                    });
    
    
                    //var btop =  b.position().top + deg/degToPx/zoom;
    
                    //console.log(cTop + boxOffsetY);
                    //console.log(btop);
    
                    //b.css({top:btop});
                }
                
            }

        } else {
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