var pageNum, mainNum, accountNum, storeNum, sc_moving;
$(function(){
	// 팝업 bg 높이 가져오기 
	spanHeight();
	$(window).resize(function(){
		spanHeight();	
	});
	// hover 효과
	$(".header_con .btn_more, .quick, .btn_n_r, .pop .close, .pager a, .shop_1 .buy_p li a, .a_h, .menu_more li").bind("touchstart", function(){
		$(this).addClass("hover");
    }).bind("touchend touchmove",function(){
        $(this).removeClass("hover");
    });
	// 리스트 hover 효과
	$(".main.manage li > a, .hover_list li > a").bind("touchstart", function(){
        sc_moving = true;
        var _this = $(this);
        setTimeout(function(){
            if(sc_moving){
                _this.parent("li").addClass("hover");
            }
        },40);
    }).bind("touchmove touchend",function(){
        sc_moving = false;
        $(this).parent("li").removeClass("hover");
    });
	// 메인 리스트 hover 효과
	$(".main section li > .title").bind("touchstart", function(){
		var playChk = $(this).parent("li").find(".action a").hasClass("pause");
        var _this = $(this);
        sc_moving = true;
        setTimeout(function(){
            if(!playChk && sc_moving){
                _this.parent("li").addClass("hover");
            }
        },40);
    }).bind("touchmove touchend",function(){
        sc_moving = false;
		var playChk = $(this).parent("li").find(".action a").hasClass("pause");
		if(!playChk){		
        	$(this).parent("li").removeClass("hover");
		}
    });
	// 버튼 hover 효과
	$(".submit_wrap, a").bind("touchstart", function(){
        if($(this).find(".cover").length > 0 ){
		  $(this).find(".cover").show();
        }
    }).bind("touchend touchmove",function(){
        if($(this).find(".cover").length > 0 ){
            $(this).find(".cover").hide();
        }
    });
	// 메인 페이지 재생 버튼 토글
	$(".main section li .action a").bind("click",function(){
		var bgChk = $(this).hasClass("pause");
		if (!bgChk){
			$(".main section li").removeClass("hover");
			$(".main section li > .action a").removeClass("pause");
			$(this).parents("li").addClass("hover");
			$(this).addClass("pause");
        } else{
			$(this).parents("li").removeClass("hover");
			$(this).removeClass("pause");
		}
	});   
	//인기, 최신 탭 클릭
	$(".main header li a").click(function(){
		if($(this).parent().hasClass("newest") || $(this).parent().hasClass("ringpack")){
			$(".quick, .pager").show();
		} else{
			$(".quick, .pager").hide();
		}
		var idx = $(this).parent().index();
		$("header li").removeClass("on");
		$(this).parent().addClass("on");
		$("section").hide();
		$("section:eq("+idx+")").show();
    });
	// 뷰페이지 버튼 토글
	$(".btn_area a").click(function(){
		var playChk = $(this).hasClass("on");
		var btnChk = $(this).hasClass("big_listen");
		if (btnChk){
			if (!playChk) {
				$(this).addClass("on").html("중지");
			} else if (playChk) {
				$(this).removeClass("on").html("재생");
			} 
		}
	});
	// 뷰페이지 더보기 버튼
	$(".header_con .btn_more").click(function(){
		$(".header_con .menu_more ul").toggle();
	});
	// 뷰페이지 공유하기 팝업
	$(".header_con .menu_more .m_1 a").click(function(){
		$(".pop_share, .bg").show();
		$(".header_con .menu_more ul").hide();
	});
    $(document).click(function(event){
        console.log($(event.target).parents(".menu_more").length);
        if($(event.target).parents(".menu_more").length<1){
            $(".header_con .menu_more ul").hide();
        }
    })
    //0202 수정 start
	// 댓글을 입력해주세요 textarea
	$(".text_wrap textarea").blur(function(){
        if (this.value == ""){
            $(".cmt_ipt label").show();
        }
        $(".sbm_cm").removeClass("hover");	
        $(".quick,.ring_btn .btn_wrap").show();
        $(".ring_btn .cmt_ipt").hide();
        if($(window).scrollTop()>0){
            $(".quick").show();
        }
    }).bind("keyup input", function(){
        if (this.value !=""){
            $(".cmt_ipt label").hide();
            $(".sbm_cm").addClass("hover");
        } else{
            $(".cmt_ipt label").show();
            $(".sbm_cm").removeClass("hover");
        }
    });
	// 댓글 입력 버튼 이벤트
	$(".cover_ipt").bind("touchstart", function(){
        $(this).find(".sbm_cm").addClass("hover");
        $(this).find(".cover").show();
	}).bind("touchend touchmove", function(){
        $(this).find(".sbm_cm").removeClass("hover");
        $(this).find(".cover").hide();
	})
    //뷰페이지 좋아요 버튼
    $(".btn_area .btn_like").click(function(){
        $(this).toggleClass("liked");
    })
    //뷰페이지 댓글쓰기 버튼
    $(".btn_area .btn_comment").click(function(){
        $(".ring_btn .btn_wrap, .header_con .menu_more, .quick").hide();
        $(".ring_btn .cmt_ipt").show().find("textarea").focus();
    })
    //0202 수정 end
    // 퀵 버튼
    $(window).scroll(function(){
        var sct = $(window).scrollTop();
        if(sct>0 && !$(".ring_btn .cmt_ipt textarea").is(":focus")){
            $(".quick").show();
        } else{
            $(".quick").hide();
        }
        
    })
	// 퀵 버튼 클릭
	$(".quick").click(function(){
		$("html,body").animate({scrollTop : 0}, 300);
    });   
	// 팝업 닫기
    $(".btn_popopen").click(function(){
        var link = $(this).attr("href");
        $(".bg").show();
        $(link).show();
        return false;    
    })
	$(".pop .cancel, .pop .close").click(function(){
		$(this).parents(".pop").hide();
		$("span.bg").hide();
    });
	// 계정 관리 body min-height 지정
	if (accountNum){
		$("body").css({
			"position":"relative",
			"min-height":"456px"
        });
		$("html, body").css("height","100%");
    }
	//계정관리 input 이벤트
	$("input.n_r").focus(function(){
		if ($(this).prop("value") !== ""){
			$(".n_r_wrap a.del").show();
            $("input.btn_n_r").addClass("hover");
		}
		$(this).css({
			"color":"#fff",
            "padding-right":"55px"
        });
    }).blur(function(){
        setTimeout("blurEvent()", 150);
    }).keyup(function(){
        if ($(this).prop("value") !== ""){
            $(".n_r_wrap a.del").show();
            $("input.btn_n_r").addClass("hover");
        } else{
            $(".n_r_wrap a.del").hide();
    }
    });
	// 계정관리 input 우측 x버튼 이벤트
	$(".n_r_wrap a.del").click(function(){
		delNum = 1;
		$("input.n_r").focus();
		$(".n_r_wrap input.n_r").val("");
        $("input.btn_n_r").removeClass("hover");
		$(this).hide();
	});
	// 검색하기 input 이벤트
	$(".s_ipt input").filter("[value]").each(function(index){
		var valueStr = [];
		valueStr[index] = $(this).val();
		$(this).focus(function(){				
			$(".s_ipt a.del").hide();
			if($(this).val() == valueStr[index]){
				$(this).val("");
			}	
			if(!($(this).val() == "")){
				$(".s_ipt a.del").show();
			}
			$(this).css({
				"color":"#fff"
			});
			$(".s_ipt .ipt_wrap").css("padding-right","63px");
			
		}).blur(function(){
			setTimeout("searchEvent()", 150);
			if($(this).val() == ""){
				$(this).val(valueStr[index]);
			}
		}).bind("keyup input", function(){
			if(!($(this).val() == "")){
				$(".s_ipt a.del").show();
			}else{
				$(".s_ipt a.del").hide();
			}
		});
	});
	$(".s_ipt a.del").click(function(){
		delNum = 1;
		$(".s_ipt input").focus();
		$(".s_ipt .ipt_wrap input").val("");
		$(this).hide();
	});
	// 검색하기 상세조건검색 버튼 클릭 이벤트
	$(".search_wrap .lately a").click(function(){
		$(".s_detail").show();
	});
	$(".s_detail .btn_d_close").click(function(){
		$(".s_detail").hide();
	})
	// 검색하기 > 상세검색 페이지
	$(".s_d_wrap .range li").click(function(){
		$(".range li").removeClass("on");	
		$(this).addClass("on");
		$(".range li").css({"border-right":"1px solid #3e3e3e"});
		$(".range .last, .range .on").css("border-right","0");
		$(this).prev().css("border-right","0");
	});
	$(".s_d_wrap .price li").click(function(){
		$(".price li").removeClass("on");	
		$(this).addClass("on");
		$(".price li").css({"border-right":"1px solid #3e3e3e"});
		$(".price .last, .price .on").css("border-right","0");
		$(this).prev().css("border-right","0");
	});
	$(".s_d_wrap .term li").click(function(){
		$(".term li").removeClass("on");	
		$(this).addClass("on");
		$(".term  li").css({"border-right":"1px solid #3e3e3e"});
		$(".term  .last, .term  .on").css("border-right","0");
		$(this).prev().css("border-right","0");
		if($(".s_d_wrap .term .last").hasClass("on")){
			$(".s_d_wrap .period .set_up").show();
		}else{
			$(".s_d_wrap .period .set_up").hide();
		}
	});
	// 검색결과 영역
	var windowWidth = $(window).width();
	if($(".lately .s_con").width() >= windowWidth/3){
		$(".lately .s_con").addClass("on");
	}else{
		$(".lately .s_con").removeClass("on");
	}
	// 검색하기 > 상세검색 checkbox
	$(".r_type label").click(function(){
		if($(this).hasClass("chk")){
			$(this).parent(".r_t").removeClass("on");
			$(this).removeClass("chk");
			if(!($(this).parent().siblings().children().hasClass("chk"))){
				$(this).parent().parent().parent(".r_t").removeClass("on");
			}
		}else{
			$(this).parent(".r_t").addClass("on");
			$(this).parent().parent().parent(".r_t").addClass("on");
			$(this).addClass("chk");
		}
	})
    //상점 페이지 배경 , 높이 잡기
    if (storeNum){
		$("body").css({
			"background-color":"#1C1D1E",
        });
    }   
    // 신고하기 radio, 체크박스 체크하기
    $(".notify li label").bind("click", function(){
        if($(this).parents("ul").hasClass("ipt_radio")){
            $(this).parents("ul").find("li > label").removeClass("chcked");
            $(this).addClass("chcked");
            if($(this).parent("li").index() == $(".ipt_radio li").length - 1){
                $(this).parent("li").find(".txt_wrap").show();
            } else{
                 $(".ipt_radio li:last .txt_wrap").hide();
            }
            notiHeight();
        } else if($(this).parents("ul").hasClass("ipt_check")){
            if($(this).prev("input").prop("checked")){
                $(this).removeClass("chcked");
            } else{
                $(this).addClass("chcked");
            }
        }
    });
    // 모든 textarea 높이 자동으로 늘어나기
    $("textarea").bind("keyup", function(){
        var scrlHeight = this.scrollHeight;
        $(this).css({
            "overflow":"hidden",
            "height": scrlHeight + "px"
        });
    });
    // 신고페이지 min-height 값 유동으로 잡기
    notiHeight();
    $(".noti_wrap li textarea").bind("keyup", function(){
         notiHeight();
    })
    // 도움말 페이지 페이징
    $(".help > .pager a").click(function(){
        var idx = $(".help .help_info.on").index("article");
        if($(this).hasClass("p_prev") && idx != 0){
            var pageIdx = idx - 1 ;
        } else if ($(this).hasClass("p_next") && idx != 3) {
            pageIdx = idx + 1 ;
        } else{
            return false;
        }
        if(pageIdx == 0){
            $(".help .pager .p_prev").removeClass("on").addClass("off");
        } else if(pageIdx == 3){
            $(".help .pager .p_next").removeClass("on").addClass("off");
        } else{
            $(".help .pager .p_next, .help .pager .p_prev").removeClass("off").addClass("on");
        }
        $(".help .pager_txt > span").text(pageIdx + 1);
        $(".help > .help_info").hide().removeClass("on");
        $(".help > .help_info:eq("+pageIdx+")").show().addClass("on");
    })
    // 공지사항 보기
    var notice_move;
    $(".notice_board li > a").on("touchstart", function(){
        $(this).addClass("hover");
        notice_move = true;
    }).on("touchmove", function(){
        $(this).removeClass("hover");
        notice_move = false;
    }).on("touchend", function(){
        var idx = $(this).parent("li").index();
        if(notice_move){
            $(".notice_board li:not(:eq("+idx+")) > p").hide();
            $(".notice_board li:not(:eq("+idx+")) > a").removeClass("hover up");
            $(this).parent("li").find(">p").toggle();
            $(this).removeClass("hover").toggleClass("up");
        }
    })
}); 

