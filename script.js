const resultElement = document.querySelector('.js-result');
const pullsElement = document.querySelector('.js-pulls');
const gemsElement = document.querySelector('.js-gems');
const pityElement = document.querySelector('.js-pity');
const dateInputElement = document.querySelector('.js-date');
const starElement = document.querySelector('.js-5stars');
const headerElement = document.querySelector('.js-header');
const selectorElement = document.querySelector('.js-selector');

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
            game = 1;
            break;
        case 'hsr':
            headerElement.style.backgroundColor = '#64305f';
            game = 2;
            break;
        case 'zzz':
            headerElement.style.backgroundColor = '#9e5122';
            game = 3;
            break;
    }
}
