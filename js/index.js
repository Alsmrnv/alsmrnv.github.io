const TIMER_POPUP_TIME = 30000;
const TIMER_POPUP_SHOWN_KEY = 'portfolio-timer';

function startCountDown() {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    let today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    const nextYear = yyyy + 3;
    const dayMonth = "05/30/";
    const graduation = dayMonth + nextYear;

    today = mm + "/" + dd + "/" + yyyy;
    console.log(today, graduation)

    const countDown = new Date(graduation).getTime();
    const x = setInterval(function () {

        const now = new Date().getTime();
        const distance = countDown - now;

        document.getElementById("days").innerText = Math.floor(distance / (day)),
            document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour)),
            document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute)),
            document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);

    }, 0)
};

function startModalForm() {
    const openFormBtn = document.querySelector('.js-form-popup-opener');
    const formPopup = document.querySelector('.js-form-popup');
    const closeFormBtn = formPopup.querySelector('.js-popup-closer');
    openFormBtn.addEventListener('click', () => {
        formPopup.classList.add('popup-opened');
    });
    closeFormBtn.addEventListener('click', () => {
        formPopup.classList.remove('popup-opened');
    });

    const telInputs = document.querySelectorAll('input[name="phone"]');
    telInputs.forEach(input => {
        const maskOptions = {
            mask: '+{7} (000) 000 00 00',
            RegExp: '(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?'
        }
        const t = IMask(input, maskOptions);
    });

    const url = 'https://reqres.in/api/create';
    const form = document.getElementById('js-contact-form')
    const btn = form.querySelector('button[type="submit"');
    const inputName = form.querySelector('input[name="name"]');
    const inputPhone = form.querySelector('input[name="phone"]');

    const inputNameParent = inputName.parentElement;
    const inputPhoneParent = inputPhone.parentElement;
    const inputErrName = inputNameParent.querySelector('.js-err-name')
    const inputErrPhone = inputPhoneParent.querySelector('.js-err-phone')

    inputName.addEventListener('input', () => {
        inputErrName.textContent = ''
        inputErrPhone.textContent = ''
    })

    form.addEventListener('submit', e => {
        e.preventDefault();


        let nameError = ''
        let phoneError = ''

        const nameValue = inputName.value.trim();
        const phoneValue = inputPhone.value.trim();

        if (!nameValue) {
            nameError = 'Обязательное поле'
        } else if (nameValue.length < 2 || !/^[\u0400-\u04FF ]+$/.test(nameValue)) {
            nameError = 'Некорректный формат'
        }
        
        if (!phoneValue) {
            phoneError = 'Обязательное поле'
        } else if (phoneValue.length != 18) {
            phoneError = 'Некорректный формат'
        }

        if (nameError) {
            inputErrName.textContent = nameError
            return;
        }

        if (phoneError) {
            inputErrPhone.textContent = phoneError
            return;
        }

        let user = {
            'name': nameValue,
            "phone": inputPhone.value
        };
        formData = JSON.stringify(user)
        btn.textContent = 'Отправляем...'
        btn.setAttribute('disabled', '')
        fetch(url, {
            method: 'POST',
            body: formData
        }).catch(err => {
            btn.textContent = 'Произошла ошибка'
        }).then(res => {
            if (res.ok) {
                console.log(res)
                btn.textContent = 'Отправлено'
                form.reset()
            } else {
                btn.textContent = 'Произошла ошибка'
            }
        }).finally(() => {
            btn.removeAttribute('disabled')

        })
    })

}

function startTimerPopup() {
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
}



document.addEventListener('DOMContentLoaded', () => {
    startModalForm()
    startTimerPopup()
    startCountDown()
});
