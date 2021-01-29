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
This horrible monstrosity takes a medicare monstrosity and mangles it
into a data structure that can easily be used to create a medicare feed.
It's bloated, confusing, and pretty awful by necessity(for the most part).
*/

$(window).load(function() {

    document.getElementById('registerForm').onsubmit = function(){
        // -----------------------------------
        // Let's validate the form!
        // -----------------------------------
        document.getElementById("EMessage").innerHTML = "";
        var fName = document.getElementById("fName").value;
        if (fName == "") {
            document.getElementById("EMessage").innerHTML = "Please review your First Name";
            return false;
        }
        var lName = document.getElementById("lName").value;
        if (lName == "") {
            document.getElementById("EMessage").innerHTML = "Please review your Last Name";
            return false;
        }
        var eMail = document.getElementById("eMail").value;
        if (eMail == "") {
            document.getElementById("EMessage").innerHTML = "Please review your Email Address";
            return false;
        }
        var mPhone = document.getElementById("mPhone").value;
        if (mPhone == "") {
            document.getElementById("EMessage").innerHTML = "Please review your Mobile Phone";
            return false;
        }
        var inPass = document.getElementById("inPass").value;
        if (inPass == "") {
            document.getElementById("EMessage").innerHTML = "Please review your Password";
            return false;
        }
        var CinPass = document.getElementById("CinPass").value;
        if (CinPass == "") {
            document.getElementById("EMessage").innerHTML = "Please review your Password Confirmation";
            return false;
        }

        // -----------------------------------
        // If you get here, the form was valid!
        // -----------------------------------
        document.getElementById("OKMessage").innerHTML = "Sending...";

        // -----------------------------------
        // Let's send the data to Cognito
        // -----------------------------------
        var poolData = { UserPoolId : USERPOOLID,
            ClientId : CLIENTID
        };

        var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
        var attributeList = [];
        // Email
        var dataEmail = {
            Name : 'email',
            Value : eMail
        };
        var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);

        // Phone
        var dataPhone = {
            Name : 'phone_number',
            Value : mPhone
        };
        var attributePhone = new AmazonCognitoIdentity.CognitoUserAttribute(dataPhone);

        // Name
        var dataName = {
            Name : 'name',
            Value : fName
        };
        var attributeName = new AmazonCognitoIdentity.CognitoUserAttribute(dataName);

        // LastName
        var dataLName = {
            Name : 'family_name',
            Value : lName
        };
        var attributeLName = new AmazonCognitoIdentity.CognitoUserAttribute(dataLName);

        attributeList.push(attributeEmail);
        attributeList.push(attributePhone);
        attributeList.push(attributeName);
        attributeList.push(attributeLName);

        userPool.signUp(eMail, inPass, attributeList, null, function(err, result){
            if (err) {
                document.getElementById("OKMessage").innerHTML = "";
                console.log(err);
                document.getElementById("EMessage").innerHTML = "You goat to be kidding me! "+err.message;
                return false;
            }
            cognitoUser = result.user;

            newHTML = '<h2>YOU ARE NOT DONE YET!</h2><h3>We have sent you an email to ';
            newHTML += cognitoUser.getUsername();
            newHTML += ', look for your confirmation code, once you have it, insert it below!</h3><div class="register-bottom-grid" id="register-bottom-grid"><div><span>Verification code</span><input id="vCode" name="vCode" type="text"></div></div><div class="clearfix"> </div><div class="register-but" id="register-but"><form id="CCodeForm" name="CCodeForm" action="#" onsubmit="return false"><input type="submit" value="submit"><b>&nbsp;&nbsp;<span style="color:red;" id="CCFEMessage"></span><span style="color:green;" id="CCFOKMessage"></span></b><div class="clearfix"></div></form></div>';
            document.getElementById("register").innerHTML = newHTML;
            document.getElementById("CCodeForm").addEventListener("submit",validationCode);
            return true;
        });
        return false;
    }

});

function validationCode() {

    var vCode = document.getElementById("vCode").value;
    if (vCode == "") {
        document.getElementById("CCFEMessage").innerHTML = "Please review your Validation Code";
        return false;
    }

    document.getElementById("CCFOKMessage").innerHTML = "Sending...";
    cognitoUser.confirmRegistration(vCode, true, function(err, result) {
        if (err) {
            console.log(err);
            document.getElementById("CCFOKMessage").innerHTML = "";
            document.getElementById("CCFEMessage").innerHTML = "You goat to be kidding me! "+err.message;
            return;
        }

        if(result == "SUCCESS"){
            newHTML = '<h2>YOU ARE ALL SET</h2>';
            newHTML += '<h3>You can now log in as '+cognitoUser.getUsername()+' at the <a href="login.html">Log In</a> page.</h3>'
            document.getElementById("register").innerHTML = newHTML;
        }
        else {
            document.getElementById("CCFEMessage").innerHTML = "You goat to be kidding me! Please contact support@gaas.mx";
        }
    });
}
