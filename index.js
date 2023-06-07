var state = 0;      //status map: 0 = home, 1 = about, 2 = shop, 3 = contact
var bag_open = false;
var inPreview = false;
var speed = 0.1;

var currentBag = [];

var item_qtys = [[15], [5, 10, 10, 10, 5], [5, 10, 10, 10, 5], [5, 10, 10, 10, 5], [5, 10, 10, 10, 5], [5, 10, 10, 10, 5]]; // THIS IS HARDCODED LOCALLY --> WILL NEED TO FETCH DATA FROM SERVER
var availableSizes = [["XS", "S", "M", "L", "XL"], ["XS", "S", "M", "L", "XL"], ["XS", "S", "M", "L", "XL"], ["XS", "S", "M", "L", "XL"], ["XS", "S", "M", "L", "XL"], ["XS", "S", "M", "L", "XL"]];

var itemPrices = ["0.01", "59.95", "14.95", "14.95", "4.95", "4.95"];
var itemNames = ["ITEM-1 NAME", "ITEM-2 NAME", "ITEM-3 NAME", "ITEM-4 NAME", "ITEM-5 NAME", "ITEM-6 NAME"];

var shopVisible = 0;

// var checkoutOpen = false;

function getItemSizeIndex(item_size){
    let size_num = 0;
    switch(item_size){
        case 'XS':  size_num = 0;
        break;
        case 'S':   size_num = 1;
        break;
        case 'M':   size_num = 2;
        break;
        case 'L':   size_num = 3;
        break;
        case 'XL':  size_num = 4;
        break;
        default:    size_num = -1;
        break;
    }

    return size_num;
}

//this function will iterate through the current bag and decrement the item_qtys as they appear in the bag, if there are less items in inventory than 
//there are in bag, throw an error message, update the bag with the proper qtys, call updateBag()
var alert_inventory = false;
var alert_outOfStock = false;
var invalid_qty_errorMsg = "Sorry, you have requested a certain quantity of items that our inventory cannot supply... This transaction will be canceled, and your bag will be updated to reflect our inventory.";
function updateSizeAvailability(){
    console.log('current bag: ' + currentBag);
    console.log('old inventory count: ' + item_qtys); 
    for (let i = 0; i < currentBag.length; i++){
        let item_num = currentBag[i][0];
        let item_size = currentBag[i][1];
        let item_qty = currentBag[i][2];

        console.log('item ' + (item_num) + ': size ' + item_size + ' [x' + item_qty + ']');

        let size_num = getItemSizeIndex(item_size);

        if(item_qtys[item_num-1][Math.max(size_num, 0)] - item_qty < 0){
            if(item_qtys[item_num-1][Math.max(size_num, 0)] == 0){
                alert('Sorry, an item you requested is out of stock and your transaction cannot be completed');
                currentBag[i][2] = 0;
                removeItemFromBag(i); updateBag();
            } else {
                alert(invalid_qty_errorMsg);
                document.getElementById('bagged-item-'+i+'-qty').innerHTML = `
                <button onclick="decrementItem(this)" class="qty-btn">-</button>
                <button onclick="incrementItem(this)" class="qty-btn" style="margin-right: 8px;">+</button>
                (x` + item_qtys[item_num-1][Math.max(size_num, 0)] + `)`;
                console.log('BAG UPDATE INCOMING');
                currentBag[i][2] = item_qtys[item_num-1][Math.max(size_num, 0)];
                updateBag();
            }
        } else { item_qtys[item_num-1][Math.max(size_num,0)] -= item_qty; }

        if(item_qtys[item_num-1][Math.max(size_num, 0)] == 0){  // find bagged item index => call removeItemFromBag('index')
            switch(size_num){
                case 0: document.getElementById('item-'+item_num+'-sizing-xs').innerHTML = `
                <strike>XS</strike>
                `;
                break;
                case 1: document.getElementById('item-'+item_num+'-sizing-s').innerHTML = `
                <strike>S</strike>
                `;
                break;
                case 2: document.getElementById('item-'+item_num+'-sizing-m').innerHTML = `
                <strike>M</strike>
                `;
                break;
                case 3: document.getElementById('item-'+item_num+'-sizing-l').innerHTML = `
                <strike>L</strike>
                `;
                break;
                case 4: document.getElementById('item-'+item_num+'-sizing-xl').innerHTML = `
                <strike>XL</strike>
                `;
                break;
                default: document.getElementById('item-'+item_num+'-sizing').innerHTML = `
                SOLD OUT
                `;
                break;
            }
        }

    }
    console.log('new inventory count: ' + item_qtys);
}

