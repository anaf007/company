<!--
var speed=18;
var tab_ry=document.getElementById("rymo");
var tab_ry1=document.getElementById("rymo1");
var tab_ry2=document.getElementById("rymo2");
tab_ry2.innerHTML=tab_ry1.innerHTML;
function Marquee(){
if(tab_ry2.offsetWidth-tab_ry.scrollLeft<=0)
tab_ry.scrollLeft-=tab_ry1.offsetWidth
else{
tab_ry.scrollLeft++;
}
}
var MyMar=setInterval(Marquee,speed);
tab_ry.onmouseover=function() {clearInterval(MyMar)};
tab_ry.onmouseout=function() {MyMar=setInterval(Marquee,speed)};
-->