import React from "react";
import {StyleSheet, View} from "react-native";
import CarouselWrapper from './CarouselWrapper';
import PropsType from "prop-types";
import {getYears, getMonths, CALENDAR_TYPES, LOCALES, FIELDS} from './Utils';

const JALALI_DAYS = ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'];

export class WheelDatePicker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            years: getYears(props.fromYear, props.toYear, props.calendarType),
            months: getMonths(props.calendarType, props.locale),
            days: JALALI_DAYS
        };
    }

    getSelectedDate() {
        let {
            years,
            months,
            days
        } = this.state;

        return (
            years[this._yearsCarousel.getCurrentIndex()] + ' - ' +
            months[this._monthsCarousel.getCurrentIndex()] + ' - ' +
            days[this._daysCarousel.getCurrentIndex()]
        )
    }

    _onYearChange = (index) => {
        //if jalali then search for kabise year and set esfand days
    }

    _onMonthChange = (index) => {
        //change days for selected month
    }

    _onDayChange = (index) => {
        //change month if days overflow
    }

    render() {
        const {
            years,
            months,
            days
        } = this.state;

        return (
            <View style={styles.container}>
                <CarouselWrapper ref={ref => this._yearsCarousel = ref}
                                 onSnapToItem={this._onYearChange}
                                 data={years}/>
                <CarouselWrapper ref={ref => this._monthsCarousel = ref}
                                 onSnapToItem={this._onMonthChange}
                                 data={months}/>
                <CarouselWrapper ref={ref => this._daysCarousel = ref}
                                 onSnapToItem={this._onDayChange}
                                 data={days}/>
            </View>
        );
    }
}

WheelDatePicker.propTypes = {
    fromYear: PropsType.number,
    toYear: PropsType.number,
    calendarType: PropsType.oneOf(['gregorian', 'jalaali']),
    locale: PropsType.oneOf(['en', 'fa'])
}

WheelDatePicker.defaultProps = {
    // fromYear: '' calculated,
    // toYear: '' calculated,
    calendarType: CALENDAR_TYPES.GREGORIAN,
    locale: LOCALES.EN
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    }
})