import jMoment from "moment-jalaali";

export const FIELDS = {
    YEAR: 'year',
    MONTH: 'month',
    DAY: 'day'
}

export const CALENDAR_TYPES = {
    GREGORIAN: 'gregorian',
    JALAALI: 'jalaali'
}

export const LOCALES = {
    EN: 'en',
    FA: 'fa'
}

export function getYears(fromYear, toYear, calendarType) {
    fromYear = fromYear ? fromYear : (calendarType === CALENDAR_TYPES.GREGORIAN ? new Date().getFullYear() - 10 : parseInt(jMoment().format('jYYYY')) - 10);
    toYear = toYear ? toYear : (calendarType === CALENDAR_TYPES.GREGORIAN ? new Date().getFullYear() : parseInt(jMoment().format('jYYYY')));


    let years = [];
    let offset = toYear - fromYear;
    for (let i = 0; i < offset; i++) {
        years.push((toYear - i));
    }
    years.push(fromYear);

    return years;
}

export function getMonths(calendarType, locale) {
    return monthNames[calendarType][locale];
}

export function getDays(count) {
    let days = [];
    for (let i = 1; i <= count; i++) {
        days.push(i)
    }
    return days;
}

export function getDaysOfMonth(year, month, calendarType) {
    if (calendarType === CALENDAR_TYPES.GREGORIAN) {
        month = month + 1;
        return new Date(year, month, 0).getDate();
    } else {
        return jMoment.jDaysInMonth(year, month)
    }
}

export function getDefaultDate(defaultDate, calendarType) {
    if (defaultDate) {
        return defaultDate
    } else {
        switch (calendarType) {
            case CALENDAR_TYPES.GREGORIAN: {
                return {year: parseInt(jMoment().format('YYYY')), month: parseInt(jMoment().format('MM')), day: parseInt(jMoment().format('DD'))}
            }
            case CALENDAR_TYPES.JALAALI: {
                return {year: parseInt(jMoment().format('jYYYY')), month: parseInt(jMoment().format('jMM')), day: parseInt(jMoment().format('jDD'))}
            }
        }
    }
}

const monthNames = {
    gregorian: {
        en: ['January','February','March','April','May','June','July','August','September','October','November','December'],
        fa: ['ژانویه','فوریه','مارس','آوریل','مه','ژوئن','ژوئیه','اوت','سپتامبر','اکتبر','نوامبر','دسامبر']
    },
    jalaali: {
        en: ['Farvardin','Ordibehesht','Khordad','Tir','Mordad','Shahrivar','Mehr','Aban','Azar','Dey','Bahman','Esfand'],
        fa: ['فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند']
    }
}
