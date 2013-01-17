module.exports = function( nowjs, server ) {

    var everyone = nowjs.initialize( server );
	var colors = ['#AE331F', '#D68434', '#116A9F', '#360B95', '#5F209E'];
	var connections = {};

	nowjs.on('connect', function() {
		console.log("joined: " + this.now.name);
	});

	nowjs.on("disconnect", function(){
	  console.log("Left: " + this.now.name);
	});

	everyone.now.sendMessage = function( message ){
		console.log("sendMessage");
	    /*var group = nowjs.getGroup(this.now.serverRoom);
	    group.now.userMessage( {name:this.now.name,
	    						room:this.now.serverRoom,
	    					    color:val,
	    					    message:message });*/
	};

	/*everyone.now.changeRoom = function( newRoom ){
	    var oldRoom = this.now.serverRoom;

	    //if old room is not null; then leave the old room
	    if(oldRoom){
	        var oldGroup = nowjs.getGroup(oldRoom);
	        oldGroup.removeUser(this.user.clientId);
	    }

	    // join the new room
	    var newGroup = nowjs.getGroup(newRoom);
	    newGroup.addUser(this.user.clientId);

	    // update the client's serverRoom variable
	    this.now.serverRoom = newRoom;
	};*/

	/*io
		.of('/chat')
		.on('connection', function( socket ) {

			// give each connected user a random color so it's easier to tell them apart in the chat log
			socket.on('userReady', function( data ) {
				socket.name = data.name;
				socket.color = data.color = colors[Math.floor(Math.random() * colors.length)];
				broadcastMessage( 'userReady', data );
			});

			socket.on('userMessage', function( data ) {
				data.color = socket.color;
				broadcastMessage( 'userMessage', data );
			});

			function dispatchStatus() {
				broadcastMessage( 'status', connections );
			}

			function broadcastMessage( message, data ) {
				// remove socket.emit if you don't want the sender to receive their own message
				socket.emit( message, data );
				socket.broadcast.emit( message, data );
			}

			// handle connections & disconnections
			connections[socket.id] = {};
			dispatchStatus();
			socket.on('disconnect', function() {
				delete connections[socket.id];
				dispatchStatus();
				broadcastMessage('userDisconnected', { name : socket.name, color : socket.color });
			});

	});*/

};