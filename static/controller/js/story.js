controller.story = {
	currentStory: '',
	
	events: function() {
		
		//closing story
		$(document).one('click', '.story-close', function() {
		
			var storyID =  $('.story-close-x').data("story");
			//console.log('resetting story ', storyID);
			
			
			//clear timeOuts
			$.each(window.timeOut, function(key, value){
				clearTimeout(value);
//				console.log('clearing: ', key + ' ' + value);
			})
			window.timeOut = {};
			
			if (storyID == 2) {				
				clearInterval(window.timeIntervall);
			}
			
			
			
				
			sendToMap("resetStory"+storyID, 0, function(msg){});
			
			//hide story
			$('.story-container')
				.addClass('anim_fadeOutStory')
				.one('animationend', function() {
					$("video").attr("data-src", "").attr("src", "");
					var content = $(this).removeClass(controller.removeAnimClasses).empty();
					delete content;
					
				});
			
			//show slider
			$('.slider-container')
				.removeClass(controller.removeAnimClasses)
				.addClass('anim_fadeInSlider');
			
			controller.context = 'slider';
		});




		$(document).on("click",".js-goToNextSlide",function(){
			if(!$(this).hasClass("hitted")){
				$(this).addClass("hitted");
				//console.log('clicked on js-goToNextSlide adding hittet to button. this is: ', this);
				//console.log('calling controller.story.nextSlide')
//				controller.story.nextSlide(this);
				controller.story.nextSlide(this);
			}
		})
		
	},


	nextSlide: function(e) {
		// console.log("do: controller.story.nextSlide")
		var $e = $(".story-container .story-slide.active");
		var $n = $e.next();
		$n.addClass("show");
		window.timeOut.nextSlide = setTimeout(function(){
			$e.removeClass("active")
			$n.addClass("active");
			controller.story.autoPlay($n);
			//console.log('window.timeOut from nextSlide calling autoplay', window.timeOut);
		},300);

		$e.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
			$e.removeClass("show");
		});
	},


	gotoSlide: function(slidename) {


		var $e = $(".story-container ."+slidename);
		$e.addClass("show");
		window.timeOut.gotoSlide = setTimeout(function(){
			$e.siblings().removeClass("active show")
			$e.addClass("active");
			controller.story.autoPlay($e);
			//console.log('window.timeOut from gotoSlide calling autoplay', window.timeOut);
			
			if(slidename == 's2-7') {
				//console.log('slide s2-7 callback');
				controller.story2.arrivedCB();
			}

		},300);


	},

	autoPlay: function($e) {
		//console.log("autoPlay", $e);
		
		if($e.find(".autoplay").length>0){
			//console.log("autoPlay video");
			var delay = typeof($e.find(".autoplay").data("delay")) !== 'undefined' ? $e.find(".autoplay").data("delay") : 0;
			
			window.timeOut.video = setTimeout(function(){
				var video = $e.find(".autoplay").get(0);
				$e.find(".autoplay").get(0).play();
				//console.log('window.timeOut from autoPlay video', window.timeOut);
				//console.log('playing video: ', video);
				//console.log('_______________');
			},delay);
		}

		if($e.hasClass("js-storyAutoPlay")){
			//console.log("autoPlay slide");
			var delay = $e.data("wait");
			window.timeOut.slide = setTimeout(function(){
				controller.story.nextSlide();
				//console.log('window.timeOut from storyAutoPlay, calling nextSlide', window.timeOut);
				//console.log('_______________');
			},delay);
		}
		
	},

	getRouteByStoryID: function(storyID){
		route = 0
		switch(storyID){
			case "1":
				route = 0;
				break;
			case "2":
				route = 3;
				break;
			case "3":
				route = 6;
				break;
			case "4":
				route = 8;
				break;
			case "5":
				route = 12;
				break;
			case "6":
				route = 13;
				break;				
		};

		return route;
	},
	
	init: function(id) {
		
		if($('.story-container').hasClass('story-content_debug')) {
			
			var slides = $('.story-slide');
			
			slides.each(function(i,e){
				
				if( typeof($(e).attr('data-wait')) !== 'undefined'){
					$(e).attr('data-wait', 10);
				}
			
				
				
			});				
		}
		
		window.timeOut = {};
		window.idleAnimationSkipped = false;


		controller.story.events();
		controller.story.currentStory = $('#' + id);
		
		var currentStory = id.substr(-1,1);
		
		switch(currentStory){
			case "1":
				controller.story1.init(id);
				//console.log('initializing story ', id);
				break;
			case "2":
				controller.story2.init(id);
				//console.log('initializing story ', id);
				break;
			case "3":
				controller.story3.init(id);
				//console.log('initializing story ', id);
				break;
			case "4":
				controller.story4.init(id);
				//console.log('initializing story ', id);
				break;
			case "5":
				controller.story5.init(id);
				//console.log('initializing story ', id);
				break;
			case "6":
				controller.story6.init(id);
//				console.log('initializing story ', id);
				break;				
		};
		
		
	},
	
	idleSkipping: function(slide, time) {
		clearTimeout(window.timeOut.skipIdleTimeout);
		
		window.timeOut.skipIdleTimeout = setTimeout(function () {
			window.idleAnimationSkipped = true;
			controller.story.gotoSlide(slide);
			console.log('skipping idle animation');
		}, time);
		
	}
}



