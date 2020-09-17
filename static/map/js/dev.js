$(function(){


	$(document).on("click",'.player .p0',function(){
		showStartPoint(getPlayer($(this)),getRoute($(this)))
	})

	$(document).on("click",'.player .p1',function(){
		showCar(getPlayer($(this)),getRoute($(this)))
	})

	$(document).on("click",'.player .p2',function(){
		showLine(getPlayer($(this)),getRoute($(this)))
	})


	$(document).on("click",'.player .p3',function(){
		showLineEnd(getPlayer($(this)),getRoute($(this)))
	})

	$(document).on("click",'.player .p4',function(){
		driveCar(getPlayer($(this)),getRoute($(this)))
	})

	$(document).on("click",'.player .p5',function(){
		showEndPoint(getPlayer($(this)),getRoute($(this)))
	})

	$(document).on("click",'.player .p6',function(){
		resetRoute(getPlayer($(this)),getRoute($(this)))
	})


	$(document).on("click",'.player .p7',function(){
		showAll(getPlayer($(this)),getRoute($(this)))
	})

	$(document).on("click",'.player .p8',function(){
		resetRoute(1,0)
		resetRoute(2,0)
		resetRoute(3,0)
	})


	$(document).on("click",'.player .p9',function(){
	})

});


// helper function
function getRoute($e){
	return $e.parents(".player").find(".pr").val()
}


// helper function
function getPlayer($e){
	return $e.parents(".player").find(".p").val()
}




function story1(player){
	showCar(player,0)
	showStartPoint(player,0);

	showLine(player,0);
	showLine(player,1);

	showEndPoint(player,1);
	showLine(player,2);

	showEndPoint(player,2);


	//
	showEndPoint(player,0);
	// driveCar(player,0)
}


function story2(player){
	showCar(player,3)
	showStartPoint(player,3);

	showLine(player,3);
	showLine(player,4);
	showLine(player,5);

	//
	showEndPoint(player,4);

	showEndPoint(player,3);
	showEndPoint(player,5);

	// driveCar(player,3)
}



function story3(player){
	showCar(player,6)
	showStartPoint(player,6);

	showLine(player,6);
	showLine(player,7);

	//
	showEndPoint(player,6);

	showEndPoint(player,7);
	// driveCar(player,6)
}



function story4(player){
	showCar(player,8)
	showStartPoint(player,8);

	showLine(player,8);
	showLine(player,9);
	showLine(player,10);
	showLine(player,11);

	//
	showEndPoint(player,8);
	showEndPoint(player,9);

	showEndPoint(player,10);
	showEndPoint(player,11);

	// driveCar(player,8)
}


function story5(player){
	showCar(player,12)
	showLine(player,12);
	showEndPoint(player,12);
}


function story6(player){
	showCar(player,13)
	showLine(player,13);
	showEndPoint(player,13);
	showLine(player,14);
	showEndPoint(player,14);
}







function storyAll(player){
	// story1(player)
	// story2(player)
	// story3(player)
	// story4(player)
	// story5(player)
// 	story6(player)
// // // 
// 	driveCar(player,14)
}


$(function(){
	// storyAll(1)
	 // storyAll(2)
	// storyAll(3)
	// storyAll(4)
	// storyAll(5)
	// storyAll(6)
	// storyAll(7)
	// storyAll(8)
	// storyAll(9)
	// storyAll(10)
})