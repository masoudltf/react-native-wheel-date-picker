import React from "react";
import {StyleSheet, View, ViewPropTypes} from "react-native";
import CarouselWrapper from './CarouselWrapper';
import PropsType from "prop-types";
import {getYears, getMonths, getDays, getDaysOfMonth, getDefaultDate, CALENDAR_TYPES, LOCALES, FIELDS} from './Utils';
import jMoment from 'moment-jalaali';

export class WheelDatePicker extends React.Component {

    constructor(props) {
        super(props);
        this.defaultDate = getDefaultDate(props.defaultDate, props.calendarType);
        this.years = getYears(props.fromYear, props.toYear, props.calendarType);
        this.months = getMonths(props.calendarType, props.locale);
        this.days = getDays(getDaysOfMonth(props.toYear = this.years[this.years.length - 1], 0, props.calendarType));
    }

    getSelectedDate() {
        let {
            years,
            months,
            days
        } = this;

        let {calendarType} = this.props;

        let rawDate = this._yearsCarousel.getSelected() + '-' + this._monthsCarousel.getSelected() + '-' + this._daysCarousel.getSelected()
        let jMomentObject;

        switch (calendarType) {
            case CALENDAR_TYPES.GREGORIAN: {
                jMomentObject = jMoment(rawDate, 'YYYY-M-D');
                break;
            }
            case CALENDAR_TYPES.JALAALI: {
                jMomentObject = jMoment(rawDate, 'jYYYY-jM-jD');
                break;
            }
        }

        let gYear = jMomentObject.format('YYYY');
        let gMonth = jMomentObject.format('M');
        let gDay = jMomentObject.format('D');

        return {
            year: gYear,
            month: gMonth,
            day: gDay
        }
    }

    _onYearOrMonthChange = (index) => {
        let {
            years,
            months
        } = this;

        let {calendarType} = this.props;

        let year = parseInt(years[this._yearsCarousel.getCurrentIndex()]);
        let month = parseInt(this._monthsCarousel.getCurrentIndex());
        this._daysCarousel.setData(getDays(getDaysOfMonth(year, month, calendarType)), this._onDateChange);
    }

    _onDateChange = () => {
        let {onDateChange} = this.props;
        if (onDateChange) {
            onDateChange(this.getSelectedDate())
        }
    }

    render() {
        const {
            years,
            months,
            days,
            defaultDate
        } = this;

        let {locale, rowHeight, numberOfRows, textStyles} = this.props;

        return (
            <View style={styles.container}>
                <CarouselWrapper ref={ref => this._yearsCarousel = ref}
                                 onSnapToItem={this._onYearOrMonthChange}
                                 selected={defaultDate.year}
                                 locale={locale}
                                 itemHeight={rowHeight}
                                 sliderHeight={rowHeight * numberOfRows}
                                 textStyles={textStyles}
                                 data={years}/>
                <CarouselWrapper ref={ref => this._monthsCarousel = ref}
                                 onSnapToItem={this._onYearOrMonthChange}
                                 selected={defaultDate.month}
                                 locale={locale}
                                 itemHeight={rowHeight}
                                 sliderHeight={rowHeight * numberOfRows}
                                 textStyles={textStyles}
                                 data={months}/>
                <CarouselWrapper ref={ref => this._daysCarousel = ref}
                                 onSnapToItem={this._onDateChange}
                                 selected={defaultDate.day}
                                 locale={locale}
                                 itemHeight={rowHeight}
                                 sliderHeight={rowHeight * numberOfRows}
                                 textStyles={textStyles}
                                 data={days}/>
            </View>
        );
    }
}

WheelDatePicker.propTypes = {
    fromYear: PropsType.number,
    toYear: PropsType.number,
    defaultDate: PropsType.shape({year: PropsType.number, month: PropsType.number, day: PropsType.number}),
    calendarType: PropsType.oneOf(['gregorian', 'jalaali']),
    locale: PropsType.oneOf(['en', 'fa']),
    rowHeight: PropsType.number,
    numberOfRows: PropsType.number,
    onDateChange: PropsType.func,
    textStyles: PropsType.shape(ViewPropTypes.style)
}

WheelDatePicker.defaultProps = {
    // fromYear: '' calculated,
    // toYear: '' calculated,
    // defaultDate: {} calculated,
    calendarType: CALENDAR_TYPES.GREGORIAN,
    locale: LOCALES.EN,
    rowHeight: 50,
    numberOfRows: 3,
    onDateChange: undefined,
    textStyles: undefined
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    }
})