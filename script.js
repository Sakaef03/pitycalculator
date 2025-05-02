const resultElement = document.querySelector('.js-result');
const pullsElement = document.querySelector('.js-pulls');
const gemsElement = document.querySelector('.js-gems');
const pityElement = document.querySelector('.js-pity');
const dateInputElement = document.querySelector('.js-date');
const starElement = document.querySelector('.js-5stars');
const headerElement = document.querySelector('.js-header');
const selectorElement = document.querySelector('.js-selector');
const firstImageElement = document.querySelector('.js-firstimg');
const firstBannerElement = document.querySelector('.js-firstbanner');
const secondImageElement = document.querySelector('.js-secondimg');
const secondBannerElement = document.querySelector('.js-secondbanner');
const durationElements = document.querySelectorAll('.js-duration');

resultElement.innerHTML = '';
pullsElement.value = '';
gemsElement.value = '';
pityElement.value = '';
dateInputElement.value = '';

const dayUnit = 24 * 60 * 60 * 1000;
let today = new Date();
const day = String(today.getDate()).padStart(2, '0');
const month = String(today.getMonth() + 1).padStart(2, '0');
const year = today.getFullYear();

let game = 1;

const genshin = {
    firstImage: "images/characters/venti.png",
    firstText: `Venti`,
    secondImage: "images/characters/xilonen.png",
    secondText: `Xilonen`,
    duration: `15/04/2025 - 05/05/2025`
};

const honkai = {
    firstImage: "images/characters/anaxa.png",
    firstText: `Anaxa`,
    secondImage: "images/characters/ratio.png",
    secondText: `Dr. Ratio`,
    duration: `01/05/2025 - 20/05/2025`
};

const zenless = {
    firstImage: "images/characters/vivian.png",
    firstText: `Vivian`,
    secondImage: "images/characters/jane.png",
    secondText: `Jane Doe`,
    duration: `22/04/2025 - 14/05/2025`
};

let gameObject;

updateBanners(game);

today = day + '/' + month + '/' + year;

function calculate(isWelkin) {
    const firstDate = parseDate(today);
    const finalDate = parseDate(dateInputElement.value);

    if (isNaN(firstDate.getTime()) || isNaN(finalDate.getTime())) {
        resultElement.innerHTML = '';
        return;
    }

    const days = daysBetween(firstDate, finalDate);
    let pulls = 0;
    let gems;

    if (!isWelkin) {
        gems = (days * 60) + Number(gemsElement.value);
        const patchDays = Math.trunc(days / 42);
        if (patchDays > 0) {
            gems += (300 * patchDays);
        }
        pulls = Math.trunc(gems / 160) + Number(pullsElement.value) + Number(pityElement.value);
    } else {
        gems = (days * 150) + Number(gemsElement.value);
        let welkinDays = Math.trunc(days / 30);
        const remainderWelkin = days % 30;
        if (welkinDays > 0 && remainderWelkin > 0) {
            welkinDays += 1;
        }
        gems += (300 * welkinDays);

        const patchDays = Math.trunc(days / 42);
        if (patchDays > 0) {
            gems += (300 * patchDays);
        }
        pulls = Math.trunc(gems / 160) + Number(pullsElement.value) + Number(pityElement.value);
    }
    resultElement.innerHTML = `Resulting pulls: ${pulls}`;
}

function parseDate(dateString) {
    const [year, month, day] = dateString.includes('-') 
        ? dateString.split('-')
        : dateString.split('/').reverse();
    return new Date(year, month - 1, day);
}

function daysBetween(firstDate, secondDate) {
    const start = Date.UTC(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate());
    const end = Date.UTC(secondDate.getFullYear(), secondDate.getMonth(), secondDate.getDate());
    return Math.round(Math.abs(end - start) / dayUnit);
}

function changeGame(e) {
    let game = e.target.value;
    switch(game) {
        case 'genshin':
            headerElement.style.backgroundColor = '#2a529d';
            selectorElement.style.backgroundColor = '#2a529d';
            game = 1;
            updateBanners(1);
            break;
        case 'hsr':
            headerElement.style.backgroundColor = '#64305f';
            selectorElement.style.backgroundColor = '#64305f';
            game = 2;
            updateBanners(2);
            break;
        case 'zzz':
            headerElement.style.backgroundColor = '#9e5122';
            selectorElement.style.backgroundColor = '#9e5122';
            game = 3;
            updateBanners(3);
            break;
    }
}

function updateBanners(selectedGame) {
    switch(selectedGame) {
        case 1:
            gameObject = genshin;
            break;
        case 2:
            gameObject = honkai;
            break;
        case 3:
            gameObject = zenless;
            break;
    }
    
    firstImageElement.src = gameObject.firstImage;
    firstBannerElement.textContent = gameObject.firstText;
    secondImageElement.src = gameObject.secondImage;
    secondBannerElement.textContent = gameObject.secondText;
    durationElements.forEach(element => {
        element.textContent = gameObject.duration;
    });
}

function updateTime(index) {
    const dates = gameObject.duration.split(' - ');
    const selectedDate = index === 1 ? dates[0] : dates[1];
    const [day, month, year] = selectedDate.split('/');
    const formattedDate = `${year}-${month}-${day}`;
    dateInputElement.value = formattedDate;
    window.scrollTo({ top: 0, behavior: 'smooth' })
}
