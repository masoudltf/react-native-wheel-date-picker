import React from "react";
import Carousel from "react-native-snap-carousel";
import {StyleSheet, Text, TouchableOpacity} from "react-native";

const SLIDER_HEIGHT = 150;
const ITEM_HEIGHT = 50;

export default class CarouselWrapper extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: props.data
        };
    }

    snapToItem = (index) => {
        this._carousel.snapToItem(index)
    }

    getCurrentIndex() {
        return this._carousel.currentIndex
    }

    _renderItem = ({item}) => {
        return (
            <TouchableOpacity activeOpacity={1}
                              onPress={() => this._onItemPress(item)}
                              style={styles.slide}>
                <Text style={styles.wheelText}>{item}</Text>
            </TouchableOpacity>
        )
    }

    _onItemPress = (item) => {
        let {
            data
        } = this.state;

        this._carousel.snapToItem(data.indexOf(item))
    }

    render() {
        let {data} = this.state;
        let {onSnapToItem} = this.props;

        return (
            <Carousel ref={ref => this._carousel = ref}
                      onSnapToItem={onSnapToItem}
                      data={data}
                      containerCustomStyle={styles.sliderContainer}
                      itemHeight={ITEM_HEIGHT}
                      sliderHeight={SLIDER_HEIGHT}
                      vertical={true}
                      useScrollView={true}
                      enableMomentum={true}
                      removeClippedSubviews={false}
                      inactiveSlideShift={0}
                      inactiveSlideScale={0.8}
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
        fontWeight: 'bold'
    }
})