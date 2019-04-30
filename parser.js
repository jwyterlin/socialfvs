const request = require("request");
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const AnswerModel = require('./answer.js');
const NodeCache = require("node-cache");
const myCache = new NodeCache();
const NareemService = require("./nareemService.js");

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

      let questionId = myCache.get("questionId");

      if (questionId == undefined) {
        response = this.initialResponse();
      } else if (questionId === "1") {
        let questionId = "1";
        this.saveAnswer(answerText, questionId, userId);
        let text = `Second question - how strongly do you agree with the following statement? "${"I am confident that I have control over my future sources of income."}" Choose a score between 1 and 4, where 1 is "${"disagree completely,"}" 2 is "${"disagree somewhat,"}" 3 is "${"agree somewhat,"}" and 4 is "${"agree completely."}"`;
        let answerIds = ["answer1-q2","answer2-q2","answer3-q2","answer4-q2"];
        response = this.responseFourOptions(text, answerIds);
        myCache.set("questionId","2", 3600);
      } else if (questionId === "2") {
        let questionId = "2";
        this.saveAnswer(answerText, questionId, userId);
        let text = `Third question - how strongly do you agree with the following statement? "${"Most of my friends have their own business."}" Choose a score between 1 and 4, where 1 is "${"disagree completely,"}" 2 is "${"disagree somewhat,"}" 3 is "${"agree somewhat,"}" and 4 is "${"agree completely."}"`;
        let answerIds = ["answer1-q3","answer2-q3","answer3-q3","answer4-q3"];
        response = this.responseFourOptions(text, answerIds);
        myCache.set("questionId","3", 3600);
      } else if (questionId === "3") {
        let questionId = "3";
        this.saveAnswer(answerText, questionId, userId);
        let text = `Fourth question - how strongly do you agree with the following statement? "${"I am responsible for the successes and failures in my life, and not chance."}" Choose a score between 1 and 4, where 1 is "${"disagree completely,"}" 2 is "${"disagree somewhat,"}" 3 is "${"agree somewhat,"}" and 4 is "${"agree completely."}"`;
        let answerIds = ["answer1-q4","answer2-q4","answer3-q4","answer4-q4"];
        response = this.responseFourOptions(text, answerIds);
        myCache.set("questionId","4", 3600);
      } else if (questionId === "4") {
        let questionId = "4";
        this.saveAnswer(answerText, questionId, userId);
        let text = `Fifth question - how strongly do you agree with the following statement? "${"I consider myself to be more ambitious than most of the people I know."}" Choose a score between 1 and 4, where 1 is "${"disagree completely,"}" 2 is "${"disagree somewhat,"}" 3 is "${"agree somewhat,"}" and 4 is “${"agree completely."}"`;
        let answerIds = ["answer1-q5","answer2-q5","answer3-q5","answer4-q5"];
        response = this.responseFourOptions(text, answerIds);
        myCache.set("questionId","5", 3600);
      } else if (questionId === "5") {
        let questionId = "5";
        this.saveAnswer(answerText, questionId, userId);
        let text = `Sixth question - how strongly do you agree with the following statement? "${"In general, I rely on my instincts."}" Choose a score between 1 and 4, where 1 is "${"disagree completely,"}" 2 is "${"disagree somewhat,"}" 3 is "${"agree somewhat,"}" and 4 is "${"agree completely."}"`;
        let answerIds = ["answer1-q6","answer2-q6","answer3-q6","answer4-q6"];
        response = this.responseFourOptions(text, answerIds);
        myCache.set("questionId","6", 3600);
      } else if (questionId === "6") {
        let questionId = "6";
        this.saveAnswer(answerText, questionId, userId);
        let text = `Seventh question - how strongly do you agree with the following statement? "${"I like working collaboratively in a group, as opposed to leading others."}" Choose a score between 1 and 4, where 1 is "${"disagree completely,"}" 2 is "${"disagree somewhat,"}" 3 is "${"agree somewhat,"}" and 4 is "${"agree completely."}"`;
        let answerIds = ["answer1-q7","answer2-q7","answer3-q7","answer4-q7"];
        response = this.responseFourOptions(text, answerIds);
        myCache.set("questionId","7", 3600);
      } else if (questionId === "7") {
        let questionId = "7";
        this.saveAnswer(answerText, questionId, userId);
        let text = `Thank you for answering those questions. Now, a few more about yourself. Could you tell me how old you are, in years. For example, if you are 30 years old, enter 30.`;
        response = {"text": text};
        myCache.set("questionId","8", 3600);
      } else if (questionId === "8") {
        let questionId = "8";
        this.saveAnswer(answerText, questionId, userId);
        let text = `How many dependents do you have? Please enter a number.`;
        response = {"text": text};
        myCache.set("questionId","9", 3600);
      } else if (questionId === "9") {
        let questionId = "9";
        this.saveAnswer(answerText, questionId, userId);
        let text = `Could you please tell me what you would use the loan for?`;
        response = {"text": text};
        myCache.set("questionId","10", 3600);
      } else if (questionId === "10") {
        let questionId = "10";
        this.saveAnswer(answerText, questionId, userId);
        let text = `Could you also tell me a little bit about your business, and your experience in it? Please use between 3 and 10 sentences.`;
        response = {"text": text};
        myCache.set("questionId","11", 3600);
      } else if (questionId === "11") {
        let questionId = "11";
        this.saveAnswer(answerText, questionId, userId);
        let text = `Final. Could you please share the Facebook or Instagram page of your business, if you have one? Please enter None if you don’t.`;
        response = {"text": text};
        myCache.set("questionId","12", 3600);
      } else if (questionId === "12") {
        let questionId = "12";

        var myThis = {
          calculateEntreprensurialScore: function() {
            return this;
          },
          getAnswers: function(callback) {
            return this;
          },
          callSendAPI: function(sender_psid, response) {
            return this;
          }
        };
        myThis.calculateEntreprensurialScore = this.calculateEntreprensurialScore;
        myThis.getAnswers = this.getAnswers;
        myThis.callSendAPI = this.callSendAPI;

        this.saveAnswer(answerText, questionId, userId, function (error) {
          if (error) {
            console.log(error);
            return;
          }
          myThis.calculateEntreprensurialScore(userId);
          AnswerModel.deleteMany({userId: userId}, function (err, _) {
            if (err) {
              console.log(err);
            }
          });
        });
        myCache.del("questionId");
      }
    }

    // Send the response message
    this.callSendAPI(sender_psid, response);
  }

  calculateEntreprensurialScore(userId) {
    var myThis = {
          callSendAPI: function(sender_psid, response) {
            return this;
          }
        };
    myThis.callSendAPI = this.callSendAPI;
    this.getAnswers(function (answers) {
      var score = 0;
      var age = 0;
      var numberOfDependents = 0;
      var descriptionOfBusiness = "";
      var facebookInstagramLink = "";
      answers.forEach(function(answer) {
        if (answer.questionId == "1") {
          if (answer.text == "1") {
            score += 1;
          }
        } else if (answer.questionId == "2") {
          if (answer.text == "4") {
            score += 1;
          }
        } else if (answer.questionId == "3") {
          if (answer.text == "4") {
            score += 1;
          }
        } else if (answer.questionId == "4") {
          if (answer.text == "4") {
            score += 1;
          }
        } else if (answer.questionId == "5") {
          if (answer.text == "4") {
            score += 1;
          }
        } else if (answer.questionId == "6") {
          if (answer.text == "4") {
            score += 1;
          }
        } else if (answer.questionId == "7") {
          if (answer.text == "1") {
            score += 1;
          }
        } else if (answer.questionId == "8") {
          age = answer.text;
        } else if (answer.questionId == "9") {
          numberOfDependents = answer.text;
        } else if (answer.questionId == "11") {
          descriptionOfBusiness = answer.text;
        } else if (answer.questionId == "11") {
          facebookInstagramLink = answer.text;
        }
      });

      var v = 0.0;
      if (score > 5) {
        v = 1.0;
      } else if (score >= 3 && score <= 4) {
        v = 0.5;
      }

      var w = 0;
      if (age >= 30 && age <= 50) {
        var w = 1;
      }

      var x = 0;
      if (numberOfDependents >= 1 && numberOfDependents <= 2) {
        x = 1;
      } else if (numberOfDependents > 2) {
        x = 0.5;
      }

      let nareemService = new NareemService();
      nareemService.sendToSentimentEndpoint(userId, descriptionOfBusiness, function(sentiment, uid) {

        var y = sentiment;

        nareemService.sendToSentimentEndpoint(userId, facebookInstagramLink, function(anotherSentiment, uid) {

          var z = anotherSentiment;

          var compositeScore = ((3*v)+w+x+y+(3*z))/5

          var recommendation = "";
          if (compositeScore < 0.5) {
            // not yet recommend
            recommendation = "Not yet recommend";
          } else if (compositeScore > 0.9) {
            // strongly recommend
            recommendation = "Strongly recommend";
          } else {
            // recomend with reservation
            recommendation = "Recommend with reservation";
          }

          var response = {"text": recommendation};
          console.log(response);
          myThis.callSendAPI(userId, response);

        });

      });

    });
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
      let answerIds = ["answer1-q1", "answer2-q1", "answer3-q1", "answer4-q1"];
      response = this.responseFourOptions(text, answerIds);
      myCache.set("questionId","1", 3600);
    }

    // Send the message to acknowledge the postback
    this.callSendAPI(sender_psid, response);
  }

  // Sends response messages via the Send API
  callSendAPI(sender_psid, response) {
    // Construct the message body
    let request_body = {
      messaging_type: "RESPONSE",
      recipient: {
        id: sender_psid
      },
      message: response
    };

    // Send the HTTP request to the Messenger Platform
    request(
      {
        uri: "https://graph.facebook.com/v3.2/me/messages",
        qs: { access_token: PAGE_ACCESS_TOKEN },
        method: "POST",
        headers: { "Content-type": "application/json" },
        json: request_body
      },
      (err, res, body) => {
        if (!err) {
          console.log("message sent!");
        } else {
          console.error("Unable to send message:" + err);
        }
      }
    );
  }

  responseFourOptions(text, answerIds) {
    return {
      text: text,
      quick_replies: [
        this.answerQuickReply("1", answerIds[0]),
        this.answerQuickReply("2", answerIds[1]),
        this.answerQuickReply("3", answerIds[2]),
        this.answerQuickReply("4", answerIds[3])
      ]
    };
  }

  answerQuickReply(title, answerId) {
    return {
      content_type: "text",
      title: title,
      payload: answerId,
      image_url: ""
    };
  }

  saveAnswer(answerText, questionId, userId) {
    this.saveAnswer(answerText, questionId, userId, null);
  }

  saveAnswer(answerText, questionId, userId, callback) {
    var answer = new AnswerModel( { text: answerText, questionId: questionId, userId: userId } );
    answer.save( function( err ) {
      if ( err ) {
        console.log( "Error! " + err.message );
        return err;
      } else {
        console.log("Answer saved");
      }
      if (callback) {
        callback(err);
      }
    });
  }

  getAnswers(callback) {
    AnswerModel.find({}, function(err, answers) {
      callback(answers);
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