//함수
function spanHeight(){
	var winHeight = $(window).height();
	var bodyHeight = $("body").height();
	if(mainNum){
		bodyHeight = bodyHeight + 50;
		}
	var bgHeight = winHeight > bodyHeight ? winHeight : bodyHeight;
	$("span.bg").css({
		"height": bgHeight + "px"});
}
//계정관리 input 이벤트
var delNum = 0;
var nickName = $("input.n_r").prop("value");
function blurEvent(){
	if(!delNum){
		$("input.n_r").css({
			"color":"#847AB2",
            "padding-right":"15px"
		});
		$("input.btn_n_r").removeClass("hover");
		$(".n_r_wrap a.del").hide();
		if($("input.n_r").val() == ""){
			$("input.n_r").val(nickName);
			}
	} else {
		delNum = 0;
	}
}
//검색 input 이벤트
var delNum = 0;
var searchName = $(".s_ipt input").prop("value");
function searchEvent(){
	if(!delNum){
		$(".s_ipt .ipt_wrap").css({
            "padding-right":"12px"
		});
		$(".s_ipt a.del").hide();
		if($(".s_ipt input").val() == ""){
			$(".s_ipt input").val(searchName);
		}
		if($(".s_ipt input").val() == searchName){
			$(".s_ipt .ipt_wrap").css("padding-right","12px");
		}else if(!($(".s_ipt input").val() == "")){
			$(".s_ipt .ipt_wrap").css("padding-right","40px");
		}else{
			$(".s_ipt .ipt_wrap").css("padding-right","63px");
		}
	}else{
		delNum = 0;
	}
}
// 신고페이지 min-height 값 유동으로 잡기
function notiHeight(){
    var minHeight = $(".notify .n_caution").innerHeight() + $(".notify .noti_wrap").innerHeight() + 108;
    $(".content_wrap.notify").css("min-height", minHeight + "px");
}