function removeItemFromBag(bagged_item_i){
    document.getElementById('bagged-item-'+bagged_item_i+'-qty').innerHTML = `
            <button onclick="" class="qty-btn">-</button>
            <button onclick="" class="qty-btn" style="margin-right: 8px;">+</button>
            (x` + currentBag[bagged_item_i][2] + `)
            `;

            var element1 = document.getElementById('bagged-item-' + bagged_item_i);
            var element2 = document.getElementById('bagged-item-' + bagged_item_i + '-qty');
            element1.className = "animate__animated animate__fadeOut";
            element2.className = "animate__animated animate__fadeOut";
            // console.log(element2.classList);
            setTimeout(() => {
                element1.parentNode.removeChild(element1);
                element2.parentNode.removeChild(element2);
            }, 1000);
}

function updPriceRec(startNbrDol, startNbrCent, endNbrDol, endNbrCent, elem){
    // elt.innerHTML = startNbrDol + `.` + (String(startNbrCent).padStart(2, '0')) + ` USD`;
    if(startNbrDol < endNbrDol && startNbrCent < endNbrCent){
        setTimeout(() => {
            updPriceRec(startNbrDol+1, startNbrCent+1, endNbrDol, endNbrCent, elem);  
        }, speed);
    } else if (startNbrDol < endNbrDol && startNbrCent === endNbrCent){
        setTimeout(() => {
            updPriceRec(startNbrDol+1, startNbrCent, endNbrDol, endNbrCent, elem);
        }, speed);
    } else if (startNbrDol < endNbrDol && startNbrCent > endNbrCent){
        setTimeout(() => {
            updPriceRec(startNbrDol+1, startNbrCent-1, endNbrDol, endNbrCent, elem);
        }, speed);
    } else if (startNbrDol === endNbrDol && startNbrCent < endNbrCent){
        setTimeout(() => {
            updPriceRec(startNbrDol, startNbrCent+1, endNbrDol, endNbrCent, elem);
        }, speed);
    } else if (startNbrDol === endNbrDol && startNbrCent > endNbrCent) {
        setTimeout(() => {
            updPriceRec(startNbrDol, startNbrCent-1, endNbrDol, endNbrCent, elem);
        }, speed);
    }  else if (startNbrDol > endNbrDol && startNbrCent < endNbrCent){
        setTimeout(() => {
            updPriceRec(startNbrDol-1, startNbrCent+1, endNbrDol, endNbrCent, elem);
        }, speed);
    } else if (startNbrDol > endNbrDol && startNbrCent === endNbrCent){
        setTimeout(() => {
            updPriceRec(startNbrDol-1, startNbrCent, endNbrDol, endNbrCent, elem);
        }, speed);    
    } else if (startNbrDol > endNbrDol && startNbrCent > endNbrCent){
        setTimeout(() => {
            updPriceRec(startNbrDol-1, startNbrCent-1, endNbrDol, endNbrCent, elem);
        }, speed);
    }
    // setTimeout(() => {
    //     elt.innerHTML = startNbrDol + `.` + (String(startNbrCent).padStart(2, '0')) + ` USD`;
    // }, 300);
    elem.innerHTML = startNbrDol + `.` + (String(startNbrCent).padStart(2, '0')) + ` USD`;
}

