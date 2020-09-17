controller.idle = {
	views: $('.view'),
	
	idleTimeCounter: 0,
	intervallTime: 1000, // in ms 1000 = 1s check time
	idleTime: 5 * 60, // 5 * 60 = 5min
//	idleTime: 5 * 60 * (0.1/ 3), // 10sec
	
	idleCheck: function() {
		idleInterval = setInterval(controller.idle.timerIncrement, controller.idle.intervallTime);

		controller.idle.addEvents();
	},
	
	addEvents: function() {
		//Zero the idle timer on mouse movement.
		$(document).on('mousemove', controller.idle.resetIdleTime);		
		$(document).on('keypress', controller.idle.resetIdleTime);		
	},
	
	removeEvents: function() {
		$(document).off('mousemove', controller.idle.resetIdleTime);		
		$(document).off('keypress', controller.idle.resetIdleTime);		
	},
	
	resetIdleTime: function() {
		controller.idle.idleTimeCounter = 0;
	},
	
	timerIncrement: function() {
		
		controller.idle.idleTimeCounter++;
//		console.log('idletimer increment', controller.idle.idleTimeCounter);
		
		if (controller.idle.idleTimeCounter > controller.idle.idleTime) {
			//console.log('context', controller.context);
			var idleScreen = $('#controller-idleScreen');
			
//			if in story visible
			if (controller.context === 'story') {
				$('.story-container')
					.removeClass(controller.removeAnimClasses)
					.addClass('anim_fadeOutStory')
					.one('animationend', function() {
						$(this).html('');
					});
			} else if (controller.context === 'slider') {
				$('.slider-container')
					.removeClass(controller.removeAnimClasses)
					.addClass('anim_fadeOutSlider')
			}
			
			if (controller.context === 'story') {
				//reset map
				var storyID =  $(document).find('.story-close-x').data("story");
				//console.log('resetting story ', storyID);

				sendToMap("resetStory"+storyID, 0, function(msg){});				

				//clear StoryTimeOuts
				$.each(window.timeOut, function(key, value){
					clearTimeout(value);
				})
				window.timeOut = {};					
			}
			
			//fade in idleScreen
			$('.idleScreen-container')
				.removeClass(controller.removeAnimClasses)
				.addClass('anim_fadeInIdle')
				.on('animationend', function(e){
					//remove current story on animationend
					if (e.originalEvent.animationName === 'fadeInIdle') {
						
						//remove story
						$('.story-container').html('');
						
						var currentTime = new Date();
						var timePassed = Math.round((currentTime - window.loadTimestamp) / 1000);
						console.log('timePassed ', timePassed);
						
						var timeThreshold = 3 * 60 * 60 // 3h in seconds
//						var timeThreshold = 30 // 30 seconds
						
						if(timePassed > timeThreshold) {
							window.location.reload();
						}
						
					}
				});
			

			
			//console.log('going to idle screen');
			
			controller.idle.removeEvents();
			window.clearInterval(idleInterval);
			controller.context = 'idle';
		}	
	},
	
	init: function() {
		controller.idle.idleCheck();	

		$(document).on('click', '#cancelIdleScreen', function(e){
			e.stopPropagation();
			//show slider
			$('.slider-container')
				.removeClass(controller.removeAnimClasses)
				.addClass('anim_fadeInSlider');			
			
			//hide idleScreen
			$('.idleScreen-container')
				.addClass('anim_fadeOutIdle')
				.one('animationend', function(){
					$(this).removeClass(controller.removeAnimClasses);					
				});

			
			//restart idle check
			controller.context = 'slider';
			controller.idle.idleTimeCounter = 0;
			window.clearInterval(idleInterval);
			controller.idle.idleCheck();
			
		});	
	}
}



$(function(){
	controller.idle.init();
	window.loadTimestamp = new Date();
//	console.log(window.loadTimestamp);
});