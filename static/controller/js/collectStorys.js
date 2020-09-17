controller.collectStorys = {
	storys: {},
	
	collect: function() {
		$('.story-content').each(function(i, element){
			var id = $(element).attr('id');
			
			//adding storys to object
			controller.collectStorys.storys[id] = $(element);
			
			//removing storys from site
			var removed = $(element).remove();
			delete removed;

		});
	},
	
	init: function() {
		controller.collectStorys.collect();
	}
}

// $(function(){
// 	controller.collectStorys.init();
// });

//$(window).on('load', function() {
//	controller.collectStorys.init();
//});