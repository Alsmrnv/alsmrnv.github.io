const TIMER_POPUP_TIME = 30000;
const TIMER_POPUP_SHOWN_KEY = 'portfolio-timer';

function countUpFromTime(countFrom, id) {
    countFrom = new Date(countFrom).getTime();
    var now = new Date(),
        countFrom = new Date(countFrom),
        timeDifference = (countFrom - now);

    var secondsInADay = 60 * 60 * 1000 * 24,
        secondsInAHour = 60 * 60 * 1000;

    days = Math.floor(timeDifference / (secondsInADay) * 1);
    years = Math.floor(days / 365);
    if (years > 1) { days = days - (years * 365) }
    hours = Math.floor((timeDifference % (secondsInADay)) / (secondsInAHour) * 1);
    mins = Math.floor(((timeDifference % (secondsInADay)) % (secondsInAHour)) / (60 * 1000) * 1);
    secs = Math.floor((((timeDifference % (secondsInADay)) % (secondsInAHour)) % (60 * 1000)) / 1000 * 1);

    var idEl = document.getElementById(id);
    idEl.getElementsByClassName('years')[0].innerHTML = years;
    idEl.getElementsByClassName('days')[0].innerHTML = days;
    idEl.getElementsByClassName('hours')[0].innerHTML = hours;
    idEl.getElementsByClassName('minutes')[0].innerHTML = mins;
    idEl.getElementsByClassName('seconds')[0].innerHTML = secs;

    clearTimeout(countUpFromTime.interval);
    if (timeDifference < 0) {
        idEl.getElementsByClassName('years')[0].innerHTML = 0;
        idEl.getElementsByClassName('days')[0].innerHTML = 0;
        idEl.getElementsByClassName('hours')[0].innerHTML = 0;
        idEl.getElementsByClassName('minutes')[0].innerHTML = 0;
        idEl.getElementsByClassName('seconds')[0].innerHTML = 0;
        return
    }
    countUpFromTime.interval = setTimeout(function () { countUpFromTime(countFrom, id); }, 1000);
}

