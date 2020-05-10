var sct, l_default, l_effect, c_push, c_up, s_effect, p_result, dir, lnm, 
    time = 2000, counting = false;
$(function(){
    //가위바위보 버튼 mousedown 이벤트
    $(".btn_push li a").bind("mousedown",function(e){
        var $this = $(this);
        if(e.which == 1){
            clearTimeout(c_up);
            $(this).addClass("push1");
            c_push = setTimeout(function(){
                $this.removeClass("push1").addClass("push2");
            },5);
        }
    }).bind("mouseup mouseleave",function(e){
        var $this = $(this);
        if($(this).hasClass("push2")){
            $(this).removeClass("push2").addClass("push1");
            c_up = setTimeout(function(){
                $this.removeClass("push1");
            },5);
        }
    }).bind("click",function(e){
        e.preventDefault();
        clearInterval(l_default);
        $(".pannel .lights").removeClass("odd even");
        if(!counting){
            counting = true;    
        } else{
            return false;
        }
        $(".pannel .mark .question").removeClass("show").next().addClass("show");
        dir = true, lnm = 0;
        var st = 2, sr = 3;
        /*  서버에서 선택한 가위바위보 변수: st
            주먹: 1
            가위: 2
            보: 3
            
            게임 결과 변수: sr
            비겼다: 1
            이겼다: 2
            졌다: 3
        */
        if( isIE() > 8 || !isIE()){
            l_effect = setInterval(idIntv,time/266);    
        } else {
            l_effect = setTimeout(function(){dir="END"},time);
        }
        s_effect = setInterval(function(){
            var sIdx = $(".pannel .mark span.show").index();
            $(".pannel .mark span:eq("+sIdx+")").removeClass("show");
            if(typeof(dir) == "boolean"){
                if(sIdx<3){
                $(".pannel .mark span:eq("+(sIdx+1)+")").addClass("show");
                } else {
                    $(".pannel .mark span.rock").addClass("show");    
                }
            } else{
                clearInterval(s_effect);
                //가위바위보 서버 결과 보여주기 
                $(".pannel .mark span:eq("+st+")").addClass("show");
                //가위바위보 게임 결과
                $(".gresult .pop_result .msg:eq("+(sr+1)+")").addClass("show");
                p_result = setTimeout(function(){
                    $(".gresult").show();
                    $(".gresult .pop_result").fadeIn(400);
                },400)
            }
        },150)
    })
    //게임 결과 팝업 닫기
    $(".gresult .pop_bg, .gresult .close").click(function(){
        clearTimeout(p_result);
        $(".pannel .lights").removeClass("odd").addClass("even");
        $(".mark .question").addClass("show").siblings().removeClass("show");
        $(this).parents(".pop_wrap").hide().find(".pop_result").hide().find(".msg").removeClass("show");
        l_default = setInterval(cdEffect,600);
        counting = false;
        return false;
    })
    
    //레이어 팝업
    $(".btn_pop").click(function(e){
        e.preventDefault();
        var link = $(this).attr("href");
        $(".layerpop").show().find(link).addClass("show").siblings().removeClass("show");
        $(".btn_right a").removeClass("down");
    })
    $(".layerpop a.close, .layerpop  .pop_bg").click(function(){
        $(this).parents(".pop_wrap").hide().find(".show").removeClass("show");
        return false;
    })
    //랭킹 테이블 아이템 툴팁
    $(".rank_box table td.tb4 a").hover(function(){
        var cls = $(this).attr("class").split(" ")[1],
            iname = $(this).find("span").text(),
            ptop = $(this).position().top,
            pleft = $(this).position().left;
        if($(this).hasClass("it2")){
            $(".rank_box .bubble .item."+cls).css({"left":pleft+57+"px"});
        }
        $(".rank_box .bubble .item."+cls+" span").text(iname);
        $(".rank_box .bubble .item."+cls).css({"top":ptop+12+"px"}).addClass("show").siblings().removeClass("show");
    },function(){
        $(".rank_box .bubble .item").removeClass("show").find("span").text();
    }).bind("click",function(e){
        e.preventDefault();
    })
    //우측 버튼 효과
    $(".top .btn_right a").bind("mousedown", function(e){
        if(e.which == 1){
            $(this).addClass("down");
        }
    }).bind("mouseleave moueseup",function(){
        if($(this).hasClass("down")){
            $(this).removeClass("down"); 
        }
    })
    //Top 버튼
    $(".btn_top").click(function(e){
        e.preventDefault();
        $("html,body").stop().animate({scrollTop:0},500);
    })
    $(window).scroll(function(){
        sct = $(window).scrollTop();
        if(sct>=$(".wrap .content").offset().top-500){
            $(".btn_top").addClass("active");
        } else {
            $(".btn_top").removeClass("active");
        }
    })
    //Quick 메뉴
    $(".quick .btn_view").click(function(e){
        e.preventDefault();
        $(".quick").toggleClass("open");
    })
    //조명 효과 - 기본
    function cdEffect(){
        if($(".pannel .lights").hasClass("even")){
            $(".pannel .lights").removeClass("even").addClass("odd");
        } else{
            $(".pannel .lights").removeClass("odd").addClass("even");
        }
    }
    l_default = setInterval(cdEffect,500);
    //조명 효과 - 클릭
    function idIntv(){
        if(dir && lnm < 133){
            $(".top .lights span:eq("+lnm+")").addClass("off");
            lnm++;
            if(lnm==133){
                dir = false;
                lnm = 0 ;
            }
        } else if(!dir && $(".top .lights span.off").length > 0){
            $(".top .lights span:eq("+lnm+")").removeClass("off");
            lnm++;
        } else{
            dir = "END";
            clearInterval(l_effect);
        }
    }
})

//IE 확인
function isIE(){
  var myNav = navigator.userAgent.toLowerCase();
  return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
}