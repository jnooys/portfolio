$(function(){
    //타이틀
    $(window).load(function(){
        $(".wrap").addClass("load");
        setTimeout(function(){
            $(".top h2").addClass("vibrate");    
        },100)
        setTimeout(function(){
            $(".top h2").removeClass("vibrate"); 
        },600)
        setInterval(function(){
            $(".top h2").addClass("vibrate");    
            setTimeout(function(){
                $(".top h2").removeClass("vibrate"); 
            },500)
        },4000)
    })
    //팝업
    $(".board_center .btn_item").click(function(e){
        e.preventDefault();
        $(".layerpop").show();
    })
    $(".layerpop .bg_pop, .layerpop .btn_close").click(function(e){
        e.preventDefault();
        $(".layerpop").hide();
    })
})