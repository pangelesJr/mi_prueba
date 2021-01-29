/*
           / /
          / /
       (\/_/')
       /   '/
      0  0   \
     /        \
    /    __/   \
   /,  _/ \     \_
   `-./ )) |     ~^~^~^~^~^~^~^~\~.
       ((  /                     \_}
          |   GAAS INC.   /      |
          ;     |         \      /
          \/ ,/           \    |
          / /~~|~|~~~~~~|~|\   |
         / /   | |      | | `\ \
        / /    | |      | |   \ \
       / (     | |      | |    \ \
      /,_)    /__)     /__)   /,_/
'''''"""""'''""""""'''""""""''"""""'''''
// At this point, I'd like to take a moment to speak to you about the Adobe PSD
// format. PSD is not a good format. PSD is not even a bad format. Calling it
// such would be an insult to other bad formats, such as PCX or JPEG. No, PSD
// is an abysmal format. Having worked on this code for several weeks now, my
// hate for PSD has grown to a raging fire that burns with the fierce passion
// of a million suns.
*/


var CognitoLocal_ActiveValidSession = false;
var CognitoLocal_ActiveFederatedSession = false;
var CognitoLocal_Username = '';
var CognitoLocal_FirstName = '';
var CognitoLocal_LastName = '';
var CognitoLocal_Email = '';

// -----------------------------------
// Generates the accessKeyId & secretAccessKey to federate access
//
// params: accessToken
//         The Cognito User Pool generated token
//         If the token is valiated by the IdentityPool
//         accessKeyId & secretAccessKey are generated
// -----------------------------------
function GetAWScredentials(accessToken) {

    // Set the constants
    AWS.config.region = 'us-east-1'; // Region
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: IDENTITYPOOLID,
        Logins : {
            'cognito-idp.us-east-1.amazonaws.com/us-east-1_cdVXm84ET' : accessToken
        }
    });

    // Validate the accessToken
    var cognitoIdentity = new AWS.CognitoIdentity();
    AWS.config.credentials.get(function(err, data) {
        if (!err) {
            console.log("IDENTITY MODULE: Cognito retrieved identity!");
            var params = {
                IdentityId: AWS.config.credentials.identityId
            };
            var getCredentialsParams = {
                IdentityId: AWS.config.credentials.identityId,
                Logins: {
                    'cognito-idp.us-east-1.amazonaws.com/us-east-1_cdVXm84ET' : accessToken
                }
            };

            // Validate the cognitoIdentity
            cognitoIdentity.getCredentialsForIdentity(getCredentialsParams, function(err, credentials) {
                if (err){
                    console.log(err, err.stack);
                } else {

                    // Success!!!
                    console.log("IDENTITY MODULE: Got accessKey!");
                    console.log("IDENTITY MODULE: Got secret AccessKey!");
                    CognitoLocal_ActiveFederatedSession = true;
                }
            });
        } else {
            console.log('error retrieving identity:' + err);
        }
    });
}

$(document).ready(function() {
    var data = { UserPoolId : USERPOOLID,
        ClientId : CLIENTID
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(data);
    var cognitoUser = userPool.getCurrentUser();

    if (cognitoUser != null) {
        cognitoUser.getSession(function(err, session) {
            if (err) {
                console.log(err);
                return;
            }

            CognitoLocal_ActiveValidSession = session.isValid()
            CognitoLocal_Username = cognitoUser.username;
            CognitoLocal_FirstName = cognitoUser.signInUserSession.idToken.payload.name;
            CognitoLocal_LastName = cognitoUser.signInUserSession.idToken.payload.family_name;
            CognitoLocal_Email = cognitoUser.signInUserSession.idToken.payload.email

            var accessToken = session.getAccessToken().getJwtToken();
            console.log("IDENTITY MODULE: Itentity Pool, Got access token!");
            var idToken = session.idToken.jwtToken;
            console.log("IDENTITY MODULE: Federated Access Pool, Got credentials!");
            GetAWScredentials(idToken);


            document.getElementById("wc-message").innerHTML = "Wellcome "+cognitoUser.signInUserSession.idToken.payload.name;
            var content = '<li><a href="logout.html">Log Out</a></li>';
            var element =  document.getElementById('navMenu');
            if (typeof(element) != 'undefined' && element != null)
            {
              navMenu.insertAdjacentHTML('beforeend', content);
            }
        });
    }
    else {
        document.getElementById("wc-message").innerHTML = "Please log in";
    }
});
