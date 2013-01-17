var MySQLPool = require('mysql-pool').MySQLPool;
var sprintf = require('sprintf').sprintf;
var fs = require('fs');
var yaml = require('yamlparser');
var databaseName = 'hotprobs';
var databaseConn = 6;

(function() {
	Database = function( hardwareId ) {
		this.databaseUser = 'debian-sys-maint';
		this.databasePass = 'ltRHns1GjpxONBu7';
		this.databaseName = databaseName;
		this.databaseConn = databaseConn;

		this.hardwareId = hardwareId;

		console.log("[mysql] user '"+this.databaseUser+"', password '"+this.databasePass+"'");

		try {
			this.pool = new MySQLPool({
				poolSize: this.databaseConn,
				user:     this.databaseUser,
				password: this.databasePass
			});
		} catch (e) {
			console.log("[WARNING] could not create mysql pool", e.message);
		}

		this.makeSession(this.databaseName);
	};

	Database.prototype = {
		pool: null,
		databaseName: "",
		databaseUser: "",
		databasePass: "",
		databaseConn: 1,
		hardwareId: "",
		bbPost: function(username, message) {
			if (!this.pool) {
				return;
			}

			var that = this;
			this.pool.query("insert into " + that.databaseName + ".bbPost (username, hardwareId, message) values (?, ?, ?)",
				[ username, this.hardwareId, message ],
				function (err) { console.log("error creating bulletin board insertion: " + err); });
		},
		logChat: function(username, chatId, message) {
			if (!this.pool) {
				return;
			}
			var that = this;

			this.pool.query("insert into " + that.databaseName + ".chatLog (username, hardwareId, chatId, message) values (?, ?, ?, ?)",
				[username, this.hardwareId, chatId, message], function(err) { console.log("error creating chat insertion: " + err); }
			);
		},
		makeSession: function(databaseName) {
			if (!this.pool) {
				return;
			}

			var that = this;

			console.log("using database", this.databaseName);

			var query = sprintf("CREATE database if not exists %s;\n", this.databaseName);
			var query = sprintf("USE %s;\n", this.databaseName);
				query += fs.readFileSync("./db/session.sql");

			this.pool.query(query, function(err) { console.log("error creating db: " + err); });
		}
	};
})();