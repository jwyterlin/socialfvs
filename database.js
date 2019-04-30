class Database {

   	// Import the mongoose module
   	mongoose = require('mongoose');

   	// Set up default mongoose connection
   	mongoDB = 'mongodb://127.0.0.1/socialFVSDatabase';

   	// Get the default connection
   	db = mongoose.connection;

   	constructor() {
   		connect()
   	}

	connect() {
		mongoose.connect(mongoDB, { useNewUrlParser: true });
	}

}

module.exports = Database;