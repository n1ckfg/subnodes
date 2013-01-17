// HOT PROBS Bulletin Board client-side functionality
;(function($, window, now) {

	var bb = {
		'cfg': {
			// grab screenname from end of URL
			'screenname': window.location.search.substring(1).split("=")[1],
			'$header': null,
			'$allMessages': null,
			'$postMessage': null,
			'$postButton': null
		},
		'evt': {
			'ready': function() {
				bb.fn.init();
			}
		},
		'fn': {
			'init': function() {
				// set up DOM elements
				bb.cfg.$header = $( '#header' );
				bb.cfg.$messages = $( '#messages' );
				bb.cfg.$postMessage = $( '#msg' );
				bb.cfg.$postButton = $( '#postButton' );
				// bind events
				bb.cfg.$header.click( function() {
					window.location = "/";
				});
				bb.cfg.$postMessage.focus();
				bb.cfg.$postMessage.keypress( function( e ) {
					if( e.which == 13 ) {
						bb.fn.postMessage();
						return false;
					}
				});
				bb.cfg.$postButton.click( function( e ) {
					bb.fn.postMessage();
					return false;
				});

				now.name = bb.cfg.screenname;

				// render out messages already saved
				// pull from DB
			},
			'postMessage': function() {
				console.log("post message");
				// post to bulletin board with user's screenname + message
				// if message is not blank
				/*if(bb.cfg.$msg.val() != '') {
					now.sendMessage({ 
										name: bb.cfg.screenname, 
										message: bb.cfg.$msg.val()
									});
				}
				// set message field to blank after sending
				bb.cfg.$msg.val('');*/
			}
		}
	};

	bb.evt.ready();
	
}(jQuery, window, now));