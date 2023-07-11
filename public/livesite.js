var dropDate = new Date("Nov 18, 2022 18:00:00").getTime();
dropDate = new Date("Jul 7, 2023 16:52:00").getTime();
var sitelive = true;
var displaysite = false;

document.getElementById('home').style.display = "none";
document.getElementById('home').style.opacity = "0";

if(sitelive){
    //update the count every 1 sec
    var x = setInterval(function() {
        // if(!sitelive){
            //get today's date and time
            var now = new Date().getTime();

            //find the distance between now and the countdown date
            var distance = dropDate - now;

            //Time calculations for days, hours, minutes, and seconds
            var days_num = Math.floor(distance/(1000*60*60*24));
            var hours_num = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes_num = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds_num = Math.floor((distance % (1000 * 60)) / 1000);

            var days = days_num.toString();
            var hours = hours_num.toString();
            var minutes = minutes_num.toString();
            var seconds = seconds_num.toString();

            if(days > 0){
                document.getElementById("countdown").innerHTML = days.padStart(2, '0') + " : " + hours.padStart(2, '0') + " : " + minutes.padStart(2, '0') + " : " + seconds.padStart(2, '0');
            } else {
                document.getElementById("countdown").innerHTML = hours.padStart(2, '0') + " : " + minutes.padStart(2, '0') + " : " + seconds.padStart(2, '0');
            }

            if(days == 0 && hours == 0 && minutes == 0 && seconds < 10){
                document.getElementById("countdown").style.color = "coral";
            }

            if(days == 0 && hours == 0 && minutes == 0 && seconds < 1){
                document.getElementById("countdown").className = "animate__animated animate__flash animate__repeat-3";
            }

            // If the count down is finished, write some text
            if (distance < 0) {
                clearInterval(x);
                // document.getElementById("test-msg").innerHTML = "LIVE";
                document.getElementById("countdown").innerHTML = "LIVE";
                // document.getElementById("countdown").style.color = "coral";
                document.getElementById("top-banner").style.display = "block";
                document.getElementById("online-site").style.display = "block";
                setTimeout(() => {
                    document.getElementById('offline-site').style.opacity = '0';
                    document.getElementById('home').style.display = "flex";
                }, 1000);
                setTimeout(() => {
                    // document.getElementById('online-site').style.display = "block";
                    document.getElementById('home').style.opacity = "1";
                }, 2200);
                setTimeout(() => {
                    document.getElementById('offline-site').style.display = 'none';
                }, 2800);
                // console.log('site is live');
            } else {
                // console.log('site not live');
            }
    }, 1000);
} else {
    document.getElementById("countdown").innerHTML = "DROP DATE TBD";
    document.getElementById("countdown").style.transition = "0s";
    document.getElementById("countdown").style.fontSize = "13px";
    document.getElementById("countdown").style.marginTop = "20px";
}