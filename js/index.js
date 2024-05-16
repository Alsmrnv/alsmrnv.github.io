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
