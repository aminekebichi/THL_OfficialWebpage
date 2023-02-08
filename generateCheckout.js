var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
days = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');

// console.log('dd: ' + dd);
// console.log('mm: ' + mm);
// console.log('yyyy: ' + yyyy);

var input_days = 0;

function getNextWeekday(date = new Date()) {
    const dateCopy = new Date(date.getTime());
  
    const nextDay = new Date(
      dateCopy.setDate(
        dateCopy.getDate() + input_days,
      ),
    );

    day = nextDay.getDay();
    dd = String(nextDay.getDate()).padStart(2, '0');
    mm = String(nextDay.getMonth() + 1).padStart(2, '0'); //January is 0!
    yyyy = nextDay.getFullYear();

    if(day == 0){
        // console.log('LANDED ON SUNDAY');
        const dateCopyCopy = new Date(nextDay.getTime());
        const updatedDay = new Date(
            dateCopyCopy.setDate(
                dateCopyCopy.getDate()+1,
            ),
        );
        day = updatedDay.getDay();
        dd = String(updatedDay.getDate()).padStart(2, '0');
        mm = String(updatedDay.getMonth() + 1).padStart(2, '0'); //January is 0!
        yyyy = updatedDay.getFullYear();
    } else if (day == 6){
        // console.log('LANDED ON SATURDAY');
        const dateCopyCopy = new Date(nextDay.getTime());
        const updatedDay = new Date(
            dateCopyCopy.setDate(
                dateCopyCopy.getDate()+2,
            ),
        );
        day = updatedDay.getDay();
        dd = String(updatedDay.getDate()).padStart(2, '0');
        mm = String(updatedDay.getMonth() + 1).padStart(2, '0'); //January is 0!
        yyyy = updatedDay.getFullYear();
    }

    // console.log('day: ' + days[day]);
    // console.log('dd: ' + dd);
    // console.log('mm: ' + mm);
    // console.log('yyyy: ' + yyyy);
}

input_days = 14;
getNextWeekday();
document.getElementById("standard-delivery-txt").innerHTML=`Delivered on or before ` + days[day] + `, ` + months[mm-1] + ` ` + dd + `, ` + yyyy;

input_days = 7;
getNextWeekday();
document.getElementById("express-delivery-txt").innerHTML=`Delivered on or before ` + days[day] + `, ` + months[mm-1] + ` ` + dd + `, ` + yyyy;

input_days = 2;
getNextWeekday();
document.getElementById("nextday-delivery-txt").innerHTML=`Delivered on or before ` + days[day] + `, ` + months[mm-1] + ` ` + dd + `, ` + yyyy;

// var shopifyButton = document.createElement('div');
// shopifyButton.innerHTML = '<div id="shopify-button-target"></div>';
// // document.body.appendChild(shopifyButton);
// document.getElementById("checkout-btn-container").appendChild(shopifyButton);
// var script = document.createElement('script');
// script.src = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
// script.type = 'text/javascript';
// document.body.appendChild(script);
// var script = document.createElement('script');
// script.innerHTML = 'var client = ShopifyBuy.buildClient({domain: "thehabibiline.myshopify.com", storefrontAccessToken: "3bb85c9d5b4d60496851cfead56250e7"});var ui = ShopifyBuy.UI.init(client);ui.createComponent("product", {id: [123456789],node: document.getElementById("shopify-button-target"),moneyFormat: "%24%7B%7Bamount%7D%7D",options: {product: {variantId: "all",width: "240px",contents: {img: false,imgWithCarousel: false,title: false,variantTitle: false,price: false,description: false,buttonWithQuantity: false,quantity: false},text: {button: "BUY NOW"}}}});';
// document.body.appendChild(script);