controller.globalEvents = {
	story1: function() {
		//slide 8 notification
		$(document).on("click",'.js-s1-8-notification',function(){
			if(!$(this).hasClass("alreadyClicked")){
				$(this).addClass("alreadyClicked");
				
				var target = $('#js-s1-8-notification').addClass('active');
				$(this).closest('.over').addClass('continueAnimation');				
				
			}
		})
		
		//slide 9
		$(document).on("click",'.js-goToConversation',function(){
			if(!$(this).hasClass("alreadyClicked")){
				$(this).addClass("alreadyClicked");
				
				$('.s1-9-animation').addClass('active');
				
			}			
		})
		
		$(document).on("click",'.js-endConversation',function(){
			if(!$(this).hasClass("alreadyClicked")){
				$(this).addClass("alreadyClicked");
				
				$('.s1-9-animation').addClass('continue-s1-9');
				
			}			
		})		
		
		$(document).on("click",".js-s1-1",function(){
			if(!$(this).hasClass("alreadyClicked")){
				$(this).addClass("alreadyClicked");
				
				sendToMap("s1-1",0, function(msg){});	
				
			}						
		})

		$(document).on("click",".js-s1-2",function(){
			if(!$(this).hasClass("alreadyClicked")){
				$(this).addClass("alreadyClicked");
				
				sendToMap("s1-2",0, function(msg){});				
				controller.story.idleSkipping('s1-5', 20000);	
				
			}					
		})

		$(document).on("click",".js-s1-3",function(){
			if(!$(this).hasClass("alreadyClicked")){
				$(this).addClass("alreadyClicked");
				
				sendToMap("s1-3",0, function(msg){});				
				controller.story.idleSkipping('s1-6', 2000);			
				
			}						
			
		})
		
	},
	
	story2: function() {
		$(document).on("click","#story-content-2 .js-s2-1", function(){
			if(!$(this).hasClass("alreadyClicked")){
				$(this).addClass("alreadyClicked");
				
				sendToMap("s2-1",0, function(msg){});				
				controller.story.idleSkipping('s2-3', 20000);			
				
			}						
		})

		$(document).on("click","#story-content-2 .js-s2-2", function(){
			if(!$(this).hasClass("alreadyClicked")){
				$(this).addClass("alreadyClicked");
				
				sendToMap("s2-2",0, function(msg){});
//				controller.story.idleSkipping('s2-7', 20000);	
				
			}
		})

		 $(document).on("click","#story-content-2 .js-s2-3", function(){
			if(!$(this).hasClass("alreadyClicked")){
				$(this).addClass("alreadyClicked");
				
				sendToMap("s2-3",0, function(msg){});
				controller.story.idleSkipping('s2-7', 20000);			
			}			
		})

		$(document).on("click","#story-content-2 .js-s2-7-approve", function(){
			if(!$(this).hasClass("alreadyClicked")){
				$(this).addClass("alreadyClicked");
				
				$('.s2-7').addClass('payment-approved');
			}			
		})		
	},	

	story3: function() {
		$(document).on("click","#story-content-3 .js-s3-1",function(){
			if(!$(this).hasClass("alreadyClicked")){
				$(this).addClass("alreadyClicked");
				
				controller.story.nextSlide(this);
			}							
		})
		

		$(document).on("click","#story-content-3 .js-s3-2",function(){
			if(!$(this).hasClass("alreadyClicked")){
				$(this).addClass("alreadyClicked");
				
				$(".js-s1-4-target").addClass("active");
			}			
		})
		

		$(document).on("click","#story-content-3 .js-s3-4",function(){
			if(!$(this).hasClass("alreadyClicked")){
				$(this).addClass("alreadyClicked");
				
				sendToMap('s3-4',0, function(msg){}); 
				controller.story.nextSlide(this);	
			}
		})


		$(document).on("click","#story-content-3 .js-s3-5",function(){
			if(!$(this).hasClass("alreadyClicked")){
				$(this).addClass("alreadyClicked");
				
				sendToMap('s3-5',0, function(msg){}); 
				controller.story.nextSlide(this);	
			}
		})


		$(document).on("click","#story-content-3 .js-s3-6",function(){
			if(!$(this).hasClass("alreadyClicked")){
				$(this).addClass("alreadyClicked");
				
				sendToMap('s3-6',0, function(msg){}); 
				controller.story.nextSlide(this);	
			}
		})			


		$(document).on("click","#story-content-3 .js-s3-7",function(){
			if(!$(this).hasClass("alreadyClicked")){
				$(this).addClass("alreadyClicked");
				
				sendToMap("s3-3",0, function(msg){});
			}			
		})		
	},	

	story4: function() {
		$(document).on("click", "#story-content-4 .js-calc-btn", function () {
			if(!$(this).hasClass("alreadyClicked")){
				$(this).addClass("alreadyClicked");
				
				var fee = 20 - ($("#story-content-4 .js-calc-btn:checked").length * 5)
				$("#story-content-4 .js-calc-total").html(fee);
				if (fee < 20) {
					$("#story-content-4 .js-calc-next").removeAttr("disabled")
				} else {
					$("#story-content-4 .js-calc-next").attr("disabled", "disabled")
				}				
			}
		})

		$(document).on("click", "#story-content-4 .js-calc-next", function () {
			if(!$(this).hasClass("alreadyClicked")){
				$(this).addClass("alreadyClicked");
				
				$("#story-content-4 .js-calc").addClass("showB")
				window.timeOut.story4_1 = setTimeout(function () {
					controller.story.nextSlide();
					sendToMap("s4-3", 0, function (msg) {});
//					console.log('window.timeOut ', window.timeOut);
				}, 5000)
				
				controller.story.idleSkipping('s4-5', 20000);	
			}			
		})



		$(document).on("click", "#story-content-4 .js-s4-3", function () {
			if(!$(this).hasClass("alreadyClicked")){
				$(this).addClass("alreadyClicked");
				
				sendToMap("s4-4", 0, function (msg) {});	
			}
		})
		
	},	

	story5: function() {

		$(document).on("click","#story-content-5 .js-s5-1",function(){
			if(!$(this).hasClass("alreadyClicked")){
				$(this).addClass("alreadyClicked");
				
				sendToMap("s5-1",0, function(msg){});
			}			
			
		});
	
	},
	
	story6: function() {

		$(document).on("click","#story-content-6 .js-s6-2",function(){
			if(!$(this).hasClass("alreadyClicked")){
				$(this).addClass("alreadyClicked");
				
				sendToMap("s6-1", 0, function(msg){});
			}			
			
		});
		
		$(document).on("click","#story-content-6 .js-s6-5",function(){
			if(!$(this).hasClass("alreadyClicked")){
				$(this).addClass("alreadyClicked");
				
				sendToMap("s6-2", 0, function(msg){});
			}			
			
		});		
	
	},
	
	init: function() {
		controller.globalEvents.story1();
		controller.globalEvents.story2();
		controller.globalEvents.story3();
		controller.globalEvents.story4();
		controller.globalEvents.story5();
		controller.globalEvents.story6();
	}
}

