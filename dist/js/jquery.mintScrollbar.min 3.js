/*!
 * mintScrollbar v0.1.1
 * http://cople.github.com/mintScrollbar/
 */
!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e("object"==typeof exports?require("jquery"):jQuery)}(function(e){"use strict";function o(o,t){function l(e){v=Math.min(S,Math.max(0,e)),O.css("left",v),s.scrollLeft=v/S*h,C()}function n(e){m=Math.min(w,Math.max(0,e)),q.css("top",m),s.scrollTop=m/w*d,C()}function a(){M&&(D.on("click",function(e){e.target==this&&l(e.offsetX-_/2)}),O.on("mousedown",function(e){var o=e.pageX;c.addClass("mintScrollbar__viewport--active"),e.preventDefault(),k.on("mousemove.mintScrollbar",function(e){l(v+e.pageX-o),o=e.pageX,e.preventDefault()}).one("mouseup",function(){c.removeClass("mintScrollbar__viewport--active"),k.off(".mintScrollbar")})})),X&&(P.on("click",function(e){e.target==this&&n(e.offsetY-T/2)}),q.on("mousedown",function(e){var o=e.pageY;c.addClass("mintScrollbar__viewport--active"),e.preventDefault(),k.on("mousemove.mintScrollbar",function(e){n(m+e.pageY-o),o=e.pageY,e.preventDefault()}).one("mouseup",function(){c.removeClass("mintScrollbar__viewport--active"),k.off(".mintScrollbar")})})),c.on("mousewheel",function(e){if(X){var o=s.scrollTop+e.deltaY*-t.wheelSpeed;x.scrollToY(o),o>-t.wheelSpeed&&o<u-f+t.wheelSpeed&&(e.stopPropagation(),e.preventDefault())}else{var l=s.scrollLeft+(e.deltaX||e.deltaY)*-t.wheelSpeed;x.scrollToX(l),l>-t.wheelSpeed&&l<i-p+t.wheelSpeed&&(e.stopPropagation(),e.preventDefault())}}),c.on("touchstart",function(e){var o=e.originalEvent.touches[0];y=o.pageX,Y=o.pageY,c.addClass("mintScrollbar__viewport--active"),e.preventDefault()}).on("touchmove",function(e){var o=e.originalEvent.changedTouches[0];M&&(x.scrollToX(s.scrollLeft-(o.pageX-y)),y=o.pageX),X&&(x.scrollToY(s.scrollTop-(o.pageY-Y)),Y=o.pageY),e.preventDefault(),e.stopPropagation()}).on("touchend touchcancel",function(){c.removeClass("mintScrollbar__viewport--active")}),c.attr("tabindex",0).on("keydown",function(o){if(!e(o.target).is(":input, [contenteditable]")){var l=t.wheelSpeed/2,n=0,a=0;switch(o.which){case 37:n=-l;break;case 38:a=-l;break;case 39:n=l;break;case 40:a=l;break;case 33:a=-f;break;case 32:case 34:a=f;break;case 36:a=-u;break;case 35:a=u;break;default:return}M&&x.scrollByX(n),X&&x.scrollByY(a),o.stopPropagation(),o.preventDefault()}})}function r(){"function"==typeof t.onChange&&(C=function(){t.onChange.call(s)});var e=o.scrollLeft,l=o.scrollTop;"auto"==t.axis?(o.style.overflow="auto",o.scrollWidth>L.width()&&(M=!0),o.scrollHeight>L.height()&&(X=!0),o.style.overflow=""):(("both"==t.axis||"x"==t.axis)&&(M=!0),("both"==t.axis||"y"==t.axis)&&(X=!0)),L.addClass("mintScrollbar__container").wrapInner("<div class='mintScrollbar__viewport' />"),c=L.children(),s=c.get(0),M&&D.append(O).appendTo(L),X&&P.append(q).appendTo(L),a(),x.resize(),x.scrollTo(e,l)}var c,s,i,u,p,f,h,d,v,m,b,g,S,w,_,T,y,Y,x=this,C=function(){},M=!1,X=!1,k=e(document),L=e(o),B=e("<div class='mintScrollbar' />"),D=B.clone().addClass("mintScrollbar__x"),P=B.clone().addClass("mintScrollbar__y"),j=e("<div class='mintScrollbar__thumb' />"),O=j.clone().addClass("mintScrollbar__x__thumb"),q=j.clone().addClass("mintScrollbar__y__thumb");this.resize=function(){M&&(i=s.scrollWidth,p=c.width(),h=i-p,b=D.width(),_=Math.max(20,Math.round(b/i*b)),S=b-_,O.css("width",_)),X&&(u=s.scrollHeight,f=c.height(),d=u-f,g=P.height(),T=Math.max(20,Math.round(g/u*g)),w=g-T,q.css("height",T))},this.update=function(){M&&(v=Math.round(s.scrollLeft/h*S),O.css("left",v)),X&&(m=Math.round(s.scrollTop/d*w),q.css("top",m)),C()},this.destroy=function(){var e=s.scrollTop,t=s.scrollLeft;L.removeData("mintScrollbar").removeClass("mintScrollbar__container").append(c.children()),c.remove(),D.remove(),P.remove(),o.scrollLeft=t,o.scrollTop=e},this.scrollTo=function(e,o){s.scrollLeft=e,s.scrollTop=o,x.update()},this.scrollToX=function(e){s.scrollLeft=e,x.update()},this.scrollToY=function(e){s.scrollTop=e,x.update()},this.scrollBy=function(e,o){x.scrollTo(s.scrollLeft+e,s.scrollTop+o)},this.scrollByX=function(e){x.scrollToX(s.scrollLeft+e)},this.scrollByY=function(e){x.scrollToY(s.scrollTop+e)},this.scrollByLines=function(e){var o=parseInt(L.css("lineHeight"),10);x.scrollByY((isNaN(o)?1.5*parseInt(L.css("fontSize"),10):o)*e)},this.scrollByPages=function(e){x.scrollByY(f*e)},r()}var t=/Android|iP(hone|od|ad)|webOS|BlackBerry|Opera Mini|Mobile/i.test(window.navigator.userAgent),l={onChange:null,axis:"auto",wheelSpeed:120,disableOnMobile:!0};e.fn.mintScrollbar=function(n){return n=e.extend({},l,n),n.disableOnMobile&&t?this:this.each(function(){var t=e(this);t.data("mintScrollbar")||t.data("mintScrollbar",new o(this,n))})}});