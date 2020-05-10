$(function(){
    //메인 롤링
    var btnPos,funcHeight,pivotCheck =false,sct = $(window).scrollTop(), winHeight = $(window).height();
    function funcMove(){
        var sct = $(window).scrollTop();
        if(!pivotCheck && sct+winHeight >= funcHeight && sct<=btnPos){
            pivotCheck = true;
            $(".main_func .det_wrap").pivot();    
            $(".roll_wrap .move span").stop().delay(1000).fadeOut(400);
        }
    }
    $(window).load(function(){
        btnPos = $(".roll_wrap .move span").offset().top;
        funcHeight = $(".mob_func").offset().top + $(".roll_wrap").height();
        funcMove();
    })
    $(window).scroll(function(){
        funcMove();
    })
    
    $(".btn_email").click(function(e){
    	sendAppInfo();
    });
});
var isProccessing = false;
function sendAppInfo(){
	var email = $("#inputJoin").val();
	
	if(email == ""){
		alert($("#ErrorMustInputEmail").text());
		return;
	}
	if(!((/^([a-zA-Z0-9\+_\-]+)(\.[a-zA-Z0-9\+_\-]+)*@([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,6}$/).test(email))){
		alert($("#ErrorWrongEmail").text());
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
		alert($("#ErrorPotalEmail").text());
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
					alert($("#ErrorApplicationEmail").text());
				}
			}
		});
	}
}

function sendDemoInfo(){
	var email = $("#inputDemo").val();
	
	if(email == ""){
		alert($("#ErrorMustInputEmail").text());
		return;
	}
	if(!((/^([a-zA-Z0-9\+_\-]+)(\.[a-zA-Z0-9\+_\-]+)*@([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,6}$/).test(email))){
		alert($("#ErrorWrongEmail").text());
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
		alert($("#ErrorPotalEmail").text());
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
					isUtil.movePage($('#ApplicationMainLink').text());
				}
			}
		});
	}
}