var hitboxsize = 0


$(function(){
	initRoutes()

	// showStartPoint(1,0)
	 // showCar(1,0)

	 //  showLine(1,0)


	 // showEndPoint(1,0)
	 // showEndPoint(1,1)
	 // showEndPoint(1,2)
	 // showEndPoint(1,3)
	 // showEndPoint(1,4)
	 // showEndPoint(1,5) 
	 // showEndPoint(1,6)
	 // showEndPoint(1,7)
	 // showEndPoint(1,8)
	 // showEndPoint(1,9)
	 // showEndPoint(1,10)
	 // showEndPoint(1,11)


});


var carSpeed = 750;
// var carSpeed = 100;
var Routes = {};

var idleRoutes = [5,7,8,9];


function initRoutes(){
	mapscale = $("body").width()/1920;
	hitboxsize = 96  * mapscale
	//console.log(hitboxsize);
	$(".carRoute").each(function(index){
		initRoute($(this),index);
	}).promise().done( function(){ 
		//console.log("init done");
		//console.log('speed: ', carSpeed);
		$(".map-wrapper").show();
		for (var i in idleRoutes) {
		  startIdleAnimation(idleRoutes[i]);
		}

	});
}



function initRoute($e, index){
	var r = $e.find(".route").get(0)
	var pathLength = r.getTotalLength();
	var duration = carSpeed * pathLength / 100;
	var endPoint =  r.getPointAtLength(pathLength);

	// $e
	// .find(".endPoint")
	// 	.css("transform","translate("+endPoint.x+"px, "+endPoint.y+"px)")

	$e
	.find("animateMotion")
		.attr("dur",duration+"ms")

	$("."+$e.data("id")).css("transform","translate("+endPoint.x+"px, "+endPoint.y+"px)")
}








function playerStart(playerID){
	// resetRoute(playerID,0);
	// // resetRoute(playerID,1);
	// resetRoute(playerID,2);
	// // resetRoute(playerID,3);
	// resetRoute(playerID,4);
	// resetRoute(playerID,5);
	// resetRoute(playerID,6);
	// resetRoute(playerID,7);
	// resetRoute(playerID,8);
	// resetRoute(playerID,9);
	// resetRoute(playerID,10);
	// resetRoute(playerID,11);
	// resetRoute(playerID,12);
	$(".js-playermap.player"+playerID).removeClass("idle");
}



function playerEnd(playerID){
	console.log("playerEnd",playerID);
	// $(".js-playermap.player"+playerID).addClass("idle");
	// startIdleAnimation(playerID);

}









// route functions
function showCar(playerID,routeId){
	var $sp = $("#carRoute"+ playerID + "-" + routeId + " .startPoint");
	$("#car" + playerID)
		.css("transform","translate("+$sp.attr("x")+"px, "+$sp.attr("y")+"px)")
		.css("transform-origin",$sp.attr("x")+"px "+$sp.attr("y")+"px")
		.removeClass("hide");
}

function showStartPoint(playerID,routeId){
	$("#carRoute"+ playerID + "-" + routeId + " .startPoint").removeClass("hide");
}

function showLine(playerID,routeId){
	$("#carRoute"+ playerID + "-" + routeId + " .route").addClass("start");
}

function hideLine(playerID,routeId){
	$("#carRoute"+ playerID + "-" + routeId + " .route").removeClass("start");
}

function driveCar(playerID,routeId){
	$("#carRoute"+ playerID + "-" + routeId + " .ani").get(0).beginElement();
	$("#car" +playerID).addClass("drive");
}

function showEndPoint(playerID,routeId){
	// $("#carRoute"+ playerID + "-" + routeId + " .endPoint").removeClass("hide");
	$(".endPointRoute"+ playerID + "-" + routeId).removeClass("hide");
}

function hideEndPoint(playerID,routeId){
	// $("#carRoute"+ playerID + "-" + routeId + " .endPoint").addClass("hide");
	$(".endPointRoute"+ playerID + "-" + routeId).addClass("hide");
}

function showAll(playerID,routeId){
	showStartPoint(playerID,routeId)
	showCar(playerID,routeId)
	showLine(playerID,routeId)
	showEndPoint(playerID,routeId)

	driveCar(playerID,routeId)
}

function resetRoute(playerID,routeId){
	$("#car" +playerID).removeClass("drive").addClass("hide");
	var h = $("#carRoute"+ playerID + "-" + routeId).clone()
	var p = $("#carRoute"+ playerID + "-" + routeId).parent()
	$("#carRoute"+ playerID + "-" + routeId).remove()
	p.prepend(h)

	//startPoint
	$("#carRoute"+ playerID + "-" + routeId + " .startPoint").addClass("hide");
	//route
	$("#carRoute"+ playerID + "-" + routeId + " .route").removeClass("start");
	//endPoint
	// $("#carRoute"+ playerID + "-" + routeId + " .endPoint").addClass("hide");
	$(".endPointRoute"+ playerID + "-" + routeId).addClass("hide");
	
	// clearHitCheck(playerID)

}


function endRoute(playerID,route){
	// showLineEnd(playerID,route)
}

