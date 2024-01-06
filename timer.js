// timer values
let hours = 0;
let minutes = 0;
let seconds = 0;
let mseconds = 0;
let timer = null;

// pomodoro
let pomodoroFlag = false;
let restFlag = false;

function cheat(m, s){
    if (pomodoroFlag){
        minutes -= m;
        seconds -= s;
    }
    else{
        minutes += m;
        seconds += s;
    }
}

function handleTimer(){
    if (!timer){
        if (pomodoroFlag && !restFlag && minutes === 0){
            minutes = 15;
        }
        else if (pomodoroFlag && restFlag && minutes === 0){
            minutes = 5;
        }
        timer = setInterval(toggleTimer, 5);
    }
    else{
        timer = clearInterval(timer);
    }
}

function resetTimer(){
    timer = clearInterval(timer);
    if(!pomodoroFlag){
        hours = 0;
        minutes = 0;
        seconds = 0;
        mseconds = 0;
    }
    else if(pomodoroFlag && !restFlag){
        hours = 0;
        minutes = 15;
        seconds = 0;
        mseconds = 0;
    }
    else{
        hours = 0;
        minutes = 5;
        seconds = 0;
        mseconds = 0;
    }
    updateDisplay();
}

function toggleTimer(){
    handleMseconds();
    updateDisplay();
}

function updateDisplay(){
    document.getElementById("hours").innerHTML = String(hours).padStart(2, '0');
    document.getElementById("minutes").innerHTML = String(minutes).padStart(2, '0');
    document.getElementById("seconds").innerHTML = String(seconds).padStart(2, '0');
    document.getElementById("mseconds").innerHTML = String(mseconds).padStart(4, '0');
}

function handleMseconds(){
    if (mseconds >= 999 && !pomodoroFlag){
        mseconds = 0;
        handleSeconds();
        return;
    }
    else if (mseconds <= 1 && seconds === 0 && minutes === 0 && pomodoroFlag){
        mseconds = 0;
        resetTimer();
        if (restFlag){
            minutes = 15;
            restFlag = false;
        }
        else{
            minutes = 5;
            restFlag = true;
        }
        updateDisplay();
        let ding = new Audio('assets/alarm.mp3');
        ding.play();
        return;
    }
    else if (mseconds <= 1 && pomodoroFlag){
        mseconds = 999;
        handleSeconds();
        return;
    }

    if (pomodoroFlag){
        mseconds -= 5;
        return;
    }
    mseconds += 5;
}

function handleSeconds(){
    if (seconds === 59 && !pomodoroFlag){
        seconds = 0;
        handleMinutes();
        return;
    }
    else if (seconds <= 0 && pomodoroFlag){
        seconds = 59;
        minutes -= 1;
        return;
    }

    if (pomodoroFlag){
        seconds -= 1;
        return;
    }
    seconds += 1;
}

function handleMinutes(){
    if (minutes === 59 && !pomodoroFlag){
        minutes = 0;
        hours += 1;
        return;
    }

    if (pomodoroFlag){
        minutes -= 1;
        return;
    }
    minutes += 1;
}

function handlePomodoro(){
    resetTimer();
    pomodoroFlag = !pomodoroFlag;
    if (pomodoroFlag){
        minutes = 15;
    }
    else{
        minutes = 0;
    }
    updateDisplay();
}