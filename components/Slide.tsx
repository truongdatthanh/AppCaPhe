import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Swiper from 'react-native-swiper';
import image from '../assets/img/caphe1.jpg';


export default () => (
    <Swiper style={styles.wrapper}
        // showsButtons={false}
        loop={true}
        autoplay={true}
        autoplayTimeout={3}
        dot={<View style={styles.dot} />}
        activeDot={<View style={styles.activeDot} />}
    >
        <View style={styles.slide}>
            <Image style={styles.image} source={image} resizeMode='cover' />
        </View>
        <View style={styles.slide}>
            <Image style={styles.image} source={image} resizeMode='repeat' />
        </View>
        <View style={styles.slide}>
            <Image style={styles.image} source={image} resizeMode='stretch' />
        </View>
    </Swiper>
);

const styles = StyleSheet.create({
    wrapper: {
        height: 200,
        width: "auto",
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
    },
    image: {
        flex: 1,
    },
    dot: {
        borderWidth: 1,
        borderColor: 'white',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3,
    },
    activeDot: {
        backgroundColor: 'yellow',
        width: 10,
        height: 10,
        borderRadius: 6,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3
    },
})