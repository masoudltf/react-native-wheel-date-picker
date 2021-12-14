import React from "react";
import Carousel from "react-native-snap-carousel";
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {localizeNumbers} from './Utils';

export default class CarouselWrapper extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: props.data
        };
    }

    snapToItem = (index) => {
        this._carousel.snapToItem(index);
    }

    getCurrentIndex = () => {
        return this._carousel.currentIndex
    }

    getSelected = () => {
        let {
            data
        } = this.state;

        let currentIndex = this.getCurrentIndex();

        if (parseInt(data[0]).toString() === 'NaN') {
            return currentIndex + 1;
        } else {
            return data[currentIndex]
        }
    }

    setData = (data, callback) => {
        this.setState({data}, callback)
    }

    _renderItem = ({item}) => {
        let {
            locale,
            textStyles
        } = this.props;

        return (
            <TouchableOpacity activeOpacity={1}
                              onPress={() => this._onItemPress(item)}
                              style={styles.slide}>
                <Text style={[styles.wheelText, textStyles]}>{localizeNumbers(item.toString(), locale)}</Text>
            </TouchableOpacity>
        )
    }

    _onItemPress = (item) => {
        let {
            data
        } = this.state;

        this._carousel.snapToItem(data.indexOf(item))
    }

    _getSelectedItemIndex = (selected) => {
        let {
            data
        } = this.state;

        if (parseInt(data[0]).toString() === 'NaN') {
            return parseInt(selected) - 1;
        } else {
            return data.indexOf(selected)
        }
    }

    render() {
        let {data} = this.state;
        let {onSnapToItem, selected, itemHeight, sliderHeight} = this.props;

        return (
            <Carousel ref={ref => this._carousel = ref}
                      onSnapToItem={onSnapToItem}
                      data={data}
                      firstItem={this._getSelectedItemIndex(selected)}
                      containerCustomStyle={styles.sliderContainer}
                      itemHeight={itemHeight}
                      sliderHeight={sliderHeight}
                      vertical={true}
                      useScrollView={true}
                      enableMomentum={true}
                      removeClippedSubviews={false}
                      inactiveSlideShift={0}
                      inactiveSlideScale={0.7}
                      inactiveSlideOpacity={0.5}
                      renderItem={this._renderItem} />
        );
    }
}

const styles = StyleSheet.create({
    sliderContainer: {
        flex: 1
    },

    slide: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },

    wheelText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'black'
    }
})