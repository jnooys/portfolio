$(document).ready(function(){
	var nowHref = location.href.replace('http:\/\/' + document.domain, '');
	$(".i_tab").children("li").each(function(){
		if(nowHref.indexOf($(this).attr("class").trim()) != -1){
			$(this).addClass("on");
		}
	});
	
	$(".i_tab").children("li").children("div").children("div").children("ul").children("li").each(function(){
		if(nowHref.indexOf($(this).attr("class")) != -1){
			$(this).children("a").addClass("on");
			$(this).parent("ul").parent("div").parent("div").parent("li").addClass("on");
		}
	});
	
    // search
//    $(".mpop .ipt_txt, .user_search .ipt_txt").focus(function(){
//        if(this.value.length < 1){
//            $(this).prev("label").hide();
//        }
//    }).blur(function(){
//        if(this.value.length < 1){
//            $(this).prev("label").show();
//        }
//    }).keyup(function(){
//        if(this.value.length > 0){
//            $(".input_wrap").addClass("focus");
//        }
//        if($(this).parent().find(".keyword").children().length > 0){
//            $(this).parent().find(".keyword").show();
//        } else {
//            $(this).parent().find(".keyword").hide();
//        }
//    })
    $(".input_wrap .ipt_txt").focus(function(){
        if(this.value.length > 0){
            $(this).parent(".input_wrap").addClass("focus");
        }
    }).keyup(function(){
        if(this.value.length < 1){
            $(this).parent(".input_wrap").removeClass("focus");
        } else{
            $(this).parent(".input_wrap").addClass("focus");
        }
    }).blur(function(){
        var $this = $(this);
        setTimeout(function(){
            if(!$this.is(":focus")){
                $this.parent(".input_wrap").removeClass("focus");
            }
        },200);
    });
    $(".input_wrap .del").click(function(e){
        e.preventDefault();
        $(this).parent(".input_wrap").find("input[type=text]").val("").focus();
    });

    // checkbox
    $("span.checkbox > input[type=checkbox]").change(function(){
        var chked = $(this).prop("checked");
        if(chked){
            $(this).parents(".checkbox, tr, li").addClass("checked");
        } else{
            $(this).parents(".checkbox, tr, li").removeClass("checked");
        }
    });
    // radio
    $("span.radio > input[type=radio]").change(function(){
        var chked = $(this).prop("checked");
        var radName = $(this).attr("name");
        if(chked){
            $("input[name="+radName+"]").not(":checked").parent().removeClass("checked");
            $(this).parent("span").addClass("checked");
        }
    })
  // manage button
    $(".ba_wrap > a ").click(function(e){
        e.preventDefault();
        $(this).parent().toggleClass("show");
    })
    $(".ba_wrap ul li a").click(function(e){
        $(this).parents(".ba_wrap").removeClass("show");
    });
    

	// selectbox
    $(".select").each(function(i){
        $(this).find(".s_default").click(function(e){
            e.preventDefault();
            $(".select:not(:eq("+i+"))").removeClass("show");
            $(this).parent().toggleClass("show");
        })
    });
    $(".select li a").click(function(e){
        e.preventDefault();
        $(this).parents(".select").removeClass("show").find(".s_default").text($(this).text());
    }).focusin(function(){
        $(this).parents(".seelct").find(".s_default").text($(this).text());
        $(this).parents("ul").find("a").removeClass("on");
        $(this).addClass("on");
    }).focusout(function(){
        $(this).removeClass("on");
    }).keydown(function(event){
        if(event.keyCode == 9){
            event.preventDefault();
            $(this).parents("ul").prev("a").focus();
            $(this).parents(".select").removeClass("show");
        }
    }).hover(function(){
        $(this).addClass("on").parent().siblings().children().removeClass("on");
    },function(){
        $(this).removeClass("on");
    });
    $(".select").keydown(function(event){
        var ct = $(this).find(".s_default").text();
        var cf;
        var ols = $(this).find("ul li").length;
        $(this).find("ul li").each(function(i){
            if($(this).find("a").text() == ct){
                cf = i;
            }
        })
        if(event.keyCode == 40 && cf+1!= ols){
            //down
            event.preventDefault();
            cf++;
            var moveTxt = $(this).find("ul li:eq("+cf+") a").text();
            $(this).find(".s_default").text(moveTxt);
            $(this).find("ul li:eq("+cf+") a").focus();
        } else if(event.keyCode == 38 && cf != 0){
            //up
            event.preventDefault();
            cf--;
            var moveTxt = $(this).find("ul li:eq("+cf+") a").text();
            $(this).find(".s_default").text(moveTxt);
            $(this).find("ul li:eq("+cf+") a").focus();
        } else if(event.keyCode == 32){
            //space
            event.preventDefault();
            $(this).addClass("show");
            $(this).find("ul li:eq("+cf+") a").focus();
        } else if(event.keyCode == 27){
            //ESC
            $(this).removeClass("show");
        }
    })
    
    $(document).click(function(event){
      if(!$(event.target).parents("div").is(".select.show")){
        $(".select").removeClass("show");
      }
      if(!$(event.target).parents("div").is(".ba_wrap")){
    	  $(".ba_wrap").removeClass("show");
      }
    });
    // 큰 selectbox
    $(".select_el").each(function(){
        var selected = $(this).find("option:selected").text();
        $(this).find(".s_value").text(selected);
    })
    $(".select_el select").bind("blur change",function(){
        var selected = $(this).find("option:selected").text();
        $(this).parent(".select_el").removeClass("show");
        $(this).prev(".s_value").text(selected);
    })
    //table hover effect
    $(".table_wrap td").hover(function(){
        $(this).parent().addClass("hover").siblings().removeClass("hover");
    },function(){
        $(this).parent().removeClass("hover");
    })
    //table user tooltip
    $(".table_wrap table td .name, .table_wrap table td .thumb_s").hover(function(){
        $(this).parents("td").find(".u_tooltip").show();
        $(this).parents("tr, td").css("z-index","10");
    },function(){
        $(this).parents("td").find(".u_tooltip").hide();
        $(this).parents("tr, td").css("z-index","0");
    })
    $("table .u_tooltip").hover(function(){
        $(this).show();
        $(this).parents("tr, td").css("z-index","10");
    },function(){
        $(this).hide();
        $(this).parents("tr, td").css("z-index","0");
    });
    
     // log name search
//    $(".log_search .tdlog_name .ipt_txt").focus(function(){
//        if(this.value.length < 1){
//            $(this).prev("label").hide();
//        }
//    }).blur(function(){
//        if(this.value.length < 1){
//            $(this).prev("label").show();
//        }       
//    });   
    //company profile name modify
    $(".profile_cont td.cname .btn_cmodi").click(function(e){
        e.preventDefault();
        $(".profile_cont td.cname").addClass("modim");
        $(".profile_cont td.cname .cn_modi input[type=text]").focus();
    })
    // log search options
    $(".search_add ul li input[type=checkbox]").click(function(){
        var idx = $(this).parents("li").index();
        var checked = $(this).prop("checked");
        if(checked){
            $(".log_search .select_logs dl:eq("+idx+")").show();
            $(".log_search p.add_es").hide();
        } else{
            $(".log_search .select_logs dl:eq("+idx+")").hide().children("dd").children("input").val("");
            if($(".search_add ul li.checked").length < 1){
                $(".log_search p.add_es").show();
            }
        }
    });
    //user register : Invite setting-domain
    $(".iv_domain .inr_box input[type=radio]").change(function(){
        var radIdx = $(this).index(".iv_domain .inr_box input[type=radio]");
        if(radIdx){
            $(".add_form").show();
        } else{
            $(".add_form").hide();
        }
    })
    $(".add_form .add_input").click(function(e){
        e.preventDefault();
        var newIpt = "<div><input type='text' class='ipt_txt2' placeholder='도메인 입력'></div>";
        $(newIpt).appendTo($(".add_form")).find("input[type=text]").focus();
    })
    $(document).on("focus", ".add_form div input[type=text]", function(){
        $(this).parent("div").addClass("focus");
    }).on("blur",".add_form div input[type=text]", function(){
        $(this).parent("div").removeClass("focus");
    })
    
    $(".rset_wrap .invite_wrap .help").hover(function(){
        $(".help .help_box").hide();
        $(this).find(".help_box").show();
    },function(){
        $(this).find(".help_box").hide();
    })
    
    $(".btn_pop").click(function(e){
        e.preventDefault();
        var link = $(this).attr("href");
        $("#bg_pop").show();
        $(link).show();
        return false;
    })
    $(".mpop a, #bg_pop").click(function(e){
        e.preventDefault();
        $(".ui_draggable, #bg_pop").hide();
    })
});