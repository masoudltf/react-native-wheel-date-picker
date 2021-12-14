# React Native Wheel Date Picker 🗓️

[comment]: <> ([![NPM Version]&#40;https://img.shields.io/npm/v/react-native-general-calendars.svg?style=flat&#41;]&#40;https://www.npmjs.com/package/react-native-general-calendars&#41;)

This module provides a simple carousel date picker with support of gregorian and jalaali date. 

The package is both **Android** and **iOS** compatible.

## Installation

`$ yarn add react-native-wheel-date-picker`

or

`$ npm install react-native-wheel-date-picker`

This module used [**react-native-snap-carousel**](https://github.com/meliorence/react-native-snap-carousel) and [**moment-jalaali**](https://github.com/jalaali/moment-jalaali) and linking is not required.

## Usage

First, you need to import module in your component.

```javascript
import {WheelDatePicker} from "react-native-wheel-date-picker";
```

Then you can use module, like this:

```javascript
<WheelDatePicker ref={ref => this._wheelDatePicker = ref}
                 fromYear={2011}
                 toYear={2021}
                 locale={'en'}
                 defaultDate={{year: 2021, month: 12, day: 15}}
                 calendarType={'gregorian'}/>
```

### Properties

All properties are optional.

| Param | Type    | Default | Description |
| ----- | ------- | ------- | ----------- |
| calendarType | String | `gregorian`   | Two type of calendars ('gregorian' or 'jalaali') are supported. |
| locale        | String  | `en` | Display numbers and month names in english or persian. |
| defaultDate        | Object  | `Current Date` | Depends on calendar type, default selected date is current gregorian or jalaali date.<br>You can set this property like this: `{year: 2021, month: 12, day: 15}` |
| toYear        | Number  | `Current year` | Maximum selectable year. |
| fromYear        | Number  | `10 years less than toYear` | Minimum selectable year. |
| rowHeight        | Number  | `50` | Height of the picker rows. |
| numberOfRows        | Number  | `3` | Number of the visible picker rows. |
| onDateChange        | Function  | `undefined` | Fired when any change happens in date picker.<br> Selected date is available in method.<br>`onDateChange = (selectedDate) => {}` |
| textStyles        | Object  | `undefined` | Custom style for texts. |

### Methods

| Method | Return Type | Sample | Description |
| ------ | ----------- |----------- | ----------- |
| getSelectedDate | Object | `{year: '2021', month: '12', day: '15'}` | Returns selected date in gregorian |

[comment]: <> (<kbd>)

[comment]: <> (  <img height=50 src="https://github.com/rghorbani/react-native-general-calendars/blob/master/demo/marking2.png?raw=true">)

[comment]: <> (</kbd>)
