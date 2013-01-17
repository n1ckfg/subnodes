// HOT PROBS landing page
;(function($, window) {

	var index = {
		'cfg': {
			'$screenname': null,
			'$joinButton': null,
			'$bbButton': null,
			'screenname': null
		},
		'evt': {
			'ready': function() {
				index.fn.init();
			}
		},
		'fn': {
			'init': function() {
				index.cfg.$screenname = $( '#screenname' );
				index.cfg.$joinButton = $( '#joinButton' );
				index.cfg.$bbButton = $( '#bbButton' );
				index.cfg.$joinButton.click( function() {
					index.fn.joinGroupChat();
				});
				index.cfg.$bbButton.click( function() {
					index.fn.viewMessageBoard();
				});
			},
			'joinGroupChat': function() {
				// validate that screenname isn't blank before proceeding
				index.cfg.screenname = index.cfg.$screenname.text();
				var valid = index.fn.validateName();
				if( valid ) {
					// pass the screenname onto the chat page
					window.location = "/chat?screenname="+index.cfg.screenname;
				}
			},
			'viewMessageBoard': function() {
				// validate that screenname isn't blank before proceeding
				index.cfg.screenname = index.cfg.$screenname.text();
				var valid = index.fn.validateName();
				if( valid ) {
					// pass the screenname onto the chat page
					window.location = "/bb?screenname="+index.cfg.screenname;
				}
			},
			'validateName': function() {
				if( index.cfg.screenname == '' || index.cfg.screenname == 'enter a name!' ) {
					index.cfg.$screenname.text( 'enter a name!' );
					return false;
				}
				return true;
			}
		}
	}

	index.evt.ready();
	
}(jQuery, window));