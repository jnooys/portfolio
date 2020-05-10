$(function(){
    posSet();
    widthSet();
    popShow();
    pageLoad();
    $(".sub_wrap > .sub").each(function(i){
        ar_sub.push($(this).offset().top-75);
    })
    $(".sub_wrap .thumbnail").each(function(){
        ar_th.push(parseInt($(this).offset().top));
    })    
    if($("#gnb").length>0){
        topBar = $("#gnb").outerHeight();
    } else if ($(".s_gnbWarp").length>0){
        topBar = $(".s_gnbWarp").outerHeight();
    }
    $(window).scroll(function(){
        sct = $(window).scrollTop();
        if(sct>=topBar){
            $(".wrap .header").css({position:"fixed"});
        } else{
            $(".wrap .header").css({position:""});
        }
        if(sct>=winHeight){
            $(".wrap .main").removeClass("active");
            $(".wrap .sub_wrap").addClass("active");
        } else if(sct<topBar &&  mcCheck){
           $(".wrap .main").addClass("active");
           $(".wrap .sub_wrap").removeClass("active");
        }
        if(sct>=ar_sub[2] - 500){
            $(".main_menu li:eq(2)").addClass("on").siblings().removeClass("on");
            $(".btn_top").addClass("btn_on");
        } else if(sct>=ar_sub[1] - 300){
            $(".main_menu li:eq(1)").addClass("on").siblings().removeClass("on");
            $(".btn_top").addClass("btn_on");
        } else if(sct>=ar_sub[0] - 300){
            $(".main_menu li:eq(0)").addClass("on").siblings().removeClass("on");
            $(".btn_top").addClass("btn_on");
        } else{
            $(".main_menu li").removeClass("on");
            $(".btn_top").removeClass("btn_on");
        }
        $(".sub_wrap h3").each(function(i){
            var o = (sct-ar_sub[i]+800)/500, y1 = (ar_sub[i]-300-sct)/10, y2 = (ar_sub[i]-sct)/8.3333;
            if(sct<ar_sub[i]-800){
                $(this).css({opacity:0,transform:"translateY(50px)"});
                $(this).next(".sub_title").css({opacity:0,transform:"translateY(60px)"});
            } else if(sct>ar_sub[i]-300){
                $(this).css({opacity:1,transform:"translateY(0px)"});
                $(this).next(".sub_title").css({opacity:1,transform:"translateY(0px)"});
            } else/*(sct>=ar_h3[i]-500 && sct<=ar_h3[i])*/{
                $(this).css({opacity:o,transform:"translateY("+y1+"px)"});
                $(this).next(".sub_title").css({opacity:o,transform:"translateY("+y2+"px)"});
            }
        })
        $(".sub_wrap .sub_content > h4").each(function(i){
            var si = $(this).parents(".sub").index(".sub"),
                hi = $(this).parents(".sub").find("h4").index(this),
                o = (sct-ar_sub[si]+600-hi*100)/500, 
                y = (ar_sub[si]-100-sct+hi*100)/12.5,
                y2 = (ar_sub[si]-100-sct+hi*100)/25;
            if(sct<ar_sub[si]-600+hi*100){
                if($(this).hasClass("h4_4")){
                    $(this).css({opacity:0,transform:"translateY(20px)"});
                } else{
                    $(this).css({opacity:0,transform:"translateY(40px)"});
                }
                $(this).next(".parag").css({opacity:0,transform:"translateY(40px)"});
            } else if(sct>ar_sub[si]-100+hi*100){
                $(this).css({opacity:1,transform:"translateY(0px)"});
                $(this).next(".parag").css({opacity:1,transform:"translateY(0)"});
            } else{
                if($(this).hasClass("h4_4")){
                    $(this).css({opacity:o,transform:"translateY("+y2+"px)"});    
                } else{
                    $(this).css({opacity:o,transform:"translateY("+y+"px)"});    
                }
                $(this).next(".parag").css({opacity:o,transform:"translateY("+y+"px)"});
            }
        })
        $(".sub_wrap .thumbnail").each(function(i){
            if(sct>=ar_th[i]-800 && sct<=ar_th[i]+400){
                $(this).addClass("rotate");
                $(this).find("a").css({"transition-delay":""});
            } else{
                $(this).removeClass("rotate");
                $(this).find("a").css({"transition-delay":""});
            }
        })
        $(".sub_wrap .transit").each(function(i){
            var si = $(this).parents(".sub").index(".sub"),
                o = (sct-ar_sub[si]+300)/500, 
                y = (ar_sub[si]+200-sct)/12.5;
            if(sct<ar_sub[si]-300){
                $(this).css({opacity:0,transform:"translateY(40px)"});
            } else if(sct>ar_sub[si]+200){
                $(this).css({opacity:1,transform:"translateY(0px)"});
            } else{
                $(this).css({opacity:o,transform:"translateY("+y+"px)"});
            }
        })
        if(sct>=ar_sub[0]-500){
             $(".sub1 .bg_sub1").addClass("fade");
        } else{
            $(".sub1 .bg_sub1").removeClass("fade");
        }
        if(sct>=ar_sub[2]){
            $(".sub_wrap .ps").addClass("pon");
        } else{
            $(".sub_wrap .ps").removeClass("pon");
        }
    })
    $(window).resize(function(){
        widthSet();
    })
    $(".main").css({top:topBar});
    $(".wrap").bind("mousewheel DOMMouseScroll",function(event){
        if(event.originalEvent.wheelDelta){
            delta = event.originalEvent.wheelDelta/120;
        } else if(event.originalEvent.detail){
            delta = -event.originalEvent.detail/3;
        }
        if(!scrollCheck){
            event.preventDefault ? event.preventDefault() : event.returnValue = false;
        } else if($(".wrap .main").hasClass("active") && delta == -1) {
            event.preventDefault ? event.preventDefault() : event.returnValue = false;
            scrollCheck = false;
            transit();
        }
    })
    $(".main_menu li a").click(function(e){
        e.preventDefault();
        mcCheck = false;
        var pIdx = $(this).parent().index();
        $(this).parent().addClass("on").siblings().removeClass("on");
        $("html,body").stop().animate({scrollTop:ar_sub[pIdx]},800,function(){
            mcCheck = true;
        });
        $(".wrap .main").removeClass("active");
        $(".wrap .sub_wrap").addClass("active");
        $(".wrap .sub_wrap .bg_sub, .wrap .sub_wrap .character").removeClass("on");
        location.hash = ar_hash[pIdx];
    })
    $(".skill_list .tab li a").click(function(e){
        e.preventDefault();
        var i = $(this).parent().index();
        if(!$(this).parent().hasClass("on")){
            $(this).parent().addClass("on").siblings().removeClass("on");
            $(".skill_box > div:eq("+i+")").addClass("on").siblings().removeClass("on");
        }
    })
    $(".btn_top").click(function(e){
        e.preventDefault();
        $("html,body").stop().animate({scrollTop:0},600);
    })
})
var topBar = 0, scrollCheck = true, mcCheck = true,winHeight, winWidth;
var ar_sub = [], ar_th = [];
var ar_hash = ["Blader","SKills","Field-Dungeon"];
function transit(){
    $(window).scrollTop(winHeight);
    $(".sub_wrap .bg_sub, .sub_wrap .character").addClass("on");
    if(!isIE() || isIE()>9){
        setTimeout(function(){
            scrollCheck = true;
        },1000)    
    } else{
        scrollCheck = true;
    }
}
function posSet(){
    var menuD;
    winHeight = $(window).height();
    $(".wrap").css({"padding-top":winHeight-topBar > 1000 ? 1000 : winHeight-topBar});
    $(".sub_wrap .character").css({height:winHeight <= 879 ? 879 : winHeight});
}
function widthSet(){
    winWidth = $(window).width();
    if(winWidth<=1263){
        $(".header .main_menu .m1").css({left: "-240px"});
        $(".header .main_menu .m3").css({right:"-250px"});
    } else if(winWidth<=1800){
        menuD = parseInt((1920-winWidth) * 0.2);
        $(".header .main_menu .m1").css({left: -371+menuD});
        $(".header .main_menu .m3").css({right: -381+menuD});
    } else {
        $(".header .main_menu .m1").css({left:""});
        $(".header .main_menu .m3").css({right:""});
    }
}
function popShow(){
    var imgIdx = 0, videoIdx = 0,videoSrc,clickName;
    $(".thumbnail a").click(function(e){
        e.preventDefault();
        var boxIdx;
        clickName = $(this).attr("class");
        if($(this).parents(".thumbnail").hasClass("video_list")){ 
            videoIdx = $(".video_list a").index(this);
            videoSrc = $(this).attr("href");
            if($(".pop_wrap .pop_video li:eq("+videoIdx+")").is(":empty")){
                $(".pop_wrap .pop_video li:eq("+videoIdx+")").append("<iframe width='1200' height='675' src='"+videoSrc+"' frameborder='' allowfullscreen=''></iframe>")
            }
            $(".pop_wrap .pop_video").addClass("show").find("li:eq("+videoIdx+")").addClass("show");
        } else{
            boxIdx = $(this).parents(".thumbnail").index(".img_list");
            imgIdx = $(this).parents(".thumbnail").find("a").index(this);
            $(".pop_wrap .pop_img").addClass("show");
            $(".pop_wrap .pop_img ul:eq("+boxIdx+")").addClass("show").siblings("div").removeClass("show");
            $(".pop_wrap .pop_img ul:eq("+boxIdx+") li:eq("+imgIdx+")").addClass("show");
            if($(".pop_wrap .pop_img ul:eq("+boxIdx+") li:eq("+imgIdx+")").is(":empty")){
                $(".pop_wrap .pop_img ul:eq("+boxIdx+") li:eq("+imgIdx+")").append("<img src='http://image.cabal2.co.kr/Intro/160817_update/images/img_"+clickName+".jpg' alt=''>");
            }
        }
        $(".pop_wrap").show();
    })
    $(".pop_wrap .move").click(function(e){
        e.preventDefault();
        var leng = $(".pop_wrap .pop_img ul.show li").length;
        if($(this).hasClass("next")){
            imgIdx = imgIdx == leng - 1 ? 0 : imgIdx+1;
        } else{
            imgIdx = imgIdx == 0 ? leng-1 : imgIdx-1;
        }
        clickName = clickName.split(clickName.slice(-1))[0]+parseInt(imgIdx+1);
        if($(".pop_wrap .pop_img ul.show li:eq("+imgIdx+")").is(":empty")){
            $(".pop_wrap .pop_img ul.show li:eq("+imgIdx+")").append("<img src='http://image.cabal2.co.kr/Intro/160817_update/images/img_"+clickName+".jpg' alt=''>");
        }
        $(".pop_wrap .pop_img ul.show li:eq("+imgIdx+")").addClass("show").siblings().removeClass("show");
    })
    $(".pop_wrap .btn_close, .pop_wrap .bg_pop").click(function(){
        if($(".pop_video").hasClass("show")){
          $(".pop_video li.show iframe")[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
        }    
        $(".pop_wrap").hide().find(".show").removeClass("show");
        return false;
    })
    $(".thumbnail li a").bind("mouseenter",function(){
        $(this).parent("li").addClass("hover").siblings().removeClass("hover");
    }).bind("mouseleave",function(){
        $(this).css({"transition-delay":"0ms"}).parent("li").removeClass("hover");
    })
    $(".pop_img").hover(function(){
        $(this).find(".move").fadeIn("fast");
    },function(){
        $(this).find(".move").fadeOut("fast");
    })
}
//IE 체크
function isIE() {
  var myNav = navigator.userAgent.toLowerCase();
  return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
}
//서브 페이지 로딩
function pageLoad(){
    var hash = location.hash.indexOf("?") > -1 ? location.hash.split("#")[1].split("?")[0] : location.hash.split("#")[1],
        pageIdx = ar_hash.indexOf(hash);
    if(pageIdx>-1){
        $(window).load(function(){
            $(window).scrollTop($(".sub_wrap > .sub:eq("+pageIdx+")").offset().top);    
        })
    }
}
//하위버전 indexOf 사용하기
if(!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(obj, start) {
         for (var i = (start || 0), j = this.length; i < j; i++) {
             if (this[i] === obj) { return i; }
         }
         return -1;
    }
}