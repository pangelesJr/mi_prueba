/* 318
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
* You may think you know what the following code does.
* But you dont. Trust me.
* Fiddle with it, and youll spend many a sleepless
* night cursing the moment you thought youd be clever
* enough to "optimize" the code below.
* Now close this file and go play with something else.
*/

function isEmptyObject(obj) {
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
}

function findTotal(){
    var arr = document.getElementsByName('servicePrice');
    var total=0;
    for(var i=0;i<arr.length;i++){
        str = arr[i].textContent;
        var mySubString = str.substring(
            str.lastIndexOf("$") + 1,
            str.lastIndexOf(".")
        );
        if(parseInt(mySubString))
            total += parseInt(mySubString);
    }
    if(total > 0){
        document.getElementById("subtotal").textContent= "$"+total+".00";
        document.getElementById("grantotal").textContent= "$"+total+".00";
        addListeners();
    }
    else{
        setTimeout(findTotal, 1000);
    }
}

function addListeners(){
    var arr = document.getElementsByName('close');
    for(var i=0; i<arr.length; i++){
        str = arr[i].innerHTML;
        arr[i].addEventListener("click", function() {

            var source = event.target || event.srcElement;
            var targetDiv = event.srcElement.parentElement.getElementsByClassName("cart-item-info")[0]
            targetDiv.innerHTML = targetDiv.innerHTML + '</br><img src="images/purple.gif" alt="" height="35" width="35"/>';

            var orderid = event.srcElement.parentElement.getElementsByClassName("orderid")[0].textContent
            deleteFromCart(orderid);

            event.srcElement.parentElement.remove();
            setTimeout(findTotal, 1000);
        });
    }
}

function deleteFromCart(orderid){
    APIcartDelete(AWS.config.credentials.accessKeyId,
        AWS.config.credentials.secretAccessKey,
        AWS.config.credentials.sessionToken,
        CognitoLocal_Username, orderid, function(result){
            console.log("Single Module, deleteFromCart() responded with: %O", result);

        }); // Ends APIavailabilityGet
}

$(window).load(function() {
    setTimeout(myLoadPageFunction, 1000);

    order.addEventListener("click", function() {

        APIcartGet(AWS.config.credentials.accessKeyId,
            AWS.config.credentials.secretAccessKey,
            AWS.config.credentials.sessionToken,
            CognitoLocal_Username, function(result){
                console.log("Single Module, APIcartGet() responded with: %O", result);
                var fullObject = result.Item.cart.L;

                    for (var i = 0; i < result.Item.cart.L.length; i++){
                        (function(cntr) {
                            // For Begins
                            var fullObject = result.Item.cart.L;
                            var cartObject = result.Item.cart.L[i];

                            var orderid = fullObject[cntr]["M"]["orderid"]["S"];
                            var date = fullObject[cntr]["M"]["date"]["S"];
                            var numberOfGoats = fullObject[cntr]["M"]["numberofgoats"]["N"];
                            var serviceid = fullObject[cntr]["M"]["serviceid"]["N"];

                            APIavailabilityGet(AWS.config.credentials.accessKeyId,
                                AWS.config.credentials.secretAccessKey,
                                AWS.config.credentials.sessionToken,
                                date, numberOfGoats, function(result){
                                    console.log("Single Module, APIavailabilityGet() responded with: %O", result);
                                    if(Array.isArray(result))
                                    {
                                        var AvailabilityObject = result[0];
                                        var available = AvailabilityObject.availability;

                                        if(available == "TRUE"){
                                            document.getElementById('order').insertAdjacentHTML('beforebegin',
                                                '<p><b>Item: '+ orderid +'</b></p>');
                                            document.getElementById('order').insertAdjacentHTML('beforebegin',
                                                '<p> - Goats Still available</p>');
                                            document.getElementById('order').insertAdjacentHTML('beforebegin',
                                                '<p> - Booking now...</p>');

                                            APIorderPost(AWS.config.credentials.accessKeyId,
                                                AWS.config.credentials.secretAccessKey,
                                                AWS.config.credentials.sessionToken,
                                                date, CognitoLocal_Username, serviceid,
                                                String(numberOfGoats), orderid, function(result){
                                                    console.log("Single Module, APIorderPost() responded with: %O", result);
                                                }); // Ends APIcartPost
                                            document.getElementById('order').insertAdjacentHTML('beforebegin',
                                                '<p> - Done!</p>');
                                            deleteFromCart(orderid);

                                        } else {
                                            document.getElementById('order').insertAdjacentHTML('beforebegin',
                                                '<p><b>No goats available, skipping</b></p>');
                                        }
                                }
                            }); // Ends APIavailabilityGet

                        })(i);
                    } // For Ends
                }); // Ends APIavailabilityGet
    });
});

