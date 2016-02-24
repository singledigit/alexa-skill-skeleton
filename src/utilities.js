/**
 * Created by ericjohnson on 2/21/16.
 */

export function validateApplicationId(event, context) {
  let myAppId = "amzn1.echo-sdk-ams.app.c27f3eb5-57be-47f4-ba4e-a4d2d86a70b3",
    isMyApp = event.session.application.applicationId === myAppId;

  console.log(`App ID ${event.session.application.applicationId} ${isMyApp ? 'matches' : 'does not match'} my app id`);

  return isMyApp ? null : context.fail('This App is not the app your looking for');
}

export function buildResponse(sessionAttributes, speechletResponse) {
  return {
    version: "1.0",
    sessionAttributes: sessionAttributes,
    response: speechletResponse
  };
}