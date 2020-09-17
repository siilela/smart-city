controller.slider = {
	
	setup: function() {
		$('.slider').slick({
			cssEase: 'cubic-bezier(.41,.17,.57,1)',
			speed: 750,
			nextArrow: '<div class="slider-next slider-navigation"><div class="slider-next-arrow">lol</div></div>',
			prevArrow: '<div class="slider-prev slider-navigation"><div class="slider-prev-arrow">lol</div></div>',
			dotsClass: 'slider-dots',
			dots: false,
			arrows: false,
			centerMode: true,
			centerPadding: '15%',
			slidesToShow: 1,
			slidesToScroll: 1,
			infinite: true,
			edgeFriction: 0.2,
			touchThreshold: 8
		});			
	},
	
	openStory: function(input) {
		var story = input;
		
		//reset story container
//		$('.story-container').html('');
		var emptyStory = $('.story-container').empty();
		delete emptyStory;
		
		//appending story
		$('.story-container').append(controller.collectStorys.storys[story].clone());
		
//		//fade out Slider
		$('.slider-container')
			.removeClass(controller.removeAnimClasses)
			.addClass('anim_fadeOutSlider');
			
		
		//fade in story
		$('.story-container')
			.removeClass(controller.removeAnimClasses)
			.addClass('anim_fadeInStory');

		var storyID= story.substr(-1,1);
		var route = controller.story.getRouteByStoryID(storyID);
		
		sendToMap("showCar",route, function(msg){});

		
		
		//init story and pass current story selection
		controller.context = 'story';
		controller.story.init(story);
		
	},
	
	events: function() {
		$(document).on('click', '.slider-content', function() {
			if(controller.context=="slider"){
				var target = $(this).data('target');
				controller.slider.openStory(target);	
			}
		});
	},
	
	init: function() {
		controller.slider.setup();
		controller.slider.events();
	}
}


$(function(){
	controller.slider.init();
});