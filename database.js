// Import the mongoose module
const mongoose = require('mongoose');

class Database {

   	constructor() {
   		// Set up default mongoose connection
   		this.mongoDB = 'mongodb://127.0.0.1/socialFVSDatabase';
   		// Get the default connection
   		this.db = mongoose.connection;	
   		this.connect()
   	}

	connect() {
		mongoose.connect(this.mongoDB, { useNewUrlParser: true });
	}

	connection() {
		return mongoose;
	}

}

module.exports = Database;