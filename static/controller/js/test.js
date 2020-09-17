$(function(){




	$(document).on("click",".story-control .next",function(e){
		e.preventDefault()

		var $e = $(this).parents(".story-content").find(".active");
		$e.next().addClass("show");
		setTimeout(function(){
			$e.removeClass("active").next().addClass("active");
		},300);

		$e.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
			$e.removeClass("show");
		});
		console.log($e.index(),$(this).parent().data("story"));

		 location.hash = "#s"+$(this).parent().data("story")+"-"+($e.index()+1)
	})
	$(document).on("click",".story-control .prev",function(e){
		e.preventDefault()

		var $e = $(this).parents(".story-content").find(".active");
		$e.prev().addClass("show");
		setTimeout(function(){
			$e.removeClass("active").prev().addClass("active");
		},300);

		$e.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
			$e.removeClass("show");
		});
		console.log($e.index(),$(this).parent().data("story"));

		 location.hash = "#s"+$(this).parent().data("story")+"-"+($e.index()-1)
	})

	$(document).on("click",".story-control .reload",function(e){
		e.preventDefault()
		$e.removeClass("active");
		setTimeout(function(){
			$e.addClass("active");
		},300);

	})


	///#s1-1
	var hash = location.hash.substr(1);
	if(hash.substr(0,1) == "s"){

		$("[data-target='story-content-"+hash.substr(1,1)+"']")[0].click()
		var $e = $("."+hash);
		$e.addClass("show active").siblings().removeClass("show active");

		

	}
	
});
