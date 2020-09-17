
$(function(){
	
	
	$(document).on('click', '.killAnimation', function() {
		$('.story-container').toggleClass('story-content_debug');
		$(this).toggleClass('killAnimation_active');

	});	

	$(document).on("click",'.player .p0',function(){
		var t = this;
		sendToMap("showStartPoint",getRoute($(this)),function(msg){
			console.log(msg)
			if(msg == "done"){
				$(t).addClass("done");
			}
		});
	})

	$(document).on("click",'.player .p1',function(){
		var t = this;
		sendToMap("showCar",getRoute($(this)),function(msg){
			console.log(msg)
			if(msg == "done"){
				$(t).addClass("done");
			}
		});
	})

	$(document).on("click",'.player .p2',function(){
		var t = this;
		sendToMap("showLine",getRoute($(this)),function(msg){
			console.log(msg)
			if(msg == "done"){
				$(t).addClass("done");
			}
		});
	})

	$(document).on("click",'.player .p4',function(){
		var t = this;
		sendToMap("driveCar",getRoute($(this)),function(msg){
			console.log(msg)
			if(msg == "done"){
				$(t).addClass("done");
			}
		});
	})

	$(document).on("click",'.player .p5',function(){
		var t = this;
		sendToMap("showEndPoint",getRoute($(this)),function(msg){
			console.log(msg)
			if(msg == "done"){
				$(t).addClass("done");
			}
		});
	})

	$(document).on("click",'.player .p7',function(){
		var t = this;
		sendToMap("showAll",getRoute($(this)),function(msg){
			console.log(msg)
			if(msg == "done"){
				$(t).siblings().removeClass("done");
			}
		});
	})

	$(document).on("click",'.player .p6',function(){
		var t = this;
		sendToMap("resetRoute",getRoute($(this)),function(msg){
			console.log(msg)
			if(msg == "done"){
				$(t).siblings().removeClass("done");
			}
		});
	})

});


// helper function
function getRoute($e){
	return $e.parents(".player").find(".pr").val()
}

