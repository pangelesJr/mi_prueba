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
* For the brave souls who get this far: You are the chosen ones,
* the valiant knights of programming who toil away, without rest,
* fixing our most awful code. To you, true saviors, kings of dragons,
* I say this: never gonna give you up, never gonna let you down,
* never gonna run around and desert you. Never gonna make you cry,
* never gonna say goodbye. Never gonna tell a lie and hurt you.
*/

$(document).ready(function() {

    /*
        get Goats

        Populates the #GoatContainer DIV with the best of our goats, just look at this code,
        it is amazing.

    */
    APIgoatsGet(function(result){
        console.log("Single Module, APIgoatsGet() responded with: %O", result);
        if(Array.isArray(result))
        {
            for (var i = 0; i < result.length; i++){
                var GoatObject = result[i];
                var toAppend = "";
                toAppend += '<li class="simpleCart_shelfItem">';
                toAppend += '    <div class="inner_content clearfix">';
                toAppend += '        <div class="product_image">';
                toAppend += '            <img src="' + GoatObject.URLImage + '" class="img-responsive" alt=""/>';
                toAppend += '            <div class="product_container">';
                toAppend += '                <div class="cart-left"><p class="title">' + GoatObject.Name + '</p></div>';
                toAppend += '                <div class="price">' + GoatObject.Age +' '+ GoatObject.AgeUnit + '</div>';
                toAppend += '                <div class="clearfix"></div>';
                toAppend += '                <div class="cart-left">Gender: ' + GoatObject.Gender +'</div>';
                toAppend += '                <div class="clearfix"></div>';
                toAppend += '                <div class="cart-left">Breed: ' + GoatObject.Breed +'</div>';
                toAppend += '            </div>';
                toAppend += '        </div>';
                toAppend += '    </div>';
                toAppend += '</li>';
                $('#GoatContainer').append(toAppend);
            }
        }
        else {
            var toAppend = "";
            toAppend += '<li class="simpleCart_shelfItem"><div class="inner_content clearfix"><div class="product_image"><img src="./images/fail.jpg" class="img-responsive" alt=""/>';
            toAppend += '<div class="product_container"><div class="cart-left" style="color:red;"><p><b>You goat to be kidding me! something went wrong</b></p></div><div class="clearfix"></div></div></div></div></li>';
            $('#GoatContainer').append(toAppend);
        }
    }); // Ends APIgoatsGet

    /*
        get Reviews

        Populates the #col-md-3" DIV on the right side of the webpage with random reviews
        from our customers, we don't really understand most of them.

    */
    APIreviewsGet(null, function(result){
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

}); // Ends $(document).ready(function()
