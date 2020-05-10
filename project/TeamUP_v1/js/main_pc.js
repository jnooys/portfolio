function sendLoginInfo() {
    var form = $('#LoginForm');
    
    if($("#login_id").val() == ""){
        $("#popEmail_1").show();
        $("span.bg_pop").show();
        return;
    }
    if($("#login_pw").val() == ""){
        $("#popEmail_5").show();
        $("span.bg_pop").show();
        return;
    }
    var successFunc = function(re) {
        if(re.result){
            $(location).attr('href',$('#MoveLink').text());
        }else{
            $("#popEmail_6").show().children("p").html(re.msg);
            $("span.bg_pop").show();
        }
    }
    
    $('#LoginForm').send($('#LoginLink').text(),successFunc);
};
$(function() {
    $(".d_btn_logout").on('click', function() {
        isUtil.movePage('/main/index.php/main/Logout');
    });
    $(".n_pop .btn_close, .n_pop .btn_confirm").click(function(e){
        $(this).parents(".n_pop").hide();
        $("span.bg_pop").hide();
    });
    var isProccessing = false;
    $(".btn_email").click(function(e){
        var email = $(this).parent().children("input").eq(0).val();
        
        if(email == ""){
            $("#popEmail_1").show();
            $("span.bg_pop").show();
            e.preventDefault();
            return;
        }
        if(!((/^([a-zA-Z0-9\+_\-]+)(\.[a-zA-Z0-9\+_\-]+)*@([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,6}$/).test(email))){
            $("#popEmail_2").show();
            $("span.bg_pop").show();
            e.preventDefault();
            return;
        }
        var potal = ["hanmail.net","naver.com","hotmail.com","yahoo.co.kr","yahoo.com","hanmir.com","paran.com","lycos.co.kr","nate.com",
                     "dreamwiz.com","korea.com","empas.com","empal.com","netian.com","freechal.com","msn.com","gmail.com","chol.com","hanafos.com","sayclub.com",
                     "me.com","icloud.com","daum.net","hanmail.com","outlook.com","outlook.kr","bizhard.com","live.co.kr","live.com","hitel.net","yopmail.com",
                     "OUTLOOK.COM.AR","OUTLOOK.COM.AU","OUTLOOK.AT","OUTLOOK.BE","OUTLOOK.COM.BR"
                     ,"LIVE.CA","OUTLOOK.CL","LIVE.CN","OUTLOOK.DK","HOTMAIL.FI","OUTLOOK.FR","OUTLOOK.DE","LIVE.HK","OUTLOOK.HU","OUTLOOK.IN"
                     ,"OUTLOOK.IE","OUTLOOK.CO.IL","OUTLOOK.IT","OUTLOOK.JP","HOTMAIL.KR","HOTMAIL.MY","LIVE.COM.MX","LIVE.NL","LIVE.NO","OUTLOOK.PH"
                     ,"OUTLOOK.PT","OUTLOOK.RU","OUTLOOK.SA","OUTLOOK.SG","LIVE.CO.ZA","OUTLOOK.ES","LIVEMAIL.TW","OUTLOOK.CO.TH","OUTLOOK.COM.TR","LIVE.CO.UK"
                     ];
        var isPotal = false;
        
        $.each(potal,function(index, item){
            if(item.toLowerCase() == email.split("@")[1].toLowerCase())
                isPotal = true;
        });
        if(isPotal){
            $("#popEmail_3").show();
            $("span.bg_pop").show();
            e.preventDefault();
            return;
        }
        if(!isProccessing){
            isProccessing = true;
            $.ajax({
                "url" : $('#TeamUPStartLink').text(),
                "type" : "post",
                "data" : {"Email":email},
                "dataType" : "json",
                success: function(data){
                    isProccessing = false;
                    if(data.result){
                        isUtil.movePage($('#ApplicationMainLink').text(),{"Email":email},true);
                    }else{
                        $("#popEmail_4").show();
                        $("span.bg_pop").show();
                        e.preventDefault();
                    }
                }
            });
        }
    });
    $("#btn_demo").click(function(e){
        var email = $("#inputDemo").val();
        
        if(email == ""){
            $("#popEmail_1").show();
            $("span.bg_pop").show();
            e.preventDefault();
            return;
        }
        if(!((/^([a-zA-Z0-9\+_\-]+)(\.[a-zA-Z0-9\+_\-]+)*@([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,6}$/).test(email))){
            $("#popEmail_2").show();
            $("span.bg_pop").show();
            e.preventDefault();
            return;
        }
        /*
        var potal = ["hanmail.net","naver.com","hotmail.com","yahoo.co.kr","yahoo.com","hanmir.com","paran.com","lycos.co.kr","nate.com",
                     "dreamwiz.com","korea.com","empas.com","empal.com","netian.com","freechal.com","msn.com","gmail.com","chol.com","hanafos.com","sayclub.com",
                     "me.com","icloud.com","daum.net","hanmail.com","outlook.com","outlook.kr","bizhard.com","live.co.kr","live.com","hitel.net","yopmail.com",
                     "OUTLOOK.COM.AR","OUTLOOK.COM.AU","OUTLOOK.AT","OUTLOOK.BE","OUTLOOK.COM.BR"
                     ,"LIVE.CA","OUTLOOK.CL","LIVE.CN","OUTLOOK.DK","HOTMAIL.FI","OUTLOOK.FR","OUTLOOK.DE","LIVE.HK","OUTLOOK.HU","OUTLOOK.IN"
                     ,"OUTLOOK.IE","OUTLOOK.CO.IL","OUTLOOK.IT","OUTLOOK.JP","HOTMAIL.KR","HOTMAIL.MY","LIVE.COM.MX","LIVE.NL","LIVE.NO","OUTLOOK.PH"
                     ,"OUTLOOK.PT","OUTLOOK.RU","OUTLOOK.SA","OUTLOOK.SG","LIVE.CO.ZA","OUTLOOK.ES","LIVEMAIL.TW","OUTLOOK.CO.TH","OUTLOOK.COM.TR","LIVE.CO.UK"
                     ];
        var isPotal = false;
        
        $.each(potal,function(index, item){
            if(item.toLowerCase() == email.split("@")[1].toLowerCase())
                isPotal = true;
        });
        if(isPotal){
            $("#popEmail_3").show();
            $("span.bg_pop").show();
            e.preventDefault();
            return;
        }
        */
        if(!isProccessing){
            isProccessing = true;
            $.ajax({
                "url" : $('#TeamUPDemoLink').text(),
                "type" : "post",
                "data" : {"Email":email},
                "dataType" : "json",
                success: function(data){
                    isProccessing = false;
                    if(data.result){
                        isUtil.movePage($('#TeamUPDemoMainLink').text());
                    }else{
                        $("#popEmail_4").show();
                        $("span.bg_pop").show();
                        e.preventDefault();
                    }
                }
            });
        }
    });

    $("#inputJoin, #inputStart, #inputDemo").keypress(function(e){
        if(e.keyCode == 13){
            if($("#popEmail_1").css("display") == "block" || $("#popEmail_2").css("display") == "block" || $("#popEmail_3").css("display") == "block" || $("#popEmail_4").css("display") == "block"){
                $(".n_pop").hide();
                $("span.bg_pop").hide();
            }else{
                if($(this).attr("id") == "inputJoin")
                    $("#btn_email_top").click();
                else if($(this).attr("id") == "inputDemo"){
                    $("#btn_demo").click();
                }
                else{
                    $("#btn_email_bottom").click();
                }
                e.preventDefault();
            }
            e.preventDefault();
        }
    });

    $("#login_pw").keypress(function(e){
        if(e.keyCode == 13){
            if($("#popEmail_1").css("display") == "block" || $("#popEmail_5").css("display") == "block" || $("#popEmail_6").css("display") == "block"){
                $(".n_pop").hide();
                $("span.bg_pop").hide();
                e.preventDefault();
            }else{
                $('#LoginForm').submit();
                e.preventDefault();
            }

        }
    });
    
    $(".btn_tw").click(function(e){
        var ShareUrl = "https://twitter.com/intent/tweet?";
        var text = "text="+encodeURIComponent($("#TwitterShareDescription").text());
        var url = "&url="+encodeURIComponent("https://www.team-up.co.kr/main/index.php");
        window.open(ShareUrl+text+url,'TW','scrollbars=yes,toolbar=no,menubar=no,resizable=yes,width=700,height=445,left=0,top=0');
    });
    
    $(".btn_fb").click(function(e){
        var ShareUrl = "http://www.facebook.com/sharer/sharer.php?";
        var url = "u="+encodeURIComponent("https://www.team-up.co.kr/main/index.php");
        window.open(ShareUrl+url,'FaceBook','scrollbars=yes,toolbar=no,menubar=no,resizable=yes,width=600,height=300,left=0,top=0');
    });
});

//하위버전 indexOf 사용하기
if(!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(obj, start) {
         for (var i = (start || 0), j = this.length; i < j; i++) {
             if (this[i] === obj) { return i; }
         }
         return -1;
    }
}
//스크롤 효과 : 클래스 이름 구분해서 효과 넣기
var pInit = {
    about : {speed:300,delay:300,from:{top:-100,opacity:0},to:{top:0,opacity:1}},
    apro :
    [
        {speed:300,from:[{opacity:0,top:105},{opacity:0}],to:{opacity:1,top:65}},
        {speed:400,delay1:300,delay2:2000,from:[{top:0,left:0,opacity:1},{top:0,left:240,opacity:1},{top:240,left:0,opacity:1},{top:240,left:240,opacity:1}],to:{top:120,left:120,opacity:0}},
        {from: {opacity:0},to:{opacity:1}},
        {speed:180,delay:450,from:{marginTop:20,opacity:0},to:{marginTop:0,opacity:1}},
        {from:{opacity:0.2},to:{opacity:1}}
    ],
    ainfo1 : [
        {speed:300,delay1:300,delay2:2200,from:[{opacity:0,top:78},{opacity:0}],to:[{opacity:1,top:38},{opacity:1}]}
    ],
    ainfo2 : [
        {speed:300,delay1:300,delay2:2200,from:[{opacity:0,top:68},{opacity:0}],to:{opacity:1,top:38}},
        {from:{left:215},to:[{left:0},{left:-215}]}
    ],
    ainfo3 : [
        {speed:300,delay:300,from:[{top:-100,opacity:0},{bottom:-100,opacity:0}],to:[{top:0,opacity:1},{bottom:0,opacity:1}]},
        {speed:200,from:{opacity:0},to:{opacity:1}}
             
    ],
    func : {speed:250,delay:300,from:{top:152,opacity:0},to:{top:92,opacity:1}},
    prem : {speed:300,delay:300,from:{bottom:-116},to:{bottom:0}}
        
}

var pageLength,hash,jBGRoll,prevClass,nextClass,ap2Roll,ai1Roll,ai2Roll;
var pageNum = 0;
var pageHash = ["join","about","function","demo","premium"];
var tar = false;
var slide = false;
var contentNum = 0;
var pSpeed = 700;
var eEffect = "easeOutCubic";
var delt = 0;
var winHeight = $(window).height();

$(function(){
    //페이지 로딩
    pageLoad();
    // header 로그인 영역 오픈
    $(document).on("click", ".header .gnb a.btn_login", function(e){
        e.preventDefault();
        $(".header .gnb, .header .social").hide();
        $(".header .login_box").show();
    })
    //로그인 박스 닫기
    $(document).on("click", ".login_box .btn_close",function(e){
        e.preventDefault();
        $(this).parents(".login_box").hide();
        $(".header .gnb, .header .social").show();
    })
    //teamUP이란 상세 페이지 클릭
    $(document).on("click", ".about .detail_box.on .pager li a", function(event){
        event.preventDefault();
        if(!slide){
            var thisIdx = $(".about .detail_box.on .pager li.on").index();
            var clickIdx = $(this).parent().index();
            if(thisIdx!=clickIdx){
                var direct = thisIdx-clickIdx;
                prevClass = $(".page_wrap.view .mcont.on .mcont.on").attr("class").split(" ")[1];
                detailMove(direct);
            }
        }
    })
    //gnb 클릭
    $(".header .gnb li a").on("click",function(event){
        event.preventDefault();
        if(!slide){
            var thisIdx = $(".header .gnb li.on").index();
            var clickIdx = $(this).parent().index();
            if(thisIdx != clickIdx){
                tar = false;
                pageNum = clickIdx;
                location.hash = "#" + pageHash[pageNum];
            } else{
                if($(".page_wrap.view .move > .mcont.on .mcont").length<1){
                    prevClass = $(".page_wrap.view .mcont.on").attr("class").split(" ")[1];
                } else{
                    prevClass = $(".page_wrap.view .mcont.on .mcont.on").attr("class").split(" ")[1];
                }
                revMotion();
                contMove(1, 0);
                forMotion();
            }
        }
    })
    //페이지 이동
    $(window).hashchange(function(){
        var prevPage = pageHash.indexOf(hash);
        var newhash = location.hash.split("#")[1];
        var nextPage = pageHash.indexOf(newhash);
        if(nextPage == -1){
            nextPage = 0 ;
        }
        var direction = prevPage > nextPage ? 1 : -1;
        pageMove(nextPage,direction);
        hash = newhash;

    })
    //페이지 사이즈
    $(window).resize(function(){
        winHeight = $(window).height();
        $(".header.hbtm").stop().css("top",winHeight-95);
    })  
    //이메일 주소 클릭시 텍스트 출현
	$(document).on("focus keyup", ".join_wrap .input_txt", function(){
        if(this.value != ""){
            $(this).parents(".join_wrap").find(".e_txt").show();
        } else{
            $(this).parents(".join_wrap").find(".e_txt").hide();
        }
	}).on("click", function(e){
        var $target = $(e.target);
        if(!$target.parents().hasClass("join_wrap")){
            $(".join_wrap .e_txt").hide();
        }
    });
})
//페이지 로딩
function pageLoad(){
    hash = location.hash.split("#")[1];
    pageLength =  $(".page_wrap").length;
    if(pageHash.indexOf(hash) == -1){
        pageNum = 0;
        
    } else{
        pageNum = pageHash.indexOf(hash);
    }
    $(".page_wrap").removeClass("view").eq(pageNum).addClass("view");
    $(".page_wrap.view .move > .mcont:first").addClass("on");
    $("#content").show().find("> .move").stop().css({top:-100*pageNum+"%"});
    $(".gnb li").removeClass("on").eq(pageNum).addClass("on");
    nextClass = $(".page_wrap.view .mcont.on").attr("class").split(" ")[1];
    forMotion(10);
    if(pageNum>0){
        clearInterval(jBGRoll);
        //downSub();
        $(".btn_download").addClass("sub");
        $(".header").addClass("htop");
    } else{
        jBGRoll = setInterval(jBG,3000);
        downMain(100);
        $(".header").addClass("hbtm").css({top:winHeight-95});
    }
}
//휠 액션
function wheel(event){
    if(!slide){
        var delta = 0;
        if(!event){
            event = window.event;
        }
        if(event.wheelDelta){
            delta = event.wheelDelta/120;
        } else if(event.detail){
            delta = -event.detail/3;
        }
        wheelAction(delta);
    }
}
function wheelAction(dir){
    if(!slide){
        var contLength = $(".page_wrap.view .mcont").length;
        var pageOn = $(".page_wrap.view").index(".page_wrap");
        if(dir==-1){
            slide = true;
            //휠 아래로 
            if(contLength>1&&!$(".page_wrap.view .move .mcont:last").hasClass("on")){
                //페이지 내에서 움직일 때
                if($(".page_wrap.view .move > .mcont.on .mcont.on").length<1){
                    prevClass = $(".page_wrap.view .mcont.on").attr("class").split(" ")[1];
                    contMove(dir);
                } else if($(".page_wrap.view .move > .mcont.on .mcont:last").hasClass("on")){
                    prevClass = $(".page_wrap.view .mcont.on .mcont.on").attr("class").split(" ")[1];
                    contMove(dir);
                } else{
                    prevClass = $(".page_wrap.view .mcont.on .mcont.on").attr("class").split(" ")[1];
                    detailMove(dir);
                }
            } else{
                //새로운 페이지 가져올 때
                if(pageOn!=pageLength-1){
                    location.hash = "#" + pageHash[pageNum-dir];
                    tar = true;
                } else {
                    slide = false;
                }
            }
        } else if(dir==1){
            slide = true;
            //휠 위로
            if(contLength>1&&!$(".page_wrap.view .mcont:first").hasClass("on")){
                //페이지 내에서 움직일 때
                if($(".page_wrap.view .move > .mcont.on .mcont.on").length<1){
                    prevClass = $(".page_wrap.view .mcont.on").attr("class").split(" ")[1];
                    contMove(dir);
                } else if($(".page_wrap.view .move > .mcont.on .mcont:first").hasClass("on")) {
                    prevClass = $(".page_wrap.view .mcont.on .mcont.on").attr("class").split(" ")[1];
                    contMove(dir);
                } else{
                    prevClass = $(".page_wrap.view .mcont.on .mcont.on").attr("class").split(" ")[1];
                    detailMove(dir);
                }
            } else {
                //새로운 페이지 가져올 때
                if(pageNum!= 0){
                    location.hash = "#" + pageHash[pageNum-dir];
                    tar = true;
                } else {
                    slide = false;
                }
            }
        } else{
            return false;
        }
    }
}
//내부 컨텐츠 이동
function contMove(dir, gc){
    slide = true;
    var moveOn = $(".page_wrap.view .move> .mcont.on").index(".page_wrap.view .move > .mcont");
    if(arguments.length<2){
        var mdir = moveOn - dir;
    } else{
        var mdir = gc;
    }
    function cm(){
        $(".page_wrap.view .move > .mcont").removeClass("on").eq(mdir).addClass("on");
        $(".page_wrap.view .mcont .mcont.on").removeClass("on");
        if($(".page_wrap.view .move > .mcont.on .mcont").length>0){
            $(".page_wrap.view .move > .mcont.on .mcont").hide();
            $(".page_wrap.view .move > .mcont.on .pager li").removeClass("on");
            if(dir== -1){
                $(".page_wrap.view .move > .mcont.on .mcont:first").addClass("on").show();
                $(".page_wrap.view .move > .mcont.on .pager li:first").addClass("on");
            } else{
                $(".page_wrap.view .move > .mcont.on .mcont:last").addClass("on").show();
                $(".page_wrap.view .move > .mcont.on .pager li:last").addClass("on");
            }
            nextClass = $(".page_wrap.view .mcont .mcont.on").attr("class").split(" ")[1];
        } else{
            nextClass = $(".page_wrap.view .mcont.on").attr("class").split(" ")[1];
        }
        $(".page_wrap.view .move").queue("fx",[]).stop().delay(delt).animate({top:-100*(mdir)+"%"},pSpeed,eEffect,function(){
            slide = false;
        });
    }
    if(prevClass == "pdcom"){
        $(".pdcom.on .title_img").queue('fx',[]).stop();
        $(".pdcom.on .title_img li").queue('fx',[]).stop().animate(pInit.apro[1].to,pInit.apro[1].speed);
        $(".pdcom.on .combine").queue('fx',[]).stop().animate(pInit.apro[2].to,pInit.apro[1].speed);
        setTimeout(function(){
            revMotion();
            cm();
            forMotion();
        },pInit.apro[1].speed+50);
    } else{
        revMotion();
        cm();
        forMotion();
    }
}    

//teamUP이란 페이지 내부 이동
function detailMove(dir){
    slide = true;
    var moveOn = $(".page_wrap.view .mcont.on .mcont.on").index(".page_wrap.view .mcont.on .mcont");
    var mdir = moveOn - dir;
    function dm(){
        $(".page_wrap.view .mcont.on .pager li").removeClass("on").eq(mdir).addClass("on");
        $(".page_wrap.view .mcont.on .mcont.on").queue("fx",[]).stop().removeClass("on").delay(delt).animate(pInit.apro[4].from,pSpeed,function(){
            $(this).hide();
        });
        $(".page_wrap.view .mcont.on .mcont:eq("+mdir+")").queue("fx",[]).stop().addClass("on").delay(delt).show().css(pInit.apro[4].from).animate(pInit.apro[4].to,pSpeed,function(){
            $(this).show();
            slide = false;
        });
        nextClass = $(".page_wrap.view .mcont.on .mcont.on").attr("class").split(" ")[1];
    }
    if(prevClass == "pdcom"){
        $(".pdcom.on .title_img").queue('fx',[]).stop();
        $(".pdcom.on .title_img li").queue('fx',[]).stop().animate(pInit.apro[1].to,pInit.apro[1].speed);
        $(".pdcom.on .combine").queue('fx',[]).stop().animate(pInit.apro[2].to,pInit.apro[1].speed);
        setTimeout(function(){
            revMotion();
            dm();
            forMotion();
        },pInit.apro[1].speed+50);
    } else{
        revMotion();
        dm();
        forMotion();
    }
    
}
//페이지 이동
function pageMove(pgn,dir){
    slide = true;
    pageNum = pgn;
    if($(".page_wrap.view .mcont.on .mcont.on").length<1){
        prevClass = $(".page_wrap.view .mcont.on").attr("class").split(" ")[1];
    } else{
        prevClass = $(".page_wrap.view .mcont.on .mcont.on").attr("class").split(" ")[1];    
    }
    function pm(){
        $(".gnb li").removeClass("on").eq(pgn).addClass("on");
        $(".page_wrap").removeClass("view").eq(pgn).addClass("view");
        $(".page_wrap.view .mcont.on").removeClass("on");    
         if(dir==1&&tar) {
            $(".page_wrap.view .move > .mcont:last").addClass("on");
            var cLeng = $(".page_wrap.view .move > .mcont").length-1;
            $(".page_wrap.view .move").css({top:-100*cLeng+"%"}); 
            if($(".page_wrap.view .move > .mcont.on .mcont").length>0){
                $(".page_wrap.view .move > .mcont.on .mcont:last").addClass("on").show();
                $(".page_wrap.view .move > .mcont.on .pager li").removeClass("on").eq(cLeng).addClass("on");
                nextClass = $(".page_wrap.view .mcont.on .mcont.on").attr("class").split(" ")[1];
            } else{
                nextClass = $(".page_wrap.view .mcont.on").attr("class").split(" ")[1];
            }
        } else {
            $(".page_wrap.view .move > .mcont:first").addClass("on");
            $(".page_wrap.view .move").css({top:0});
            if($(".page_wrap.view .move > .mcont.on .mcont").length>0){
                $(".page_wrap.view .move > .mcont.on .mcont:first").addClass("on").show();
                $(".page_wrap.view .move > .mcont .pager li").removeClass("on").eq(0).addClass("on");
                nextClass = $(".page_wrap.view .mcont.on .mcont.on").attr("class").split(" ")[1];
            } else{
                nextClass = $(".page_wrap.view .mcont.on").attr("class").split(" ")[1];
            }
        }
        $("#content > .move").queue("fx",[]).stop().delay(delt).animate({top:-100*pgn+"%"},pSpeed,eEffect,function(){
            slide = false;
            tar = false;
        });
        if(pageNum>0){
            clearInterval(jBGRoll);
            $(".btn_download.main").queue("fx",[]).stop().delay(delt).animate({bottom:-74},400,eEffect,function(){
                $(this).stop().css("bottom","auto").removeClass("main").addClass("sub");
                downSub();
                $(".bg_join > span").queue("fx",[]).stop().hide().removeClass("show").eq(0).addClass("show").css({"display":"block","opacity":1});
            });
            $(".header.hbtm").queue("fx",[]).stop().removeClass("hbtm").addClass("htop").delay(delt).animate({top:0},pSpeed+100,eEffect);
        } else{
            jBGRoll = setInterval(jBG,3000);
            $(".btn_download.sub").queue("fx",[]).stop().animate({right:-78},400,eEffect,function(){
                $(this).stop().css("right","auto").removeClass("sub").addClass("main");
                downMain(0);
            })
            $(".header.htop").queue("fx",[]).stop().removeClass("htop").addClass("hbtm").delay(delt).animate({top:winHeight-95},pSpeed+100,eEffect);
        }
    }
    if(prevClass == "pdcom"){
        $(".pdcom.on .title_img").queue('fx',[]).stop();
        $(".pdcom.on .title_img li").queue('fx',[]).stop().animate(pInit.apro[1].to,pInit.apro[1].speed);
        $(".pdcom.on .combine").queue('fx',[]).stop().animate(pInit.apro[2].to,pInit.apro[1].speed);
        setTimeout(function(){
            revMotion();
            pm();
            forMotion();
        },pInit.apro[1].speed+50);
    } else{
        revMotion();
        pm();
        forMotion();
    }
}
//다운로드 버튼 변경
function downSub(){
    $(".btn_download").queue("fx",[]).stop().removeClass("main").addClass("sub").css("right",-88).animate({right:10},400,eEffect);
}
function downMain(tim){
    $(".btn_download").queue("fx",[]).stop().delay(tim).removeClass("sub").addClass("main").css("bottom",-74).animate({bottom:118},400,eEffect);
}
// 메인 배경
function jBG(){
    var tspeed = 450;
    var leng = $(".join .bg_join").children().length;
    var nowShow = $(".join .bg_join > span.show").index();
    var nextShow = nowShow < leng -1 ? nowShow +1 : 0 ;
    $(".join .bg_join > span:eq("+nowShow+")").stop().animate({opacity:0.2},tspeed,function(){
        $(this).removeClass("show").hide();
    });
    $(".join .bg_join > span:eq("+nextShow+")").stop().show().css({opacity:0.2}).animate({opacity:1},tspeed,function(){
        $(this).addClass("show");
    });
}
//appear
function forMotion(pgc){
    var dtime = arguments.length > 0 ? pgc : 400;
    if($(".detail_box").hasClass("on")){
        $(".detail_box.on .mcont.on .detail").queue('fx',[]).stop().css(pInit.apro[3].from).delay(dtime).animate(pInit.apro[3].to,pInit.apro[3].speed);
    }
    switch(nextClass){
        case "about_intro" : {
            $(".about_intro .ico_about").queue('fx',[]).stop().css(pInit.about.from).delay(dtime).animate(pInit.about.to,pInit.about.speed);
            break;
        }
        case "pdcom" : {
            $(".pdcom.on .title_img, .pdcom.on .title_img li, .pdcom.on .combine").queue('fx',[]).stop();
            $(".pdcom.on .title_img li").each(function(i){
                $(this).css(pInit.apro[1].from[i]);
            })
            $(".pdcom.on .title_img .combine").css(pInit.apro[2].from);
            $(".pdcom.on .title_img").css(pInit.apro[0].from[0]).delay(dtime).animate(pInit.apro[0].to,pInit.apro[0].speed,function(){
            
            });
            break;
        }
        case "acs_1" : {
            clearInterval(ai1Roll);
            $(".acs_1.on .wrap_screen, .acs_1.on .ac_view, .acs_1.on .ac_view ul").queue('fx',[]).stop();
            $(".acs_1.on .wrap_screen li.ac_view").hide().css(pInit.ainfo1[0].to[1]).removeClass("show").eq(0).addClass("show");
            $(".acs_1.on .wrap_screen li.ac_view ul").css("marginLeft",0);
            $(".acs_1.on .title_img .img_pager li").removeClass("on").eq(0).addClass("on");
            $(".acs_1.on .title_img").css(pInit.ainfo1[0].from[0]).delay(dtime).animate(pInit.ainfo1[0].to[0],pInit.ainfo1[0].speed,function(){
                ai1Roll = setInterval(function(){aiMotion(".acs_1")},pInit.ainfo1[0].delay2);
            });
            aiPaging(".acs_1");
            break;
        }
        case "acs_2" : {
            clearInterval(ai2Roll);
            $(".acs_2.on .wrap_screen, .acs_1.on .ac_view, .acs_1.on .ac_view ul").queue('fx',[]).stop();
            $(".acs_2.on .wrap_screen li.ac_view").hide().css(pInit.ainfo1[0].to[1]).removeClass("show").eq(0).addClass("show");
            $(".acs_2.on .wrap_screen li.ac_view ul").css("marginLeft",0);
            $(".acs_2.on .title_img .img_pager li").removeClass("on").eq(0).addClass("on");
            $(".acs_2.on .title_img").css(pInit.ainfo1[0].from[0]).delay(dtime).animate(pInit.ainfo1[0].to[0],pInit.ainfo1[0].speed,function(){
                ai2Roll = setInterval(function(){aiMotion(".acs_2")},pInit.ainfo1[0].delay2);
            });
            aiPaging(".acs_2");
            break;
        }
        case "acs_3" : {
            $(".acs_3.on .title_img .img_apps").queue('fx',[]).stop().css(pInit.ainfo3[0].from[0]).delay(dtime).animate(pInit.ainfo3[0].to[0],pInit.ainfo3[0].speed);
            $(".acs_3.on .title_img .img_tu").queue('fx',[]).stop().css(pInit.ainfo3[0].from[1]).delay(dtime).animate(pInit.ainfo3[0].to[1],pInit.ainfo3[0].speed,function(){
                $(".acs_3.on .title_img .img_plus").queue('fx',[]).stop().css(pInit.ainfo3[1].from).animate(pInit.ainfo3[1].to,pInit.ainfo3[1].speed);
            });
            break;
        }
        case "func_1":{
            $(".func_1 .btn_fc").queue('fx',[]).stop().css(pInit.func.from).delay(dtime).animate(pInit.func.to,pInit.func.speed);
            break;
        }
        case "prem_1" : {
            $(".premium .footer").queue('fx',[]).stop().css(pInit.prem.from).delay(dtime).animate(pInit.prem.to,pInit.prem.speed,eEffect);
            break;
        }
    }
}
//disappear
function revMotion(){
    if($(".detail_box").hasClass("on")){
        $(".detail_box.on .mcont.on .detail").stop().animate(pInit.apro[3].from,pInit.apro[3].speed,function(){
            $(".detail_box .mcont").css(pInit.apro[4].to);
        });
    }
    switch(prevClass){
        case "about_intro":{
            $(".about_intro .ico_about").queue('fx',[]).stop().animate(pInit.about.from,pInit.about.speed);
            break;
        }
        case "pdcom":{
             $(".pdcom.on .title_img").queue('fx',[]).stop().animate(pInit.apro[0].from[1],pInit.apro[0].speed,function(){
                $(this).css(pInit.apro[0].from[0]);
                $(this).find("li").each(function(i){
                    $(this).css(pInit.apro[1].from[i]);
                })
                $(this).find(".combine").queue('fx',[]).stop().css(pInit.apro[2].from);
            });
            break;
        }
        case "acs_1" : {
            clearInterval(ai1Roll);
            $(".acs_1.on .title_img, .acs_1.on div.ac_view, .acs_1.on .ac_view ul").queue('fx',[]).stop();
            $(".acs_1.on .title_img").animate(pInit.ainfo1[0].from[1],pInit.ainfo1[0].speed,function(){
                $(this).css(pInit.ainfo1[0].from[0]);
                $(this).find("li.ac_view").hide().css(pInit.ainfo1[0].to[1]).removeClass("show").eq(0).addClass("show");
                $(this).find("li.ac_view ul").css("marginLeft",0);
                $(this).find(".img_pager li").removeClass("on").eq(0).addClass("on");
            })
            break;
        }
        case "acs_2" : {
            clearInterval(ai2Roll);
            $(".acs_2.on .title_img, .acs_2.on div.ac_view, .acs_2.on .ac_view ul").queue('fx',[]).stop();
            $(".acs_2.on .title_img").animate(pInit.ainfo1[0].from[1],pInit.ainfo1[0].speed,function(){
                $(this).css(pInit.ainfo1[0].from[0]);
                $(this).find("li.ac_view").hide().css(pInit.ainfo1[0].to[1]).removeClass("show").eq(0).addClass("show");
                $(this).find("li.ac_view ul").css("marginLeft",0);
                $(this).find(".img_pager li").removeClass("on").eq(0).addClass("on");
            })
            break;
        }
        case "acs_3" : {
            $(".acs_3.on .title_img .img_apps").queue('fx',[]).stop().animate(pInit.ainfo3[0].from[0],pInit.ainfo3[0].speed);
            $(".acs_3.on .title_img .img_tu").queue('fx',[]).stop().animate(pInit.ainfo3[0].from[1],pInit.ainfo3[0].speed);
            $(".acs_3.on .title_img .img_plus").queue('fx',[]).stop().animate(pInit.ainfo3[1].from,pInit.ainfo3[1].speed);
            break;
        }
        case "func_1" : {
            $(".func_1 .btn_fc").queue('fx',[]).stop().animate(pInit.func.from,pInit.func.speed/2);
            break;
        }
        case "prem_1" : {
            $(".premium .footer").queue('fx',[]).stop().animate(pInit.prem.from,pInit.prem.speed,eEffect);
            break;
        }
    }
}
//정보 접근성 향상 2
function aiMotion(parent){
    var $par = $(parent);
    var phIdx = $par.find("li.ac_view.show").index();
    var phLeng = $par.find("li.ac_view").length - 1;
    var innerLeng = $par.find("li.ac_view.show li").length - 1;
    var mgl = parseInt($par.find("li.ac_view.show ul").css("marginLeft")) / -215;
    mgl = Math.abs(mgl);
    if(mgl!=innerLeng){
        mgl++;
        $par.find("li.ac_view.show ul").queue('fx',[]).stop().animate({marginLeft:-215*mgl},pInit.ainfo1[0].speed);
    } else {
        var nextShow = phIdx!= phLeng ? phIdx+1 :0;
        $par.find("li.ac_view.show").queue('fx',[]).stop().fadeOut(pInit.ainfo1[0].speed, function(){
            $(this).removeClass("show").find("ul").stop().css({marginLeft:0});
        });
        $par.find("li.ac_view:eq("+nextShow+")").queue('fx',[]).stop().fadeIn(pInit.ainfo1[0].speed, function(){
            $(this).addClass("show");
        });
        $par.find(".img_pager li").removeClass("on").eq(nextShow).addClass("on");
    }
}

//정보 접근성 향상 페이징
function aiPaging(parent){
    var $par = $(parent);
    $par.find(".img_pager li a").click(function(e){
        e.preventDefault();
        var onIdx = $par.find(".teamup_view .img_pager li.on").index();
        var clIdx = $(this).parent().index();
        if(onIdx != clIdx){
            clearInterval(ai1Roll);
            clearInterval(ai2Roll);
            $par.find(".teamup_view .img_pager li").removeClass("on");
            $(this).parent().addClass("on");
            $par.find("li.ac_view, li.ac_view ul").queue('fx',[]).stop();
            $par.find("li.ac_view.show").fadeOut(pInit.ainfo1[0].speed,function(){
                $par.find("li.ac_view ul").css({"marginLeft":0});
                $(this).removeClass("show");
                $par.find("li.ac_view").hide().css({"opacity":1});
            });
            $par.find("li.ac_view:eq("+clIdx+")").fadeIn(pInit.ainfo1[0].speed,function(){
                $(this).addClass("show");
            });
            if(parent == ".acs_1"){
                ai1Roll = setInterval(function(){aiMotion(".acs_1")},pInit.ainfo2[0].delay2);
            } else {
                ai2Roll = setInterval(function(){aiMotion(".acs_2")},pInit.ainfo2[0].delay2);
            }
        }
    })
}

//휠 이벤트 바인딩
if (window.addEventListener) {
    window.addEventListener('DOMMouseScroll', wheel, false);
}
window.onmousewheel = document.onmousewheel = wheel;