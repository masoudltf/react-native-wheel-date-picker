/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text
} from 'react-native';

import {WheelDatePicker} from "react-native-wheel-date-picker";

class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.cal}>
                    <WheelDatePicker ref={ref => this._gregorianPicker = ref}
                                     onDateChange={(newDate) => alert(newDate.day)}
                                     textStyles={{color: 'red'}}/>
                </View>
                <TouchableOpacity style={styles.button}
                                  onPress={() => console.log(this._gregorianPicker.getSelectedDate())}>
                    <Text>{'Show Date'}</Text>
                </TouchableOpacity>

                <View style={styles.cal}>
                    <WheelDatePicker ref={ref => this._jalaaliPicker = ref}
                                     fromYear={1390}
                                     toYear={1400}
                                     rowHeight={50}
                                     numberOfRows={5}
                                     defaultDate={{year: 1395, month: 4, day: 23}}
                                     calendarType={'jalaali'}
                                     locale={'fa'}/>
                </View>
                <TouchableOpacity style={styles.button}
                                  onPress={() => console.log(this._jalaaliPicker.getSelectedDate())}>
                    <Text>{'نمايش تاريخ'}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#fafafa',
        justifyContent: 'center'
    },

    cal: {
        backgroundColor: '#ffffff',
        elevation: 2,
        borderRadius: 5,
        marginVertical: 5
    },

    button: {
        borderRadius: 5,
        paddingVertical: 10,
        marginVertical: 10,
        width: 100,
        elevation: 2,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default App;
