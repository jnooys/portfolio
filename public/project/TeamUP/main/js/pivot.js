(function($){
	$.fn.pivot = function(opts){
		var options = {
			speed : 500,
			delay: 5000,
            clone : 1,
			nav : ".main_func .roll_btn",
			navOn : "on",
            onNum : 0
        };
		$.extend(options, opts);
		
		return this.each(function(){
			var $selector = $(this);
            var $nav = $(options.nav);
            var $item = $selector.children();
            var _nowPosition = options.clone;
            var _clone = options.clone;
            var _speed = options.speed;
            var _delay = options.delay;
            var _width = $item.width();
            var _winWidth = $(window).width();
            var _length = $item.length;
            var _onNum = options.onNum;
            var _rollCheck,_interval;  
            //초기화
            var _init = function(){
                var $last = $selector.children(":last").clone(true);
                var $first = $selector.children(":first").clone(true); 
                $last.clone(true).prependTo($selector);
                $first.clone(true).appendTo($selector);
                $item = $selector.children();
                _length = $item.length;
                $item.removeClass("on").eq(_onNum+_clone).addClass("on");
                $selector.css({width:_width*_length,marginLeft:-_width*_clone});
            }
            _init();
            //기본 슬라이드 세팅
            var _slide = {
                move : function(n){
                    _nowPosition = n;
                    $selector.stop().animate({"marginLeft":-_nowPosition*_width},_speed,function(){
                    _slide.rollSet();
                    });
                    _slide.navSet();
                },
                rolling : function(){
                    _slide.move(_nowPosition+1);
                },
                auto : function(){
                    if(!_rollCheck){
                        _interval = setInterval(_slide.rolling, _delay);
                        _rollCheck = true;
                    }
                },
                stop : function(){
                    clearInterval(_interval);
                    _rollCheck = false;
                },
                rollSet : function(){
                    if (_nowPosition==_onNum+_clone-1){
                        $selector.stop().css({"marginLeft":-_width*(_length-1-_clone-_onNum)});
                        _nowPosition = _length-1-_clone-_onNum;
                    } else if(_nowPosition == _length-_clone-_onNum){
                        $selector.stop().css({"marginLeft":-_width*(_clone-_onNum)});
                        _nowPosition = _clone-_onNum;
                    }
                    $item.removeClass("on").eq(_nowPosition+_onNum).addClass("on");
                },
                navSet : function(){
                    $item.removeClass("on").eq(_nowPosition+_onNum).addClass("on");
                    $nav.find("li").removeClass("on");
                    if(_nowPosition == _length-_clone-_onNum){
                        $nav.find("li:first").addClass("on");
                    } else {
                        $nav.find("li").eq(_nowPosition-_clone+_onNum).addClass("on");
                    }
                }
            }
            //터치 이벤트 세팅
            var _touch = {
                orginalLeft : 0,
                oldLeft : 0,
                originalTop : 0,
                oldTop : 0,
                scrollStart : 0,
                scrollCheck : false,
                isDown : false,
                start : function(event){
                    this.originalLeft = 1;
                    this.scrollStart = $(window).scrollTop();
                    this.scrollCheck = false;
                    this.oldLeft = this.originalLeft = event.touches[0].clientX;
                    this.oldTop = this.originalTop = event.touches[0].clientY;
                    _slide.rollSet();
                },
                move : function(event){
                    var distance = this.oldLeft - event.changedTouches[0].clientX;
                    var sct = $(window).scrollTop();
                    var d_y = this.originalTop - event.changedTouches[0].clientY;
                    this.oldLeft = event.touches[0].clientX;
                    this.oldTop = event.touches[0].clientY;
                    if(Math.abs(distance) > Math.abs(d_y) && sct == this.scrollStart){
                        event.preventDefault();
                        _autoCheck.clear();
                        $selector.stop().animate({"marginLeft": '-=' + distance}, 0);
                        this.scrollCheck = true;
                    }
                },
                end : function(){
                    var movePosition = function(direction){
                        var changePosition = _nowPosition + direction;
                        return changePosition;
                    }
                    if(this.scrollCheck){
                        if (this.originalLeft - event.changedTouches[0].clientX > _width/5) {
                            var moveNum = movePosition(+1);
                        } else if(this.originalLeft - event.changedTouches[0].clientX < - _width/5){
                            var moveNum = movePosition(-1);
                        } else{
                            var moveNum = movePosition(0);
                        }
                        _slide.move(moveNum);
                        _autoCheck.set();
                        return true;
                    }
                }
            }
            // 네비게이션 클릭 이벤트
            var _click = function(i){
                if(i!=_nowPosition){
                    _autoCheck.clear();
                    _nowPosition = i;
                    $selector.stop().css({"marginLeft":-_nowPosition*_width});
                    _slide.navSet();
                   _autoCheck.set();
                }
            }
            // 자동 롤링 체크
            var _autoCheck = {
                set : function(){
                    _slide.auto();
                },
                clear : function(){
                    _slide.stop();
                }
            }
            _autoCheck.set();
            //터치 이벤트
            $selector.on("touchstart", function(e){
                var event = e.originalEvent;
                if(!$(this).hasClass("roll")){
                    _touch.start(event);
                }
            }).on("touchmove", function(e){
                var event = e.originalEvent;
                if(!$(this).hasClass("roll")){
                    _touch.move(event);
                }
            }).on("touchend", function(e){
                if(!$(this).hasClass("roll")){
                    _touch.end();
                }
            })
            // 네비게이션 클릭 이벤트
            $nav.find("li a").click(function(e){
                e.preventDefault();
                var idx = $(this).parent().index()+_clone-_onNum;
                _click(idx);
            })
        })
    }
})(jQuery)