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
// When I wrote this, only God and I understood what I was doing
// Now, God only knows
// I'm drunk, TODO, fix later
//
//  ^
//  |
//  |
// If this comment is removed the program will blow up
*/
var apigClient = apigClientFactory.newClient();




/*
    APIgoatsGet

    Whenever this function is called, magically integrates itsel with the international
    Space Station to check for alien goats on earth, it also calls AWS API Gateway configuration
    for the
    GAAS (API)
        Goats (resource)
            GET (method)
*/
function APIgoatsGet(fn){
    try {
        var body = '';
        var params = '';
        var additionalParams = '';
        apigClient.goatsGet(params, body, additionalParams)
            .then(function(result){
                console.log("GAAS API/Goats/GET Responded with: %O", result.data);
                fn(result.data);
            }).catch( function(result){
                console.log(result);
                fn(false);
            });
    }
    catch(err) {
        console.log(err);
        fn(false);
    }// get Goats ends
}


/*
    APIreviewsGet

    Whenever this function is called, the goats are fed with the most flatterers comments on
    it the database, also calls AWS API Gateway configuration for the
    GAAS (API)
        Reviews (resource)
            GET (method)

    If serviceId is defined, it will look for reviews from that particular service on the database
    If serviceId is not defined, it will look for reviews from all the services on the database
*/
function APIreviewsGet(serviceId,fn){
    try {
        var body = '';
        var params = '';

        if(serviceId === null){
            var additionalParams = '';
        }
        else {
            var additionalParams = {
                queryParams: {
                    serviceId: serviceId
                }
            };
        }

        apigClient.reviewsGet(params, body, additionalParams)
            .then(function(result){
                console.log("GAAS API/Reviews/GET Responded with: %O", result.data);
                fn(result.data);
            }).catch( function(result){
                console.log(result);
                fn(false);
            });
    }
    catch(err) {
        console.log(err);
        fn(false);
    }// API get Reviews ends
}

/*
    APIreviewsGet

    Whenever this function is called, the goats dance of joy around the fire to honor
    their ancestors, also call AWS API Gateway configuration for the
    GAAS (API)
        Services (resource)
            GET (method)

    If serviceId is defined, it will look for that particular serviceId on the database
    If serviceId is not defined, it will look for all the services on the database
*/
function APIservicesGet(serviceId,fn){
    try {
        var body = '';
        var params = '';

        if(serviceId === null){
            var additionalParams = '';
        }
        else {
            var additionalParams = {
                queryParams: {
                    serviceId: serviceId
                }
            };
        }

        apigClient.servicesGet(params, body, additionalParams)
            .then(function(result){
                console.log("GAAS API/Services/GET Responded with: %O", result.data);
                fn(result.data);
            }).catch( function(result){
                console.log(result);
                fn(false);
            });
    }
    catch(err) {
        console.log(err);
        fn(false);
    }// API get Services ends
}


/*
    APIavailabilityGet

    Whenever this function is called, A cuantum space is created in time to assure goat
    availability, also call AWS API Gateway configuration for the
    GAAS (API)
        Availability (resource)
            GET (method)

    For a given date/number of goats, it checks the database for availability.

    This function requiere IAM Authentication, therefore, the apigClient requires
    accessKey, secretKey & sessionToken.
*/
function APIavailabilityGet(accessKey, secretKey, sessionToken, date, numberOfGoats, fn){
    try {

        var apigClient = apigClientFactory.newClient({
            accessKey: accessKey,
            secretKey: secretKey,
            sessionToken: sessionToken
        });

        var body = '';
        var params = '';
        var additionalParams = {
            //This is where any header, path, or querystring request params go. The key is the parameter named as defined in the API
            queryParams: {
                date: date,
                numberofgoats: numberOfGoats
            }
        };

        apigClient.availabilityGet(params, body, additionalParams)
            .then(function(result){
                console.log("GAAS API/Availability/GET Responded with: %O", result.data);
                fn(result.data);
            }).catch( function(result){
                console.log(result);
                fn(false);
            });
    }
    catch(err) {
        console.log(err);
        fn(false);
    }// API availability Get Ends
}


