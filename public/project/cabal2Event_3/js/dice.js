/* 변수
    nowIdx = 유저 위치 번호 (1~23 중)
    dice = 주사위 번호
*/

$(function(){
    //페이지 로드 시 유저 정보 입력하기 
    (function(){
        // 유저의 현재 위치 번호 (1~23 중)
        nowIdx = prevIdx = 0;  
        // 유저의 현재 위치 값
        if(nowIdx > 0){
            mkPos.top  = $(".board > div:eq("+nowIdx+")").position().top, 
            mkPos.left = $(".board > div:eq("+nowIdx+")").position().left;
            $(".board > div:eq("+nowIdx+")").addClass("on").siblings().removeClass("on");
            $(".board_wrap .mark").css(mkPos);
            if(nowIdx < 13){
                moveDirect = "right";
                startAngle = 90;
            } else if(nowIdx < 19){
                moveDirect = "bottom";
                startAngle = 0;
                $(".board_wrap .mark").addClass("reverse");
            } else {
                moveDirect = "left";
                startAngle = -90;
                $(".board_wrap .mark").addClass("reverse");
            }
        }
    })();
    // 주사위 굴리기 버튼
    $(".btn_roll > a").bind("mousedown",function(e){
        if(e.which == 1){
            $(this).parent().find(".b_sd span").addClass("down");
        }
        
    }).bind("mouseup mouseleave",function(){
        if($(this).parent().find(".b_sd span").hasClass("down")){
            $(".down").removeClass("down");
        }
    }).click(function(e){
        e.preventDefault();
        if(!$(".board_wrap").hasClass("rolling")){
            //주사위 값 넣기
            var diceNum = 3;
            //칸 번호 값 넣기 
            nowIdx = nowIdx+diceNum > 23 ? nowIdx+diceNum-24: nowIdx+diceNum;
            mkPos.top  = $(".board > div:eq("+nowIdx+")").position().top, 
            mkPos.left = $(".board > div:eq("+nowIdx+")").position().left;
            //스크롤 이동
            if($(window).scrollTop() > $(".dice").offset().top){
                $(window).scrollTop($(".dice").offset().top - 100);
            }
            //주사위 움직이는 모션
            diceMove(diceNum);
        }
    })
})

var startAngle = 180,
    moveInt = 0,
    prevIdx = 0,
    nowIdx = 0,
    moveDirect = "top",
    mkPos = {top:0,left:0};

