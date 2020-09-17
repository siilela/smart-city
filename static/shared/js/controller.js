
var clientID = getURLParameter('clientid') || clientID;

//    // all clients using the same token are part of the same site and may communicate which each other
// // different sites can exist on the same server, without interfering with each other
var token = getURLParameter('token');

//    // initialize the server connection
var socket = io('http://'+location.hostname+':8080/',{
    query: {
	    role: "control",
	    clientID: "player" + clientID,
	    token: token
    }
});


function getURLParameter(name) {
	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}



socket.on('connect', function(){
	$(".debug .connection.off").hide();
	$(".debug .connection.on").show();
});

socket.on('disconnect', function(reason){
	$(".debug .connection.on").hide();
	$(".debug .connection.off").show();
});
 



// route functions
function sendToMap(command,routeId,cb){

//	console.log("sendToMap",command,routeId,cb);
	socket.emit("PMSG", {
		"toType": "role",
		"to": "map",
		"from": "player" + clientID,
        "player": clientID,
        "command": command,
        "route": routeId
    },function(msg){
    	cb(msg)
    });
}



$(function(){
	$(".cid").html(clientID)
	$(".config .overlay").addClass("player"+clientID)

	$("body").addClass("player"+clientID)
})




socket.on("config hide", function(data){
	$(".config").hide();
});

socket.on("config show", function(data){
	$(".config").show();
});



socket.on("debug hide", function(data){
	$(".debug").hide();
});

socket.on("debug show", function(data){
	$(".debug").show();
});







socket.on("PMSG", function(data){
	//console.log("Player:",data)
	if(data.command == "endRoute"){
		//console.log('endRoute received case: ', data.route);
		
		switch(data.route){
			case 0:
				
//				console.log('clearing interval');
				clearTimeout(window.timeOut.skipIdleTimeout);
				delete window.timeOut.skipIdleTimeout;
				
				if(!window.idleAnimationSkipped) {
//					console.log('animation not skipped go to next slide and clear intervall');
					
					controller.story.gotoSlide("s1-5");	
					
				} else {
//					console.log('return from map skipped');
					window.idleAnimationSkipped = false;
				}
				
				break;
			case 2:
				
//				console.log('clearing interval');
				clearTimeout(window.timeOut.skipIdleTimeout);
				delete window.timeOut.skipIdleTimeout;
				
				if(!window.idleAnimationSkipped) {
//					console.log('animation not skipped go to next slide and clear intervall');
					
					controller.story.gotoSlide("s1-6");
					
				} else {
//					console.log('return from map skipped');
					window.idleAnimationSkipped = false;
				}				
				
				break;
			case 3:
				
//				console.log('clearing interval');
				clearTimeout(window.timeOut.skipIdleTimeout);
				delete window.timeOut.skipIdleTimeout;
				
				if(!window.idleAnimationSkipped) {
//					console.log('animation not skipped go to next slide and clear intervall');
					
					controller.story.gotoSlide("s2-3");
					
				} else {
//					console.log('return from map skipped');
					window.idleAnimationSkipped = false;
				}					
				
				break;
			case 5:
				
//				console.log('clearing interval');
				clearTimeout(window.timeOut.skipIdleTimeout);
				delete window.timeOut.skipIdleTimeout;
				
				if(!window.idleAnimationSkipped) {
//					console.log('animation not skipped go to next slide and clear intervall');
					
					controller.story.gotoSlide("s2-7");
					
				} else {
//					console.log('return from map skipped');
					window.idleAnimationSkipped = false;
				}				
				
				break;
			case 9:
				
//				console.log('clearing interval');
				clearTimeout(window.timeOut.skipIdleTimeout);
				delete window.timeOut.skipIdleTimeout;
				
				if(!window.idleAnimationSkipped) {
//					console.log('animation not skipped go to next slide and clear intervall');
					
					controller.story.gotoSlide("s4-5");
					
				} else {
//					console.log('return from map skipped');
					window.idleAnimationSkipped = false;
				}					
				
				break;
		}
	}
});