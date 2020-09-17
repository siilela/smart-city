

var clientID = "config";

//    // all clients using the same token are part of the same site and may communicate which each other
// // different sites can exist on the same server, without interfering with each other
var token = getURLParameter('token');

   // initialize the server connection
var socket = io('http://'+location.hostname+':8080/',{
    query: {
	    role: "admin",
	    clientID: "config",
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
function toggleConfigMSG(state){
	if(state == "hide"){
    	$(".config").hide();
    }else if(state == "show"){
    	$(".config").show();
    }


	socket.emit("toggleConfigMSG", {
        "state": state,
    });

}


function toggleDebugMSG(state){

	if(state == "hide"){
    	$(".debug").hide();
    }else if(state == "show"){
    	$(".debug").show();
    }


	socket.emit("toggleDebugMSG", {
        "state": state,
    });
}


// route functions
function testMSG(state){
	console.log("testMSG");

	socket.emit("testMSG", {
        "state": state
    });
}







