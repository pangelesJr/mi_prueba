/*
           / /
          / /
       (\/_/)
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
 * I have no idea why this function works, but it does,
 * so it's probably best to leave it alone unless you
 * know how/why it works
*/

function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}
var numberOfGoats = 0;

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
                    toAppend += '<li class="last_instagram"><a class="popup-with-zoom-anim" href="#small-dialog1"><img src="' + GoatObject.URLImage + '" class="img-responsive"alt=""/></a></li><div class="clearfix"></div>';
                $('#instagram_grid').append(toAppend);
            }
        }
        else {
            var toAppend = "";
            toAppend += '<li class="last_instagram"><a class="popup-with-zoom-anim" href="#small-dialog1"><img src="./images/fail.jpg" class="img-responsive"alt=""/></a></li><li><div class="cart-left" style="color:red;"><p><b>You goat to be kidding me! something went wrong</b></p></div></li><div class="clearfix"></div>';
            $('#instagram_grid').append(toAppend);
        }
    }); // Ends APIgoatsGet


    /*
        get Reviews

        Populates the #col-md-3" DIV on the right side of the webpage with random reviews
        from our customers, we don't really understand most of them.
    */
    APIreviewsGet(null,function(result){
        console.log("Single Module, APIreviewsGet() responded with: %O", result);
        if(Array.isArray(result))
        {
            for (var i = 0; i < result.length; i++){
                var ReviewObject = result[i];
                var toAppend = "";

                var blackStars = parseInt(ReviewObject.Score);
                var whiteStars = 5 - blackStars;
                stars = "★".repeat(blackStars) + "☆".repeat(whiteStars)

                toAppend += '<div class="tags">';
                toAppend += '    <h4 class="tag_head">Testimonial </h4>';
                toAppend += '    <p>"'+ReviewObject.Review+'"<p>';
                toAppend += '    <br><p>'+stars+'</p>';
                toAppend += '    <br><p><b><i> - '+ReviewObject.Reviewer+'</i></b></p>';
                toAppend += '</div>';

                $('#col-md-3').append(toAppend);
            }
        }
        else {
            var toAppend = "";
            toAppend += '<div class="tags" style="color:red;"><h4 class="tag_head">Testimonial </h4><p><b>You goat to be kidding me! something went wrong</b><p></div>';
            $('#col-md-3').append(toAppend);
        }
    }); // Ends APIreviewsGet


    /*
        get Services

        Populates the page with the information from a single service, defined by the
        web parameter serviceId
    */
    APIservicesGet(findGetParameter("serviceId"),function(result){
        console.log("Single Module, APIservicesGet() responded with: %O", result);
        if(Array.isArray(result))
        {
            var ServiceObject = result[0];
            numberOfGoats = ServiceObject["Goats"];
            document.getElementById("ServiceName").innerHTML = ServiceObject["Name"];
            document.getElementById("reducedfrom").innerHTML = "$"+ServiceObject["PrevPrice"]+".00";
            document.getElementById("item_price").innerHTML = "$"+ServiceObject["CurrentPrice"]+".00";
            document.getElementById("quick_desc").innerHTML = ServiceObject["Overview"];
            document.getElementById("ProductDescription").innerHTML = ServiceObject["Description"];
            document.getElementById("AditionalInfo").innerHTML = ServiceObject["AditionalInfo"];

            document.getElementById("S1").src = ServiceObject["ImageCover"];
            document.getElementById("S2").src = ServiceObject["SecondaryImageA"];
            document.getElementById("S3").src = ServiceObject["SecondaryImageB"];
            document.getElementById("S4").src = ServiceObject["SecondaryImageC"];
            document.getElementById("miniImage0").src = ServiceObject["ImageCover"];
            document.getElementById("miniImage1").src = ServiceObject["SecondaryImageA"];
            document.getElementById("miniImage2").src = ServiceObject["SecondaryImageB"];
            document.getElementById("miniImage3").src = ServiceObject["SecondaryImageC"];
        }
        else {
            document.getElementById("ServiceName").innerHTML = '<div class="cart-left" style="color:red;"><p><b>You goat to be kidding me! something went wrong</b></p></div>';
            document.getElementById("S1").src = "./images/fail.jpg";
            document.getElementById("S2").src = "./images/fail.jpg";
            document.getElementById("S3").src = "./images/fail.jpg";
            document.getElementById("S4").src = "./images/fail.jpg";
            document.getElementById("miniImage0").src = "./images/fail.jpg";
            document.getElementById("miniImage1").src = "./images/fail.jpg";
            document.getElementById("miniImage2").src = "./images/fail.jpg";
            document.getElementById("miniImage3").src = "./images/fail.jpg";
        }
    }); // Ends APIservicesGet


    /*
        get Reviews

        Populates the information under the reviews tab below the main container.
    */
    APIreviewsGet(findGetParameter("serviceId"),function(result){
        console.log("Single Module, APIreviewsGet() responded with: %O", result);
        if(Array.isArray(result))
        {
            for (var i = 0; i < result.length; i++){
                var ReviewObject = result[i];
                var toAppend = "";

                var blackStars = parseInt(ReviewObject.Score);
                var whiteStars = 5 - blackStars;
                stars = "★".repeat(blackStars) + "☆".repeat(whiteStars)

                date = ReviewObject.Date.split("T");

                toAppend += '<div class="tags">';
                toAppend += '    <h4 class="tag_head">'+ReviewObject.Reviewer+'</h4>';
                toAppend += '    <p>"'+ReviewObject.Review+'"<p>';
                toAppend += '    <br><p>'+stars+'</p>';
                toAppend += '    <p>'+date[0]+'</p>';
                toAppend += '</div>';

                $('#tab_item-2').append(toAppend);
            }
        }
        else {
            var toAppend = "";
            toAppend += '<div class="tags" style="color:red;"><h4 class="tag_head">Testimonial </h4><p><b>You goat to be kidding me! something went wrong</b><p></div>';
            $('#col-md-3').append(toAppend);
        }
    }); // Ends APIreviewsGet

});


