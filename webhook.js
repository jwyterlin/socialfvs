require('./index.js');
const Parser = require('./parser.js');
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

class Webhook {

	constructor(app) {
		this.app = app;
	}

	createPostListener() {

			// Creates the endpoint for our webhook 
			this.app.post('/webhook', (req, res) => {  

				let body = req.body;

	  			// Checks this is an event from a page subscription
	  			if (body.object === 'page') {

	    			// Iterates over each entry - there may be multiple if batched
	    			body.entry.forEach(function(entry) {

	      				// Gets the message. entry.messaging is an array, but 
	      				// will only ever contain one message, so we get index 0
	      				let webhook_event = entry.messaging[0];

	      				// Get the sender PSID
	      				let sender_psid = webhook_event.sender.id;

	      				var parser = new Parser();

	      				// Check if the event is a message or postback and
	      				// pass the event to the appropriate handler function
	      				if (webhook_event.message) {
	      					parser.handleMessage(sender_psid, webhook_event.message);        
	      				} else if (webhook_event.postback) {
	      					parser.handlePostback(sender_psid, webhook_event.postback);
	      				}

	      			});

	      			// Returns a '200 OK' response to all requests
	      			res.status(200).send('EVENT_RECEIVED');
	      		} else {
	    			// Returns a '404 Not Found' if event is not from a page subscription
	    			res.sendStatus(404);
	    		}

	    	});

		}

		createGetListener() {
			// Adds support for GET requests to our webhook
			this.app.get('/webhook', (req, res) => {

	  			// Parse the query params
	  			let mode = req.query['hub.mode'];
	  			let token = req.query['hub.verify_token'];
	  			let challenge = req.query['hub.challenge'];

	  			// Checks if a token and mode is in the query string of the request
	  			if (mode && token) {

	    			// Checks the mode and token sent is correct
	    			if (mode === 'subscribe' && token === VERIFY_TOKEN) {

	      				// Responds with the challenge token from the request
	      				console.log('WEBHOOK_VERIFIED');
	      				res.status(200).send(challenge);

	      			} else {
	      				// Responds with '403 Forbidden' if verify tokens do not match
	      				res.sendStatus(403);      
	      			}
	      		}
	      	});
		}

}

module.exports = Webhook;