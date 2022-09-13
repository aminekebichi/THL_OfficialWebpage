const item1_imgs = ['white', 'blue', 'green', 'red'];
const item2_imgs = ['white', 'blue', 'green', 'red'];
const item3_imgs = ['white', 'blue', 'green', 'red'];
const item4_imgs = ['white', 'blue', 'green', 'red'];
const item5_imgs = ['white', 'blue', 'green', 'red'];
const item6_imgs = ['white', 'blue', 'green', 'red'];
let item1_slideIndex = 0;
let item2_slideIndex = 0;
let item3_slideIndex = 0;
let item4_slideIndex = 0;
let item5_slideIndex = 0;
let item6_slideIndex = 0;

function resetCarousel() {
    item1_slideIndex = 0;
    item2_slideIndex = 0;
    item3_slideIndex = 0;
    item4_slideIndex = 0;
    item5_slideIndex = 0;
    item6_slideIndex = 0;

    updateItem1Bg();
    updateItem2Bg();
    updateItem3Bg();
    updateItem4Bg();
    updateItem5Bg();
    updateItem6Bg();
}

function rightArrow(elem) {
    const parent_id = elem.parentNode.parentNode.id;
    const item_num = parent_id.substring(parent_id.length-1);
    switch(item_num){
        case '1': item1_slideIndex++;
                if(item1_slideIndex > item1_imgs.length-1) {item1_slideIndex = 0}
                updateItem1Bg();
                break;
        case '2': item2_slideIndex++;
                if(item2_slideIndex > item2_imgs.length-1) {item2_slideIndex = 0}
                updateItem2Bg();
                break;
        case '3': item3_slideIndex++;
                if(item3_slideIndex > item3_imgs.length-1) {item3_slideIndex = 0}
                updateItem3Bg();
                break;
        case '4': item4_slideIndex++;
                if(item4_slideIndex > item4_imgs.length-1) {item4_slideIndex = 0}
                updateItem4Bg();
                break;
        case '5': item5_slideIndex++;
                if(item5_slideIndex > item5_imgs.length-1) {item5_slideIndex = 0}
                updateItem5Bg();
                break;
        case '6': item6_slideIndex++;
                if(item6_slideIndex > item6_imgs.length-1) {item6_slideIndex = 0}
                updateItem6Bg();
                break;
    }
}

function leftArrow(elem) {
    const parent_id = elem.parentNode.parentNode.id;
    const item_num = parent_id.substring(parent_id.length-1);
    switch(item_num){
        case '1': item1_slideIndex--;
                if(item1_slideIndex < 0) {item1_slideIndex = item1_imgs.length-1}
                updateItem1Bg();
                break;
        case '2': item2_slideIndex--;
                if(item2_slideIndex < 0) {item2_slideIndex = item2_imgs.length-1}
                updateItem2Bg();
                break;
        case '3': item3_slideIndex--;
                if(item3_slideIndex < 0) {item3_slideIndex = item3_imgs.length-1}
                updateItem3Bg();
                break;
        case '4': item4_slideIndex--;
                if(item4_slideIndex < 0) {item4_slideIndex = item4_imgs.length-1}
                updateItem4Bg();
                break;
        case '5': item5_slideIndex--;
                if(item5_slideIndex < 0) {item5_slideIndex = item5_imgs.length-1}
                updateItem5Bg();
                break;
        case '6': item6_slideIndex--;
                if(item6_slideIndex < 0) {item6_slideIndex = item6_imgs.length-1}
                updateItem6Bg();
                break;
    }
}

function updateItem1Bg() {
    document.getElementById('item-1').style.background = item1_imgs[item1_slideIndex];
}

function updateItem2Bg() {
    document.getElementById('item-2').style.background = item2_imgs[item2_slideIndex];
}

function updateItem3Bg() {
    document.getElementById('item-3').style.background = item3_imgs[item3_slideIndex];
}

function updateItem4Bg() {
    document.getElementById('item-4').style.background = item4_imgs[item4_slideIndex];
}

function updateItem5Bg() {
    document.getElementById('item-5').style.background = item5_imgs[item5_slideIndex];
}

function updateItem6Bg() {
    document.getElementById('item-6').style.background = item6_imgs[item6_slideIndex];
}