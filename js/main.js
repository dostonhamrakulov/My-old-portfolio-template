jQuery(document).ready(function($){
	//set slider animation parameters
	var duration = 400,
		epsilon = (1000 / 60 / duration) / 3,
		customMinaAnimation = bezier(.42,.03,.77,.63, epsilon);

	//define a radialSlider object
	var radialSlider = function(element) {
		this.element = element;
		this.slider = this.element.find('.cd-radial-slider');
		this.slides = this.slider.children('li');
		this.slidesNumber = this.slides.length;
		this.visibleIndex = 0;
		this.nextVisible = 1;
		this.prevVisible = this.slidesNumber - 1;
		this.navigation = this.element.find('.cd-radial-slider-navigation');
		this.animating = false;
		this.mask = this.element.find('.cd-round-mask');
		this.leftMask = this.mask.find('mask').eq(0);
		this.rightMask = this.mask.find('mask').eq(1);
		this.bindEvents();
	}

	

	radialSlider.prototype.updateIndexes = function(direction) {
		if(  direction == 'next' ) {
			this.prevVisible = this.visibleIndex;
			this.visibleIndex = this.nextVisible;
			this.nextVisible = ( this.nextVisible + 1 < this.slidesNumber) ? this.nextVisible + 1 : 0;
		} else {
			this.nextVisible = this.visibleIndex;
			this.visibleIndex = this.prevVisible;
			this.prevVisible = ( this.prevVisible > 0 ) ? this.prevVisible - 1 : this.slidesNumber - 1;
		}
	}

	radialSlider.prototype.updateSlides = function(direction) {
		var self = this;

		//store the clipPath elements which need to be animated/updated
		var clipPathVisible = Snap('#'+this.slides.eq(this.visibleIndex).find('circle').attr('id')),
			clipPathPrev = Snap('#'+this.slides.eq(this.prevVisible).find('circle').attr('id')),
			clipPathNext = Snap('#'+this.slides.eq(this.nextVisible).find('circle').attr('id'));

		var radius1 = this.slider.data('radius1'),
			radius2 = this.slider.data('radius2'),
			centerx = ( direction == 'next' ) ? this.slider.data('centerx2') : this.slider.data('centerx1');

		this.slides.eq(this.visibleIndex).addClass('is-animating').removeClass('next-slide prev-slide');

		if( direction == 'next' ) {
			//animate slide content
			this.slides.eq(this.visibleIndex).addClass('content-reveal-left');
			this.slides.eq(this.prevVisible).addClass('content-hide-left');
			//mask slide image to reveal navigation round element
			this.slides.eq(this.visibleIndex).find('image').attr('style', 'mask: url(#'+this.leftMask.attr('id')+')');



		};
	};
});
