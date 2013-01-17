module.exports = function( nowjs, server, db ) {

    var everyone = nowjs.initialize( server );
	
	nowjs.on('connect', function() {
		if( this.now.name === undefined) return;
		everyone.now.userConnect( { name:this.now.name });
	});

	nowjs.on('disconnect', function(){
		if( this.now.name === undefined) return;
		everyone.now.userDisconnect( { name:this.now.name });
	});

	everyone.now.sendMessage = function( message ){
		everyone.now.receiveMessage( {
										name: this.now.name,
										message: message,
										color: this.now.color
									});
		database.logChat(this.now.name, 'public', message);
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
};