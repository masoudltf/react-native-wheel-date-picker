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
        years.push((toYear - i).toString());
    }
    years.push(fromYear.toString());

    return years;
}

export function getMonths(calendarType, locale) {
    return monthNames[calendarType][locale];
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