function diceMove(n){
    $(".board_wrap").addClass("rolling");
    var dn = n, rollN = 0, rollDirect = 0, scaleCount = 0.08, rollScale, sct = $(window).scrollTop(), winHeight = $(window).height(), nowSct = $(".board > div:eq("+nowIdx+")").offset().top;
    var diceRoll = setInterval(function(){
        if(rollDirect == 0){
            rollN++;
            rollScale = (1+scaleCount*rollN).toFixed(2);
            $(".content .dice span").removeClass().addClass("dm"+rollN).css({"transform":"scale("+rollScale+")"});
            if(rollN == 9){
                rollDirect = 1;
            }
        } else {
            if(rollN>1){
                rollN--;
                rollScale = (rollScale-scaleCount).toFixed(2);
                rollScale = rollScale > 1 ? rollScale : 1;
                $(".content .dice span").removeClass().addClass("dm"+rollN).css({"transform":"scale("+rollScale+")"});
            } else{
                clearInterval(diceRoll);
                $(".content .dice span").removeClass().addClass("dice"+dn).css({"transform":""});
                setTimeout(function(){
                    //스크롤 이동
                    if(nowSct + $(".board > div:eq("+nowIdx+")").height() > sct+winHeight){
                        sct = sct + (nowSct + $(".board > div:eq("+nowIdx+")").height() + 180 - (sct+winHeight));
                        $(window).scrollTop(sct);
                    } else if(nowSct-75 < sct){
                        sct = sct - (sct - nowSct) - 180;
                        $(window).scrollTop(sct);
                    }

                    $(".board > div").removeClass("on").eq(nowIdx).addClass("on").find("span").stop().delay(50).fadeOut(50).delay(50).fadeIn(80,function(){
                        $(this).css({"display":""});
                        markAni();
                    });    
                },500)
            }
        }
    },50)
}
// 말 움직이기
function markAni(){
    var unit,
        mpCss = {left:0,top:0},
        rad = startAngle * (Math.PI / 180);
    // 좌상 -> 우상
    if(prevIdx<6){
        //180 to 0
        unit = 84.5;
        if(moveDirect != "top"){
            clearTimeout(moveInt);
            moveDirect = "top"; 
            startAngle = 180;
            rad = startAngle * (Math.PI / 180);
            $(".mark").removeClass("reverse");
        }
        if (startAngle > 0) {
            mpCss.left = Math.round(Math.cos(rad) * unit)+unit+1+168*prevIdx + "px",
            mpCss.top = Math.round((unit * (1 - Math.sin(rad))-unit)*0.5) + "px";
            $(".mark").css(mpCss);
            startAngle = startAngle-10;
            moveInt = setTimeout(markAni,15);  
        } else {
            //옆 칸으로 이동
            if(prevIdx<nowIdx-1){
                prevIdx++;
                startAngle = 180;
                moveIntv = setTimeout(markAni,15);
            } else{
                $(".mark").css({top:0});
                $(".board_wrap").removeClass("rolling");
                clearTimeout(moveInt);
            }
        }
    // 우상 -> 우하
    } else if(prevIdx<12){
        //90 to -90
        unit = 93;
        if(moveDirect == "top"){
            clearTimeout(moveInt);
            moveDirect = "right"; 
            startAngle = 90;
            rad = startAngle * (Math.PI / 180);
        }
        if(startAngle > -90) {
            mpCss.left = Math.round(Math.cos(rad) * unit*0.5)+1008 + "px",
            mpCss.top = Math.round(unit * (1 - Math.sin(rad)))+1+186*(prevIdx-6) + "px";
            $(".mark").css(mpCss);
            startAngle = startAngle - 10;
            moveIntv = setTimeout(markAni,15);
        } else {
            //옆 칸으로 이동
            if(prevIdx<nowIdx-1){
                prevIdx++;
                startAngle = 90;
                moveIntv = setTimeout(markAni,15);
            } else{
                $(".mark").css({left:1008});
                $(".board_wrap").removeClass("rolling");
                clearTimeout(moveInt);
            }
        }
    // 우하 -> 좌하
    } else if(prevIdx< 18){
        // 0 to 180
        unit = 84.5;
        if(moveDirect == "right"){
            clearTimeout(moveInt);
            moveDirect = "bottom";
            startAngle = 0;
            rad = startAngle * (Math.PI / 180);
            $(".mark").addClass("reverse");
        }
        if (startAngle < 180) {
            mpCss.left = 1007+(Math.round(Math.cos(rad) * unit)-unit)+168*(12-prevIdx) + "px",
            mpCss.top = 1116+Math.round((unit * (1 - Math.sin(rad))-unit)*0.5) + "px";
            $(".mark").css(mpCss);
            startAngle = startAngle + 10;
            moveIntv = setTimeout(markAni,15);  
        } else {
            //옆 칸으로 이동
            if(prevIdx<nowIdx-1){
                prevIdx++;
                startAngle = 0;
                moveIntv = setTimeout(markAni,15);
            } else{
                clearTimeout(moveInt);
                $(".mark").css({top:1116});
                $(".board_wrap").removeClass("rolling");
            }
        }    
    // 좌하 -> 좌상
    } else {
        // -90 to 90
        unit = 93;
        if(moveDirect == "bottom"){
            clearTimeout(moveInt);
            moveDirect = "left";
            startAngle = -90;
            rad = startAngle * (Math.PI / 180);
        }
        if(startAngle < 90) {
            mpCss.left = Math.round((Math.cos(rad) * unit)*0.5) + "px",
            mpCss.top = 1116-(Math.round(unit * (1 + Math.sin(rad)))+1-186*(18-prevIdx)) + "px";
            $(".mark").css(mpCss);
            startAngle = startAngle + 10;
            moveIntv = setTimeout(markAni,15);
        } else {
            //옆 칸으로 이동
            if(prevIdx<nowIdx-1 || (nowIdx < 7 && prevIdx - nowIdx < 23)) {
                if(prevIdx == 23){
                    prevIdx = 0;
                    roundCount = 1;
                } else{
                    startAngle = -90;    
                    prevIdx++;
                }
                moveIntv = setTimeout(markAni,15);
            } else {
                clearTimeout(moveInt);
                $(".mark").css({left:0});
                $(".board_wrap").removeClass("rolling");
            }
        }
    }
}