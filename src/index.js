import './styles/style.sass';

import { Calendar } from './Calendar';

let calendar = new Calendar(document);

calendar.render();

let nextButton = document.querySelector('.calendar .calendar-header .next');
let prevButton = document.querySelector('.calendar .calendar-header .prev');

nextButton.addEventListener('click', calendar.increaseMonthByOne);
prevButton.addEventListener('click', calendar.decreaseMonthByOne);