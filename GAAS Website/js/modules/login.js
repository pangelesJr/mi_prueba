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
// Dear future me. Please forgive me, You are not meant to understand this.
// I can't even begin to express how sorry I am, i'm not responsible of this code.
// They made me write it, against my will.
// Please work
*/

$(window).load(function() {

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
            else {
                if (session.isValid()){
                    var HTMLtoAppend = '<h3>LOG OUT</h3><p>You are already logged in as <b>'+CognitoLocal_FirstName+' '+CognitoLocal_LastName+'</b>, do you want to log out?</p><a class="acount-btn" href="logout.html">Log Out</a>'
                    document.getElementById("login-right-container").innerHTML = HTMLtoAppend;
                }
            }
        });
    }


    document.getElementById('LoginForm').onsubmit = function(){
        // -----------------------------------
        // Let's validate the form!
        // -----------------------------------
        document.getElementById("EMessage").innerHTML = "";
        var eMail = document.getElementById("eMail").value;
        if (eMail == "") {
            document.getElementById("EMessage").innerHTML = "Please review your Email Address";
            return false;
        }
        var inPass = document.getElementById("inPass").value;
        if (inPass == "") {
            document.getElementById("EMessage").innerHTML = "Please review your Password";
            return false;
        }

        // -----------------------------------
        // If you get here, the form was valid!
        // -----------------------------------
        document.getElementById("OKMessage").innerHTML = "Sending...";

        // -----------------------------------
        // Let's send the data to Cognito
        // -----------------------------------
        var authenticationData = {
            Username : eMail,
            Password : inPass,
        };
        var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
        var poolData = { UserPoolId : USERPOOLID,
            ClientId : CLIENTID
        };
        var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
        var userData = {
            Username : eMail,
            Pool : userPool
        };

        var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                var accessToken = result.getAccessToken().getJwtToken();

                /* Use the idToken for Logins Map when Federating User Pools with identity pools or when passing through an Authorization Header to an API Gateway Authorizer */
                var idToken = result.idToken.jwtToken;
                GetAWScredentials(idToken);

                document.getElementById("OKMessage").innerHTML = "";
                document.getElementById("OKMessage").innerHTML = "You're now logged in, you'll be redirected...";
                window.location.href = './services.html'; //relative to domain
                return false;
            },
            onFailure: function(err) {
                console.log(err);
                var errMsg = err["message"]
                document.getElementById("OKMessage").innerHTML = "";
                document.getElementById("EMessage").innerHTML = "<br>You goat to be kidding me, "+errMsg;
                return false;
            },
        });
        return false;
    }
});
