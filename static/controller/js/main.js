document.documentElement.addEventListener('touchmove', function (event) {
    event.preventDefault();      
}, false);


var controller = {}

controller.context = 'idle';


sendToMap("resetStory1", 0, function(msg){});
sendToMap("resetStory2", 0, function(msg){});
sendToMap("resetStory3", 0, function(msg){});
sendToMap("resetStory4", 0, function(msg){});
sendToMap("resetStory5", 0, function(msg){});
sendToMap("resetStory6", 0, function(msg){});


$(window).on('load', function(){
	$('.preloader-container').addClass('preloader-container_active');
	
	var pV = [];
	var totalVideos = $("video[data-src]").length;
	var loaded = 0;
	
	$("video[data-src]").each(function(){
		var url = $(this).data("src");
		var $element = $(this);

		pV.push(new Promise(function (resolve, reject) {

			var req = new XMLHttpRequest();
			req.open('GET', url, true);
			req.responseType = 'blob';

			req.onload = function () {
				if (this.status === 200) {
					loaded++;
//					console.log('loaded: ' + loaded + '/' + totalVideos);
//					console.log("load finish", url);
					
					$('.arrow-message').text('Loading: ' + loaded + '/' + totalVideos);
					
					var videoBlob = this.response;
					var vid = URL.createObjectURL(videoBlob);
					$element.attr("src", vid);
					resolve();
				} else {
					reject(this.status);
				}
			}
			req.onerror = function() {
			   reject(req.response);
			}

			req.send();
		}));
	});


 	Promise.all(pV).then(function(){
		console.log( "video all done"); 
		controller.collectStorys.init();
		$('.preloader-container')
				.addClass('anim_fadeOutIdle')
				.one('animationend', function(){
					$(this).remove();
				});
		
	}).catch(function (err) {
		console.error('Augh, there was an error!', err);
			
		$('.preloader-container').append('<button class="btn btn-error" onclick="window.location.reload();">Augh, there was an error! Try to reload</button>');
	});
});