// function incNbrRec(i, endNbr, elt) {
//     if (i <= endNbr) {
//       elt.innerHTML = i + `.00 USD`;
//       setTimeout(function() {//Delay a bit before calling the function again.
//         incNbrRec(i+1, endNbr, elt);
//       }, speed);
//     } else {
//         document.getElementById('subtotal-value').innerHTML = getBagTotal() + ` USD`;
//     }
    
// } 

// function decNbrRec(i, endNbr, elt) {
//     if (i >= endNbr) {
//       elt.innerHTML = i + `.00 USD`;
//       setTimeout(function() {//Delay a bit before calling the function again.
//         decNbrRec(i-1, endNbr, elt);
//       }, speed);
//     } else {
//         document.getElementById('subtotal-value').innerHTML = getBagTotal() + ` USD`;
//     }
// }

function updateBag(){
    document.getElementById('user-bag-qty').innerHTML = getBagSize();
    if(getBagSize() == 0){
        document.getElementById('empty-bag-msg').style.opacity = "1";
        document.getElementById('checkout-btn').style.opacity = "0.5";
        // document.getElementById('checkout-btn-container').title = "Checkout unavailable until cart is not empty";
        
        document.getElementById('checkout-btn').onclick = function() {};
        hideCheckout();
        
        document.getElementById('checkout-btn').title = "Checkout unavailable while cart is empty";
    } else {
        document.getElementById('empty-bag-msg').style.opacity = "0";
        document.getElementById('checkout-btn').style.opacity = "1";
        // document.getElementById('checkout-btn-container').title = "";

        document.getElementById('checkout-btn').onclick = function() { updateSizeAvailability(); showCheckout(); }; // IMPORTANT!! Make sure to update here anytime changes are made to checkout-btn onclick
        document.getElementById('checkout-btn').title = "";
    }

    updateSubtotal(document.getElementById('subtotal-value'));
}

function updateSubtotal(elem){
    let price_str = String(elem.innerHTML);
    let prevTotal = String(price_str.split(" ")[0]);

    // elt.innerHTML = startNbrDol + `.` + (String(startNbrCent).padStart(2, '0')) + ` USD`;

    // console.log('prevTotal: ' + prevTotal);

    var startNbrDol = Number(prevTotal.split(".")[0]);
    var startNbrCent = Number(prevTotal.split(".")[1]);
    var endNbrDol = Number(getBagTotal().split(".")[0]);
    var endNbrCent = Number(getBagTotal().split(".")[1]);

    // if(prevTotal.length < 1){
    //     startNbrDol = 0;
    //     startNbrCent = 0;
    // }

    console.log('prevTotal: ' + prevTotal);
    console.log('currTotal: ' + getBagTotal());
    console.log('updPriceRec params: ['+ startNbrDol + ', ' + startNbrCent + ', ' + endNbrDol + ', ' + endNbrCent + ', ' + elem);


    // , startNbrCent, endNbrDol, endNbrCent

    // console.log("TESTING");
    // console.log("[" + startNbrDol, startNbrCent, endNbrDol, endNbrCent + "]");
    // console.log("TESTING");

    updPriceRec(startNbrDol, startNbrCent, endNbrDol, endNbrCent, elem);
}

function incrementItem(elem){
    // console.log(elem.parentNode);
    var bagged_item_i = elem.parentNode.id.split('-')[2];
    // console.log('bagged_item_i: ', bagged_item_i);

    let item_num = currentBag[bagged_item_i][0];
    let item_size = currentBag[bagged_item_i][1];
    let size_num = getItemSizeIndex(item_size);

    if (currentBag[bagged_item_i][2] < item_qtys[item_num-1][Math.max(size_num, 0)]){
        currentBag[bagged_item_i][2]++;
        document.getElementById('bagged-item-'+bagged_item_i+'-qty').innerHTML = `
            <button onclick="decrementItem(this)" class="qty-btn">-</button>
            <button onclick="incrementItem(this)" class="qty-btn" style="margin-right: 8px;">+</button>
            (x` + currentBag[bagged_item_i][2] + `)
        `;
        updateBag();
    } else {
        alert('You cannot request more of this item.');
    }

}

