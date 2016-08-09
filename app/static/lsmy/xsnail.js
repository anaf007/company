var xi=0;
var x_bak=0;
var timeout_x1='';
var timeout_x2='';
var timeout_x4='';
$(document).ready(function(e){
	xslide();
	$('.view .list .img img').hover(function(){
		$(this).animate({width:'370px',height:'501px',top:'-25px',left:'-25px'},1500);
	});
})
function xslide(){
	x_bak=0;
	$(".xm1").css({top:'50px',display: 'none'});
	$(".xm2").css({top:'180px',display: 'none'});
	$(".xm3 div").css({top:'180px',display: 'none'});
	$(".xm4").css({top:'350px',display: 'none'});
	timeout_x1=setTimeout("xxm1()",100);
	timeout_x2=setTimeout("xxm2()",100);
	for(j=1;j<=7;j++){
		var xa=setTimeout("xxm3_a1("+j+")",1000+250*(2+j));
	}
	timeout_x4=setTimeout("xxm4()",100);
}
function xxm1(){
	$(".xm1").animate({top:'62px',opacity: 'show'},100);
}

function xxm2(){
	$(".xm2").animate({top:'192px',opacity: 'show'},100);
}

function xxm3_a1(j){
	$(".xm3 .xa"+j).animate({opacity: 'show'},100);
	
}

function xxm4(){
	$(".xm4").animate({top:'357px',opacity: 'show'},100);
	x_bak=1;
}