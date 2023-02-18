
function timeUntil(date){
    const endOfSem = new Date(2022, 11, 22);
    // Calculation of timeBetween idea from example 6.12.3 in the textbook
    let timeBetween = endOfSem.getTime() - date.getTime();
    // Calculation of daysBetween idea from example 6.12.3 in the textbook
    let daysBetween = Math.floor(timeBetween / (1000 * 60 * 60 * 24))
    timeBetween = timeBetween - (daysBetween * 1000 * 60 * 60 * 24);
    let hoursBetween = Math.floor(timeBetween / (1000 * 60 * 60));
    timeBetween = timeBetween - (hoursBetween * 1000 * 60 * 60);
    let minutesBetween = Math.floor(timeBetween / (1000 * 60));
    timeBetween = timeBetween - (minutesBetween * 1000 * 60);
    let secondsBetween = Math.floor(timeBetween / (1000));

    let countdown = {
        days: daysBetween,
        hours: hoursBetween,
        minutes: minutesBetween,
        seconds: secondsBetween
    };
    
    return countdown;
}

function showResult(){
    const currentDate = new Date();
    const countdown = timeUntil(currentDate);

    // Replace the span with id="timeUntilResult" with the returned object properties of 'countdown'
    const timeElement = document.getElementById("timeUntilResult");
    timeElement.innerText = `${countdown.days} Days ${countdown.hours} Hours ${countdown.minutes} Minutes ${countdown.seconds} Seconds`;
}

let intervalID = setInterval(showResult, 1000);
// Not calling clearInterval because this widget should run as long as the page is loaded