function decrementItem(elem){
    var bagged_item_i = elem.parentNode.id.split('-')[2];
    console.log('DECREMENTING bagged_item_' + bagged_item_i);
    console.log('PARENT: ' + elem.parentNode.id);

    if(currentBag[bagged_item_i][2] != 0){
        currentBag[bagged_item_i][2]--;
        document.getElementById('bagged-item-'+bagged_item_i+'-qty').innerHTML = `
            <button onclick="decrementItem(this)" class="qty-btn">-</button>
            <button onclick="incrementItem(this)" class="qty-btn" style="margin-right: 8px;">+</button>
            (x` + currentBag[bagged_item_i][2] + `)
        `;
        if(currentBag[bagged_item_i][2] < 1){
            removeItemFromBag(bagged_item_i);
        }

        updateBag();
    }
}

function add2bag(elem){
    // FORMAT FOR ADDING ITEM TO BAG = [ITEMNUM,ITEMSIZE,ITEMFREQ]
    var id = String(elem.parentNode.id).split("-")[1];
    var item_num = Number(id);
    var item_size = document.getElementById('item-'+item_num+'-sizes').value;
    var item_arr = [item_num,item_size,1];

    // console.log(item_num);

    if(item_size === "none"){
        sizesErrorForm(item_num);
    } else {
        // if(!bag_open){
        //     document.getElementById("bag-flyout").style.transform = "translateX(0px)";
        //     bag_open = true;
        // }
        document.getElementById("user-bag-qty-animation").style.opacity = "100%";
        document.getElementById("user-bag-qty-animation").style.transform = "scale(150%)";

        setTimeout(() => {
            document.getElementById("user-bag-qty-animation").style.opacity = "0%";
            document.getElementById("user-bag-qty-animation").style.transform = "scale(100%)";
        }, 500);

        if(getItemIndex(currentBag, item_arr) == -1 || currentBag[getItemIndex(currentBag, item_arr)][2] == 0){
            if(getItemIndex(currentBag, item_arr) == -1){
                currentBag.push(item_arr);
            }
            if(currentBag[getItemIndex(currentBag, item_arr)][2] == 0){
                currentBag[getItemIndex(currentBag, item_arr)][2]++;
            }

            var li = document.createElement("li");
            li.id = 'bagged-item-'+getItemIndex(currentBag, item_arr);
            li.classList.add("animate__animated", "animate__fadeIn");
            if(item_size === ""){
                li.innerHTML = `
                <span style="margin-right: 10px;">` + itemNames[item_num-1] + `</span>` + item_size +`<br>
                <span style="color: grey;">`+ itemPrices[item_num-1] + ` USD</span>
                `;
            } else {
                li.innerHTML = `
                <span style="margin-right: 10px;">` + itemNames[item_num-1] + `</span><span style="font-size: 10px">` + item_size +`</span><br>
                <span style="color: grey;">`+ itemPrices[item_num-1] + ` USD</span>
                `;
            }

            // console.log(currentPricing[item_num-1]);

            var li_qty = document.createElement("li");
            li_qty.id = 'bagged-item-'+getItemIndex(currentBag, item_arr)+'-qty';
            li_qty.classList.add("animate__animated", "animate__fadeIn");
            li_qty.innerHTML = `
                <button onclick="decrementItem(this)" class="qty-btn">-</button>
                <button onclick="incrementItem(this)" class="qty-btn" style="margin-right: 8px;">+</button>
                (x` + currentBag[getItemIndex(currentBag, item_arr)][2] + `)
            `;

            document.getElementById('bag-items').appendChild(li);
            document.getElementById('bag-item-qtys').appendChild(li_qty);

        } else {
            // console.log('INC ITEM!');
            // console.log('item-i: ' + getItemIndex(currentBag, item_arr));
            currentBag[getItemIndex(currentBag, item_arr)][2] += 1;

            document.getElementById('bagged-item-'+getItemIndex(currentBag, item_arr)+'-qty').innerHTML = `
                <button onclick="decrementItem(this)" class="qty-btn">-</button>
                <button onclick="incrementItem(this)" class="qty-btn" style="margin-right: 8px;">+</button>
                (x` + currentBag[getItemIndex(currentBag, item_arr)][2] + `)
            `;
        }

        updateBag();
    
        // console.log('adding item-' + item_num + ', ' + item_size + ' to bag.\nitem-freq = ' + currentBag[getItemIndex(currentBag, item_arr)][2]);
    }

}

