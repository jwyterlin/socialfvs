const request = require('request');

class NareemService {

	sendToSentimentEndpoint(sender_psid, answerText, callback) {
    
    	// Construct the message body
    	let request_body = {
			"text": answerText,
			"uid": sender_psid
		};

    	// Send the HTTP request to the Messenger Platform
    	request({
      		uri: "https://f8-project.appspot.com/sentiment-basic",
      		qs: {},
      		method: "POST",
      		headers: {'Content-type': 'application/json'},
      		json: request_body
    	}, (err, res, body) => {
      		if (!err) {
        		console.log(body);
        		callback(body.sentiment, body.uid);
      		} else {
        		console.error("Unable to send message:" + err);
      		}
    	});

  	}

  	sendToTopicRelationEndpoint(sender_psid, answerText) {

    	// Construct the message body
    	let request_body = {
			"text": answerText,
			"uid": sender_psid
		};

    	// Send the HTTP request to the Messenger Platform
    	request({
      		uri: "https://f8-project.appspot.com/topic-relation",
      		qs: {},
      		method: "POST",
      		headers: {'Content-type': 'application/json'},
      		json: request_body
    	}, (err, res, body) => {
      		if (!err) {
        		console.log(body);
      		} else {
        		console.error("Unable to send message:" + err);
      		}
    	});

  	}

}

module.exports = NareemService;