function endDrive(playerID,route){
	// clearHitCheck(playerID)

	if($(".js-playermap.player"+playerID).hasClass("idle")){

		if($.inArray(playerID,idleRoutes)){
			var curStep = idleAnimationObj["player"+playerID];

			if(curStep >= 10){
				curStep = 1;
			}
			
			setTimeout(function(){
				$.each(idleAnimationObj["steps"][curStep],function(key,command){
					mapControl({
						command: command,
						player: playerID,
						route: 0
					});
				})

				idleAnimationObj["player"+playerID] = curStep + 1;
			}, carSpeed*3)

		}	

		
	

	}else{
		sendToPlayer(playerID,"endRoute", route, function(msg){});
	}
	
}





var idleAnimationObj = {
	"player1":1,
	"player2":1,
	"player3":1,
	"player4":1,
	"player5":1,
	"player6":1,
	"player7":1,
	"player8":1,
	"player9":1,
	"player10":1,
	"steps":[
		[""],
		["s1-3"],

		["resetStory1","showCar","s2-1"],
		["s2-2"],
		["s2-3"],

		["resetStory2","showCar","s3-1","s3-2"],
		["s3-3"],

		["resetStory3","showCar","s4-1","s4-2"],

		["resetStory4","showCar","s5-1"],

		["resetStory5","showCar","s1-1","s1-2"],


	]

}



function startIdleAnimation(player){

	mapControl({
		command:"showCar",
		player: player,
		route:0
	});
	mapControl({
		command:"s1-1",
		player: player
	});
	mapControl({
		command:"s1-2",
		player: player
	});
}
















// var intervals = [];

// function startHitCheck(playerID){
// 	clearHitCheck(playerID)
// 	$(".js-playermap").each(function(k){
// 		checkPlayerID = $(this).data("player")
// 		if(checkPlayerID != playerID ){
// 			if(!intervals["player" + playerID]){
// 				intervals["player" + playerID] = []
// 			}

// 			intervals["player" + playerID].push(setHitCheckInterval(playerID,checkPlayerID));
// 		}
// 	});
// }

// function setHitCheckInterval(playerID,checkPlayerID){
// 	return setInterval(function(){
// 		console.log("init hittest for: ",playerID,checkPlayerID);
// 		checkInterSection(playerID,checkPlayerID);
// 	}, carSpeed / 2)
// }



// function clearHitCheck(playerID){
// 	$.each(intervals["player" + playerID],function(k,id){
// 		clearInterval(id)
// 	})
// }




// function checkInterSection(playerID,checkPlayerID){

// 	var hittestR = $("#car"+checkPlayerID+" .hittest-r").get(0);
// 	var hittestL = $("#car"+checkPlayerID+" .hittest-l").get(0);
// 	var hittestB = $("#car"+checkPlayerID+" .hittest-b").get(0);
// 	var svgRoot = hittestR.farthestViewportElement;

// 	$hitbox = $("#car"+playerID+" .hitbox")
// 	hitboxPosition = $hitbox.position()
// 	var rect = svgRoot.createSVGRect();
// 	rect.x = hitboxPosition.left;
// 	rect.y = hitboxPosition.top;
// 	rect.height = window.hitboxsize;
// 	rect.width = window.hitboxsize;

// 	var hasIntersectionR = svgRoot.checkIntersection(hittestR, rect);
// 	var hasIntersectionL = svgRoot.checkIntersection(hittestL, rect);
// 	var hasIntersectionB = svgRoot.checkIntersection(hittestB, rect);

// 	if((hasIntersectionR && !hasIntersectionL && !hasIntersectionB) || (hasIntersectionR && hasIntersectionB && !hasIntersectionL)){
// 		// hit on right side
// 		// stop the other player
// 		// console.log("right side",playerID,checkPlayerID)
// 		pauseAnimation(checkPlayerID)
// 		clearInterval(intervals[playerID])

// 	}else if((hasIntersectionL && !hasIntersectionR && !hasIntersectionB) || (hasIntersectionL && hasIntersectionB && !hasIntersectionR)){
// 		// hit on left side
// 		// stop the current player
// 		// console.log("left side",playerID,checkPlayerID)
// 		pauseAnimation(playerID)
// 		clearInterval(intervals[playerID])

// 	}else if(hasIntersectionB && !hasIntersectionR && !hasIntersectionL){
// 		// hit on bottm side
// 		// stop the current player
// 		// console.log("bottom side",playerID,checkPlayerID)
// 		pauseAnimation(playerID)
// 		clearInterval(intervals[playerID])

// 	}else if(hasIntersectionB || hasIntersectionR || hasIntersectionL){
// 		// hit on bottm side
// 		// stop the current player
// 		// console.log("hit",playerID,checkPlayerID)

// 	}
// 	else{

// 	}
// }




// function pauseAnimation(playerID){
// 	$("svg.player" + playerID).get(0).pauseAnimations();
// 	setTimeout(function(){
// 		$("svg.player"+playerID).get(0).unpauseAnimations();
// 	}, carSpeed * 2)
// }

// function unpauseAnimation(playerID){
// 	$("svg.player"+playerID).get(0).unpauseAnimations();
// }