function sizesErrorForm(item_num) {
    const element = document.getElementById('item-'+item_num+'-sizes');
    element.style.background = "rgb(255, 169, 169)";
    setTimeout(() => {
        element.style.background = "white";
    }, 600);
}

function getItemIndex(arr, target){
    if(arr.length == 0) {return -1;}
    for(var i=0; i<arr.length; i++){
        if (arr[i][0] == target[0] && arr[i][1] == target[1]) {
            return i;
        }
    }
    return -1;
}

function getBagSize(){
    var total = 0;
    for(var i = 0; i < currentBag.length; i++){
        total += currentBag[i][2];
    }
    return total;
}

function getBagTotal(){
    var total = 0;
    for(var i = 0; i < currentBag.length; i++){
        total += (itemPrices[currentBag[i][0]-1]*currentBag[i][2]);
    }
    console.log('total: ' + total.toFixed(2));
    return total.toFixed(2);
}

function previewItem1(){
    console.log('preview');
    goTop();
    document.getElementById("shop").style.opacity = "0";
    document.getElementById("item-1").onclick = "";

    setTimeout(() => {
        resetCarousel();

        document.getElementById("item-2").style.display = "none";
        document.getElementById("item-3").style.display = "none";
        document.getElementById("item-4").style.display = "none";
        document.getElementById("item-5").style.display = "none";
        document.getElementById("item-6").style.display = "none";

        var els = document.getElementsByClassName("preview-btn");
        [].forEach.call(els, function (el) {
            el.style.display = "none";
        });

        document.getElementById("item-1-preview").style.display = "block";

        goTop();
        // document.body.style.overflowY = "hidden";
    }, 600);

    setTimeout(() => {
        document.getElementById("shop").style.columnGap = "50px";
        document.getElementById("shop").style.rowGap = "50px";
        document.getElementById("shop").style.opacity = "1";
    }, 800);

}

function previewItem2(){
    goTop();
    document.getElementById("shop").style.opacity = "0";
    document.getElementById("item-2").onclick = "";

    setTimeout(() => {
        resetCarousel();

        document.getElementById("item-1").style.display = "none";
        document.getElementById("item-3").style.display = "none";
        document.getElementById("item-4").style.display = "none";
        document.getElementById("item-5").style.display = "none";
        document.getElementById("item-6").style.display = "none";

        var els = document.getElementsByClassName("preview-btn");
        [].forEach.call(els, function (el) {
            el.style.display = "none";
        });

        document.getElementById("item-2-preview").style.display = "block";

        document.getElementById("shop").style.columnGap = "50px";
        document.getElementById("shop").style.rowGap = "50px";
        document.getElementById("shop").style.opacity = "1";
    }, 600);

}

