
/*
 * 
 *create by mrlee  
 * 2016/09/02
 * */
;(function (name, definition) {
    if (typeof define === 'function') {
        define(definition);
    } else {
        this[name] = definition();
    }
})(".swiper-wrapper",function(){
	 /**
     *
     * @param options
     * @constructor
     */
    function Swiper(options){
    	this._default = {container:".swiper",items:".swiper-li",activeClass:".active",threshold:50,duration:300};
    	this._options = extend(this._default, options);
    	this._star:{};
    	this._move:{};
    	
    	
    	this.$swiper = document.querySelector(this._options.container);
    	this.$swiperli = document.querySelector(this._options.items);
    	this.count = this.$swiperli.length;
    	
    	
    	
    }
    
    
    
    
});











