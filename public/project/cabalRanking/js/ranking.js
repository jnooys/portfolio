$(function(){
    //Header GNB Event
    headerEvent();
    //Select Box
    selectCustom();
    //Main Scroll
    mainScroll();
    //Search Menu
    searchMenu();
    //Character Ranking - Mission
    missionList();
    //Dungeon List
    if($(".dungeon_clear .entry_item").length>0){dungeonList();}
    //Slide List
    if($(".slide_list .list_wrap").width()){sl.init();}
    //Main Map Slide
    $(".map_img a").bind("mouseenter focusin",function(){
        if(!$(this).hasClass("on")){
            var nation = $(this).attr("class");
            var slideIdx = $(".slide_list li ."+nation).parent().index();
            $(this).addClass("on").siblings().removeClass("on");
            sl.move(slideIdx);
        }
    })
    $(".map_wrap .slide_list li a").click(function(e){
        if(!$(this).parent().hasClass("on") && !$(this).parents(".list_wrap ul").is(":animated")){
            var slideIdx = $(this).parent().index();
            var nation = $(".slide_list li:eq("+slideIdx+") a").attr("class");
            $(".map_img .map_coord a."+nation).addClass("on").siblings().removeClass("on");
            sl.move(slideIdx);
            return false;
        }
    })
    $(".map_wrap .slide_list .move a").click(function(e){
        e.preventDefault();
        if(!$(this).parents(".slide_list").find(".list_wrap ul").is(":animated")){
            var slideIdx = $(".slide_list li.on").index();
            if($(this).hasClass("prev")){
                slideIdx--;
            } else{
                slideIdx++;
            }
            var nation = $(".slide_list li:eq("+slideIdx+") a").attr("class");
            $(".map_img .map_coord a."+nation).addClass("on").siblings().removeClass("on");
            sl.move(slideIdx);
        }
        return false;
    })
    //Leader Board Slide
    $(".leaderboard .leader_table .lb_move a, .leaderboard .slide_list .move a").click(function(e){
        e.preventDefault();
        if(!$(".leaderboard .slide_list .list_wrap ul").is(":animated")){
            var slideIdx = $(".header .gnb .hover li.on").index();
            if($(this).hasClass("prev")){
                slideIdx--;
            } else{
                slideIdx++;
            }
            lbSlide(slideIdx);
        }
    })
    $(".leaderboard .header .gnb .hover .depth2.on a").click(function(e){
        e.preventDefault();
        if(!$(this).parent().hasClass("on") && !$(".list_wrap ul").is(":animated")){
            var lbIdx = $(this).parent().index();
            lbSlide(lbIdx);
            return false;
        }
    })
    $(".leaderboard .slide_list li a").click(function(e){
        if(!$(this).parent().hasClass("on") && !$(this).parents(".list_wrap ul").is(":animated")){
            var cls = $(this).attr("class");
            var lbIdx = $(".header .gnb .depth2.on a."+cls).parent().index();
            lbSlide(lbIdx);
            return false;
        }
    })
    //Search Detail Slide
    $(".search_detail .slide_list .move a").click(function(e){
        e.preventDefault();
        if(!$(this).parents(".slide_list").find(".list_wrap ul").is(":animated")){
            var slideIdx = $(".slide_list li.on").index();
            if($(this).hasClass("prev")){
                slideIdx--;
            } else{
                slideIdx++;
            }
            sdClick(slideIdx);
        }
        return false;
    })
    $(".search_detail .slide_list li a").click(function(e){
        if(!$(this).parent().hasClass("on") && !$(this).parents(".list_wrap ul").is(":animated")){
            var slideIdx = $(this).parent().index();
            sdClick(slideIdx);
            return false;
        }
    })
    sdAction();
})

