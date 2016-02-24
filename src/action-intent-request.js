/**
 * Created by ericjohnson on 2/23/16.
 */

let model = require('./response-model'),
  utilities = require('./utilities'),
  api = require('dictionary-api-client');

export function intent(event, context) {

  console.log('Intent Requested');

  // get intent info
  let intent = event.request.intent,
    intentName = intent.name,
    responseModel = new model.ResponseModel();

  let word = intent.slots.Word.value;

  api.get(word, function(apiResponse){
    if(intentName === 'GetDefinition'){
      define(apiResponse, responseModel, word, context);
    }

    if(intentName === 'GetSpelling'){
      spell(apiResponse, responseModel, word, context);
    }

  });
}

function define(response, model, word, context) {
  if (response.status === 200 && response.content.length > 0) {
    model.cardTitle = `${word} defined`;
    model.speechOutput = `The ${response.content[0].PartOfSpeech} form of the word ${word} comes from the root word ${response.content[0].Word}, and means... ${response.content[0].Definitions[0]}`;
  } else {
    model.speechOutput = `I'm sorry I could not find a definition for the word ${word}`;
    model.repromptText = "If you would like to try another word please say define followed by the word you would like me to define";
  }
  respond(model, context);
}

function spell(response, model, word, context) {
  if (response.status === 200 && response.content.length > 0) {
    model.cardTitle = `${word} Spelled`;
    model.speechOutput = `The ${response.content[0].PartOfSpeech} form of the word ${word} comes from the root word ${response.content[0].Word}, and is spelled... <say-as interpret-as='spell-out'>${response.content[0].Word}</say-as>`;
  } else {
    model.speechOutput = `I'm sorry I could not find a spelling for the word ${word}`;
    model.repromptText = "If you would like to try another word please say spell followed by the word you would like me to spell";
  }
  respond(model, context);
}

function respond(model, context) {
  // build response speechlet
  let speechlet = model.buildSpeechResponse;
  // build response
  let response = utilities.buildResponse(model.sessionAttributes, speechlet);
  context.succeed(response);
}