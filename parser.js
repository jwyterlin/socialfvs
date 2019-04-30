const request = require('request');
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const AnswerModel = require('./answer.js');

class Parser {

  // Handles messages events
  handleMessage(sender_psid, received_message) {
    
    let response;

    console.log(sender_psid);
    console.log("received_message");
    console.log(received_message);
    
    // Checks if the message contains text
    if (received_message.text) {    
      // Create the payload for a basic text message, which
      // will be added to the body of our request to the Send API

      let answerText = received_message.text;
      let userId = sender_psid;

      if (received_message.quick_reply) {
        let payload = received_message.quick_reply.payload
        if (payload) {
          if (payload === 'answer1-q1'||payload === 'answer2-q1'||payload === 'answer3-q1'||payload === 'answer4-q1') {

            let questionId = "1";
            this.saveAnswer(answerText, questionId, userId);

            let text = `Second question - how strongly do you agree with the following statement? "${"I am confident that I have control over my future sources of income."}" Choose a score between 1 and 4, where 1 is "${"disagree completely,"}" 2 is "${"disagree somewhat,"}" 3 is "${"agree somewhat,"}" and 4 is "${"agree completely."}"`;
            let answerIds = ["answer1-q2","answer2-q2","answer3-q2","answer4-q2"];
            response = this.responseFourOptions(text, answerIds);

          } else if (payload === 'answer1-q2'||payload === 'answer2-q2'||payload === 'answer3-q2'||payload === 'answer4-q2') {

            let questionId = "2";
            this.saveAnswer(answerText, questionId, userId);

            let text = `Third question - how strongly do you agree with the following statement? "${"Most of my friends have their own business."}" Choose a score between 1 and 4, where 1 is "${"disagree completely,"}" 2 is "${"disagree somewhat,"}" 3 is "${"agree somewhat,"}" and 4 is "${"agree completely."}"`;
            let answerIds = ["answer1-q3","answer2-q3","answer3-q3","answer4-q3"];
            response = this.responseFourOptions(text, answerIds);
            
          } else if (payload === 'answer1-q3'||payload === 'answer2-q3'||payload === 'answer3-q3'||payload === 'answer4-q3') {
            let questionId = "3";
            this.saveAnswer(answerText, questionId, userId);
            response = {"text": "Chat finished!"}
          }
        }
      } else {
        response = this.initialResponse();
      }

    }
    
    // Send the response message
    this.callSendAPI(sender_psid, response);

  }

  // Handles messaging_postbacks events
  handlePostback(sender_psid, received_postback) {

    console.log("handlePostback");

    let response;
    
    // Get the payload for the postback
    let payload = received_postback.payload;

    console.log(received_postback);

    // Set the response based on the postback payload
    if (payload === 'yes-q0') {

      let text = `Great, thank you! First question - how strongly do you agree with the following statement? "${"I prefer the stability that a 9 to 5 job provides over running my own business."}" Choose a score between 1 and 4, where 1 is "${"disagree completely,"}" 2 is "${"disagree somewhat,"}" 3 is "${"agree somewhat,"}" and 4 is "${"agree completely."}"`;
      let answerIds = ["answer1-q1","answer2-q1","answer3-q1","answer4-q1"];
      response = this.responseFourOptions(text, answerIds);

    }
    
    // Send the message to acknowledge the postback
    this.callSendAPI(sender_psid, response);

  }

  // Sends response messages via the Send API
  callSendAPI(sender_psid, response) {
    // Construct the message body
    let request_body = {
      "messaging_type": "RESPONSE",
      "recipient": {
        "id": sender_psid
      },
      "message": response
    };

    // Send the HTTP request to the Messenger Platform
    request({
      uri: "https://graph.facebook.com/v3.2/me/messages",
      qs: { "access_token": PAGE_ACCESS_TOKEN },
      method: "POST",
      headers: {'Content-type': 'application/json'},
      json: request_body
    }, (err, res, body) => {
      if (!err) {
        console.log('message sent!')
      } else {
        console.error("Unable to send message:" + err);
      }
    });

  }

  responseFourOptions(text, answerIds) {
    return {
      "text": text,
      "quick_replies": [this.answerQuickReply("1", answerIds[0]),
                        this.answerQuickReply("2", answerIds[1]),
                        this.answerQuickReply("3", answerIds[2]),
                        this.answerQuickReply("4", answerIds[3])]
    }
  }

  answerQuickReply(title, answerId) {
    return {
      "content_type":"text",
      "title":title,
      "payload":answerId,
      "image_url":""
    }
  }

  saveAnswer(answerText, questionId, userId) {
    var answer = new AnswerModel( { text: answerText, questionId: questionId, userId: userId } );
    answer.save( function( err ) {
      if ( err ) {
        console.log( "Error! " + err.message );
        return err;
      } else {
        console.log( "Answer saved" );
      }
    });
  }

  initialResponse() {
    return {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "button",
          "text": "Thank you for your interest in receiving a social credit assessment that can be used for loan applications in the future. I would like to ask you a few questions before I can make an assessment. Shall we continue?",
          "buttons": [{
            "type": "postback",
            "title": "Yes!",
            "payload": "yes-q0",
          }]
        }
      }
    }
  }

}

module.exports = Parser;