;(function(){
	$(document).ready(function(){ 
		var startX = 0; 
		var distanceX = 0;
		
		var $ul = $(".swiper-ul"); 
		var $lis = $(".swiper-ul li"); 
		var len = $(".swiper-ul li").length; 
		var $li_first = $lis.eq(0).clone();
		var $li_last = $lis.eq(len-1).clone(); 
		var _index = 0;
		var autoDiect = {
			diection:"left"
		}
		$width = $(".swiper-wrapper").width(); 
		var moveX = -$width;
		init(); 
//		位置初始化
		function init(){ 
			if($li_first && $li_last){
				$ul.append($li_first);
				$ul.prepend($li_last);
				$ul.width((len+2)*$width);
				$ul.css("transform","translate3D(-" +$width+ "px,0,0)")
				 
			} else {
				$ul.width(len*$width);
			}
			
			window.onresize = function(){
				$width = $(".swiper-wrapper").width(); 
				$ul.width(len*$width);  
			}
			var dothtml = '';
			for(var i=0; i<len; i++){
				dothtml += '<span></span>';
			}
			$(".pagedots").prepend(dothtml);
			$(".pagedots span").eq(_index).addClass("active").siblings().removeClass("active"); 
		}
	   
//		获取横轴X
		$(".swiper-ul").on("touchstart",function(e){ 
			clearInterval(autoTimer);
			var event = e.originalEvent.targetTouches[0];
			startX = event.pageX;   
		});
		
//		获取相对位移
		$(".swiper-ul").on("touchmove",function(e){
			e.preventDefault(); 
			var event = e.originalEvent.targetTouches[0]||e.originalEvent.changedTouches[0]; 
			var distanceX =  event.pageX - startX;
			var move = moveX + distanceX;
			var _css = {
				"transform":"translate3D("+move+"px,0,0)",
				"transition":"0"
			} 
			$ul.css(_css); 
		});
		
//		手指松开
		$(".swiper-ul").on("touchend touchcancel",function(e){
			e.preventDefault();
			var event = e.originalEvent.targetTouches[0]||e.originalEvent.changedTouches[0];
			var distance = event.pageX - startX; 
			if(distance <-30){ 
				toLeft(); 
			} else if(distance > 30){ 
				toRight();  
			}else {
				 backPos();
			} 
			   
		});
		function toLeft(){ 
				moveX = moveX -$width;  
				var _css2 = {
					"transform":"translate3D("+moveX+"px,0,0)",
					"transition":"200ms"
				} 
				$ul.css(_css2);
				_index+=1;
				if(_index >= len){
					_index = 0;
					moveDot(_index);
					moveX = -$width;
					setTimeout(function(){
					$ul.css({
						"transform":"translate3D("+moveX+"px,0,0)",
						"transition":"0ms"
					});
					},199);
 				}
				moveDot(_index);
		} 
			function backPos(){
				var _css3 ={
					"transform":"translate3D("+moveX+"px,0,0)",
					"transition":"200ms"
				}
				$ul.css(_css3);
			}
			function toRight(){ 
				moveX = moveX + $width; 
				var _css2 = {
					"transform":"translate3D("+moveX+"px,0,0)",
					"transition":"200ms"
				}
				$ul.css(_css2);
				_index-=1; 
				if(_index < 0){
				 	_index = len - 1; 
				 	moveDot(_index);
				 	moveX = -len*$width;
				 	setTimeout(function(){
				 		$ul.css({ 
							"transform":"translate3D("+moveX+"px,0,0)",
							"transition":"0ms" 
				 		});
				 	},199);
				 }
				moveDot(_index);
				 
			}
			function autoPlay(){ 
					if(autoDiect.diection == "left"){
						toLeft();
					}else if(autoDiect.diection == "right"){
						toRight();
					}
				}
			function moveDot(_index){
				if($(".pagedots span") == "undefined")return false;
				$(".pagedots span").eq(_index).addClass("active").siblings().removeClass("active");
				} 
				
			
			 
			
			var autoTimer = setInterval(function(){
				autoPlay();
			},2000);
			  
	}); 
}
)();