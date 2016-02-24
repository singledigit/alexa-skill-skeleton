/**
 * Created by ericjohnson on 2/23/16.
 */

let model = require('./response-model'),
    utilities = require('./utilities');

export function launch(event, context){

  console.log('Launch Requested');

  // set response info
  let responeModel = new model.ResponseModel();

  responeModel.sessionAttributes = {};
  responeModel.cardTitle = 'Welcome';
  responeModel.speechOutput = "Welcome to the Dictionary app. Please tell me a word you would like to define or spell by saying define or spell, and then the word";
  responeModel.repromptText = "Please tell me a word you would like to define or spell by saying define or spell, and then the word. For example Define Actuary or Spell Psychic";
  responeModel.shouldEndSession = false;

  // build response speechlet
  let speechlet = responeModel.buildSpeechResponse();

  // build response
  let buildResponse = utilities.buildResponse(responeModel.sessionAttributes, speechlet);

  context.succeed(buildResponse);
}