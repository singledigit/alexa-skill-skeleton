/**
 * Created by ericjohnson on 2/23/16.
 */

export function sessionEnd(event, context){

  console.log('Session End Requested');

  console.log(`Session ${event.request.sessionId} is now complete`);
  context.succeed('All done');
}