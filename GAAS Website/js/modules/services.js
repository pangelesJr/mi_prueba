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
// If you are reading this after 1/1/2010
// there's something wrong.
// This should have been ripped out by then.
*/

$(document).ready(function() {


    /*
        get Services

        Populates the buttom of the main container DIV on the center  of the webpage
        with an overview of the services.
    */
    APIservicesGet(null,function(result){
        console.log("Services Module, APIservicesGet() responded with: %O", result);
        if(Array.isArray(result))
        {
            for (var i = 0; i < result.length; i++){
                var ServiceObject = result[i];
                var toAppend = "";

                toAppend += '<li class="simpleCart_shelfItem">';
                toAppend += '    <a class="cbp-vm-image" href="single.html?serviceId='+(i+1)+'">';
                toAppend += '        <div class="inner_content clearfix">';
                toAppend += '            <div class="product_image">';
                toAppend += '                <img src="'+ServiceObject.ImageCover+'" class="img-responsive" alt=""/>';
                toAppend += '                <div class="product_container">';
                toAppend += '                    <div class="cart-left">';
                toAppend += '                        <p class="title">'+ServiceObject.Name+'</p>';
                toAppend += '                    </div>';
                toAppend += '                    <div class="price">$'+ServiceObject.CurrentPrice+'.00</div>';
                toAppend += '                    <div class="clearfix"></div>';
                toAppend += '                </div>';
                toAppend += '            </div>';
                toAppend += '        </div>';
                toAppend += '    </a>';
                toAppend += '    <div class="cbp-vm-details">';
                toAppend +=         ServiceObject.Overview;
                toAppend += '    </div>';
                toAppend += '    <a class="button item_add cbp-vm-icon cbp-vm-add" href="single.html?serviceId='+(i+1)+'">Add to cart</a>';
                toAppend += '</li>';
                $('#ServicesContainer').append(toAppend);
            }
        }
        else {
            var toAppend = "";
            toAppend += '<li class="simpleCart_shelfItem"><div class="inner_content clearfix">';
            toAppend += '<div class="product_image"><img src="./images/fail.jpg" class="img-responsive" alt=""/>';
            toAppend += '<div class="product_container"><div class="cart-left" style="color:red;"><p><b>You goat to be kidding me! something went wrong</b></p>';
            toAppend += '</div><div class="clearfix"></div></div></div></div><div class="cbp-vm-details"></div></li>';
            $('#ServicesContainer').append(toAppend);
        }
    }); // Ends APIservicesGet


    /*
        get Reviews

        Populates the #col-md-3" DIV on the right side of the webpage with random reviews
        from our customers, we don't really understand most of them.

    */
    APIreviewsGet(null, function(result){
        console.log("Services Module, APIreviewsGet() responded with: %O", result);
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
        console.log("Services Module, APIgoatsGet() responded with: %O", result);
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
