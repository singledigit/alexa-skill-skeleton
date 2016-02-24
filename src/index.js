/**
 * Created by ericjohnson on 2/21/16.
 */

let Utilities = require('./utilities'),
  ActionLaunchRequest = require('./action-launch-request'),
  ActionIntentRequest = require('./action-intent-request'),
  ActionSessionEndRequest = require('./action-session-end-request');

export function dictionary(event, context){

  let type = event.request.type;

  // Verify this is our app
  Utilities.validateApplicationId(event, context);

  // Log Session
  if (event.session.new) {
    console.log(`Session has started.  Request Id = ${event.request.requestId} and Session Id = ${event.session.sessionId}.`);
  }

  // call correct action based on request type
  switch(type){
    case 'LaunchRequest':
      ActionLaunchRequest.launch(event, context);
      break;
    case 'IntentRequest':
      ActionIntentRequest.intent(event, context);
      break;
    case 'SessionEndRequest':
      ActionSessionEndRequest.sessionEnd(event, context);
      break;
    default:
      ActionLaunchRequest.launch(event, context);
      break;
  }
}