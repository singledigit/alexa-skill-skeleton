/**
 * Created by ericjohnson on 2/23/16.
 */

let model = require('./response-model'),
  utilities = require('./utilities'),
  http = require('http');

export function intent(event, context) {

  // get intent info
  let intent = event.request.intent,
    intentName = intent.name,
    responseModel = new model.ResponseModel();

  let word = intent.slots.Word.value;

  callApi(word, function(foo){
    if(intentName === 'GetDefinition'){
      GetDefinition(foo, responseModel, word, context);
    }

    if(intentName === 'GetSpelling'){
      GetSpelling(foo, responseModel, word, context);
    }

  });
}

let callApi = function(word, callback){
  console.log('api called');

  let data = {
    content:'',
    status: 0
  };

  console.log('data set');

  http.get(`http://dictionaryapi.net/api/definition/${word}`, function(res) {

    data.status = res.statusCode;

    console.log(res.statusCode);

    res.on('data', function(chunk){
      data.content += chunk;
    });

    res.on('end', function() {
      data.content = JSON.parse(data.content);
      callback(data);
    });

    res.resume();

  }).on('error', function(error){
    context.fail('There was a problem with the dictionary API')
  });
};

function GetDefinition(response, model, word, context) {
  if (response.status === 200 && response.content.length > 0) {
    model.cardTitle = `${word} defined`;
    model.speechOutput = `The ${response.content[0].PartOfSpeech} form of the word ${word} comes from the root word ${response.content[0].Word}, and means... ${response.content[0].Definitions[0]}`;
  } else {
    model.speechOutput = `I'm sorry I could not find a definition for the word ${word}`;
    model.repromptText = "If you would like to try another word please say define followed by the word you would like me to define";
  }
  respond(model, context);
}

function GetSpelling(response, model, word, context) {
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
  let speechlet = model.buildSpeechResponse();
  // build response
  let response = utilities.buildResponse(model.sessionAttributes, speechlet);
  context.succeed(response);
}