var counter = 0;

function myfunc(){
    var mydiv = document.createElement("div");
    mydiv.innerHTML = `
    <div class="bg-wrapper" id="fractal` + (counter++) + `" onmouseover="highlight(this)" style="float: left; z-index: 0; transform: translate(-3px, -15px);">
        <div class="triangle-up"></div>
        <div class="vertical-rectangle"></div>
        <div class="center-wrapper">
            <div class="triangle-left"></div>
            <div class="horizontal-rectangle"></div>
            <div class="square"></div>
            <div class="horizontal-rectangle"></div>
            <div class="triangle-right"></div>
        </div>
        <div class="vertical-rectangle"></div>
        <div class="triangle-down"></div>
    </div>
    `;

    document.getElementById('temp').appendChild(mydiv);
}

function highlight(param){
    // console.log(param.id);
    document.getElementById(param.id).style.opacity = "1";
    setTimeout(() => {
        document.getElementById(param.id).style.opacity = "0";
    }, 1600);
}

for(var i=0; i<9999; i++){
    myfunc();
}