controller.globalEvents.init();

controller.story1 ={

	init: function(id) {
		controller.story.autoPlay($(".story-container .story-slide.active"));
	}
}

controller.story2 ={
	
	vidStoped: false,
		
	flowerVideo: $('#flowerPower').children('video').get(0),
	
	arrivedCB: function() {
	
		var flowerVideo = $('#flowerPower').children('video').get(0);

		
		//start video
		$('.s2-7').addClass('s2-7-statAnimation');

		var i = 0;
		
		window.timeIntervall = setInterval(function() {
			//console.log('inside setInterval');
			i++;
			if(i > 50) {
				clearInterval(window.timeIntervall);
				//console.log('skipping');
				flowerVideo.pause();
			}
			
			if (flowerVideo.currentTime >= 1.75) {
				flowerVideo.pause();
				clearInterval(window.timeIntervall);
				//console.log('timeIntervall cleared inside setInterval');
				//console.log('video paused');
			}

		}, 100);

		
		$(document).one("click", ".js-s2-7-openTrunk", function(){
			flowerVideo.play();
			$('.s2-7').addClass('s2-7-trunkOpened');
			
			
			window.timeOut.flowerVideoEnded = setTimeout(function(){
				controller.story.gotoSlide('s2-8');
				//console.log('window.timeOut ', window.timeOut);
			}, 7000);			
			
		});	
			
	
	},
	
	init: function(id) {
		controller.story.autoPlay($(".story-container .story-slide.active"));
	}
}