function previewItem3(){
    goTop();
    document.getElementById("shop").style.opacity = "0";
    document.getElementById("item-3").onclick = "";

    setTimeout(() => {
        resetCarousel();

        document.getElementById("item-1").style.display = "none";
        document.getElementById("item-2").style.display = "none";
        document.getElementById("item-4").style.display = "none";
        document.getElementById("item-5").style.display = "none";
        document.getElementById("item-6").style.display = "none";

        var els = document.getElementsByClassName("preview-btn");
        [].forEach.call(els, function (el) {
            el.style.display = "none";
        });

        document.getElementById("item-3-preview").style.display = "block";

        document.getElementById("shop").style.columnGap = "50px";
        document.getElementById("shop").style.rowGap = "50px";
        document.getElementById("shop").style.opacity = "1";
    }, 600);

}

function previewItem4(){
    goTop();
    document.getElementById("shop").style.opacity = "0";
    document.getElementById("item-4").onclick = "";

    setTimeout(() => {
        resetCarousel();

        document.getElementById("item-1").style.display = "none";
        document.getElementById("item-2").style.display = "none";
        document.getElementById("item-3").style.display = "none";
        document.getElementById("item-5").style.display = "none";
        document.getElementById("item-6").style.display = "none";

        var els = document.getElementsByClassName("preview-btn");
        [].forEach.call(els, function (el) {
            el.style.display = "none";
        });

        document.getElementById("item-4-preview").style.display = "block";

        document.getElementById("shop").style.columnGap = "50px";
        document.getElementById("shop").style.rowGap = "50px";
        document.getElementById("shop").style.opacity = "1";
    }, 600);

}

function previewItem5(){
    goTop();
    document.getElementById("shop").style.opacity = "0";
    document.getElementById("item-5").onclick = "";

    setTimeout(() => {
        resetCarousel();

        document.getElementById("item-1").style.display = "none";
        document.getElementById("item-2").style.display = "none";
        document.getElementById("item-3").style.display = "none";
        document.getElementById("item-4").style.display = "none";
        document.getElementById("item-6").style.display = "none";

        var els = document.getElementsByClassName("preview-btn");
        [].forEach.call(els, function (el) {
            el.style.display = "none";
        });

        document.getElementById("item-5-preview").style.display = "block";

        document.getElementById("shop").style.columnGap = "50px";
        document.getElementById("shop").style.rowGap = "50px";
        document.getElementById("shop").style.opacity = "1";
    }, 600);

}

function previewItem6(){
    goTop();
    document.getElementById("shop").style.opacity = "0";
    document.getElementById("item-6").onclick = "";

    setTimeout(() => {
        resetCarousel();

        document.getElementById("item-1").style.display = "none";
        document.getElementById("item-2").style.display = "none";
        document.getElementById("item-3").style.display = "none";
        document.getElementById("item-4").style.display = "none";
        document.getElementById("item-5").style.display = "none";

        var els = document.getElementsByClassName("preview-btn");
        [].forEach.call(els, function (el) {
            el.style.display = "none";
        });

        document.getElementById("item-6-preview").style.display = "block";

        document.getElementById("shop").style.columnGap = "50px";
        document.getElementById("shop").style.rowGap = "50px";
        document.getElementById("shop").style.opacity = "1";
    }, 600);

}

function previewItem(parent){
    var id = String(parent.parentNode.id);
    var item_num = Number(id.slice(-1));

    switch(item_num){
        case 1: previewItem1();
                break;
        case 2: previewItem2();
                break;
        case 3: previewItem3();
                break;
        case 4: previewItem4();
                break;
        case 5: previewItem5();
                break;
        case 6: previewItem6();
                break;
    }

    inPreview = true;
}

var flyoutWidth = "100vw";

function triggerBag(){
    if(bag_open){
        document.getElementById("bag-flyout").style.transform = `translateX(`+flyoutWidth+`)`;
        bag_open = false;

        hideCheckout();
    } else {
        document.getElementById("bag-flyout").style.transform = "translateX(0px)";
        bag_open = true;
    }
}

