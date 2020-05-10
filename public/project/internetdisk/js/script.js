$(function(){
    
    // header gnb 메뉴 열기/닫기
    $(".header .btn_list").click(function(e){
        e.preventDefault();
        $(".btn_header .bg, .btn_header .gnb .close, .wrap").addClass("on");
        $(".btn_header .gnb").stop().animate({left:0},300);
    })
    $(".header .gnb .close").click(function(e){
        e.preventDefault();
        gnbHide();
    })
    touchGnb();
    
    // 로그인 , 비밀번호 찾기 input text, password 
    $(".field .ipt_wrap input").on("keyup input", function(){
         if(!$(this).val() ==""){
            $(this).prev("label").hide();
        } else{
            $(this).prev("label").show();
        }
    })
    
    // 로그인 id 저장 input
    $(".field_box .f_option input[type=checkbox]").click(function(){
        var chk = $(this).prop("checked");
        if(chk){
            $(this).next("label").addClass("checked");
        } else{
            $(this).next("label").removeClass("checked");
        }
    })
    
    // 미 결재 내역 textarea
    $(".txt_wrap textarea").on("keyup input",function(){
        if(!$(this).val() ==""){
            $(this).prev("label").hide();
            $(this).height(0);
            $(this).height(this.scrollHeight);
        } else{
            $(this).prev("label").show();
        }
    }).find("textarea").keyup();
    
    //로그인 필드 높이
    $(".wrap.field").css("height",winHeight);
    $(window).load(function(){
        setTimeout(function(){
            winHeight = $(window).height();
            $(".wrap.field").css("height",winHeight);
        },100)
    })
    $(window).resize(function(){
        var changeWidth = $(window).width();
        if(winWidth != changeWidth){
            winWidth = $(window).width();
            winHeight = $(window).height();
            $(".wrap.field").css("height",winHeight);
        }
    })
})
var winHeight = $(window).height();
var winWidth = $(window).width();
// header gnb 메뉴 닫기
function touchGnb(){
    var orginalLeft, originalTop, sctStart;
    $(".wrap").on("touchstart", function(e){
        var event = e.originalEvent;
        if($(".btn_header .bg").hasClass("on")){
            orginalLeft = event.touches[0].clientX;
            originalTop = event.touches[0].clientY;
        }
    }).on("touchend", function(e){
        var event = e.originalEvent;
        if($(".btn_header .bg").hasClass("on")){
            var moveX = orginalLeft - event.changedTouches[0].clientX;
            var moveY = originalTop - event.changedTouches[0].clientY;
            if(Math.abs(moveX) > Math.abs(moveY) && moveX > (winWidth/10)){
                gnbHide();
            }
        }
    })
}

function gnbHide(){
    $(".btn_header .gnb").stop().animate({left:-264},300, function(){
        $(".wrap, .btn_header .bg, .btn_header .gnb .close").removeClass("on");
    });   
}