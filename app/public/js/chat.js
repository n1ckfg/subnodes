// HOT PROBS Chat client-side functionality
;(function( $, window, now ) {

	var chatClient = {
		'cfg': {
			// grab screenname from end of URL
			'screenname': window.location.search.substring(1).split("=")[1],
			'$header': null,
			'$msg': null,
			'$incoming': null,
			'colors': ['#c5270d', '#D68434', '#116A9F', '#7945ed', '#5F209E', '#eaec6a', '#ec38c0']
		},
		'evt': {
			'ready': function() {
				chatClient.fn.init();
			}
		},
		'fn': {
			'init': function() {
				// set up DOM elements
				chatClient.cfg.$header = $( '#header' );
				chatClient.cfg.$msg = $('#msg');
				chatClient.cfg.$incoming = $('#incoming');
				// bind events
				chatClient.cfg.$header.click( function() {
					window.location = "/";
				});
				chatClient.cfg.$msg.focus();
				chatClient.cfg.$msg.keypress( function( e ) {
					if( e.which == 13 ) {
						chatClient.fn.sendMessage();
						return false;
					}
				});
				// set up listeners on now object
				now.name = chatClient.cfg.screenname;
				now.color = chatClient.cfg.colors[ Math.floor(Math.random() * chatClient.cfg.colors.length) ];
				now.userConnect = function( data ) {
					chatClient.fn.connect( data );
				}
				now.userDisconnect = function( data ) {
					chatClient.fn.disconnect( data );
				}
				now.receiveMessage = function( data ) {
					chatClient.fn.receiveMessage( data );
				}
				now.ready( function() {
					console.log("ready!");

				});	
			},
			'autoscroll': function() {
				var incoming = document.getElementById( 'conversation' );
					incoming.scrollTop = incoming.scrollHeight;
			},
			'connect': function( data ) {
				// someone connects
				if( data.name ) {
					var decoded = decodeURIComponent( data.name );
					chatClient.cfg.$incoming
						.append( '<div style="color:#00ff24;font-style:italic"> > '+decoded+' connected</div>');
					chatClient.fn.autoscroll();
				}
			},
			'disconnect': function( data ) {
				// someone disconnects
				if( data.name ) {
					var decoded = decodeURIComponent( data.name );
					chatClient.cfg.$incoming
						.append('<span style="color:#009a16;font-style:italic;"> > '+decoded+' disconnected</span><br>');
					chatClient.fn.autoscroll();
				}
			},
			'receiveMessage': function( data ) {
				// receive message sent by another user
				if( data.name ) {
					var decoded = decodeURIComponent( data.name );
					chatClient.cfg.$incoming
						.append( '<div style="color:'+data.color+'">'+decoded+' > '+data.message+'</div>');
					chatClient.fn.autoscroll();
				}
			},
			'sendMessage': function() {
				// broadcast userMessage event with user's screenname + message
				// if message is not blank
				if(chatClient.cfg.$msg.val() != '') {
					now.sendMessage( chatClient.cfg.$msg.val() );
				}
				// set message field to blank after sending
				chatClient.cfg.$msg.val('');
			}
		}
	};

	chatClient.evt.ready();
	
}( jQuery, window, now ));