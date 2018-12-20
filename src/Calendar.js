import {toMonth} from 'number-to-date-month-name';

export class Calendar {
    constructor(document) {
        this.document = document;
        this.now = new Date(Date.now());
        this.displayTime = this.now;

        this._getReferences();
        this._createMapForDays();

        this.increaseMonthByOne = this.increaseMonthByOne.bind(this);
        this.decreaseMonthByOne = this.decreaseMonthByOne.bind(this);
    }

    _getReferences() {
        this.elementYear = this.document.querySelector(
            '.calendar .calendar-header .year'
        );
        this.elementMonth = this.document.querySelector(
            '.calendar .calendar-header .month'
        );
        this.elementDays = this.document.querySelector(
            '.calendar .calendar-body .days-container'
        );
        this.elementDates = this.document.querySelector(
            '.calendar .calendar-body .dates-container'
        );
    }

    _createMapForDays() {
        this.map = new Map();
        this.map.set(1, 'MON');
        this.map.set(2, 'TUE');
        this.map.set(3, 'WED');
        this.map.set(4, 'THU');
        this.map.set(5, 'FRI');
        this.map.set(6, 'SAT');
        this.map.set(7, 'SUN');
    }

    _populateDays() {

        let ulElement = this.document.createElement('ul');

        for (let i = 1; i <= 7; i++) {
            let ele = this.document.createElement('li');
            ele.textContent = this.map.get(i);
            ulElement.appendChild(ele);
            this.elementDays.replaceChild(ulElement, this.elementDays.firstChild);
        }
    }

    _populateDates() {

        let ulElement = this.document.createElement('ul');

        //First Caculate how many blank days
        let blankDays = this.monthFirstDay - 1;

        //Add blanksDays + this.month Dates into ul element

        for (let i = 0; i < blankDays; i++) {
            let emptyliElement = this.document.createElement('li');
            ulElement.appendChild(emptyliElement);
        }

        for (let i = 0; i < this.daysInMonth; i++) {
            let emptyliElement = this.document.createElement('li');
            let date = i + 1;
            emptyliElement.textContent = date.toString();
            this._markToday(this.displayTime, emptyliElement);
            ulElement.appendChild(emptyliElement);
        }

        this.elementDates.replaceChild(ulElement, this.elementDates.firstChild);
    }

    _markToday(date, elem) {
        if (
            date.getFullYear() === this.now.getFullYear() &&
            date.getMonth() === this.now.getMonth() &&
            date.getDate() === this.now.getDate()
        ) {
            elem.classList.add('today');
        }
    }

    render() {
        this.date = this.displayTime.getDate();
        this.day = this.displayTime.getDay() + 1;
        this.month = this.displayTime.getMonth() + 1;
        this.year = this.displayTime.getFullYear();
        this.daysInMonth = new Date(this.year, this.month, 0).getDate();
        this.monthFirstDay = new Date(this.year, this.month, 1).getDay() + 1;

        this._populateDays();
        this._populateDates();

        this.elementYear.textContent = this.year.toString();
        this.elementMonth.textContent = toMonth(this.month);
    }

    increaseMonthByOne() {
        this.displayTime.setMonth(this.displayTime.getMonth()+1);
        this.render();
    }

    decreaseMonthByOne() {
        this.displayTime.setMonth(this.displayTime.getMonth()-1);
        this.render();
    }
}
