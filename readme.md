#Alexa Skill ES6 Skeleton

This is a starter package to create alexa skills using ES6 and pre-transpiling with babel.

##To Use

1. Clone This repo
2. Run `npm install`
3. Edit `action` files as needed
4. Run `gulp build`. This will create a file called package.zip in the root of your project.
5. Upload `package.zip` to your Lambda

##Files

###index.js
This is the base file that is loaded when the Lambda first loads. This file determines the Request type and routes accordingly.

###action-launch-request.js
Ths page handles the LaunchRequest which is generally a base welcome and a prompt for more info from the user to help define the intent.

###action-intent-request.js
When an intent is determined, this page is loaded and handles the intent.

###action-session-end-request.js
Responsible for clearing the session and cleaning up.

###response-model.js
Provides a model for a standard request. This is a good place to insert default values.

###utilities.js
Provides global functions for the application.

###api-client.js
Helpful if this app needs to make a call to a rest API, which the skeleton example does.