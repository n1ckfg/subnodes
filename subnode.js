
/**
 * Subnodes is an open source project that enables people to easily set up portable access points for serving content.
 * Author : Sarah Grant
 * Github : http://github.com/chootka/subnodes
 */


/**
 * Module dependencies.
 */
var express     = require( 'express' ),
    app         = express(),
    server		  = require( 'http' ).createServer( app ),
    nowjs       = require( 'now' );

app.root        = __dirname;

// create the application
require('./app/config')( app, express );
require('./app/server/db');
require('./app/server/router')( app );

/**** DATABASE STUFF ***/
var db = new Database( "myhardware" );
/***********************/
require('./app/server/modules/bb')( nowjs, db );
require('./app/server/modules/chat')( nowjs, server, db );

server.listen( 8080, function() {
  console.log("Express server listening on port %d in %s mode", server.address().port, app.settings.env);
});