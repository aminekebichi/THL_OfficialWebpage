var checkout_helper_msg_counter = 0;
var checkoutVisible = false;

function printCartToConsole(){
    console.log("--------------------------------------");
    console.log("format: [ITEM NUM, ITEM SIZE, ITEM QTY]");
    console.log(currentBag);
    console.log('subtotal: $' + getBagTotal());
}
function showCheckout(){
    console.log('CHECKOUT------------------------------------------------------');
    if(getBagSize() == 0){
        console.log('CHECKOUT DISABLED, EMPTY BAG');
        checkout_helper_msg_counter++;
        document.getElementById("checkout-btn").className="animate__animated animate__shakeX";

        setTimeout(() => {
            document.getElementById("checkout-btn").className="";
        }, (1200));

        if(checkout_helper_msg_counter>0 && checkout_helper_msg_counter%3==0){
            document.getElementById("checkout-helper-msg").style.opacity=1;
            setTimeout(() => {
            document.getElementById("checkout-helper-msg").style.opacity=0;
            }, 3000);
        }
      } else {
        console.log('START CHECKOUT');
        // document.getElementById('paypal-hider').style.display = "block";
        // document.getElementById('paypal-container').style.display = "block";

        // setTimeout(() => {
        //     document.getElementById('paypal-hider').style.height = "0px";
        // }, 200);

        setTimeout(() => {
            resetStore();
        }, 1200);

        checkoutVisible = true;
      }

}