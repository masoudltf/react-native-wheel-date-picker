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
    Button
} from 'react-native';

import {WheelDatePicker} from "react-native-wheel-date-picker";

class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <WheelDatePicker ref={ref => this._wheelDatePicker = ref}
                                 // fromYear={1380}
                                 // toYear={1400}
                                 locale={'en'}
                                 calendarType={'gregorian'}/>
                <Button title={'Alert Date'}
                        onPress={() => {
                            alert(this._wheelDatePicker.getSelectedDate())
                        }} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});

export default App;