// Leader Board Slide
function lbSlide(dth){
    var dthIdx = dth;
    var dthDir =  dthIdx-$(".header .gnb .hover li.on").index();
    var sldOn = $(".slide_list .list_wrap li.on").index();
    var newClass,replaceClass,$prevTable,$replaceTable;
    var $nowTable = $(".table_wrap.table_now");
    if(dthDir<0){
        //prev
        dthIdx = dthIdx < 0 ?  sl.leng+dthDir : dthIdx;
        newClass = "table_next";
        replaceClass ="table_prev";
        $prevTable = $(".table_wrap.table_prev");
        $replaceTable = $(".table_wrap.table_next");
    } else if(dthDir>0){
        //next
        dthIdx = dthIdx < sl.leng ? dthIdx : sl.leng-dth;
        newClass = "table_prev";
        replaceClass ="table_next";
        $prevTable = $(".table_wrap.table_next");
        $replaceTable = $(".table_wrap.table_prev");
    }
    var link = $(".leaderboard .header .gnb .hover .on li:eq("+dthIdx+") a").attr("href");
    $(".bg_lt .tb_bg span.visible").removeClass("visible").siblings().addClass("visible");
    // ajax 로 $prevTable 내부 table 태그에 해당하는 페이지의 데이터 입력
    // 아래 부분은 페이지 확인용 임시 작업입니다. 실제로 작업하실 땐 삭제 부탁드립니다.
    $.ajax({
        type:"post",
        url:link,
        dataType:"html",
        success:function(data){
            if(history.pushState){
                history.pushState(link,"",link);
            }
            $nowTable.removeClass("table_now").addClass(newClass);
            $prevTable.removeClass("table_prev table_next").addClass("table_now");
            $replaceTable.removeClass().addClass("table_wrap table2 "+replaceClass);
            lbLoad(data,sldOn,dthIdx,dthDir);
        }
    })
}
// Leader Board Slide
function lbLoad(data,sldOn,dthIdx,dthDir){
    var h3tit = $(data).find(".content_title h3").text();
    $(".leaderboard .content_title h3").text(h3tit);
    $(".leaderboard .header .gnb .hover .depth2 li:eq("+dthIdx+")").addClass("on").siblings().removeClass("on").find("a").blur();
    sl.move(sldOn+dthDir);
    selectCustom();
}

// Search Detail Slide
function sdLoad(data, sidx){
    sl.move(sidx);
    var content = $(data).find(".search_box").html();
    $(".search_box").empty().html(content);
    sdAction();
    selectCustom();
}

// 아래 부분은 페이지 확인용 임시 작업입니다. 실제로 작업하실 땐 삭제 부탁드립니다.
function sdClick(si){
    var sdIdx = si;
    var link = $(".search_detail .slide_list li:eq("+sdIdx+") a").attr("href");
    $.ajax({
        type:"post",
        url:link,
        dataType:"html",
        success:function(data){
            if(history.pushState){
                history.pushState(link,"",link);
            }
            sdLoad(data,sdIdx);
            
        }
    })
}
$(window).bind("popstate", function(e){
    if($(".wrap.search").hasClass("search_detail")){
        var state = e.originalEvent.state,
        url = location.href,
        urlArr = url.split("/"),
        urlCut = urlArr[urlArr.length-1],
        sdIdx = $(".search_detail .slide2 ul a[href*='"+urlCut+"']").parent("li").index();  
        $.ajax({
            type:"post",
            url:url,
            dataType:"html",
            success:function(data){
                sdLoad(data,sdIdx);
            }
        })
    } else if($(".wrap.sub").hasClass("leaderboard")){
        var state = e.originalEvent.state,
        url = location.href,
        urlArr = url.split("/"),
        urlCut = urlArr[urlArr.length-1],
        dthIdx = $(".leaderboard .header .gnb .hover .on li a[href*='"+urlCut+"']").parent("li").index();  
        $.ajax({
            type:"post",
            url:url,
            dataType:"html",
            success:function(data){
                var dthDir =  dthIdx-$(".header .gnb .hover li.on").index();
                var sldOn = $(".slide_list .list_wrap li.on").index();
                lbLoad(data,sldOn,dthIdx,dthDir);
            }
        }) 
    }
});
//임시-->

// Search Detail Action
function sdAction(){
    //Search Character - Item Info
    $(".search .char_eq .slotbox div").each(function(){
        if($(this).find(">a img").length>0){
            $(this).find(">.sname").hide();
        }
    })
    if($(".search .tscroll").length>0){
        $(".search .tscroll").mCustomScrollbar({
            scrollInertia:0,
            scrollButtons:{enable:true}
        });
    }
    $(document).on("click",".search .char_eq .slotbox div a",function(e){
        e.preventDefault();
        if(!$(this).parents(".slotsec").hasClass("selected")){
            var itname = $(this).parent(".slotsec").find(".sname span:first").text();
            var itclass = $(this).attr("class");
            $(".slotbox .slotsec").removeClass("selected");
            $(this).parent(".slotsec").addClass("selected");
            $(".item_detail .tit_item h4").text(itname);
            $(".item_detail .detail_cont."+itclass).addClass("show").siblings().removeClass("show");
        }
    })
}

