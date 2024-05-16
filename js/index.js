const TIMER_POPUP_TIME = 30000;
const TIMER_POPUP_SHOWN_KEY = 'portfolio-timer';

document.addEventListener('DOMContentLoaded', () => {
    const openFormBtn = document.querySelector('.js-form-popup-opener');
    const formPopup = document.querySelector('.js-form-popup');
    const closeFormBtn = formPopup.querySelector('.js-popup-closer');
    openFormBtn.addEventListener('click', () => {
        formPopup.classList.add('popup-opened'); 
    });
    closeFormBtn.addEventListener('click', () => {
        formPopup.classList.remove('popup-opened');
    });


    const timerPopup = document.querySelector('.js-timer-popup');
    const closeTimerBtn = timerPopup.querySelector('.js-popup-closer');
    const isTimerPopupShown = localStorage.getItem(TIMER_POPUP_SHOWN_KEY);
    if (!isTimerPopupShown || isTimerPopupShown == 'false') {
        setTimeout(() => {
            timerPopup.classList.add('popup-opened');
        }, TIMER_POPUP_TIME)
    }

    closeTimerBtn.addEventListener('click', () => {
        timerPopup.classList.remove('popup-opened');
        localStorage.setItem(TIMER_POPUP_SHOWN_KEY, 'true');
    });
});


(function () {
    const second = 1000,
          minute = second * 60,
          hour = minute * 60,
          day = hour * 24;

    let today = new Date(),
        dd = String(today.getDate()).padStart(2, "0"),
        mm = String(today.getMonth() + 1).padStart(2, "0"),
        yyyy = today.getFullYear(),
        nextYear = yyyy + 3,
        dayMonth = "05/30/",
        graduation = dayMonth + yyyy;
    
    today = mm + "/" + dd + "/" + yyyy;
    if (today > graduation) {
      graduation = dayMonth + nextYear;
    }
    
    const countDown = new Date(graduation).getTime(),
        x = setInterval(function() {    
  
          const now = new Date().getTime(),
                distance = countDown - now;
  
          document.getElementById("days").innerText = Math.floor(distance / (day)),
            document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour)),
            document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute)),
            document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);
  
        }, 0)
    }());
