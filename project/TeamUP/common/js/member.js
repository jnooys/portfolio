$(function(){
    var winHeight = $(window).height(), winWidth = $(window).width();
    // Top Button
    btnTop();
    $(window).scroll(function(){
        btnTop();
    })
    // checkbox
    $("span.checkbox > input[type=checkbox]").change(function(){
        var chked = $(this).prop("checked");
        if(chked){
            $(this).parent("span").addClass("checked");
        } else{
            $(this).parent("span").removeClass("checked");
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
    // Big selectbox
    $(".select_el").each(function(){
        var selected = $(this).find("option:selected").text();
        $(this).find(".s_value").text(selected);
    })
    $(".select_el select").bind("blur change",function(){
        var selected = $(this).find("option:selected").text();
        $(this).prev(".s_value").text(selected);
    })
    //user register : Invite setting-domain
    $(".tm_pro2-2 .auth_set input[type=radio]").change(function(){
        var radIdx = $(this).parents("dd").hasClass("dom_set");
        if(radIdx){
            $(".add_form").show();
        } else{
            $(".add_form").hide();
        }
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
    $(".pop_alert a").click(function(e){
        e.preventDefault();
        $(this).parents(".layer").hide();
        $("#bg_pop").hide();
    })
    
    $(".add_form .add_input").click(function(e){
        e.preventDefault();
        var ph = $(".add_form input[type=text]").attr("placeholder") || "";
        var newIpt = "<div><input type='text' class='ipt_txt2' placeholder='"+ph+"'></div>";
        $(newIpt).appendTo($(".add_form")).find("input[type=text]").focus();
    })
    $(document).on("focus", ".add_form div input[type=text]", function(){
        $(this).parent("div").addClass("focus");
    }).on("blur",".add_form div input[type=text]", function(){
        $(this).parent("div").removeClass("focus");
    })
    
    $(document).click(function(event){
      if(!$(event.target).parents("div").is(".select.show")){
        $(".select").removeClass("show");
      }
    });
    
    // Login
    $(".login_box p input").focus(function(){
        if(this.value != ""){
            $(this).parent().addClass("focus");
        }
    }).blur(function(){
        if(this.value != ""){
            $(this).parent().addClass("focus");
        } else{
            $(this).parent().removeClass("focus");
        }
    }).bind("keyup keydown",function(){
        if($(".login_box p input[type=password]").val()!="" && $(".login_box p input[type=text]").val()!=""){
            $(this).parents(".login_box").addClass("login_on");
        } else{
            $(this).parents(".login_box").removeClass("login_on");
        }
    })
    
    // Mobile Tab
    $(".info_wrap .i_tab .on a").click(function(e){
        if(winWidth<=639){
            e.preventDefault();
            $(this).parents(".i_tab").toggleClass("open");
            return false;
        }
    })
    
    // Notice
    $(".notice_box .art_title").click(function(e){
        e.preventDefault();
        $(this).parent(".notice_box").toggleClass("open").siblings().removeClass("open");
    })
    
    $(window).resize(function(){
        winHeight = $(window).height(), winWidth = $(window).width();
    })
    
    //Profile Image
    if(!!('ontouchstart' in window)){
        $(".basic_conts .thumb_set").bind("click",function(){
            $(this).addClass("hover");
        })
    } else{
        $(".basic_conts .thumb_set").bind("mouseenter",function(){
            $(this).addClass("hover");
        }).bind("mouseleave",function(){
            $(this).removeClass("hover");
        })
    }
    
    //Marketing Agree
    $(".agree_check .mka_all input[type=checkbox]").change(function(){
        var chkObjs = $(".agree_check .dlm_sep input[type=checkbox]");
        if(chkObjs.length > chkObjs.filter(":checked").length){
            chkObjs.prop("checked",true).parent().addClass("checked");
        } else{
            chkObjs.prop("checked",false).parent().removeClass("checked");
        }
    })
    $(".agree_check .dlm_sep input[type=checkbox]").change(function(){
        var chkObjs = $(".agree_check .dlm_sep input[type=checkbox]");
        if(chkObjs.length == chkObjs.filter(":checked").length){
            $(".agree_check .mka_all input[type=checkbox]").prop("checked",true).parent().addClass("checked");
        } else{
            $(".agree_check .mka_all input[type=checkbox]").prop("checked",false).parent().removeClass("checked");
        }
    })
})
// Top Button
function btnTop(){
    if($(".btn_top").length>0){
        var sct = $(window).scrollTop();
        if(sct>340){
            $(".btn_top").fadeIn(100);
        } else{
            $(".btn_top").fadeOut(100);
        }
    }
    $(".btn_top").click(function(e){
        e.preventDefault();
        $(window).scrollTop(0);
    })
}