function myLoadPageFunction() {
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

                    APIcartGet(AWS.config.credentials.accessKeyId,
                        AWS.config.credentials.secretAccessKey,
                        AWS.config.credentials.sessionToken,
                        CognitoLocal_Username, function(result){
                            console.log("Single Module, APIcartGet() responded with: %O", result);

                            if (result.Item.cart.L.length == 0){
                                var toAppend = "<h1>You don't have items on your cart ...yet, take a look at our <a href='services.html'>services</a>.</h1>";
                                document.getElementById("col-md-9").innerHTML = toAppend;
                                document.getElementById("col-md-3").innerHTML = "";
                            }
                            else
                            {
                                var toAppend = '<h1>You have '+ result.Item.cart.L.length +' item(s) on your cart</h1>';
                                document.getElementById("col-md-9").innerHTML = toAppend;

                                for (var i = 0; i < result.Item.cart.L.length; i++){
                                    (function(cntr) {
                                        // For Begins

                                        var fullObject = result.Item.cart.L;
                                        var cartObject = result.Item.cart.L[i];

                                        APIservicesGet(cartObject["M"]["serviceid"]["N"],function(result){
                                            console.log("Single Module, APIservicesGet() responded with: %O", result);
                                            if(Array.isArray(result))
                                            {
                                                var serviceObject = result[0];
                                                var toAppend = "";
                                                toAppend += '<div class="cart-header" name="cart-header" id="cart-header'+ cntr +'">';
                                                toAppend += '    <div class="close1" name="close" id="close'+ cntr +'"></div>';
                                                toAppend += '    <div class="cart-sec simpleCart_shelfItem">';
                                                toAppend += '        <div class="cart-item cyc">';
                                                toAppend += '            <img src="'+ serviceObject.ImageCover +'" class="img-responsive" alt="">';
                                                toAppend += '        </div>';
                                                toAppend += '        <div class="cart-item-info" id="cart-item-info">';
                                                toAppend += '            <h3>'+ serviceObject.Name +' ('+ serviceObject.Goats +' Goats)</h3>';
                                                toAppend += '            <ul class="qty">';
                                                toAppend += '                <li><p name="servicePrice">Price: <b>$'+ serviceObject.CurrentPrice +'.00</b></p></li>';
                                                toAppend += '                <li><p name="servicePrice">For date: '+ fullObject[cntr]["M"]["date"]["S"] +'</p></li>';
                                                toAppend += '                <li><p name="servicePrice">Order: <span class="orderid" >'+ fullObject[cntr]["M"]["orderid"]["S"] +'</span></p></li>';
                                                toAppend += '            </ul>';
                                                toAppend += '        </div>';
                                                toAppend += '        <div class="clearfix"></div>';
                                                toAppend += '    </div>';
                                                toAppend += '</div>';

                                                $('#col-md-9').append(toAppend);
                                            }
                                        }); // Ends APIservicesGet
                                    })(i); // Ends for internal function
                                } // For Ends
                            }

                        }); // Ends APIavailabilityGet
                }
            }
        });
        setTimeout(findTotal, 1000);
    }
    else {
        innerHTML = '<h1>You must be logged in to be able to place an order, please <a href="login.html">Log in</a>.</b></span>';
        document.getElementById("col-md-9").innerHTML = innerHTML;
        document.getElementById("col-md-3").innerHTML = "";
    }
}


$(document).ready(function() {
    /*
        get Goats

        Populates the #Goatgram feed with the best images of our goats. Visitors often come
        to our page just to see cute baby goats, we love it.

    */
    APIgoatsGet(function(result){
        console.log("Single Module, APIgoatsGet() responded with: %O", result);
        if(Array.isArray(result))
        {
            for (var i = 0; i < result.length; i++){
                var GoatObject = result[i];
                var toAppend = "";
                if (i < result.length-1)
                    toAppend += '<li><a class="popup-with-zoom-anim" href="#small-dialog1"><img src="' + GoatObject.URLImage + '" class="img-responsive"alt=""/></a></li>';
                else
                    toAppend += '<li class="last_instagram"><a class="popup-with-zoom-anim" href="#small-dialog1"><img src="' + GoatObject.URLImage + '" class="img-responsive"alt=""/></a></li><div class="clearfix"></div></br>';
                $('#instagram_grid').append(toAppend);
            }
        }
        else {
            var toAppend = "";
            toAppend += '<li class="last_instagram"><a class="popup-with-zoom-anim" href="#small-dialog1"><img src="./images/fail.jpg" class="img-responsive"alt=""/></a></li><li><div class="cart-left" style="color:red;"><p><b>You goat to be kidding me! something went wrong</b></p></div></li><div class="clearfix"></div>';
            $('#instagram_grid').append(toAppend);
        }
    }); // Ends APIgoatsGet
});
