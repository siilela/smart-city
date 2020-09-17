const PORT = (process.env.PORT || 8080);
const serveStatic = require('serve-static')
var finalhandler = require('finalhandler')
var http = require('http')

// var oneDay = 86400000; // in milliseconds
// const server = connect()
// 	.use(connect.static('static'))
// 	.listen(PORT, () => console.log(`Listening on ${ PORT }`));

// Serve up public/ftp folder 
var serve = serveStatic('static', {
	maxAge: '50d',
  	setHeaders: setCustomCacheControl
})
 
// Create server 
var server = http.createServer(function onRequest (req, res) {
  serve(req, res, finalhandler(req, res))
})
 
// Listen 
server.listen(PORT)

 
function setCustomCacheControl (res, path) {
	 res.setHeader('Cache-Control', 'public, max-age=500000')

	if (serveStatic.mime.lookup(path) === 'video/mp4') {
		// Custom Cache-Control for HTML files 
		res.setHeader('Cache-Control', 'public, max-age=900000')
	}

}

const io = require('socket.io')(server);
const tokens = ["q","tiwiqikuda","qesekegikau","qesekegikaa","vinoyiyuqu", "devtyoyoqa", "devtyoyoqb", "devtyoyoqc", "qweqwe"]
const games = new Set(tokens);







let curCons = {};
let clientInfo = [];

process.on('uncaughtException', function(err) {
	// handle the error safely
	console.log(err)
});


// This is executed anytime a socket connects,
// before calling on(connection)
// We do some authorisation here
io.use((socket, next) => {

	// make the parameters easier accessible on the socket
	socket.token = socket.handshake.query.token;
	socket.clientID = socket.handshake.query.clientID;
	socket.role = socket.handshake.query.role;

	// check for valid token
	if (games.has(socket.token)) {
		console.log("CONNECT OK", socketInfo(socket));
		onConnect(socket)
		next();
	}else {
		console.log("CONNECT DENIED", socketInfo(socket));
		next(new Error('Insufficient credentials.'))
	}
});


// When a client connects, we note it in the console and register callbacks
// 'socket' represents the socket currently connecting
io.on('connection', function (socket) {

	// private MSG send only to one clientID or all of one role
	socket.on('PMSG', function(message,cb){
		Object.entries(curCons[socket.token]).forEach(([key, clientOBJ]) => {
			if(clientOBJ[message.toType] == message.to){
				console.log("PMSG: Send to",clientOBJ[message.toType], key, message.command, message.player, message.route);
				socket.to(key).emit("PMSG", message);
			}
		});
		cb("done");
	});

	// toggle Config MSG
	socket.on('toggleConfigMSG', function(message){
		socket.broadcast.to(socket.token).emit(`config ` + message.state);
	});

	// toggle Debug MSG
	socket.on('toggleDebugMSG', function(message){
		socket.broadcast.to(socket.token).emit(`debug ` + message.state);
	});

	// test MSG
	socket.on('testMSG', function(message){
		 console.log("TEST: curCons",curCons[socket.token]);
	});


	
	// disconnect event - remove socket from curCons
	socket.on('disconnect', function(reason){
		console.log('DISCONNECT', socketInfo(socket),reason);
		var socketToken = socket.token
		delete clientInfo[socket.id];

		socket.to(socket.token).emit("PMSG", {
			command: "end",
			from: socket.clientID, 
			player: socket.clientID
		});


		if(clientInfo.length > 0){
			mapClients(socketToken);	
		}
	});
});

// join the room (token) and trigger mapClients function
function onConnect(socket) {
	socket.join(socket.token);
	clientInfo[socket.id] = {
		"id": socket.id,
		"role": socket.role,
		"client": socket.clientID 
	};
	mapClients(socket.token);
	socket.to(socket.token).emit("PMSG", {
		command: "start",
		from: socket.clientID, 
		player: socket.clientID
	});

	console.log("RESPONSE", "Join OK for token: ", socket.token);
}

// map the sockets in each room with the info of each client to create a client list
function mapClients(socketToken) {	
	var clients = io.sockets.adapter.rooms[socketToken].sockets; 
	var numClients = (typeof clients !== 'undefined') ? Object.keys(clients).length : 0;
	if(numClients > 0){
		var clientsWithInfo = {}
		Object.entries(clients).forEach(([key, value]) => {
				clientsWithInfo[key] = clientInfo[key];
		});
		curCons[socketToken] = clientsWithInfo;
	}
}



function socketInfo(socket) {
	return " [SocketID: " + socket.id +
		" | token: " + socket.token +
		" | role: " + socket.role +
		" | clientID: " + socket.clientID +
		"]";
}