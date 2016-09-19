var mySwiper = function(opts){
		var defaults = {
			swiperwraper:".swiper-wrapper",
			swiperul:".swiper-ul",
			swiperli:".swiper-ul li",
		}
		var options = $.extend({},defaults,opts);
		
		var startX = 0; 
		var distanceX = 0;
		var moveX = 0;
		var _index = 0;
		var $ul = $(options.swiperul); 
		
		var $lis = $(options.swiperli); 
		 
		var len = $lis.length;  
		
		var autoDiect = {
			diection:"left"
		}
		$width = $(options.swiperwraper).width(); 
		 
		 init(len,$width);
//		获取横轴X
		$ul.on("touchstart",function(e){
//			e.preventDefault();
			clearInterval(autoTimer);
			var event = e.originalEvent.targetTouches[0];
			startX = event.pageX;  
			
		});
		
//		获取相对位移
		$ul.on("touchmove",function(e){
//			e.preventDefault(); 
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
		$ul.on("touchend",function(e){
//			e.preventDefault();
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
		//		位置初始化
		function init(){  
			$ul.width(len*$width);
			window.onresize = function(){
				$width = $(options.swiperwraper).width(); 
				console.log($width);
				$ul.width(len*$width);  
			}
			var dothtml = '';
			for(var i=0; i<len; i++){
				dothtml += '<span></span>';
			}
			$(".pagedots").prepend(dothtml);
			$(".pagedots span").eq(_index).addClass("active").siblings().removeClass("active");
			 
		}  
		function toLeft(){
				if(_index >= len-1){
					backPos(); 
					autoDiect.diection = "right"; 
					return false;
				}
				moveX = moveX -$width;  
				var _css2 = {
					"transform":"translate3D("+moveX+"px,0,0)",
					"transition":"200ms"
				} 
				$ul.css(_css2);
				_index+=1;
				$(".pagedots span").eq(_index).addClass("active").siblings().removeClass("active");
		} 
			function backPos(){
				var _css3 ={
					"transform":"translate3D("+moveX+"px,0,0)",
					"transition":"200ms"
				}
				$ul.css(_css3);
			}
			function toRight(){
				if(_index <= 0){
				 	backPos();
				 	autoDiect.diection = "left";
				 	 
				 	return false;
				 }
				moveX = moveX + $width; 
				var _css2 = {
					"transform":"translate3D("+moveX+"px,0,0)",
					"transition":"200ms"
				}
				$ul.css(_css2);
				_index-=1;
				$(".pagedots span").eq(_index).addClass("active").siblings().removeClass("active");
			} 
			function autoPlay(){
				 
				if(autoDiect.diection == "left"){
					toLeft();
				}else if(autoDiect.diection == "right"){
					toRight();
				}
			} 
			var autoTimer = setInterval(function(){
				autoPlay();
			},2000);  
	} 
		  var myswiper = new mySwiper();
		  