/*
    APIcartPost

    Whenever this function is called, a group of goats volunteers to serve the
    user, only those worthy will be booked, also call AWS API Gateway configuration for the
    GAAS (API)
        Cart (resource)
            POST (method)

    For a given username and service, it add the service to the user's cart.

    This function requiere IAM Authentication, therefore, the apigClient requires
    accessKey, secretKey & sessionToken.
*/
function APIcartPost(accessKey, secretKey, sessionToken, date, userName, serviceId, numberOfGoats, fn){
    try {

        var apigClient = apigClientFactory.newClient({
            accessKey: accessKey,
            secretKey: secretKey,
            sessionToken: sessionToken
        });

        var body = {
            date: date,
            username: userName,
            serviceid: serviceId,
            numberofgoats: numberOfGoats
        }
        var params = '';
        var additionalParams = '';

        apigClient.cartPost(params, body, additionalParams)
            .then(function(result){
                console.log("GAAS API/Cart/POST Responded with: %O", result.data);
                fn(result.data);
            }).catch( function(result){
                console.log(result);
                fn(false);
            });
    }
    catch(err) {
        console.log(err);
        fn(false);
    }// API cart Post Ends
}



/*
    APIcartDelete

    Whenever this function is called, the goats get mad, the only acceptable reasion to
    delete an item from the cart is to book and item from the cart, also call AWS API
    Gateway configuration for the
    GAAS (API)
        Cart (resource)
            DELETE (method)

    For a given order id and username, it deletes the order it from the user's cart.

    This function requiere IAM Authentication, therefore, the apigClient requires
    accessKey, secretKey & sessionToken.
*/
function APIcartDelete(accessKey, secretKey, sessionToken, userName, orderId, fn){
    try {

        var apigClient = apigClientFactory.newClient({
            accessKey: accessKey,
            secretKey: secretKey,
            sessionToken: sessionToken
        });
        var body = {
            username: userName,
            orderid: orderId,
        }
        var params = '';
        var additionalParams = '';

        apigClient.cartDelete(params, body, additionalParams)
            .then(function(result){
                console.log("GAAS API/Cart/DELETE Responded with: %O", result.data);
                fn(result.data);
            }).catch( function(result){
                console.log(result);
                fn(false);
            });
    }
    catch(err) {
        console.log(err);
        fn(false);
    }// API cart Delete Ends
}


/*
    APIcartGet

    Whenever this function is called, we compare your credit score on a few caribean islands
    to make sure you can afford the best of our services, also call AWS API
    Gateway configuration for the
    GAAS (API)
        Cart (resource)
            GET (method)

    For a given username, it retrieves the user's cart.

    This function requiere IAM Authentication, therefore, the apigClient requires
    accessKey, secretKey & sessionToken.
*/
function APIcartGet(accessKey, secretKey, sessionToken, userName, fn){
    try {

        var apigClient = apigClientFactory.newClient({
            accessKey: accessKey,
            secretKey: secretKey,
            sessionToken: sessionToken
        });
        var body = '';
        var params = '';
        var additionalParams = {
            queryParams: {
                username: userName
            }
        };

        apigClient.cartGet(params, body, additionalParams)
            .then(function(result){
                console.log("GAAS API/Cart/GET Responded with: %O", result.data);
                fn(result.data);
            }).catch( function(result){
                console.log(result);
                fn(false);
            });
    }
    catch(err) {
        console.log(err);
        fn(false);
    }// API cart Get Ends
}


/*
    APIorderPost

    Whenever this function is called, every single goat in the world jumps and dances
    full of joy, also call AWS API Gateway configuration for the
    GAAS (API)
        Oirder (resource)
            POST (method)

    For a given username and orderId, it books the service and number of goats
    related to the order, the goats are saved for this particular order.

    This function requiere IAM Authentication, therefore, the apigClient requires
    accessKey, secretKey & sessionToken.
*/
function APIorderPost(accessKey, secretKey, sessionToken, date, userName, serviceId, numberOfGoats, orderId, fn){
    try {

        var apigClient = apigClientFactory.newClient({
            accessKey: accessKey,
            secretKey: secretKey,
            sessionToken: sessionToken
        });
        var body = {
            date: date,
            username: userName,
            serviceid: serviceId,
            numberofgoats: numberOfGoats,
            orderid: orderId
        }
        var params = '';
        var additionalParams = '';

        apigClient.orderPost(params, body, additionalParams)
            .then(function(result){
                console.log("GAAS API/Order/POST Responded with: %O", result.data);
                fn(result.data);
            }).catch( function(result){
                console.log(result);
                fn(false);
            });
    }
    catch(err) {
        console.log(err);
        fn(false);
    }// API order Post Ends
}