$(window).load(function() {

    var datepickerValue = "";
    var addToCartDiv = document.getElementById("addToCartDiv");
    addToCartDiv.style.display = "none";

    document.getElementById('availabilityForm').onsubmit = function(e){
        e.preventDefault();
        innerHTML = "";
        datepickerValue = document.getElementById("datepicker").value;

        if(CognitoLocal_ActiveValidSession && CognitoLocal_ActiveFederatedSession)
        {
            if(datepickerValue == "MM/DD/YYYY"){
                innerHTML += '</br><span style="color:red;" id="EMessage"><b>Please select a date</b></span>';
                document.getElementById("availabilityResults").innerHTML = innerHTML;
            } else {
                innerHTML += '</br><img src="images/purple.gif" alt="" height="42" width="42"/> Loading...';
                document.getElementById("availabilityResults").innerHTML = innerHTML;

                APIavailabilityGet(AWS.config.credentials.accessKeyId,
                    AWS.config.credentials.secretAccessKey,
                    AWS.config.credentials.sessionToken,
                    datepickerValue, numberOfGoats, function(result){
                        console.log("Single Module, APIavailabilityGet() responded with: %O", result);
                        if(Array.isArray(result))
                        {
                            var AvailabilityObject = result[0];
                            innerHTML = '</br><span><b>'+AvailabilityObject.msg+'</b></span>';
                            innerHTML += '</br>';
                            document.getElementById("availabilityResults").innerHTML = innerHTML;
                            if(AvailabilityObject.availability == "TRUE"){
                                addToCartDiv.style.display = "block";
                            }
                        }
                        else {
                            innerHTML = '</br><div class="cart-left" style="color:red;"><p><b>You goat to be kidding me! something went wrong</b></p></div>';
                            document.getElementById("availabilityResults").innerHTML = innerHTML;
                        }
                    }); // Ends APIavailabilityGet
            }
        }
        else {
            innerHTML += '</br><span style="color:red;" id="EMessage"><b>You must be logged in before checking for avilability and booking, please <a href="login.html">Log in</a>.</b></span>';
            document.getElementById("availabilityResults").innerHTML = innerHTML;
        }
        return false;
    }

    document.getElementById('addToCart').onsubmit = function(e){
        e.preventDefault();

        innerHTML = "";
        if(CognitoLocal_ActiveValidSession && CognitoLocal_ActiveFederatedSession) {
            innerHTML += '</br><img src="images/purple.gif" alt="" height="42" width="42"/> Loading...';
            document.getElementById("addToCartResults").innerHTML = innerHTML;

            APIcartPost(AWS.config.credentials.accessKeyId,
                AWS.config.credentials.secretAccessKey,
                AWS.config.credentials.sessionToken,
                datepickerValue, CognitoLocal_Username, findGetParameter("serviceId"),
                String(numberOfGoats), function(result){
                    console.log("Single Module, APIcartPost() responded with: %O", result);
                    if(Array.isArray(result))
                    {
                        var cartObject = result[0];
                        if(cartObject.HTTPStatusCode == "200"){
                            innerHTML = '</br><span><b>Your cart has been updated, you can now proceed to <a href="checkout.html">Check out</a>.</b></span>';
                            document.getElementById("addToCartResults").innerHTML = innerHTML;
                        } else {
                            innerHTML = '</br><span style="color:red;" id="EMessage"><b>You goat to be kidding me! something went wrong</b></span>';
                            document.getElementById("addToCartResults").innerHTML = innerHTML;
                        }
                    }
                    else {
                        innerHTML = '</br><span style="color:red;" id="EMessage"><b>You goat to be kidding me! something went wrong</b></span>';
                        document.getElementById("addToCartResults").innerHTML = innerHTML;
                    }
                }); // Ends APIcartPost
        }
        else {
            innerHTML += '</br><span style="color:red;" id="EMessage"><b>You must be logged in before checking for avilability and booking, please <a href="login.html">Log in</a>.</b></span>';
            document.getElementById("addToCartResults").innerHTML = innerHTML;
        }
        return false;
    }


   $("#flexiselDemo3").flexisel({
       visibleItems: 3,
       animationSpeed: 1000,
       autoPlay: true,
       autoPlaySpeed: 3000,
       pauseOnHover: true,
       enableResponsiveBreakpoints: true,
       responsiveBreakpoints: {
           portrait: {
               changePoint:480,
               visibleItems: 1
           },
           landscape: {
               changePoint:640,
               visibleItems: 2
           },
           tablet: {
               changePoint:768,
               visibleItems: 3
           }
       }
   });
  $('.flexslider').flexslider({
    animation: "slide",
    controlNav: "thumbnails"
  });

});
