var clientID = "MAP";

//    // all clients using the same token are part of the same site and may communicate which each other
// // different sites can exist on the same server, without interfering with each other
var token = getURLParameter('token');

//    // initialize the server connection
var socket = io('http://'+location.hostname+':8080/',{
    query: {
	    role: "map",
	    clientID: clientID,
	    token: token
    }
});


function getURLParameter(name) {
	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}





function mapControl(data){

	// console.log("MAP: get command",data.command , "from", data.from, "player", data.player)

	switch(data.command){
		case "start":

		data.player.substr(6)
			playerStart(data.player.substr(6));
			break;
		case "end":
			playerEnd(data.player.substr(6));
			break;
	}

	// story reset
	switch(data.command){
		case "resetStory1":
			resetRoute(data.player,0);
			resetRoute(data.player,1);
			resetRoute(data.player,2);
			break;
		case "resetStory2":
			resetRoute(data.player,3);
			resetRoute(data.player,4);
			resetRoute(data.player,5);
			break;
		case "resetStory3":
			resetRoute(data.player,6);
			resetRoute(data.player,7);
			break;
		case "resetStory4":
			resetRoute(data.player,8);
			resetRoute(data.player,9);
			resetRoute(data.player,10);
			resetRoute(data.player,11);
			break;
		case "resetStory5":
			resetRoute(data.player,12);
			break;
		case "resetStory6":
			resetRoute(data.player,13);
			resetRoute(data.player,14);
			break;
	}
	

	// story 1
	//0 1 2
	switch(data.command){
		case "s1-1":
			showStartPoint(data.player,0);
			showLine(data.player,0);
			showLine(data.player,1);
			showEndPoint(data.player,1);
			break;
		case "s1-2":
			driveCar(data.player,0);
			//console.log('driving car');
			break;
		case "s1-3":
			hideLine(data.player,1);
			hideEndPoint(data.player,1);
			showLine(data.player,2);
			showEndPoint(data.player,2);
			driveCar(data.player,2);
			break;
	}


	// story 2
	// 3 4 5
	switch(data.command){
		case "s2-1":
			showStartPoint(data.player,3);
			showLine(data.player,3);
			showLine(data.player,4);
			showLine(data.player,5);
			showEndPoint(data.player,3);
			showEndPoint(data.player,5);

			setTimeout(function(){
				driveCar(data.player,3);
			},2000)
			
			break;
		case "s2-2":
			driveCar(data.player,4);
			break;
		case "s2-3":
			driveCar(data.player,5);
			break;
	}


	// story 3
	// 6 7
	switch(data.command){
		case "s3-1":
			showStartPoint(data.player,6);
			showLine(data.player,6);
			showLine(data.player,7);
			showEndPoint(data.player,7);
			break;
		case "s3-2":
			driveCar(data.player,6);
			break;
		case "s3-3":
			driveCar(data.player,7);
			break;
	}


	//story 4
	//8 9 10 11
	switch(data.command){
		case "s4-1":
			showStartPoint(data.player,8);
			showLine(data.player,8);
			showLine(data.player,9);
			showLine(data.player,10);
			showEndPoint(data.player,10);
			break;
		case "s4-2":
			driveCar(data.player,8);
			break;
		case "s4-3":
			driveCar(data.player,9);
			break;
		case "s4-4":
			hideLine(data.player,10);
			hideEndPoint(data.player,10);
			showLine(data.player,11);
			showEndPoint(data.player,11);
			driveCar(data.player,11);
			break;
	}



	// story 5
	// 12
	switch(data.command){
		case "s5-1":
			showStartPoint(data.player,12);
			showLine(data.player,12);
			showEndPoint(data.player,12);
			driveCar(data.player,12);
			break;
	}

	// story 5
	// 13 14
	switch(data.command){
		case "s6-1":
			showStartPoint(data.player,13);
			showLine(data.player,13);
			showEndPoint(data.player,13);
			driveCar(data.player,13);
			break;

		case "s6-2":
			showLine(data.player,14);
			showEndPoint(data.player,14);
			driveCar(data.player,14);
			break;
	}



	switch(data.command){
		case "showStartPoint":
			showStartPoint(data.player,data.route);
			break;
		case "showCar":
			showCar(data.player,data.route);
			break;
		case "showLine":
			showLine(data.player,data.route);
			break;
		case "driveCar":
			driveCar(data.player,data.route);
			break;
		case "showEndPoint":
			showEndPoint(data.player,data.route);
			break;
		case "showAll":
			showAll(data.player,data.route);
			break;
		case "resetRoute":
			resetRoute(data.player,data.route);
	}

}


socket.on("PMSG", mapControl);

function getURLParameter(name) {
	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}



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





function sendToPlayer(playerID,command,routeId,cb){

//	console.log("sendToPlayer",playerID ,command,routeId);
	socket.emit("PMSG", {
		"toType": "client",
		"to": "player"+playerID,
		"from": "map",
        "player": playerID,
        "command": command,
        "route": routeId
    },function(msg){
    	cb(msg)
    });
}