controller.story3 ={
	binds: function(id) {
		var hotelVideo = $('.s3-8 video').get(0);
		
		hotelVideo.onended = function() {
			//console.log('video ended, next slide in 0.8s');
			window.timeOut.hotelVideo = setTimeout(function(){
				controller.story.nextSlide();
			}, 100);
		};			
		
	},

    init: function(id) {
		controller.story.autoPlay($(".story-container .story-slide.active"));
		controller.story3.binds(id);
        if(controller.story.currentStory.data("story") == 3){
        	sendToMap("s3-1",0, function(msg){});

        	window.timeOut.story3 = setTimeout(function(){
        		sendToMap("s3-2",0, function(msg){});
				//console.log('window.timeOut ', window.timeOut);
        	},3000)
        }
    }
}



controller.story4 ={
    binds: function(id) {

		var toTownVideo = $('.s4-1').find('video').get(0);
		
		if(toTownVideo && $('.s4-1').hasClass('active')) {
			toTownVideo.onended = function() {
				//console.log('video ended, next slide in 0.8s');
				window.timeOut.toTownVideo = setTimeout(function(){
					controller.story.nextSlide();
					//console.log('window.timeOut ', window.timeOut);
				}, 800);
			};			
		} 

	},
	init: function(id) {
		controller.story4.binds(id);
		controller.story.autoPlay($(".story-container .story-slide.active"));
		if(controller.story.currentStory.data("story") == 4){
			sendToMap("s4-1",0, function(msg){});

			window.timeOut.story4_2 = setTimeout(function(){
				sendToMap("s4-2",0, function(msg){});
				//console.log('window.timeOut ', window.timeOut);
			},3000)
		}
	}
}


controller.story5 ={
	binds: function(id) {
		var endVideo = $('.s5-4 video').get(0);
		
		endVideo.onended = function() {
			window.timeOut.endVideo = setTimeout(function(){
				controller.story.nextSlide();
			}, 100);
		};			
		
	},
	
	init: function(id) {
		controller.story.autoPlay($(".story-container .story-slide.active"));
		controller.story5.binds(id);
	}
}


controller.story6 ={
	binds: function(id) {
		var endVideo6 = $('.s6-7 video').get(0);
		
		endVideo6.onended = function() {
			window.timeOut.endVideo6 = setTimeout(function(){
				controller.story.nextSlide();
			}, 100);
		};	
	},
	
	init: function(id) {
		controller.story.autoPlay($(".story-container .story-slide.active"));
		controller.story6.binds(id);
	}
}

