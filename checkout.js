function printCartToConsole(){
    console.log("--------------------------------------");
    console.log("format: [ITEM NUM, ITEM SIZE, ITEM QTY]");
    console.log(currentBag);
    console.log('subtotal: $' + getBagTotal());

    if(getBagSize() == 0){
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
  }
}

var checkoutVisible = false;

function triggerCheckout(){
    if(checkoutVisible){ hideCheckout(); }
    else { showCheckout(); }
}

function showCheckout(){
    document.getElementById('paypal-hider').style.height = "0px";
    checkoutVisible = true;
}

function hideCheckout(){
    document.getElementById('paypal-hider').style.height = "800px";
    checkoutVisible = false;

}