function hideBag(){
    document.getElementById("bag-flyout").style.transform = `translateX(`+flyoutWidth+`)`;
    bag_open = false;

    hideCheckout();
}

function testBagBeforeCheckout(){
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
    } else {
        // Bag must be open to open checkout => triggerBag() will close bag view

    }
}

// function closeCheckout(){
//     document.getElementById("checkout-form").style.transform = "translateX(-700px)";
//     setTimeout(() => {
//         document.getElementById("checkout-bg").style.transform = "translateX(100vw)";
//         document.getElementById("checkout-form-divider").style.transform = "translateX(100vw)";
//     }, 600);
//     checkoutOpen = false;
// }

// function triggerCheckoutScroll(){
//     if(!checkoutOpen){
//         document.getElementById("checkout-form-wrapper").overflowY="auto";
//         // document.getElementById("checkout-form").overflowY="scroll";
//         checkoutOpen = true;
//     }
// }

function resetSizeSelections() {
    var el = document.getElementById("item-1-sizes");
    el.selectedIndex = "none";
    el = document.getElementById("item-2-sizes");
    el.selectedIndex = "none";
    el = document.getElementById("item-3-sizes");
    el.selectedIndex = "none";
    el = document.getElementById("item-4-sizes");
    el.selectedIndex = "none";
    el = document.getElementById("item-5-sizes");
    el.selectedIndex = "none";
    el = document.getElementById("item-6-sizes");
    el.selectedIndex = "none";
}

function returnFromPreview(){
    restoreItemsOnClick();
    document.getElementById("shop").style.opacity = "0";

    setTimeout(() => {
        document.getElementById("shop").style.rowGap = "100px";
        document.getElementById("shop").style.columnGap = "200px";

        document.getElementById("item-1-preview").style.display = "none";
        document.getElementById("item-2-preview").style.display = "none";
        document.getElementById("item-3-preview").style.display = "none";
        document.getElementById("item-4-preview").style.display = "none";
        document.getElementById("item-5-preview").style.display = "none";
        document.getElementById("item-6-preview").style.display = "none";

        var els = document.getElementsByClassName("preview-btn");
        [].forEach.call(els, function (el) {
            el.style.display = "block";
        });

        resetSizeSelections();

        document.getElementById("item-1").style.display = "";
        document.getElementById("item-2").style.display = "";
        document.getElementById("item-3").style.display = "";
        document.getElementById("item-4").style.display = "";
        document.getElementById("item-5").style.display = "";
        document.getElementById("item-6").style.display = "";

        resetCarousel();
    }, 600);
    setTimeout(() => {
        document.getElementById("shop").style.opacity = "1";
        document.body.style.overflowY = "scroll";
    }, 800);

    inPreview = false;
}

function goTop(){
    window.scrollTo(0, 0);
}

function triggerHome(){
    hideBag(); hideCheckout(); hideAbout(); hideShop(); hideContact(); showHome(); restoreItemsOnClick();
}

function triggerAbout(){
    hideBag(); hideCheckout(); hideHome(); hideShop(); hideContact(); showAbout(); restoreItemsOnClick();
}

function triggerShop(){
    hideBag(); hideHome(); hideAbout(); hideContact(); hideCheckout(); hideContact(); returnFromPreview(); resetCarousel(); goTop(); showShop();
}

function triggerContact(){
    hideBag(); hideCheckout(); hideHome(); hideAbout(); hideShop(); showContact(); restoreItemsOnClick();
}

function showHome(){
    document.getElementById("home-hider").style.display = "";
    document.getElementById("home").style.display = "";
    document.getElementById("shop-btn").style.display = "";
    document.body.style.overflowY = "hidden";
    setTimeout(() => {
        document.getElementById("home").style.opacity = "";
        document.getElementById("shop-btn").style.opacity = "";
        document.getElementById("thl-logo").style.top = "";
        document.getElementById("thl-logo").style.marginTop = "";
    }, 600);

    state = 0;
}

