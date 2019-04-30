
require('./database');

const database = new Database();
const mongoose = database.mongoose;

const answerModelSchema = new mongoose.Schema({
  text: { type: String, required: true },
  questionId: { type: String, required: true},
  userId: { type: String, required: true},
})

// Compile model from schema
//var answerModel = mongoose.model('AnswerModel', answerModelSchema );
module.exports = mongoose.model('AnswerModel', answerModelSchema);