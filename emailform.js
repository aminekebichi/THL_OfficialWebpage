function submitEmail(){
    const val = document.getElementById("email-input").value;
    if(isValidEmail(val)){
        alert('valid');
    } else {
        emailErrorForm();
    }
}

function isValidEmail(param){
    var str = String(param);
    if (str.includes('@') && str.includes('.') && charFreq(str, '@') === 1){
        var temp = str.split('@');
        for (var i = 0; i < temp.length; i++){
            if(temp[i].length < 1) {
                return false;
            }
        }
        return true;
    } else {
        return false;
    }
}

function charFreq(str, ch){
    var counter = 0;
    for(var i = 0; i < str.length; i++){
        if(str.charAt(i) === ch){
            counter++;
        }
    }

    return counter;
}

function emailErrorForm(){
    const elem = document.getElementById('email-input');
    elem.style.background = "rgb(255, 169, 169)";
    document.getElementById('emailform-error-msg').style.opacity = 1;
    document.getElementById('email-form').className = "email-inputform animate__animated animate__shakeX";
    setTimeout(() => {
        elem.style.background = "white";
    }, 1000);
    setTimeout(() => {
        document.getElementById('emailform-error-msg').style.opacity = 0;
        document.getElementById('email-form').className = "email-inputform";
    }, 3000);
}