function hideHome(){
    document.getElementById("home-hider").style.display = "none";
    document.getElementById("thl-logo").style.marginTop = "75px";
    document.getElementById("thl-logo").style.top = "0";
    document.getElementById("shop-btn").style.opacity = "0";
    setTimeout(() => {
        document.getElementById("shop-btn").style.display = "none";
    }, 600);
}

function restoreItemsOnClick(){
    document.getElementById('item-1').onclick = function() { previewItem1(); };
    document.getElementById('item-2').onclick = function() { previewItem2(); };
    document.getElementById('item-3').onclick = function() { previewItem3(); };
    document.getElementById('item-4').onclick = function() { previewItem4(); };
    document.getElementById('item-5').onclick = function() { previewItem5(); };
    document.getElementById('item-6').onclick = function() { previewItem6(); };
}

function toggleItemVisibilityOff(){
    if(shopVisible == 1){
        console.log("leaving shop => toggle visibility OFF");
        setTimeout(() => {
            var items_list = document.querySelectorAll(".item");
            for (var i = 0; i < items_list.length; i++) {
                var elem = items_list[i];
                elem.classList.add("untouchable");
            }
        }, 1000);
        shopVisible = 0;
    }
}

function toggleItemVisibilityOn(){
    console.log("entering shop => toggle visibility ON");
    setTimeout(() => {
        var items_list = document.querySelectorAll(".item");
        for (var i = 0; i < items_list.length; i++) {
            var elem = items_list[i];
            elem.classList.remove("untouchable");
        }
    }, 1000);
    shopVisible = 1;

}

function showShop(){
    // console.log("show shop!");
    toggleItemVisibilityOn();

    if(inPreview){
        returnFromPreview();
        inPreview = false;
    } else {
        //hiding other items (this is why we set timeout of 600ms)
        setTimeout(() => {
            document.getElementById("shop").style.opacity = "1";
            document.body.style.overflowY = "scroll";
        }, 600);
    }

    state = 2;
}

function hideShop(){
    // document.getEz
    goTop();

    document.getElementById("shop").style.opacity = "0";
    setTimeout(() => {
        toggleItemVisibilityOff();
        document.getElementById("shop").style.rowGap = "100px";
        document.getElementById("shop").style.columnGap = "200px";
    }, 600);

    if(inPreview){
        returnFromPreview();
        inPreview = false;
    }
    // setTimeout(() => {
    //     document.getElementById("shop").style.display = "none";
    // }, 600);
}

function showAbout(){
    document.getElementById("about").style.display = "block";
    document.getElementById("about-container").style.display = "flex";
    //hiding other items (this is why we set timeout of 600ms)
    setTimeout(() => {
        goTop();
        document.body.style.overflowY = "hidden";
    }, 600);
    setTimeout(() => {
        document.getElementById("about").style.opacity = "1";
    }, 1000);
}

function hideAbout(){
    document.getElementById("about").style.opacity = "0";
    setTimeout(() => {
        document.getElementById("about").style.display = "none";
        document.getElementById("about-container").style.display = "none";
    }, 600);
}

function showContact(){
    document.getElementById("contact").style.display = "block";
    document.getElementById("contact-container").style.display = "flex";
    document.getElementById("contact-ig").style.display = "block";
    document.getElementById("contact-tw").style.display = "block";
    //hiding other items (this is why we set timeout of 600ms)
    setTimeout(() => {
        goTop();
        document.body.style.overflowY = "hidden";
    }, 600);
    setTimeout(() => {
        document.getElementById("contact").style.opacity = "1";
    }, 1000);
}

function hideContact(){
    document.getElementById("contact").style.opacity = "0";

    setTimeout(() => {
        document.getElementById("contact-ig").style.display = "none";
        document.getElementById("contact-tw").style.display = "none";
        document.getElementById("contact").style.display = "none";
        document.getElementById("contact-container").style.display = "none";
    }, 600);
}