function createObserver() {
    const headerEl = document.querySelector('header')
    const sentinalEl = document.getElementById('first-section')

    const handler = (entries) => {
        if (!entries[0].isIntersecting) {
            headerEl.classList.add('fixed')
        } else {
            headerEl.classList.remove('fixed')
        }
    }

    const observer = new IntersectionObserver(handler)
    observer.observe(sentinalEl)
}

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
    })

    inputPhone.addEventListener('input', () => {
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

        inputErrPhone.textContent = phoneError
        inputErrName.textContent = nameError
        if (nameError || phoneError) {
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
    const formPopup = document.querySelector('.js-form-popup');
    const closeTimerBtn = timerPopup.querySelector('.js-popup-closer');
    const isTimerPopupShown = localStorage.getItem(TIMER_POPUP_SHOWN_KEY);
    if (!isTimerPopupShown || isTimerPopupShown == 'false') {
        setTimeout(() => {
            timerPopup.classList.add('popup-opened');
            if (formPopup.classList.contains('popup-opened')) {
                formPopup.classList.remove('popup-opened')
            }
        }, TIMER_POPUP_TIME)
    }

    closeTimerBtn.addEventListener('click', () => {
        timerPopup.classList.remove('popup-opened');
        localStorage.setItem(TIMER_POPUP_SHOWN_KEY, 'true');
    });
}


function startSvgAnimation() {
    var settings = [
        { // shapes 2
            scale: true,
            rotate: true,
            repulsion: true,
            hue: true,
            hueRandDir: true,
            hueMaxShift: 120,
        },
        { // shapes multy   
            scale: true,
            rotate: true,
            repulsion: true,
        },
        { // Live
            repulsion: true,
            repulsionDistance: 500,
            repulsionPower: 30,
        },
        { // Bags
            repulsion: true,
        },
        { // Letters
            scale: true,
            rotate: true,
            repulsion: true,
        }
    ];

    $(function () {
        App = {};
        App.chaos = [];

        $('.js-svg-mouse-observe').each(function (i) {
            App.chaos.push(new Chaos(this, settings[i]));
        });
    });

    function Chaos(container, options) {
        if (this instanceof Chaos) {
            this.defaults = {
                items: 'path, polygon, polyline, line, circle, rect',
                duration: 1.5,
                scale: false,
                scaleMax: 2,
                scaleDistance: 33, // % of width
                rotate: false,
                rotateDistance: 42, // % of width
                rotateDegPerFrame: 2,
                rotateRandDir: true,
                repulsion: false,
                repulsionDistance: 45, // % of width
                repulsionPower: 60,
                hue: false,
                hueRandDir: false,
                hueDistance: 50, // % of width
                hueMaxShift: 90
            };

            this.options = $.extend(true, {}, this.defaults, options);

            this.container = $(container);
            if (!this.container.length) return;

            this.items = this.container.find(this.options.items);
            if (!this.items.length) return;

            this.ticking = false;
            this.mouseX = 0;
            this.mouseY = 0;

            return this.init();
        }
    }

    Chaos.prototype = {
        constructor: Chaos,

        init: function () {
            this.resize();
            this.overrideOptionsFromElementData();
            this.prepare();
            this.attachEvents();
            return this;
        },

        overrideOptionsFromElementData: function () {
            for (var i in this.defaults) {
                if (this.defaults.hasOwnProperty(i)) {
                    var optionName = i;

                    var dataAttrName = 'chaos' + optionName.charAt(0).toUpperCase() + optionName.slice(1);
                    var value = this.container.data(dataAttrName);

                    if (typeof value !== 'undefined' && value !== null) {
                        //console.log('Chaos option "' + optionName + '" was overriden from element attribute with value: ' + value);
                        this.options[optionName] = value;
                    }
                }
            }
        },

        prepare: function () {
            var C = this;

            this.container.css({
                overflow: 'visible'
            });

            TweenLite.set(this.items, {
                // rotation: 0,
                scale: 1
            });

            if (this.options.rotateRandDir) {
                this.items.each(function () {
                    if (Math.random() > 0.5) {
                        this._chaosRotateDir = 1;
                    }
                    else {
                        this._chaosRotateDir = -1;
                    }
                    this._chaosRotate = this._gsTransform.rotation;
                });
            }

            if (C.options.hue) {
                this.items.each(function () {
                    var colorInitial = $(this).css('fill');
                    this._chaosColorInitial = colorInitial;

                    var rgb = parseColor(colorInitial);
                    var hsl = rgb2Hsl(rgb);
                    this._chaosColorH = hsl[0];
                    this._chaosColorS = hsl[1];
                    this._chaosColorL = hsl[2];

                    if (C.options.hueRandDir) {
                        if (Math.random() > 0.5) {
                            this._chaosHueDir = 1;
                        }
                        else {
                            this._chaosHueDir = -1;
                        }
                    }
                });
            }
        },

        update: function () {
            var C = this;
            this.items.each(function (i) {
                var thisRect = this.getBoundingClientRect();
                var distanceX = thisRect.left + thisRect.width / 2 - C.mouseX;
                var distanceY = thisRect.top + thisRect.height / 2 - C.mouseY;
                var distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

                var transforms = {
                    transformOrigin: "50% 50%"
                };

                if (C.options.repulsion) {
                    transforms.x = 0;
                    transforms.y = 0;

                    if (distance < C.repulsionDistancePx) {
                        var factor = C.options.repulsionPower / C.repulsionDistancePx;
                        var angle = Math.atan2(distanceY, distanceX);

                        transforms.x = (Math.cos(angle) * C.repulsionDistancePx - distanceX) * factor;
                        transforms.y = (Math.sin(angle) * C.repulsionDistancePx - distanceY) * factor;
                    }
                }

                if (C.options.scale) {
                    transforms.scale = 1;

                    if (distance < C.scaleDistancePx) {
                        var k = (C.options.scaleMax - 1) / C.scaleDistancePx;
                        transforms.scale = C.options.scaleMax - distance * k;
                    }
                }

                if (C.options.rotate) {
                    if (distance < C.rotateDistancePx) {
                        var rotate = this._chaosRotate;

                        if (!rotate) rotate = 0;

                        var rotationIncrement = (C.options.rotateRandDir && this._chaosRotateDir == -1)
                            ? -C.options.rotateDegPerFrame
                            : C.options.rotateDegPerFrame;

                        rotate = rotate * 1 + rotationIncrement;
                        this._chaosRotate = rotate;

                        transforms.rotation = rotate;
                    }
                }

                if (C.options.hue) {
                    if (distance < C.hueDistancePx) {
                        var effectPower = (C.hueDistancePx - distance) / C.hueDistancePx;
                        var h;

                        if (C.options.hueRandDir && this._chaosHueDir == -1) {
                            h = this._chaosColorH - C.options.hueMaxShift * effectPower;
                        } else {
                            h = this._chaosColorH + C.options.hueMaxShift * effectPower;
                        }

                        var fillRgb = hsl2Rgb(h, this._chaosColorS / 100, this._chaosColorL / 100);
                        transforms.fill = 'rgb(' + fillRgb[0] + ',' + fillRgb[1] + ',' + fillRgb[2] + ')';
                    } else {
                        transforms.fill = this._chaosColorInitial;
                    }
                }

                TweenLite.killTweensOf(this);
                TweenLite.to(this, C.options.duration, transforms);
            });

            this.ticking = false;
        },

        pointerMove: function (e) {
            if (!this.ticking) {
                this.mouseX = e.clientX;
                this.mouseY = e.clientY;

                requestAnimationFrame($.proxy(this.update, this));
                this.ticking = true;
            }
        },

        pointerLeave: function () {
            var C = this;
            TweenLite.killTweensOf(C.items);

            TweenLite.to(C.items, C.options.duration, {
                scale: 1,
                transformOrigin: "50% 50%",
                x: 0,
                y: 0
            });

            if (C.options.hue) {
                C.items.each(function (i) {
                    TweenLite.to(this, C.options.duration, {
                        fill: this._chaosColorInitial
                    });
                });
            }
        },

        resize: function () {
            this.width = this.container.width();
            this.repulsionDistancePx = this.options.repulsionDistance * this.width / 100;
            this.scaleDistancePx = this.options.scaleDistance * this.width / 100;
            this.rotateDistancePx = this.options.rotateDistance * this.width / 100;
            this.hueDistancePx = this.options.hueDistance * this.width / 100;
        },

        attachEvents: function () {
            this.container.on('mousemove touchmove', $.proxy(this.pointerMove, this));
            this.container.on('mouseleave touchend', $.proxy(this.pointerLeave, this));
            $(window).on('resize', $.proxy(this.resize, this));
        }
    };

    function parseColor(input) {
        if (input.substr(0, 1) == "#") {
            var collen = (input.length - 1) / 3;
            var fact = [17, 1, 0.062272][collen - 1];
            return [
                Math.round(parseInt(input.substr(1, collen), 16) * fact),
                Math.round(parseInt(input.substr(1 + collen, collen), 16) * fact),
                Math.round(parseInt(input.substr(1 + 2 * collen, collen), 16) * fact)
            ];
        }
        else return input.split("(")[1].split(")")[0].split(",").map(Math.round);
    }

    function hsl2Rgb(hueOrHSL, saturation, lightness) {
        if (hueOrHSL == undefined) {
            return [0, 0, 0];
        }

        var hue;
        if (typeof hueOrHSL == "object") {
            lightness = hueOrHSL[2];
            saturation = hueOrHSL[1];
            hue = hueOrHSL[0];
        } else {
            hue = hueOrHSL;
        }

        if (hue >= 360) {
            hue = hue - 360;
        } else if (hue < 0) {
            hue = hue + 360;
        }

        if (typeof saturation == 'string' && saturation.indexOf('%') !== -1) {
            saturation = parseFloat(saturation);
            saturation /= 100;
        }

        if (typeof lightness == 'string' && lightness.indexOf('%') !== -1) {
            lightness = parseFloat(lightness);
            lightness /= 100;
        }

        var chroma = (1 - Math.abs((2 * lightness) - 1)) * saturation;
        var huePrime = hue / 60;
        var secondComponent = chroma * (1 - Math.abs((huePrime % 2) - 1));

        huePrime = Math.floor(huePrime);
        var red;
        var green;
        var blue;

        if (huePrime === 0) {
            red = chroma;
            green = secondComponent;
            blue = 0;
        } else if (huePrime === 1) {
            red = secondComponent;
            green = chroma;
            blue = 0;
        } else if (huePrime === 2) {
            red = 0;
            green = chroma;
            blue = secondComponent;
        } else if (huePrime === 3) {
            red = 0;
            green = secondComponent;
            blue = chroma;
        } else if (huePrime === 4) {
            red = secondComponent;
            green = 0;
            blue = chroma;
        } else if (huePrime === 5) {
            red = chroma;
            green = 0;
            blue = secondComponent;
        }

        var lightnessAdjustment = lightness - (chroma / 2);
        red += lightnessAdjustment;
        green += lightnessAdjustment;
        blue += lightnessAdjustment;

        return [Math.round(red * 255), Math.round(green * 255), Math.round(blue * 255)];
    }

    function rgb2Hsl(r, g, b) {
        if (typeof r == "object") {
            b = r[2];
            g = r[1];
            r = r[0];
        }

        r /= 255;
        g /= 255;
        b /= 255;

        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2;

        if (max == min) {
            h = s = 0; // achromatic
        }
        else {
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }

        return [Math.floor(h * 360), Math.floor(s * 100), Math.floor(l * 100)];
    }
}

function startFancybox() {
    const list = document.getElementById('js-fancy-list');
    const galleryList = document.getElementById('js-popup-gallery')
    const images = list.querySelectorAll('img');

    const galleryPopup = document.querySelector('.js-gallery-popup');
    const closeBtn = galleryPopup.querySelector('.js-popup-closer');
    closeBtn.addEventListener('click', () => {
        galleryPopup.classList.remove('popup-opened');
    });

    const prevBnt = galleryPopup.querySelector('.js-prev-btn');
    const nextBnt = galleryPopup.querySelector('.js-next-btn');


    let activeIndex = 0;

    const openActiveImg = () => {
        prevBnt.classList.remove('hidden');
        nextBnt.classList.remove('hidden');
        if (activeIndex == 0) {
            prevBnt.classList.add('hidden');
        }
        if (activeIndex == images.length - 1) {
            nextBnt.classList.add('hidden');
        }

        const items = Array.from(galleryList.querySelectorAll('li'));

        items.forEach(li => li.classList.add('d-none'))

        items[activeIndex].classList.remove('d-none')
    }


    images.forEach((img, index) => {
        const li = document.createElement('li');
        li.innerHTML = img.outerHTML;
        galleryList.append(li);
        const liImg = li.querySelector('img');
        liImg.classList.remove('photos__img');
        li.classList.add('d-none');
        img.onclick = (e) => {
            activeIndex = index;
            openActiveImg();
            galleryPopup.classList.add('popup-opened');

        }
    });

    prevBnt.onclick = () => {
        activeIndex -= 1;
        if (activeIndex < 0) {
            activeIndex = 0;
        }
        openActiveImg();
    }
    nextBnt.onclick = () => {
        activeIndex += 1;
        openActiveImg();
        if (activeIndex > images.legth - 1) {
            activeIndex = images.legth - 1;
        }
    }
}



document.addEventListener('DOMContentLoaded', () => {
    startModalForm();
    startTimerPopup();
    countUpFromTime("May 30, 2027 12:00:00", 'countup1');
    createObserver();
    startSvgAnimation();
    startFancybox();
});
