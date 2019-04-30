// Import the mongoose module
const mongoose = require('mongoose');

class Database {

   	// Set up default mongoose connection
   	mongoDB = 'mongodb://127.0.0.1/socialFVSDatabase';

   	// Get the default connection
   	db = mongoose.connection;

   	constructor() {
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