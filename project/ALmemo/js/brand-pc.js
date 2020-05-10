$(function(){
    var iPos = [
        [
            [300,500],
            [
                {"left":0,"opacity":1},
                {"left":108,"opacity":0}
            ],
            [
                {"right":0,"opacity":1},
                {"right":116,"opacity":0}
            ]
        ],
        [
            300,
            {"top":0,"opacity":1},
            {"top":80,"opacity":0}
        ],
        [
            400,
            [
                {"top":171,"opacity":1},
                {"top":140,"opacity":0}
            ]
        ],
        [
            [500,800],
            [
                {"right":0,"opacity":1},
                {"right":46,"opacity":0}
            ],
            [
                {"left":0,"opacity":1},
                {"left":25,"opacity":0}
            ]
        ],
        [
            [350,150,300],
            [
                {"width":0,"height":0},   
                {"width":128,"height":128},
                {"width":196,"height":58}
            ],
            [
                {"left":131,"opacity":1},
                {"left":250,"opacity":0}
            ],
            [
                {"right":131,"opacity":1},
                {"right":250,"opacity":0}
            ],
            [
                {"left":0,"opacity":1},
                {"left":50,"opacity":0}
            ],
            [
                {"right":0,"opacity":1},
                {"right":50,"opacity":0}
            ]
        ],
        [
            [400,350],
            [
                {"opacity":1,"bottom":0},
                {"opacity":0,"bottom":-100}
            
            ],
            [
                {"width":0,"height":0},   
                {"width":120,"height":120}
            ]
        ]
    ]
    //페이지 롤링
    var wheel;
    var animating = true;
    var winHeight = $(window).height() > 860 ? $(window).height() : 860;
    var subHash = ["sub_1","sub_2","sub_3","sub_4","sub_5"];
    var hash = location.hash.split("#")[1];
    var $rolling = $(".rolling_wrap");
    var plx = {
        contentNum : 0,
        prevNum : 0 ,
        conleng : $rolling.find(".wrap").length,
        speed : 800,
        movePage : function(){
            animating = false;
            if(this.contentNum > 0){
                $(".header.main_h").fadeOut();
                $(".header.sub_h, .btn_gotop").fadeIn();
            } else{
                $(".header.sub_h, .btn_gotop").fadeOut();
                $(".header.main_h").fadeIn();
            }
            $rolling.stop().animate({top:-winHeight * this.contentNum}, this.speed,function(){
                plx.innerForward();
                plx.cssDefault();
                setTimeout(function(){animating = true;},500);
            });
            $(".memo_wrap").stop().animate({marginTop:-this.contentNum*15});
            plx.innerReverse();
        },
        moveIdx : function(){
            if (this.contentNum < this.conleng -1 && wheel){
                this.prevNum = this.contentNum;
                this.contentNum ++;
            } else if (this.contentNum > 0 && !wheel){
                this.prevNum = this.contentNum;
                this.contentNum --;
            }
        },
        pageOn : function(){
            $(".header.sub_h .gnb li:not(:eq("+(this.contentNum-1)+")) a").removeClass("on");
            $(".header.sub_h .gnb li:eq("+(this.contentNum-1)+") a").addClass("on");
        },
        cssReset : function(){
            $(".main .ani1, .sub_4 .animate .phone1").hide();
            $(".main .ani2").css(iPos[0][1][1]);
            $(".main .ani3").css(iPos[0][2][1]);
            $(".sub_1 .animate span").css(iPos[1][2]);
            $(".sub_2 .animate .pointer").css(iPos[2][1][1]);
            $(".sub_3 .animate .float2").css(iPos[3][1][1]);
            $(".sub_3 .animate .float1").css(iPos[3][2][1]);
            $(".sub_4 .animate .badge img").css(iPos[4][1][0]);
            $(".sub_4 .animate .phone2").css(iPos[4][2][1]);
            $(".sub_4 .animate .phone4").css(iPos[4][3][1]);
            $(".sub_4 .animate .phone3").css(iPos[4][4][1]);
            $(".sub_4 .animate .phone5").css(iPos[4][5][1]);
            $(".sub_5 .animate").css(iPos[5][1][1]);
            $(".sub_5 .animate li img").stop().css(iPos[5][2][0]);
        },
        cssDefault : function(){
            switch(plx.prevNum){
                case 0 : {
                    $(".main .ani1").hide();
                    $(".main .ani2").css(iPos[0][1][1]);
                    $(".main .ani3").css(iPos[0][2][1]);
                    break;
                }
                case 1 : {
                    $(".sub_1 .animate span").css(iPos[1][2]);
                    break;
                }
                case 2 : {
                    $(".sub_2 .animate .pointer").css(iPos[2][1][1]);
                    $(".sub_2 .animate .pointer .touch").removeClass("on");
                    break;
                }
                case 3 : {
                    $(".sub_3 .animate .float2").css(iPos[3][1][1]);
                    $(".sub_3 .animate .float1").css(iPos[3][2][1]);
                    break;
                }
                case 4 : {
                    $(".sub_4 .animate .phone1").hide();
                    $(".sub_4 .animate .badge img").css(iPos[4][1][0]);
                    $(".sub_4 .animate .phone2").css(iPos[4][2][1]);
                    $(".sub_4 .animate .phone4").css(iPos[4][3][1]);
                    $(".sub_4 .animate .phone3").css(iPos[4][4][1]);
                    $(".sub_4 .animate .phone5").css(iPos[4][5][1]);
                    break;
                }
                case 5 : {
                    $(".sub_5 .animate").css(iPos[5][1][1]);
                    $(".sub_5 .animate li img").stop().css(iPos[5][2][0]);
                    break;
                }
            }
        },
        innerForward : function(){
            switch(plx.contentNum){
                case 0 : {
                    $(".main .ani1").stop().hide().fadeIn(iPos[0][0][0],function(){
                        $(".main .ani2").stop().animate(iPos[0][1][0],iPos[0][0][1]);
                        $(".main .ani3").stop().animate(iPos[0][2][0],iPos[0][0][1]);
                    });
                    break;
                }
                case 1 : {
                    $(".sub_1 .animate .phone1").stop().animate(iPos[1][1],iPos[1][0]);
                    setTimeout(function(){$(".sub_1 .animate .phone2").stop().animate(iPos[1][1],iPos[1][0])},100);
                    setTimeout(function(){$(".sub_1 .animate .phone3").stop().animate(iPos[1][1],iPos[1][0])},200);
                    setTimeout(function(){$(".sub_1 .animate .phone4").stop().animate(iPos[1][1],iPos[1][0])},300);
                    /*$(".sub_1 .animate .phone1").stop().animate(iPos[1][1],iPos[1][0],function(){
                        $(".sub_1 .animate .phone2").stop().animate(iPos[1][1],iPos[1][0],function(){
                            $(".sub_1 .animate .phone3").stop().animate(iPos[1][1],iPos[1][0],function(){
                                $(".sub_1 .animate .phone4").stop().animate(iPos[1][1],iPos[1][0]);
                            })
                        })
                    })*/
                    break;
                }
                case 2 : {
                    $(".sub_2 .animate .pointer").stop().animate(iPos[2][1][0],iPos[2][0]);
                    $(".sub_2 .animate .pointer .touch").addClass("on");
                    break;
                }
                case 3 : {
                    $(".sub_3 .animate .float2").stop().animate(iPos[3][1][0],iPos[3][0][0]);
                    $(".sub_3 .animate .float1").stop().animate(iPos[3][2][0],iPos[3][0][1]);
                    break;
                }
                case 4 : {
                    $(".sub_4 .animate .phone1").stop().fadeIn(iPos[4][0][0],function(){
                        $(".sub_4 .animate .phone2").stop().animate(iPos[4][2][0],iPos[4][0][2]);
                        $(".sub_4 .animate .phone4").stop().animate(iPos[4][3][0],iPos[4][0][2],function(){
                            $(".sub_4 .animate .phone3").stop().animate(iPos[4][4][0],iPos[4][0][2]);
                            $(".sub_4 .animate .phone5").stop().animate(iPos[4][5][0],iPos[4][0][2]);
                        });
                    });
                    setTimeout(function(){
                        $(".sub_4 .animate .badge1 img").stop().animate(iPos[4][1][1],iPos[4][0][1]);
                    },iPos[4][0][1])
                    setTimeout(function(){
                        $(".sub_4 .animate .badge2 img").stop().animate(iPos[4][1][2],iPos[4][0][1]);
                        $(".sub_4 .animate .badge3 img").stop().animate(iPos[4][1][2],iPos[4][0][1]);
                    },iPos[4][0][2])
                    break;
                }
                case 5 : {
                    $(".sub_5 .animate").stop().animate(iPos[5][1][0],iPos[5][0][0]);
                    $(".sub_5 .animate li img").stop().animate(iPos[5][2][1],iPos[5][0][1]);
                    break;
                }
            }
        },
        innerReverse : function(){
            switch(plx.prevNum) {
                case 0 : {
                    $(".main .ani2").stop().animate(iPos[0][1][1],iPos[0][0][1]);
                    $(".main .ani3").stop().animate(iPos[0][2][1],iPos[0][0][1],function(){
                        $(".main .ani1").fadeOut(iPos[0][0][0]);
                    });
                    break;
                }
                case 1 : {
                    $(".sub_1 .animate span").stop().animate(iPos[1][2],iPos[1][0]);
                    break;
                }
                case 2 : {
                    $(".sub_2 .animate .pointer").stop().animate(iPos[2][1][1],(iPos[2][0]/2));
                    $(".sub_2 .animate .pointer .touch").removeClass("on");
                    break;
                }
                case 3 : {
                    $(".sub_3 .animate .float2").stop().animate(iPos[3][1][1],250);
                    $(".sub_3 .animate .float1").stop().animate(iPos[3][2][1],400);
                    break;
                }
                case 4 : {
                    $(".sub_4 .animate .phone5").stop().animate(iPos[4][5][1],iPos[4][0][2]);
                    $(".sub_4 .animate .phone3").stop().animate(iPos[4][4][1],iPos[4][0][2],function(){
                        $(".sub_4 .animate .phone2").stop().animate(iPos[4][2][1],iPos[4][0][2]);
                        $(".sub_4 .animate .phone4").stop().animate(iPos[4][3][1],iPos[4][0][2],function(){
                            $(".sub_4 .animate .badge3 img").stop().animate(iPos[4][1][0],iPos[4][0][1]);
                            $(".sub_4 .animate .badge2 img").stop().animate(iPos[4][1][0],iPos[4][0][1]);
                            $(".sub_4 .animate .badge3 img").stop().animate(iPos[4][1][0],iPos[4][0][1]);
                            $(".sub_4 .animate .phone1").fadeOut(iPos[4][0][0]);
                        });
                    });
                    break;
                }
                case 5 : {
                    $(".sub_5 .animate").stop().animate(iPos[5][1][1],iPos[5][0][0]);
                    $(".sub_5 .animate li img").stop().animate(iPos[5][2][0],iPos[5][0][1]);
                    break;
                }
            }
        }
    }
    //콘텐츠 사이즈
    $(".almemo").css("height",winHeight);
    //resize
    $(window).resize(function(){
        winHeight = $(window).height() > 860 ? $(window).height() : 860;
        $(".almemo").css("height",winHeight);
        if(parseInt($rolling.css("top")) < 0){
            $rolling.css("top",-winHeight*plx.contentNum);
        }
        topPosition();
    })
    //header 복사하기
    $(".header").clone().insertBefore(".rolling_wrap");
    $(".header:first").addClass("main_h");
    $(".header:last").addClass("sub_h");
    if(subHash.indexOf(hash) == -1){
        $(".header.sub_h").hide();
    } else{
        $(".header.main_h").hide();
        var hashCut = "."+hash;
        plx.contentNum = $(hashCut).index(".wrap");
        $rolling.stop().css("top",-plx.contentNum*winHeight);
        $(".btn_gotop").show();
        $(".memo_wrap").css("marginTop",-plx.contentNum*15);
        plx.pageOn();
    }
    //마우스 휠
    $rolling.on("mousewheel DOMMouseScroll",function(event){
        event.preventDefault ? event.preventDefault() : event.returnValue = false;
        if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
            if (event.originalEvent.detail > 0){
                //아래
                if(plx.contentNum < plx.conleng-1){
                    wheel = true;
                } else{
                    return false;
                }
            } else{
                if(plx.contentNum>0){
                    wheel = false;
                } else{
                    return false;
                }
            }
        } else {
            if (event.originalEvent.wheelDelta < 0){
                //아래
                if(plx.contentNum < plx.conleng-1){
                    wheel = true;
                } else{
                    return false;
                }
            } else{
                if(plx.contentNum>0){
                    wheel = false;
                } else{
                    return false;
                }
            }
        }
        if (!($rolling.is(":animated")) && animating){
            plx.moveIdx();
            plx.movePage();
            plx.pageOn();
        }
    })
    //gnb 클릭
    $(".header h1 a, .gnb li a").click(function(e){
        e.preventDefault();
        if($(this).parents().hasClass("gnb")){
            var clickIdx = $(this).parent().index()+1;
        } else{
            clickIdx = 0;
        }
        if(clickIdx != plx.contentNum){
            plx.prevNum = plx.contentNum;
            plx.contentNum = clickIdx;
            plx.movePage();
            plx.pageOn();
        }
    })
    //top버튼 클릭
    $(".btn_gotop").click(function(e){
        e.preventDefault();
        plx.prevNum = plx.contentNum;
        plx.contentNum = 0;
        plx.movePage();
        plx.pageOn();
    })
    function topPosition(){
        var winWidth = $(window).width();
        if(winWidth<=1280){
            $(".btn_gotop").removeClass("w1920").addClass("w1280");
        } else{
            $(".btn_gotop").removeClass("w1280").addClass("w1920");
        }
    }
    topPosition();
    //메인 input focus 이벤트
    $(".main .send_ipt input[type=text]").keyup(function(){
        if(this.value !== ""){
            $(".main .send_ipt label").hide();
        } else{
            $(".main .send_ipt label").show();
        }
    })
    $(window).load(function(){
        $(".almemo").show();
        plx.cssReset();
        plx.innerForward();
    })
})
//하위버전 indexOf 사용하기
if(!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(obj, start) {
         for (var i = (start || 0), j = this.length; i < j; i++) {
             if (this[i] === obj) { return i; }
         }
         return -1;
    }
}