// GNB Init
function headerEvent(){
    var originPT = parseFloat($(".header .header_content").css("padding-top"));
    var $menu = $(".header .menu_wrap .gnb > li, .header .menu_wrap .lang .select");
    var $depth1On,$depth2On;
    if($(".wrap").hasClass("sub")){
        var addHeight = $(".header .menu_wrap .gnb li .depth2.on").innerHeight();
        $depth1On = $(".sub .header .menu_wrap .gnb > li.hover");
        $depth2On = $(".sub .header .menu_wrap .gnb > li.hover .depth2.on");
        $(".header .header_content").css({paddingBottom:addHeight,transition:'padding 0s ease'});
    }
    $menu.hover(function(){
        $menu.removeClass("hover");
        $(this).addClass("hover"); 
        if($(this).parents("ul").hasClass("gnb")){
            $(this).siblings().find(".depth2").removeClass("on");
            $(this).find(".depth2").addClass("on");
            $("#content").css({'border-top':'0 none'});
            var hoverPT = 37;
        }
        heightAdd(hoverPT);
    },function(){
        $(this).removeClass("hover show").find(".depth2").removeClass("on");
        $("#content").css({'border-top':''});
        if($(this).hasClass("sch") && !$(".wrap.search").hasClass("search_list")){
            $(this).find(".search_input").removeClass("focus blur").find("input[type=text]").blur();
        }
        if($depth1On){
            $depth1On.addClass("hover");
            if($depth2On.length>0){
                $depth1On.find(".depth2").addClass("on").css({transition:''});
            }
        }
        heightAdd(originPT);
    }).bind("focusin",function(){
        var hoverPT;
        $menu.removeClass("hover");
        $(this).addClass("hover"); 
        if($(this).parents("ul").hasClass("gnb")){
            $(this).siblings().find(".depth2").removeClass("on");
            $(this).find(".depth2").addClass("on");
            $("#content").css({'border-top':'0 none'});
            $(".menu_wrap .lang .select").removeClass("show");
            hoverPT = 37;
        } else{
            $(".header .menu_wrap .depth2").removeClass("on");
            $("#content").css({'border-top':''});
            hoverPT = originPT;
            if($depth1On){
                if($depth2On.length>0){
                    $depth1On.find(".depth2").addClass("on").css({transition:''});
                }
            }
        }
        heightAdd(hoverPT);
    })
    $(".header h1 a, #content").focusin(function(){
        $menu.removeClass("hover show").find(".depth2").removeClass("on");
        if($depth1On){
            $depth1On.addClass("hover");
            if($depth2On.length>0){
                $depth1On.find(".depth2").addClass("on").css({transition:''});
            }
        }
    });
    function heightAdd(pdTop){
        var addHeight = $(".header .menu_wrap .gnb li .depth2.on").innerHeight() || 0;
        if(!isNaN(pdTop)){
            $(".header .header_content").css({paddingTop:pdTop});
        }
        $(".header .header_content").css({paddingBottom:addHeight,transition:''});
    }
}
//Select Box
function selectCustom(){
    var sles = [];
    $(".select").each(function(i){
        var focused = false;
        var txt = $(this).find("a.default span").text(),
            txtIdx = $(this).find(".option a:contains("+txt+")").parent().index(),
            ols = $(this).find(".option li").length;
        sles[i] = txtIdx < 0 ? 0 : txtIdx;
        $(this).find(".default").on("click",function(e){
            e.preventDefault();
            $(".select").not($(this).parent()).removeClass("show");
            $(this).parent().toggleClass("show");
        }).on("keydown",function(e){
            // space
            if(e.keyCode==32 || event.keyCode == 40){
                e.preventDefault();
                $(this).parent().addClass("show").find("li:eq("+sles[i]+") a").focus();
            }
        })
        $(this).find(".option li a").on("keydown",function(e){
            if(event.keyCode == 40 && !$(this).parent().is(":last-child")){
                //Down
                e.preventDefault();
                $(this).parent().next().find("a").focus();
            } else if(event.keyCode == 38 && !$(this).parent().is(":first-child")){
                //Up
                e.preventDefault();
                $(this).parent().prev().find("a").focus();
            } else if(e.keyCode == 27){
                //ESC
                $(this).parents(".select").removeClass("show");
            }
        }).on("mouseenter focusin",function(){
            focused = true;
            $(this).addClass("on").parent().siblings().find("a").removeClass("on");
            cf = $(this).parent().index();
        }).on("mouseleave focusout",function(){
            focused = false;
            $(this).removeClass("on");
        }).bind("focusout",function(){
            focused = false;
            $(this).removeClass("on");
            if($(this).parent().is(":last-child")){
                var $this = $(this);
                setTimeout(function(){
                    if(!focused){
                        $this.parents(".select").removeClass("show");
                    }
                },10);
            }
        });
    })
    $(document).on("click",function(e){
      if(!$(e.target).parents("div").is(".select.show")){
        $(".select").removeClass("show");
        $(".lang").removeClass("on");
      }
    });
}
//Main Scroll
function mainScroll(){
    var scrollCheck = true;
    var delta = 0;
    var speed = 500;  
    $(".choose .choose_wrap").css({height:$(window).height()});
    $(window).resize(function(){
        $(".choose .choose_wrap").css({height:$(window).height()});
    })
    $(window).load(function(){
        $(".choose_area").addClass("load");
    })
    function transit(){
        scrollCheck = false;
        $(".choose_wrap").animate({top:-200,opacity:0},speed,function(){
            $(this).hide();
            $(".wrap.main").removeClass("choose").addClass("map");
        });
        $(".main .footer .estgames").addClass("hide");
        $(".main .footer").addClass("mapfoot");
        $(".map_wrap").stop().show().css({opacity:0}).animate({top:0,opacity:1},speed,function(){
            $(".main .footer").removeClass("mapfoot");    
        });
        sl.init();
    }
    $(".wrap.main").bind("mousewheel DOMMouseScroll",function(event){
        if($(this).hasClass("choose")){
            event.preventDefault ? event.preventDefault() : event.returnValue = false;
            if(event.originalEvent.wheelDelta){
                delta = event.originalEvent.wheelDelta/120;
            } else if(event.originalEvent.detail){
                delta = -event.originalEvent.detail/3;
            }
            if (delta == -1 && scrollCheck){
                transit();
            }
        }
    })
    $(".wrap.main .choose_wrap .btn_choose").click(function(e){
        e.preventDefault();
        transit();
    })
}
//Slide List
var sl = {
    speed : 500,
    leng : 0,
    cenNum : 0,
    whWidth : 0,
    onWidth : 0,
    onIdx : 0,
    elLeft : 0,
    cenPos : 0,
    mgLeft : 0,
    $slideWrap : "",
    $slideUl : "",
    $slideLi : "",
    init : function(){
        this.$slideWrap = $(".slide_list");
        this.$slideUl = $(".slide_list .list_wrap ul");
        this.$slideLi = $(".slide_list li");
        this.leng = this.$slideLi.length;
        this.cenNum = Math.ceil(this.leng/2);
        this.whWidth = this.$slideWrap.width();
        this.onWidth = this.$slideUl.find(".on").innerWidth();
        this.onIdx = $(".slide_list .list_wrap li.on").index();
        var moveNum;
        if(this.onIdx<this.cenNum){
            moveNum = this.cenNum -  this.onIdx;
            this.$slideUl.find("li:gt("+(this.leng-moveNum)+")").prependTo(this.$slideUl);
            this.onIdx = this.onIdx+moveNum-1;
        } else {
            moveNum = this.onIdx-this.cenNum+1;
            this.$slideUl.find("li:lt("+moveNum+")").appendTo(this.$slideUl);
            this.onIdx = this.onIdx-moveNum;
        }
        this.elLeft = parseFloat(this.$slideUl.find(".on").css("marginLeft"));
        this.cenPos = Math.ceil((this.whWidth - this.onWidth)/2);
        this.mgLeft = this.cenPos - this.$slideUl.find(".on").position().left - this.elLeft;
        this.$slideUl.css({marginLeft:this.mgLeft});
        this.$slideWrap.addClass("visible");
    },
    move : function(onIdx){
        var moveNum = Math.abs(onIdx - this.onIdx);
        if(onIdx<this.cenNum){
            $(".slide_list li:gt("+(sl.leng-moveNum-1)+")").prependTo(this.$slideUl);
            this.onIdx = onIdx + moveNum;
        } else{
            $(".slide_list li:lt("+moveNum+")").appendTo(this.$slideUl);
            this.onIdx = onIdx - moveNum;
        }
        this.mgLeft = this.cenPos - this.$slideUl.find(".on").position().left - this.elLeft;
        this.$slideUl.css({marginLeft:this.mgLeft});
        this.$slideLi.filter(".on").removeClass("on");
        this.$slideUl.find(">:eq("+this.onIdx+")").addClass("on").siblings().removeClass("on");
        this.onWidth = this.$slideUl.find(".on").innerWidth();
        this.cenPos = Math.ceil((this.whWidth - this.onWidth)/2);
        this.mgLeft = this.cenPos - this.$slideUl.find(".on").position().left - this.elLeft;
        this.$slideUl.queue("fx",[]).stop().animate({marginLeft:this.mgLeft},this.speed);
    }
}
//Dungeon List
function dungeonList(){
    var iWidth = 0, showIdx = 0, lvWidth = 0;
    var wLeng = $(".entry_ul > li").length;
    var elWidth = $(".entry_item").width();
    var orWidth = 130;
    var $depth1On = $(".entry_ul > li.on");
    var $depth2On = $(".entry_ul li li.on");
    /*var depth1On = $depth1On.index();
    if(depth1On>0){
        $(".entry_ul > li:lt("+depth1On+")").appendTo($(".entry_ul"));
    }*/
    $(".entry_ul li div").each(function(i){
        if(i<1){
            lvWidth = $(this).innerWidth();
        } else{
            if($(this).innerWidth() > lvWidth){
                lvWidth = $(this).innerWidth();
            }
        }
    })
    $(".entry_ul > li.on div").css({width:lvWidth});
    $(".entry_ul > li.on").siblings().find("div").css({width:0});
    showIdx = Math.floor((elWidth-(lvWidth+orWidth)) / orWidth);
    iWidth = $(".entry_ul > li:eq("+(showIdx+1)+")").position().left;
    $(".el_wrap").css("width",iWidth).find(".entry_ul > li:gt("+showIdx+")").addClass("hide");
    $(".entry_ul").bind("mouseleave",function(){
        if(!$depth1On.hasClass("hide")){
            $depth1On.siblings().removeClass("open").find("div").css({width:0}).find("li").removeClass("open on");
            $depth1On.addClass("on").find("div").css({width:lvWidth});
            $depth2On.addClass("on");
        }
    })
    $(".entry_ul > li").bind("mouseenter",function(){
        $(this).addClass("open on").siblings(":not('.hide')").removeClass("open on").find("div").css({width:0}).find("li").removeClass("open");
        $(this).find("div").css({width:lvWidth});
        if($(this).find("li.open").length<1 || $(this).find("li.on").length<1){
             $(this).find("li:first").addClass("open");
        }
    }).bind("mouseleave",function(){
        $(this).removeClass("on");
        if(!$depth1On.hasClass("hide")){
            //on이 보여질 때
            $(this).find("li").removeClass("open");
        }
    }).find(">a").click(function(e){
        e.preventDefault();
        if(!$(this).next("div").find("li").hasClass("on")){
            $(this).next("div").find("li.open a").trigger("click");
        }
    })
    $(".entry_ul > li > a").bind("focusin",function(){
        $(this).parent().addClass("open on").siblings(":not('.hide')").removeClass("open on").find("div").css({width:0}).find("li").removeClass("open");
        $(this).parent().find("div").css({width:lvWidth});
        if($(this).find("li.open").length<1 || $(this).find("li.on").length<1){
            $(this).parent().find("li:first").addClass("open");
        }
    })
    $(".entry_ul li li a").bind("mouseenter focusin", function(){
        $(this).parent().parents("li").addClass("on");
        $(this).parent().siblings().removeClass("open on");
        if($(this).parent()[0] != $depth2On[0]){
            $(this).parent().addClass("open");
        }
    }).bind("focusout",function(){
        if($(this).parent()[0] != $depth2On[0]){
            $(this).parent().parents("li").removeClass("on");
            $(this).parent().removeClass("on");
        }
    }).bind("click",function(e){
        // 테이블 내용 바꾸기
        e.preventDefault();
        if(!$(this).parent().hasClass("on")){
            var dgTitle = $(this).parents("li").find(".en_txt").text();
            var dgLv = $(this).text();
            $depth1On.removeClass("on");
            $depth2On.removeClass("on");
            $depth2On = $(this).parent("li");
            $depth1On = $depth2On.parents("li");
            $(this).parent("li").removeClass("open").addClass("on").parents("li").addClass("on");
            $(".dungeon_title h4").text(dgTitle+" - "+dgLv);
            elWidth = $(".entry_item").width();
            cgIdx = Math.floor((elWidth-(lvWidth+orWidth)) / orWidth);
            if(cgIdx != showIdx){
                var intv = 0;
                if(cgIdx > showIdx){
                    intv = cgIdx-showIdx;
                    $(".entry_ul > li.hide:lt("+intv+")").removeClass("hide");
                } else{
                    intv = showIdx-(showIdx-cgIdx);
                   $(".entry_ul > li:not('.hide'):gt("+intv+")").addClass("hide"); 
                }
                showIdx = cgIdx;
                iWidth = $(".entry_ul > li:eq("+(showIdx+1)+")").position().left;
                $(".el_wrap").css("width",iWidth);
            }
        }
    })
    $(".entry_item .move_entry a").click(function(e){
        e.preventDefault();
        if(!$(".entry_list .entry_ul").is(":animated")){
            var hdLeng = $(".entry_list li.hide").length;
            var slEnd = hdLeng<=showIdx ? hdLeng : showIdx+1;
            var moveLeft;
            if($(this).hasClass("next")){
                moveLeft = -$(".entry_ul > li:eq("+slEnd+")").position().left;
                $(".entry_list li.hide:lt("+slEnd+")").removeClass("hide");
            } else {
                var moveSet = 0;
                var slStart = hdLeng <= showIdx ? 0 : hdLeng - showIdx-1;
                moveLeft = 0;
                $(".entry_ul > li:gt("+(showIdx+slStart)+")").each(function(){
                    moveSet -= $(this).width();
                })
                $(".entry_list .entry_ul li.hide").slice(slStart,hdLeng).prependTo($(".entry_ul")).removeClass("hide");
                $(".entry_list .entry_ul").css({marginLeft:moveSet});
            }
            $(".entry_list .entry_ul").queue("fx",[]).stop().animate({marginLeft:moveLeft},500,function(){
                $(".entry_ul >li.open").removeClass("open").find("div").css({width:0}).find("li").removeClass("open");
                $depth1On.addClass("on").find("div").css({width:lvWidth});
                $depth2On.addClass("on");
                if(!moveLeft){
                    $(".entry_ul > li:gt("+showIdx+")").addClass("hide");
                } else{
                    $(".entry_ul").css({marginLeft:0});
                    $(".entry_ul >li:lt("+slEnd+")").appendTo($(".entry_ul")).addClass("hide");
                }
                if($depth1On.hasClass("hide")){
                    $(".entry_ul > li:first").addClass("open").find("div").css({width:lvWidth}).find("li:first").addClass("open").focus();
                }
            })
        }
    })
}
//Mission List
function missionList(){
    var $msOn = $(".mission_war .align_ms li.on");
    $(".mission_war .align_ms li a").hover(function(){
        $(this).parent().addClass("on").siblings().removeClass("on");
    },function(){
        $msOn.addClass("on").siblings().removeClass("on");
    })
}
//Search Menu
function searchMenu(){
    var $focusEl, focusChk ="false";
    var $searchOn = $(".search .search_menu .search_input.focus");
    $(".search_menu .search_input input[type=text]").focus(function(){
        focusChk = false;
        $(this).parents(".search_input").removeClass("blur").addClass("focus").siblings().removeClass("focus").addClass("blur");
    }).blur(function(){
        $(this).parents(".search_input").removeClass("focus").siblings().removeClass("blur");
        if($searchOn.length){
            $searchOn.addClass("focus").siblings().addClass("blur");
        }
    })
    $(".search_menu .search_input .search_btn").focus(function(){
        $(this).parents(".search_input").removeClass("blur").addClass("focus").siblings().removeClass("focus").addClass("blur");
    
    })
}