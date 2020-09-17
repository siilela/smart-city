controller.animate = function(input) {
	var self = input.self;
	
	self.css('--duration', '');
	self.css('--delay', '');
	
	var set = {
		self: self,
		name: typeof(self.data('name')) !== 'undefined' ? self.data('name') : 'default',
		duration: typeof(self.data('duration')) !== 'undefined' ? parseInt(self.data('duration')) : 400,
		delay: typeof(self.data('delay')) !== 'undefined' ? parseInt(self.data('delay')) : 0,
		reset: typeof(self.data('reset')) !== 'undefined' ? !!self.data('reset') : false,
		callback: function(){return},
		removeClassBefore: []
	}
	
	$.extend(set, input);
	
	if(set.removeClassBefore.length) {
		for (var i = 0; i < set.removeClassBefore.length; i++) {
			self.removeClass(set.removeClassBefore[i]);
		}
	}
	
	var animate = function() {
		
		self[0].style.setProperty('--duration', set.duration + 'ms');
		self[0].style.setProperty('--delay', set.delay + 'ms');		
		
		var timeOutStyle = setTimeout(function(){
			self.addClass(set.name);	
		}, 150);
		
		
		//console.log('self', self);
		//console.log('name', set.name);
		//console.log('reset', set.reset);
		//console.log('removeClassBefore', set.removeClassBefore);
		
		//console.log('----------------');
		

		var timeout = setTimeout(set.callback, set.duration);
		
		if (set.reset) {
			self.one('animationend', function(e) {
				//console.log(e);
				//console.log('class reseted on ', self);
				self.removeClass(function (index, css) {
					return (css.match (/(^|\s)anim_\S+/g) || []).join(' ');
				});
				self.css('--duration', '');
				self.css('--delay', '');
			});
		}		
		
	}();
	
//	switch(set.name) {
//		case 'anim_puffInCenter':
//			puffInCenter();
//			break;
//		case 'anim_puffOutCenter':
//			puffOutCenter();
//			break;			
//		case 'anim_fadeOut':
//			fadeOut();
//			break;
//		case 'anim_fadeIn':
//			fadeIn();
//			break;			
//		default:
//			//console.log('animation not found');
//	}

}
